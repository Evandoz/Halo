<!-- =========================================================================================
    File Name: Main.vue
    Description: Main layout
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
    Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div
    class="layout--main"
    :class="[
      layoutTypeClass,
      navbarClasses,
      footerClasses,
      { 'no-scroll': isAppPage }
    ]"
  >
    <v-nav-menu
      :navMenuItems="navMenuItems"
      title="Matrix"
      parent=".layout--main"
    />

    <div
      id="content-area"
      :class="[contentAreaClass, { 'show-overlay': bodyOverlay }]"
    >
      <div id="content-overlay" />

      <!-- Navbar -->
      <template v-if="mainLayoutType === 'horizontal' && windowWidth >= 1200">
        <the-navbar-horizontal
          :navbarType="navbarType"
          :class="[
            { 'text-white': isNavbarDark && !isThemeDark },
            { 'text-base': !isNavbarDark && isThemeDark }
          ]"
        />

        <div style="height: 62px" v-if="navbarType === 'static'"></div>

        <h-nav-menu
          :class="[
            { 'text-white': isNavbarDark && !isThemeDark },
            { 'text-base': !isNavbarDark && isThemeDark }
          ]"
          :navMenuItems="navMenuItems"
        />
      </template>

      <template v-else>
        <the-navbar-vertical
          :navbarColor="navbarColor"
          :class="[
            { 'text-white': isNavbarDark && !isThemeDark },
            { 'text-base': !isNavbarDark && isThemeDark }
          ]"
        />
      </template>
      <!-- /Navbar -->

      <div class="content-wrapper">
        <div class="router-view">
          <div class="router-content">
            <transition :name="routerTransition">
              <div
                v-if="$route.meta.breadcrumb || $route.meta.pageTitle"
                class="router-header flex flex-wrap items-center mb-6"
              >
                <div
                  class="content-area__heading"
                  :class="{
                    'pr-4 border-0 md:border-r border-solid border-grey-light':
                      $route.meta.breadcrumb
                  }"
                >
                  <h2 class="mb-1">{{ routeTitle }}</h2>
                </div>

                <!-- BREADCRUMB -->
                <vx-breadcrumb
                  class="ml-4 md:block hidden"
                  v-if="$route.meta.breadcrumb"
                  :route="$route"
                  :isRTL="$vs.rtl"
                />

                <!-- DROPDOWN -->
                <vs-dropdown
                  vs-trigger-click
                  class="ml-auto md:block hidden cursor-pointer"
                >
                  <vs-button radius icon="icon-settings" icon-pack="feather" />

                  <vs-dropdown-menu class="w-32">
                    <vs-dropdown-item>
                      <div
                        @click="$router.push('/pages/profile').catch(() => {})"
                        class="flex items-center"
                      >
                        <feather-icon
                          icon="UserIcon"
                          class="inline-block mr-2"
                          svgClasses="w-4 h-4"
                        />
                        <span>Profile</span>
                      </div>
                    </vs-dropdown-item>
                    <vs-dropdown-item>
                      <div
                        @click="$router.push('/apps/todo').catch(() => {})"
                        class="flex items-center"
                      >
                        <feather-icon
                          icon="CheckSquareIcon"
                          class="inline-block mr-2"
                          svgClasses="w-4 h-4"
                        />
                        <span>Tasks</span>
                      </div>
                    </vs-dropdown-item>
                    <vs-dropdown-item>
                      <div
                        @click="$router.push('/apps/email').catch(() => {})"
                        class="flex items-center"
                      >
                        <feather-icon
                          icon="MailIcon"
                          class="inline-block mr-2"
                          svgClasses="w-4 h-4"
                        />
                        <span>Inbox</span>
                      </div>
                    </vs-dropdown-item>
                  </vs-dropdown-menu>
                </vs-dropdown>
              </div>
            </transition>

            <div class="content-area__content">
              <back-to-top
                bottom="5%"
                :right="$vs.rtl ? 'calc(100% - 2.2rem - 38px)' : '30px'"
                visibleoffset="500"
                v-if="!hideScrollToTop"
              >
                <vs-button
                  icon-pack="feather"
                  icon="icon-arrow-up"
                  class="shadow-lg btn-back-to-top"
                />
              </back-to-top>

              <transition :name="routerTransition" mode="out-in">
                <router-view
                  @changeRouteTitle="changeRouteTitle"
                  @setAppClasses="
                    classesStr => $emit('setAppClasses', classesStr)
                  "
                />
              </transition>
            </div>
          </div>
        </div>
      </div>
      <the-footer />
    </div>
  </div>
</template>

<script>
import BackToTop from "vue-backtotop";
import HNavMenu from "@/layouts/components/horizontal-nav-menu/HorizontalNavMenu.vue";
import TheCustomizer from "@/layouts/components/customizer/TheCustomizer.vue";
// import navMenuItems from "@/layouts/components/vx-tooltip/vertical-nav-menu/navMenuItems.js";
import TheNavbarHorizontal from "@/layouts/components/navbar/TheNavbarHorizontal.vue";
import TheNavbarVertical from "@/layouts/components/navbar/TheNavbarVertical.vue";
import TheFooter from "@/layouts/components/TheFooter.vue";
import themeConfig from "@/../themeConfig.js";
import VNavMenu from "@/layouts/components/vx-tooltip/vertical-nav-menu/VerticalNavMenu.vue";

export default {
  components: {
    BackToTop,
    HNavMenu,
    TheFooter,
    TheNavbarHorizontal,
    TheNavbarVertical,
    VNavMenu,
    TheCustomizer
  },
  data() {
    return {
      footerType: themeConfig.footerType || "static",
      hideScrollToTop: themeConfig.hideScrollToTop,
      isNavbarDark: false,
      navbarColor: themeConfig.navbarColor || "#fff",
      navbarType: themeConfig.navbarType || "floating",
      navMenuItems: [
        {
          url: "/overview",
          name: "概览",
          slug: "overview",
          icon: "ActivityIcon"
        },
        {
          header: "集群管理",
          icon: "LayersIcon",
          i18n: "UI",
          items: [
            {
              url: null,
              tag: "4",
              icon: "LayersIcon",
              tagColor: "primary",
              name: "Matrix 集群",
              slug: "data-list-list-view",
              i18n: "ListView",
              submenu: [
                {
                  url: null,
                  name: "集群监控",
                  slug: "data-list-list-view",
                  i18n: "ListView"
                },

                {
                  url: null,
                  name: "活跃集群",
                  tag: "3",
                  tagColor: "success",
                  slug: "data-list-list-view",
                  i18n: "ListView"
                },
                {
                  url: null,
                  name: "异常集群",
                  tag: "1",
                  tagColor: "danger",
                  slug: "data-list-list-view",
                  i18n: "ListView"
                },
                {
                  url: null,
                  name: "集群部署",
                  slug: "data-list-list-view",
                  i18n: "ListView"
                }
              ]
            },
            {
              url: null,
              name: "主机管理",
              tag: "172",
              tagColor: "success",
              icon: "ServerIcon",
              i18n: "DataList",
              submenu: [
                {
                  url: null,
                  name: "主机监控",
                  slug: "data-list-list-view",
                  i18n: "ListView"
                },
                {
                  url: null,
                  tag: "12",
                  tagColor: "primary",
                  name: "配置主机",
                  slug: "data-list-list-view",
                  i18n: "ListView"
                },
                {
                  url: null,
                  name: "正常主机",
                  tag: "172",
                  tagColor: "success",
                  slug: "data-list-thumb-view",
                  i18n: "ThumbView"
                },
                {
                  url: null,
                  name: "异常主机",
                  tag: "3",
                  tagColor: "danger",
                  slug: "data-list-thumb-view",
                  i18n: "ThumbView"
                },
                {
                  url: null,
                  name: "远程管理",
                  slug: "data-list-thumb-view",
                  i18n: "ThumbView"
                }
              ]
            },
            {
              url: null,
              name: "Redis 管理",
              tag: "3",
              tagColor: "success",
              icon: "CpuIcon",
              i18n: "DataList",
              submenu: [
                {
                  url: null,
                  name: "集群监控",
                  slug: "data-list-list-view",
                  i18n: "ListView"
                },
                {
                  url: null,
                  name: "活跃集群",
                  tag: "3",
                  tagColor: "success",
                  slug: "data-list-list-view",
                  i18n: "ListView"
                },
                {
                  url: null,
                  name: "异常集群",
                  tag: "1",
                  tagColor: "danger",
                  slug: "data-list-list-view",
                  i18n: "ListView"
                },
                {
                  url: null,
                  name: "集群部署",
                  slug: "data-list-list-view",
                  i18n: "ListView"
                }
              ]
            }
          ]
        },

        {
          header: "业务管理",
          icon: "LayersIcon",
          i18n: "UI",
          items: [
            {
              url: null,
              name: "项目管理",
              tag: "8",
              tagColor: "success",
              icon: "FolderIcon",
              i18n: "DataList",
              submenu: [
                {
                  url: null,
                  name: "项目监控",
                  slug: "data-list-list-view",
                  i18n: "ListView"
                },
                {
                  url: null,
                  name: "正常项目",
                  tag: "4",
                  tagColor: "success",
                  slug: "data-list-list-view",
                  i18n: "ListView"
                },
                {
                  url: null,
                  name: "项目部署",
                  tag: "2",
                  tagColor: "primary",
                  slug: "data-list-list-view",
                  i18n: "ListView"
                },
                {
                  url: null,
                  name: "归档项目",
                  tag: "8",
                  tagColor: "success",
                  slug: "data-list-thumb-view",
                  i18n: "ThumbView"
                }
              ]
            },
            {
              url: null,
              name: "执行器",
              tag: "55",
              tagColor: "success",
              icon: "ZapIcon",
              i18n: "DataList",
              submenu: [
                {
                  url: null,
                  name: "执行器监控",
                  slug: "data-list-list-view",
                  i18n: "ListView"
                },
                {
                  url: null,
                  name: "活跃执行器实例",
                  tag: "55",
                  tagColor: "success",
                  slug: "data-list-list-view",
                  i18n: "ListView"
                },
                {
                  url: null,
                  name: "异常执行器实例",
                  tag: "9",
                  tagColor: "danger",
                  slug: "data-list-list-view",
                  i18n: "ListView"
                },
                {
                  url: null,
                  name: "执行器类型",
                  tag: "32",
                  tagColor: "primary",
                  slug: "data-list-list-view",
                  i18n: "ListView"
                },
                {
                  url: null,
                  name: "动态部署服务",
                  slug: "data-list-list-view",
                  i18n: "ListView"
                }
              ]
            }
          ]
        },

        {
          header: "运行管理",
          i18n: "UI",
          items: [
            {
              url: null,
              name: "数据流",
              tag: "8",
              tagColor: "success",
              icon: "GitBranchIcon",
              i18n: "DataList",
              submenu: [
                {
                  url: null,
                  name: "数据流监控",
                  slug: "data-list-list-view",
                  i18n: "ListView"
                },
                {
                  url: null,
                  name: "数据流管理",
                  slug: "data-list-list-view",
                  i18n: "ListView"
                },
                {
                  url: null,
                  name: "正常数据流",
                  tag: "8",
                  tagColor: "success",
                  slug: "data-list-thumb-view",
                  i18n: "ThumbView"
                },
                {
                  url: null,
                  name: "异常数据流",
                  tag: "2",
                  tagColor: "warning",
                  slug: "data-list-thumb-view",
                  i18n: "ThumbView"
                }
              ]
            },
            {
              url: null,
              name: "负载任务",
              tag: "292",
              tagColor: "primary",
              icon: "MenuIcon",
              i18n: "DataList",
              submenu: [
                {
                  url: null,
                  name: "任务监控",
                  slug: "data-list-list-view",
                  i18n: "ListView"
                },
                {
                  url: null,
                  name: "主动任务",
                  tag: "69",
                  tagColor: "primary",
                  slug: "data-list-list-view",
                  i18n: "ListView"
                },
                {
                  url: null,
                  name: "被动任务",
                  tag: "223",
                  tagColor: "primary",
                  slug: "data-list-thumb-view",
                  i18n: "ThumbView"
                },
                {
                  url: null,
                  name: "已完成任务",
                  tag: "1132",
                  tagColor: "success",
                  slug: "data-list-thumb-view",
                  i18n: "ThumbView"
                },
                {
                  url: null,
                  name: "异常任务",
                  tag: "11",
                  tagColor: "danger",
                  slug: "data-list-thumb-view",
                  i18n: "ThumbView"
                }
              ]
            },
            {
              url: null,
              name: "消息队列",
              i18n: "DataList",
              submenu: [
                {
                  url: null,
                  name: "消息监控",
                  slug: "data-list-list-view",
                  i18n: "ListView"
                },
                {
                  url: null,
                  name: "集群状态",
                  slug: "data-list-list-view",
                  i18n: "ListView"
                }
              ]
            },
            {
              url: null,
              name: "数据输出",
              icon: "HardDriveIcon",
              i18n: "DataList",
              submenu: [
                {
                  url: null,
                  name: "对象存储监控",
                  slug: "data-list-list-view",
                  i18n: "ListView"
                },
                {
                  url: null,
                  name: "数据库监控",
                  slug: "data-list-list-view",
                  i18n: "ListView",
                  submenu: [
                    {
                      url: null,
                      name: "Mongo DB",
                      slug: "data-list-list-view",
                      i18n: "ListView"
                    },
                    {
                      url: null,
                      name: "HDFS",
                      slug: "data-list-list-view",
                      i18n: "ListView"
                    },
                    {
                      url: null,
                      name: "Hive",
                      slug: "data-list-list-view",
                      i18n: "ListView"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          header: "资源",
          i18n: "UI",
          items: [
            {
              url: null,
              name: "数据分析平台",
              icon: "PieChartIcon",
              i18n: "DataList"
            },
            {
              url: null,
              name: "Docker 私有仓库",
              icon: "PieChartIcon",
              i18n: "DataList"
            }
          ]
        }
      ],
      routerTransition: themeConfig.routerTransition || "none",
      routeTitle: this.$route.meta.pageTitle
    };
  },
  watch: {
    $route() {
      this.routeTitle = this.$route.meta.pageTitle;
    },
    isThemeDark(val) {
      const color = this.navbarColor == "#fff" && val ? "#10163a" : "#fff";
      this.updateNavbarColor(color);
    },
    "$store.state.mainLayoutType"(val) {
      this.setNavMenuVisibility(val);
    }
  },
  computed: {
    bodyOverlay() {
      return this.$store.state.bodyOverlay;
    },
    contentAreaClass() {
      if (this.mainLayoutType === "vertical") {
        if (this.verticalNavMenuWidth == "default")
          return "content-area-reduced";
        else if (this.verticalNavMenuWidth == "reduced")
          return "content-area-lg";
        else return "content-area-full";
      }
      // else if(this.mainLayoutType === "boxed") return "content-area-reduced"
      else return "content-area-full";
    },
    footerClasses() {
      return {
        "footer-hidden": this.footerType == "hidden",
        "footer-sticky": this.footerType == "sticky",
        "footer-static": this.footerType == "static"
      };
    },
    isAppPage() {
      return this.$route.meta.no_scroll;
    },
    isThemeDark() {
      return this.$store.state.theme == "dark";
    },
    layoutTypeClass() {
      return `main-${this.mainLayoutType}`;
    },
    mainLayoutType() {
      return this.$store.state.mainLayoutType;
    },
    navbarClasses() {
      return {
        "navbar-hidden": this.navbarType == "hidden",
        "navbar-sticky": this.navbarType == "sticky",
        "navbar-static": this.navbarType == "static",
        "navbar-floating": this.navbarType == "floating"
      };
    },
    verticalNavMenuWidth() {
      return this.$store.state.verticalNavMenuWidth;
    },
    windowWidth() {
      return this.$store.state.windowWidth;
    }
  },
  methods: {
    changeRouteTitle(title) {
      this.routeTitle = title;
    },
    updateNavbar(val) {
      if (val == "static")
        this.updateNavbarColor(this.isThemeDark ? "#10163a" : "#fff");
      this.navbarType = val;
    },
    updateNavbarColor(val) {
      this.navbarColor = val;
      if (val == "#fff") this.isNavbarDark = false;
      else this.isNavbarDark = true;
    },
    updateFooter(val) {
      this.footerType = val;
    },
    setNavMenuVisibility(layoutType) {
      if (
        (layoutType === "horizontal" && this.windowWidth >= 1200) ||
        (layoutType === "vertical" && this.windowWidth < 1200)
      ) {
        this.$store.commit("TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE", false);
        this.$store.dispatch("updateVerticalNavMenuWidth", "no-nav-menu");
      } else {
        this.$store.commit("TOGGLE_IS_VERTICAL_NAV_MENU_ACTIVE", true);
      }
    },
    toggleHideScrollToTop(val) {
      this.hideScrollToTop = val;
    }
  },
  created() {
    const color =
      this.navbarColor == "#fff" && this.isThemeDark
        ? "#10163a"
        : this.navbarColor;
    this.updateNavbarColor(color);
    this.setNavMenuVisibility(this.$store.state.mainLayoutType);
  }
};
</script>
