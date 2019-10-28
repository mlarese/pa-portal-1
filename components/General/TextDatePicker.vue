<template>
    <v-menu
            :close-on-content-click="false"
            v-model="menu"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            max-width="290px"
            min-width="290px"
    >
        <v-text-field
                slot="activator"
                v-model=""
                prepend-icon="event"
                readonly
        ></v-text-field>
        <v-date-picker v-model="date" no-title @input="menu = false" :locale="locale"></v-date-picker>
    </v-menu>
</template>
<script>
  export default {
    name: 'TextDatePicker',
    props: {
      locale: {default: 'it'}
    },
    data () {
      return {
        menu: false
      }
    }
  }
</script>