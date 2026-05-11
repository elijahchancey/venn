import { auth, signOut } from "@/auth"
import { redirect } from "next/navigation"

export default async function Dashboard() {
  const session = await auth()
  if (!session) redirect("/")

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold tracking-tight">Venn</h1>
          <form
            action={async () => {
              "use server"
              await signOut({ redirectTo: "/" })
            }}
          >
            <button
              type="submit"
              className="text-sm text-gray-400 hover:text-gray-600"
            >
              Sign out
            </button>
          </form>
        </div>

        <p className="text-gray-500 mb-8">
          Hi {session.user?.name}. Invite links will appear here once you create
          them.
        </p>

        <div className="border border-dashed border-gray-200 rounded-xl p-8 text-center">
          <p className="text-gray-400 text-sm mb-3">
            Create your first invite link to get started.
          </p>
          <button
            disabled
            className="bg-[#FF4500] text-white px-4 py-2 rounded-lg text-sm font-medium opacity-40 cursor-not-allowed"
          >
            Create invite link
          </button>
          <p className="mt-3 text-xs text-gray-300">Coming in Phase 3</p>
        </div>
      </div>
    </main>
  )
}
