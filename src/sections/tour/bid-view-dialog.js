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
import { fDate, fDateTime } from 'src/utils/format-time';
import { sub } from 'date-fns';
import { DateField } from '@mui/x-date-pickers';

// ----------------------------------------------------------------------

export default function BidViewDialog({
  title = 'Bid',
  open,
  onClose,
  bid,
  ...other
})
{
    const { token, userData } = useMyAuthContext();
    // console.log("here");

  return (
      <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose} {...other}>
        <DialogTitle sx={{ p: (theme) => theme.spacing(3, 3, 2, 3) }}> {title} </DialogTitle>

        <DialogContent dividers sx={{ pt: 1, pb: 0, border: 'none' }}>
            <Stack direction="column" spacing={2} mb={3}>
            <TextField
              name="amount"
              label="Amount"
              placeholder="0.00"
              type="number"
              value={bid.attributes.amount}
              disabled={true}
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

            <DateField
                label="Estimated Date"
                value={new Date(bid.attributes.estdate)}
                format="yyyy/MM/dd"
                disabled={true}
            />

            <TextField name="message" label="Message" value={bid.attributes.message} disabled={true} multiline rows={4} />
            </Stack>

        </DialogContent>

        <DialogActions>
            <Stack direction="row" justifyContent="flex-end" flexGrow={1}>
                  <LoadingButton variant="soft">
                    Approve
                </LoadingButton>
            </Stack>
        </DialogActions>
    </Dialog>
  );
}

BidViewDialog.propTypes = {
  bid: PropTypes.object,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.string,
};
