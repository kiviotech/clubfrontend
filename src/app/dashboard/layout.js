'use client';

import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

import { AuthGuard } from 'src/auth/guard';
import DashboardLayout from 'src/layouts/dashboard';

import { useRouter } from 'src/routes/hooks';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  // const signedIn = localStorage.getItem('isAuthenticated');
  const signedIn = true;
  if (signedIn) {
  return (
    // <AuthGuard>
      <DashboardLayout>{children}</DashboardLayout>
    // </AuthGuard>
  );
  } else {
    const router = useRouter();
    router.push('/auth/jwt/login');
    return null;
  }
}

Layout.propTypes = {
  children: PropTypes.node,
};
