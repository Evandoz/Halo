/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

export default [
  // {
  //   url: "/",
  //   name: "Home",
  //   slug: "home",
  //   icon: "HomeIcon"
  // },
  // {
  //   url: "/page2",
  //   name: "Page 2",
  //   slug: "page2",
  //   icon: "FileIcon"
  // }
  {
    url: "/",
    name: "区域切换",
    tag: "4",
    tagColor: "warning",
    icon: "HomeIcon",
    i18n: "Dashboard",
    submenu: [
      {
        url: "/",
        name: "本地",
        slug: "dashboard-analytics",
        i18n: "Analytics"
      },
      {
        url: "/page2",
        name: "中国",
        slug: "dashboard-ecommerce",
        i18n: "eCommerce"
      },
      {
        url: "/page3",
        name: "海外 · 欧洲",
        slug: "dashboard-ecommerce",
        i18n: "eCommerce"
      },
      {
        url: "/page4",
        name: "海外 · 美洲",
        slug: "dashboard-ecommerce",
        i18n: "eCommerce"
      }
    ]
  }
];
