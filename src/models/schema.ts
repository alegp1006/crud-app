import z from "zod";

export const userSchema = z.object({
  name: z
    .string()
    .min(3, "el nombre debe contener minimo 3 caracteres")
    .max(15, "el nombre debe tener como maximo 15 caracteres"),
  gmail: z.email("el gmail es incorrecto"),
  github: z
    .string()
    .min(3, "el nombre de usuario debe tener minimo 3 caracteres")
    .max(20, " el nombre de usuario debe tener maximo 20 caracteres"),
});

export type UserData = z.infer<typeof userSchema>;
