'use client'

import React, { useState, useEffect } from "react"
import {
  Grid,
  GridItem,
  Stack,
  Heading,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Input,
  useDisclosure,
  Flex,
  Box,
  Text,
  SkeletonText,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react"
import { LuTrash, LuInfo, LuPencil } from "react-icons/lu"
import { SearchableTable } from "../components/DataTable"

type Alumno = {
  id_alumno: number
  nombre: string
  apellido: string
  dni: string
}

export default function Alumnos() {
  const [alumnos, setAlumnos] = useState<Alumno[]>([])
  const [page, setPage] = useState(1)
  const pageSize = 5
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const toast = useToast()

  // Modal agregar/editar
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [editingAlumno, setEditingAlumno] = useState<Alumno | null>(null)
  const [form, setForm] = useState({ nombre: "", apellido: "", dni: "" })

  const API_URL = "http://localhost:3000/api/v1/alumnos"

  // 🚀 Traer alumnos desde backend
  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        setLoading(true)
        const token = localStorage.getItem("token")

        const res = await fetch(API_URL, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        })

        if (!res.ok) throw new Error("Error al cargar alumnos")

        const data = await res.json()
        setAlumnos(data.alumnos || [])
      } catch (err) {
        console.error(err)
        toast({
          title: "Error",
          description: "No se pudieron cargar los alumnos",
          status: "error",
          duration: 3000,
        })
      } finally {
        setLoading(false)
      }
    }

    fetchAlumnos()
  }, [toast])

  // 🔍 Filtrado de alumnos
  const filtered = alumnos.filter(
    (a) =>
      a.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.dni.includes(searchTerm)
  )

  const totalPages = Math.ceil(filtered.length / pageSize)
  const paged = filtered.slice((page - 1) * pageSize, page * pageSize)

  // Abrir modal para agregar
  const openAddModal = () => {
    setEditingAlumno(null)
    setForm({ nombre: "", apellido: "", dni: "" })
    onOpen()
  }

  // Abrir modal para editar
  const openEditModal = (alumno: Alumno) => {
    setEditingAlumno(alumno)
    setForm({
      nombre: alumno.nombre,
      apellido: alumno.apellido,
      dni: alumno.dni,
    })
    onOpen()
  }

  // Guardar alumno (POST / PUT)
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token")
      const method = editingAlumno ? "PUT" : "POST"
      const url = editingAlumno
        ? `${API_URL}/${editingAlumno.id_alumno}`
        : API_URL

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error("Error al guardar alumno")

      const data = await res.json()

      if (editingAlumno) {
        // actualización
        setAlumnos((prev) =>
          prev.map((a) => (a.id_alumno === data.id_alumno ? data : a))
        )
        toast({ title: "Alumno actualizado", status: "success", duration: 2000 })
      } else {
        // creación
        setAlumnos((prev) => [...prev, data])
        toast({ title: "Alumno agregado", status: "success", duration: 2000 })
      }
      onClose()
    } catch (err) {
      console.error(err)
      toast({
        title: "Error",
        description: "No se pudo guardar el alumno",
        status: "error",
        duration: 2000,
      })
    }
  }

  // Eliminar alumno
  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      })
      if (!res.ok) throw new Error("Error al eliminar alumno")

      setAlumnos((prev) => prev.filter((a) => a.id_alumno !== id))
      toast({ title: "Alumno eliminado", status: "success", duration: 2000 })
    } catch (err) {
      console.error(err)
      toast({
        title: "Error",
        description: "No se pudo eliminar el alumno",
        status: "error",
        duration: 2000,
      })
    }
  }

  return (
    <Grid templateColumns={{ base: "1fr" }} p="4" gap="4">
      <GridItem>
        <Stack gap="4">
          <Flex justify="space-between" align="center">
            <Heading size="xl">Alumnos</Heading>
            <Button size="sm" colorScheme="blue" onClick={openAddModal}>
              Agregar
            </Button>
          </Flex>

          <SearchableTable
            data={paged}
            columns={[
              { key: "nombre", header: "Nombre" },
              { key: "apellido", header: "Apellido" },
              { key: "dni", header: "DNI" },
            ]}
            loading={loading}
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            totalPages={totalPages}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            actions={[
              { ariaLabel: "Editar", icon: <LuPencil />, onClick: openEditModal },
              { ariaLabel: "Eliminar", icon: <LuTrash />, colorScheme: "red", onClick: handleDelete },
            ]}
          />
        </Stack>
      </GridItem>

      {/* Modal agregar/editar */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editingAlumno ? "Editar Alumno" : "Agregar Alumno"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack gap="3">
              <Input
                placeholder="Nombre"
                value={form.nombre}
                onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
              />
              <Input
                placeholder="Apellido"
                value={form.apellido}
                onChange={(e) => setForm((f) => ({ ...f, apellido: e.target.value }))}
              />
              <Input
                placeholder="DNI"
                value={form.dni}
                onChange={(e) => setForm((f) => ({ ...f, dni: e.target.value }))}
              />
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} mr="2">
              Cancelar
            </Button>
            <Button colorScheme="blue" onClick={handleSave}>
              {editingAlumno ? "Guardar cambios" : "Agregar"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Grid>
  )
}
