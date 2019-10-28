<template>
    <v-menu ref="fltDtMenuCheckIn"
            :close-on-content-click="false"
            v-model="pickerVisible"
            :nudge-right="40" lazy
            style="margin-top:4px"
            transition="scale-transition"
            offset-y full-width
            max-width="290px" min-width="290px" >

        <v-text-field slot="activator"
                      v-model="dateFormatted"
                      :label="$t(label)" box
                      hide-details prepend-icon="event"
                      @blur="fltCheckinDate = parseDate(dateFormatted)" readonly>
        </v-text-field>


        <v-date-picker v-model="fltCheckinDate" no-title @input="pickerVisible = false"></v-date-picker>
    </v-menu>
</template>
<script>
  import {parseDate, formatDate} from '../../assets/helpers'
  export default {
    methods: {
      parseDate,
      formatDate
    },
    data () {
      return {
        pickerVisible: false,
        dateFormatted: null
      }
    },
    computed: {
      computedDateFormatted () {
        return this.formatDate(this.date)
      }
    },

    watch: {
      date (val) {
        this.dateFormatted = this.formatDate(this.date)
      }
    },
    props: ['label']
  }
</script>
