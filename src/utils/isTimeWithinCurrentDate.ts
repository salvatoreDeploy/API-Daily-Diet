export function isTimeWithinCurrentDate(
  currentTime: string,
  currentDate: Date,
): boolean {
  const [currentYear, currentMonth, currentDay] = currentDate
    .toISOString()
    .split('T')[0]
    .split('-')

  const [hour, minute] = currentTime.split(':')

  const inputDate = new Date(
    Number(currentYear),
    Number(currentMonth) - 1,
    Number(currentDay) - 1,
    Number(hour),
    Number(minute),
  )

  return inputDate <= currentDate
}
