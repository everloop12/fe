import CottageRoundedIcon from '@mui/icons-material/CottageRounded';
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import ReceiptRoundedIcon from '@mui/icons-material/ReceiptRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import SellRoundedIcon from '@mui/icons-material/SellRounded';
import QuizRoundedIcon from '@mui/icons-material/QuizRounded';
import { BookRounded} from '../../node_modules/@mui/icons-material/index';
//import { SortRounded } from '../../node_modules/@mui/icons-material/index';
const dashboard = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'main',
      title: 'Home',
      type: 'item',
      url: '/',
      icon: CottageRoundedIcon,
      breadcrumbs: false
    },
    {
      id: 'dashboard',
      title: 'Question Bank',
      type: 'item',
      url: '/main',
      icon: MenuBookRoundedIcon,
      breadcrumbs: false
    },
    {
      id: 'history',
      title: 'Answer History',
      type: 'item',
      url: '/history',
      icon: HistoryRoundedIcon,
      breadcrumbs: false
    },
    {
      id: 'analytics',
      title: 'Analytics',
      type: 'item',
      url: '/analytics',
      icon: BarChartRoundedIcon,
      breadcrumbs: false
    },
    // {
    //   id: 'LongCases',
    //   title: 'Long-Cases',
    //   type: 'item',
    //   url: '/LongCases',
    //   icon: GamepadRounded,
    //   breadcrumbs: false
    // },
    {
      id: 'Study Planner',
      title: 'Study Planner',
      type: 'item',
      url: '/study-planner',
      icon: BookRounded,
      breadcrumbs: false
    },
    {
      id: 'subscription',
      title: 'Subscriptions',
      type: 'item',
      url: '/subs',
      icon: ReceiptRoundedIcon,
      breadcrumbs: false
    },
    //{
      //id: 'long cases',
     // title: 'long-cases',
     // type: 'item',
     // url: '/longcases',
     // icon: SortRounded ,
      //breadcrumbs: false
    //},
    {
      id: 'users',
      title: 'Users',
      type: 'item',
      url: '/users',
      icon: PersonRoundedIcon,
      breadcrumbs: false,
      admin: true
    },
    {
      id: 'categories',
      title: 'Categories',
      type: 'item',
      url: '/categorylist',
      icon: BookmarkRoundedIcon,
      breadcrumbs: false,
      admin: true
    },
    {
      id: 'tags',
      title: 'Tags',
      type: 'item',
      url: '/taglist',
      icon: SellRoundedIcon,
      breadcrumbs: false,
      admin: true
    },
    {
      id: 'question',
      title: 'Questions',
      type: 'item',
      url: '/questionList',
      icon: QuizRoundedIcon,
      breadcrumbs: false,
      admin: true
    }
  ]
};

export default dashboard;
