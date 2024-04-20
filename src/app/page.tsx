import { Work_Sans } from 'next/font/google'
import { Rubik } from 'next/font/google'
import {Component} from "@/components/component"

const work_sans = Work_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-work_sans',
})
const rubik = Rubik({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rubik',
})

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <html lang="en">
        <body className={work_sans.variable + rubik.variable}>
          <Component />
        </body>
      </html>
    </main>
  );
}
