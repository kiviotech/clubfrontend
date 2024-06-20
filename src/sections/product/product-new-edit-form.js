import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useRouter } from 'src/routes/hooks';
import { useResponsive } from 'src/hooks/use-responsive';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFSelect,
  RHFEditor,
  RHFUpload,
  RHFTextField,
} from 'src/components/hook-form';

import { useMyAuthContext } from 'src/services/my-auth-context';
import { postData, putData } from 'src/services/api';

// ----------------------------------------------------------------------

export default function DesignRequestForm({ currentRequest }) {
  const router = useRouter();

  const { token, userData } = useMyAuthContext();

  const mdUp = useResponsive('up', 'md');

  const { enqueueSnackbar } = useSnackbar();

  const DesignRequestSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    images: Yup.array(),
    category: Yup.string().required('Category is required'),
    budget: Yup.number().required('Budget is required').moreThan(0, 'Budget should be greater than 0'),
    description: Yup.string().required('Description is required'),
  });

  const defaultValues = useMemo(
    () => ({
      title: currentRequest?.title || '',
      description: currentRequest?.description || '',
      images: currentRequest?.images || [],
      category: currentRequest?.category || '',
      budget: currentRequest?.budget || 0,
    }),
    [currentRequest]
  );

  const methods = useForm({
    resolver: yupResolver(DesignRequestSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (currentRequest) {
      reset(defaultValues);
    }
  }, [currentRequest, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      // await new Promise((resolve) => setTimeout(resolve, 500));
      console.log(data.images);
      const formData = new FormData();
      data.images.forEach((file) => {
        formData.append('files', file);
      });
      const imageResponse = await postData("api/upload", formData, token);
      console.log(imageResponse);
      const response = await postData('api/designs', {
        data: {
        nickName: data.title,
        description: data.description,
        category: data.category,
        budget: data.budget,
        reference: imageResponse.map((image) => image.id),
      }
      }, token);
      console.log(response);
      await putData(`api/designs/${response.data.id}`, {
        data: {'user': {
          connect: [
            {id: userData.id}
          ]
        }}
      }, token);
      reset();
      enqueueSnackbar(currentRequest ? 'Update success!' : 'Create success!');
      router.push('/dashboard/product/new/'); // Adjust the redirect path as needed
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
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

  const renderDetails = (
    <>
      

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Outfit Details" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <RHFTextField name="title" label="Outfit Nick Name" />

            <RHFTextField name="description" label="Description of Design" multiline rows={4} />

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Design Reference</Typography>
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
            <RHFSelect native name="category" label="Category" InputLabelProps={{ shrink: true }}>
              <option value="">Select category</option>
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
              <option value="western-wear">Western Wear</option>

            </RHFSelect>

            <RHFTextField
              name="budget"
              label="Budget"
              placeholder="0.00"
              type="number"
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Box component="span" sx={{ color: 'text.disabled' }}>
                      Rs.
                    </Box>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </Card>
      </Grid>
    </>
  );

  

  const renderActions = (
    <>
      {mdUp && <Grid md={4} />}
      <Grid xs={12} md={8} sx={{ display: 'flex', alignItems: 'center' }}>
        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Publish"
          sx={{ flexGrow: 1, pl: 3 }}
        />

        <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
          {!currentRequest ? 'Submit Request' : 'Save Changes'}
        </LoadingButton>
      </Grid>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {renderDetails}

        {renderActions}
      </Grid>
    </FormProvider>
  );
}

DesignRequestForm.propTypes = {
  currentRequest: PropTypes.object,
};
