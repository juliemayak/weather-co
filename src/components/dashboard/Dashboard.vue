<template lang="pug">
.dashboard
  Card.dashboard__card(
    v-for="item in selectedLocations"
    :key="item.id"
    v-bind="{...item.main, ...item.weather[0], name: item.name, countryCode: item.sys.country, cloudiness: item.clouds.all, windSpeed: item.wind.speed}")
</template>

<script>
import { mapGetters } from "vuex";
import Card from "@/components/card/Card";

export default {
  name: "Dashboard",

  components: {
    Card,
  },

  computed: {
    ...mapGetters({
      selectedLocations: "GET_SELECTED_LOCATIONS",
    }),
  },
};
</script>

<style scoped lang="scss">
@import "./dashboard.scss";
</style>
