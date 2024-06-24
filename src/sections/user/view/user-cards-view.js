'use client';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
//import
import { _userCards } from 'src/_mock';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import UserCardList from '../user-card-list';
import { CardHeader, Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function UserCardsView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Bid on designs
      </Typography>

      <UserCardList />
    </Container>
  );
}
