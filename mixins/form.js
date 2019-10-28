import {mapState, mapActions, mapMutations, mapGetters} from 'vuex'

export const formHandler = (namespace) => {
  return {
    created () {
      this.setFormSaving(false)
    },
    methods: {
      ...mapActions(namespace, ['save']),
      ...mapMutations(namespace, ['setFormSaving'])
    },
    computed: {
      ...mapState(namespace, ['$record', 'record', 'form']),
      ...mapGetters(namespace, ['isAddMode', 'isEditMode']),
      isDisabled () {
        if (this.form.saving) {
          return true
        }
        if (!this.form.valid) {
          return true
        }
        return false
      }
    }
  }
}
