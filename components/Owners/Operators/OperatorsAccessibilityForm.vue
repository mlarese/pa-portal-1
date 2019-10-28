<template>
    <v-container class="operators-accessibility-form" v-if="!isOwner">
        <v-form v-model="form.valid" ref="form">
        <v-layout row class="title my-2"><span class="title">{{$t('Operator Accessibility')}}</span></v-layout>
        <v-layout row>
            <v-flex xs12 sm6>
                <v-flex xs12 sm2>
                    <p>{{$t('Domain')}}</p>
                </v-flex>
                <v-flex xs12 sm6 class="my-2" v-for="(item, index) in $record.domains" :key="index" @click="">
                    <v-layout row>
                        <v-flex xs10>
                            <v-text-field
                                    :disabled="!canSave"
                                    solo
                                    v-model="item.name"
                            />
                        </v-flex>

                        <v-flex xs2>
                            <cancel-btn
                                    :disabled="!canSave"
                                    @click="onRemoveDomain(index)"
                            />
                        </v-flex>
                    </v-layout>
                </v-flex>
                <add-btn
                        :disabled="!canSave || !canAddDomain"
                        add="Aggiungi dominio"
                        @click="addDomain"

                />

            </v-flex>
            <v-flex xs12 sm6>
                <v-flex xs12 sm2>
                    <span>{{$t('Period')}}</span>
                </v-flex>
                <v-flex xs12 sm2 class="my-2">
                    <span>{{$t('From')}}</span>
                </v-flex>
                <v-flex xs12 sm6 class="py-0">
                    <el-date-picker
                            disabledDate=""
                            v-model="$record.periodFrom"
                            format="dd/MM/yyyy HH:mm:ss"
                            type="date"
                            :placeholder="$t('Select date and time')"
                            :rules="rules.startDate"
                            required
                            :picker-options="dateFromOpt"
                    />
                </v-flex>
                <v-flex xs12 sm2 class="my-1">
                    <span>{{$t('To')}}</span>
                </v-flex>
                <v-flex xs12 sm6 class="py-0">
                    <el-date-picker
                            v-model="$record.periodTo"
                            type="date"
                            format="dd/MM/yyyy HH:mm:ss"
                            :rules="rules.endDate"
                            required
                            :picker-options="dateToOpt"
                            :placeholder="$t('Select date and time')"
                    />
                </v-flex>
            </v-flex>
        </v-layout>
        </v-form>
    </v-container>
</template>

<script>
  import CancelBtn from '../../General/CancelBtn'
  import addBtn from '../../General/AddBtn'
  import {mapState, mapMutations, mapGetters} from 'vuex'
  import format from 'date-fns/format'
  import _isDate from 'lodash/isDate'

  export default {
    data () {
      return {
        periodFromVisible: false,
        periodToVisible: false,
        dateFromOpt: {
          disabledDate (time) {
            return time.getTime() <= Date.now()
          }
        },
        dateToOpt: {
          disabledDate: (time) => {
            return time.getTime() <= this.periodFromTime
          }
        },
        rules: {
          startDate: [v => !!v || this.$t('required')],
          endDate: [v => !!v || this.$t('required')]
        }
      }
    },
    filters: {
      time (value) {
        return format(value, 'dd/MM/yyyy HH:mm:ss')
      }
    },
    created () {
      if (!this.$record.created) {
        this.$record.created = new Date()
      }
      if (!_isDate(this.$record.created)) {
        this.$record.created = new Date(this.$record.created)
      }
      if (this.$record.periodFrom && !_isDate(this.$record.periodFrom)) {
        this.$record.periodFrom = new Date(this.$record.periodFrom)
      }
      if (this.$record.periodTo && !_isDate(this.$record.periodTo)) {
        this.$record.periodTo = new Date(this.$record.periodTo)
      }
    },
    components: {
      addBtn,
      CancelBtn
    },
    props: [],
    computed: {
      ...mapState('owners/operators', ['$record', 'record', 'periods', 'form']),
      ...mapGetters('owners/operators', ['canAddDomain', 'isOwner']),
      ...mapGetters('auth', ['canSave']),
      periodFromTime () {
        return new Date(this.$record.periodFrom).getTime()
      },
      periodToTime () {
        return new Date(this.$record.periodTo).getTime()
      }
    },
    methods: {
      ...mapMutations('owners/operators', ['addDomain', 'removeDomain']),
      onRemoveDomain (index) {
        if (!confirm(this.$t('Do you confirm?'))) {
          return
        }
        this.removeDomain(index)
      }
    }
  }
</script>

<style>

</style>
