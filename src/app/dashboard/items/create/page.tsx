import ItemForm from "@/components/ItemForm";
import styles from "../items.module.css";
import { cookies } from "next/headers";

export default function CreateItemPage() {
  const cookieStore = cookies()
  const token = cookieStore.get("token")?.value
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Create Item</h1>

      <ItemForm token = {token} submitUrl={`${process.env.NEXT_PUBLIC_API_URL}/createItem`} />
    </div>
  );
}
