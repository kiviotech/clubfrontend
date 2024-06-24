import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import UserCard from './FashionDesignCard';

import { useEffect, useState } from 'react';

import { API_URL, fetchData } from 'src/services/api';

import { useMyAuthContext } from 'src/services/my-auth-context';

// ----------------------------------------------------------------------


export default function UserCardList() {
  const { token } = useMyAuthContext();

  const [designs, setDesigns] = useState([]);

  useEffect(() => {
    // fetch users
    const promise = fetchData('api/design-requests?populate=references', token);
    promise.then((response) => {
      console.log('Design requests response', response);
      setDesigns(response.data);
    });
  }, []);

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
      {designs.map((design) => (
        <UserCard key={design.id} design={{
          title: design.attributes.nickname,
          category: design.attributes.category,
          budget: design.attributes.budget,
          description: design.attributes.description,
          image: (design.attributes.references.data == null ? '' : `${API_URL}${design.attributes.references.data[0].attributes.url}`),
        }} />
      ))}
    </Box>
  );
}

UserCardList.propTypes = {
  users: PropTypes.array,
};
