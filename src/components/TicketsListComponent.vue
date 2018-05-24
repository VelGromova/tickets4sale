<template>
    <div class="tables__container">
        <div class="eg-flex">
            <h5>Show date</h5>
            <date-picker v-model="date" :config="config" class="date__container"></date-picker>
            <b-button :size="'m'" :variant="'primary'">Submit</b-button>
        </div>
        <transition name="ef-opacity" mode="out-in">
            <div class="ef-transition-opacity" v-if="date" :key="date">
                <h4 class="content__title">Musical</h4>
                <b-table striped hover
                         :items="musical"
                         :fields="fields"
                ></b-table>
                <h4 class="content__title">Drama</h4>
                <b-table hover
                         :items="drama"
                         :fields="fields"
                ></b-table>

                <h4 class="content__title">Comedy</h4>
                <b-table hover
                         :items="comedy"
                         :fields="fields"
                ></b-table>
            </div>
        </transition>
    </div>
</template>

<script>
import VueScrollbar from 'vue2-scrollbar'
import { mapGetters } from 'vuex'
import * as core from './../core'
import * as _ from 'lodash'

export default {
    name: 'TicketsListComponent',

    components: {
        VueScrollbar,
    },

    data() {
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
                    sortable: true
                },
                {
                    key: 'status',
                    label: 'Status'
                },
                {
                    key: 'price',
                    label: 'Price',
                    sortable: true
                }
            ],
            prices: core.showsPrices,
            musical: [],
            drama: [],
            comedy: []
        }
    },

    computed: {
        ...mapGetters(['tickets'])
    },

    watch: {
        date () {
            this.updateTicketsInfo()
        }
    },

    methods: {
        updateTicketsInfo () {
            this.resetTickets()
            if (core.canTicketsBeSaledByDate(this.date)) {
                let musical = this.tickets('musical')[this.date]
                let comedy = this.tickets('comedy')[this.date]
                let drama = this.tickets('drama')[this.date]

                this.musical = _.map(musical, this.fillTicketInfo)
                this.comedy = _.map(comedy, this.fillTicketInfo)
                this.drama = _.map(drama, this.fillTicketInfo)
            }

            this.$forceUpdate()
        },

        fillTicketInfo (show) {
            let amountOfTickets = core.getMaxTicketsAmount(this.date, show.date)
            let soldTickets = core.getAlreadySoledTicketsAmount(this.date, show.date)

            return {
                title: show.name,
                ticketsLeft: soldTickets,
                ticketsAvailable: amountOfTickets - soldTickets,
                status: 'open for sale',
                price: this.prices[show.type.toLowerCase()] * core.getDiscount(this.date, show.date)
            }
        },

        resetTickets () {
            this.musical = []
            this.comedy = []
            this.drama = []
        }
    },

    mounted() {
        this.$store.dispatch('uploadTickets')
    }
}
</script>
