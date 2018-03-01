<template>
  <div class="mainCon">
      <slot></slot> 
  </div>
</template>
<script>
export default {
  methods: {
    clickHandler() {
      alert(Date.now())
    }
  },
  init() {
    console.log(1);
  }
}
</script>

