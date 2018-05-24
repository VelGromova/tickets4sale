<template>
    <div class="tables__container">
        <div class="eg-flex">
            <h5>Show date</h5>
            <date-picker v-model="date" :config="config" class="date__container"></date-picker>
            <b-button :size="'sm'" :variant="'primary'">Submit</b-button>
        </div>
        <transition name="ef-opacity" mode="out-in">
            <div class="ef-transition-opacity" v-if="date" :key="date">
                <h4 class="content__title">Musical</h4>
                <b-table striped hover
                         :items="musicalTickets"
                         :fields="fields"
                ></b-table>
                <h4 class="content__title">Drama</h4>
                <b-table striped hover
                         :items="dramaTickets"
                         :fields="fields"
                ></b-table>

                <h4 class="content__title">Comedy</h4>
                <b-table striped hover
                         :items="comedyTickets"
                         :fields="fields"
                ></b-table>
            </div>
        </transition>
    </div>
</template>

<script>
  import VueScrollbar from 'vue2-scrollbar'

  export default {
    name: 'TicketsListComponent',

    components: {
      VueScrollbar,
    },

    data () {
      return {
        date: '',
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
          { title: 'performance', ticketsLeft: 40, ticketsAvailable: 234, status: 'open for sale', price: 333 },
          { title: 'performance', ticketsLeft: 40, ticketsAvailable: 234, status: 'open for sale', price: 333 },
          { title: 'performance', ticketsLeft: 40, ticketsAvailable: 234, status: 'open for sale', price: 333 },
          { title: 'performance', ticketsLeft: 40, ticketsAvailable: 234, status: 'open for sale', price: 333 },
          { title: 'performance', ticketsLeft: 40, ticketsAvailable: 234, status: 'open for sale', price: 333 },
          { title: 'performance', ticketsLeft: 40, ticketsAvailable: 234, status: 'open for sale', price: 333 },
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
    },

    mounted () {
      this.$store.dispatch('uploadTickets')
    }
  }
</script>
