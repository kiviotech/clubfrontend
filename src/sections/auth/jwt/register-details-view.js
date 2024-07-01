'use client';

import * as Yup from 'yup';
import { useState } from 'react';
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
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useMyAuthContext } from 'src/services/my-auth-context';

// ----------------------------------------------------------------------

export default function RegisterDetailsView() {
  const { register, authDetails } = useMyAuthContext();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  let roleType = "";

  const methods = useForm();

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      // await register?.(data.email, data.password, data.firstName, data.lastName);
      console.log(data);
      await register(data, roleType);

      router.push(returnTo || PATH_AFTER_LOGIN);
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
      <RHFTextField name="displayName" label="Display name" />
      <RHFTextField name="quote" label="Bio" />
      <RHFTextField name="country" label="Country" />
      <RHFTextField name="company" label="Company" />
      {/* <RHFTextField name="position" label="Position" /> */}
      {/* <RHFTextField name="school" label="School" />
      <RHFTextField name="facebook" label="Facebook" /> */}
      <RHFTextField name="instagram" label="Instagram" />
      {/* <RHFTextField name="linkedin" label="Linkedin" />
      <RHFTextField name="twitter" label="Twitter" /> */}

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        variant="contained"
        onClick={() => {
          router.push(paths.auth.jwt.register);
        }
        }
      >
        Back
      </LoadingButton>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        onClick={() => {
          roleType = "Customer";
          console.log(roleType);
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
          roleType = "Designer";
          console.log(roleType);
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
