import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ChakraProvider } from "@chakra-ui/react";


import router from "./pages";
import { RouterProvider } from 'react-router-dom';


createRoot(document.getElementById('root')!).render(
  
   <StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </StrictMode>
)
