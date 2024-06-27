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

import { _socials, _userCards } from 'src/_mock';
import { AvatarShape } from 'src/assets/illustrations';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { API_URL } from 'src/services/api';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function UserDesignerCard({ id, designer }) {
  const theme = useTheme();

  const router = useRouter();

  const user = _userCards[1];

  const { name, coverUrl, role, totalFollowers, totalPosts, avatarUrl, totalFollowing } = user;

  const handleCardClick = () => {
    console.log(id);
    router.push(`${paths.dashboard.user.designers}/${id}`);
  }

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        textAlign: 'center',
        cursor: 'pointer',
        '&:hover': {
          boxShadow: (theme) => theme.customShadows.z20,
        },
      }}
    >
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
          src={`${API_URL}${designer.bestdesigns.data[0].attributes.url}`}
          alt={coverUrl}
          ratio="16/9"
          overlay={alpha(theme.palette.grey[900], 0.48)}
        />
      </Box>

      <ListItemText
        sx={{ mt: 7, mb: 1 }}
        primary={designer.displayname}
        secondary={designer.position}
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

UserDesignerCard.propTypes = {
  user: PropTypes.object,
};
