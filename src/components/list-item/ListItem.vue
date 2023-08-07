<template lang="pug">
.list-item
  .list-item__icon-drag.handle
    DragSvg
  p.list-item__title {{ city }}, {{ country }}
  .list-item__icon-remove(@click="handleCardRemoval(id)")
    BinSvg

</template>

<script>
import BinSvg from "@/components/svg/bin";
import DragSvg from "@/components/svg/drag";

export default {
  name: "ListItem",
  components: {
    BinSvg,
    DragSvg,
  },
  props: {
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  },

  methods: {
    handleCardRemoval() {
      this.$emit("deleteButtonClick", this.id);
    },
  },
};
</script>

<style scoped lang="scss">
@import "./list-item.scss";
</style>
