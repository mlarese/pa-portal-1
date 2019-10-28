<template>
        <PasswordReset></PasswordReset>
</template>
<script>
  import PasswordReset from '../../modules/login/PasswordReset'
  export default {
    layout: 'empty',
    auth: false,
    components: {PasswordReset},
    props: []
  }
</script>
