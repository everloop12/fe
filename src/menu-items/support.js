// // assets
// import { ChromeOutlined, QuestionOutlined } from '@ant-design/icons';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
// // icons
// const icons = {
//   ChromeOutlined,
//   QuestionOutlined
// };

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const support = {
  id: 'support',
  title: 'Support',
  type: 'group',
  children: [
    {
      id: 'ContactUs',
      title: 'Contact us ',
      type: 'item',
      url: '/contact',
      icon: ContactSupportIcon
    },
    {
      id: 'Terms',
      title: 'Terms of service',
      type: 'item',
      url: '/tos',
      icon: AutoStoriesIcon
    },
    // {
    //   id: 'documentation',
    //   title: 'Documentation',
    //   type: 'item',
    //   url: 'https://codedthemes.gitbook.io/mantis/',
    //   icon: icons.QuestionOutlined,
    //   external: true,
    //   target: true
    // }
  ]
};

export default support;
