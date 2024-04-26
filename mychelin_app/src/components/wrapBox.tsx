interface boxProp {
  color?: string
  onClose?(): void
}

export default function WrapBox({ color, onClose }: boxProp) {
  return (
    <div
      className={`fixed left-0 top-0 z-20 h-screen w-screen ${
        color ? color : 'bg-black opacity-20'
      }`}
      onClick={onClose}
    ></div>
  )
}
