<template>
    <div>
        <h1>The Item:</h1>
        <slot v-bind="item">{{ item.name }}</slot>
        <slot v-bind="sin">{{ sin.name }}</slot>
        <slot v-bind="me">{{ me.name }}</slot>
        <slot v-bind="you">{{ you.name }}</slot>
    </div>
</template>

<script>
    export default {
      data () {
        return {
          item: { name: 'Item', price: 900 },
          sin: { name: 'Pizza', price: 412 },
          me: { name: 'geova', price: 870 },
          you: { name: 'pinchio', price: 900 },
          i: { name: 'annelo', price: 900 }
        }
  }
    }
</script>

<style scoped>

</style>
