<template lang="pug">
.header(data-header)
  .header__content
    h2.header__content-title Weather Widget
    ThemeSwitcher
    SettingsIcon.header__content-icon(@click="openModal")
</template>

<script>
import SettingsIcon from "@/components/svg/settings";
import ThemeSwitcher from "@/components/theme-switcher/ThemeSwitcher.vue";

export default {
  name: "Header",

  components: {
    SettingsIcon,
    ThemeSwitcher,
  },

  methods: {
    openModal() {
      this.$emit("openModal");
    },
  },
};
</script>

<style scoped lang="scss">
@import "./header.scss";
</style>
