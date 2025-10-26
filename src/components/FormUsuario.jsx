// UserForm

// Importamos React y los Hooks que necesitamos
// useState: para manejar el estado del formulario
// useEffect: para ejecutar código cuando el componente se monta o cuando editingUser cambia
import React, { useState, useEffect } from "react";

// Importamos componentes específicos de React Bootstrap para el formulario
// Form: componente contenedor de formulario con validación
// Button: botones estilizados
// Row, Col: sistema de grid para layout interno
// Alert: para mostrar errores de validación
import { Form, Button, Row, Col, Alert } from "react-bootstrap";

// Definimos el componente UserForm que recibe props (propiedades) del componente padre (App.jsx)
// { onAddUser, onUpdateUser, editingUser, onCancelEdit } - esto se llama DESTRUCTURACIÓN
// En lugar de usar props.onAddUser, directamente tenemos la variable onAddUser
function FormUsuario({
  onAgregarUsuario,
  onActualizarUsuario,
  editarUsuario,
  onCancelarEdicion,
}) {
  // ========== ESTADOS INTERNOS DEL FORMULARIO ==========

  // ESTADO 1: Datos del formulario
  // Guarda los valores actuales de cada campo del formulario
  const [formData, setFormData] = useState({
    name: "", // Inicializado como string vacío
    email: "", // Inicializado como string vacío
    phone: "", // Inicializado como string vacío
  });

  // ESTADO 2: Validación del formulario
  // Controla si el formulario fue validado (para mostrar mensajes de error)
  // false: no mostrar errores todavía, true: mostrar errores después de enviar
  const [validacion, setValidacion] = useState(false);

  // ESTADO 3: Errores de validación
  // Objeto que guarda los mensajes de error para cada campo
  // Ej: { name: 'El nombre es requerido', email: 'Email inválido' }
  const [errores, setErrores] = useState({});

  // ========== EFFECT - SINCRONIZAR CON EDICIÓN ==========

  // useEffect se ejecuta cuando el componente se monta o cuando editarUsuario cambia
  // editarUsuario es una dependencia - cuando cambia, se ejecuta este efecto
  useEffect(() => {
    // Si editarUsuario tiene un valor (no es null), estamos en modo EDICIÓN
    if (editarUsuario) {
      // Llenamos el formulario con los datos del usuario que estamos editando
      setFormData({
        name: editarUsuario.name, // Copiamos el nombre del usuario
        email: editarUsuario.email, // Copiamos el email del usuario
        phone: editarUsuario.phone, // Copiamos el teléfono del usuario
      });
    } else {
      // Si editarUsuario es null, estamos en modo CREACIÓN
      // Limpiamos el formulario para crear un nuevo usuario
      setFormData({
        name: "", // Vaciamos nombre
        email: "", // Vaciamos email
        phone: "", // Vaciamos teléfono
      });
    }

    // Reseteamos los estados de validación y errores
    setValidacion(false); // Ocultamos mensajes de error
    setErrores({}); // Limpiamos todos los errores
  }, [editarUsuario]); // ← Este effect depende de editarUsuario - se ejecuta cuando cambia

  // ========== FUNCIÓN DE VALIDACIÓN PERSONALIZADA ==========

  // Función que valida todos los campos del formulario
  // Retorna true si todo es válido, false si hay errores
  const validacionForm = () => {
    // Creamos un objeto vacío para guardar los errores
    const newErrors = {};

    // VALIDACIÓN 1: Nombre
    // .trim() remueve espacios en blanco al inicio y final
    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido";
    }

    // VALIDACIÓN 2: Email
    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      // Expresión regular para validar formato de email
      // \S+ = uno o más caracteres que no son espacios
      // @ = símbolo arroba
      // \. = punto literal
      newErrors.email = "El email no es válido";
    }

    // VALIDACIÓN 3: Teléfono
    if (!formData.phone.trim()) {
      newErrors.phone = "El teléfono es requerido";
    }

    // Actualizamos el estado de errores con los nuevos errores encontrados
    setErrores(newErrors);

    // Si newErrors está vacío (0 propiedades), el formulario es válido
    // Object.keys(newErrors) devuelve un array con las claves del objeto
    // .length === 0 significa que no hay errores
    return Object.keys(newErrors).length === 0;
  };

  // ========== MANEJADOR DE CAMBIOS EN INPUTS ==========

  // Esta función se ejecuta CADA VEZ que el usuario escribe en cualquier input
  const handleChange = (e) => {
    // e.target es el elemento HTML que disparó el evento (el input)
    // Desestructuramos para obtener name y value
    const { name, value } = e.target;
    // name = 'name', 'email' o 'phone' (atributo name del input)
    // value = lo que el usuario está escribiendo

    // Actualizamos el estado formData
    // Usamos función de actualización para asegurarnos de tener el estado más reciente
    setFormData((prevData) => ({
      ...prevData, // Copiamos todos los datos anteriores (spread operator)
      [name]: value, // Actualizamos SOLO el campo que cambió
      // [name] es computed property name - si name='email', sería email: value
    }));

    // LIMPIEZA DE ERRORES EN TIEMPO REAL
    // Si el campo que está escribiendo tiene un error, lo limpiamos
    if (errors[name]) {
      setErrores((prev) => ({
        ...prev, // Copiamos todos los errores anteriores
        [name]: "", // Limpiamos SOLO el error del campo actual
      }));
    }
  };

  // ========== MANEJADOR DE ENVÍO DEL FORMULARIO ==========

  // Esta función se ejecuta cuando el usuario envía el formulario (click botón o Enter)
  const handleSubmit = (e) => {
    // Prevenimos el comportamiento por defecto del formulario
    // Que sería recargar la página
    e.preventDefault();

    // Obtenemos una referencia al elemento form del DOM
    const form = e.currentTarget;

    // Validación DOBLE:
    // 1. Validación nativa de HTML5 (form.checkValidity())
    // 2. Nuestra validación personalizada (validateForm())
    if (form.checkValidity() === false || !validateForm()) {
      // Si alguna validación falla:
      e.stopPropagation(); // Detiene la propagación del evento
      setValidacion(true); // Muestra los mensajes de error
      return; // Sale de la función - NO envía el formulario
    }

    // ========== FORMULARIO VÁLIDO - PROCESAR DATOS ==========

    // Dependiendo de si estamos editando o creando:
    if (editarUsuario) {
      // MODO EDICIÓN: Llamamos a la función updateUser del padre (App.jsx)
      // Le pasamos formData (los nuevos datos del usuario)
      onActualizarUsuario(formData);
    } else {
      // MODO CREACIÓN: Llamamos a la función addUser del padre (App.jsx)
      // Le pasamos formData (los datos del nuevo usuario)
      onAgregarUsuario(formData);
    }

    // ========== LIMPIAR FORMULARIO DESPUÉS DE ENVIAR ==========

    // Restablecemos el formulario a valores vacíos
    setFormData({
      name: "",
      email: "",
      phone: "",
    });

    // Reseteamos los estados de validación
    setValidacion(false); // Ocultamos mensajes de error
    setErrores({}); // Limpiamos todos los errores
  };

  // ========== RENDER DEL COMPONENTE ==========

  // Retornamos el JSX que se va a renderizar
  return (
    // Form de React Bootstrap
    // noValidate: desactiva validación nativa del navegador (usamos la nuestra)
    // validated: controla si mostrar mensajes de error de Bootstrap
    // onSubmit: función que se ejecuta al enviar el formulario
    <Form noValidate validacion={validacion} onSubmit={handleSubmit}>
      {/* g-3: gutter (espacio entre columnas) de 3 unidades */}
      <Row className="g-3">
        {/* ========== CAMPO NOMBRE ========== */}
        <Col md={12}>
          {" "}
          {/* Ocupa 12 columnas (ancho completo) en dispositivos medium */}
          <Form.Group>
            {" "}
            {/* Grupo de formulario para agrupar label + input + feedback */}
            <Form.Label>Nombre completo</Form.Label> {/* Label del campo */}
            <Form.Control
              type="text" // Tipo de input
              name="name" // Nombre del campo (importante para handleChange)
              value={formData.name} // Valor controlado por React
              onChange={handleChange} // Se ejecuta con cada tecla presionada
              placeholder="Ej: Juan Pérez" // Texto placeholder
              required // Campo obligatorio (HTML5 validation)
              isInvalid={!!error.name} // Si hay error, muestra estilo de error
              // !! convierte el valor a booleano:
              // errors.name = string → true, errors.name = '' → false
            />
            {/* Mensaje de error que se muestra si el campo es inválido */}
            <Form.Control.Feedback type="invalid">
              {errors.name}{" "}
              {/* Muestra el mensaje de error del estado errors */}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        {/* ========== CAMPO EMAIL ========== */}
        <Col md={12}>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email" // Tipo email para validación nativa
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Ej: usuario@email.com"
              required
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        {/* ========== CAMPO TELÉFONO ========== */}
        <Col md={12}>
          <Form.Group>
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="tel" // Tipo tel para dispositivos móviles
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Ej: 123-456-7890"
              required
              isInvalid={!!errores.phone}
            />
            <Form.Control.Feedback type="invalid">
              {errores.phone}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        {/* ========== BOTONES DEL FORMULARIO ========== */}
        <Col md={12}>
          {/* Contenedor flexible para los botones */}
          <div className="d-grid gap-2 d-md-flex">
            {/* BOTÓN PRINCIPAL (Submit) */}
            <Button
              variant={editarUsuario ? "warning" : "primary"} // Color: warning (naranja) si edita, primary (azul) si crea
              type="submit" // Tipo submit para enviar el formulario
              className="me-2" // Margin right de 2 unidades
            >
              {/* Ícono dinámico según el modo */}
              <i
                className={`bi ${
                  editarUsuario ? "bi-check-circle" : "bi-person-plus"
                } me-2`}
              ></i>
              {/* Texto dinámico según el modo */}
              {editarUsuario ? "Actualizar Usuario" : "Agregar Usuario"}
            </Button>

            {/* BOTÓN CANCELAR - solo visible en modo edición */}
            {/* && es conditional rendering - solo se renderiza si editingUser es true */}
            {editarUsuario && (
              <Button
                variant="secondary" // Color gris
                onClick={onCancelarEdicion} // Llama a la función del padre para cancelar
                type="button" // Tipo button para que no envíe el formulario
              >
                <i className="bi bi-x-circle me-2"></i>
                Cancelar
              </Button>
            )}
          </div>
        </Col>
      </Row>
    </Form>
  );
}

// Exportamos el componente para poder importarlo en App.jsx
export default UserForm;
