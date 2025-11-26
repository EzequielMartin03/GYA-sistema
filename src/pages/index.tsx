import { createBrowserRouter } from "react-router-dom";
import Profesores from "./Profesores";
import Alumnos from "./Alumnos";
import Cursos from "./Cursos";
import Layout from "./Layout";
import ErrorDetail from "./ErrorDetail";
import { Children } from "react";
import Dashboard from "./Dashboard/Dashboard";
import Home from "./Home";
import Login from "./Login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: (
      <Layout>
        <ErrorDetail />
      </Layout>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "/alumnos", element: <Alumnos /> },
      { path: "/profesores", element: <Profesores /> },
      { path: "/cursos", element: <Cursos /> },
      
    ],
  },
  { path: "/login", element: <Login /> },
]);

export default router;
