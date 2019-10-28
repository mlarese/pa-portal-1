<template>
    <v-container>

        <SaveBiResultDialog
            :show="!showSaveDialog"
            @on-close="showSaveDialog=true"
            @on-cancel="showSaveDialog=true"
        />

        <BiLoadResultDialog
                :show="showSaveDialog"
                @on-close="showSaveDialog=false"
                @on-cancel="showSaveDialog=false"
        ></BiLoadResultDialog>


    </v-container>
</template>
<script>
  import SaveBiResultDialog from '../../../components/Bi/SaveBiResultDialog'
  import BiLoadResultDialog from '../../../components/Bi/BiLoadResultDialog'
  import dashsource9 from '../../../storeimp/fixtures/bi/dashsource_9'

  export default {
    layout: 'whitepage',
    components: {SaveBiResultDialog, BiLoadResultDialog},
    // auth: false,
    fetch ({store}) {
      store.dispatch('bi/qrLastCheckout/loadResultList', {}, {root: true})
      store.commit('bi/qrLastCheckout/setList', dashsource9, {root: true})
    },
    data () {
      return {
        showSaveDialog: true
      }
    },
    created () {
      if (this.$route.query.lang) this.$i18n.locale = this.$route.query.lang
    }
  }
</script>
