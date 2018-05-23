<template>
    <div class="table__container">
        <div>
            <span>Show date</span>
            <input type="text">
            <b-button :size="'sm'" :variant="'primary'">Submit</b-button>
            <date-picker v-model="date" :config="config"></date-picker>
        </div>
        <h4>Musical</h4>
        <b-table striped hover :items="musicalTickets" :fields="fields"></b-table>
        <h4>Drama</h4>
        <b-table striped hover :items="dramaTickets" :fields="fields"></b-table>
        <h4>Comedy</h4>
        <b-table striped hover :items="comedyTickets" :fields="fields"></b-table>
    </div>
</template>

<script>
  export default {
    name: 'PerformanceListComponent',

    components: {

    },

    data () {
      return {
        date: new Date(),
        config: {
          format: 'YYYY-MM-DD',
          useCurrent: false,
        },
        fields: [
          {
            key: 'title',
            label: 'Title',
            sortable: true
          },
          {
            key: 'ticketsLeft',
            label: 'Tickets left'
          },
          {
            key: 'ticketsAvailable',
            label: 'Tickets available',
            variant: 'danger',
            sortable: true
          },
          {
            key: 'status',
            label: 'Status',
            variant: 'info'
          },
          {
            key: 'price',
            label: 'Price',
            variant: 'warning',
            sortable: true
          }
        ],
        items: [
          { title: 'performance', ticketsLeft: 40, ticketsAvailable: 234, status: 'dsfsdfdsf', price: 333 },
          { title: 'performance', ticketsLeft: 40, ticketsAvailable: 234, status: 'dsfsdfdsf', price: 333 },
          { title: 'performance', ticketsLeft: 40, ticketsAvailable: 234, status: 'dsfsdfdsf', price: 333 },
          { title: 'performance', ticketsLeft: 40, ticketsAvailable: 234, status: 'dsfsdfdsf', price: 333 },
          { title: 'performance', ticketsLeft: 40, ticketsAvailable: 234, status: 'dsfsdfdsf', price: 333 },
          { title: 'performance', ticketsLeft: 40, ticketsAvailable: 234, status: 'dsfsdfdsf', price: 333 },
        ]
      }
    },

    computed: {
      musicalTickets () {
        return this.items
      },

      dramaTickets () {
        return this.items
      },

      comedyTickets () {
        return this.items
      }
    }
  }
</script>
