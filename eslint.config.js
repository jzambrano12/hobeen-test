// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*"],
  },
  {
    files: ["jest-setup.js"],
    rules: {
      "import/no-unresolved": "off", // Desactivar para archivos de setup de prueba
    },
  },
  {
    // Aplicar reglas de testing library a archivos de prueba
    files: ["__tests__/**/*.test.tsx"],
    extends: ["plugin:testing-library/react-native"],
    rules: {
      // Puedes añadir o modificar reglas específicas para pruebas aquí
      // Por ejemplo, desactivar reglas que fuerzan la presencia de propTypes en tests
    },
  },
]);
