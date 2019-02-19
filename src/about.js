function about () {
  const clientContainer = document.getElementsByClassName('client-container')[0]
  const mq = window.matchMedia('(max-width:600px)')
  if (mq.matches) {
    clientContainer.style.width = '100%'
  } else {
    clientContainer.style.width = '650px'
  }
  const aboutWrapper = document.createElement('div')
  aboutWrapper.className = 'on-small-phone'
  const aboutText = document.createElement('p')
  const aboutHeaderWrapper = document.createElement('div')
  aboutHeaderWrapper.className = 'text-center'
  const aboutHeader = document.createElement('h')
  aboutHeader.innerHTML = 'Apie mus'
  aboutHeader.className = 'headers-text'
  aboutText.innerHTML = 'Grožio namai Sfinksas, tai jaukumu pripildyta aplinka, bei išskirtinis dėmesys klientui.' +
  'Esame profesionalų komanda, kuri siūlo kokybiškas paslaugas kiekvienam besiprūpinančiam savo išvaizda.' +
  'Mes Įsikūrę prestižinėje Vilniaus centro vietoje, prie Lukiškių aikštės, esame apsupti svarbiausių valstybinių institucijų,' +
  ' kavinių, restoranų, bankų. Visiems puikiai matomi ir pasiekiami. Mes laukiame Jūsų!' +
  'Jūsų laukia profesionalūs plaukų stilistai, kurie dirba su pažangiausiomis kosmetikos linijomis plaukams: SACHAJUAN, MOROCCANOIL, OLAPLEX, KEVIN MURPHY, KEUNE, TAILOR’S.'
  aboutText.className = 'inner-text'
  aboutHeaderWrapper.appendChild(aboutHeader)
  aboutWrapper.appendChild(aboutHeaderWrapper)
  aboutWrapper.appendChild(aboutText)
  clientContainer.appendChild(aboutWrapper)
}

export { about }
