import { z } from "zod";

// Schema para crear reservas
export const bookingSchema = z.object({
  userId: z
    .number()
    .int()
    .positive("El userId debe ser un número mayor que 0"),

  roomId: z
    .number()
    .int()
    .positive("El roomId debe ser un número mayor que 0"),

  date: z
    .string()
    // Valida formato YYYY-MM-DD
    .regex(/^\d{4}-\d{2}-\d{2}$/, "La fecha debe tener el formato YYYY-MM-DD"),

  startTime: z
    .string()
    // Valida formato HH:mm
    .regex(
      /^([01]\d|2[0-3]):[0-5]\d$/,
      "La hora de inicio debe tener el formato HH:mm"
    ),

  endTime: z
    .string()
    // Valida formato HH:mm
    .regex(
      /^([01]\d|2[0-3]):[0-5]\d$/,
      "La hora de fin debe tener el formato HH:mm"
    ),
});
