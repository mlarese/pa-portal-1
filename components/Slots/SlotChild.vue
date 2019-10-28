<template>
    <div>
        <p>I'm the child slot!</p>
        <slot>
            <strong>im still your maker sayeth the lord</strong>
        </slot>
    </div>
</template>

<script>
    export default {
      name: 'SlotChild'
    }
</script>

<style scoped>

</style>
