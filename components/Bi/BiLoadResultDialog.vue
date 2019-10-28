<template>
    <v-dialog v-model="show" persistent max-width="500">
        <v-toolbar dense color="blue" dark >
            <v-toolbar-title class="subheading">
                <v-icon>save</v-icon>
                {{$t('Carica Risultati')}}
            </v-toolbar-title>
        </v-toolbar>
        <v-card class="pa-3">

            <BiResultList
                @result-loaded="onResultLoaded"
            />
            <v-card-actions>
                <a v-show="false"></a>
                <v-spacer></v-spacer>
                <v-btn class="elevation-1"  @click.native="onCancel">{{$t('Cancel')}}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import BiResultList from './BiResultList'

  export default {
    name: 'BiLoadResultDialog',
    components: {
      BiResultList
    },
    computed: {
      ...mapGetters('auth', ['canSave'])
    },
    methods: {
      ...mapActions('bi/qrLastCheckout', ['saveResultList']),
      onResultLoaded () {
        this.$emit('on-close')
      },
      onCancel () {
        this.$emit('on-cancel')
      }
    },
    props: {
      show: {default: false}
    }
  }
</script>
