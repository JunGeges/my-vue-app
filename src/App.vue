<template>
    <div id="app">
        <nav-bar>
          <template v-slot:left>111</template>
        </nav-bar>
    </div>
</template>

<script>
import NavBar from './components/NavBar/NavBar'
export default {
    name: 'App',
    components: {
        NavBar
    }
}
</script>

<style>

</style>
