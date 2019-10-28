<template>
    <v-select
        chips
        :multiple="multiple"
        :label="label"
        v-model="dimensionsObject[dimension]"
        :items="dimensionList"
    />
</template>
<script>
  export default {
    props: ['dimension', 'dimensionsObject', 'dimensionList', 'label', 'multiple']
  }
</script>
