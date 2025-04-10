import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import Link from 'next/link'
// import prisma from '../api/prisma';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Welcome to my app!" />
        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>
      </main>
      {/* <Prisma_test/> */}
      <Link href="/page">Test page</Link>
      <Link href="/prisma_test2">Prisma Test page</Link>
      <Link href="/prisma_test5">Prisma Test page5</Link>
      <Link href="/logs">Logs Page</Link>
      <Footer />
    </div>
  )
}
