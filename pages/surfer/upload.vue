<template>
    <div>
        <div v-for="file in $upload.files('product-gallery').all">
            {{ file.name }} <br/>
            {{ file.size }} <br/>
            {{ file.type }} <br/>
            {{ file.state }} <br/>
            {{ file.percentComplete }} <br/>
            {{ file.errors | json }}<br/>
        </div>
    </div>
</template>

<script>
export default {
  created () {
    console.dir(this.$upload)
    this.$upload.on('profile-avatar', {
      onSuccess (res) {
      }
    })
  },
  mounted () {
    this.$upload.option('profile-avatar', {
      url: 'users/' + this.user.id + '/avatar'
    })
  },
  auth: false
}
</script>

<style scoped>

</style>
