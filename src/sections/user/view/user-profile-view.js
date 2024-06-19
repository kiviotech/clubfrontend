'use client';

import { useState, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import { Box } from '@mui/material';

import { paths } from 'src/routes/paths';

import { useMockedUser } from 'src/hooks/use-mocked-user';

import { _userAbout, _userFeeds, _userFriends, _userGallery, _userFollowers } from 'src/_mock';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ProfileHomeUser from '../profile-home-user';
import ProfileCover from '../profile-cover';
import ProfileFriends from '../profile-friends';
import ProfileGallery from '../profile-gallery';
import ProfileFollowers from '../profile-followers';
import ProfileHomeDesigner from '../profile-home-designer';
import ProfileHistory from '../profile-history';
import ProfilePortfolio from '../profile-portfolio';
import ProfileReviews from '../profile-reviews';
import { getUserData } from 'src/services/api';
import { useMyAuthContext } from 'src/services/my-auth-context';

// ----------------------------------------------------------------------

const TABS = [
  {
    value: 'profile',
    label: 'Profile',
    icon: <Iconify icon="solar:user-id-bold" width={24} />,
    for: 'both',
  },
  {
    value: 'followers',
    label: 'Followers',
    icon: <Iconify icon="solar:heart-bold" width={24} />,
    for: 'Customer',
  },
  {
    value: 'history',
    label: 'History',
    icon: <Iconify icon="solar:history-bold" width={24} />,
    for: 'Customer',
  },
  {
    value: 'portfolio',
    label: 'Portfolio',
    icon: <Iconify icon="solar:user-bold" width={24} />,
    for: 'Designer',
  },
  {
    value: 'reviews',
    label: 'Reviews',
    icon: <Iconify icon="solar:star-bold" width={24} />,
    for: 'Designer',
  },
];

// ----------------------------------------------------------------------

export default function UserProfileView() {
  const settings = useSettingsContext();

  const { user } = useMockedUser();

  const [searchFriends, setSearchFriends] = useState('');

  const [currentTab, setCurrentTab] = useState('profile');

  const { userData } = useMyAuthContext();

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  const handleSearchFriends = useCallback((event) => {
    setSearchFriends(event.target.value);
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      {/* <CustomBreadcrumbs
        heading="Profile"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'User', href: paths.dashboard.user.root },
          { name: user?.displayName },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      /> */}

      <Card
        sx={{
          mb: 3,
          height: 290,
        }}
      >
        <ProfileCover
          role={userData.position}
          name={userData.displayName}
          avatarUrl={user?.photoURL}
          coverUrl={_userAbout.coverUrl}
          commissions={userData.commissions}
        />

        <Tabs
          value={currentTab}
          onChange={handleChangeTab}
          sx={{
            width: 1,
            bottom: 0,
            zIndex: 9,
            position: 'absolute',
            bgcolor: 'background.paper',
            [`& .${tabsClasses.flexContainer}`]: {
              pr: { md: 3 },
              justifyContent: {
                xs: 'center',
                sm: 'center',
                md: 'flex-end',
              },
            },
          }}
        >
          {/* {TABS.map((tab) => (
            <Tab key={tab.value} value={tab.value} icon={tab.icon} label={tab.label} />
          ))} */}
          {TABS.filter(tab => tab.for === 'both' || tab.for === userData.roleType).map((tab) => (
            <Tab key={tab.value} value={tab.value} icon={tab.icon} label={tab.label} />
          ))}
        </Tabs>
      </Card>

      {/* {currentTab === 'profile' && userType === "Customer" && <ProfileHomeUser info={_userAbout} posts={_userFeeds} />}
      {currentTab === 'profile' && userType === "Designer" && <ProfileHomeDesigner info={_userAbout} posts={_userFeeds} />} */}
      {currentTab === 'profile' && <ProfileHomeDesigner info={
        {
          quote: userData.quote,
          country: userData.country,
          email: userData.email,
          role: userData.position,
          company: userData.company,
          school: userData.school,
          facebook: userData.facebook,
          instagram: userData.instagram,
          linkedin: userData.linkedin,
          twitter: userData.twitter,
        }
      }
      /* posts={userData.posts} */ />}

      {userData.roleType === "Customer" ? (
        (currentTab === 'followers' && <ProfileFollowers followers={_userFollowers} />) ||
        (currentTab === 'history' && <ProfileHistory />)
      ) : (
        (currentTab === 'portfolio' && <ProfilePortfolio />)
        || (currentTab === 'reviews' && <ProfileReviews />)
      )}

      {/* {currentTab === 'friends' && (
        <ProfileFriends
          friends={_userFriends}
          searchFriends={searchFriends}
          onSearchFriends={handleSearchFriends}
        />
      )}

      {currentTab === 'gallery' && <ProfileGallery gallery={_userGallery} />} */}

    </Container>
  );
}
