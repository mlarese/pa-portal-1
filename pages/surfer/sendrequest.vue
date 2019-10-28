<template>
    <email-sender/>
</template>
<script>
  import EmailSender from '../../components/Privacy/EmailSender'
  export default {
    auth: false,
    components: {
      EmailSender
    },
    layout: 'whitepage'
  }
</script>
