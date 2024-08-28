import { z } from "zod";

const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(1, { message: "Password is required" }),
    remember: z.boolean().optional(),
})

export type LoginFormInputs = z.infer<typeof loginSchema>;

export default loginSchema;
