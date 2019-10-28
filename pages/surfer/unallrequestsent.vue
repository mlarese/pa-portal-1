<template>
    <div>
        <div class=" ma-2">
            <v-icon color="blue" large>email</v-icon>
            <span class="titl" v-text="$t('We have taken care of your request')"></span>
        </div>
    </div>
</template>
<script>
  export default {
    auth: false,
    layout: 'whitepage'
  }
</script>
