import { employeeArray, registrationsArray, loadTimes } from './client'
import { RegistrationForm } from './registrationform'
function register () {
  const clientContainer = document.getElementsByClassName('client-container')[0]
  const mq = window.matchMedia('(max-width:600px)')
  if (mq.matches) {
    clientContainer.style.width = '100%'
  } else {
    clientContainer.style.width = '650px'
  }
  const header = document.createElement('h')
  header.innerHTML = 'Registracija'
  header.className = 'headers-text'
  const formContainer = document.createElement('div')
  formContainer.className = 'text-center'
  const form = document.createElement('form')
  const inputFirstName = document.createElement('input')
  inputFirstName.id = 'firstname'
  const labelFirstName = document.createElement('label')
  labelFirstName.for = 'firstname'
  labelFirstName.innerHTML = 'Vardas'
  const inputPhone = document.createElement('input')
  inputPhone.id = 'phone'
  const labelPhone = document.createElement('label')
  labelPhone.for = 'phone'
  labelPhone.innerHTML = 'Telefono numeris'
  const selectHairdresser = document.createElement('select')
  selectHairdresser.id = 'hairdresser'
  const labelHairdresser = document.createElement('label')
  labelHairdresser.for = 'hairdresser'
  labelHairdresser.innerHTML = 'Pasirinkite kategorija'
  const selectDate = document.createElement('select')
  selectDate.id = 'data'
  const labelDate = document.createElement('label')
  labelDate.for = 'data'
  labelDate.innerHTML = 'Pasirinkite diena'
  const selectTime = document.createElement('select')
  selectTime.id = 'time'
  const labelTime = document.createElement('label')
  labelTime.for = 'time'
  labelTime.innerHTML = 'Pasirinkite laika'
  const submitButton = document.createElement('button')
  submitButton.innerHTML = 'Patvirtinti'
  submitButton.type = 'button'

  employeeArray.forEach(function (element, index) {
    const option = document.createElement('option')
    option.value = element.getCategory()
    option.innerHTML = element.getCategory()
    selectHairdresser.appendChild(option)
  })

  employeeArray[0].getDates().forEach(function (element, index) {
    const option = document.createElement('option')
    option.value = index
    option.innerHTML = element.toString()
    selectDate.appendChild(option)
  })

  selectDate.selectedIndex = '0'
  selectDate.addEventListener('click', function () {
    while (selectTime.firstChild) {
      selectTime.removeChild(selectTime.firstChild)
    }
    employeeArray[0].getDates()[selectDate.options[selectDate.selectedIndex].value].getFreeTimes().forEach(function (element, index) {
      const option = document.createElement('option')
      option.innerHTML = element
      selectTime.appendChild(option)
    })
  })

  selectHairdresser.addEventListener('click', function () {
    employeeArray.forEach(function (element) {
      if (element.getCategory() === selectHairdresser.options[selectHairdresser.selectedIndex].value) {
        while (selectDate.firstChild) {
          selectDate.removeChild(selectDate.firstChild)
        }
        element.getDates().forEach(function (element, index) {
          const option = document.createElement('option')
          option.value = index
          option.innerHTML = element.toString()
          selectDate.appendChild(option)
        })

        selectDate.addEventListener('click', function () {
          while (selectTime.firstChild) {
            selectTime.removeChild(selectTime.firstChild)
          }
          element.getDates()[selectDate.options[selectDate.selectedIndex].value].getFreeTimes().forEach(function (element, index) {
            const option = document.createElement('option')
            option.innerHTML = element
            selectTime.appendChild(option)
          })
        })
      }
    })
  })

  submitButton.addEventListener('click', function () {
    let validated = true
    if (inputFirstName.value === '') {
      inputFirstName.className = 'alert'
      validated = false
    } else {
      inputFirstName.className = ''
    }
    if (inputPhone.value === '') {
      inputPhone.className = 'alert'
      validated = false
    } else if (isNaN(inputPhone.value)) {
      inputPhone.className = 'alert'
      validated = false
    } else if (inputPhone.value.length < 9 || inputPhone.value.length > 11) {
      inputPhone.className = 'alert'
      validated = false
    } else {
      inputPhone.className = ''
    }
    if (validated === true) {
      const registrationForm = RegistrationForm(inputFirstName.value, inputPhone.value, selectHairdresser.options[selectHairdresser.selectedIndex].value, selectDate.options[selectDate.selectedIndex].text, selectTime.options[selectTime.selectedIndex].value)
      employeeArray.forEach(function (element) {
        if (element.getCategory() === selectHairdresser.options[selectHairdresser.selectedIndex].value) {
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
          loadTimes()
        }
      })
      let success = document.createElement('h2')
      success.innerHTML = 'Jusu registracija sekminga'
      success.className = 'success'
      formContainer.insertBefore(success, formContainer.firstChild)
    }
  })

  form.appendChild(labelFirstName)
  form.appendChild(inputFirstName)
  form.appendChild(labelPhone)
  form.appendChild(inputPhone)
  form.appendChild(labelHairdresser)
  form.appendChild(selectHairdresser)
  form.appendChild(labelDate)
  form.appendChild(selectDate)
  form.appendChild(labelTime)
  form.appendChild(selectTime)
  form.appendChild(submitButton)
  formContainer.appendChild(header)
  formContainer.appendChild(form)
  clientContainer.appendChild(formContainer)
}

export { register }
