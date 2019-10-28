<template>
    <div class="pt-3 terms-info">
       <v-layout row justify-center>
           <p class="title">{{$t('INFO')}}</p>
       </v-layout>

        <v-layout class="terms-info-data">
            <v-flex  pa-2 class="text-xs-right" style="border-right:1px solid black">
                <div>{{$t('Status')}}</div>
                <div class="py-1">{{$t('Created_')}}</div>
                <div class="py-1" v-if="record.published">{{$t('Published_')}}</div>
                <div class="py-1" v-if="record.modified">{{$t('Modified_')}}</div>
                <div class="py-1" v-if="record.suspended">{{$t('Suspended_')}}</div>
            </v-flex>
            <v-flex  pa-2 xs6>
                <div>{{$t(record.status)}}</div>
                <div class="py-1">{{record.created|dmy}}</div>
                <div class="py-1" v-if="record.published">{{record.published|dmy}}</div>
                <div class="py-1" v-if="record.modified">{{record.modified|dmy}}</div>
                <div class="py-1" v-if="record.suspended">{{record.suspended|dmy}}</div>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
  import ConfirmationButton from '../../General/ConfirmationButton'

  export default {
    name: 'TermsInfo',
    components: {
      ConfirmationButton
    },
    props: {
      record: {
        default: () => ({
          status: '',
          published: null,
          created: '',
          modified: '',
          suspended: ''
        })
      }

    }
  }
</script>

<style lang="scss">
    .terms-info{
        .terms-info-data{
            font-size:12px;
        }
    }
</style>
