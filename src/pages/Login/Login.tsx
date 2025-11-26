'use client'

import React, { useState } from 'react'
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  useToast,
} from '@chakra-ui/react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const toast = useToast()

  const handleLogin = async () => {
    try {
      const res = await fetch('http://127.0.0.1:3000/api/v1/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: email, contrasena: password }),
      })

      if (!res.ok) throw new Error('Credenciales inválidas')

      const data = await res.json()

      // 🔑 Guardamos el token en localStorage
      localStorage.setItem('token', data.token)

      toast({
        title: 'Inicio de sesión exitoso',
        status: 'success',
        duration: 2000,
      })

      // Redirigir al dashboard o página de alumnos
      window.location.href = '/alumnos'
    } catch (err) {
      console.error(err)
      toast({
        title: 'Error al iniciar sesión',
        description: 'Verifica tus credenciales',
        status: 'error',
        duration: 2000,
      })
    }
  }

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'}>Inicia sesión en tu cuenta</Heading>
          <FormControl id="email">
            <FormLabel>Usuario</FormLabel>
            <Input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Contraseña</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Stack spacing={6}>
            <Button colorScheme={'blue'} onClick={handleLogin}>
              Iniciar Sesión
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1} justify="center" align="center">
        <Image
          alt="Login Image"
          objectFit="cover"
          src="./GYA.jpg"
          maxW="450px"
          maxH="450px"
          w="100%"
          h="auto"
        />
      </Flex>
    </Stack>
  )
}
