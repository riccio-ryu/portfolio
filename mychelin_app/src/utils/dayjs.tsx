import dayjs from 'dayjs'
import 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ko' //korea time

// interface DayProps {
//   format?: string
//   day: string | number | Date
// }
// { format = 'YYYY-MM-DD', day }: DayProps
export default function Dayjs(format: string, day: Date) {
  const d = dayjs(day).format(format)
  return d
}
