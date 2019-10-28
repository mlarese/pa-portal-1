<template>
    <v-container row class="users-informative">
        <v-layout row class="title my-2">
            <span class="mt-4 ">{{$t('Information')}}</span>
            <v-spacer></v-spacer>
            <btn-cmds
            backgroundColor="blue"
            color="white"
            :btnName="$t('Send subscription status to user')"
            />
            <v-btn icon>
                <v-icon>create</v-icon>
            </v-btn>
        </v-layout>
        <v-layout row>
            <span class="pa-0">{{$t('Subscription details')}}</span>
        </v-layout>
        <v-data-table
                hide-actions
                class="elevation-1"
        >
            <template>
                <th>dsjdsjk</th>
                <th>dsjdsjk</th>
                <th>dsjdsjk</th>
                <th>dsjdsjk</th>
                <th>dsjdsjk</th>
                <th>dsjdsjk</th>
                <th>dsjdsjk</th>
                <tr>fdfddfdfdf</tr>
                <td>fgff</td>
                <td class="text-xs-right">gfgd</td>sdds
                <td class="text-xs-right">dfdf</td>
                <td class="text-xs-right">gfgffg</td>
                <td class="text-xs-right">frfe</td>
                <td class="text-xs-right">rrgd</td>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
  import BtnCmds from '../../General/BtnCmds'
  export default {
    data () {
      return {
        components: {BtnCmds},
        props: []
      }
    }
  }
</script>

<style>

</style>