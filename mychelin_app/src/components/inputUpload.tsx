import type { UseFormRegisterReturn } from 'react-hook-form'
import DatePicker from './datePicker'
import { useEffect, useState } from 'react'
import Dayjs from '../utils/dayjs'

interface InputProps {
  label: string //label name
  name: string //id
  method?: 'text' | 'phone' | 'price' //
  tag?: 'input' | 'textarea' | 'date' | 'map' // input ? textarea? date?
  type: string // input type
  register: UseFormRegisterReturn
  required?: boolean // required *
  err?: string // err message
  add?: '' | 'plus' | 'minus' // + add
  value?: string
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
  value,
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
        <label
          htmlFor={name}
          className="w-1/5 flex-none text-xs sm:w-1/6 sm:text-base"
        >
          {required ? <span className="text-mcl-orange">* </span> : ''} {label}
        </label>
        {tag === 'input' ? (
          <input
            type={type}
            id={name}
            required={required}
            className="box-border flex-1 rounded-lg border border-mcl-999 px-1 py-1 text-xs transition-all duration-100 ease-in-out focus:border-mcl-orange sm:w-max sm:text-base"
            {...register}
          />
        ) : null}
        {add.length > 0 && (
          <span className="ml-1 w-16 text-right sm:ml-0 sm:w-24">
            {add === 'plus' ? (
              <button
                className="w-16 flex-none rounded bg-mcl-orange py-1 text-xs text-white sm:w-20 sm:rounded-lg sm:text-sm"
                onClick={btnClick}
              >
                메뉴 추가
              </button>
            ) : (
              <button
                className="w-16 flex-none rounded bg-mcl-yellow py-1 text-xs text-white sm:w-20 sm:rounded-lg sm:text-sm"
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
            className="box-border flex-1 resize-none rounded-lg border border-mcl-999 px-1 py-1 text-xs transition-all duration-100 ease-in-out focus:border-mcl-orange sm:w-max sm:text-base"
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
        {tag === 'map' ? (
          <input
            autoComplete="off"
            type={type}
            id={name}
            required={required}
            className="box-border flex-1 rounded-lg border border-mcl-999 px-1 py-1 text-xs transition-all duration-100 ease-in-out focus:border-mcl-orange sm:w-max sm:text-base"
            {...register}
            onClick={btnClick}
            value={value}
          />
        ) : null}
      </div>
      {err && <div className="pl-32 text-[10px] text-mcl-red">{err}</div>}
    </div>
  )
}
