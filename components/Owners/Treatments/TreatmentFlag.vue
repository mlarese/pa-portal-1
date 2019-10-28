<template>
    <span class="treatment-flag">
        <v-checkbox color="blue darken-1" small class="treatment-flag-checkbox" v-model="selected" :label="treatment.name"/>
    </span>
</template>

<script>
  export default {
    name: 'TreatmentFlag',
    methods: {
      select () {
        let {code} = this.treatment
        let selected = this.selected
        let index = this.index

        this.$emit('change', {code, selected, type: 'flag', index})
      }
    },
    watch: {
      selected () {
        this.select()
      }
    },
    props: ['treatment', 'index'],
    data () {
      return {
        selected: true
      }
    },
    created () {
      this.selected = this.treatment.selected
      this.select()
    }
  }
</script>

<style lang="scss">
    .treatment-flag-checkbox {
        label {font-size: 14px; line-height: 39px}
        .icon {font-size: 18px}
    }
</style>
