import { format } from 'date-fns'

/**
 * Function to format a date.
 * @param dateString - The date in ISO format.
 * @param dateFormat - The output format for the date (default: "dd.MM.yyyy HH:mm").
 * @returns The formatted date as a string.
 */

export const formatDate = (
  dateString: string,
  dateFormat = 'dd.MM.yyyy HH:mm'
): string => {
  if (!dateString) return 'Invalid date'
  return format(new Date(dateString), dateFormat)
}
