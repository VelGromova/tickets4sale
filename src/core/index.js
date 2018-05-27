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

export function getDateDiffInDays(firstDate='', secondDate='') {
  return getMoment(secondDate).diff(getMoment(firstDate), 'days')
}

export function getMoment(date) {
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

  return (daysDiff > 100 || daysDiff < 0) ? 0 : (
    daysDiff >= 60 ? NUMBER_OF_PEOPLES_IN_SMALL_HALL : NUMBER_OF_PEOPLES_IN_BIG_HALL )
}

export function getAlreadySoledTicketsAmount(ticketsDate, showStartsDate) {
  let currentMoment = getMoment()
  let ticketsMoment = getMoment(ticketsDate)
  let showStartsMoment = getMoment(showStartsDate)

  let countTicketsMultiplicator = NUMBER_OF_TICKETS_PER_DAY_IN_BIG_HALL

  let startSalesMoment = ticketsMoment.clone().add(-25, 'days')

  let daysInSales = currentMoment.clone().diff(startSalesMoment, 'days')
  let daysToTicket = ticketsMoment.clone().diff(currentMoment, 'days')
  let daysAfterPremier = ticketsMoment.clone().diff(showStartsMoment, 'days')

  if (daysAfterPremier >= 60) {
    countTicketsMultiplicator = NUMBER_OF_TICKETS_PER_DAY_IN_SMALL_HALL
  }

  if (daysToTicket <= 5 || daysInSales >= 25 ) {
    return getMaxTicketsAmount(ticketsDate, showStartsDate)
  }

  if (daysInSales <= 0) {
    return 0
  }

  return daysInSales * countTicketsMultiplicator
}
