<template>
    <v-card style="min-height:100px;padding:18px">
         <div class="mb-2"><b>{{$t('Titolari attivi')}}: </b> {{ownersStat.active}}</div>
        <div class="mb-2"><b>{{$t('Titolari disattivati')}}: </b> {{ownersStat.notactive}}</div>
        <div class="mb-2"><b>{{$t('Titolari totali')}}: </b> {{ownersStat.total}}</div>

    </v-card>
</template>
<script>
  import {mapState} from 'vuex'
  export default {
    name: 'OwnersStat',
    computed: {
      ...mapState('owners', ['ownersStat'])
    }
  }
</script>
