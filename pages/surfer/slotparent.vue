<template>
    <div>
        <slot-child>
            <p>I'm injected content from the parent!</p>
            <p>I can still bind to data in the parent's scope, like this! {{text}}</p>
        </slot-child>
        <slot-child/>
    </div>
</template>

<script>
    import SlotChild from '../../components/Slots/SlotChild'

export default {
      components: {
        SlotChild
      },
      auth: false,
      data () {
        return {
          text: `I'm just a lonely old variable.`
        }
      }
    }
</script>

<style scoped>

</style>
