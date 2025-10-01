"use client";

import {
  Box,
  Grid,
  Heading,
  Text,
  Input,
  Button,
  Card,
  CardBody,
  CardHeader,
  Stack,
  Skeleton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  List,
  ListItem,
  ListIcon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Flex,
  Select,
  Checkbox,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { LuBookOpen, LuUser, LuFileText, LuChevronLeft, LuChevronRight, LuClock } from "react-icons/lu";

type Course = {
  id: number;
  name: string;
  description: string;
  students: { name: string; status: "Preinscripto" | "Activo" }[];
  materials: string[];
  schedule: string;
  year: number;
};

export default function Cursos() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 4;
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [yearFilter, setYearFilter] = useState("Todos");
  const [selectedStudents, setSelectedStudents] = useState<number[]>([]); // índices de alumnos seleccionados

  useEffect(() => {
    setTimeout(() => {
     setCourses([
  {
    id: 1,
    name: "Inglés Básico A1",
    description: "Curso inicial para principiantes.",
    students: [
      { name: "Juan Pérez", status: "Preinscripto" },
      { name: "María Gómez", status: "Preinscripto" },
      { name: "Carlos Ruiz", status: "Activo" },
    ],
    materials: ["Guía PDF", "Audio Lección 1"],
    schedule: "Lunes y Miércoles 10:00 - 12:00",
    year: 2025,
  },
  {
    id: 2,
    name: "Inglés Intermedio B1",
    description: "Refuerzo gramatical y conversación.",
    students: [
      { name: "Lucía Fernández", status: "Preinscripto" },
      { name: "Ana Torres", status: "Activo" },
    ],
    materials: ["Workbook", "Ejercicios Online"],
    schedule: "Martes y Jueves 14:00 - 16:00",
    year: 2025,
  },
  {
    id: 3,
    name: "Inglés Avanzado C1",
    description: "Preparación para exámenes internacionales.",
    students: [
      { name: "Sofía Romero", status: "Activo" },
    ],
    materials: ["Presentaciones", "Lecturas Avanzadas"],
    schedule: "Miércoles 18:00 - 20:00",
    year: 2024,
  },
  {
    id: 4,
    name: "Francés Básico A1",
    description: "Introducción al idioma francés.",
    students: [
      { name: "Pedro Ramírez", status: "Preinscripto" },
      { name: "Laura Méndez", status: "Preinscripto" },
    ],
    materials: ["Libro digital", "Podcast Lección 1"],
    schedule: "Lunes y Miércoles 08:00 - 10:00",
    year: 2024,
  },
  {
    id: 5,
    name: "Francés Intermedio B1",
    description: "Clases enfocadas en conversación.",
    students: [
      { name: "Andrés López", status: "Activo" },
      { name: "Carolina Silva", status: "Preinscripto" },
    ],
    materials: ["Guía de gramática", "Videos de práctica"],
    schedule: "Martes y Jueves 10:00 - 12:00",
    year: 2025,
  },
  {
    id: 6,
    name: "Alemán Básico A1",
    description: "Curso de iniciación al alemán.",
    students: [
      { name: "Diego Fernández", status: "Preinscripto" },
      { name: "Martina López", status: "Preinscripto" },
    ],
    materials: ["Libro PDF", "Audio Lección 1"],
    schedule: "Miércoles y Viernes 09:00 - 11:00",
    year: 2023,
  },
  {
    id: 7,
    name: "Alemán Intermedio B1",
    description: "Clases de conversación y gramática.",
    students: [
      { name: "Tomás Gómez", status: "Activo" },
    ],
    materials: ["Workbook", "Ejercicios Online"],
    schedule: "Martes y Jueves 14:00 - 16:00",
    year: 2024,
  },
  {
    id: 8,
    name: "Italiano Básico A1",
    description: "Curso inicial de italiano.",
    students: [
      { name: "Valentina Rojas", status: "Preinscripto" },
      { name: "Federico Díaz", status: "Preinscripto" },
    ],
    materials: ["Libro digital", "Podcast Lección 1"],
    schedule: "Lunes y Miércoles 15:00 - 17:00",
    year: 2023,
  },
  {
    id: 9,
    name: "Italiano Avanzado C1",
    description: "Preparación para certificaciones internacionales.",
    students: [
      { name: "Camila Torres", status: "Activo" },
    ],
    materials: ["Presentaciones", "Lecturas Avanzadas"],
    schedule: "Viernes 18:00 - 20:00",
    year: 2025,
  },
  {
    id: 10,
    name: "Portugués Básico A1",
    description: "Curso de iniciación al portugués.",
    students: [
      { name: "Lucas Martínez", status: "Preinscripto" },
      { name: "Sofía López", status: "Preinscripto" },
    ],
    materials: ["Libro PDF", "Audio Lección 1"],
    schedule: "Martes y Jueves 11:00 - 13:00",
    year: 2024,
  },
]);

      setLoading(false);
    }, 1000);
  }, []);

  const filtered = courses.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) &&
      (yearFilter === "Todos" || c.year.toString() === yearFilter)
  );

  const totalPages = Math.ceil(filtered.length / pageSize);
  const pagedCourses = filtered.slice((page - 1) * pageSize, page * pageSize);

  const openDetail = (course: Course) => {
    setSelectedCourse(null);
    setIsOpen(true);
    setLoadingDetail(true);
    setSelectedStudents([]);
    setTimeout(() => {
      setSelectedCourse(course);
      setLoadingDetail(false);
    }, 700);
  };

  const toggleSelectAllStudents = () => {
    if (!selectedCourse) return;
    if (selectedStudents.length === selectedCourse.students.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(selectedCourse.students.map((_, idx) => idx));
    }
  };

  const toggleSelectStudent = (idx: number) => {
    setSelectedStudents((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const markStudentsActive = () => {
    if (!selectedCourse) return;
    const updatedStudents = selectedCourse.students.map((s, idx) =>
      selectedStudents.includes(idx) ? { ...s, status: "Activo" } : s
    );
    const updatedCourse = { ...selectedCourse, students: updatedStudents };
    setSelectedCourse(updatedCourse);
    setCourses((prev) => prev.map((c) => (c.id === updatedCourse.id ? updatedCourse : c)));
    setSelectedStudents([]);
  };

  const years = Array.from(new Set(courses.map((c) => c.year))).sort((a, b) => b - a);

  return (
    <Box p={6}>
      <Flex justify="space-between" align="center" mb={6} wrap="wrap" gap={4}>
        <Heading size="xl">Cursos</Heading>
        <Button colorScheme="blue">+ Crear Curso</Button>
      </Flex>

      <Flex mb={6} gap={4} wrap="wrap">
        <Input
          placeholder="Buscar curso..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          flex="1"
        />
        <Select
          value={yearFilter}
          onChange={(e) => {
            setYearFilter(e.target.value);
            setPage(1);
          }}
          w={{ base: "100%", md: "200px" }}
        >
          <option value="Todos">Todos los años</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </Select>
      </Flex>

      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton height="20px" mb="2" />
                </CardHeader>
                <CardBody>
                  <Skeleton height="16px" mb="2" />
                  <Skeleton height="16px" />
                </CardBody>
              </Card>
            ))
          : pagedCourses.map((course) => (
              <Card
                key={course.id}
                bg={useColorModeValue("white", "gray.700")}
                boxShadow="lg"
                borderRadius="xl"
                _hover={{ shadow: "xl", transform: "scale(1.02)" }}
                transition="all 0.2s"
              >
                <CardHeader>
                  <Heading size="md" display="flex" alignItems="center" gap={2}>
                    <LuBookOpen /> {course.name}
                  </Heading>
                  <Text fontSize="sm" color="gray.500">
                    Año: {course.year}
                  </Text>
                </CardHeader>
                <CardBody>
                  <Text mb={4}>{course.description}</Text>
                  <Button size="sm" colorScheme="blue" onClick={() => openDetail(course)}>
                    Ver Detalle
                  </Button>
                </CardBody>
              </Card>
            ))}
      </Grid>

      <Flex justify="center" align="center" mt={6} gap={2}>
        <IconButton
          aria-label="Anterior"
          icon={<LuChevronLeft />}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          isDisabled={page === 1}
        />
        <Text>
          Página {page} de {totalPages}
        </Text>
        <IconButton
          aria-label="Siguiente"
          icon={<LuChevronRight />}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          isDisabled={page === totalPages}
        />
      </Flex>

      {/* Modal Detalle Curso */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {selectedCourse?.name || "Cargando..."}{" "}
            {selectedCourse && (
              <Text as="span" fontSize="sm" color="gray.500">
                (Año {selectedCourse.year})
              </Text>
            )}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <Card bg={useColorModeValue("gray.100", "gray.600")}>
                <CardHeader>
                  <Heading size="sm" display="flex" alignItems="center" gap={2}>
                    <LuClock /> Horario
                  </Heading>
                </CardHeader>
                <CardBody>
                  {loadingDetail ? <Skeleton height="20px" /> : <Text>{selectedCourse?.schedule}</Text>}
                </CardBody>
              </Card>

              <Tabs colorScheme="blue">
                <TabList>
                  <Tab>
                    <LuUser style={{ marginRight: 6 }} /> Alumnos
                  </Tab>
                  <Tab>
                    <LuFileText style={{ marginRight: 6 }} /> Materiales
                  </Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    {loadingDetail ? (
                      <Stack>
                        {Array.from({ length: 3 }).map((_, i) => (
                          <Skeleton key={i} height="20px" />
                        ))}
                      </Stack>
                    ) : selectedCourse?.students.length ? (
                      <Stack spacing={2}>
                        {selectedStudents.length > 0 && (
                          <Button size="sm" colorScheme="green" onClick={markStudentsActive}>
                            Marcar seleccionados como Activo
                          </Button>
                        )}
                        <Table variant="striped" size="sm">
                          <Thead>
                            <Tr>
                              <Th>
                                <Checkbox
                                  isChecked={
                                    selectedCourse &&
                                    selectedStudents.length === selectedCourse.students.length &&
                                    selectedCourse.students.length > 0
                                  }
                                  onChange={toggleSelectAllStudents}
                                />
                              </Th>
                              <Th>#</Th>
                              <Th>Nombre</Th>
                              <Th>Estado</Th>
                              <Th>Acción</Th>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {selectedCourse.students.map((s, idx) => (
                              <Tr key={idx}>
                                <Td>
                                  <Checkbox
                                    isChecked={selectedStudents.includes(idx)}
                                    onChange={() => toggleSelectStudent(idx)}
                                  />
                                </Td>
                                <Td>{idx + 1}</Td>
                                <Td>{s.name}</Td>
                                <Td>{s.status}</Td>
                                <Td>
                                  <Button
                                    size="xs"
                                    colorScheme="teal"
                                    onClick={() => alert(`Ir a la cartilla de ${s.name}`)}
                                  >
                                    Ver Alumno
                                  </Button>
                                </Td>
                              </Tr>
                            ))}
                          </Tbody>
                        </Table>
                      </Stack>
                    ) : (
                      <Text>No hay alumnos matriculados</Text>
                    )}
                  </TabPanel>

                  <TabPanel>
                    {loadingDetail ? (
                      <Stack>
                        {Array.from({ length: 3 }).map((_, i) => (
                          <Skeleton key={i} height="16px" />
                        ))}
                      </Stack>
                    ) : selectedCourse?.materials.length ? (
                      <List spacing={2}>
                        {selectedCourse.materials.map((m, idx) => (
                          <ListItem key={idx}>
                            <ListIcon as={LuFileText} color="green.500" />
                            {m}
                          </ListItem>
                        ))}
                      </List>
                    ) : (
                      <Text>No hay materiales subidos</Text>
                    )}
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
