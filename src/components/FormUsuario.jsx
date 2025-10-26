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
function FormUsuario({ onAgregarUsuario, onActualizarUsuario, editarUsuario, onCancelarEdicion }) {
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