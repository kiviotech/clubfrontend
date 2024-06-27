import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import Iconify from 'src/components/iconify';
import { Upload } from 'src/components/upload';
import FormProvider from 'src/components/hook-form';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form';
import InputAdornment from '@mui/material/InputAdornment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { postData } from 'src/services/api';
import { useMyAuthContext } from 'src/services/my-auth-context';
import { enqueueSnackbar } from 'notistack';

// ----------------------------------------------------------------------

export default function BidCreateDialog({
  title = 'Bid',
  open,
  onClose,
  design,
  ...other
})
{
    const { token, userData } = useMyAuthContext();

    const BidFormSchema = Yup.object().shape({
        amount: Yup.number().required('Amount is required').moreThan(0, 'Amount should be greater than 0'),
        estdate: Yup.date().required('Estimated date is required'),
        message: Yup.string().required('Message is required'),
    });

  const defaultValues = {
    amount: 0,
    estdate: null,
    message: '',
  };

  const methods = useForm({
    defaultValues,
    resolver: yupResolver(BidFormSchema),
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    const response = await postData('api/bids', {
        data: {
            ...data,
            design_request: design.id,
            user_detail: userData.id,
        },
    }, token);
    console.log('Bid response', response);
    enqueueSnackbar('Bid submitted successfully', { variant: 'success' });
    onClose();
  });

  return (
      <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose} {...other}>
            <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle sx={{ p: (theme) => theme.spacing(3, 3, 2, 3) }}> {title} </DialogTitle>

        <DialogContent dividers sx={{ pt: 1, pb: 0, border: 'none' }}>
            <Stack direction="column" spacing={2} mb={3}>
            <RHFTextField
              name="amount"
              label="Amount"
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

            <Controller
                name="estdate"
                control={control}
                render={({ field, fieldState: { error } }) => (
                <DatePicker
                    label="Estimated Date"
                    value={field.value}
                    onChange={(newValue) => {
                        field.onChange(newValue);
                    }}
                    slotProps={{
                    textField: {
                        fullWidth: true,
                        error: !!error,
                        helperText: error?.message,
                    },
                    }}
                />
                )}
            />

            <RHFTextField name="message" label="Message" multiline rows={4} />
            </Stack>

        </DialogContent>

        <DialogActions>
            <Stack direction="row" justifyContent="flex-end" flexGrow={1}>
                <LoadingButton variant="soft" type="submit" loading={isSubmitting}>
                    Submit Bid
                </LoadingButton>
            </Stack>
        </DialogActions>
    </FormProvider>
        </Dialog>
  );
}

BidCreateDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.string,
};
