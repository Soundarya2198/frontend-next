import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ItemsTable from "./ItemsTable"

export default async function ItemsPage() {
  const token = cookies().get("token")?.value;

  if (!token) redirect("/login");

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/listItems`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch items");

  const data = await res.json();

  return <ItemsTable items={data.items} token={token} />;
}
