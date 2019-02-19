import { Hairdresser } from './hairdresser'
import { RegistrationForm } from './registrationform'

const home = document.getElementById('home')
home.addEventListener('click', function () {
  window.location.href = 'index.html'
})
let employeeArray = []
let registrationsArray
if (window.localStorage.getItem('registrations') !== null) {
  registrationsArray = JSON.parse(window.localStorage.getItem('registrations'))
} else {
  registrationsArray = []
}

const hairdresser1 = Hairdresser('Diana', 'Vyru kirpimas')
const hairdresser2 = Hairdresser('Migle', 'Moteru kirpimas')
const hairdresser3 = Hairdresser('Gintare', 'Plauku dazymas')
employeeArray.push(hairdresser1)
employeeArray.push(hairdresser2)
employeeArray.push(hairdresser3)
registrationsArray.forEach(function (element) {
  const newForm = RegistrationForm(element[0], element[1], element[2], element[3], element[4])
  employeeArray.forEach(function (employee) {
    if (employee.getCategory() === newForm.getCategory()) {
      employee.pushToRegistration(newForm)
    }
  })
})

const employeeContainer = document.getElementsByClassName('employee-container')[0]
const filtersDiv = document.getElementsByClassName('filters')[0]
employeeArray.forEach(function (element) {
  const employeeDiv = document.createElement('div')
  employeeDiv.className = 'col-1-3 employee-div'
  const employeeName = document.createElement('h3')
  employeeName.innerHTML = element.getName()
  const employeeCategory = document.createElement('h3')
  employeeCategory.innerHTML = element.getCategory()
  const employeeWrapper = document.createElement('div')
  employeeWrapper.className = 'text-center'
  const employeeWrapperFlex = document.createElement('div')
  employeeWrapperFlex.className = 'flex-center-center'
  employeeWrapper.appendChild(employeeName)
  employeeWrapper.appendChild(employeeCategory)
  employeeWrapperFlex.appendChild(employeeWrapper)
  employeeDiv.appendChild(employeeWrapperFlex)
  employeeContainer.appendChild(employeeDiv)

  employeeDiv.addEventListener('click', function () {
    filtersDiv.style.marginTop = '50px'
    employeeContainer.style.backgroundColor = 'rgba(255,255,255,0.9)'
    employeeContainer.style.marginTop = '20px'
    const mq = window.matchMedia('(max-width:600px)')
    if (mq.matches) {
      employeeContainer.style.width = '100%'
    } else {
      employeeContainer.style.width = '800px'
    }

    loadList(element, element.getRegistrations)

    const daySelectfilter = document.createElement('select')
    daySelectfilter.className = 'filter-style'
    const option = document.createElement('option')
    option.innerHTML = 'Registracijos pagal diena'
    daySelectfilter.appendChild(option)
    element.getDates().forEach(function (element, index) {
      const option = document.createElement('option')
      option.value = element.toString()
      option.innerHTML = element.toString()
      daySelectfilter.appendChild(option)
    })
    filtersDiv.appendChild(daySelectfilter)
    daySelectfilter.addEventListener('click', function () {
      loadList(element, element.getDayRegistrations.bind(null, daySelectfilter.options[daySelectfilter.selectedIndex].value))
      console.log(daySelectfilter.options[daySelectfilter.selectedIndex].value)
    })

    const allfilter = document.createElement('button')
    allfilter.className = 'filter-style'
    allfilter.innerHTML = 'Visos registracijos'
    filtersDiv.appendChild(allfilter)
    allfilter.addEventListener('click', function () {
      loadList(element, element.getRegistrations)
    })
    const todayfilter = document.createElement('button')
    todayfilter.className = 'filter-style'
    todayfilter.innerHTML = 'Siandienos registracijos'
    filtersDiv.appendChild(todayfilter)
    todayfilter.addEventListener('click', function () {
      loadList(element, element.getTodayRegistrations)
    })
    const tomorrowfilter = document.createElement('button')
    tomorrowfilter.className = 'filter-style'
    tomorrowfilter.innerHTML = 'Rytojaus registracijos'
    filtersDiv.appendChild(tomorrowfilter)
    tomorrowfilter.addEventListener('click', function () {
      loadList(element, element.getTomorrowRegistrations)
    })

    const byDate = document.createElement('button')
    byDate.className = 'filter-style'
    byDate.innerHTML = 'Rusiavimas pagal data'
    filtersDiv.appendChild(byDate)
    byDate.addEventListener('click', function () {
      loadList(element, element.getRegistrationsByDate)
    })
  })
})

function loadList (element, funkc) {
  while (employeeContainer.firstChild) {
    employeeContainer.removeChild(employeeContainer.firstChild)
  }
  const row = document.createElement('div')
  row.className = 'row'
  const titleName = document.createElement('div')
  titleName.className = 'col-1-5 reg-div bold'
  titleName.innerHTML = 'Vardas'
  const titlePhone = document.createElement('div')
  titlePhone.className = 'col-1-5 reg-div bold'
  titlePhone.innerHTML = 'Telefono numeris'
  const titleDay = document.createElement('div')
  titleDay.className = 'col-1-5 reg-div bold'
  titleDay.innerHTML = 'Diena'
  const titleTime = document.createElement('div')
  titleTime.className = 'col-1-5 reg-div bold'
  titleTime.innerHTML = 'Laikas'
  const hr = document.createElement('hr')
  row.appendChild(titleName)
  row.appendChild(titlePhone)
  row.appendChild(titleDay)
  row.appendChild(titleTime)
  employeeContainer.appendChild(row)
  employeeContainer.appendChild(hr)
  funkc().forEach(function (registration, index) {
    const row = document.createElement('div')
    row.className = 'row'
    const name = document.createElement('div')
    name.className = 'col-1-5 reg-div'
    name.innerHTML = registration.getName()
    const phone = document.createElement('div')
    phone.className = 'col-1-5 reg-div'
    phone.innerHTML = registration.getPhone()
    const day = document.createElement('div')
    day.className = 'col-1-5 reg-div'
    day.innerHTML = registration.getDay()
    const time = document.createElement('div')
    time.className = 'col-1-5 reg-div'
    time.innerHTML = registration.getTime()
    const deleteReg = document.createElement('div')
    deleteReg.className = 'col-1-5 reg-div darker-hover'
    deleteReg.innerHTML = 'Istrinti'
    row.appendChild(name)
    row.appendChild(phone)
    row.appendChild(day)
    row.appendChild(time)
    row.appendChild(deleteReg)
    employeeContainer.appendChild(row)

    if (index !== element.getRegistrations().length - 1) {
      const hr = document.createElement('hr')
      employeeContainer.appendChild(hr)
    }

    deleteReg.addEventListener('click', function () {
      element.deletefromRegistrations(registration.getPhone())
      registrationsArray.forEach(function (element, index) {
        if (element[1] === registration.getPhone()) {
          registrationsArray.splice(index, 1)
        }
      })
      if (window.localStorage.getItem('registrations') !== null) {
        window.localStorage.removeItem('registrations')
        window.localStorage.setItem('registrations', JSON.stringify(registrationsArray))
      } else {
        window.localStorage.setItem('registrations', JSON.stringify(registrationsArray))
      }
      loadList(element, funkc)
    })
  })
  const addButton = document.createElement('button')
  addButton.innerHTML = 'Prideti klienta'
  addButton.className = 'long-button'
  employeeContainer.appendChild(addButton)
  let clicked = false
  addButton.addEventListener('click', function () {
    if (clicked === false) {
      const row1 = document.createElement('div')
      row1.className = 'row deleterow'
      const nameLabel = document.createElement('div')
      nameLabel.innerHTML = 'Vardas'
      nameLabel.className = 'col-1-5 reg-div bold'
      const phoneLabel = document.createElement('div')
      phoneLabel.innerHTML = 'Telefono numeris'
      phoneLabel.className = 'col-1-5 reg-div bold'
      const dayLabel = document.createElement('div')
      dayLabel.innerHTML = 'Diena'
      dayLabel.className = 'col-1-5 reg-div bold'
      const timeLabel = document.createElement('div')
      timeLabel.innerHTML = 'Laikas'
      timeLabel.className = 'col-1-5 reg-div bold'
      row1.appendChild(nameLabel)
      row1.appendChild(phoneLabel)
      row1.appendChild(dayLabel)
      row1.appendChild(timeLabel)
      const row2 = document.createElement('div')
      row2.className = 'row deleterow'
      const nameInput = document.createElement('input')
      const nameInputDiv = document.createElement('div')
      nameInputDiv.appendChild(nameInput)
      nameInputDiv.className = 'col-1-5 reg-div block'
      const phoneInput = document.createElement('input')
      const phoneInputDiv = document.createElement('div')
      phoneInputDiv.appendChild(phoneInput)
      phoneInputDiv.className = 'col-1-5 reg-div block'
      const dateSelect = document.createElement('select')
      const dateSelectDiv = document.createElement('div')
      dateSelectDiv.appendChild(dateSelect)
      dateSelectDiv.className = 'col-1-5 reg-div block'
      element.getDates().forEach(function (element, index) {
        const option = document.createElement('option')
        option.value = index
        option.innerHTML = element.toString()
        dateSelect.appendChild(option)
      })
      const timeSelect = document.createElement('select')
      const timeSelectDiv = document.createElement('div')
      timeSelectDiv.appendChild(timeSelect)
      timeSelectDiv.className = 'col-1-5 reg-div block'
      dateSelect.addEventListener('click', function () {
        while (timeSelect.firstChild) {
          timeSelect.removeChild(timeSelect.firstChild)
        }
        element.getDates()[dateSelect.options[dateSelect.selectedIndex].value].getFreeTimes().forEach(function (element, index) {
          const option = document.createElement('option')
          option.innerHTML = element
          timeSelect.appendChild(option)
        })
      })
      const confirmDiv = document.createElement('div')
      confirmDiv.className = 'cold-1-5 reg-div flex-center-center'
      const confirm = document.createElement('button')
      confirm.innerHTML = 'Patvirtinti'
      confirm.className = 'short-button block'

      confirm.addEventListener('click', function () {
        const registrationForm = RegistrationForm(nameInput.value, phoneInput.value, element.getCategory(), dateSelect.options[dateSelect.selectedIndex].text, timeSelect.options[timeSelect.selectedIndex].value)
        element.pushToRegistration(registrationForm)
        let registeredForm = registrationForm.toArray()
        registrationsArray.push(registeredForm)
        if (window.localStorage.getItem('registrations') !== null) {
          window.localStorage.removeItem('registrations')
          window.localStorage.setItem('registrations', JSON.stringify(registrationsArray))
        } else {
          window.localStorage.setItem('registrations', JSON.stringify(registrationsArray))
        }
        console.log(JSON.parse(window.localStorage.getItem('registrations')))
        loadList(element, funkc)
      })

      confirmDiv.appendChild(confirm)
      row2.appendChild(nameInputDiv)
      row2.appendChild(phoneInputDiv)
      row2.appendChild(dateSelectDiv)
      row2.appendChild(timeSelectDiv)
      row2.appendChild(confirmDiv)
      employeeContainer.appendChild(row1)
      employeeContainer.appendChild(row2)
      clicked = true
    } else if (clicked === true) {
      const row1 = document.getElementsByClassName('deleterow')[0]
      const row2 = document.getElementsByClassName('deleterow')[1]
      employeeContainer.removeChild(row1)
      employeeContainer.removeChild(row2)
      clicked = false
    }
  })
}
