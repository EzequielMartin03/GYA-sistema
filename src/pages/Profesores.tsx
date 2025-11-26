"use client";

import { useState, useEffect } from "react";
import {
  Button,
  Flex,
  Stack,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Skeleton,
} from "@chakra-ui/react";

const API_URL = "http://127.0.0.1:3000/api/v1/profesores";

export default function Profesores() {
  const [professors, setProfessors] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    telefono: "",
    email: "",
  });
  const [editingProfessor, setEditingProfessor] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // 🟢 Cargar lista inicial
  useEffect(() => {
    fetchProfessors();
  }, []);

  const fetchProfessors = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Error al obtener profesores");

      const data = await res.json();

      if (Array.isArray(data)) setProfessors(data);
      else if (Array.isArray(data.profesors)) setProfessors(data.profesors);
      else if (Array.isArray(data.data)) setProfessors(data.data);
      else {
        console.warn("Formato inesperado:", data);
        setProfessors([]);
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "No se pudo cargar la lista de profesores",
        status: "error",
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (profesor?: any) => {
    setErrors({});
    if (profesor) {
      setEditingProfessor(profesor);
      setForm({
        nombre: profesor.nombre ?? "",
        apellido: profesor.apellido ?? "",
        dni: profesor.dni ?? "",
        telefono: profesor.telefono ?? "",
        email: profesor.email ?? "",
      });
    } else {
      setEditingProfessor(null);
      setForm({ nombre: "", apellido: "", dni: "", telefono: "", email: "" });
    }
    onOpen();
  };

  const validateForm = () => {
    const newErrors: any = {};
    if (!form.nombre.trim()) newErrors.nombre = "Nombre obligatorio";
    if (!form.apellido.trim()) newErrors.apellido = "Apellido obligatorio";
    if (!form.dni.trim()) newErrors.dni = "DNI obligatorio";
    if (!form.telefono.trim()) newErrors.telefono = "Teléfono obligatorio";
    if (!form.email.trim()) newErrors.email = "Email obligatorio";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Email inválido";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Error al eliminar");

      setProfessors((prev) => prev.filter((p) => p.id_profesor !== id));
      toast({ title: "Profesor eliminado", status: "success", duration: 2000 });
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "No se pudo eliminar el profesor",
        status: "error",
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      const headers: HeadersInit = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      if (editingProfessor) {
        // 🔄 UPDATE
        const res = await fetch(`${API_URL}/${editingProfessor.id_profesor}`, {
          method: "PUT",
          headers,
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("Error al actualizar profesor");

        const updatedData = await res.json();
        const updated = updatedData.profesor || updatedData;

        setProfessors((prev) =>
          prev.map((p) =>
            p.id_profesor === updated.id_profesor ? { ...p, ...updated } : p
          )
        );

        toast({
          title: "Profesor actualizado",
          status: "success",
          duration: 2000,
        });
      } else {
        // ➕ CREATE
        const res = await fetch(API_URL, {
          method: "POST",
          headers,
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("Error al agregar profesor");

        const createdData = await res.json();
        const created = createdData.profesor || createdData;

        setProfessors((prev) => [...prev, created]);

        toast({
          title: "Profesor agregado",
          status: "success",
          duration: 2000,
        });
      }

      onClose();
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "No se pudo guardar el profesor",
        status: "error",
        duration: 2000,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Stack p={8}>
      <Flex justify="space-between" align="center">
        <Heading size="lg">Profesores</Heading>
        <Button
          colorScheme="blue"
          onClick={() => handleOpenModal()}
          isLoading={saving}
        >
          Nuevo Profesor
        </Button>
      </Flex>

      <Table variant="simple" mt={6}>
        <Thead>
          <Tr>
            <Th>Nombre</Th>
            <Th>Apellido</Th>
            <Th>DNI</Th>
            <Th>Teléfono</Th>
            <Th>Email</Th>
            <Th>Acciones</Th>
          </Tr>
        </Thead>
        <Tbody>
          {loading
            ? Array(5)
                .fill(0)
                .map((_, i) => (
                  <Tr key={i}>
                    <Td>
                      <Skeleton height="20px" />
                    </Td>
                    <Td>
                      <Skeleton height="20px" />
                    </Td>
                    <Td>
                      <Skeleton height="20px" />
                    </Td>
                    <Td>
                      <Skeleton height="20px" />
                    </Td>
                    <Td>
                      <Skeleton height="20px" />
                    </Td>
                    <Td>
                      <Skeleton height="20px" />
                    </Td>
                  </Tr>
                ))
            : professors.map((p) => (
                <Tr key={p.id_profesor}>
                  <Td>{p.nombre}</Td>
                  <Td>{p.apellido}</Td>
                  <Td>{p.dni}</Td>
                  <Td>{p.telefono}</Td>
                  <Td>{p.email}</Td>
                  <Td>
                    <Button
                      size="sm"
                      colorScheme="yellow"
                      mr={2}
                      onClick={() => handleOpenModal(p)}
                    >
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="red"
                      onClick={() => handleDelete(p.id_profesor)}
                      isLoading={loading}
                    >
                      Eliminar
                    </Button>
                  </Td>
                </Tr>
              ))}
        </Tbody>
      </Table>

      {/* MODAL */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {editingProfessor ? "Editar Profesor" : "Nuevo Profesor"}
          </ModalHeader>
          <ModalBody>
            <FormControl mb={3} isInvalid={!!errors.nombre}>
              <FormLabel>Nombre</FormLabel>
              <Input
                value={form.nombre ?? ""}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              />
              <FormErrorMessage>{errors.nombre}</FormErrorMessage>
            </FormControl>

            <FormControl mb={3} isInvalid={!!errors.apellido}>
              <FormLabel>Apellido</FormLabel>
              <Input
                value={form.apellido ?? ""}
                onChange={(e) => setForm({ ...form, apellido: e.target.value })}
              />
              <FormErrorMessage>{errors.apellido}</FormErrorMessage>
            </FormControl>

            <FormControl mb={3} isInvalid={!!errors.dni}>
              <FormLabel>DNI</FormLabel>
              <Input
                value={form.dni ?? ""}
                onChange={(e) => setForm({ ...form, dni: e.target.value })}
              />
              <FormErrorMessage>{errors.dni}</FormErrorMessage>
            </FormControl>

            <FormControl mb={3} isInvalid={!!errors.telefono}>
              <FormLabel>Teléfono</FormLabel>
              <Input
                value={form.telefono ?? ""}
                onChange={(e) => setForm({ ...form, telefono: e.target.value })}
              />
              <FormErrorMessage>{errors.telefono}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                value={form.email ?? ""}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme="blue" onClick={handleSave} isLoading={saving}>
              Guardar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
}
