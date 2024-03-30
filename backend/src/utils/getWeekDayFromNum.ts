/**
 * Gets the column name for the active day boolean based on the day of the week.
 * @param dayOfWeek The day of the week as a number (0 = Sunday, 6 = Saturday)
 * @returns The column name as a string
 */
export function getActiveDayColumnName(dayOfWeek: number): string {
  switch (dayOfWeek) {
    case 0:
      return 'isSunday';
    case 1:
      return 'isMonday';
    case 2:
      return 'isTuesday';
    case 3:
      return 'isWednesday';
    case 4:
      return 'isThursday';
    case 5:
      return 'isFriday';
    case 6:
      return 'isSaturday';
    default:
      throw new Error('Invalid day of the week');
  }
}
