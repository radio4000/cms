import dayjs from 'dayjs'

// For formatting options see https://day.js.org/docs/en/display/format
export default function date(dateValue, format = 'DD/MM/YYYY') {
	return dateValue ? dayjs(dateValue).format(format) : '?'
}
