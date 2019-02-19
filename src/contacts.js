function contacts () {
  const clientContainer = document.getElementsByClassName('client-container')[0]
  const mq = window.matchMedia('(max-width:600px)')
  if (mq.matches) {
    clientContainer.style.width = '100%'
  } else {
    clientContainer.style.width = '600px'
  }
  const contactsWrapper = document.createElement('div')
  contactsWrapper.className = 'text-center'
  const contactsHeader = document.createElement('h')
  contactsHeader.innerHTML = 'Kontaktai'
  contactsHeader.className = 'headers-text'
  const adressLabel = document.createElement('h3')
  adressLabel.innerHTML = 'Adresas:'
  adressLabel.className = 'inner-text-labels'
  const adress = document.createElement('p')
  adress.innerHTML = 'Vasario 16 – osios g. 16, Vilnius'
  adress.className = 'inner-text'
  const workTimeLabel = document.createElement('h3')
  workTimeLabel.innerHTML = 'Darbo laikas:'
  workTimeLabel.className = 'inner-text-labels'
  const workTime = document.createElement('p')
  workTime.innerHTML = 'I - VII 10:00 - 20:00'
  workTime.className = 'inner-text'
  const phoneLabel = document.createElement('h3')
  phoneLabel.innerHTML = 'Telefonas:'
  phoneLabel.className = 'inner-text-labels'
  const phone = document.createElement('p')
  phone.innerHTML = '+37062589425'
  phone.className = 'inner-text'
  const mailLabel = document.createElement('h3')
  mailLabel.innerHTML = 'El.pastas:'
  mailLabel.className = 'inner-text-labels'
  const mail = document.createElement('p')
  mail.innerHTML = 'eleganthair@gmail.com'
  mail.className = 'inner-text'

  contactsWrapper.appendChild(contactsHeader)
  contactsWrapper.appendChild(adressLabel)
  contactsWrapper.appendChild(adress)
  contactsWrapper.appendChild(workTimeLabel)
  contactsWrapper.appendChild(workTime)
  contactsWrapper.appendChild(phoneLabel)
  contactsWrapper.appendChild(phone)
  contactsWrapper.appendChild(mailLabel)
  contactsWrapper.appendChild(mail)
  clientContainer.appendChild(contactsWrapper)
}

export { contacts }
