// Importamos componentes de React Bootstrap para la tarjeta
// Card: componente de tarjeta con header, body y footer
// Button: botones para acciones
// Badge: etiqueta para mostrar el ID
import { Card, Button, Badge } from "react-bootstrap";

// Definimos el componente UserCard que recibe props
// { user, onEdit, onDelete } - props que nos pasa UserList.jsx
function CardUsuario({ usuario, onEditarUsuario, onEliminarUsuario }) {
  // ========== MANEJADORES DE EVENTOS ==========

  // Función que se ejecuta cuando el usuario hace clic en "Editar"
  const handleEdit = () => {
    // Llama a la función onEdit que recibimos por props
    // Le pasamos el objeto user completo para que App.jsx sepa qué usuario editar
    onEditarUsuario(usuario);
  };

  // Función que se ejecuta cuando el usuario hace clic en "Eliminar"
  const handleDelete = () => {
    // Mostramos confirmación nativa del navegador
    // window.confirm() muestra diálogo modal con OK/Cancel
    if (
      window.confirm(`¿Estás seguro de que quieres eliminar a ${usuario.name}?`)
    ) {
      // Si el usuario confirma (click en OK), llamamos a onDelete
      // Le pasamos solo el ID del usuario para que App.jsx sepa cuál eliminar
      onEliminarUsuario(usuario.id);
    }
    // Si el usuario cancela, no hacemos nada
  };

 