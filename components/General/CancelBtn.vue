<template>
        <v-btn flat icon :color="color" @click="$listeners.click" v-bind="$attrs">
            <v-icon>delete</v-icon>
        </v-btn>
</template>

<script>
  export default {
    name: 'CancelBtn',
    props: {
      color: {default: 'grey darken-1'}
    }
  }
</script>
