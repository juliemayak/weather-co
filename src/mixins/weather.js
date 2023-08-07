import CloudSvg from "@/components/svg/weather/cloud.vue";
import SunSvg from "@/components/svg/weather/sun.vue";
import RainSvg from "@/components/svg/weather/rain.vue";
import SnowSvg from "@/components/svg/weather/snow.vue";
import ThunderSvg from "@/components/svg/weather/thunderstorm.vue";

export default {
  name: "WeatherMixin",

  components: {
    CloudSvg,
    SunSvg,
    RainSvg,
    SnowSvg,
    ThunderSvg,
  },

  methods: {
    isThunderstorm(id) {
      return id > 199 && id < 233;
    },
    isDrizzle(id) {
      return id > 299 && id < 322;
    },
    isRain(id) {
      return id > 499 && id < 532;
    },
    isSnow(id) {
      return id > 599 && id < 623;
    },
    isClearSky(id) {
      return id === 800;
    },
    getWeatherIcon(id) {

      if (this.isThunderstorm(id)) {
        return ThunderstormSvg;
      }

      if (this.isDrizzle(id) || this.isRain(id)) {
        return RainSvg;
      }

      if (this.isSnow(id)) {
        return SnowSvg;
      }

      if (this.isClearSky(id)) {
        return SunSvg;
      }

      return CloudSvg;
    },
    roundTemperature(temp) {
      return Math.round(temp);
    },
  }
}