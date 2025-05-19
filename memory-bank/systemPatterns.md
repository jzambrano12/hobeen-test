# System Patterns: Aplicación React Native de Rick & Morty

## 1. Arquitectura General

La aplicación seguirá una arquitectura basada en componentes, común en React Native. Se organizará en:

- **Pantallas (Screens):** Componentes de nivel superior que representan una vista completa de la aplicación (ej. Lista de Personajes, Detalles del Personaje).
- **Componentes Reutilizables (Components):** Elementos de UI más pequeños y genéricos que se pueden usar en múltiples pantallas (ej. Tarjeta de Personaje, Campo de Búsqueda, Indicador de Carga).
- **Servicios (Services/API):** Módulos responsables de la lógica de negocio y la comunicación con la API externa. Esto incluirá el Hook personalizado para las consultas a la API.
- **Navegación (Navigation):** Se utilizará una librería de enrutamiento (probablemente React Navigation) para gestionar el flujo entre pantallas y el paso de parámetros.
- **Estado Global (Opcional):** Para una aplicación de esta escala, el estado local de los componentes y el paso de props/parámetros de ruta podrían ser suficientes. Si la complejidad aumenta, se podría considerar una solución de gestión de estado global (como Context API o Zustand/Redux Toolkit), pero se intentará evitar si no es estrictamente necesario para mantener la simplicidad.
- **Tipos (Types):** Se usarán interfaces y tipos de TypeScript para definir la forma de los datos (personajes, respuestas de API, etc.) y las props de los componentes.

## 2. Patrones de Diseño Clave

- **Component-Based Architecture:** Fundamental en React/React Native.
- **Custom Hook (useApiQuery):** Para encapsular la lógica de fetching de datos, manejo de estados de carga, errores y datos recibidos. Esto promueve la reutilización y la separación de preocupaciones.
- **Container/Presentational Components (implícito):** Las pantallas actuarán como "contenedores" que manejan la lógica y los datos, mientras que los componentes reutilizables serán más "presentacionales", enfocados en la UI.
- **Error Handling:** Se implementarán mecanismos para capturar y mostrar errores de la API de forma amigable.
- **Optimistic Updates (No planificado inicialmente):** No se considera necesario para esta prueba, pero es un patrón a tener en cuenta para mejorar la UX en aplicaciones más complejas.
- **Lazy Loading / Pagination:** La API de Rick & Morty soporta paginación. Se implementará para el listado de personajes para mejorar el rendimiento y no cargar todos los datos de golpe.

## 3. Relaciones entre Componentes (Diagrama Conceptual Inicial)

```mermaid
graph TD
    App[App Entry Point] --> Router[React Navigation]

    Router --> CharacterListScreen[CharacterListScreen]
    Router --> CharacterDetailScreen[CharacterDetailScreen]

    CharacterListScreen --> SearchInput[SearchInput Component]
    CharacterListScreen --> CharacterCard[CharacterCard Component]
    CharacterListScreen --> LoadingIndicator[LoadingIndicator Component]
    CharacterListScreen --> ErrorMessage[ErrorMessage Component]
    CharacterListScreen --> useApiData{useApiData Hook}

    CharacterDetailScreen --> CharacterInfo[CharacterInfo Component]
    CharacterDetailScreen --> LoadingIndicator
    CharacterDetailScreen --> ErrorMessage
    CharacterDetailScreen --> useApiData

    useApiData --> APIService[APIService (fetch)]

    CharacterCard -- Navigates to --> CharacterDetailScreen
```

## 4. Decisiones Técnicas Clave (Pendientes y Tomadas)

- **Navegación:** Se usará `React Navigation`. Es el estándar de facto en la comunidad React Native y cumple con los requisitos de pasar parámetros.
- **Estilo:** Se utilizará `StyleSheet` de React Native. Se podría considerar Styled Components o similar si el proyecto fuera más grande, pero para esta prueba, `StyleSheet` es suficiente y más directo. Se buscará mantener los estilos cohesivos y organizados.
- **Linting y Formateo:** Se utilizará ESLint y Prettier (ya configurados en el proyecto base de Expo) para mantener la calidad y consistencia del código.
- **TypeScript:** Se utilizará TypeScript en todo el proyecto, como se solicita en las tareas bonus.
