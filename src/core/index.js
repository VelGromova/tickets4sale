import moment from 'moment'

export const showsPrices = {
    musical: 70,
    comedy: 50,
    drama: 40
}

export const NUMBER_OF_PEOPLES_IN_BIG_HALL = 200
export const NUMBER_OF_PEOPLES_IN_SMALL_HALL = 100

export const NUMBER_OF_TICKETS_PER_DAY_IN_BIG_HALL = 10
export const NUMBER_OF_TICKETS_PER_DAY_IN_SMALL_HALL = 5

function getDateDiffInDays(firstDate='', secondDate='') {
    return getMoment(secondDate).diff(getMoment(firstDate), 'days')
}

function getMoment(date) {
    return date ? moment(date) : moment()
}

export function getDiscount(ticketsDate, showStartsDate) {
    let showMoment = getMoment(showStartsDate)
    let ticketsMoment = getMoment(ticketsDate)
    if (showMoment.hours(24 * 80) <= ticketsMoment) {
        return 0.8
    }

    return 1
}

export function getMaxTicketsAmount(ticketsDate, showStartsDate) {
    let daysDiff = getDateDiffInDays(showStartsDate, ticketsDate)

    return daysDiff > 100 || daysDiff < 1 ? 0 : (
        daysDiff >= 60 ? NUMBER_OF_PEOPLES_IN_SMALL_HALL : NUMBER_OF_PEOPLES_IN_BIG_HALL )
}

export function getAlreadySoledTicketsAmount(ticketsDate, showStartsDate) {
    let currentMoment = getMoment()
    let ticketsMoment = getMoment(ticketsDate)
    let showStartsMoment = getMoment(showStartsDate)
    let countTicketsMultiplicator = NUMBER_OF_TICKETS_PER_DAY_IN_BIG_HALL
    let ticketsAmount = getMaxTicketsAmount(ticketsDate, showStartsDate)
    let startSalesMoment = ticketsMoment.clone().add(-25, 'days')
    let daysInSales = currentMoment.diff(startSalesMoment, 'days')

    if (ticketsMoment.diff(showStartsMoment, 'days') >= 60) {
        countTicketsMultiplicator = NUMBER_OF_TICKETS_PER_DAY_IN_SMALL_HALL
    }

    if (ticketsMoment.diff(currentMoment, 'days') <= 5 || daysInSales > 25 ) {
        return ticketsAmount
    }

    if (daysInSales <= 0) {
        return 0
    }

    return daysInSales * countTicketsMultiplicator
}

export function canTicketsBeSaledByDate(showDate) {
    let showStartDate = new Date(showDate)
    let currentDate = new Date()

    return showStartDate > currentDate && (showStartDate.setHours(-24 * 25) <= currentDate || currentDate > showStartDate.setHours(24 * 100))
}
