import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import { alpha, useTheme } from '@mui/material/styles';

import { fShortenNumber } from 'src/utils/format-number';

import { _socials } from 'src/_mock';
import { AvatarShape } from 'src/assets/illustrations';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function UserCard({ user }) {
  const theme = useTheme();

  const { name, coverUrl, role, totalFollowers, totalPosts, avatarUrl, totalFollowing } = user;

  return (
    <Card sx={{ textAlign: 'center' }}>
      <Box sx={{ position: 'relative' }}>
        <AvatarShape
          sx={{
            left: 0,
            right: 0,
            zIndex: 10,
            mx: 'auto',
            bottom: -26,
            position: 'absolute',
          }}
        />

        <Avatar
          alt={name}
          src={avatarUrl}
          sx={{
            width: 64,
            height: 64,
            zIndex: 11,
            left: 0,
            right: 0,
            bottom: -32,
            mx: 'auto',
            position: 'absolute',
          }}
        />

        <Image
          src={coverUrl}
          alt={coverUrl}
          ratio="16/9"
          overlay={alpha(theme.palette.grey[900], 0.48)}
        />
      </Box>

      <ListItemText
        sx={{ mt: 7, mb: 1 }}
        primary={name}
        secondary={role}
        primaryTypographyProps={{ typography: 'subtitle1' }}
        secondaryTypographyProps={{ component: 'span', mt: 0.5 }}
      />

      <Stack direction="row" alignItems="center" justifyContent="center" sx={{ mb: 2.5 }}>
        {_socials.map((social) => (
          <IconButton
            key={social.name}
            sx={{
              color: social.color,
              '&:hover': {
                bgcolor: alpha(social.color, 0.08),
              },
            }}
          >
            <Iconify icon={social.icon} />
          </IconButton>
        ))}
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Box
        display="grid"
        gridTemplateColumns="repeat(3, 1fr)"
        sx={{ py: 3, typography: 'subtitle1' }}
      >
        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.5, color: 'text.secondary' }}>
            Follower
          </Typography>
          {fShortenNumber(totalFollowers)}
        </div>

        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.5, color: 'text.secondary' }}>
            Following
          </Typography>

          {fShortenNumber(totalFollowing)}
        </div>

        <div>
          <Typography variant="caption" component="div" sx={{ mb: 0.5, color: 'text.secondary' }}>
            Total Post
          </Typography>
          {fShortenNumber(totalPosts)}
        </div>
      </Box>
    </Card>
  );
  
}

UserCard.propTypes = {
  user: PropTypes.object,
  design: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    budget: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};


// import PropTypes from 'prop-types';

// import Box from '@mui/material/Box';
// import Card from '@mui/material/Card';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
// import { alpha, useTheme } from '@mui/material/styles';


// import Image from 'src/components/image';

// // ----------------------------------------------------------------------

// export default function FashionDesignCard({ design }) {
//   const theme = useTheme();

//   const { title, image, category, budget, description } = design;

//   return (
//     <Card sx={{ textAlign: 'center' }}>
//       <Box sx={{ position: 'relative' }}>
//         <Image
//           src={image}
//           alt={title}
//           ratio="16/9"
//           overlay={alpha(theme.palette.grey[900], 0.48)}
//         />
//       </Box>

//       <Stack spacing={2} sx={{ p: 3 }}>
//         <Typography variant="h6" component="div">
//           {title}
//         </Typography>

//         <Typography variant="subtitle1" component="div" color="text.secondary">
//           Category: {category}
//         </Typography>

//         <Typography variant="subtitle2" component="div" color="text.secondary">
//           Budget: ${budget}
//         </Typography>

//         <Divider sx={{ borderStyle: 'dashed' }} />

//         <Typography variant="body2" component="div">
//           {description}
//         </Typography>
//       </Stack>
//     </Card>
//   );
// }

// FashionDesignCard.propTypes = {
//   design: PropTypes.shape({
//     title: PropTypes.string.isRequired,
//     image: PropTypes.string.isRequired,
//     category: PropTypes.string.isRequired,
//     budget: PropTypes.number.isRequired,
//     description: PropTypes.string.isRequired,
//   }).isRequired,
// };
