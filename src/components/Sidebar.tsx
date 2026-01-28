import Link from "next/link";
import styles from "./Sidebar.module.css"

export default function Sidebar(){
 return(
    <aside className={styles.sidebar}>
        <h2 className={styles.logo}>My App</h2>
        <nav>
            <Link className={styles.link} href="/dashboard">Dashboard</Link>
            <Link className={styles.link} href="/dashboard/items">Items</Link>
        </nav>
    </aside>
 )
}