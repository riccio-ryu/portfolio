import Loading from './loading'

export default function LoadingFull() {
  return (
    <div className="absolute left-0 top-0 z-50 h-full w-full">
      <div className="relative h-full w-full bg-black opacity-50"></div>
      <Loading />
    </div>
  )
}
