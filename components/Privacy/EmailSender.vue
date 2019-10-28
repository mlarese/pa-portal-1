<template>
    <v-container fluid class="surfer-email-sender" grid-list-lg>
        <v-form v-model="valid">
            <v-layout row wrap>
                <v-flex xs12>
                    privacy text
                </v-flex>
            </v-layout>

            <v-layout row wrap align-end>
                <v-flex xs3>
                    <b><span v-text="$t('Email address')"></span></b>
                    <v-text-field
                       solo
                       required
                       :rules="rules.email"
                       v-model="email"
                       class="elevation-0 grey lighten-5 surfer-email-sender-text "
                    />
                </v-flex>

                <v-flex xs3 class="pb-1">
                     <v-btn
                        class="elevation-0 surfer-email-sender-submit"
                        style="text-transform:uppercase"
                        color="light-blue lighten-2"
                        dark
                        :disabled="!canSend"
                     >
                         {{$t('Send')}}
                         <v-icon dark right>chevron_right</v-icon>

                     </v-btn>
                </v-flex>
            </v-layout>
        </v-form>
    </v-container>
</template>
<script>
  export default {
    data () {
      return {
        email: null,
        valid: false,
        rules: {
          email: [
            v => !!v || this.$t('required'),
            v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,6})+$/.test(v) || this.$t('E-mail not valid')
          ]
        }
      }
    },
    computed: {
      canSend () {
        return this.valid
      }
    }
  }
</script>

<style lang="scss">
    .surfer-email-sender-submit {
        height: 32px;
        .btn__content {font-size:14px};
        font-weight: normal;
    }
    .surfer-email-sender-text {
        min-height:34px !important;

        .input-group__input {
            border: 1px solid #E0E0E0 !important;
            min-height:33px;
        }

    }
</style>
