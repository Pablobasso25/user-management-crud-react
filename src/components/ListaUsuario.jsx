// Importamos componentes de React Bootstrap
// Row, Col: sistema de grid para organizar las tarjetas
// Alert: para mostrar mensaje cuando no hay usuarios
import { Row, Col, Alert } from "react-bootstrap";

// Importamos el componente UserCard que mostraremos múltiples veces
import CardUsuario from "./CardUsuario";

// Definimos el componente UserList que recibe props del padre (App.jsx)
// { users, onEditUser, onDeleteUser } - props que nos pasa App.jsx
function ListaUsuario({ usuarios, onEditarUsuario, onEliminarUsuario }) {
  // ========== RENDER DEL COMPONENTE ==========

  return (
    <div>
      {/*Renderizado condicional */}
      {/* Si no hay usuarios, mostramos un Alert */}
      {/* Si hay usuarios, mostramos la grid de UserCards */}
      {usuarios.length === 0 ? (
        // ========== CASO: NO HAY USUARIOS ==========

        // Alert de Bootstrap para mostrar mensaje informativo
        <Alert variant="info" className="text-center">
          <i className="bi bi-info-circle me-2"></i>
          {/* Mensaje para el usuario */}
          No hay usuarios registrados. ¡Agrega el primero!
        </Alert>
      ) : (
        // ========== CASO: SÍ HAY USUARIOS ==========
        // g-3: gutter (espacio entre elementos) de 3 unidades
        <Row className="g-3">
          {/* MAP - Transforma el array de usuarios en componentes CardUsuario */}
          {/* usuarios.map() recorre cada usuario y devuelve un nuevo array de componentes */}
          {usuarios.map((user) => (
            // Col para cada CardUsuario - define el layout responsivo
            // key={usuario.id} - IMPORTANTE: React necesita key única para cada elemento en listas
            // xs={12} - En móvil: 12 columnas (ocupa toda la fila)
            // md={6}  - En tablet: 6 columnas (2 por fila)
            // lg={4}  - En desktop: 4 columnas (3 por fila)
            <Col key={usuarios.id} xs={12} md={6} lg={4}>
              {/* Componente CardUsuario individual */}
              {/* Pasamos props al componente CardUsuario: */}
              <CardUsuario
                usuario={usuarios} // Objeto usuario completo (name, email, phone, id)
                onEditar={onEditarUsuario} // Función para editar (viene de App.jsx)
                onEliminar={onEliminarUsuario} // Función para eliminar (viene de App.jsx)
              />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

// Exportamos el componente
export default ListaUsuario;
