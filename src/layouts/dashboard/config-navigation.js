import { useEffect, useMemo, useState } from 'react';

import { paths } from 'src/routes/paths';

import { useTranslate } from 'src/locales';


import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';
import { useMyAuthContext } from 'src/services/my-auth-context';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
  plus: icon('ic_plus.svg')
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useTranslate();

  const { userData } = useMyAuthContext();

  const [ data, setData ] = useState([
    {
      subheader: t('navigation'),
      items: [
        // {
        //   title: t('profile'),
        //   path: paths.dashboard.user.root,
        //   icon: ICONS.user,
        // },

        {
          title: t('Post Request'),
          path: paths.dashboard.product.new,
          icon: ICONS.product
        },

        {
          title: t('View Designers'),
          path: paths.dashboard.user.designers,
          icon: ICONS.user
        }
  ],
  }
  ]);

  const customerNavData = [
      {
        subheader: t('navigation'),
        items: [
          // {
          //   title: t('profile'),
          //   path: paths.dashboard.user.root,
          //   icon: ICONS.user,
          // },

          {
            title: t('Post Request'),
            path: paths.dashboard.product.new,
            icon: ICONS.product
          },

          {
            title: t('View Designers'),
            path: paths.dashboard.user.designers,
            icon: ICONS.user
          }
    ],
    }]

  const designerNavData = [
      {
        subheader: t('navigation'),
        items: [
          // {
          //   title: t('profile'),
          //   path: paths.dashboard.user.root,
          //   icon: ICONS.user,
          // },
          {
            title: t('View Requests'),
            path: paths.dashboard.user.cards,
            icon: ICONS.ecommerce,
          },
    ],
    }];

    useEffect(() => {
      console.log("here2", userData.role);
      if (userData.role === "customer") {
        setData(customerNavData);
      } else {
        setData(designerNavData);
      }
    }, [userData]);

  return data;
}


