export function isDatePast(date: string) {
  const [day, month, year] = date.split('/').map(Number)
  const providedDate = new Date(year, month - 1, day)
  const currentDate = new Date()

  const timeZoneOffSetTimeMinutes = currentDate.getTimezoneOffset()
  currentDate.setMinutes(currentDate.getMinutes() - timeZoneOffSetTimeMinutes)

  console.log(providedDate <= currentDate)
}
