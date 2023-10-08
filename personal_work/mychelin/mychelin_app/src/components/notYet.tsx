import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from 'react'

export default function NotYet() {
  const router = useRouter()
  const [wait, setWait] = useState(3)

  //   const interval = useRef<ReturnType<typeof setInterval> | null>(null);
  //   const intervalRef: { current: NodeJS.Timeout | null } = useRef(null);
  const interval: { current: NodeJS.Timeout | null } = useRef(null)
  useEffect(() => {
    interval.current = setInterval(() => {
      setWait((prev) => prev - 1)
    }, 1000)

    return () => {
      clearInterval(interval.current as NodeJS.Timeout)
    }
  }, [])

  useEffect(() => {
    console.log(wait)

    if (!wait) {
      router.back()
    }
  }, [wait])

  return (
    <div className="h-screen w-screen">
      <div className="pt-10 text-lg leading-10">
        {`Please wait. Once the update is in progress, the page will be available.`}
        <br />
        {`Go to the previous page in `}
        <span className="text-mcl-orange">{wait}</span>
        {` seconds. Thank you.`}
      </div>
    </div>
  )
}
