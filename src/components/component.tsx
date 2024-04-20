/** Add fonts into your Next.js project:

import { Work_Sans } from 'next/font/google'
import { Rubik } from 'next/font/google'

work_sans({
  subsets: ['latin'],
  display: 'swap',
})

rubik({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { JSX, SVGProps } from "react"

export function Component() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between">
        <Link className="flex items-center" href="#">
          <HeartIcon className="h-6 w-6" />
          <span className="sr-only">Cupid</span>
        </Link>
        <nav className="hidden lg:flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Contact
          </Link>
        </nav>
        <Button>Sign Up</Button>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6 text-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Find your perfect match</h1>
              <HeartIcon className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 text-red-600 rounded-full mix-blend-multiply filter blur-2xl opacity-80 animate-blob animation-delay-2000" />
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Cupid is a modern dating platform that connects you with like-minded individuals.
              </p>
              <Button>Sign Up</Button>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center space-y-2">
                <img
                  alt="Profile"
                  className="rounded-full"
                  height="80"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "80/80",
                    objectFit: "cover",
                  }}
                  width="80"
                />
                <h3 className="text-lg font-semibold">Jane Doe</h3>
                <p className="text-gray-500 dark:text-gray-400 line-clamp-2">
                  Hi, I'm Jane! I love traveling, trying new foods, and spending time with my friends.
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <img
                  alt="Profile"
                  className="rounded-full"
                  height="80"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "80/80",
                    objectFit: "cover",
                  }}
                  width="80"
                />
                <h3 className="text-lg font-semibold">John Smith</h3>
                <p className="text-gray-500 dark:text-gray-400 line-clamp-2">
                  Hey there! I'm John, an adventurous soul who enjoys hiking, photography, and good conversation.
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <img
                  alt="Profile"
                  className="rounded-full"
                  height="80"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "80/80",
                    objectFit: "cover",
                  }}
                  width="80"
                />
                <h3 className="text-lg font-semibold">Emily Johnson</h3>
                <p className="text-gray-500 dark:text-gray-400 line-clamp-2">
                  Hi, I'm Emily! I'm passionate about art, music, and learning new things. Let's connect!
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <img
                  alt="Profile"
                  className="rounded-full"
                  height="80"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "80/80",
                    objectFit: "cover",
                  }}
                  width="80"
                />
                <h3 className="text-lg font-semibold">Michael Brown</h3>
                <p className="text-gray-500 dark:text-gray-400 line-clamp-2">
                  Hey, I'm Michael! I enjoy outdoor activities, reading, and intellectual discussions.
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <img
                  alt="Profile"
                  className="rounded-full"
                  height="80"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "80/80",
                    objectFit: "cover",
                  }}
                  width="80"
                />
                <h3 className="text-lg font-semibold">Sarah Davis</h3>
                <p className="text-gray-500 dark:text-gray-400 line-clamp-2">
                  Hi, I'm Sarah! I'm a passionate foodie, avid reader, and lover of all things outdoors.
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <img
                  alt="Profile"
                  className="rounded-full"
                  height="80"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "80/80",
                    objectFit: "cover",
                  }}
                  width="80"
                />
                <h3 className="text-lg font-semibold">David Lee</h3>
                <p className="text-gray-500 dark:text-gray-400 line-clamp-2">
                  Hey there! I'm David, a tech enthusiast who enjoys gaming, coding, and exploring new hobbies.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Cupid. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}

function HeartIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      // solid fill
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}
