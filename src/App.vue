<template>
  <div class="app__container">
    <tickets-list-component></tickets-list-component>
    <v-dialog/>
  </div>
</template>

<script>
  import TicketsListComponent from './components/TicketsListComponent'

  export default {
    name: 'App',

    components: {
      TicketsListComponent
    }
  }
</script>

<style lang="scss">
  @import 'assets/scss/_all';
</style>
