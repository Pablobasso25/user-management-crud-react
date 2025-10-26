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

  // ========== RENDER DEL COMPONENTE ==========

  return (
    // Card de Bootstrap - contenedor principal de la tarjeta
    // h-100: altura 100% para que todas las tarjetas tengan misma altura
    // shadow-sm: sombra suave para efecto de elevación
    <Card className="h-100 shadow-sm">
      {/* ========== HEADER DE LA TARJETA ========== */}
      {/* bg-light: fondo gris claro */}
      <Card.Header className="bg-light">
        {/* Flex container para alinear nombre y badge horizontalmente */}
        <div className="d-flex justify-content-between align-items-center">
          {/* Nombre del usuario */}
          {/* mb-0: margin-bottom 0 para quitar espacio por defecto */}
          {/* h6: tamaño de heading 6 (más pequeño) */}
          <Card.Title className="mb-0 h6">{usuario.name}</Card.Title>

          {/* Badge con el ID del usuario */}
          {/* bg="secondary": color de fondo gris */}
          <Badge bg="secondary">ID: {usuario.id}</Badge>
        </div>
      </Card.Header>

      {/* ========== CUERPO DE LA TARJETA ========== */}
      <Card.Body>
        {/* Sección de EMAIL */}
        <div className="mb-2">
          {/* Label en negrita con ícono */}
          <strong>
            <i className="bi bi-envelope me-2 text-primary"></i>
            Email:
          </strong>
          {/* Valor del email con color gris (text-muted) */}
          <div className="text-muted">{usuario.email}</div>
        </div>

        {/* Sección de TELÉFONO */}
        <div className="mb-3">
          <strong>
            <i className="bi bi-telephone me-2 text-success"></i>
            Teléfono:
          </strong>
          <div className="text-muted">{usuario.phone}</div>
        </div>
      </Card.Body>

      {/* ========== FOOTER DE LA TARJETA ========== */}
      {/* bg-white: fondo blanco para diferenciar del body */}
      <Card.Footer className="bg-white">
        {/* Contenedor flexible para los botones */}
        {/* d-grid: en móvil los botones se apilan verticalmente */}
        {/* d-md-flex: en tablet+ los botones se ponen en línea */}
        {/* gap-2: espacio de 2 unidades entre botones */}
        <div className="d-grid gap-2 d-md-flex">
          {/* ========== BOTÓN EDITAR ========== */}
          {/* variant="outline-warning": contorno naranja (warning color) */}
          {/* size="sm": tamaño pequeño (small) */}
          {/* onClick: ejecuta handleEdit cuando hacen clic */}
          {/* className="me-2": margin right de 2 unidades para separar del siguiente botón */}
          {/* flex-fill: en modo flex, ocupa el espacio disponible */}
          <Button
            variant="outline-warning"
            size="sm"
            onClick={handleEdit}
            className="me-2 flex-fill"
          >
            {/* Ícono de lápiz de Bootstrap Icons */}
            <i className="bi bi-pencil-square me-1"></i>
            {/* Texto del botón */}
            Editar
          </Button>

          {/* ========== BOTÓN ELIMINAR ========== */}
          {/* variant="outline-danger": contorno rojo (danger color) */}
          <Button
            variant="outline-danger"
            size="sm"
            onClick={handleDelete}
            className="flex-fill"
          >
            {/* Ícono de basura de Bootstrap Icons */}
            <i className="bi bi-trash me-1"></i>
            Eliminar
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
}

// Exportamos el componente
export default CardUsuario;
