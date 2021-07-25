import dayjs from 'dayjs'

export default function date(dateValue, format = 'DD/MM/YYYY') {
	return dateValue ? dayjs(dateValue).format(format) : '?'
}
