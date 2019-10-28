<template>
    <v-container>
        <v-layout>

            <password
                    v-model="password"
                    :toggle="true"
                    @score="showScore"
                    @feedback="showFeedback"
            />


            <password v-model="password"/>
        </v-layout>

    </v-container>
</template>
<script>
import Password from 'vue-password-strength-meter'
export default {
  layout: 'whitepage',
  components: {Password},
  auth: false,
  methods: {
    showFeedback ({suggestions, warning}) {
      console.log('🙏', suggestions)
      console.log('⚠', warning)
    },
    showScore (score) {
      console.log('score', score)
    }
  },
  data () {
    return {
      password: null
    }
  }
}
</script>
