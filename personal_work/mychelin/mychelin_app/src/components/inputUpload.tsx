import type { UseFormRegisterReturn } from 'react-hook-form'
import DatePicker from './datePicker'
import { useEffect, useState } from 'react'
import Dayjs from './dayjs'

interface InputProps {
  label: string //label name
  name: string //id
  method?: 'text' | 'phone' | 'price' //
  tag?: 'input' | 'textarea' | 'date' // input ? textarea? date?
  type: string // input type
  register: UseFormRegisterReturn
  required?: boolean // required *
  err?: string // err message
  add?: '' | 'plus' | 'minus' // + add
  btnClick?(): void
}

export default function InputUpload({
  label,
  name,
  method = 'text',
  tag = 'input',
  register,
  type,
  required,
  err,
  add = '',
  btnClick,
}: InputProps) {
  const [fetchDate, setFetchDate] = useState(new Date())
  const dayTrans = Dayjs('YYYY-MM-DD', fetchDate)
  // useEffect(() => {
  //   console.log(fetchDate)
  //   console.log(dayTrans)
  // }, [fetchDate])

  return (
    <div
      className={`flex w-full flex-col ${
        tag === 'textarea' ? 'h-auto' : 'h-10'
      }`}
    >
      <div
        className={`flex w-full flex-nowrap justify-between ${
          tag === 'textarea' ? 'items-baseline' : 'items-center'
        }`}
      >
        <label htmlFor={name} className="w-1/6 flex-none text-sm sm:text-base">
          {required ? <span className="text-mcl-orange">* </span> : ''} {label}
        </label>
        {tag === 'input' ? (
          <input
            type={type}
            id={name}
            required={required}
            className="box-border w-max flex-1 rounded-lg border border-mcl-999 px-1 py-1 transition-all duration-100 ease-in-out focus:border-mcl-orange"
            {...register}
          />
        ) : null}
        {add.length > 0 && (
          <span className="w-24 text-right">
            {add === 'plus' ? (
              <button
                className="w-20 flex-none rounded-lg bg-mcl-orange py-1 text-sm text-white"
                onClick={btnClick}
              >
                메뉴 추가
              </button>
            ) : (
              <button
                className="w-20 flex-none rounded-lg bg-mcl-yellow py-1 text-sm text-white"
                onClick={btnClick}
              >
                메뉴 삭제
              </button>
            )}
          </span>
        )}
        {tag === 'textarea' ? (
          <textarea
            id={name}
            rows={8}
            className="box-border w-max flex-1 resize-none rounded-lg border border-mcl-999 px-1 py-1 transition-all duration-100 ease-in-out focus:border-mcl-orange"
            {...register}
          ></textarea>
        ) : null}
        {tag === 'date' ? (
          <>
            <input
              type={type}
              id={name}
              required={required}
              className="hidden"
              value={dayTrans}
              {...register}
            />
            <DatePicker
              placeHolder="Choose your visit day"
              selectDate={setFetchDate}
            />
          </>
        ) : // selectDate={setVisitDate}
        null}
      </div>
      {err && <div className="pl-32 text-[10px] text-mcl-red">{err}</div>}
    </div>
  )
}
