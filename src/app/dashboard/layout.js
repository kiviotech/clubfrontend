'use client';

import PropTypes from 'prop-types';

import DashboardLayout from 'src/layouts/dashboard';

import { useRouter } from 'src/routes/hooks';
import { initUserData } from 'src/services/api';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  // const signedIn = localStorage.getItem('isAuthenticated');
  // const signedIn = true;
  localStorage.clear();
  const signedIn = localStorage.getItem('userId');
  if (signedIn) {
    initUserData();
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
