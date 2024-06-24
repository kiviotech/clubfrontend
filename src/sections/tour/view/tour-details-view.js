'use client';

import PropTypes from 'prop-types';
import { useState, useCallback, useEffect } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { _tours, TOUR_DETAILS_TABS, TOUR_PUBLISH_OPTIONS } from 'src/_mock';

import Label from 'src/components/label';
import { useSettingsContext } from 'src/components/settings';

import TourDetailsToolbar from '../tour-details-toolbar';
import TourDetailsContent from '../tour-details-content';
import TourDetailsBookers from '../tour-details-bookers';
import { useMyAuthContext } from 'src/services/my-auth-context';
import { fetchData } from 'src/services/api';
import Loading from 'src/app/loading';

// ----------------------------------------------------------------------

export default function TourDetailsView({ id }) {
  const settings = useSettingsContext();

  const { token } = useMyAuthContext();

  const [loading, setLoading] = useState(true);

  const [design, setDesign] = useState(null);

  useEffect(() => {
    const getDesign = async () => {
      try {
        const response = await fetchData(`api/design-requests/${id}?populate=references`, token);
        console.log('Design data', response.data);
        setDesign(response.data);
      } catch (error) {
        console.error('Failed to fetch tour:', error);
      } finally {
        setLoading(false);
      }
    };

    getDesign();
  }, []);

  // const currentTour = _tours.filter((tour) => tour.id === id)[0];

  // const [publish, setPublish] = useState(currentTour?.publish);

  const [currentTab, setCurrentTab] = useState('content');

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  // const handleChangePublish = useCallback((newValue) => {
  //   setPublish(newValue);
  // }, []);

  const renderTabs = (
    <Tabs
      value={currentTab}
      onChange={handleChangeTab}
      sx={{
        mb: { xs: 3, md: 5 },
      }}
    >
      {TOUR_DETAILS_TABS.map((tab) => (
        <Tab
          key={tab.value}
          iconPosition="end"
          value={tab.value}
          label={tab.label}
          icon={
            tab.value === 'bookers' ? (
              // <Label variant="filled">{currentTour?.bookers.length}</Label>
              <Label variant="filled">12</Label>
            ) : (
              ''
            )
          }
        />
      ))}
    </Tabs>
  );

  if (loading) return <Loading />;

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      {renderTabs}

      {/* {currentTab === 'content' && <TourDetailsContent tour={currentTour} />} */}
      {currentTab === 'content' && <TourDetailsContent design={design}/>}

      {currentTab === 'bookers' && <TourDetailsBookers bookers={currentTour?.bookers} />}
    </Container>
  );
}

TourDetailsView.propTypes = {
  id: PropTypes.string,
};
