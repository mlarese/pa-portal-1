<template>
<div>
    <BiChart :transform="true" :data="data" type="line-chart" :count="true" />
</div>
</template>

<script>
    import BiChart from '../../components/Bi/BiChart'
    import data from '../../storeimp/fixtures/bi/channel-market'

    export default {
      components: {BiChart},
      name: 'slotstest',
      auth: false,
      data () {
        return {data}
      }
    }
</script>

<style scoped>

</style>
