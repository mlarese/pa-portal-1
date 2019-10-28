<template>
    <v-tooltip bottom>
        <v-badge slot="activator" :color="color" class="connection-indicator" >
            <span slot="badge"></span>
        </v-badge>
        <span>{{$t(tooltip)}}</span>
    </v-tooltip>
</template>
<script>
  export default {
    computed: {
      tooltip () {
        let tooltip = 'On the cloud'
        if (this.$auth.user.source === 'local') {
          tooltip = 'Localy connected'
        }
        return tooltip
      },
      color () {
        let color = 'green'
        if (this.$auth.user.source === 'local') {
          color = 'blue'
        }
        return color
      }
    }

  }
</script>

<style lang="scss">
    .connection-indicator {
        .badge__badge {
            width: 10px !important;
            height: 10px !important;
        }
    }

</style>
