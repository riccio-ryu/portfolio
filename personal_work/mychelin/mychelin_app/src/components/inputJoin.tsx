import type { UseFormRegisterReturn } from 'react-hook-form'

interface InputProps {
  label: string
  name: string
  method?: 'text' | 'phone' | 'price'
  tag?: 'input' | 'textarea'
  type: string
  register: UseFormRegisterReturn
  required: boolean
  err?: string
  goal?: 'sign-in' | 'sign-up'
}

export default function InputJoin({
  label,
  name,
  method = 'text',
  tag = 'input',
  register,
  type,
  required,
  err,
  goal = 'sign-in',
}: InputProps) {
  return (
    <div
      className={`flex w-full flex-col ${tag === 'input' ? 'h-10' : 'h-auto'}`}
    >
      <div
        className={`flex w-full flex-nowrap justify-between ${
          tag === 'input' ? 'items-center' : 'items-baseline'
        }`}
      >
        <label
          htmlFor={name}
          className={`${
            goal === 'sign-in' ? 'w-20' : 'w-[140px]'
          } flex-none text-sm font-bold sm:w-40 sm:text-base`}
        >
          {label} : {required ? <span className="text-mcl-orange">*</span> : ''}
        </label>
        {tag === 'input' ? (
          <input
            type={type}
            id={name}
            required={required}
            className="box-border w-auto min-w-0 flex-auto rounded-[4px] border border-mcl-999 px-1 py-1 transition-all duration-100 ease-in-out focus:border-mcl-orange sm:w-[200px] sm:min-w-0"
            {...register}
          />
        ) : null}
        {tag === 'textarea' ? (
          <textarea
            id={name}
            rows={4}
            className="box-border w-auto min-w-0 flex-auto resize-none rounded-[4px] border border-mcl-999 px-1 py-1 transition-all duration-100 ease-in-out focus:border-mcl-orange sm:w-[200px] sm:min-w-0"
            {...register}
          ></textarea>
        ) : null}
      </div>
      {err && (
        <div className="pl-0 text-right text-ss text-mcl-red sm:pl-40 sm:text-left">
          {err}
        </div>
      )}
    </div>
  )
}
