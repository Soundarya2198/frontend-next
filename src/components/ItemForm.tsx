"use client";

import styles from "./ItemForm.module.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { CreateSchema } from "@/app/dashboard/items/create/schema";

type Props = {
  defaultValues?: {
    name: string;
    description: string;
  };
  token?: string | ""
  submitUrl: string;
  method?: "POST" | "PUT";
};

export default function ItemForm({
  defaultValues,
  submitUrl,
  token,
  method = "POST",
}: Props) {
  const router = useRouter();
  const {
  register,
  handleSubmit,
  reset,
  formState: { errors, isSubmitting },
} = useForm({
  resolver: zodResolver(CreateSchema),
  defaultValues: {
    name: "",
    description: "",
  },
});

useEffect(() => {
  if (defaultValues) {
    reset({
      name: defaultValues.name,
      description: defaultValues.description,
    });
  }
}, [defaultValues, reset]);

  const onSubmit = async (data: any) => {
    const loading = toast.loading("Saving item...");

    try {
      const res = await fetch(submitUrl, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error();

      toast.success("Item saved successfully 🎉", { id: loading });
      router.push("/dashboard/items");
      router.refresh();
    } catch {
      toast.error("Something went wrong ❌", { id: loading });
    }
  };

  return (
    <div className={styles.card}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className={styles.label}>Name</label>
          <input {...register("name")} className={styles.input} />
          {errors.name && <p className={styles.error}>{String(errors.name.message)}</p>}
        </div>

        <div>
          <label className={styles.label}>Description</label>
          <textarea {...register("description")} className={styles.textarea} />
          {errors.description && (
            <p className={styles.error}>{String(errors.description.message)}</p>
          )}
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            onClick={() => router.push("/dashboard/items")}
            className={styles.cancel}
          >
            Cancel
          </button>

          <button type="submit" className={styles.submit} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
