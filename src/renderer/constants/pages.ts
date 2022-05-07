import { SettingsIcon, TimeIcon } from '@chakra-ui/icons';

const pages = [
  {
    id: 1,
    title: 'Main',
    href: '/',
  },
  {
    id: 2,
    title: 'History',
    Icon: TimeIcon,
    href: '/history',
  },
  {
    id: 3,
    title: 'Settings',
    Icon: SettingsIcon,
    href: '/settings',
  },
  {
    id: 4,
    title: 'Currency',
    Icon: SettingsIcon,
    href: '/currency',
  },
];

export default pages;
