"use client"

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Skeleton,
  Input,
  ButtonGroup,
  Button,
  IconButton,
  Stack,
} from "@chakra-ui/react"
import { LuChevronLeft, LuChevronRight } from "react-icons/lu"

type Column<T> = {
  key: keyof T
  header: string
}

type Action<T> = {
  ariaLabel: string
  icon: React.ReactNode
  onClick: (row: T) => void
  colorScheme?: string
}

type Props<T> = {
  data: T[]
  columns: Column<T>[]
  loading: boolean
  page: number
  setPage: (page: number) => void
  pageSize: number
  totalPages: number
  searchTerm: string
  setSearchTerm: (value: string) => void
  actions?: Action<T>[]
}

export function SearchableTable<T extends { id: number }>({
  data,
  columns,
  loading,
  page,
  setPage,
  pageSize,
  totalPages,
  searchTerm,
  setSearchTerm,
  actions = [],
}: Props<T>) {
  return (
    <Stack spacing={4}>
      {/* 🔍 Input de búsqueda */}
      <Input
        placeholder="Buscar..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* 📊 Tabla */}
      <Table size="sm" variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            {columns.map((col) => (
              <Th key={String(col.key)}>{col.header}</Th>
            ))}
            {actions.length > 0 && <Th>Acciones</Th>}
          </Tr>
        </Thead>
        <Tbody>
          {loading
            ? Array.from({ length: pageSize }).map((_, i) => (
                <Tr key={i}>
                  {columns.map((_, j) => (
                    <Td key={j}>
                      <Skeleton height="20px" />
                    </Td>
                  ))}
                  {actions.length > 0 && (
                    <Td>
                      <Skeleton height="20px" />
                    </Td>
                  )}
                </Tr>
              ))
            : data.map((row) => (
                <Tr key={row.id}>
                  {columns.map((col) => (
                    <Td key={String(col.key)}>{String(row[col.key])}</Td>
                  ))}
                  {actions.length > 0 && (
                    <Td>
                      <ButtonGroup size="sm" isAttached>
                        {actions.map((action, i) => (
                          <IconButton
                            key={i}
                            aria-label={action.ariaLabel}
                            icon={action.icon}
                            colorScheme={action.colorScheme}
                            onClick={() => action.onClick(row)}
                          />
                        ))}
                      </ButtonGroup>
                    </Td>
                  )}
                </Tr>
              ))}
        </Tbody>
      </Table>

      {/* ⏩ Paginación */}
      <ButtonGroup>
        <IconButton
          aria-label="Anterior"
          icon={<LuChevronLeft />}
          onClick={() => setPage(Math.max(page - 1, 1))}
          isDisabled={page === 1}
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
          isDisabled={page === totalPages}
        />
      </ButtonGroup>
    </Stack>
  )
}
