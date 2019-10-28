<template>
    <div v-scroll:debounce="{fn: onScroll, debounce: 500 }" :style="{height: height + 'px'}" style="border:1px solid red;overflow-y: auto" v-html="text">

    </div>
</template>

<script>
  export default {
    name: 'PrivacyScroller',
    methods: {
      onScroll () {
        const isEnd = this.$el.scrollTop + this.height >= this.$el.scrollHeight
        if (isEnd) {
          this.$emit('scrolled', true)
        }
      }
    },
    props: ['text', 'height']
  }
</script>

<style scoped>

</style>