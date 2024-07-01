'use client';

import PropTypes from 'prop-types';

import DashboardLayout from 'src/layouts/dashboard';

import { useRouter } from 'src/routes/hooks';

import { useState, useEffect } from 'react';
import { useMyAuthContext } from 'src/services/my-auth-context';
import Loading from '../loading';

// ----------------------------------------------------------------------

export default function Layout({ children }) {
  const { token, loading } = useMyAuthContext();
  const router = useRouter();
  // const [loading, setLoading] = useState(false);

  useEffect(() => {

    if (!loading) {
      if (token == null) {
        router.push('/auth/jwt/login');
      }
    }
  }, [token, loading, router]);

  if (loading || !token) return Loading();
  return (
      // <AuthGuard>
        <DashboardLayout>{children}</DashboardLayout>
      // </AuthGuard>
    );
}

Layout.propTypes = {
  children: PropTypes.node,
};
