<template lang="pug">
.theme-switcher
  label#switch.theme-switcher__toggler
    input#slider.theme-switcher__checkbox(type="checkbox", :checked="is_dark", @click="switchTheme")
    span.theme-switcher__slider
</template>

<script>
const THEME_KEY = "theme";

export default {
  name: "ThemeSwitcher",
  data() {
    return {
      is_dark: false,
    };
  },
  created() {
    const saved_theme = localStorage.getItem(THEME_KEY);
    if (saved_theme) {
      this.setTheme(saved_theme);
    } else {
      const user_time = new Date().getHours();
      const time_theme = user_time < 8 || user_time >= 20 ? "dark" : "light";
      this.setTheme(time_theme, false);
    }
  },
  methods: {
    switchTheme() {
      this.setTheme(this.is_dark ? "light" : "dark");
    },

    setTheme(theme, saved_theme = true) {
      this.is_dark = theme === "dark";
      if (this.is_dark) {
        document.documentElement.classList.remove("light");
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
      }
      if (saved_theme) {
        localStorage.setItem(THEME_KEY, theme);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./theme-switcher.scss";
</style>
