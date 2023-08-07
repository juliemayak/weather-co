<template lang="pug">
.search-bar 
  h4.search-bar__title Search For Location.
  .search-bar__input-wrapper
    input.search-bar__input(
      type="text"
      placeholder="Search City..."
      v-model.trim="searchValue"
      @keydown.enter="handleSearch"
      )
    span.search-bar__input-focus-border
    SearchIcon.search-bar__input-icon(@click="handleSearch")
  .search-bar__notification(v-if="isDuplicate || isError") {{ getNotificationMessage }}
</template>

<script>
import SearchIcon from "@/components/svg/search";
import { mapGetters } from "vuex";

export default {
  name: "Search",

  components: { SearchIcon },

  data() {
    return {
      searchValue: "",
    };
  },

  computed: {
    ...mapGetters({
      isDuplicate: "GET_IS_DUPLICATE",
      isError: "GET_IS_ERROR",
    }),
    getNotificationMessage() {
      if (this.isDuplicate) {
        return "This city has already been added to the Dashboard.";
      }
      if (this.isError) {
        return "No city found. Please check the spelling.";
      }
    },
  },

  methods: {
    handleSearch() {
      this.$emit("handleSearch", this.searchValue);
      this.searchValue = "";
    },
  },
};
</script>

<style scoped lang="scss">
@import "./search-bar.scss";
</style>
