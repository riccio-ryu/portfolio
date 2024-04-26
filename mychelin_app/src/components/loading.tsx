import { VscLoading } from 'react-icons/vsc'

export default function Loading() {
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl">
      <VscLoading className="absolute animate-spin text-mcl-red" />
      <VscLoading className="absolute animate-spin-slow text-mcl-orange" />
    </div>
  )
}
