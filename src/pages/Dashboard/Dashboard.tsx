import {
  Box,
  SimpleGrid,
  Heading,
  Text,
  Skeleton,
  SkeletonText,
  Card,
  CardHeader,
  CardBody,
  Divider,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

function StatCard({
  title,
  value,
  loading,
}: {
  title: string;
  value: string;
  loading?: boolean;
}) {
  return (
    <Card
      borderRadius="2xl"
      boxShadow="lg"
      _hover={{ shadow: "xl", transform: "scale(1.02)" }}
      transition="all 0.2s"
      bg="gray.200"   // 👈 Fondo gris
    >
      <CardBody>
        <Text fontSize="sm" fontWeight="medium" color="gray.600">
          {title}
        </Text>
        {loading ? (
          <Skeleton height="28px" mt={2} />
        ) : (
          <Heading size="lg" mt={1}>
            {value}
          </Heading>
        )}
      </CardBody>
    </Card>
  );
}

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    alumnos: "0",
    cursos: "0",
    profesores: "0",
    clases: [] as string[],
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        alumnos: "120",
        cursos: "15",
        profesores: "8",
        clases: [
          "Inglés Básico A1 – Lunes 10:00",
          "Inglés Intermedio B1 – Martes 14:00",
          "Inglés Avanzado C1 – Miércoles 18:00",
        ],
      });
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box p={8} bg="gray.50" minH="100vh">
      {/* Título */}
      <Heading size="xl" mb={8}>
        Dashboard
      </Heading>

      {/* Tarjetas de métricas */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
        <StatCard
          title="Alumnos Activos"
          value={stats.alumnos}
          loading={loading}
        />
        <StatCard
          title="Cursos Activos"
          value={stats.cursos}
          loading={loading}
        />
        <StatCard
          title="Profesores"
          value={stats.profesores}
          loading={loading}
        />
      </SimpleGrid>

      
    </Box>
  );
}
