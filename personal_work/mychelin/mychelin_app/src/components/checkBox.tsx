import { ReactNode } from 'react'

interface CheckProps {
  desc?: string // label desc
  name: string // check box name
  bool: boolean // check box state -> true ? false
  shape?: string // rounded ?
  star?: boolean // need star ?
  err?: boolean // no check ? text view
  errArea?: boolean // error area...
  textStyle?: string // text styles
  onClick(): void
}

export default function CheckBox({
  name,
  desc,
  bool,
  shape,
  star,
  err = false,
  errArea = true,
  textStyle = '',
  onClick,
}: CheckProps) {
  return (
    <div
      className={`flex w-full flex-col items-end justify-between ${
        errArea ? 'h-8' : 'h-auto'
      }`}
    >
      <label
        htmlFor={name}
        className={`flex w-full items-center justify-between text-sm ${
          textStyle.length ? textStyle : ''
        }`}
      >
        <p>
          {desc} : {star ? <span className="text-mcl-orange">*</span> : ''}
        </p>
        <span
          className={`h-3 w-3 border border-solid border-mcl-999 -indent-[99999px] transition-all duration-150 ease-in-out ${
            shape === 'round' ? 'rounded-full' : ''
          } ${bool ? 'border-mcl-red bg-mcl-orange' : 'bg-white'}`}
        >
          check
        </span>
        <input
          type="checkbox"
          id={name}
          className="hidden w-auto"
          checked={bool}
          onClick={onClick}
        />
      </label>
      {errArea && err && (
        <div className="text-right text-[10px] text-mcl-red">
          체크하셔야 합니다
        </div>
      )}
    </div>
  )
}
