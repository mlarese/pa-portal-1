<template>
    <div>

        <privacy-scroller :text="filler" :height="200" @scrolled="scrolled1"/>
        <privacy-scroller :text="filler" :height="200" @scrolled="scrolled2"/>

    </div>
</template>
<script>
  import PrivacyScroller from '../../components/Privacy/PrivacyScroller'
  export default {
    components: {
      PrivacyScroller
    },
    methods: {
      scrolled1 () { console.log('scroll1') },
      scrolled2 () { console.log('scroll2') }
    },
    computed: {
      filler () {
        const line = '-----------------------<br>'
        let c = line
        for (let i = 0; i < 70; i++) {
          c += line
        }
        return c
      }
    }
  }
</script>