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
import { fetchData, postData, putData } from 'src/services/api';

// ----------------------------------------------------------------------

export default function RegisterDetailsView() {
  const { token, register, authDetails } = useMyAuthContext();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const [roleType, setRoleType] = useState("");

  const defaultValues = useMemo(
    () => ({
      category: [],
    }),
    []
  );

  const methods = useForm({
    defaultValues
  });

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log(data);
      if (roleType === "Customer") {
        console.log(data);
        const response = await fetchData('api/users/me?populate=*', token);
        console.log(response);
        const userDetailId = response.data.user_detail.id;
        const response2 = await putData(`api/user-details/${userDetailId}`, { ...data, role: roleType }, token);
        console.log(response2);
        router.push(returnTo || PATH_AFTER_LOGIN);
      } else if (roleType === "Designer") {
        const response = await fetchData('api/users/me?populate=*', token);
        console.log(response);
        const userDetailId = response.user_detail.id;
        const formData = new FormData();
        data.images.forEach((file) => {
            formData.append('files', file);
        });
        const imageResponse = await postData('api/upload', formData, token);
        console.log(imageResponse);
        const response3 = await putData(`api/user-details/${userDetailId}`, {
          data: {
            yearsofexp: data.yearsofexp,
            role: "designer", 
            bestdesigns: imageResponse.map((image) => image.id),
            speciality: data.category.map((category) => category.label)
          }
        }, token);
        console.log(response3);
        router.push(returnTo || PATH_AFTER_LOGIN);
      }
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

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
      <Typography variant="h4">Enter your details</Typography>
    </Stack>
  );

  const renderDesignerHead = (
    <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
      <Typography variant="h4">Register as designer</Typography>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5} pb={10}>
      <RHFTextField name="displayname" label="Display name" />
      <RHFTextField name="position" label="Position" />
      <RHFTextField name="city" label="City" />
      <RHFTextField name="country" label="Country" />
      {/* <RHFTextField name="facebook" label="Facebook" />
      <RHFTextField name="instagram" label="Instagram" />
      <RHFTextField name="linkedin" label="Linkedin" />
      <RHFTextField name="twitter" label="Twitter" /> */}

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        onClick={() => {
          setRoleType("Customer");
          console.log(roleType);
        }}
      >
        Sign-up as Customer
      </LoadingButton>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        // type="submit"
        variant="contained"
        loading={isSubmitting}
        onClick={() => {
          setRoleType("Designer");
          console.log(roleType);
        }}
      >
        Sign-up as Designer
      </LoadingButton>
    </Stack>
  );

  const renderDesignerForm = (
    <Stack spacing={2.5} pb={10}>
      <RHFTextField name="yearsofexp" label="Years of experience" type="number" />
      <RHFMultiSelect checkbox name="category" label="Category"
      options={
        [
          { value: "avant-garde", label: "Avant-Garde" },
          { value: "bohemian", label: "Bohemian" },
          { value: "business-formal-wear", label: "Business/Formal Wear" },
          { value: "ethnical-traditional-wear", label: "Ethnical/Traditional Wear" },
          { value: "gender-neutral-androgynous-fashion", label: "Gender-Neutral/Androgynous Fashion" },
          { value: "gothic", label: "Gothic" },
          { value: "haute-couture", label: "Haute Couture" },
          { value: "leather", label: "Leather" },
          { value: "lingerie-intimate-apparel", label: "Lingerie/Intimate Apparel" },
          { value: "minimalist", label: "Minimalist" },
          { value: "punk", label: "Punk" },
          { value: "retro-vintage-inspired", label: "Retro/Vintage-Inspired" },
          { value: "romantic", label: "Romantic" },
          { value: "sportswear-activewear", label: "Sportswear/Activewear" },
          { value: "streetwear", label: "Streetwear" },
          { value: "sustainable-fashion", label: "Sustainable Fashion" },
          { value: "swimwear", label: "Swimwear" },
          { value: "techwear", label: "Techwear" },
          { value: "vintage", label: "Vintage" },
          { value: "western-wear", label: "Western Wear" }
        ]        
      } >
        {/* <option value="">Select category</option>
        <option value="avant-garde">Avant-Garde</option>
        <option value="bohemian">Bohemian</option>
        <option value="business-formal-wear">Business/Formal Wear</option>
        <option value="ethnical-traditional-wear">Ethnical/Traditional Wear</option>
        <option value="gender-neutral-androgynous-fashion">Gender-Neutral/Androgynous Fashion</option>
        <option value="gothic">Gothic</option>
        <option value="haute-couture">Haute Couture</option>
        <option value="leather">Leather</option>
        <option value="lingerie-intimate-apparel">Lingerie/Intimate Apparel</option>
        <option value="minimalist">Minimalist</option>
        <option value="punk">Punk</option>
        <option value="retro-vintage-inspired">Retro/Vintage-Inspired</option>
        <option value="romantic">Romantic</option>
        <option value="sportswear-activewear">Sportswear/Activewear</option>
        <option value="streetwear">Streetwear</option>
        <option value="sustainable-fashion">Sustainable Fashion</option>
        <option value="swimwear">Swimwear</option>
        <option value="techwear">Techwear</option>
        <option value="vintage">Vintage</option>
        <option value="western-wear">Western Wear</option> */}
      </RHFMultiSelect>

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
      {roleType === "" && renderHead}
      {roleType === "Designer" && renderDesignerHead}

      {!!errorMsg && (
        <Alert severity="error" sx={{ m: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <FormProvider methods={methods} onSubmit={onSubmit}>
        {roleType === "" && renderForm}
        {roleType === "Designer" && renderDesignerForm}
      </FormProvider>
    </>
  );
}
