"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, ProductSchema } from "@/schemas/product.schema";
import {
  Input,
  Textarea,
  Button,
  Label,
  Select,
  Checkbox,
} from "@/components/ui"; // Asegúrate que estos alias estén bien
import useFileUpload from "@/hooks/useFileUpload";
import { useRouter } from "next/navigation";

const CATEGORIAS = ["Ropa", "Accesorios", "Textiles", "Calzado"];
const SUBCATS = ["Económica", "Media", "Alta"];

export default function NuevoProductoPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      subcategorias: [],
    },
  });

  const fileUpload = useFileUpload();

  const onSubmit = async (data: ProductSchema) => {
    const form = new FormData();
    form.append("titulo", data.titulo);
    form.append("descripcion", data.descripcion);
    form.append("precio", data.precio.toString());
    form.append("stock", data.stock.toString());
    form.append("categoria_principal", data.categoria_principal);
    data.subcategorias.forEach((sc) => form.append("subcategorias", sc));
    if (data.tipo_tela) form.append("tipo_tela", data.tipo_tela);
    if (data.origen_producto) form.append("origen_producto", data.origen_producto);
    if (fileUpload.file) form.append("imagen", fileUpload.file);

    const res = await fetch("/api/productos", {
      method: "POST",
      body: form,
    });

    if (res.ok) {
      router.push("/seller/productos");
    } else {
      alert("Error al crear el producto");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Crear nuevo producto</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Título */}
        <div>
          <Label htmlFor="titulo">Título</Label>
          <Input id="titulo" {...register("titulo")} />
          <p className="text-red-600">{errors.titulo?.message}</p>
        </div>

        {/* Descripción */}
        <div>
          <Label htmlFor="descripcion">Descripción</Label>
          <Textarea id="descripcion" {...register("descripcion")} />
          <p className="text-red-600">{errors.descripcion?.message}</p>
        </div>

        {/* Precio y Stock */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="precio">Precio (Q)</Label>
            <Input
              id="precio"
              type="number"
              step="0.01"
              {...register("precio", { valueAsNumber: true })}
            />
            <p className="text-red-600">{errors.precio?.message}</p>
          </div>
          <div>
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              type="number"
              {...register("stock", { valueAsNumber: true })}
            />
            <p className="text-red-600">{errors.stock?.message}</p>
          </div>
        </div>

        {/* Categoría principal */}
        <div>
          <Label htmlFor="categoria_principal">Categoría Principal</Label>
          <Select id="categoria_principal" {...register("categoria_principal")}>
            <option value="">Selecciona...</option>
            {CATEGORIAS.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Select>
          <p className="text-red-600">{errors.categoria_principal?.message}</p>
        </div>

        {/* Subcategorías */}
        <div>
          <Label>Subcategorías</Label>
          <Controller
            control={control}
            name="subcategorias"
            render={({ field }) => (
              <div className="flex flex-wrap gap-2">
                {SUBCATS.map((sc) => (
                  <label key={sc} className="flex items-center space-x-2">
                    <Checkbox
                      value={sc}
                      checked={field.value.includes(sc)}
                      onCheckedChange={(checked) => {
                        const newVals = checked
                          ? [...field.value, sc]
                          : field.value.filter((v) => v !== sc);
                        field.onChange(newVals);
                      }}
                    />
                    <span>{sc}</span>
                  </label>
                ))}
              </div>
            )}
          />
          <p className="text-red-600">{errors.subcategorias?.message}</p>
        </div>

        {/* Tipo de tela - CAMPO LIBRE */}
        <div>
          <Label htmlFor="tipo_tela">Tipo de tela</Label>
          <Input
            id="tipo_tela"
            placeholder="Ej: mish, impreso, algodón natural..."
            {...register("tipo_tela")}
          />
          <p className="text-red-600">{errors.tipo_tela?.message}</p>
        </div>

        {/* Origen del producto */}
        <div>
          <Label htmlFor="origen_producto">Origen del producto</Label>
          <Input id="origen_producto" {...register("origen_producto")} />
          <p className="text-red-600">{errors.origen_producto?.message}</p>
        </div>

        {/* Imagen destacada */}
        <div>
          <Label>Imagen</Label>
          <div className="mt-2">
            {fileUpload.preview && (
              <img
                src={fileUpload.preview}
                alt="preview"
                className="max-h-40 object-contain mb-2"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={fileUpload.onChange}
            />
            {fileUpload.file && (
              <Button
                type="button"
                variant="destructive"
                onClick={fileUpload.clear}
                className="mt-2"
              >
                Borrar imagen
              </Button>
            )}
          </div>
        </div>

        {/* Botón submit */}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Guardando..." : "Guardar producto"}
        </Button>
      </form>
    </div>
  );
}
