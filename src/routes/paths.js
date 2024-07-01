import { paramCase } from 'src/utils/change-case';

import { _id, _postTitles } from 'src/_mock/assets';

// ----------------------------------------------------------------------

const MOCK_ID = _id[1];

const MOCK_TITLE = _postTitles[2];

const ROOTS = {
  AUTH: '/auth',
  AUTH_DEMO: '/auth-demo',
  HOME: '/home',
};

// ----------------------------------------------------------------------

export const paths = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/error/403',
  page404: '/error/404',
  page500: '/error/500',
  components: '/components',
  docs: 'https://docs.minimals.cc',
  changelog: 'https://docs.minimals.cc/changelog',
  zoneUI: 'https://mui.com/store/items/zone-landing-page/',
  minimalUI: 'https://mui.com/store/items/minimal-HOME/',
  freeUI: 'https://mui.com/store/items/minimal-HOME-free/',
  figma:
    'https://www.figma.com/file/hjxMnGUJCjY7pX8lQbS7kn/%5BPreview%5D-Minimal-Web.v5.4.0?type=design&node-id=0-1&mode=design&t=2fxnS70DuiTLGzND-0',
  product: {
    root: `/product`,
    checkout: `/product/checkout`,
    details: (id) => `/product/${id}`,
    demo: {
      details: `/product/${MOCK_ID}`,
    },
  },
  post: {
    root: `/post`,
    details: (title) => `/post/${paramCase(title)}`,
    demo: {
      details: `/post/${paramCase(MOCK_TITLE)}`,
    },
  },
  // AUTH
  auth: {
    amplify: {
      login: `${ROOTS.AUTH}/amplify/login`,
      verify: `${ROOTS.AUTH}/amplify/verify`,
      register: `${ROOTS.AUTH}/amplify/register`,
      newPassword: `${ROOTS.AUTH}/amplify/new-password`,
      forgotPassword: `${ROOTS.AUTH}/amplify/forgot-password`,
    },
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
      registerDetails: `${ROOTS.AUTH}/jwt/register-details`,
    },
    firebase: {
      login: `${ROOTS.AUTH}/firebase/login`,
      verify: `${ROOTS.AUTH}/firebase/verify`,
      register: `${ROOTS.AUTH}/firebase/register`,
      forgotPassword: `${ROOTS.AUTH}/firebase/forgot-password`,
    },
    auth0: {
      login: `${ROOTS.AUTH}/auth0/login`,
    },
    supabase: {
      login: `${ROOTS.AUTH}/supabase/login`,
      verify: `${ROOTS.AUTH}/supabase/verify`,
      register: `${ROOTS.AUTH}/supabase/register`,
      newPassword: `${ROOTS.AUTH}/supabase/new-password`,
      forgotPassword: `${ROOTS.AUTH}/supabase/forgot-password`,
    },
  },
  authDemo: {
    classic: {
      login: `${ROOTS.AUTH_DEMO}/classic/login`,
      register: `${ROOTS.AUTH_DEMO}/classic/register`,
      forgotPassword: `${ROOTS.AUTH_DEMO}/classic/forgot-password`,
      newPassword: `${ROOTS.AUTH_DEMO}/classic/new-password`,
      verify: `${ROOTS.AUTH_DEMO}/classic/verify`,
    },
    modern: {
      login: `${ROOTS.AUTH_DEMO}/modern/login`,
      register: `${ROOTS.AUTH_DEMO}/modern/register`,
      forgotPassword: `${ROOTS.AUTH_DEMO}/modern/forgot-password`,
      newPassword: `${ROOTS.AUTH_DEMO}/modern/new-password`,
      verify: `${ROOTS.AUTH_DEMO}/modern/verify`,
    },
  },
  // HOME
  home: {
    // Here is the root path for the HOME
    root: `${ROOTS.HOME}/user`,
    mail: `${ROOTS.HOME}/mail`,
    chat: `${ROOTS.HOME}/chat`,
    blank: `${ROOTS.HOME}/blank`,
    kanban: `${ROOTS.HOME}/kanban`,
    calendar: `${ROOTS.HOME}/calendar`,
    fileManager: `${ROOTS.HOME}/file-manager`,
    permission: `${ROOTS.HOME}/permission`,
    general: {
      app: `${ROOTS.HOME}/app`,
      ecommerce: `${ROOTS.HOME}/ecommerce`,
      analytics: `${ROOTS.HOME}/analytics`,
      banking: `${ROOTS.HOME}/banking`,
      booking: `${ROOTS.HOME}/booking`,
      file: `${ROOTS.HOME}/file`,
    },
    user: {
      root: `${ROOTS.HOME}/user`,
      new: `${ROOTS.HOME}/user/new`,
      list: `${ROOTS.HOME}/user/list`,
      cards: `${ROOTS.HOME}/user/cards`,
      profile: `${ROOTS.HOME}/user/profile`,
      account: `${ROOTS.HOME}/user/account`,
      edit: (id) => `${ROOTS.HOME}/user/${id}/edit`,
      demo: {
        edit: `${ROOTS.HOME}/user/${MOCK_ID}/edit`,
      }, 
    },
    product: {
      root: `${ROOTS.HOME}/product`,
      new: `${ROOTS.HOME}/product/new`,
      details: (id) => `${ROOTS.HOME}/product/${id}`,
      edit: (id) => `${ROOTS.HOME}/product/${id}/edit`,
      demo: {
        details: `${ROOTS.HOME}/product/${MOCK_ID}`,
        edit: `${ROOTS.HOME}/product/${MOCK_ID}/edit`,
      },
    },
    invoice: {
      root: `${ROOTS.HOME}/invoice`,
      new: `${ROOTS.HOME}/invoice/new`,
      details: (id) => `${ROOTS.HOME}/invoice/${id}`,
      edit: (id) => `${ROOTS.HOME}/invoice/${id}/edit`,
      demo: {
        details: `${ROOTS.HOME}/invoice/${MOCK_ID}`,
        edit: `${ROOTS.HOME}/invoice/${MOCK_ID}/edit`,
      },
    },
    post: {
      root: `${ROOTS.HOME}/post`,
      new: `${ROOTS.HOME}/post/new`,
      details: (title) => `${ROOTS.HOME}/post/${paramCase(title)}`,
      edit: (title) => `${ROOTS.HOME}/post/${paramCase(title)}/edit`,
      demo: {
        details: `${ROOTS.HOME}/post/${paramCase(MOCK_TITLE)}`,
        edit: `${ROOTS.HOME}/post/${paramCase(MOCK_TITLE)}/edit`,
      },
    },
    order: {
      root: `${ROOTS.HOME}/order`,
      details: (id) => `${ROOTS.HOME}/order/${id}`,
      demo: {
        details: `${ROOTS.HOME}/order/${MOCK_ID}`,
      },
    },
    job: {
      root: `${ROOTS.HOME}/job`,
      new: `${ROOTS.HOME}/job/new`,
      details: (id) => `${ROOTS.HOME}/job/${id}`,
      edit: (id) => `${ROOTS.HOME}/job/${id}/edit`,
      demo: {
        details: `${ROOTS.HOME}/job/${MOCK_ID}`,
        edit: `${ROOTS.HOME}/job/${MOCK_ID}/edit`,
      },
    },
    tour: {
      root: `${ROOTS.HOME}/tour`,
      new: `${ROOTS.HOME}/tour/new`,
      details: (id) => `${ROOTS.HOME}/tour/${id}`,
      edit: (id) => `${ROOTS.HOME}/tour/${id}/edit`,
      demo: {
        details: `${ROOTS.HOME}/tour/${MOCK_ID}`,
        edit: `${ROOTS.HOME}/tour/${MOCK_ID}/edit`,
      },
    },
  },
};
