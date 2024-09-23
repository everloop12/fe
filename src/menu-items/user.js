// assets
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import Groups3RoundedIcon from '@mui/icons-material/Groups3Rounded';
// icons


// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const userPages = {
  id: 'user',
  title: 'User',
  type: 'group',
  children: [
    {
      id: 'settings',
      title: 'Settings',
      type: 'item',
      url: '/Settings',
      icon: SettingsRoundedIcon,
    },
    {
      id: 'referrals',
      title: 'Referrals',
      type: 'item',
      url: '/referral',
      icon: Groups3RoundedIcon,
    }
  ]
};

export default userPages;
