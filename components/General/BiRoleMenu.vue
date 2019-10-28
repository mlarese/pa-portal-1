<template>
    <v-list dense v-if="privacyMenuBi && privacyMenuBi.length">
        <template v-for="item in privacyMenuBi">
            <v-list-tile :key="item.title" nuxt :to="item.path" v-if="item.visible">
                <v-list-tile-action>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>
                        {{ $t(item.title) }}
                    </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </template>
    </v-list>
</template>
<script>
  export default {
    name: 'BiRoleMenu',
    props: ['privacyMenuBi']
  }
</script>
