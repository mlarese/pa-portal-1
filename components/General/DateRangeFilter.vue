<template>
    <v-layout wrap align-center class="pa-0 date-range-filter">
        <v-flex xs12>
            <v-toolbar   class="elevation-1" dense >
                <v-toolbar-title>{{$t(title)}}</v-toolbar-title>
                <v-spacer />

                <el-date-picker
                        @change="onChange"
                        range-separator="-"
                        :start-placeholder="$t('From')"
                        :end-placeholder="$t('To')"
                        format="dd/MM/yyyy"
                        value-format="yyyy-MM-dd"
                        class="mr-3 date-range-filter__range"
                        v-model="filter.date_range"
                        type="daterange" />
            </v-toolbar>
        </v-flex>
    </v-layout>
</template>
<script>
  export default {
    methods: {
      onChange () {
        this.$emit('on-change')
      }
    },
    props: {
      'filter': {default: () => {}},
      'title': {default: 'Periodo di riferimento'}
    }
  }
</script>
<style lang="scss">
    .el-date-table, .el-date-range-picker__header{
        font-family: Arial !important;
    }
    .date-range-filter{

        .el-picker-panel__content td div span {
            border:1px solid red;
            font-family: Arial !important;
        }

        .el-range-input{
            font-weight: normal !important;
        }

        .el-input__icon {  line-height: 0px !important;   }
        .el-range-separator {  line-height: 22px !important;   }
    }




</style>
