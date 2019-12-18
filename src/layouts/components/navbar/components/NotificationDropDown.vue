<template>
  <!-- NOTIFICATIONS -->
  <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
    <feather-icon
      icon="BellIcon"
      class="cursor-pointer mt-1 sm:mr-6 mr-2"
      :badge="unreadNotifications.length"
    />

    <vs-dropdown-menu
      class="notification-dropdown dropdown-custom vx-navbar-dropdown"
    >
      <div class="notification-top text-center p-5 bg-primary text-white">
        <h3 class="text-white">{{ unreadNotifications.length }} 条新消息</h3>
        <p class="opacity-75">系统消息提醒</p>
      </div>

      <VuePerfectScrollbar
        ref="mainSidebarPs"
        class="scroll-area--nofications-dropdown p-0 mb-10"
        :settings="settings"
        :key="$vs.rtl"
      >
        <ul class="bordered-items">
          <li
            v-for="ntf in unreadNotifications"
            :key="ntf.index"
            class="flex justify-between px-4 py-4 notification cursor-pointer"
          >
            <div class="flex items-start">
              <feather-icon
                :icon="ntf.icon"
                :svgClasses="[
                  `text-${ntf.category}`,
                  'stroke-current mr-1 h-6 w-6'
                ]"
              ></feather-icon>
              <div class="mx-2">
                <span
                  class="font-medium block notification-title"
                  :class="[`text-${ntf.category}`]"
                  >{{ ntf.title }}</span
                >
                <small>{{ ntf.msg }}</small>
              </div>
            </div>
            <small class="mt-1 whitespace-no-wrap">{{
              elapsedTime(ntf.time)
            }}</small>
          </li>
        </ul>
      </VuePerfectScrollbar>

      <div
        class="
        checkout-footer
        fixed
        bottom-0
        rounded-b-lg
        text-primary
        w-full
        p-2
        font-semibold
        text-center
        border
        border-b-0
        border-l-0
        border-r-0
        border-solid
        d-theme-border-grey-light
        cursor-pointer"
      >
        <span>查看全部消息</span>
      </div>
    </vs-dropdown-menu>
  </vs-dropdown>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";

export default {
  components: {
    VuePerfectScrollbar
  },
  data() {
    return {
      unreadNotifications: [
        {
          index: 0,
          title: "新主机已成功初始化",
          msg: "Are your going to meet me tonight?",
          icon: "ServerIcon",
          time: this.randomDate({ sec: 10 }),
          category: "success"
        },
        {
          index: 1,
          title: "负载任务 task-6ebc0a 已部署",
          msg: "You got new order of goods.",
          icon: "MenuIcon",
          time: this.randomDate({ sec: 40 }),
          category: "success"
        },
        {
          index: 2,
          title: "主机 USA-LA-2 已失去心跳",
          msg: "Server have 99% CPU usage.",
          icon: "ServerIcon",
          time: this.randomDate({ min: 1 }),
          category: "danger"
        },
        {
          index: 3,
          title: "负载任务 task-5efa9e 已完成",
          msg: "Cake sesame snaps cupcake",
          icon: "MenuIcon",
          time: this.randomDate({ min: 6 }),
          category: "primary"
        },
        {
          index: 4,
          title: "负载任务 task-0ad0d17 已停止",
          msg: "Chocolate cake oat cake tiramisu",
          icon: "MenuIcon",
          time: this.randomDate({ hr: 2 }),
          category: "warning"
        }
      ],
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: 0.6
      }
    };
  },
  methods: {
    elapsedTime(startTime) {
      let x = new Date(startTime);
      let now = new Date();
      var timeDiff = now - x;
      timeDiff /= 1000;

      var seconds = Math.round(timeDiff);
      timeDiff = Math.floor(timeDiff / 60);

      var minutes = Math.round(timeDiff % 60);
      timeDiff = Math.floor(timeDiff / 60);

      var hours = Math.round(timeDiff % 24);
      timeDiff = Math.floor(timeDiff / 24);

      var days = Math.round(timeDiff % 365);
      timeDiff = Math.floor(timeDiff / 365);

      var years = timeDiff;

      if (years > 0) {
        return years + (years > 1 ? " Years " : " Year ") + "ago";
      } else if (days > 0) {
        return days + (days > 1 ? " Days " : " Day ") + "ago";
      } else if (hours > 0) {
        return hours + (hours > 1 ? " Hrs " : " Hour ") + "ago";
      } else if (minutes > 0) {
        return minutes + (minutes > 1 ? " Mins " : " Min ") + "ago";
      } else if (seconds > 0) {
        return seconds + (seconds > 1 ? " sec ago" : "just now");
      }

      return "Just Now";
    },
    // Method for creating dummy notification time
    randomDate({ hr, min, sec }) {
      let date = new Date();

      if (hr) date.setHours(date.getHours() - hr);
      if (min) date.setMinutes(date.getMinutes() - min);
      if (sec) date.setSeconds(date.getSeconds() - sec);

      return date;
    }
  }
};
</script>
