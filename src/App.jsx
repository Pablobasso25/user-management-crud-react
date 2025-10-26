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
  const [alert, setAlert] = useState({ show: false, mensaje: "", tipo: "" });

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

  // ========== FUNCIONES DEL COMPONENTE ==========

  // FUNCIÓN: Mostrar alertas temporales
  // Recibe el mensaje y tipo (success, danger, warning, etc.) utilizamos "success" por defecto, luego puede cambiar
  const showAlert = (mensaje, tipo = "success") => {
    // Actualiza el estado para mostrar la alerta
    setAlert({ show: true, mensaje, tipo });
    // setTimeout programa una función para ejecutar después de 3 segundos
    // Esto hace que la alerta se oculte automaticamente
    setTimeout(() => setAlert({ show: false, mensaje: "", tipo: "" }), 3000);
  };

  // ========== OPERACIONES CRUD ==========

  // CREATE - Agregar nuevo usuario
  // Recibe userData (objeto con name, email, phone)
  const agregarUsuario = (usuarioData) => {
    // 1. CREAR NUEVO USUARIO OBJETO
    const nuevoUsuario = {
      id: Date.now(), // ID único
      ...usuarioData, // Spread operator: copia todas las propiedades de usuarioData
    };

    // 2. ACTUALIZAR ESTADO (esto ejecutará el useEffect de guardado automático)
    // ...usuarios copia todos los usuarios existentes
    // nuevoUsuario agrega el nuevo usuario al final del array
    setUsuarios([...usuarios, nuevoUsuario]);

    // 3. MOSTRAR ALERTA
    showAlert("Usuario creado exitosamente!", "success");
  };

  // UPDATE - Actualizar usuario existente
  const actualizarUsuario = (usuarioData) => {
    // 1. CREAR NUEVO ARRAY CON EL USUARIO ACTUALIZADO
    // usuarios.map() crea un nuevo array transformando cada elemento
    const actualizarUsuarios = usuarios.map(
      (usuario) =>
        // Si el usuario actual tiene el mismo ID que el que estamos editando
        usuario.id === editarUsuario.id
          ? { ...usuario, ...usuarioData } // Combinamos usuario existente con nuevos datos
          : usuario // Dejamos los otros usuarios sin cambios
    );

    // 2. ACTUALIZAR ESTADO (ejecuta useEffect de guardado automático)
    setUsuarios(actualizarUsuarios);

    // 3. SALIR DEL MODO EDICIÓN

    setEditarUsuario(null);

    // 4. MOSTRAR ALERTA
    showAlert("Usuario actualizado exitosamente!", "info");
  };

  // DELETE - Eliminar usuario
  const eliminarUsuario = (usuarioId) => {
    // 1. FILTRAR EL ARRAY EXCLUYENDO EL USUARIO A ELIMINAR
    // usuarios.filter() crea nuevo array con usuarios que NO tengan el ID a eliminar
    const filtroUsuarios = usuarios.filter(
      (usuario) => usuario.id !== usuarioId
    );

    // 2. ACTUALIZAR ESTADO (ejecuta useEffect de guardado automático)
    setUsuarios(filtroUsuarios);

    // 3. Mostramos alerta
    showAlert("Usuario eliminado exitosamente!", "warning");
  };

  // INICIAR MODO EDICIÓN
  const iniciarEdicion = (usuario) => {
    // Establecemos el usuario que vamos a editar
    // Esto se pasa a FormUsuario para que llene el formulario con sus datos
    setEditarUsuario(usuario);
  };

  // CANCELAR EDICIÓN
  const cancelarEdicion = () => {
    // Volvemos a null para indicar que no estamos editando
    // FormUsuario detecta esto y limpia el formulario
    setEditarUsuario(null);
    showAlert("Edición cancelada", "secondary");
  };

  // ========== RENDER DEL COMPONENTE ==========

  // return devuelve el JSX que se va a renderizar en el DOM
  return (
    // Fragment <> - permite devolver múltiples elementos sin un div padre
    <>
      {/* bg: background color, variant: color del texto, expand: responsive */}
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          {/* Brand: logo o nombre de la app */}
          <Navbar.Brand href="#">
            <i className="bi bi-people-fill me-2"></i>
            Sistema CRUD de Usuarios
          </Navbar.Brand>
          {/* Texto adicional en la navbar */}
          <Navbar.Text>Create, Read, Update, Delete</Navbar.Text>
        </Container>
      </Navbar>

      {/* CONTAINER PRINCIPAL */}
      {/* fluid="md" hace que sea ancho completo hasta breakpoint medium */}
      <Container fluid="md">
        {/* ALERT PARA FEEDBACK */}
        {/* && es conditional rendering - solo renderiza si alert.show es true */}
        {alert.show && (
          <Alert
            variant={alert.type} // Tipo de alerta (success, danger, etc.)
            dismissible // Permite cerrar la alerta
            onClose={() => setAlert({ show: false, mensaje: "", tipo: "" })}
          >
            {alert.mensaje}
          </Alert>
        )}

        {/* g-4: gutter (espacio entre columnas) de 4 unidades */}
        <Row className="g-4">
          {/* COL - Columna del formulario (4/12 del ancho en lg) */}
          <Col lg={4}>
            {/* CARD - Tarjeta contenedora del formulario */}
            <Card className="h-100 shadow-sm">
              {/* CARD HEADER - Encabezado de la tarjeta */}
              <Card.Header className="bg-primary text-white">
                <h5 className="mb-0">
                  <i className="bi bi-person-plus me-2"></i>
                  {/* Título dinámico según si estamos editando o creando */}
                  {editarUsuario ? "Editar Usuario" : "Agregar Usuario"}
                </h5>
              </Card.Header>
              {/* CARD BODY - Cuerpo de la tarjeta */}
              <Card.Body>
                {/* Componente FormUsuario con props (propiedades) */}
                <FormUsuario
                  onAgregarUsuario={agregarUsuario} // Función para crear usuario
                  onActualizarUsuario={actualizarUsuario} // Función para actualizar usuario
                  editarUsuario={editarUsuario} // Usuario en edición (o null)
                  onCancelarEdicion={cancelarEdicion} // Función para cancelar edición
                />
              </Card.Body>
            </Card>
          </Col>

          {/* COL - Columna de la lista (8/12 del ancho en lg) */}
          <Col lg={8}>
            <Card className="shadow-sm">
              <Card.Header className="bg-success text-white">
                <h5 className="mb-0">
                  <i className="bi bi-list-ul me-2"></i>
                  {/* Muestra el número actual de usuarios */}
                  Lista de Usuarios ({usuarios.length})
                </h5>
              </Card.Header>
              <Card.Body>
                {/* Componente ListaUsuarios con props */}
                <ListaUsuario
                  usuarios={usuarios} // Array de usuarios
                  onEditarUsuario={iniciarEdicion} // Función para editar
                  onEliminarUsuario={eliminarUsuario} // Función para eliminar
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

// Exporta el componente para poder importarlo en otros archivos
export default App;
