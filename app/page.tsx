import { auth, signIn } from "@/auth"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await auth()
  if (session) redirect("/dashboard")

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold tracking-tight mb-3">Venn</h1>
      <p className="text-gray-500 mb-8 text-center max-w-sm leading-relaxed">
        Find out what you and a friend have in common on Reddit — without either
        of you seeing the other&apos;s full list.
      </p>
      <form
        action={async () => {
          "use server"
          await signIn("reddit")
        }}
      >
        <button
          type="submit"
          className="bg-[#FF4500] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#e03d00] transition-colors"
        >
          Connect Reddit to start
        </button>
      </form>
      <p className="mt-6 text-xs text-gray-400 max-w-xs text-center">
        Venn shows only what you share. Neither person can see the other&apos;s
        full list.
      </p>
    </main>
  )
}
