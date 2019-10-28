<template>
    <div>
        <v-card class="elevation-1" id="app-upload-drop-zone" :class="{'drop-zone-active': dragging }">
            <a name="attach-a"  @click="$upload.select('attachments')">
                <v-layout row wrap>
                    <v-flex xs12 class="pa-5 text-xs-center mt-5"  >
                        <div>{{$t('Drop files anywhere here to begin upload.')}}</div>
                        <div>{{$t('Or click to select')}}</div>
                    </v-flex>

                </v-layout>
            </a>
        </v-card>
    </div>
</template>
<script>
  import axios from 'axios'
  const uploadId = 'attachments'
  export default {
    props: {
      endPoint: {default: ''}
    },
    computed: {
      dragging () {
        return this.$upload.dropzone(uploadId).active
      },
      outputFiles () {
        const f = this.$upload.files(uploadId).all
        let ret = []
        for (let i = 0; i < f.length; i++) {
          let curf = f[i].$file
          ret.push({fileName: curf.name, description: `Desc ${curf.name}`})
        }
        return ret
      }
    },
    mounted () {
      let _this = this
      if (!this.$upload.on) return
      this.$upload.on(uploadId, {
        maxFilesSelect: 20,
        dropzoneId: 'app-upload-drop-zone',
        multiple: true,
        startOnSelect: true,
        extensions: false,
        onComplete () {
          this.$emit('after-upload', _this.outputFiles)
        },
        http (data) {
          const url = `${_this.endPoint}`
          axios.post(url, data.body)
            .then(data.success)
            .catch(data.error)
        }
      })
    },

    beforeDestroy () {
      if (this.$upload && this.$upload.off) {
        this.$upload.off(uploadId)
      }
    }
  }
</script>

<style lang="scss">
    #app-upload-drop-zone {
        height:251px !important;
    }
    #app-upload-drop-zone.drop-zone-active{

        background: #c1c1c1;
    }
</style>
