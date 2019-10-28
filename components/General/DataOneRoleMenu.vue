<template>
    <v-list dense>
        <v-list-tile nuxt to="/">
                <v-list-tile-action>
                    <v-icon>home</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>
                        Home
                    </v-list-tile-title>
                </v-list-tile-content>
        </v-list-tile>
        <template v-for="item in privacyMenu">
                <v-list-group
                        v-if="item.children"
                        v-model="item.model"
                        :key="item.text"
                        :prepend-icon="item.model ? item.icon : item['icon-alt']"
                        append-icon=""
                >
                    <v-list-tile slot="activator">
                        <v-list-tile-content>
                            <v-list-tile-title>
                                {{ $t(item.title) }}
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile
                            v-for="(child, i) in item.children"
                            :key="i"
                            @click=""
                            v-if="item.visible"
                    >
                        <v-list-tile-action v-if="child.icon">
                            <v-icon>{{ child.icon }}</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-content>
                            <v-list-tile-title>
                                {{ $t(child.title) }}
                            </v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list-group>

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
    name: 'DataOneRoleMenu',
    props: ['privacyMenu']
  }
</script>
