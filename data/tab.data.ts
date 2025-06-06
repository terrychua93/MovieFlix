import { icons } from "@/constants/icons";
import { TabScreenSchema } from '@data/schemes/tab-screen.schema';

const tabScreenData: TabScreenSchema[] = [
  { name: 'index', title: 'Home', icon: icons.home },
  { name: 'search', title: 'Search', icon: icons.search },
  { name: 'saved', title: 'Saved', icon: icons.save },
  { name: 'profile', title: 'Profile', icon: icons.person },
];

export default tabScreenData;