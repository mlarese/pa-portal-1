<template>
    <v-container fluid class="term-history pt-0 text-xs-left">
        <v-layout row class="pt-0 px-3">
            <table width="100%" class="term-history-table">
                <tr>
                    <td><b>{{$t(history.action)}}</b></td>
                    <td class="text-xs-right"></td>
                </tr>
                <tr>
                    <td>{{$t('Date')}}: {{history.date|dmy}}  {{$t('Hour')}}: {{history.date|time}}</td>
                    <td class="text-xs-right"></td>
                </tr>
                <tr>
                    <td>{{$t('User')}}: {{history.user.userName}}</td>
                    <td class="text-xs-right"></td>
                </tr>
                <tr v-if="history.description">
                    <td>{{$t('Description')}}: {{history.description}}</td>
                    <td class="text-xs-right"></td>
                </tr>
            </table>
        </v-layout>
    </v-container>
</template>

<script>
  export default {
    name: 'TermHistory',
    props: ['history']
  }
</script>

<style lang="scss">
    .term-history {
        .term-history-table {
            padding-top:3px;
            border-top: 0px solid lightgrey;
        }
        font-size:11px;
    }
</style>
