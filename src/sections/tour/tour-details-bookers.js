import PropTypes from 'prop-types';
import { useState, useCallback, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import Iconify from 'src/components/iconify';
import { useMyAuthContext } from 'src/services/my-auth-context';
import { LoadingScreen } from 'src/components/loading-screen';
import { fetchData } from 'src/services/api';
import { useBoolean } from 'src/hooks/use-boolean';
import BidViewDialog from './bid-view-dialog';

// ----------------------------------------------------------------------

export default function TourDetailsBookers() {
  // const [approved, setApproved] = useState([]);

  // const handleClick = useCallback(
  //   (item) => {
  //     const selected = approved.includes(item)
  //       ? approved.filter((value) => value !== item)
  //       : [...approved, item];

  //     setApproved(selected);
  //   },
  //   [approved]
  // );

  const { token, userData } = useMyAuthContext();

  const [loading, setLoading] = useState(true);
  const [bids, setBids] = useState([]);
  const bidDialog = useBoolean();
  const [selectedBid, setSelectedBid] = useState(null);

  useEffect(() => {
    const getBids = async () => {
      try {
        const response = await fetchData('api/bids?populate=user_detail&populate=design_request', token);
        console.log('Bids data', response.data);
        setBids(response.data);
      } catch (error) {
        console.error('Failed to fetch bids:', error);
      } finally {
        setLoading(false);
      }
    };

    getBids();
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
      >
        {bids.map((bid) => (
          <BidItem
            key={bid.id}
            bid={bid}
            designer={bid.attributes.user_detail.data.attributes}
          />
        ))}
      </Box>

      
    </>
  );
}

TourDetailsBookers.propTypes = {
  bookers: PropTypes.array,
};

// ----------------------------------------------------------------------

function BidItem({ bid, designer }) {
  const bidDialog = useBoolean();
  return (
    <>
    <Stack component={Card} direction="row" spacing={2} key={bid.id} sx={{ p: 3 }}>
      {/* <Avatar alt={booker.name} src={booker.avatarUrl} sx={{ width: 48, height: 48 }} /> */}

      <Stack spacing={1} flexGrow={1}>
        <ListItemText
          primary={designer.displayname}
          secondary={
            <Stack direction="row" alignItems="center" spacing={0.5}>
              {/* <Iconify icon="solar:users-group-rounded-bold" width={16} /> */}
              <Iconify icon="solar:dollar-bold" width={16} />
              {bid.attributes.amount}
            </Stack>
          }
          secondaryTypographyProps={{
            mt: 1.5,
            component: 'span',
            typography: 'body2',
            // color: 'text.disabled',
          }}
        />

        <ListItemText
          // primary={designer.displayname}
          secondary={
            <Stack direction="row" alignItems="center" spacing={0.5}>
              {/* <Iconify icon="solar:users-group-rounded-bold" width={16} /> */}
              <Iconify icon="solar:dollar-bold" width={16} />
              {bid.attributes.estdate}
            </Stack>
          }
          secondaryTypographyProps={{
            // mt: 0.5,
            component: 'span',
            typography: 'body2',
            // color: 'text.disabled',
          }}
        />

        {/* <Stack spacing={1} direction="row">
          <IconButton
            size="small"
            color="error"
            sx={{
              borderRadius: 1,
              bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
              '&:hover': {
                bgcolor: (theme) => alpha(theme.palette.error.main, 0.16),
              },
            }}
          >
            <Iconify width={18} icon="solar:phone-bold" />
          </IconButton>

          <IconButton
            size="small"
            color="info"
            sx={{
              borderRadius: 1,
              bgcolor: (theme) => alpha(theme.palette.info.main, 0.08),
              '&:hover': {
                bgcolor: (theme) => alpha(theme.palette.info.main, 0.16),
              },
            }}
          >
            <Iconify width={18} icon="solar:chat-round-dots-bold" />
          </IconButton>

          <IconButton
            size="small"
            color="primary"
            sx={{
              borderRadius: 1,
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
              '&:hover': {
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
              },
            }}
          >
            <Iconify width={18} icon="fluent:mail-24-filled" />
          </IconButton>
        </Stack> */}
      </Stack>

      <Button
        size="small"
        variant={'outlined'}
        color={'inherit'}
        // startIcon={
        //   selected ? <Iconify width={18} icon="eva:checkmark-fill" sx={{ mr: -0.75 }} /> : null
        // }
        onClick={bidDialog.onTrue}
      >
        View bid
      </Button>
    </Stack>

    <BidViewDialog open={bidDialog.value} onClose={bidDialog.onFalse} bid={bid} />
    </>
  );
}

BidItem.propTypes = {
  bid: PropTypes.object,
  designer: PropTypes.object,
};
