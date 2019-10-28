<template>
    <div>
        <v-list-tile-content :item="item">
            <v-list-tile-title v-model="item.filename"></v-list-tile-title>
            <v-text-field v-model="item.description"></v-text-field>
        </v-list-tile-content>
    </div>
</template>

<script>
    export default {
      name: 'attachmentItem',
      props: ['item']
    }
</script>

<style scoped>

</style>
