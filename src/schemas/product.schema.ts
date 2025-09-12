import { z } from "zod";

export const productSchema = z.object({
  titulo: z.string().min(3),
  descripcion: z.string().min(10),
  precio: z.number().positive(),
  stock: z.number().int().nonnegative(),
  categoria_principal: z.string().nonempty(),
  subcategorias: z.array(z.string()).min(1),
  tipo_tela: z.string().optional(),
  origen_producto: z.string().optional(),
});
export type ProductSchema = z.infer<typeof productSchema>;
