import { ScrollViewStyleReset } from "expo-router/html";
import type { PropsWithChildren } from "react";

/**
 * Documento HTML raiz da versão web (expo-router). É aqui que ficam as tags
 * que fazem o Safari do iOS tratar o site como um "app instalado" quando a
 * pessoa usa Compartilhar > Adicionar à Tela de Início — abre em tela cheia,
 * sem a barra do navegador, com o ícone da SAHISC.
 */
export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover, maximum-scale=1"
        />
        <title>PeriOp SAHISC</title>
        <meta
          name="description"
          content="Apoio à decisão perioperatória: anticoagulantes/antiagregantes, agonistas do GLP-1, e demais medicações de uso crônico (cardiovascular, endócrino, GI/pulmonar, neurológico, psiquiátrico, reumatológico/HIV, analgésicos), num só lugar."
        />
        <meta name="theme-color" content="#0F766E" />

        {/* iOS: instalar na tela de início, abrir em tela cheia sem barra do Safari */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="PeriOp SAHISC" />
        <link rel="apple-touch-icon" href="/periop-sahisc/apple-touch-icon.png" />

        {/* Android/Chrome: mesmo recurso de instalação (o favicon já é injetado
            automaticamente pelo Expo a partir de app.json) */}
        <link rel="manifest" href="/periop-sahisc/manifest.json" />

        <ScrollViewStyleReset />
      </head>
      <body>{children}</body>
    </html>
  );
}
