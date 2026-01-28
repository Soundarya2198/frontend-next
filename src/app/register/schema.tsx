import {z} from "zod"

export const RegisterScehema = z.object({
    name: z.string().min(1, "Name is required"),
    password: z.string().min(1, "Password is required").min(6, "Min 6 charecters"),
    confirm_password: z.string().min(1, "Confirm password is required"),
    email : z.string().min(1, "Email is required")
})
.refine( (data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Password do not match"
})