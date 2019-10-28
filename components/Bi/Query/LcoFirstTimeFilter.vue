<template>
    <v-container fluid grid-list-xl>
        <v-layout wrap align-center>
            <v-flex xs12 sm3 d-flex>
                <v-select
                        v-model="filter.city"
                        :items="items"
                        attach
                        chips
                        :label="$t('City')"
                        multiple
                ></v-select>
            </v-flex>

            <v-flex xs12 sm3 d-flex>
                <v-select
                        v-model="filter.region"
                        :items="items"
                        attach
                        chips
                        :label="$t('Region')"
                        multiple
                ></v-select>
            </v-flex>

            <v-flex xs12 sm3 d-flex>
                <v-select
                        v-model="filter.country"
                        :items="items"
                        attach
                        chips
                        :label="$t('Country')"
                        multiple
                ></v-select>
            </v-flex>

            <v-flex xs12 sm3 d-flex>
                <v-select
                        v-model="filter.sex"
                        :items="items"
                        attach
                        chips
                        :label="$t('Sex')"
                        multiple
                ></v-select>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex xs12 sm3 md3>
                <v-text-field
                        v-model="filter.ageFrom"
                        :label="$t('Age From')"
                ></v-text-field>
            </v-flex>
            <v-flex xs12 sm3 md3>
                <v-text-field
                        v-model="filter.ageTo"
                        :label="$t('Age To')"
                ></v-text-field>
            </v-flex>
            <v-flex xs12 sm3 md3>
                <v-text-field
                        v-model="filter.name"
                        :label="$t('Name')"
                        required
                ></v-text-field>
            </v-flex>
            <v-flex xs12 sm3 md3>
                <v-text-field
                        v-model="filter.lastName"
                        :label="$t('LastName')"
                        required
                ></v-text-field>
            </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-spacer></v-spacer>
        <v-btn
                :disabled="!valid"
                @click="cancel"
        >
            {{$t(Cancel)}}
        </v-btn>
        <v-btn @click="search">{{$t(Search)}}</v-btn>
    </v-container>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
      name: 'LcoFirstTimeFilter',
      computed: {
        ...mapState('', ['filter'])
      }
    }
</script>

<style scoped>

</style>
