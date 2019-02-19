const RegistrationForm = (name, phone, category, day, time) => {
  const getName = () => name
  const getPhone = () => phone
  const getCategory = () => category
  const getDay = () => day
  const getTime = () => time
  const toArray = () => {
    return [name, phone, category, day, time]
  }

  return { getName, getPhone, getCategory, getDay, getTime, toArray }
}

export { RegistrationForm }
