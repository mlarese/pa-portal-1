<template>
        <v-btn :style="{backgroundColor, color}">{{btnName}}</v-btn>
</template>

<script>
  export default {
    props: {
      backgroundColor: {default: '#AEEA00'},
      color: {default: 'white'},
      btnName: {default: 'Programma Publicazione'}
    }
  }
</script>

<style>

</style>