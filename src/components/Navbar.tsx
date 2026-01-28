"use client"

import { useRouter } from "next/navigation"
import styles from "./Navbar.module.css"

export default function Navbar() {
  const router = useRouter()

  const logout = async () => {
    document.cookie = "token=; Max-Age=0; path=/"
    router.push("/login")
  }

  return (
    <header className={styles.nav}>
      <div />
      <div className={styles.right}>
        <span className={styles.profile}>👤 Profile</span>
        <button onClick={logout} className={styles.logout}>Logout</button>
      </div>
    </header>
  )
}
