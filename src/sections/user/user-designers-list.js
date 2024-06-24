import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import { useEffect, useState } from 'react';

import UserDesignerCard from './user-designer-card';

// ----------------------------------------------------------------------

export default function UserDesignersList({ designers }) {
  return (
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
      }}
    >
      {designers.map((designer) => (
        <UserDesignerCard key={designer.id} designer={designer.attributes} />
      ))}
    </Box>
  );
}

UserDesignersList.propTypes = {
  users: PropTypes.array,
};
