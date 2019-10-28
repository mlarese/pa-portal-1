<template>
    <v-container>
        <v-toolbar>
            <slot name="icon"></slot>
            <v-toolbar-title>{{title}}</v-toolbar-title>
        </v-toolbar>
        <v-card>
            <slot name="body">
            </slot>
        </v-card>
        <v-footer dark height="auto">
            <v-card dark flat>
                <slot name="footer"></slot>
            </v-card>
        </v-footer>
    </v-container>
</template>

<script>
    export default {
      name: 'VWidget',
      props: ['title']

    }
</script>

<style scoped>

</style>
