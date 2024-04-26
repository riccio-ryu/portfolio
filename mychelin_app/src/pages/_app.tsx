import type { AppProps } from 'next/app'
import React from 'react'
import { RecoilRoot } from 'recoil'
import '@/styles/globals.css'
import '@/styles/datepicker.css'
import '@/styles/mapModal.css'

import {
  Inter,
  Roboto,
  Montserrat,
  Noto_Sans_KR,
  Nanum_Gothic,
} from 'next/font/google'
import { cls } from '@/utils/classJoin'

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--inter',
})
export const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--montserrat',
})
export const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--roboto',
})
export const noto_sans_kr = Noto_Sans_KR({
  preload: false,
  display: 'swap',
  weight: ['100', '300', '400', '500', '700', '900'],
  variable: '--noto_sans_kr',
})
export const nanum_gothic = Nanum_Gothic({
  preload: false,
  display: 'swap',
  weight: ['400', '700'],
  variable: '--nanum_gothic',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <div
        className={`mx-auto h-full w-full font-roboto ${cls(
          noto_sans_kr.variable,
          inter.variable,
          montserrat.variable,
          roboto.variable,
          nanum_gothic.variable,
        )}`}
      >
        {/*  ${inter.variable} ${montserrat.variable} ${roboto.variable} ${noto_sans_kr.variable} ${nanum_gothic.variable} */}
        <Component {...pageProps} />
      </div>
    </RecoilRoot>
  )
}
