import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import creditCard from '@iconify/icons-eva/credit-card-fill';
import phonefill from '@iconify/icons-eva/phone-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill),
  },
  {
    title: 'Banking',
    path: '/dashboard/banking',
    icon: getIcon(creditCard),
  },
  {
    title: 'Mobile',
    path: '/dashboard/telco',
    icon: getIcon(phonefill),
  },
];

export default sidebarConfig;
