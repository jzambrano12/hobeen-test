# Tech Context: Aplicación React Native de Rick & Morty

## 1. Tecnologías Principales

- **React Native:** Framework principal para el desarrollo de la aplicación móvil multiplataforma.
  - **Expo:** Se utilizará el ecosistema de Expo para simplificar el desarrollo, la construcción y ciertas configuraciones. La estructura de archivos inicial (`environment_details`) sugiere que el proyecto ya está basado en Expo.
- **TypeScript:** Lenguaje de programación principal, añadiendo tipado estático a JavaScript (tarea bonus).
- **JavaScript (ES13+):** Se utilizarán características modernas de JavaScript como arrow functions, destructuring, async/await (tarea bonus).
- **React Navigation:** Librería para la gestión de la navegación y el enrutamiento entre pantallas (tarea bonus). Se necesitará instalar y configurar.
- **Fetch API / Axios:** Para realizar las solicitudes HTTP a la API de Rick & Morty. Se decidirá si usar `fetch` nativo o `axios` (axios podría ofrecer mejor manejo de errores y timeouts, pero `fetch` es más ligero). Por simplicidad inicial, se podría empezar con `fetch`.

## 2. API Externa

- **Rick & Morty API:**
  - **URL Base:** `https://rickandmortyapi.com/api`
  - **Endpoints Principales a Utilizar:**
    - Personajes: `/character`
      - Para listar todos los personajes (con paginación).
      - Para buscar personajes por nombre (ej. `/character/?name=rick`).
      - Para obtener un personaje específico por ID (ej. `/character/1`).
    - Episodios: `/episode/{ids}`
      - Para obtener detalles de episodios específicos por sus IDs (necesario para "último episodio en el que apareció"). La información del personaje incluye URLs a los episodios, pero no sus nombres directamente. Se necesitará una consulta adicional para obtener el nombre del episodio.
  - **Documentación:** [https://rickandmortyapi.com/documentation](https://rickandmortyapi.com/documentation)

## 3. Configuración del Entorno de Desarrollo

- **Node.js y npm/yarn:** Necesarios para ejecutar el proyecto React Native y gestionar dependencias.
- **Expo CLI:** Para iniciar el servidor de desarrollo, construir la aplicación, etc.
- **Editor de Código:** (VSCode, según el contexto).
- **Emulador/Dispositivo Físico:** Para probar la aplicación.
- **Git:** Para el control de versiones.

## 4. Dependencias Clave (a instalar/verificar)

- `react`
- `react-native`
- `expo` (y sus paquetes asociados)
- `typescript`
- `@types/react`, `@types/react-native`
- `@react-navigation/native`
- `@react-navigation/stack` (o el tipo de navegador que se elija, ej. native-stack)
- `react-native-screens`
- `react-native-safe-area-context`
- (Opcional) `axios` si se decide usar en lugar de `fetch`.

## 5. Restricciones Técnicas y Consideraciones

- **Conectividad de Red:** La aplicación depende de una conexión a internet para funcionar, ya que consume una API externa. Se debe manejar la ausencia de conexión.
- **Rendimiento:** Especialmente en el listado de personajes, se debe considerar la paginación para no sobrecargar la aplicación ni la API. Las imágenes también deben optimizarse si es posible (React Native `Image` tiene algunas capacidades para esto).
- **Manejo de Estado Asíncrono:** La gestión de los estados de carga, error y datos de las llamadas a la API es crucial (se abordará con el custom Hook).
- **Compatibilidad:** Aunque Expo maneja muchas abstracciones, se debe tener en cuenta la compatibilidad entre versiones de React Native, Expo SDK y librerías.

## 6. Pruebas

- **Pruebas de Integración:** Se crearán algunas pruebas de integración. Se podría usar React Native Testing Library para esto, enfocándose en flujos de usuario como:
  - Cargar y mostrar la lista de personajes.
  - Navegar a detalles de un personaje.
  - Realizar una búsqueda y verificar los resultados.
- **Pruebas Unitarias (Opcional):** Para lógica específica (ej. funciones de utilidad o el custom hook), aunque el foco principal de la prueba son las de integración.
