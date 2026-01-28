"use client";
import styles from "./create.module.css";
import { CreateSchema } from "./schema";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from "next/navigation";

export default function CreateForm({token} : {token: string}) {
    const {register, handleSubmit, formState: {errors}} = useForm({
       resolver: zodResolver(CreateSchema)
    })
    const router = useRouter();

    const submit = async (data: any) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/createItem`, {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-type": "application/json"
            }
        })

        if(!res.ok){
            alert("Failed to create items")
            return;
        }else{
            alert("Items Created Sucesfully")
        }
        return router.push("/dashboard/items") 
    }
    return (
        <div className={styles.container}>
          <div className={styles.card}>
            <h2 className={styles.heading}>Create Item</h2>
            <form className={styles.form} onSubmit={handleSubmit(submit)}>
                <label className={styles.label} >Name</label>
                 <input type="text" {...register("name")} className={styles.input} />
                 {errors.name && <span className={styles.error}>{errors.name.message}</span>}
                <label className={styles.label}>Description</label>
                <textarea className={styles.textarea} {...register("description")}></textarea>
                 {errors.description && <span className={styles.error}>{errors.description.message}</span>}
                 <button type="button"  onClick={() => router.push("/dashboard/items")} className={styles.cancel} >
            Cancel
          </button>
                 <button type="submit" className={styles.button}>Submit</button>
               </form>
          </div>
        </div>
    )
}