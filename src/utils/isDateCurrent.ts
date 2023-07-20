export function isDateCurrent(date: string): boolean {
  const currentDate = new Date()

  const [day, month, year] = date.split('/').map(Number)

  const providedDate = new Date(year, month - 1, day)

  providedDate.setHours(0, 0, 0, 0)
  currentDate.setHours(0, 0, 0, 0)

  return providedDate.getTime() === currentDate.getTime()
}
