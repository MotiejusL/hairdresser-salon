const dateDay = (day) => {
  let now = new Date()
  const getDay = () => day
  let freeTimes = []
  day.setHours(10)
  day.setMinutes(0)
  createDates(freeTimes, day, now)
  const getFreeTimes = () => {
    return freeTimes
  }
  const deleteFreeTime = (time) => {
    freeTimes.forEach(function (element, index) {
      if (time === element) {
        freeTimes.splice(index, 1)
      }
    })
  }
  const toString = () => {
    if (day.getMonth() < 10 && day.getDate() < 10) {
      return '0' + (day.getMonth() + 1) + '-0' + day.getDate()
    } else if (day.getMonth() < 10) {
      return '0' + (day.getMonth() + 1) + '-' + day.getDate()
    } else {
      return day.getMonth() + '-' + day.getDate()
    }
  }

  return { getDay, getFreeTimes, deleteFreeTime, toString }
}

export { dateDay }

function createDates (freeTimes, day, now) {
  if (day.getMonth() === now.getMonth()) {
    if (day.getDay() === now.getDay()) {
      if (day.getHours() > now.getHours()) {
        freeTimes.push(day.getHours() + ':0' + day.getMinutes())
      } else if (day.getHours() === now.getHours()) {
        if (day.getMinutes() > now.getMinutes()) {
          freeTimes.push(day.getHours() + ':0' + day.getMinutes())
        }
      }
    } else {
      freeTimes.push(day.getHours() + ':0' + day.getMinutes())
    }
  } else {
    freeTimes.push(day.getHours() + ':0' + day.getMinutes())
  }
  for (let i = 0; i < 40; i++) {
    day.setMinutes(day.getMinutes() + 15)
    if (day.getMonth() === now.getMonth()) {
      if (day.getDay() === now.getDay()) {
        if (day.getHours() > now.getHours()) {
          if (day.getMinutes() === 0) {
            freeTimes.push(day.getHours() + ':0' + day.getMinutes())
          } else {
            freeTimes.push(day.getHours() + ':' + day.getMinutes())
          }
        } else if (day.getHours() === now.getHours()) {
          if (day.getMinutes() > now.getMinutes()) {
            if (day.getMinutes() === 0) {
              freeTimes.push(day.getHours() + ':0' + day.getMinutes())
            } else {
              freeTimes.push(day.getHours() + ':' + day.getMinutes())
            }
          }
        }
      } else {
        if (day.getMinutes() === 0) {
          freeTimes.push(day.getHours() + ':0' + day.getMinutes())
        } else {
          freeTimes.push(day.getHours() + ':' + day.getMinutes())
        }
      }
    } else {
      if (day.getMinutes() === 0) {
        freeTimes.push(day.getHours() + ':0' + day.getMinutes())
      } else {
        freeTimes.push(day.getHours() + ':' + day.getMinutes())
      }
    }
  }
}
