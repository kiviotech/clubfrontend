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

export default function DesignRequestForm() {
  const router = useRouter();

  const { token, userData } = useMyAuthContext();

  const mdUp = useResponsive('up', 'md');

  const { enqueueSnackbar } = useSnackbar();

  const DesignRequestSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    images: Yup.array(),
    category: Yup.string().required('Category is required'),
    budget: Yup.number().required('Budget is required').moreThan(0, 'Budget should be greater than 0'),
  });

  const defaultValues = {
      title: '',
      description: '',
      images: [],
      category: '',
      budget: 0,
  };

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

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log('Design Request Form Data:', data);
      let imageResponse = [];
      if (data.images.length !== 0) {
        const formData = new FormData();
        data.images.forEach((file) => {
          formData.append('files', file);
        });
        imageResponse = await postData("api/upload", formData, token);
        console.log(imageResponse);
      }

      const response = await postData('api/design-requests', {
        data: {
          nickname: data.title,
          description: data.description,
          category: data.category,
          budget: data.budget,
          references: (data.images.length === 0 ? null : imageResponse.map((image) => image.id)),
          user_detail: userData.id
        }
      }, token);
      console.log(response);
      reset();
      enqueueSnackbar('Request added', { variant: 'success' });
      router.push('/dashboard/product/new/'); // Adjust the redirect path as needed
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
      <Grid xs={12} md={12}>
        <Card>
          <CardHeader title="Outfit Details" />

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
              <option value="Avant-Garde">Avant-Garde</option>
              <option value="Bohemian">Bohemian</option>
              <option value="Business/Formal Wear">Business/Formal Wear</option>
              <option value="Ethnical/Traditional Wear">Ethnical/Traditional Wear</option>
              <option value="Gender-Neutral/Androgynous Fashion">Gender-Neutral/Androgynous Fashion</option>
              <option value="Gothic">Gothic</option>
              <option value="Haute Couture">Haute Couture</option>
              <option value="Leather">Leather</option>
              <option value="Lingerie/Intimate Apparel">Lingerie/Intimate Apparel</option>
              <option value="Minimalist">Minimalist</option>
              <option value="Punk">Punk</option>
              <option value="Retro/Vintage-Inspired">Retro/Vintage-Inspired</option>
              <option value="Romantic">Romantic</option>
              <option value="Sportswear/Activewear">Sportswear/Activewear</option>
              <option value="Streetwear">Streetwear</option>
              <option value="Sustainable Fashion">Sustainable Fashion</option>
              <option value="Swimwear">Swimwear</option>
              <option value="Techwear">Techwear</option>
              <option value="Vintage">Vintage</option>
              <option value="Western Wear">Western Wear</option>
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
      {/* {mdUp && <Grid md={4} />} */}
      <Grid>
      {/* <FormControlLabel
          control={<Switch defaultChecked />}
          label="Publish"
          sx={{ flexGrow: 1, pl: 3 }}
        /> */}
        {/* <Box sx={{ flexGrow: 1, pl: 3 }} /> */}
        <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
          {'Submit Request'}
        </LoadingButton>
      </Grid>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3} sx={{ display: 'flex', justifyContent: 'center' }}>
        {renderDetails}

        {renderActions}
      </Grid>
    </FormProvider>
  );
}
