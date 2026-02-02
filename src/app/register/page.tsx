
"use client";
import styles from "./Register.module.css"
import {useForm} from "react-hook-form"
import { RegisterScehema } from "./schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation";
import {z} from "zod";

type registerForm = z.infer<typeof RegisterScehema>

export default function Register() {
 const router = useRouter();
 const {register, handleSubmit, formState: {errors}} = useForm<registerForm>({
    resolver: zodResolver(RegisterScehema)
 })

 const submit = async (data: registerForm) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        method: "Post",
        headers : {"Content-type": "application/json"},
        body: JSON.stringify(data)
    })
    alert("Registered Sucessfully")
    router.push("/login")
 }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}> Register</h1>
                <form className={styles.form} onSubmit={handleSubmit(submit)}>
                    <input type = "text" {...register("name")} className={styles.input} name = "name" placeholder="Enter Name" />
                    {errors.name && <span className={styles.error}>{errors.name.message}</span>}
                    <input type = "text" {...register("email")} className={styles.input} name = "email" placeholder="Enter Email" />
                    {errors.email && <span className={styles.error}>{errors.email.message}</span>}
                    <input type = "password" {...register("password")} className={styles.input} placeholder="Enter Password"/>
                    {errors.password && <span className={styles.error}>{errors.password.message}</span>}
                    <input type = "password" {...register("confirm_password")} className={styles.input} name="confirm_password" placeholder="Enter Confirm password"/>
                    {errors.confirm_password && <span className={styles.error}>{errors.confirm_password.message}</span>}
                    <button type = "submit" className={styles.button} >Register</button>
                </form>
            </div>
        </div>
    )
}