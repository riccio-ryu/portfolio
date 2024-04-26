import Head from 'next/head'

interface titleProp {
  title: string
}

export default function Seo({ title }: titleProp) {
  return <Head>{title}</Head>
}
