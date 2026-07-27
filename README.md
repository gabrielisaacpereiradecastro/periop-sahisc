# PeriOp SAHISC

App unificado (React Native + Expo) que reúne os 3 apps de apoio à decisão
perioperatória da SAHISC num só lugar: termo de aceite único → escolha da
categoria de medicamento → cai na área certa.

- **Anticoagulante/Antiagregante** — DOACs, heparina, antiplaquetários. Guideline ASRA
  Pain Medicine, 5ª edição.
- **GLP-1** — agonistas do receptor de GLP-1. Nota SBA.
- **Outro medicamento crônico** — cardiovascular, endócrino/diabetes, GI/pulmonar,
  neurológico, psiquiátrico, reumatológico/HIV, analgésicos. Série SPAQI (Mayo Clinic
  Proceedings).

100% local: nenhuma resposta do questionário sai do celular, não há backend, login ou
coleta de dados.

## Importante: relação com os 3 apps originais

Este projeto **não substitui** `App-AntiCoag-Perioperatorio`, `App-GLP1-Perioperatorio`
nem `App-MedPeriOp-Perioperatorio` — eles continuam existindo, sendo mantidos e
publicados separadamente (decisão de produto: oferecer cada área isolada para quem só
precisa dela, e este app unificado para quem quer tudo num só lugar).

Por isso o código de dados/lógica de cada área foi **copiado**, não importado por
referência — são bases de código irmãs. Se corrigir uma regra clínica num dos 3 apps
originais, replique a correção aqui também (e vice-versa).

## Rodando pela primeira vez

```bash
cd ~/Desktop/App-PeriOp-SAHISC
npm install
npx expo install --fix
npx expo start
```

## Estrutura do projeto

- `src/theme.ts`, `src/components/{Botao,Cartao,SeletorOpcoes,Checklist,SeletorFarmaco}.tsx`,
  `src/sahiscLogo.ts` — únicas partes **realmente compartilhadas** entre as 3 áreas.
- `src/anticoag/`, `src/glp1/`, `src/medperiop/` — cada um com seu próprio
  `types.ts`, `data/`, `logic/` (+ testes) e `state/QuestionarioContext.tsx`,
  copiados dos apps originais sem alteração de lógica, só de caminho de import.
- `app/index.tsx` — termo de aceite único (geral). `app/categoria.tsx` — escolha da
  área. `app/anticoag/`, `app/glp1/`, `app/medperiop/` — cada um com seu próprio
  `_layout.tsx` (Stack + Provider aninhados, via layouts aninhados do expo-router),
  telas de questionário, resultado e bibliografia — mesma estrutura interna dos apps
  originais, só as rotas viraram `/anticoag/questionario/...` etc.

## Publicando

Mesmo processo dos outros 3: `npm run deploy:web` (exporta pra `docs/`, publica via
GitHub Pages) e `eas build --platform android --profile preview` para o APK.
