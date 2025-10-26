// Importamos React - necesario para usar JSX y componentes React
import React from "react";

// Importamos ReactDOM para renderizar nuestra aplicación en el DOM
import ReactDOM from "react-dom/client";

// Importamos nuestro componente principal App
import App from "./App";

// Importamos los estilos CSS de Bootstrap
// Esto carga TODOS los estilos de Bootstrap globalmente
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

// Creamos el punto de entrada de nuestra aplicación
// ReactDOM.createRoot() es el método moderno para renderizar apps React
// document.getElementById('root') encuentra el div con id="root" en index.html
ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode> es un componente que ayuda a detectar problemas
  // durante el desarrollo - no afecta el build de producción
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
