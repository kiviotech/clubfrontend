import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import UserCard from './FashionDesignCard';

// ----------------------------------------------------------------------


export default function UserCardList({ users }) {


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
      {users.map((user) => (
        <UserCard key={user.id} design = {design} />
      ))}
    </Box>
  );
}

UserCardList.propTypes = {
  users: PropTypes.array,
};
