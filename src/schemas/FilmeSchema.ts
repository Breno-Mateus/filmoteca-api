import { z } from 'zod';

export const filmeSchema = z.object({
    titulo: z.string().min(1),
    diretor: z.string().min(1),
    nota: z.number().min(0).max(10),
});