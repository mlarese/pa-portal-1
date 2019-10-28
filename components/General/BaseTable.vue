<template>
    <v-data-table
            :headers="headers"
            :items="items"
            class="elevation-1"
            :rows-per-page-text="$t('Rows per page')"
            :rows-per-page-items="[5,10,25,{'text':$t('All'),'value':-1}]"
    >
        <slot>
        </slot>

        <template slot="pageText" slot-scope="{ pageStart, pageStop }">
            {{$t('From')}} {{ pageStart }} {{$t('To')}} {{ pageStop }}
        </template>
    </v-data-table>
</template>

<script>
  export default {
    props: ['headers', 'items']
  }
</script>

<style>

</style>