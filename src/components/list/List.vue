<template lang="pug">
.list
  h4.list__title Selected Locations.
  .list__content
    Draggable(
      v-model="selectedLocations"
      group="selectedLocations"
      handle=".handle"
      @change="swapItems"
      )
      template(#item="{ element: selectedLocation }")
        ListItem(
        :key="selectedLocation.id"
        :id="selectedLocation.id"
        :city="selectedLocation.name"
        :country="selectedLocation.sys.country"
        @deleteButtonClick="handleLocationRemoval(selectedLocation)"
      )
</template>

<script>
import { mapGetters } from "vuex";
import {
  DELETE_WEATHER_DATA,
  SET_IS_DUPLICATE,
  SET_IS_ERROR,
  SET_WEATHER_DATA,
} from "@/store/mutation-types";
import ListItem from "@/components/list-item/ListItem.vue";

import Draggable from "vuedraggable";

export default {
  name: "List",

  components: {
    ListItem,
    Draggable,
  },
  computed: {
    ...mapGetters({
      selectedLocations: "GET_SELECTED_LOCATIONS",
    }),
  },

  methods: {
    swapItems({ moved }) {
      const locations = [...this.selectedLocations];

      locations.splice(moved.newIndex, 0, locations.splice(moved.oldIndex, 1)[0]);

      this.$store.dispatch("setLocalStorageLocations", locations);
      this.$store.commit(SET_WEATHER_DATA, locations);
    },

    handleLocationRemoval(item) {
      this.$store.commit(DELETE_WEATHER_DATA, item.id);
      this.$store.commit(SET_IS_DUPLICATE, false);
      this.$store.commit(SET_IS_ERROR, false);

      this.$store.dispatch("setLocalStorageLocations");

      if (this.selectedLocations.length === 0) {
        this.$store.dispatch("checkLocationsData");
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import "./list.scss";
</style>
