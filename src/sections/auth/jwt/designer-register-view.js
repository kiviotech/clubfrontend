'use client';

import * as Yup from 'yup';
import { useState, useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

// import { useAuthContext } from 'src/auth/hooks';
import { PATH_AFTER_LOGIN } from 'src/config-global';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField, RHFSelect, RHFMultiSelect, RHFUpload } from 'src/components/hook-form';
import { useMyAuthContext } from 'src/services/my-auth-context';
import { fetchData, postData } from 'src/services/api';

// ----------------------------------------------------------------------

export default function DesignerRegisterView() {
  const { token, register, authDetails } = useMyAuthContext();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const NewProductSchema = Yup.object().shape({
    category: Yup.string().required('Category is required')
  });

  const defaultValues = useMemo(
    () => ({
      category: '',
    }),
    []
  );

  const methods = useForm({
    defaultValues});

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
        const response = await fetchData('api/users/me?populate=*', token);
        console.log(response);
        const userDetailId = response.data.user_detail.id;
        const formData = new FormData();
        data.images.forEach((file) => {
            formData.append('files', file);
        });
        const imageResponse = await postData('api/upload', formData, token);
        console.log(imageResponse);
        const response3 = await putData(`api/user_details/${userDetailId}`, { 
            yearsofexp: data.yearsofexp,
            role: roleType, 
            bestdesigns: imageResponse.map((image) => image.id),
            speciality: data.category.map((category) => category.value)
        }, token);
        console.log(response3);
        router.push(returnTo || PATH_AFTER_LOGIN);
    } catch (error) {
      console.error(error);
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const files = values.images || [];

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setValue('images', [...files, ...newFiles], { shouldValidate: true });
    },
    [setValue, values.images]
  );

  const handleRemoveFile = useCallback(
    (inputFile) => {
      const filtered = values.images && values.images?.filter((file) => file !== inputFile);
      setValue('images', filtered);
    },
    [setValue, values.images]
  );

  const handleRemoveAllFiles = useCallback(() => {
    setValue('images', []);
  }, [setValue]);

  const renderDesignerHead = (
    <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
      <Typography variant="h4">Register as designer</Typography>
    </Stack>
  );

  const renderDesignerForm = (
    <Stack spacing={2.5} pb={10}>
      <RHFTextField name="yearsofexp" label="Years of experience" type="number" />
      <RHFMultiSelect checkbox name="category" label="Category"
      options={
        [
          { value: "Avant-Garde", label: "Avant-Garde" },
          { value: "Bohemian", label: "Bohemian" },
          { value: "Business/Formal Wear", label: "Business/Formal Wear" },
          { value: "Ethnical/Traditional Wear", label: "Ethnical/Traditional Wear" },
          { value: "Gender-Neutral/Androgynous Fashion", label: "Gender-Neutral/Androgynous Fashion" },
          { value: "Gothic", label: "Gothic" },
          { value: "Haute Couture", label: "Haute Couture" },
          { value: "Leather", label: "Leather" },
          { value: "Lingerie/Intimate Apparel", label: "Lingerie/Intimate Apparel" },
          { value: "Minimalist", label: "Minimalist" },
          { value: "Punk", label: "Punk" },
          { value: "Retro/Vintage-Inspired", label: "Retro/Vintage-Inspired" },
          { value: "Romantic", label: "Romantic" },
          { value: "Sportswear/Activewear", label: "Sportswear/Activewear" },
          { value: "Streetwear", label: "Streetwear" },
          { value: "Sustainable Fashion", label: "Sustainable Fashion" },
          { value: "Swimwear", label: "Swimwear" },
          { value: "Techwear", label: "Techwear" },
          { value: "Vintage", label: "Vintage" },
          { value: "Western Wear", label: "Western Wear" }
        ]
      } />

      <Stack spacing={1.5}>
        <Typography variant="subtitle2">Upload your best designs</Typography>
        <RHFUpload
          multiple
          thumbnail
          name="images"
          maxSize={3145728}
          onDrop={handleDrop}
          onRemove={handleRemoveFile}
          onRemoveAll={handleRemoveAllFiles}
        />
      </Stack>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Register
      </LoadingButton>
    </Stack>
  );

  return (
    <>
      {renderDesignerHead}

      {!!errorMsg && (
        <Alert severity="error" sx={{ m: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <FormProvider methods={methods} onSubmit={onSubmit}>
        {renderDesignerForm}
      </FormProvider>
    </>
  );
}
