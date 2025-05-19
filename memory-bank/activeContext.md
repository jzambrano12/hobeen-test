# Active Context: Aplicación React Native de Rick & Morty

## 1. Foco de Trabajo Actual

- Implementación de la funcionalidad para mostrar solo los últimos 5 episodios en `app/(tabs)/[id].tsx`.

## 2. Cambios Recientes

- Se modificó `app/(tabs)/[id].tsx` para que la lista de episodios muestre únicamente los últimos 5 episodios en los que aparece el personaje.
- Se optimizó el renderizado de la lista de episodios en `app/(tabs)/[id].tsx` usando `FlatList` y `ListHeaderComponent` para evitar anidar `VirtualizedLists` dentro de `ScrollView`.
- Se corrigieron errores de TypeScript en `app/(tabs)/[id].tsx` restaurando una definición adecuada para `styles.container`, utilizada por los `View` de mensajes de error y "personaje no encontrado".

## 3. Próximos Pasos Inmediatos

1.  Actualizar `memory-bank/progress.md` para reflejar la nueva funcionalidad de mostrar los últimos 5 episodios.
2.  Informar al usuario que la funcionalidad ha sido implementada.
3.  Continuar con la implementación de las funcionalidades principales del proyecto según el plan general.

## 4. Decisiones y Consideraciones Activas

- La lógica para mostrar los últimos 5 episodios (`.sort().slice(-5)`) se aplica directamente a los datos antes de pasarlos a `FlatList`.
- La refactorización a `FlatList` con `ListHeaderComponent` es la solución preferida para evitar advertencias de `VirtualizedLists` anidadas.
- Es crucial mantener la consistencia de los estilos y asegurar que todas las rutas de renderizado (datos, carga, error, vacío) funcionen correctamente después de los cambios.
