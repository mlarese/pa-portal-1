// Made with love by Rohan Likhite

<template>
    <div>
        <v-btn
                :dark="dark" :color="color" class="ma-0 pa-0" small :flat="flat" :fab="fab"  icon
                v-if="currentStep==0"
               @click='incrementStep' >
            <v-icon :small="small">{{icon}}</v-icon>

        </v-btn>
        <span v-if="currentStep==0"  class="ml-2">{{$t(caption)}}</span>

        <v-btn :dark="dark" small class="elevation-1" color="teal"  v-if="currentStep==1" @click='incrementStep'> {{$t('Do you confirm?')}} </v-btn>
        <v-btn :dark="dark" small class="elevation-1" color="pink"  v-if="currentStep==1" @click="reset"> {{$t('Cancel')}} </v-btn>

    </div>

</template>

<script>
  export default {
    name: 'ConfirmationButton',
    props: {
      caption: {type: String, default: ''},
      dark: {default: false},
      fab: {default: false},
      flat: {default: true},
      color: {default: 'white'},
      small: {default: false},
      icon: String,
      messages: Array,
      css: {
        type: String,
        default: 'confirmation__button'
      }
    },
    data () {
      return {
        defaultSteps: [
          'delete',
          'Are you sure?',
          '✔'
        ],
        currentStep: 0
      }
    },
    computed: {
      messageList () {
        return this.messages ? this.messages : this.defaultSteps
      },
      currentMessage () {
        return this.messageList[this.currentStep]
      },
      lastMessageIndex () {
        return this.messageList.length - 1
      },
      stepsComplete () {
        return this.currentStep === this.lastMessageIndex
      }
    },
    methods: {
      incrementStep () {
        this.currentStep++
        if (this.stepsComplete) {
          this.$emit('confirmation-success')
          this.reset()
        } else {
          this.$emit('confirmation-incremented')
        }
      },
      reset () {
        this.currentStep = 0
        this.$emit('confirmation-reset')
      }
    }
  }
</script>
