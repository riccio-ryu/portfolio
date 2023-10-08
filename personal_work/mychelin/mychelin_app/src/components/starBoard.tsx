import { useEffect, useState } from 'react'
import StarPoint from './starPoint'

interface BoardProps {
  use: boolean // star point use :: span show
  name: string // name
  showName?: string // name show
  point?: number // star point ex) 87%
  width?: number // one of the star width
  depth?: number // stars row depth
  total?: boolean //total(false) or personal(true)
  act?: boolean // star point action
  starChange?(n: number): void // star point check
}

export default function StarBoard({
  use,
  name = '',
  showName = name,
  point = 0,
  width = 20,
  depth = 0,
  total = false,
  act = true,
  starChange,
}: BoardProps) {
  const [number, setNumber] = useState('0') // star point write input
  const [cntChange, setCntChange] = useState(point) //point value change state
  const onNumber = (event: Event | undefined) => {
    // console.log(event?.target.value) err
    const target = event?.target as HTMLInputElement
    let val = target.value
    if (Number(val) > 10) val = '10'
    if (val.length > 1 && Number(val[0]) < 1) val = val[1]
    if (!Number.isInteger(Number(val))) {
      // console.log(Number.isInteger(Number(val)))
      val = Number(val).toFixed(1)
      // console.log('val : ', val)
    }
    if (val.length < 1) val = '0'
    setNumber(val)
    setCntChange(Number(val))
  }

  useEffect(() => {
    starChange?.(Number(number))
  }, [number])

  return (
    <div className="relative flex flex-wrap items-center justify-start gap-0 overflow-hidden">
      <span className={`w-16 flex-none text-xs ${use ? '' : 'hidden'}`}>
        {showName}
      </span>
      <StarPoint
        use={act}
        width={width}
        cnt={cntChange}
        name={name}
        depth={depth}
        setNumber={setNumber}
      />
      <input
        type="number"
        value={number}
        className="ml-3 w-6 text-right text-sm"
        onChange={() => onNumber(event)}
        max={10}
        min={0}
        id={name}
        step={0.1}
        readOnly={act}
      />
      <label htmlFor={name} className="ml-2 text-xs text-mcl-999">
        점 / 10점
      </label>
    </div>
  )
}
