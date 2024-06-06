import sumBy from 'lodash/sumBy';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

import { useBoolean } from 'src/hooks/use-boolean';

import { fShortenNumber } from 'src/utils/format-number';

import Iconify from 'src/components/iconify';

import ProductReviewList from '../product/product-review-list';
import ProductReviewNewForm from '../product/product-review-new-form';
import { useGetProduct } from 'src/api/product';

import { useEffect } from 'react';
import { avatar } from 'src/theme/overrides/components/avatar';

// ----------------------------------------------------------------------

export default function ProfileReviews() {
//   const { product } = useGetProduct(0);
//   useEffect(() => {
//     if (product) {
//       setPublish(product?.publish);
//     }
//   }, [product]);

//   const { totalRatings, totalReviews, ratings, reviews } = product;

const totalRatings = 4.3;
const totalReviews = 2;
const ratings = [
    {
        name: '5 Stars',
        starCount: 1,
        reviewCount: '1',
    },
    {
        name: '4 Stars',
        starCount: 1,
        reviewCount: '1',
    },
    {
        name: '3 Stars',
        starCount: 1,
        reviewCount: '1',
    },
    {
        name: '2 Stars',
        starCount: 0,
        reviewCount: '0',
    },
    {
        name: '1 Star',
        starCount: 1,
        reviewCount: '1',
    },
];
const reviews = [
    {
        id: '1',
        name: 'Taylor',
        rating: 5,
        comment: 'Great product, love it!',
        postedAt: '2021-06-12T09:30:00.000Z',
        avatarUrl: '/static/mock-images/avatars/avatar_1.jpg',
        isPurchased: true,
    },
    {
        id: '2',
        name: 'Alex',
        rating: 4,
        comment: 'Good product, worth the money',
        postedAt: '2021-06-12T09:30:00.000Z',
        avatarUrl: '/static/mock-images/avatars/avatar_2.jpg',
        isPurchased: true,
    },
];

  const review = useBoolean();

  const total = sumBy(ratings, (star) => star.starCount);

  const renderSummary = (
    <Stack spacing={1} alignItems="center" justifyContent="center">
      <Typography variant="subtitle2">Average rating</Typography>

      <Typography variant="h2">{totalRatings}/5</Typography>

      <Rating readOnly value={totalRatings} precision={0.1} />

      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        ({fShortenNumber(totalReviews)} reviews)
      </Typography>
    </Stack>
  );

  const renderProgress = (
    <Stack
      spacing={1.5}
      sx={{
        py: 5,
        px: { xs: 3, md: 5 },
        borderLeft: (theme) => ({
          md: `dashed 1px ${theme.palette.divider}`,
        }),
        borderRight: (theme) => ({
          md: `dashed 1px ${theme.palette.divider}`,
        }),
      }}
    >
      {ratings
        .slice(0)
        .reverse()
        .map((rating) => (
          <Stack key={rating.name} direction="row" alignItems="center">
            <Typography variant="subtitle2" component="span" sx={{ width: 42 }}>
              {rating.name}
            </Typography>

            <LinearProgress
              color="inherit"
              variant="determinate"
              value={(rating.starCount / total) * 100}
              sx={{
                mx: 2,
                flexGrow: 1,
              }}
            />

            <Typography
              variant="body2"
              component="span"
              sx={{
                minWidth: 48,
                color: 'text.secondary',
              }}
            >
              {fShortenNumber(rating.reviewCount)}
            </Typography>
          </Stack>
        ))}
    </Stack>
  );

  const renderReviewButton = (
    <Stack alignItems="center" justifyContent="center">
      <Button
        size="large"
        variant="soft"
        color="inherit"
        onClick={review.onTrue}
        startIcon={<Iconify icon="solar:pen-bold" />}
      >
        Write your review
      </Button>
    </Stack>
  );

  return (
    <>
      <Box
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
        sx={{
          py: { xs: 5, md: 0 },
        }}
      >
        {renderSummary}

        {renderProgress}

        {renderReviewButton}
      </Box>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <ProductReviewList reviews={reviews} />

      <ProductReviewNewForm open={review.value} onClose={review.onFalse} />
    </>
  );
}

ProfileReviews.propTypes = {
  ratings: PropTypes.array,
  reviews: PropTypes.array,
  totalRatings: PropTypes.number,
  totalReviews: PropTypes.number,
};
