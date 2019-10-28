<template>
    <v-container class="treatments-form" >
        <v-layout row class="title">{{$t('Treatment Data')}}</v-layout>
        <v-form v-model="form.valid" ref="form">

            <v-layout row wrap>
                <v-flex xs12 sm6>
                    <v-text-field
                            :disabled="!isAddMode"
                            box

                            :label="$t('Code')"
                            :rules="rules.code"
                            required
                            v-model="$record.code"/>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex xs12 sm6>
                    <v-text-field
                            _disabled="!canSave && !isAddMode"
                            box
                            :label="$t('Name')"
                            :rules="rules.name"
                            required
                            v-model="$record.name"/>
                </v-flex>
                <v-flex xs12>
                    <v-text-field
                        _disabled="!canSave && !isAddMod"
                        box
                        textarea
                        multi-line
                        :label="$t('Note')"
                        v-model="$record.note"
                    />
                </v-flex>
                <v-flex xs12 sm6>
                    <span>{{$t('Created')}}</span>
                    <div class="time">
                        <el-date-picker
                                :disabled="true"
                                class="el-icon"
                                v-model="$record.created"
                                format="dd/MM/yyyy HH:mm:ss"
                                type="datetime"
                                :placeholder="$t('Select date and time')"
                        />
                    </div>
                </v-flex>
                <v-flex xs12 sm6>
                    <span>{{$t('Creator')}}</span>
                    <div class="mt-2">{{$record.creator.userName}}</div>
                </v-flex>
            </v-layout>
        </v-form>
    </v-container>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'
  export default {
    data () {
      return {
        rules: {
          code: [
            v => !!v || this.$t('required'),
            v => {
              if (this.isAddMode) {
                return !this.alreadyExist(this.$record.code) || this.$t('already exist')
              } else {
                return true
              }
            }
          ],
          name: [v => !!v || this.$t('required')]
        }
      }
    },
    computed: {
      ...mapState('treatments', ['$record', 'record', 'form']),
      ...mapGetters('auth', ['canSave']),
      ...mapGetters('treatments', ['isAddMode', 'alreadyExist']),
      canSave () {
        if (this.isAddMode) {
          return this.form.valid && !this.alreadyExist(this.$record.code)
        }

        return this.form.valid
      }
    },
    created () {
      this.$record.created = new Date(this.$record.created)
    },
    props: []
  }
</script>

<style>

</style>
