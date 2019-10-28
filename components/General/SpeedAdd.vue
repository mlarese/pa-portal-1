<template>

        <v-speed-dial v-model="toggle" right bottom direction="top" class="text-xs-left" :title="$t('Add')">
            <v-btn slot="activator" v-model="toggle" :color="color" dark  small>

                {{$t(caption)}}
            </v-btn>

            <v-btn dark small color="red" ml-5>
                {{$t('Cancel')}}
            </v-btn>
            <v-btn dark small color="green" @click="$listeners.click">
                {{$t('Add')}}
            </v-btn>

        </v-speed-dial>

</template>
<script>
  export default {
    name: 'SpeedDelete',
    props: {
      color: {default: 'teal lighten-1'},
      caption: {default: ''}
    },
    data () {
      return {
        toggle: false
      }
    }
  }
</script>
