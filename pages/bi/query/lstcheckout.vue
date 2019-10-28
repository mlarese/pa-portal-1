<template>
    <LastCheckout></LastCheckout>
</template>
<script>
  import LastCheckout from '../../../components/Bi/Query/LastCheckout'
  // import lastCheckOut from '../../../storeimp/fixtures/lastCheckOut'
  import {bihandler} from '../../../mixins/bipage'

  export default {
    components: {LastCheckout},
    mixins: [bihandler('bi/qrLastCheckout')],
    fetch ({store}) {
      // return store.commit('bi/qrLastCheckout/setList', lastCheckOut, {root: true})
    }
  }
</script>
