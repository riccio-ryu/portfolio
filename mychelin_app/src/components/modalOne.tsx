import { useEffect } from 'react'

interface modalProps {
  wording: string
  answer?: string
  onClose?(): void
}

export default function ModalOne({
  wording,
  answer = '예',
  onClose,
}: modalProps) {
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`
    return () => {
      const scrollY = document.body.style.top
      document.body.style.cssText = ''
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1)
    }
  }, [])
  return (
    <div className="absolute left-0 top-0 z-50 h-screen w-full">
      <div
        className="relative h-full w-full bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="absolute left-1/2 top-1/2 flex h-auto min-h-[160px] w-5/6 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-between gap-5 rounded bg-white px-5 py-10 text-center sm:w-80">
        <p>{wording}</p>
        <button
          onClick={onClose}
          className="mx-auto w-1/2 rounded bg-mcl-orange p-2 text-xs text-mcl-ivory hover:bg-mcl-red"
        >
          {answer}
        </button>
      </div>
    </div>
  )
}
