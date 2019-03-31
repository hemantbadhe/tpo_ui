interface NavAttributes {
  [propName: string]: any;
}
interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}
interface NavBadge {
  text: string;
  variant: string;
}
interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}
export const navItemsStudent: NavData[] = [
  {
    title: true,
    name: 'Components'
  },
  {
    name: 'Drive',
    url: '/studentDash/theme',
    icon: 'icon-star',
    children: [
      {
        name: 'Drive List',
        url: '/studentDash/theme/typography',
        icon: 'icon-star'
      }
    ]
  },
  {
    name: 'TPO',
    url: '/studentDash/widgets',
    icon: 'icon-people',
    children: [
      {
        name: 'Student List',
        url: '/studentDash/widgets/list-student',
        icon: 'icon-people'
      }
    ]
  },
    {
    name: 'Tutorial',
    url: '/studentDash/widgets',
    icon: 'icon-question',
    children: [
      {
        name: 'Tutorial',
        url: '/studentDash/widgets/tutorial',
        icon: 'icon-question'
        
      }
    ]
  },
    {
    name: 'About Us',
    url: 'http://bsiotr.org/',
    icon: 'icon-home'
    
  }
];

export const navItems: NavData[] = [
  {
    title: true,
    name: 'Components'
  },
 
  {
    name: 'Student',
    url: '/admin/student',
    icon: 'icon-user',
    children: [
      {
        name: 'New Student',
        url: '/admin/student/new-student',
        icon: 'icon-user'
      },
      {
        name: 'Student List',
        url: '/admin/student/list-student',
        icon: 'icon-user'
      }
    ]
  },
  // {
  //   name: 'Teacher',
  //   url: '/admin/widgets',
  //   icon: 'icon-briefcase',
  //   children: [
  //     {
  //       name: 'New Teacher',
  //       url: '/admin/widgets/list-teacher',
  //       icon: 'icon-briefcase'
  //     },
  //     {
  //       name: 'Teacher List',
  //       url: '/admin/widgets/list-student',
  //       icon: 'icon-briefcase'
  //     }
  //   ]
  // },
  {
    name: 'Drive',
    url: '/admin/theme',
    icon: 'icon-star',
    children: [
      {
        name: 'New Drive',
        url: '/admin/theme/colors',
        icon: 'icon-star'
      },
      {
        name: 'Drive List',
        url: '/admin/theme/typography',
        icon: 'icon-star'
      }
    ]
  },
  {
    name: 'Placed Student',
    url: '/admin/notifications',
    icon: 'icon-graduation',
    children: [
      {
        name: 'New Placed Student',
        url: '/admin/notifications/alerts',
        icon: 'icon-graduation'
      }
    ]
  },
  {
    name: 'TPO',
    url: '/admin/widgets',
    icon: 'icon-people',
    children: [
      {
        name: 'Teacher List',
        url: '/admin/widgets/list-teacher',
        icon: 'icon-people'
      },
      {
        name: 'Student List',
        url: '/admin/widgets/list-student',
        icon: 'icon-people'
      }
    ]
  }
];
