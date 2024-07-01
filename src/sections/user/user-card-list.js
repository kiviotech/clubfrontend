import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import UserCard from './FashionDesignCard';

import { useEffect, useState } from 'react';

import { fetchData } from 'src/services/api';

import { useMyAuthContext } from 'src/services/my-auth-context';

// ----------------------------------------------------------------------


export default function UserCardList() {

const { token } = useMyAuthContext();

const [designs, setDesigns] = useState([]);

useEffect(() => {
  // fetch users
  const promise = fetchData('api/designs?populate=reference', token);
  promise.then((data) => {
    console.log(data);
    setDesigns(data.data);
  });
}, []);

const design = {
  title: 'Elegant Evening Gown',
  image: '/assets/tempDesgins/designtemp.jpg',
  category: 'Evening Wear',
  budget: 500,
  description: 'An elegant evening gown perfect for formal occasions.',
  };


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
        <UserCard key={design.id} design = {{
          title: design.attributes.nickName,
          category: design.attributes.category,
          budget: design.attributes.budget,
          description: design.attributes.description,
          image: `https://app.club-unplugged.com/dash/${design.attributes.reference.data[0].attributes.url}`,
        }} />
      ))}
    </Box>
  );
}

UserCardList.propTypes = {
  users: PropTypes.array,
};
