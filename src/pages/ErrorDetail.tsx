import { isRouteErrorResponse, useRouteError } from "react-router-dom";

type Props = {};

const ErrorDetail = ({}: Props) => {
  const error = useRouteError();

  return (
    <div>
      {isRouteErrorResponse(error)
        ? "La pagina no existe"
        : "Ocurrio un error ${error}"}
    </div>
  );
};

export default ErrorDetail;
