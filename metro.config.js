// Metro padrão do Expo. Necessário para que os aliases "@/..." definidos em
// tsconfig.json (paths) sejam resolvidos também em tempo de execução, não só
// na checagem de tipos.
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

module.exports = config;
