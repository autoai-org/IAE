<template>
    <v-app>
        <page-tab></page-tab>
        <iae-footer></iae-footer>
    </v-app>
</template>

<script>
import PageTab from '@/components/workplace/PageTab'
import IAEFooter from '@/components/bottom/Footer'
export default {
    components:{
        'iae-footer': IAEFooter,
        'page-tab': PageTab
    }
}
</script>

<style>

</style>
