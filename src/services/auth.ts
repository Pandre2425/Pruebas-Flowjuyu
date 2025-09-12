// src/services/auth.ts

export async function apiRegisterComprador(data: {
  nombre: string
  email: string
  password: string
  confirmarPassword?: string
  telefono?: string
  direccion?: string
}) {
  try {
    const res = await fetch("http://localhost:8800/api/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: data.nombre,
        correo: data.email,
        contraseña: data.password,
        rol: "comprador",
      }),
    })

    if (!res.ok) {
      const error = await res.json()
      return { ok: false, message: error.message || "Error desconocido" }
    }

    const json = await res.json()
    return { ok: true, user: json.user }
  } catch (error) {
    return { ok: false, message: "Error de red o servidor" }
  }
}

export async function apiRegisterSeller(data: {
  nombre: string
  correo: string
  contraseña: string
  telefono?: string
  direccion?: string
  nombreComercio?: string
  telefonoComercio?: string
  departamento?: string
  municipio?: string
  descripcion?: string
  dpi?: string
  logo?: string
  fotoDPIFrente?: string
  fotoDPIReverso?: string
  selfieConDPI?: string
}) {
  try {
    const res = await fetch("http://localhost:8800/api/register/seller", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!res.ok) {
      const error = await res.json()
      return { ok: false, message: error.message || "Error al registrar vendedor" }
    }

    const json = await res.json()
    return { ok: true, user: json.user }
  } catch (error) {
    return { ok: false, message: "Error de red o servidor" }
  }
}
