<template lang="pug">
button.close-button(@click="$emit('click')")
</template>

<script>
export default {
  name: "CloseButton",
  emits: ["click"],
};
</script>

<style lang="scss" scoped>
@import "./close-button.scss";
</style>
