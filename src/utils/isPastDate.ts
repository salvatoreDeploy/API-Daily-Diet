export function isDatePast(value: string): boolean {
  const [day, month, year] = value.split('/').map(Number)
  const providedDate = new Date(year, month - 1, day)
  const currentDate = new Date()

  const timeZoneOffSetTimeMinutes = currentDate.getTimezoneOffset()
  currentDate.setMinutes(currentDate.getMinutes() - timeZoneOffSetTimeMinutes)

  return providedDate <= currentDate
}
