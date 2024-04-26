interface BtnProps {
  name: string
  cnt?: number
  disabled?: boolean
  type?: 'button' | 'reset' | 'submit' | undefined
  color?: string
  //   onClick?:
  onClick?(): void
}

export default function BtnJoin({
  name,
  cnt,
  disabled,
  type = 'button',
  color,
  onClick,
}: BtnProps) {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={`h-10 ${cnt ? `w-1/${cnt}` : 'w-full'} ${
        color ? color : 'bg-mcl-orange text-white'
      } rounded-lg font-bold transition duration-100 ease-in-out`}
    >
      {name}
    </button>
  )
}
