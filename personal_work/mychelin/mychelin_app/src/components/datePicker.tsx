import { getMonth, getYear } from 'date-fns'
import { ko } from 'date-fns/locale'
import { useState } from 'react'
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker'
import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc'

interface dateProps {
  range?: boolean // range or one day - basic : one day
  startDate?: Date
  endDate?: Date
  selectDate?: React.Dispatch<React.SetStateAction<Date>> | undefined
  placeHolder?: string
}

const YEARS = Array.from(
  { length: getYear(new Date()) + 1 - 2000 },
  (_, i) => getYear(new Date()) - i,
)
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export default function DatePicker({
  range = false,
  startDate,
  endDate,
  selectDate,
  placeHolder = 'choose date',
}: dateProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())

  return (
    <div className="w-full">
      <ReactDatePicker
        className="box-border w-full flex-1 rounded-lg border border-solid border-mcl-999 px-1 py-1 transition-all duration-100 ease-in-out focus:border-mcl-orange"
        dateFormat="yyyy.MM.dd"
        formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 1)}
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={100}
        selected={selectedDate}
        shouldCloseOnSelect
        disabledKeyboardNavigation
        locale={ko}
        placeholderText={placeHolder}
        renderCustomHeader={({
          date,
          changeYear,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div
            className={`box-border flex h-full w-full items-center justify-between overflow-hidden bg-black px-1 pb-4 pt-3`}
          >
            <div className="flex items-center justify-center gap-2">
              <span className={`font-bold text-white`}>
                {MONTHS[getMonth(date)]}
              </span>
              <select
                value={getYear(date)}
                className={`cursor-pointer border-none bg-transparent pr-1 font-inter font-bold text-white`}
                onChange={({ target: { value } }) => changeYear(+value)}
              >
                {YEARS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
              >
                <VscChevronLeft className="text-xl text-white" />
              </button>
              <button
                type="button"
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
              >
                <VscChevronRight className="text-xl text-white" />
              </button>
            </div>
          </div>
        )}
        onChange={(date) => {
          setSelectedDate(date)
          date && selectDate?.(date)
        }}
      />
    </div>
  )
}
