import moment from 'moment'
import pl from 'moment/locale/pl'

export const yearFormat = 'YYYY'
export const dateFormat = 'YYYY-MM-DD'
export const dateTimeFormat = 'YYYY-MM-DD HH:mm'

export const formattedDate =
  (time) => time ? moment(time).format(dateFormat) : '-'
export const formattedDateTime =
  (time) => time ? moment(time).format(dateTimeFormat) : '-'
export const timeFromNow =
  (time) => time ? moment(time).locale('pl', pl).fromNow() : '-'