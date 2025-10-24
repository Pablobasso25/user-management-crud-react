// Importamos React y los Hooks que vamos a usar
// useState: para manejar estado en componentes funcionales
// useEffect: para ejecutar efectos secundarios (como cargar datos)
import React, { useState, useEffect } from "react";

// Importamos componentes específicos de React Bootstrap
// Container: contenedor responsive
// Row, Col: sistema de grid
// Card: componente de tarjeta con header y body
// Alert: para mensajes de feedback al usuario
// Navbar: barra de navegación superior
import { Container, Row, Col, Card, Alert, Navbar } from "react-bootstrap";

// Importamos nuestros componentes personalizados
import FormUsuario from "./components/FormUsuario";
import ListaUsuario from "./components/ListaUsuario";

const App = () => {
  // ========== ESTADOS DEL COMPONENTE ==========

  // ESTADO 1: Lista de usuarios
  // useState([]) crea un estado inicializado con array vacío
  // users: valor actual del estado (array de usuarios)
  // setUsers: función para actualizar el estado
  const [usuarios, setUsuarios] = useState([]);

  // ESTADO 2: Usuario en edición
  // null significa que no estamos editando ningún usuario
  // Cuando tiene un objeto usuario, significa que estamos en modo edición
  const [editarUsuario, setEditarUsuario] = useState(null);

  // ESTADO 3: Alerta para mensajes al usuario
  // Objeto con: show (si se muestra), message (texto), type (tipo de alerta)
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  // ========== EFFECT PARA CARGAR USUARIOS EN LOCALSTORAGE==========
  useEffect(() => {
    const usuariosGuardados = localStorage.getItem("crud-usuarios");

    if (usuariosGuardados && usuariosGuardados !== "[]") {
      try {
        const usuariosStorage = JSON.parse(usuariosGuardados);

        if (Array.isArray(usuariosStorage) && usuariosStorage.length > 0) {
          setUsuarios(usuariosStorage);
          return;
        }
      } catch (error) {
        console.error("❌ Error de datos", error);
      }
    }

    //  SOLO si localStorage falla o está vacío
    const usuariosPorDefecto = [
      {
        id: 1,
        name: "Ana García",
        email: "ana@email.com",
        phone: "123-456-7890",
      },
      {
        id: 2,
        name: "Carlos López",
        email: "carlos@email.com",
        phone: "098-765-4321",
      },
    ];
    setUsuarios(usuariosPorDefecto);
  }, []);

  // ========== EFFECT PARA GUARDAR USUARIOS EN LOCALSTORAGE==========
  useEffect(() => {
    if (usuarios.length > 0) {
      localStorage.setItem("crud-usuarios", JSON.stringify(usuarios));

    }
  }, [usuarios]);

  return <></>;
};


export default App;
