import { useMemo } from 'react';

import { paths } from 'src/routes/paths';

import { useTranslate } from 'src/locales';


import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';

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
  home: icon('ic_home'),
  plus: icon('ic_plus.svg')
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useTranslate();

  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      // {
      //   subheader: t('overview'),
      //   items: [
      //     {
      //       title: t('app'),
      //       path: paths.home.root,
      //       icon: ICONS.home,
      //     },
      //     {
      //       title: t('ecommerce'),
      //       path: paths.home.general.ecommerce,
      //       icon: ICONS.ecommerce,
      //     },
      //     {
      //       title: t('analytics'),
      //       path: paths.home.general.analytics,
      //       icon: ICONS.analytics,
      //     },
      //     {
      //       title: t('banking'),
      //       path: paths.home.general.banking,
      //       icon: ICONS.banking,
      //     },
      //     {
      //       title: t('booking'),
      //       path: paths.home.general.booking,
      //       icon: ICONS.booking,
      //     },
      //     {
      //       title: t('file'),
      //       path: paths.home.general.file,
      //       icon: ICONS.file,
      //     },
      //   ],
      // },

      // MANAGEMENT
      // ----------------------------------------------------------------------
      {
        subheader: t('navigation'),
        items: [
          // USER
          {
            title: t('profile'),
            path: paths.home.user.root,
            icon: ICONS.user,
            // children: [
              // { title: t('profile'), path: paths.home.user.root },
              // { title: t('cards'), path: paths.home.user.cards },
              // { title: t('list'), path: paths.home.user.list },
              // { title: t('create'), path: paths.home.user.new },
              // { title: t('edit'), path: paths.home.user.demo.edit },
              // { title: t('account'), path: paths.home.user.account },
            // ],
          },

          // // PRODUCT
          {
            title: t('Post Design'),
            path: paths.home.product.new,
            icon: ICONS.product,
            // children: [
            //   { title: t('list'), path: paths.home.product.root },
            //   {
            //     title: t('details'),
            //     path: paths.home.product.demo.details,
            //   },
            //   { title: t('create'), path: paths.home.product.new },
            //   { title: t('edit'), path: paths.home.product.demo.edit },
            // ],
          },

          {
            title: t('View Requests'),
            path: paths.home.user.cards,
            icon: ICONS.ecommerce,
            // children: [
              // { title: t('profile'), path: paths.home.user.root },
              // { title: t('cards'), path: paths.home.user.cards },
              // { title: t('list'), path: paths.home.user.list },
              // { title: t('create'), path: paths.home.user.new },
              // { title: t('edit'), path: paths.home.user.demo.edit },
              // { title: t('account'), path: paths.home.user.account },
            // ],
          },

          // // ORDER
          // {
          //   title: t('order'),
          //   path: paths.home.order.root,
          //   icon: ICONS.order,
          //   children: [
          //     { title: t('list'), path: paths.home.order.root },
          //     { title: t('details'), path: paths.home.order.demo.details },
          //   ],
          // },

          // // INVOICE
          // {
          //   title: t('invoice'),
          //   path: paths.home.invoice.root,
          //   icon: ICONS.invoice,
          //   children: [
          //     { title: t('list'), path: paths.home.invoice.root },
          //     {
          //       title: t('details'),
          //       path: paths.home.invoice.demo.details,
          //     },
          //     { title: t('create'), path: paths.home.invoice.new },
          //     { title: t('edit'), path: paths.home.invoice.demo.edit },
          //   ],
          // },

          // // BLOG
          // {
          //   title: t('blog'),
          //   path: paths.home.post.root,
          //   icon: ICONS.blog,
          //   children: [
          //     { title: t('list'), path: paths.home.post.root },
          //     { title: t('details'), path: paths.home.post.demo.details },
          //     { title: t('create'), path: paths.home.post.new },
          //     { title: t('edit'), path: paths.home.post.demo.edit },
          //   ],
          // },

          // // JOB
          // {
          //   title: t('job'),
          //   path: paths.home.job.root,
          //   icon: ICONS.job,
          //   children: [
          //     { title: t('list'), path: paths.home.job.root },
          //     { title: t('details'), path: paths.home.job.demo.details },
          //     { title: t('create'), path: paths.home.job.new },
          //     { title: t('edit'), path: paths.home.job.demo.edit },
          //   ],
          // },

          // // TOUR
          // {
          //   title: t('tour'),
          //   path: paths.home.tour.root,
          //   icon: ICONS.tour,
          //   children: [
          //     { title: t('list'), path: paths.home.tour.root },
          //     { title: t('details'), path: paths.home.tour.demo.details },
          //     { title: t('create'), path: paths.home.tour.new },
          //     { title: t('edit'), path: paths.home.tour.demo.edit },
          //   ],
          // },

          // // FILE MANAGER
          // {
          //   title: t('file_manager'),
          //   path: paths.home.fileManager,
          //   icon: ICONS.folder,
          // },

          // // MAIL
          // {
          //   title: t('mail'),
          //   path: paths.home.mail,
          //   icon: ICONS.mail,
          //   info: <Label color="error">+32</Label>,
          // },

          // // CHAT
          // {
          //   title: t('chat'),
          //   path: paths.home.chat,
          //   icon: ICONS.chat,
          // },

          // // CALENDAR
          // {
          //   title: t('calendar'),
          //   path: paths.home.calendar,
          //   icon: ICONS.calendar,
          // },

          // // KANBAN
          // {
          //   title: t('kanban'),
          //   path: paths.home.kanban,
          //   icon: ICONS.kanban,
          // },
        ],
      },

      // DEMO MENU STATES
      // {
      //   subheader: t(t('other_cases')),
      //   items: [
      //     {
      //       // default roles : All roles can see this entry.
      //       // roles: ['user'] Only users can see this item.
      //       // roles: ['admin'] Only admin can see this item.
      //       // roles: ['admin', 'manager'] Only admin/manager can see this item.
      //       // Reference from 'src/guards/RoleBasedGuard'.
      //       title: t('item_by_roles'),
      //       path: paths.home.permission,
      //       icon: ICONS.lock,
      //       roles: ['admin', 'manager'],
      //       caption: t('only_admin_can_see_this_item'),
      //     },
      //     {
      //       title: t('menu_level'),
      //       path: '#/home/menu_level',
      //       icon: ICONS.menuItem,
      //       children: [
      //         {
      //           title: t('menu_level_1a'),
      //           path: '#/home/menu_level/menu_level_1a',
      //         },
      //         {
      //           title: t('menu_level_1b'),
      //           path: '#/home/menu_level/menu_level_1b',
      //           children: [
      //             {
      //               title: t('menu_level_2a'),
      //               path: '#/home/menu_level/menu_level_1b/menu_level_2a',
      //             },
      //             {
      //               title: t('menu_level_2b'),
      //               path: '#/home/menu_level/menu_level_1b/menu_level_2b',
      //               children: [
      //                 {
      //                   title: t('menu_level_3a'),
      //                   path: '#/home/menu_level/menu_level_1b/menu_level_2b/menu_level_3a',
      //                 },
      //                 {
      //                   title: t('menu_level_3b'),
      //                   path: '#/home/menu_level/menu_level_1b/menu_level_2b/menu_level_3b',
      //                 },
      //               ],
      //             },
      //           ],
      //         },
      //       ],
      //     },
      //     {
      //       title: t('item_disabled'),
      //       path: '#disabled',
      //       icon: ICONS.disabled,
      //       disabled: true,
      //     },
      //     {
      //       title: t('item_label'),
      //       path: '#label',
      //       icon: ICONS.label,
      //       info: (
      //         <Label color="info" startIcon={<Iconify icon="solar:bell-bing-bold-duotone" />}>
      //           NEW
      //         </Label>
      //       ),
      //     },
      //     {
      //       title: t('item_caption'),
      //       path: '#caption',
      //       icon: ICONS.menuItem,
      //       caption:
      //         'Quisque malesuada placerat nisl. In hac habitasse platea dictumst. Cras id dui. Pellentesque commodo eros a enim. Morbi mollis tellus ac sapien.',
      //     },
      //     {
      //       title: t('item_external_link'),
      //       path: 'https://www.google.com/',
      //       icon: ICONS.external,
      //     },
      //     {
      //       title: t('blank'),
      //       path: paths.home.blank,
      //       icon: ICONS.blank,
      //     },
      //   ],
      // },
    ],
    [t]
  );

  return data;
}


