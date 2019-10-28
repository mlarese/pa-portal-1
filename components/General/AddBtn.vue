<template>
    <div class="add-btn">
        <v-btn fab small dark color="teal lighten-1" @click="$listeners.click" v-bind="$attrs">
            <v-icon small>add</v-icon>
        </v-btn>
        <span :style="color, backgroundColor">{{$t(add)}}</span>
    </div>
</template>

<script>
  export default {
    props: {
      backgroundColor: {default: 'teal'},
      color: {default: 'white'},
      add: {default: 'Aggiungi'}
    }
  }
</script>

<style>

</style>
