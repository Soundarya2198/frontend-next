import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import styles from "./dashboard.module.css"

export default function DashboardLayout(
    {
        children,
    } : {
        children: React.ReactNode
    }
){

    return (
        <div className={styles.wrapper}>
        <Sidebar/>
        <div className={styles.main}>
            <Navbar/>
            <div className={styles.children}>{children}</div>
        </div>
        </div>
    )
}
