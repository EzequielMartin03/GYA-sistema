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
  Box,
  Text,
  Skeleton,
  SkeletonText
} from "@chakra-ui/react"
import { LuChevronLeft, LuChevronRight, LuTrash, LuInfo, LuPencil } from "react-icons/lu"

type Professor = {
  id: number
  name: string
  subject: string
  email: string
  courses?: Course[]
}

type Course = {
  id: number
  name: string
  year: number
  status: "Activo" | "Finalizado"
}

export default function Alumnos() {
  const initialProfessors: Professor[] = [
    { 
      id: 1, 
      name: "Juan Pérez", 
      subject: "Matemáticas", 
      email: "juan@mail.com",
      courses: Array.from({ length: 15 }, (_, i) => ({
        id: i + 1,
        name: `Curso ${i + 1}`,
        year: 2023 + Math.floor(i / 5),
        status: i % 2 === 0 ? "Activo" : "Finalizado"
      }))
    },
    { id: 2, name: "María Gómez", subject: "Historia", email: "maria@mail.com", courses: [] },
    { id: 3, name: "Carlos Ruiz", subject: "Física", email: "carlos@mail.com", courses: [] },
    { id: 4, name: "Lucía Fernández", subject: "Química", email: "lucia@mail.com", courses: [] },
  ]

  const [professors, setProfessors] = useState<Professor[]>(initialProfessors)
  const [page, setPage] = useState(1)
  const pageSize = 2
  const [searchTerm, setSearchTerm] = useState("") // Buscador alumnos
  const [loading, setLoading] = useState(true) // Skeleton

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  // Filtrado alumnos
  const filteredProfessors = professors.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLower())
  )

  const totalPages = Math.ceil(filteredProfessors.length / pageSize)
  const pagedProfessors = filteredProfessors.slice((page - 1) * pageSize, page * pageSize)

  // Modal agregar/editar
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [editingProfessor, setEditingProfessor] = useState<Professor | null>(null)
  const [form, setForm] = useState({ name: "", subject: "", email: "" })

  // Modal detalle
  const { isOpen: isDetailOpen, onOpen: onDetailOpen, onClose: onDetailClose } = useDisclosure()
  const [detailProfessor, setDetailProfessor] = useState<Professor | null>(null)
  const [coursePage, setCoursePage] = useState(1)
  const coursePageSize = 5
  const [courseSearch, setCourseSearch] = useState("")

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

  const openDetailModal = (prof: Professor) => {
    setDetailProfessor(prof)
    setCoursePage(1)
    setCourseSearch("")
    onDetailOpen()
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
        courses: []
      }
      setProfessors((prev) => [...prev, newProf])
    }
    onClose()
  }

  const handleDelete = (id: number) => {
    setProfessors((prev) => prev.filter((p) => p.id !== id))
  }

  // Filtrado cursos
  const filteredCourses = detailProfessor?.courses?.filter((c) =>
    c.name.toLowerCase().includes(courseSearch.toLowerCase())
  ) || []

  const courseTotalPages = Math.ceil(filteredCourses.length / coursePageSize)
  const pagedCourses = filteredCourses.slice(
    (coursePage - 1) * coursePageSize,
    coursePage * coursePageSize
  )

  return (
    <Grid templateColumns={{ base: "1fr", md: "1fr" }} p="4" gap="4">
      <GridItem>
        <Stack gap="4">
          <Flex justify="space-between" align="center">
            <Heading size="xl">Alumnos</Heading>
            <Button size="sm" colorScheme="blue" onClick={openAddModal}>
              Agregar
            </Button>
          </Flex>

          {/* Buscador alumnos */}
          <Input
            placeholder="Buscar alumno..."
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
                            aria-label="Detalle"
                            icon={<LuInfo />}
                            onClick={() => openDetailModal(prof)}
                          />
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
                  ))
              }
            </Tbody>
          </Table>

          {/* Paginación principal */}
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
        </Stack>
      </GridItem>

      {/* Modal agregar/editar */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editingProfessor ? "Editar Alumno" : "Agregar Alumno"}</ModalHeader>
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

      {/* Modal detalle alumno */}
      <Modal isOpen={isDetailOpen} onClose={onDetailClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Detalle de Alumno</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {loading || !detailProfessor ? (
              <Stack gap="4">
                <Box p="4" borderWidth="1px" borderRadius="md" bg="gray.50">
                  <SkeletonText mt="2" noOfLines={3} spacing="4" />
                </Box>
                <Skeleton height="40px" />
                <Table size="sm" variant="simple">
                  <Thead>
                    <Tr>
                      <Th><Skeleton /></Th>
                      <Th><Skeleton /></Th>
                      <Th><Skeleton /></Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {Array.from({ length: coursePageSize }).map((_, i) => (
                      <Tr key={i}>
                        <Td><Skeleton height="20px" /></Td>
                        <Td><Skeleton height="20px" /></Td>
                        <Td><Skeleton height="20px" /></Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Stack>
            ) : (
              <Stack gap="4">
                {/* Credencial */}
                <Box p="4" borderWidth="1px" borderRadius="md" bg="gray.50">
                  <Heading size="md">{detailProfessor.name}</Heading>
                  <Text><b>Email:</b> {detailProfessor.email}</Text>
                </Box>

                {/* Buscador cursos */}
                <Input
                  placeholder="Buscar curso..."
                  value={courseSearch}
                  onChange={(e) => setCourseSearch(e.target.value)}
                />

                {/* Tabla cursos */}
                <Table size="sm" variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Curso</Th>
                      <Th>Año</Th>
                      <Th>Estado</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {pagedCourses.length > 0 ? (
                      pagedCourses.map((c) => (
                        <Tr key={c.id}>
                          <Td>{c.name}</Td>
                          <Td>{c.year}</Td>
                          <Td>{c.status}</Td>
                        </Tr>
                      ))
                    ) : (
                      <Tr>
                        <Td colSpan={3} textAlign="center">No hay cursos registrados</Td>
                      </Tr>
                    )}
                  </Tbody>
                </Table>

                {/* Paginación cursos */}
                {courseTotalPages > 1 && (
                  <ButtonGroup>
                    <IconButton
                      aria-label="Anterior"
                      icon={<LuChevronLeft />}
                      onClick={() => setCoursePage(Math.max(coursePage - 1, 1))}
                    />
                    {Array.from({ length: courseTotalPages }, (_, i) => (
                      <Button
                        key={i}
                        variant={coursePage === i + 1 ? "solid" : "outline"}
                        onClick={() => setCoursePage(i + 1)}
                      >
                        {i + 1}
                      </Button>
                    ))}
                    <IconButton
                      aria-label="Siguiente"
                      icon={<LuChevronRight />}
                      onClick={() => setCoursePage(Math.min(coursePage + 1, courseTotalPages))}
                    />
                  </ButtonGroup>
                )}
              </Stack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onDetailClose}>Cerrar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Grid>
  )
}
