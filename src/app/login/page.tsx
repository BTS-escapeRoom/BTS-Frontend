export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      <h1 className="text-3xl font-bold">Login</h1>
      <form className="flex flex-col space-y-4">
        <input
          className="border border-gray-300 rounded p-2"
          placeholder="Email"
          type="email"
        />
        <input
          className="border border-gray-300 rounded p-2"
          placeholder="Password"
          type="password"
        />
        <button
          className="bg-blue-500 text-white rounded p-2"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  )
}