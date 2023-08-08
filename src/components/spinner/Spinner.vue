<template lang="pug">
svg(viewBox="0 0 100 100")
  defs
    linearGradient(id="Gradient" x1="50%" y1="0%" x2="50%" y2="100%")
      stop(offset="0%" stop-color="#7A5FFF")
        animate(
          attributeName="stop-color"
          values="#7A5FFF; #ff01bb; #7A5FFF"
          dur="4s"
          repeatCount="indefinite")

      stop(offset="100%" stop-color="#ff01bb")
        animate(
          attributeName="stop-color"
          values="#ff01bb; #7A5FFF; #ff01bb"
          dur="4s"
          repeatCount="indefinite")
  circle(class="circle" cx="50" cy="50" r="30" fill="none")
</template>

<style scoped lang="scss">
@import "./spinner.scss";
</style>
