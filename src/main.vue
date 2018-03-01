<template>
  <div class="mainContent">
      <slot></slot>
  </div>
</template>
<script>
import topNav from './topNav.vue';
export default {
  methods: {
    clickHandler() {
      alert(Date.now())
    }
  },
  init() {
    // console.log(1);
  }
}
</script>

