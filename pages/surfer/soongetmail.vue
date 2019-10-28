<template>
    <div>
        <div class=" ma-2">
            <v-icon color="blue" large>email</v-icon>
            <span class="titl" v-text="$t('You will soon receive an e-mail')"></span>
        </div>
    </div>
</template>
<script>
  export default {
    auth: false,
    layout: 'whitepage'
  }
</script>
