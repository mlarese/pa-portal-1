<template>
    <v-container class="owners-acl" >
        <v-layout row class="bold my-3"><span class="title">{{$t('Domain Owner')}}</span></v-layout>

            <v-form v-model="form.valid" ref="form">

                <template v-for="(item, index) in $record.domains">
                    <v-layout row  :key="index" v-if="!item.deleted">
                        <v-flex xs8>
                            <v-text-field
                                    box
                                    :label="$t('Domain')"
                                    v-model="item.name"
                                    :disabled="!item.phantom"
                                    required
                                    :rules="rules.domain" />
                        </v-flex>

                        <v-flex xs4>
                            <cancel-btn  @click="onRemoveDomain(index)" />
                        </v-flex>
                    </v-layout>
                </template>

            </v-form>


        <add-btn
            add="Aggiungi dominio"
            @click="addDomain"
            class="elevation-0"
            :disabled="!canAddDomain"
        />


    </v-container>
</template>

<script>
  import CancelBtn from '../../General/CancelBtn'
  import addBtn from '../../General/AddBtn'
  import {mapState, mapMutations, mapGetters} from 'vuex'

  export default {
    name: 'OwnersDomain',
    data () {
      return {
        mounting: true,
        rules: {
          domain: [
            v => !!v || this.$t('required'),
            v => {
              if (this.mounting) {
                return true
              }
              if (this.allDomainsByDomain[v]) {
                return this.$t('Domain already assigned')
              }
              return true
            }
          ]
        }
      }
    },
    components: {
      addBtn,
      CancelBtn
    },
    created () {
      this.$record.created = new Date(this.$record.created)
      if (this.$record.domains && this.$record.domains.forEach) {
        this.$record.domains.forEach(o => {
          o._name = o.name
          o.phantom = false
        })
      }
    },
    mounted () {
      this.mounting = false
    },
    computed: {
      ...mapState('owners', ['$record', 'record', 'languages', 'form']),
      ...mapGetters('owners', ['canAddDomain']),
      ...mapGetters('domains', ['allDomainsByDomain'])
    },
    methods: {
      ...mapMutations('owners', ['addDomain', 'removeDomain', 'setDeletedItem']),
      onRemoveDomain (index) {
        if (!confirm(this.$t('Do you confirm?'))) {
          return
        }
        if (this.$record.domains[index].name && this.$record.domains[index].name !== '') {
          this.$record.domains[index].deleted = true
        } else {
          this.removeDomain(index)
        }
      }
    }
  }
</script>

<style>

</style>
