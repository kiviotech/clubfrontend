'use client';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { _userCards } from 'src/_mock';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import UserDesignersList from '../user-designers-list.js';
import { Typography } from '@mui/material';
import { fetchData } from 'src/services/api.js';
import { useMyAuthContext } from 'src/services/my-auth-context.js';
import Loading from 'src/app/loading.js';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

export default function UserDesignersView() {
  const settings = useSettingsContext();
  const { token }= useMyAuthContext();

  const [designers, setDesigners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDesigners = async () => {
      try {
        const response = await fetchData('api/user-details?filters[role][$eq]=designer&populate=bestdesigns', token);
        console.log('Designers data', response.data);
        setDesigners(response.data);
      } catch (error) {
        console.error('Failed to fetch designers:', error);
      } finally {
        setLoading(false);
      }
    };

    getDesigners();
  }, []);

  if (loading) return <Loading />;

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Designers
      </Typography>

      <UserDesignersList designers={designers} />
    </Container>
  );
}
