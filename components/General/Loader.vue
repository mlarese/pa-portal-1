<template>
    <div class="loading-page" v-if="loading">

    </div>
</template>

<script>
  import _delay from 'lodash/delay'

  export default {
    data: () => ({
      loading: false
    }),
    methods: {
      start () {
        this.loading = true
      },
      finish () {
        _delay(() => { this.loading = false }, 400)
      }
    }
  }
</script>

<style scoped>
    .loading-page {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.9);
        text-align: center;
        padding-top: 200px;
        font-size: 30px;
        font-family: sans-serif;
        z-index: 9999999;
    }
</style>
