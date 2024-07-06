'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'src/routes/hooks';

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
import { useMyAuthContext } from 'src/services/my-auth-context';
import { PATH_AFTER_LOGIN_CUSTOMER, PATH_AFTER_LOGIN_DESIGNER } from 'src/config-global';
import { LoadingScreen } from 'src/components/loading-screen';
import Loading from 'src/app/loading';

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
    for: 'customer',
  },
  {
    value: 'history',
    label: 'History',
    icon: <Iconify icon="solar:history-bold" width={24} />,
    for: 'customer',
  },
  {
    value: 'portfolio',
    label: 'Portfolio',
    icon: <Iconify icon="solar:user-bold" width={24} />,
    for: 'designer',
  },
  {
    value: 'reviews',
    label: 'Reviews',
    icon: <Iconify icon="solar:star-bold" width={24} />,
    for: 'designer',
  },
];

// ----------------------------------------------------------------------

export default function UserProfileView() {
  const settings = useSettingsContext();

  const router = useRouter();

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

  useEffect(() => {
    console.log("here", userData.role);
    if (userData.role === "customer") {
      router.push(PATH_AFTER_LOGIN_CUSTOMER);
    } else {
      router.push(PATH_AFTER_LOGIN_DESIGNER);
    }
  }, []);

  // return (
  //   <Container maxWidth={settings.themeStretch ? false : 'lg'}>
  //     <Card
  //       sx={{
  //         mb: 3,
  //         height: 290,
  //       }}
  //     >
  //       <ProfileCover
  //         role={userData.position}
  //         name={userData.displayname}
  //         avatarUrl={user?.photoURL}
  //         coverUrl={_userAbout.coverUrl}
  //         commissions={userData.commissions}
  //       />

  //       <Tabs
  //         value={currentTab}
  //         onChange={handleChangeTab}
  //         sx={{
  //           width: 1,
  //           bottom: 0,
  //           zIndex: 9,
  //           position: 'absolute',
  //           bgcolor: 'background.paper',
  //           [`& .${tabsClasses.flexContainer}`]: {
  //             pr: { md: 3 },
  //             justifyContent: {
  //               xs: 'center',
  //               sm: 'center',
  //               md: 'flex-end',
  //             },
  //           },
  //         }}
  //       >
  //         {TABS.filter(tab => tab.for === 'both' || tab.for === userData.role).map((tab) => (
  //           <Tab key={tab.value} value={tab.value} icon={tab.icon} label={tab.label} />
  //         ))}
  //       </Tabs>
  //     </Card>

  //     {currentTab === 'profile' && <ProfileHomeDesigner info={
  //       {
  //         about: userData.about,
  //         city: userData.city,
  //         country: userData.country,
  //         email: userData.email,
  //         role: userData.position,
  //         company: userData.company,
  //         // facebook: userData.facebook,
  //         // instagram: userData.instagram,
  //         // linkedin: userData.linkedin,
  //         // twitter: userData.twitter,
  //       }
  //     }
  //    />}

  //     {userData.role === "customer" ? (
  //       (currentTab === 'followers' && <ProfileFollowers followers={_userFollowers} />) ||
  //       (currentTab === 'history' && <ProfileHistory />)
  //     ) : (
  //       (currentTab === 'portfolio' && <ProfilePortfolio />)
  //       || (currentTab === 'reviews' && <ProfileReviews />)
  //     )}

  //     {/* {currentTab === 'friends' && (
  //       <ProfileFriends
  //         friends={_userFriends}
  //         searchFriends={searchFriends}
  //         onSearchFriends={handleSearchFriends}
  //       />
  //     )}

  //     {currentTab === 'gallery' && <ProfileGallery gallery={_userGallery} />} */}

  //   </Container>
  // );

  return Loading();
}
