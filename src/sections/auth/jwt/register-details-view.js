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
  const { token, userData, updateUserData } = useMyAuthContext();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  let role = "customer";

  const DetailsSchema = Yup.object().shape({
    displayname: Yup.string().required('Display name is required'),
    position: Yup.string().required('Position is required'),
    city: Yup.string().required('City is required'),
    country: Yup.string().required('Country is required'),
  });

  const defaultValues = {
    displayname: '',
    position: '',
    city: '',
    country: ''
  };

  const methods = useForm({
    resolver: yupResolver(DetailsSchema),
    defaultValues
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log(role);
      console.log('Register details view form data', data);
      const updateDetailsResponse = await putData(`api/user-details/${userData.id}`, 
        { data: { ...data, role } }, 
        token);
      console.log('Update details response', updateDetailsResponse);
      updateUserData(updateDetailsResponse.data);

      if (role === "customer") {
        router.push(returnTo || PATH_AFTER_LOGIN);
      } else {
        router.push(paths.auth.jwt.registerDesigner);
      }
    } catch (error) {
      console.error(error);
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
      <Typography variant="h4">Enter your details</Typography>
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
          role = "customer";
        }}
      >
        Sign-up as Customer
      </LoadingButton>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        onClick={() => {
          role = "designer";
        }}
      >
        Sign-up as Designer
      </LoadingButton>
    </Stack>
  );

  return (
    <>
      {renderHead}

      {!!errorMsg && (
        <Alert severity="error" sx={{ m: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <FormProvider methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </FormProvider>
    </>
  );
}
