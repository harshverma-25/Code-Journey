import { z } from "zod";

export const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),

  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username too long")
    .regex(/^[a-z0-9_]+$/, "Username must contain lowercase letters, numbers, or underscore ONLY"),

  email: z.string().email("Invalid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),

  techStack: z.array(z.string()).optional(),

  college: z.string().optional(),
  city: z.string().optional(),
});
