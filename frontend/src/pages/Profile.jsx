// Profile.jsx
import { useAuth } from "./authContext"

export default function Profile() {
  const { user, setUser } = useAuth()

  return (
    <div>
      <h2>你好，{user ? user.name : "Guest"}</h2>
      <button onClick={() => setUser({ name: "Elmo" })}>
        模擬登入
      </button>
      <button onClick={() => setUser(null)}>
        登出
      </button>
    </div>
  )
}
