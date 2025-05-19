# Product Context: Aplicación React Native de Rick & Morty

## 1. ¿Por qué existe este proyecto?

Este proyecto existe como una prueba técnica para evaluar las habilidades de desarrollo en React Native. El objetivo es demostrar la capacidad de construir una aplicación funcional que interactúe con una API externa, maneje la navegación y presente datos de manera clara.

## 2. ¿Qué problemas resuelve?

La aplicación aborda la necesidad de:

- Acceder y visualizar información de la API de Rick & Morty de forma amigable en un dispositivo móvil.
- Permitir a los usuarios explorar el universo de Rick & Morty a través de sus personajes.
- Ofrecer una funcionalidad de búsqueda para encontrar personajes específicos rápidamente.

## 3. ¿Cómo debería funcionar?

La aplicación debe tener tres funcionalidades principales:

- **Pantalla de Listado de Personajes:**

  - Al iniciar, la aplicación debe cargar y mostrar una lista de personajes de la API.
  - Cada elemento de la lista debe mostrar al menos el nombre y la imagen del personaje.
  - La lista debe ser navegable (scroll).
  - Debe haber un indicador de carga mientras se obtienen los datos.
  - Se debe manejar adecuadamente los errores si la API no responde o devuelve un error.

- **Pantalla de Detalles del Personaje:**

  - Al seleccionar un personaje de la lista, el usuario debe ser redirigido a una nueva pantalla.
  - Esta pantalla debe mostrar información detallada del personaje seleccionado, incluyendo:
    - Nombre
    - Imagen
    - Especie
    - Ubicación (nombre de la ubicación)
    - Origen (nombre del origen)
    - Último episodio en el que apareció (nombre del episodio).
  - Debe ser posible volver a la pantalla de listado.

- **Funcionalidad de Búsqueda:**
  - En la pantalla de listado (o en una sección dedicada), debe haber un campo de texto para la búsqueda.
  - Al ingresar un término y enviar la búsqueda (ej. presionando un botón o "Enter"), la aplicación debe consultar la API con el término de búsqueda.
  - La lista de personajes debe actualizarse para mostrar los resultados que coincidan con la búsqueda.
  - Si no hay resultados, se debe mostrar un mensaje apropiado.

## 4. Objetivos de Experiencia de Usuario (UX)

- **Intuitiva:** La navegación y el uso de la aplicación deben ser fáciles de entender.
- **Responsiva:** La aplicación debe sentirse rápida y fluida, con indicadores de carga claros.
- **Clara:** La información debe presentarse de manera organizada y legible.
- **Atractiva Visualmente:** Aunque es una prueba técnica, un diseño limpio y agradable es un plus.
- **Manejo de Errores:** Los errores (de red, de API) deben comunicarse al usuario de forma comprensible.
