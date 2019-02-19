import { dateDay } from './date'
const Hairdresser = (name, category) => {
  const getName = () => name
  const getCategory = () => category
  let registrations = []
  let datesArray = []
  for (let i = 0; i < 29; i++) {
    let d = new Date()
    d.setDate(d.getDate() + i)
    let dateDayObject = dateDay(d)
    datesArray.push(dateDayObject)
  }
  const getDates = () => {
    return datesArray
  }
  const getRegistrations = () => {
    return registrations
  }
  const pushToRegistration = (registration) => {
    registrations.push(registration)
  }
  const deletefromRegistrations = (phone) => {
    registrations.forEach(function (element, index) {
      if (element.getPhone() === phone) {
        registrations.splice(index, 1)
      }
    })
  }
  const getTodayRegistrations = () => {
    let todays = []
    let today = new Date()
    let stringedday
    if (today.getMonth() < 10 && today.getDate() < 10) {
      stringedday = '0' + (today.getMonth() + 1) + '-0' + today.getDate()
    } else if (today.getMonth() < 10) {
      stringedday = '0' + (today.getMonth() + 1) + '-' + today.getDate()
    } else {
      stringedday = today.getMonth() + '-' + today.getDate()
    }
    registrations.forEach(function (element) {
      if (element.getDay() === stringedday) {
        todays.push(element)
      }
    })
    return todays
  }

  const getTomorrowRegistrations = () => {
    let tomorrows = []
    let tomorrow = new Date()
    let stringedday
    if (tomorrow.getMonth() < 10 && tomorrow.getDate() < 10) {
      stringedday = '0' + (tomorrow.getMonth() + 1) + '-0' + (tomorrow.getDate() + 1)
    } else if (tomorrow.getMonth() < 10) {
      stringedday = '0' + (tomorrow.getMonth() + 1) + '-' + (tomorrow.getDate() + 1)
    } else {
      stringedday = tomorrow.getMonth() + '-' + tomorrow.getDate()
    }
    registrations.forEach(function (element) {
      if (element.getDay() === stringedday) {
        tomorrows.push(element)
      }
    })
    return tomorrows
  }

  const getDayRegistrations = (chosenday) => {
    let days = []
    registrations.forEach(function (element) {
      if (element.getDay() === chosenday) {
        days.push(element)
      }
    })
    return days
  }

  const getRegistrationsByDate = () => {
    let registrationsByDate = registrations.slice(0)
    for (let i = 0; i < registrationsByDate.length; i++) {
      let index = i
      for (let j = index; j < registrationsByDate.length; j++) {
        if (registrationsByDate[j].getDay() < registrationsByDate[i].getDay()) {
          let copy = registrationsByDate[i]
          registrationsByDate[i] = registrationsByDate[j]
          registrationsByDate[j] = copy
        } else if (registrationsByDate[j].getDay() === registrationsByDate[i].getDay()) {
          if (registrationsByDate[j].getTime() < registrationsByDate[i].getTime()) {
            let copy = registrationsByDate[i]
            registrationsByDate[i] = registrationsByDate[j]
            registrationsByDate[j] = copy
          }
        }
      }
    }
    return registrationsByDate
  }

  return { getName, getCategory, getDates, getRegistrations, pushToRegistration, deletefromRegistrations, getTodayRegistrations, getTomorrowRegistrations, getDayRegistrations, getRegistrationsByDate }
}

export { Hairdresser }
