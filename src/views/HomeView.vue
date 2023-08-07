<template lang="pug">
.home
  Header.home__header(@openModal="toggleModal")
  Modal(:isVisible="isModalVisible" @closeModal="toggleModal")
  
  Spinner(v-if="isLoading")
  Dashboard(v-else)
</template>

<script>
import { mapGetters } from "vuex";
import { UPDATE_SELECTED_LOCATIONS } from "@/store/mutation-types";
import ScrollHeader from "@/modules/scroll-header";

import Header from "@/components/header/Header.vue";
import Modal from "@/components/modal/Modal.vue";

import Dashboard from "@/components/dashboard/Dashboard.vue";
import Spinner from "@/components/spinner/Spinner.vue";

export default {
  name: "HomeView",
  components: {
    Header,
    Modal,
    Dashboard,
    Spinner,
  },

  data() {
    return {
      isModalVisible: false,
    };
  },

  computed: {
    ...mapGetters({
      isLoading: "GET_IS_LOADING",
    }),
  },

  mounted() {
    this.$store.commit(UPDATE_SELECTED_LOCATIONS);
    this.$store.dispatch("checkLocationsData");
    new ScrollHeader();
  },

  methods: {
    toggleModal() {
      this.isModalVisible = !this.isModalVisible;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../sass/pages/home.scss";
</style>
