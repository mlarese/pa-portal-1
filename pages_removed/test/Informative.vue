<template>
    <div>
        <div>UsersInformationTable</div>
        <users-information-table :privacy="privacy[0].privacy"/>
    </div>
</template>
<script>
  import privacy from '../../storeimp/fixtures/privacy'
  import UsersInformationTable from '../../components/Owners/Users/UsersInformationTable'
  export default {
    data () {
      return {
        privacy
      }
    },
    components: {UsersInformationTable},
    props: []
  }
</script>