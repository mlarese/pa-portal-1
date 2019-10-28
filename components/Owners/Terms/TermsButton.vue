<template>
    <div class="pt-5 term-button" style="text-align: center" >
        <v-layout row justify-center>
            <p class="title">{{$t('Publication Program')}}</p>
        </v-layout>
        <v-layout justify-center>
            <v-flex xs3 sm3>
                <el-date-picker
                        class="my-2"
                        v-model="date"
                        type="datetime"
                        :placeholder="$t('Select date and time')"
                />
            </v-flex>
        </v-layout>
        <btn-cmds/>
        <v-layout row justify-center mt-3>
            <p>{{$t('Or')}}</p>
        </v-layout>
        <v-btn :style="{backgroundColor}"><span :style="{color}">{{$t('Publish Now')}}</span></v-btn>
    </div>
</template>

<script>
  import BtnCmds from '../../General/BtnCmds'
  export default {
    props: {
      backgroundColor: {default: '#AEEA00'},
      color: {default: 'white'}
    },
    components: {BtnCmds}
  }
</script>

<style>

</style>