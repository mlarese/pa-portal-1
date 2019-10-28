<template>
    <div>
        <h4 v-text="$t('Associated flags')" class="mb-2"></h4>
        <template v-for="(t, j) in paragraph.treatments">
            <term-treatment :index="j" :key="j" :paraindex="index" />
        </template>

        <v-layout class="mt-2">
            <add-btn
                add="Add flag"
                @click="addTreatment(index)"
            />
        </v-layout>
    </div>
</template>
<script>
  import TermTreatment from './TermTreatment'
  import AddBtn from '../../General/AddBtn'
  import {mapActions} from 'vuex'

  export default {
    components: {TermTreatment, AddBtn},
    methods: {
      ...mapActions('terms', ['addTreatment'])
    },
    props: ['paragraph', 'index']
  }
</script>
