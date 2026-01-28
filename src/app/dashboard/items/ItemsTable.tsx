"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import styles from "./items.module.css";

type Item = {
  itemId: string;
  name: string;
  description: string;
};

export default function ItemsTable({
  items,
  token,
}: {
  items: Item[];
  token: string;
}) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    const loading = toast.loading("Deleting item...");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/deleteItem/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error();

      toast.success("Item deleted 🗑️", { id: loading });
      router.refresh();
    } catch {
      toast.error("Delete failed ❌", { id: loading });
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Items list</h1>

      <div className={styles.create_div}>
        <Link href="/dashboard/items/create" className={styles.create}>
          Create
        </Link>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan={4} className={styles.empty}>
                No Items Found
              </td>
            </tr>
          ) : (
            items.map((item, index) => (
              <tr key={item.itemId}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td className={styles.actions}>
                  <Link
                    href={`/dashboard/items/edit/${item.itemId}`}
                    className={styles.edit}
                  >
                    Edit
                  </Link>

                  <button
                    className={styles.delete}
                    onClick={() => handleDelete(item.itemId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
