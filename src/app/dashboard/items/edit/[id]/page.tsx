import ItemForm from "@/components/ItemForm";
import { cookies } from "next/headers";

export default async function EditItemPage(
  {params, }: {params: {id: string}}
 ) {
  const cookieStore = cookies()
  const token = cookieStore.get("token")?.value
  console.log(token+"tokennnnnnnnn")
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/getItem/${params.id}`,
    {   headers: {
        Authorization: `Bearer ${token}`
    },
       cache: "no-store" }
  );
  const item = await res.json();
  const itemData = item.item
  return (
    <ItemForm
      defaultValues={{
        name: itemData.name,
        description: itemData.description,
      }}
      token = {token}
      submitUrl={`${process.env.NEXT_PUBLIC_API_URL}/updateItem/${params.id}`}
      method="PUT" 
    />
  );
}
