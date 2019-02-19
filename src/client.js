import { Hairdresser } from './hairdresser'
import { about } from './about'
import { contacts } from './contacts'
import { register } from './registration'

let employeeArray = []
let registrationsArray
if (window.localStorage.getItem('registrations') !== null) {
  registrationsArray = JSON.parse(window.localStorage.getItem('registrations'))
} else {
  registrationsArray = []
}

//window.localStorage.clear()

const hairdresser1 = Hairdresser('Diana', 'Vyru kirpimas')
const hairdresser2 = Hairdresser('Migle', 'Moteru kirpimas')
const hairdresser3 = Hairdresser('Gintare', 'Plauku dazymas')
employeeArray.push(hairdresser1)
employeeArray.push(hairdresser2)
employeeArray.push(hairdresser3)

loadTimes()

export { employeeArray, registrationsArray, loadTimes }

const homeButton = document.getElementById('home')
const aboutButton = document.getElementById('about')
const registerButton = document.getElementById('register')
const contactsButton = document.getElementById('contacts')

const clientContainer = document.getElementsByClassName('client-container')[0]
register()

aboutButton.addEventListener('click', function () {
  deleteChilds(clientContainer)
  about()
})

registerButton.addEventListener('click', function () {
  deleteChilds(clientContainer)
  register()
})

contactsButton.addEventListener('click', function () {
  deleteChilds(clientContainer)
  contacts()
})

homeButton.addEventListener('click', function () {
  window.location.href = 'index.html'
})

function deleteChilds (parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild)
  }
}

function loadTimes () {
  registrationsArray.forEach(function (element) {
    employeeArray.forEach(function (employee) {
      if (element[2] === employee.getCategory()) {
        employee.getDates().forEach(function (date) {
          if (String(date) === String(element[3])) {
            date.deleteFreeTime(element[4])
          }
        })
      }
    })
  })
}
