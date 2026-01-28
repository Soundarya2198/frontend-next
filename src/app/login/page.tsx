
"use client";
import styles from "./Login.module.css"
import { LoginSchema } from "./schema"
import {useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();
    const {register, setError,  handleSubmit, formState: {errors}} = useForm({
        resolver: zodResolver(LoginSchema)
    })

    const submit = async (data: any) => {
      const res =  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
         method: "Post",
         headers: {"Content-type": "application/json"},
         body: JSON.stringify(data)
        })
      const result = await res.json()
      console.log(result)

      if(!res.ok){
        setError("email", {
            message: result.message
        })
        return;
      }

      document.cookie = `token=${result.token}; path=/;`;
      router.push("/dashboard")
    }
  
  return (
    <div className={styles.container}>
        <div className={styles.card}>
           <h1 className={styles.title}>Login</h1>
           <form className={styles.form} onSubmit={handleSubmit(submit)}>
             <input type="text" placeholder="Enter Email" {...register("email")} className={styles.input} />
             {errors.email && <p className={styles.error}>{errors.email.message}</p>}

             <input type="password" placeholder="Enter Password" {...register("password")} className={styles.input} />
             {errors.password && <p className={styles.error}>{errors.password.message}</p>}

             <button type="submit" className={styles.button}>Login</button>
           </form>
        </div>
    </div>
  )
}