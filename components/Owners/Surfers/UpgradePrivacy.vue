<template>
    <div>
        <v-btn :disabled="!canSave" color="success" @click="onUpgrade()">Accept</v-btn>
    </div>
</template>

<script>
    import { mapActions, mapState, mapGetters } from 'vuex'
    export default {
      name: 'UpgradePrivacy',
      methods: {
        ...mapActions('terms', ['onUpgrade']),
        ...mapActions('terms', ['updatePrivacy'])
      },
      computed: {
        ...mapState('terms', ['$record']),
        ...mapGetters('auth', ['canSave'])
      }
    }
</script>

<style scoped>

</style>
