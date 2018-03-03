<template>
  <div id="dashboard" class="text-center">
    <h1>Welcome to dashboard</h1>
    <p>{{ text }}</p>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        text: 'user dashboard...'
      }
    }
  }
</script>

<style scoped>
  tr > td > div {
    padding: 5px 0;
  }
 .h5 {
   margin-bottom: auto;
 }
 .text-center {
   text-align: center;
 }
</style>
