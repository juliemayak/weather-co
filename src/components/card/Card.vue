<template lang="pug">
.card
  section.card__header
    .card__header-data
      CloudIcon
      span {{ $attrs.cloudiness }}%
    .card__header-data
      WindIcon
      span {{ $attrs.windSpeed }}m/s
    .card__header-data
      HumidityIcon
      span {{ $attrs.humidity }}%
  section.card__body
    h2.card__body-value {{ roundTemperature($attrs.temp) }}
    .card__body-right
      span.card__body-right-label &deg;C
      .card__body-right-high 
        ArrowUp
        span {{ roundTemperature($attrs.temp_max) }}&deg;
      .card__body-right-low  
        ArrowDown
        span {{ roundTemperature($attrs.temp_min) }}&deg;

  section.card__footer
    h3.card__footer-name {{ $attrs.name }}, {{ $attrs.countryCode}}
    p.card__footer-description Feels like {{ roundTemperature($attrs.feels_like) }}&deg;C
    p.card__footer-description {{  $attrs.description }}
    component.card__footer-icon(:is="getWeatherIcon($attrs.id)")

</template>

<script>
import WeatherMixin from "@/mixins/weather";
import ArrowUp from "@/components/svg/high";
import ArrowDown from "@/components/svg/low";
import CloudIcon from "@/components/svg/indicators/cloud";
import HumidityIcon from "@/components/svg/indicators/humidity";
import WindIcon from "@/components/svg/indicators/wind";

export default {
  name: "Card",

  components: {
    ArrowUp,
    ArrowDown,
    CloudIcon,
    HumidityIcon,
    WindIcon,
  },

  inheritAttrs: false,

  mixins: [WeatherMixin],
};
</script>

<style scoped lang="scss">
@import "./card.scss";
</style>
