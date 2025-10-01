"use client"

import React, { useState, useEffect } from "react"
import {
  Grid,
  GridItem,
  Stack,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  ButtonGroup,
  IconButton,
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
  Skeleton,
} from "@chakra-ui/react"
import { LuChevronLeft, LuChevronRight, LuTrash, LuPencil  } from "react-icons/lu"

type Professor = {
  id: number
  name: string
  subject: string
  email: string
}

export default function Profesores() {
  const initialProfessors: Professor[] = [
    { id: 1, name: "Juan Pérez", subject: "Matemáticas", email: "juan@mail.com" },
    { id: 2, name: "María Gómez", subject: "Historia", email: "maria@mail.com" },
    { id: 3, name: "Carlos Ruiz", subject: "Física", email: "carlos@mail.com" },
    { id: 4, name: "Lucía Fernández", subject: "Química", email: "lucia@mail.com" },
  ]

  const [professors, setProfessors] = useState<Professor[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const pageSize = 2
  const [searchTerm, setSearchTerm] = useState("") // Buscador

  // Simula carga de datos
  useEffect(() => {
    const timer = setTimeout(() => {
      setProfessors(initialProfessors)
      setLoading(false)
    }, 1000) // 1 segundo de "carga"
    return () => clearTimeout(timer)
  }, [])

  // Filtrado
  const filteredProfessors = professors.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredProfessors.length / pageSize)
  const pagedProfessors = filteredProfessors.slice((page - 1) * pageSize, page * pageSize)

  // Modal states
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [editingProfessor, setEditingProfessor] = useState<Professor | null>(null)
  const [form, setForm] = useState({ name: "", subject: "", email: "" })

  const openAddModal = () => {
    setEditingProfessor(null)
    setForm({ name: "", subject: "", email: "" })
    onOpen()
  }

  const openEditModal = (prof: Professor) => {
    setEditingProfessor(prof)
    setForm({ name: prof.name, subject: prof.subject, email: prof.email })
    onOpen()
  }

  const handleSave = () => {
    if (editingProfessor) {
      setProfessors((prev) =>
        prev.map((p) =>
          p.id === editingProfessor.id ? { ...p, ...form } : p
        )
      )
    } else {
      const newProf: Professor = {
        id: Math.max(...professors.map((p) => p.id)) + 1,
        ...form,
      }
      setProfessors((prev) => [...prev, newProf])
    }
    onClose()
  }

  const handleDelete = (id: number) => {
    setProfessors((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <Grid templateColumns={{ base: "1fr", md: "1fr" }} p="4" gap="4">
      <GridItem>
        <Stack gap="4">
          
          <Flex justify="space-between" align="center">
            <Heading size="xl">Profesores</Heading>
            <Button size="sm" colorScheme="blue" onClick={openAddModal}>
              Agregar
            </Button>
          </Flex>

          {/* Buscador */}
          <Input
            placeholder="Buscar profesor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Table size="sm" variant="striped" colorScheme="gray">
            <Thead>
              <Tr>
                <Th>Nombre</Th>
                <Th>Email</Th>
                <Th>Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {loading
                ? Array.from({ length: pageSize }).map((_, i) => (
                    <Tr key={i}>
                      <Td><Skeleton height="20px" /></Td>
                      <Td><Skeleton height="20px" /></Td>
                      <Td><Skeleton height="20px" /></Td>
                    </Tr>
                  ))
                : pagedProfessors.map((prof) => (
                    <Tr key={prof.id}>
                      <Td>{prof.name}</Td>
                      <Td>{prof.email}</Td>
                      <Td>
                        <ButtonGroup size="sm" isAttached>
                          <IconButton
                            aria-label="Editar"
                            icon={<LuPencil />}
                            onClick={() => openEditModal(prof)}
                          />
                          <IconButton
                            aria-label="Eliminar"
                            icon={<LuTrash />}
                            colorScheme="red"
                            onClick={() => handleDelete(prof.id)}
                          />
                        </ButtonGroup>
                      </Td>
                    </Tr>
                  ))}
            </Tbody>
          </Table>

          {/* Paginación */}
          {!loading && (
            <ButtonGroup>
              <IconButton
                aria-label="Anterior"
                icon={<LuChevronLeft />}
                onClick={() => setPage(Math.max(page - 1, 1))}
              />
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i}
                  variant={page === i + 1 ? "solid" : "outline"}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
              <IconButton
                aria-label="Siguiente"
                icon={<LuChevronRight />}
                onClick={() => setPage(Math.min(page + 1, totalPages))}
              />
            </ButtonGroup>
          )}
        </Stack>
      </GridItem>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editingProfessor ? "Editar Profesor" : "Agregar Profesor"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack gap="3">
              <Input
                placeholder="Nombre"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              />
             
              <Input
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              />
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} mr="2">Cancelar</Button>
            <Button colorScheme="blue" onClick={handleSave}>
              {editingProfessor ? "Guardar cambios" : "Agregar"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Grid>
  )
}
