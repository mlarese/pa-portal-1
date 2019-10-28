<template>

    <v-speed-dial v-model="toggle" left direction="top" class="text-xs-center" :title="$t('Delete')">
        <v-btn slot="activator" v-model="toggle" :color="color" dark flat fab>
            <v-icon medium>delete</v-icon>
        </v-btn>

        <v-btn dark small color="red">
            {{$t('Cancel')}}
        </v-btn>
        <v-btn dark small color="green" @click="$listeners.click">
            {{$t('Delete')}}
        </v-btn>
    </v-speed-dial>

</template>
<script>
  export default {
    name: 'SpeedDelete',
    props: {
      color: {default: 'grey darken-1'}
    },
    data () {
      return {
        toggle: false
      }
    }
  }
</script>
