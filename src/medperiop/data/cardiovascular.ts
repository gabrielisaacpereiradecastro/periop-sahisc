import { Farmaco } from "@/medperiop/types";

/**
 * Dados extraídos de: Sahai SK, Balonov K, Bentov N, et al. Preoperative
 * Management of Cardiovascular Medications: A Society for Perioperative
 * Assessment and Quality Improvement (SPAQI) Consensus Statement.
 * Mayo Clin Proc. 2022;97(9):1734-1751.
 *
 * Extraído coluna-por-coluna do PDF original e conferido clinicamente antes
 * desta tradução para TypeScript — ver relatório completo em
 * ~/Desktop/MedPeriOp-extracao-SPAQI/cardiovascular.md
 *
 * Notas importantes para quem for manter este arquivo (ver "Ambiguidades"
 * no relatório de extração):
 * - "Suspender na manhã da cirurgia" (tipo: "suspender_dia_cirurgia") NÃO
 *   equivale a "suspender N dias antes". Para a maioria das classes "Hold"
 *   (IECA, BRA, ARNI, diuréticos de alça, inibidores da renina), o SPAQI só
 *   recomenda pular a dose do dia da cirurgia — não há número de dias de
 *   antecedência dado pelo artigo. As únicas classes com N explícito são os
 *   inibidores de SGLT2 (3-4 dias) e os inibidores de PDE5 para disfunção
 *   erétil (≥24h).
 * - A recomendação do grupo POQI (Perioperative Quality Initiative) de
 *   suspender IECA/BRA por 24h antes da cirurgia é de uma organização
 *   diferente, citada apenas como referência — NÃO é o consenso SPAQI, que é
 *   apenas "hold on the morning of surgery". Mantida como nota informativa
 *   dentro de `situacoesEspeciais`, sem alterar a `regra` do IECA/BRA.
 * - "Class I antiarrhythmic agents (sodium-channel blockers)" (subclasses
 *   Ia/Ib/Ic) e "Sodium-channel blocker (late sodium current) — Ranolazina"
 *   são DUAS classes farmacológicas distintas no artigo, apesar do nome
 *   quase idêntico — mantidas como duas subclasses separadas aqui.
 * - Sotalol aparece em duas classes no artigo (betabloqueador e antiarrítmico
 *   classe III), com a mesma recomendação (continuar) nas duas — por isso
 *   existem dois objetos Farmaco para sotalol, com ids distintos.
 * - Tocainida está listada no relatório como fármaco de classe Ic, mas é
 *   obsoleta clinicamente (retirada do mercado nos EUA por toxicidade).
 *   Incluída mesmo assim porque consta na fonte original.
 */
export const FARMACOS_CARDIOVASCULAR: Farmaco[] = [
  // ---------------------------------------------------------------------
  // a-Adrenoceptor blockers (alfabloqueadores)
  // ---------------------------------------------------------------------
  {
    id: "doxazosina",
    nomeGenerico: "Doxazosina",
    nomesComerciais: [],
    classe: "cardiovascular",
    subclasse: "a-Adrenoceptor blockers (alfabloqueadores)",
    regra: { tipo: "continuar" },
    racional:
      "Bloqueiam a vasculatura periférica (receptores alfa-1), causando vasodilatação e hipotensão postural. Não há dados robustos sobre risco de continuar vs. suspender; é geralmente aceito manter no dia da cirurgia.",
    situacoesEspeciais:
      "Indicados para controle pressórico em pacientes preparando ressecção de feocromocitoma — devem tomar a medicação no dia da cirurgia. Garantir hidratação adequada pelo risco de hipotensão postural com jejum prolongado.",
    fonteReferenciaNumero: 2,
    fontePagina: "Texto p.3; Tabela p.4",
  },
  {
    id: "fenoxibenzamina",
    nomeGenerico: "Fenoxibenzamina",
    nomesComerciais: [],
    classe: "cardiovascular",
    subclasse: "a-Adrenoceptor blockers (alfabloqueadores)",
    regra: { tipo: "continuar" },
    racional:
      "Bloqueiam a vasculatura periférica (receptores alfa-1), causando vasodilatação e hipotensão postural. Não há dados robustos sobre risco de continuar vs. suspender; é geralmente aceito manter no dia da cirurgia.",
    situacoesEspeciais:
      "Indicados para controle pressórico em pacientes preparando ressecção de feocromocitoma — devem tomar a medicação no dia da cirurgia. Garantir hidratação adequada pelo risco de hipotensão postural com jejum prolongado.",
    fonteReferenciaNumero: 2,
    fontePagina: "Texto p.3; Tabela p.4",
  },
  {
    id: "prazosina",
    nomeGenerico: "Prazosina",
    nomesComerciais: [],
    classe: "cardiovascular",
    subclasse: "a-Adrenoceptor blockers (alfabloqueadores)",
    regra: { tipo: "continuar" },
    racional:
      "Bloqueiam a vasculatura periférica (receptores alfa-1), causando vasodilatação e hipotensão postural. Não há dados robustos sobre risco de continuar vs. suspender; é geralmente aceito manter no dia da cirurgia.",
    situacoesEspeciais:
      "Indicados para controle pressórico em pacientes preparando ressecção de feocromocitoma — devem tomar a medicação no dia da cirurgia. Garantir hidratação adequada pelo risco de hipotensão postural com jejum prolongado.",
    fonteReferenciaNumero: 2,
    fontePagina: "Texto p.3; Tabela p.4",
  },
  {
    id: "terazosina",
    nomeGenerico: "Terazosina",
    nomesComerciais: [],
    classe: "cardiovascular",
    subclasse: "a-Adrenoceptor blockers (alfabloqueadores)",
    regra: { tipo: "continuar" },
    racional:
      "Bloqueiam a vasculatura periférica (receptores alfa-1), causando vasodilatação e hipotensão postural. Não há dados robustos sobre risco de continuar vs. suspender; é geralmente aceito manter no dia da cirurgia.",
    situacoesEspeciais:
      "Indicados para controle pressórico em pacientes preparando ressecção de feocromocitoma — devem tomar a medicação no dia da cirurgia. Garantir hidratação adequada pelo risco de hipotensão postural com jejum prolongado.",
    fonteReferenciaNumero: 2,
    fontePagina: "Texto p.3; Tabela p.4",
  },
  {
    id: "tansulosina",
    nomeGenerico: "Tansulosina",
    nomesComerciais: [],
    classe: "cardiovascular",
    subclasse: "a-Adrenoceptor blockers (alfabloqueadores)",
    regra: { tipo: "continuar" },
    racional:
      "Bloqueia seletivamente receptores alfa-1 (predomínio prostático/urinário). Discutida à parte no texto do artigo, embora não conste na lista nominal da tabela de alfabloqueadores.",
    situacoesEspeciais:
      "Meia-vida longa e bloqueio alfa-1 irreversível; associada a síndrome da íris flácida intraoperatória (IFIS) em cirurgia de catarata, mesmo anos após a suspensão. Como parar no dia da cirurgia não reduz o risco de IFIS, o grupo NÃO recomenda suspender por causa da cirurgia — lista de medicações precisa e comunicação ao oftalmologista são essenciais.",
    fonteReferenciaNumero: 2,
    fontePagina: "Texto p.3; Tabela p.4",
  },

  // ---------------------------------------------------------------------
  // Angiotensin-converting enzyme inhibitors (IECA)
  // ---------------------------------------------------------------------
  ...(
    [
      "Benazepril",
      "Captopril",
      "Enalapril",
      "Fosinopril",
      "Lisinopril",
      "Moexipril",
      "Quinapril",
      "Ramipril",
    ] as const
  ).map(
    (nome): Farmaco => ({
      id: nome.toLowerCase(),
      nomeGenerico: nome,
      nomesComerciais: [],
      classe: "cardiovascular",
      subclasse: "Angiotensin-converting enzyme inhibitors (IECA)",
      regra: { tipo: "suspender_dia_cirurgia" },
      racional:
        "Inibem a conversão de angiotensina I em II, causando vasodilatação e queda da PA. Uso no dia da cirurgia associado a hipotensão intraoperatória significativa (por vezes pouco responsiva a fluidos/vasopressores convencionais como fenilefrina), lesão renal aguda pós-operatória, eventos cardiovasculares/cerebrovasculares maiores e maior tempo de internação.",
      situacoesEspeciais:
        "Considerar CONTINUAR em procedimentos de baixo risco, minimamente invasivos, com sedação mínima ou anestesia local. Não-retomada em até 14 dias pós-cirurgia associada a aumento de mortalidade em 30 dias (HR 3,44; IC95% 3,30-3,60; p<0,001) — reiniciar rapidamente no pós-operatório. Nota: o ACC/AHA 2014 recomenda continuar (classe IIa, nível B), divergindo da SPAQI. O grupo POQI (organização externa, não é a SPAQI) recomenda suspender IECA/BRA por 24h antes da cirurgia com reinício em até 48h — a recomendação da própria SPAQI é apenas 'suspender a dose da manhã da cirurgia', sem número fixo de dias de antecedência.",
      fonteReferenciaNumero: 2,
      fontePagina: "Texto p.3-5; Tabela p.4",
    })
  ),

  // ---------------------------------------------------------------------
  // Angiotensin II receptor blockers (BRA)
  // ---------------------------------------------------------------------
  ...(
    [
      "Azilsartana",
      "Candesartana",
      "Eprosartana",
      "Irbesartana",
      "Losartana",
      "Olmesartana",
      "Telmisartana",
      "Valsartana",
    ] as const
  ).map(
    (nome): Farmaco => ({
      id: nome.toLowerCase(),
      nomeGenerico: nome,
      nomesComerciais: [],
      classe: "cardiovascular",
      subclasse: "Angiotensin II receptor blockers (BRA)",
      regra: { tipo: "suspender_dia_cirurgia" },
      racional:
        "Bloqueiam o receptor AT1 de angiotensina II; perfil de efeitos adversos mais favorável que o IECA (menos tosse/angioedema, pois a produção de bradicinina é menor). Mesmos riscos perioperatórios de hipotensão intraoperatória e lesão renal aguda pós-operatória do IECA — embora um estudo retrospectivo recente (Yoon et al.) não tenha encontrado aumento de hipotensão após indução de anestesia geral em usuários de BRA.",
      situacoesEspeciais:
        "Considerar CONTINUAR em procedimentos de baixo risco/minimamente invasivos (ver seção de procedimentos menores). Mesma nuance do IECA quanto ao número de dias: a SPAQI só recomenda pular a dose da manhã da cirurgia, sem N de dias fixo (o '24h antes' é uma recomendação do POQI, uma organização diferente).",
      fonteReferenciaNumero: 2,
      fontePagina: "Texto p.3-5; Tabela p.4",
    })
  ),

  // ---------------------------------------------------------------------
  // Angiotensin receptor–neprilysin inhibitor (ARNI)
  // ---------------------------------------------------------------------
  {
    id: "sacubitril_valsartana",
    nomeGenerico: "Sacubitril/Valsartana",
    nomesComerciais: [],
    classe: "cardiovascular",
    subclasse: "Angiotensin receptor–neprilysin inhibitor (ARNI)",
    regra: { tipo: "suspender_dia_cirurgia" },
    racional:
      "Combina inibição de neprilisina (sacubitril) com bloqueio do receptor AT1 (valsartana); usado em insuficiência cardíaca com FEVE ≤40%. Efeitos adversos principais: hipotensão, hiperpotassemia, tosse, tontura, insuficiência renal. Não há dados publicados sobre uso perioperatório do sacubitril isolado — recomendação extrapolada das recomendações para IECA/BRA.",
    situacoesEspeciais:
      "Considerar interconsulta com cardiologia se prescrito para IC com FE reduzida grave. Descontinuação em pacientes com IC é considerada controversa e melhor decidida caso a caso, idealmente consultando o médico prescritor. Se suspenso, reiniciar assim que possível no pós-operatório.",
    fonteReferenciaNumero: 2,
    fontePagina: "Texto p.6; Tabela p.4",
  },

  // ---------------------------------------------------------------------
  // b-Adrenoceptor blockers (betabloqueadores)
  // ---------------------------------------------------------------------
  ...(
    ["Atenolol", "Bisoprolol", "Carvedilol", "Metoprolol", "Propranolol"] as const
  ).map(
    (nome): Farmaco => ({
      id: nome.toLowerCase(),
      nomeGenerico: nome,
      nomesComerciais: [],
      classe: "cardiovascular",
      subclasse: "b-Adrenoceptor blockers (betabloqueadores)",
      regra: { tipo: "continuar" },
      racional:
        "Inibem a ação das catecolaminas nos receptores beta, reduzindo os efeitos cronotrópico/inotrópico cardíacos e a demanda de oxigênio. Estudos mostram que a descontinuação abrupta no período perioperatório aumenta eventos cardiovasculares e mortalidade (risco de retirada/rebote).",
      situacoesEspeciais:
        "Nenhuma consideração adicional específica listada na tabela. A prática evoluiu do uso indiscriminado de betabloqueio perioperatório para uma abordagem mais criteriosa — não se recomenda iniciar betabloqueador na véspera da cirurgia, apenas manter quem já usa cronicamente.",
      fonteReferenciaNumero: 2,
      fontePagina: "Texto p.6; Tabela p.4",
    })
  ),
  {
    id: "sotalol_betabloqueador",
    nomeGenerico: "Sotalol",
    nomesComerciais: [],
    classe: "cardiovascular",
    subclasse: "b-Adrenoceptor blockers (betabloqueadores)",
    regra: { tipo: "continuar" },
    racional:
      "Inibe a ação das catecolaminas nos receptores beta, reduzindo os efeitos cronotrópico/inotrópico cardíacos e a demanda de oxigênio. Estudos mostram que a descontinuação abrupta no período perioperatório aumenta eventos cardiovasculares e mortalidade (risco de retirada/rebote). O sotalol também é classificado como antiarrítmico de classe III no mesmo artigo (ver subclasse 'Class III antiarrhythmic agents') — mesma recomendação de continuar nas duas classificações.",
    situacoesEspeciais:
      "Nenhuma consideração adicional específica listada na tabela para o efeito betabloqueador. Ver também as considerações de QTc/proarritmia listadas na entrada de sotalol como antiarrítmico classe III.",
    fonteReferenciaNumero: 2,
    fontePagina: "Texto p.6; Tabela p.4",
  },

  // ---------------------------------------------------------------------
  // Calcium-channel blockers (bloqueadores de canal de cálcio)
  // ---------------------------------------------------------------------
  ...(["Amlodipina", "Diltiazem", "Felodipina", "Nifedipina"] as const).map(
    (nome): Farmaco => ({
      id: nome.toLowerCase(),
      nomeGenerico: nome,
      nomesComerciais: [],
      classe: "cardiovascular",
      subclasse: "Calcium-channel blockers (bloqueadores de canal de cálcio)",
      regra: { tipo: "continuar" },
      racional:
        "Bloqueiam canais de cálcio tipo L nos nós sinoatrial/AV, miócitos e músculo liso vascular. Continuar parece relativamente seguro — síndrome de retirada não costuma ocorrer, embora suspensão abrupta tenha sido associada a vasoespasmo coronariano em pacientes de revascularização. Diltiazem contínuo associado a hemodinâmica mais estável e menor mortalidade em cirurgia cardíaca; uma metanálise associou o uso de BCC a menos isquemia e arritmias atriais em cirurgia não-cardíaca. (Classe dividida farmacologicamente em di-hidropiridínicos e não-di-hidropiridínicos, mas a tabela do artigo não distingue a recomendação entre os subtipos.)",
      situacoesEspeciais:
        "Em fibrilação atrial com resposta ventricular rápida, um BCC não-di-hidropiridínico (ex.: diltiazem) associado a betabloqueador exige cautela se ambos forem mantidos no dia da cirurgia, pelo efeito depressor aditivo na condução AV. Preocupação sobre risco de sangramento com BCC foi levantada, mas não confirmada (dados conflitantes).",
      fonteReferenciaNumero: 2,
      fontePagina: "Texto p.6-7; Tabela p.4",
    })
  ),

  // ---------------------------------------------------------------------
  // Centrally acting sympatholytic medications (simpatolíticos de ação central)
  // ---------------------------------------------------------------------
  {
    id: "clonidina",
    nomeGenerico: "Clonidina",
    nomesComerciais: [],
    classe: "cardiovascular",
    subclasse:
      "Centrally acting sympatholytic medications (simpatolíticos de ação central)",
    regra: { tipo: "continuar" },
    racional:
      "Reduz o efluxo simpático central via receptores alfa-2. Pode causar bloqueio AV, especialmente se combinada com outros simpatolíticos (ex.: dexmedetomidina). Descontinuação abrupta pode precipitar taquicardia e hipertensão rebote — por isso a interrupção não é recomendada no período perioperatório.",
    situacoesEspeciais:
      "Se em adesivo transdérmico, deve ser continuada — mas a absorção pelo adesivo pode ser variável no cenário operatório, recomendando-se monitorização mais próxima e medidas adicionais de controle pressórico. Se a via oral for convertida para adesivo no perioperatório, concentrações plasmáticas terapêuticas só são atingidas em 2-3 dias após a aplicação — é preciso sobrepor com a via oral ou usar outra medicação nesse intervalo. Ao remover o adesivo, as concentrações plasmáticas declinam lentamente (meia-vida ~20h), dificultando reverter hipotensão ou bloqueio AV, se ocorrerem.",
    fonteReferenciaNumero: 2,
    fontePagina: "Texto p.7; Tabela p.4",
  },
  {
    id: "guanabenzo",
    nomeGenerico: "Guanabenzo",
    nomesComerciais: [],
    classe: "cardiovascular",
    subclasse:
      "Centrally acting sympatholytic medications (simpatolíticos de ação central)",
    regra: { tipo: "continuar" },
    racional:
      "Reduz o efluxo simpático central via receptores alfa-2. Descontinuação abrupta pode precipitar taquicardia e hipertensão rebote — por isso a interrupção não é recomendada no período perioperatório.",
    situacoesEspeciais:
      "Mesmo risco geral de taquicardia/hipertensão rebote com descontinuação abrupta da classe; sem considerações de formulação transdérmica como a da clonidina.",
    fonteReferenciaNumero: 2,
    fontePagina: "Texto p.7; Tabela p.4",
  },
  {
    id: "guanfacina",
    nomeGenerico: "Guanfacina",
    nomesComerciais: [],
    classe: "cardiovascular",
    subclasse:
      "Centrally acting sympatholytic medications (simpatolíticos de ação central)",
    regra: { tipo: "continuar" },
    racional:
      "Reduz o efluxo simpático central via receptores alfa-2. Descontinuação abrupta pode precipitar taquicardia e hipertensão rebote — por isso a interrupção não é recomendada no período perioperatório.",
    situacoesEspeciais:
      "Mesmo risco geral de taquicardia/hipertensão rebote com descontinuação abrupta da classe; sem considerações de formulação transdérmica como a da clonidina.",
    fonteReferenciaNumero: 2,
    fontePagina: "Texto p.7; Tabela p.4",
  },

  // ---------------------------------------------------------------------
  // Direct-acting vasodilators (vasodilatadores diretos)
  // ---------------------------------------------------------------------
  {
    id: "hidralazina",
    nomeGenerico: "Hidralazina",
    nomesComerciais: [],
    classe: "cardiovascular",
    subclasse: "Direct-acting vasodilators (vasodilatadores diretos)",
    regra: { tipo: "continuar" },
    racional:
      "Dilata arteríolas sem efeito venoso, causando venoconstrição reflexa e retorno venoso aumentado, com efeitos inotrópico/cronotrópico positivos reflexos. Efeitos adversos: taquicardia e retenção de fluidos (por isso frequentemente combinada com simpatolítico e diurético). Não há dados diretos para guiar o manejo perioperatório; por analogia a outros anti-hipertensivos, recomenda-se continuar.",
    situacoesEspeciais:
      "A forma intravenosa é comumente usada no período perioperatório imediato como fármaco de resgate para controle pressórico quando bradicardia é uma preocupação — ou seja, também é usada agudamente no intraoperatório, além do uso oral crônico.",
    fonteReferenciaNumero: 2,
    fontePagina: "Texto p.7; Tabela p.4",
  },

  // ---------------------------------------------------------------------
  // Loop diuretics (diuréticos de alça)
  // ---------------------------------------------------------------------
  ...(["Bumetanida", "Furosemida", "Torsemida"] as const).map(
    (nome): Farmaco => ({
      id: nome.toLowerCase(),
      nomeGenerico: nome,
      nomesComerciais: [],
      classe: "cardiovascular",
      subclasse: "Loop diuretics (diuréticos de alça)",
      regra: { tipo: "suspender_dia_cirurgia" },
      racional:
        "Bloqueiam a reabsorção de sódio na alça de Henle, promovendo diurese e redução do volume extracelular; hipocalemia é efeito adverso comum. Existe preocupação teórica com hipovolemia/depleção intravascular piorando a hipotensão sob anestesia, mas um RCT duplo-cego (n=193, subdimensionado, só cirurgia eletiva) não mostrou aumento significativo de hipotensão intraoperatória nem de eventos cardiovasculares pós-operatórios ao continuar a furosemida na manhã da cirurgia.",
      situacoesEspeciais:
        "Considerar CONTINUAR em pacientes com/sob risco de sobrecarga de volume, ou em cirurgias de risco muito baixo (ex.: catarata) com sedação mínima/anestesia local. Avaliar status hídrico antes de decidir suspender ou manter. Hipocalemia crônica por diurético pode aumentar risco de arritmia perioperatória, mas suspender o diurético na manhã da cirurgia não altera substancialmente anormalidades eletrolíticas crônicas. Um estudo observacional em 3,6 milhões de pacientes associou o uso agudo de IECA ou diuréticos a risco levemente maior de lesão renal aguda pós-operatória (não fica claro se suspender mitiga esse risco). O POQI recomenda decisão individualizada por falta de evidência definitiva de dano ao continuar. A SPAQI teve extenso debate interno antes de chegar a este consenso.",
      fonteReferenciaNumero: 2,
      fontePagina: "Texto p.7-9; Tabela p.4",
    })
  ),

  // ---------------------------------------------------------------------
  // Thiazide diuretics (diuréticos tiazídicos)
  // ---------------------------------------------------------------------
  ...(
    ["Clortalidona", "Hidroclorotiazida", "Indapamida", "Metolazona"] as const
  ).map(
    (nome): Farmaco => ({
      id: nome.toLowerCase(),
      nomeGenerico: nome,
      nomesComerciais: [],
      classe: "cardiovascular",
      subclasse: "Thiazide diuretics (diuréticos tiazídicos)",
      regra: { tipo: "continuar" },
      racional:
        "Promovem excreção de sódio no túbulo contorcido distal; menos potentes que diuréticos de alça. Podem causar hipocalemia. O POQI concluiu que não há evidência para suspender tiazídicos na manhã da cirurgia.",
      situacoesEspeciais:
        "Mesma preocupação geral de anormalidades eletrolíticas do grupo dos diuréticos — recomenda-se avaliação individualizada do status hídrico/histórico antes de decidir.",
      fonteReferenciaNumero: 2,
      fontePagina: "Texto p.7-9; Tabela p.4",
    })
  ),

  // ---------------------------------------------------------------------
  // Potassium-sparing diuretics (diuréticos poupadores de potássio)
  // ---------------------------------------------------------------------
  ...(["Eplerenona", "Espironolactona", "Triamtereno"] as const).map(
    (nome): Farmaco => ({
      id: nome.toLowerCase(),
      nomeGenerico: nome,
      nomesComerciais: [],
      classe: "cardiovascular",
      subclasse: "Potassium-sparing diuretics (diuréticos poupadores de potássio)",
      regra: { tipo: "continuar" },
      racional:
        "Inibem a reabsorção de sódio no túbulo distal tardio/ducto coletor, sem perda de potássio.",
      situacoesEspeciais:
        "Avaliar status hídrico antes de decidir suspender ou continuar. Hiperpotassemia pode potencializar arritmias, especialmente se associado a IECA/BRA (os mesmos pacientes muitas vezes usam ambos) — considerar avaliação de eletrólitos pré-operatória, particularmente se a terapia foi iniciada recentemente. Um RCT duplo-cego, placebo-controlado, especificamente com espironolactona em cirurgia cardíaca não encontrou efeito protetor contra lesão renal aguda, com tendência a maior risco. O POQI não abordou diuréticos poupadores de potássio em suas recomendações.",
      fonteReferenciaNumero: 2,
      fontePagina: "Texto p.7-9; Tabela p.4",
    })
  ),

  // ---------------------------------------------------------------------
  // Endothelin receptor antagonists (antagonistas do receptor de endotelina)
  // ---------------------------------------------------------------------
  ...(["Ambrisentana", "Bosentana", "Macitentana"] as const).map(
    (nome): Farmaco => ({
      id: nome.toLowerCase(),
      nomeGenerico: nome,
      nomesComerciais: [],
      classe: "cardiovascular",
      subclasse:
        "Endothelin receptor antagonists (antagonistas do receptor de endotelina)",
      regra: { tipo: "continuar" },
      racional:
        "Usados no tratamento de hipertensão arterial pulmonar (HAP); bloqueiam receptores de endotelina, produzindo vasodilatação. Dados limitados sobre manejo perioperatório, mas dada a morbidade perioperatória associada à HAP e o risco de descompensação, geralmente se recomenda continuar.",
      situacoesEspeciais:
        "Frequentemente coadministrados com inibidores de PDE5 (sildenafila, tadalafila) — cautela extra ao adicionar outros vasodilatadores, particularmente nitratos. Bosentana é um forte indutor do CYP3A4 e pode reduzir a eficácia de analgésicos como oxicodona e hidrocodona, além do efeito anticoagulante da varfarina.",
      fonteReferenciaNumero: 2,
      fontePagina: "Texto p.9; Tabela p.4",
    })
  ),

  // ---------------------------------------------------------------------
  // Cardiac glycosides (glicosídeos cardíacos)
  // ---------------------------------------------------------------------
  {
    id: "digoxina",
    nomeGenerico: "Digoxina",
    nomesComerciais: [],
    classe: "cardiovascular",
    subclasse: "Cardiac glycosides (glicosídeos cardíacos)",
    regra: { tipo: "continuar" },
    racional:
      "Usada em insuficiência cardíaca com FE reduzida e em fibrilação atrial com resposta ventricular rápida em pacientes com PA baixa. Índice terapêutico estreito, meia-vida longa, excreção predominantemente renal. Toxicidade mais prevalente em idosos; risco de arritmia cardíaca aumentado com hipocalemia, hipomagnesemia, hipercalcemia e hipóxia. A evidência aponta maior risco de arritmia supraventricular ou exacerbação de IC pós-operatória se a digoxina for descontinuada no pré-operatório.",
    situacoesEspeciais:
      "Interações medicamentosas importantes que aumentam o risco de toxicidade digitálica e bloqueio cardíaco completo: eritromicina, azitromicina, claritromicina, bloqueadores de canal de cálcio (verapamil, diltiazem, nifedipina), betabloqueadores, diuréticos tiazídicos, metoclopramida, trimetoprima. Avaliar função renal e eletrólitos séricos no pré-operatório.",
    fonteReferenciaNumero: 2,
    fontePagina: "Texto p.9-10; Tabela p.4",
  },

  // ---------------------------------------------------------------------
  // Nitrodilators (nitrodilatadores)
  //
  // Usa `condicaoClinica` em vez de `regra` fixa: o próprio artigo condiciona
  // a recomendação padrão de "continuar" à ausência de angina recente/escalada
  // no uso — presença desses sinais é considerada instabilidade coronariana e
  // motiva reavaliação/possível adiamento, não uma simples suspensão com N de
  // dias (por isso mapeado como "individualizado", não como período fixo).
  // ---------------------------------------------------------------------
  ...(
    [
      ["dinitrato_isossorbida", "Dinitrato de isossorbida"],
      ["mononitrato_isossorbida", "Mononitrato de isossorbida"],
      ["nitroglicerina", "Nitroglicerina"],
    ] as const
  ).map(
    ([id, nome]): Farmaco => ({
      id,
      nomeGenerico: nome,
      nomesComerciais: [],
      classe: "cardiovascular",
      subclasse: "Nitrodilators (nitrodilatadores)",
      condicaoClinica: {
        pergunta:
          "Houve angina recente ou escalada no uso da medicação (ex.: necessidade de mais doses de nitroglicerina que o habitual) nas últimas semanas?",
        regraSeSim: {
          tipo: "individualizado",
          motivoIndividualizado:
            "O artigo não dá um protocolo numérico para este cenário — trata-se de um sinal de instabilidade coronariana. O consenso recomenda considerar suspender a medicação e adiar a cirurgia para avaliação, em vez de seguir a regra padrão de continuar. Decisão deve ser compartilhada com o cardiologista/equipe assistente.",
        },
        regraSeNao: { tipo: "continuar" },
      },
      racional:
        "Mimetizam óxido nítrico endógeno, causando vasodilatação predominantemente venosa (redução de pré-carga). Nitroglicerina é usada em emergências para baixar PA e aliviar angina; agentes de ação mais longa são usados para hipertensão e insuficiência cardíaca. Estudos limitados sugerem que continuar pode ser protetor/associado a menos isquemia; não foram encontrados estudos sobre consequências negativas de suspender.",
      situacoesEspeciais:
        "Razoável continuar em pacientes sem hipotensão significativa, dado o papel da medicação na doença cardíaca de base.",
      fonteReferenciaNumero: 2,
      fontePagina: "Texto p.10; Tabela p.4-5",
    })
  ),

  // ---------------------------------------------------------------------
  // Phosphodiesterase-5 inhibitors (inibidores da fosfodiesterase-5)
  //
  // Recomendação depende da INDICAÇÃO de uso (HAP vs. disfunção erétil) —
  // por isso usa `indicacoes` em vez de `regra` única.
  // ---------------------------------------------------------------------
  ...(["Avanafila", "Sildenafila", "Vardenafila"] as const).map(
    (nome): Farmaco => ({
      id: nome.toLowerCase(),
      nomeGenerico: nome,
      nomesComerciais: [],
      classe: "cardiovascular",
      subclasse: "Phosphodiesterase-5 inhibitors (inibidores da fosfodiesterase-5)",
      indicacoes: [
        {
          id: "hipertensao_pulmonar",
          descricao: "Hipertensão arterial pulmonar (HAP)",
          regra: { tipo: "continuar" },
        },
        {
          id: "disfuncao_eretil",
          descricao: "Disfunção erétil",
          regra: { tipo: "suspender_periodo_fixo", valor: 24, unidade: "horas" },
        },
      ],
      racional:
        "Drogas não-adrenérgicas/não-colinérgicas com ação inotrópica e vasodilatadora, aumentando a disponibilidade local de óxido nítrico endógeno. Têm efeito sinérgico com outros vasodilatadores, podendo causar hipotensão relevante. Neuropatia óptica isquêmica anterior (rara) foi relatada com o uso.",
      situacoesEspeciais:
        "Para HAP, o benefício de continuar supera o risco de hipotensão/neuropatia óptica; para disfunção erétil, é prudente suspender por não haver esse mesmo balanço de risco-benefício.",
      fonteReferenciaNumero: 2,
      fontePagina: "Texto p.10; Tabela p.4",
    })
  ),
  {
    id: "tadalafila",
    nomeGenerico: "Tadalafila",
    nomesComerciais: [],
    classe: "cardiovascular",
    subclasse: "Phosphodiesterase-5 inhibitors (inibidores da fosfodiesterase-5)",
    indicacoes: [
      {
        id: "hipertensao_pulmonar",
        descricao: "Hipertensão arterial pulmonar (HAP)",
        regra: { tipo: "continuar" },
      },
      {
        id: "disfuncao_eretil",
        descricao: "Disfunção erétil",
        regra: { tipo: "suspender_periodo_fixo", valor: 24, unidade: "horas" },
      },
    ],
    racional:
      "Droga não-adrenérgica/não-colinérgica com ação inotrópica e vasodilatadora, aumentando a disponibilidade local de óxido nítrico endógeno. Tem efeito sinérgico com outros vasodilatadores, podendo causar hipotensão relevante. Neuropatia óptica isquêmica anterior (rara) foi relatada com o uso.",
    situacoesEspeciais:
      "Para HAP, o benefício de continuar supera o risco de hipotensão/neuropatia óptica; para disfunção erétil, é prudente suspender por não haver esse mesmo balanço de risco-benefício. Tadalafila tem meia-vida longa, então a descontinuação para disfunção erétil deve ocorrer antes do dia da cirurgia para reduzir efeitos na pressão arterial — o artigo não especifica um número de dias diferente para tadalafila além de 'antes do dia da cirurgia', apenas reforça a orientação genérica de suspender com pelo menos 24h de antecedência.",
    fonteReferenciaNumero: 2,
    fontePagina: "Texto p.10; Tabela p.4",
  },

  // ---------------------------------------------------------------------
  // Class III antiarrhythmic agents (bloqueadores de canal de potássio)
  // ---------------------------------------------------------------------
  ...(["Amiodarona", "Dofetilida", "Dronedarona"] as const).map(
    (nome): Farmaco => ({
      id: nome.toLowerCase(),
      nomeGenerico: nome,
      nomesComerciais: [],
      classe: "cardiovascular",
      subclasse:
        "Class III antiarrhythmic agents (bloqueadores de canal de potássio)",
      regra: { tipo: "continuar" },
      racional:
        "Bloqueiam canais de potássio responsáveis pela repolarização de fase 3, prolongando o potencial de ação e prevenindo taquicardias de reentrada. São simultaneamente antiarrítmicos e proarrítmicos pelo potencial de prolongar o QTc e causar torsades de pointes — risco maior em síndrome do QT longo. Amiodarona pode causar bradicardia e bloqueio (efeito tipo classe IV), sendo contraindicada em bloqueio cardíaco ou disfunção do nó sinoatrial. Há risco de recorrência de arritmia se essas medicações forem abruptamente descontinuadas.",
      situacoesEspeciais:
        "Minimizar outras medicações que prolongam o QT; monitorar ECG, magnésio e potássio cuidadosamente; pode haver efeito inotrópico negativo, potencialmente pior com o uso de anestésicos inalatórios halogenados. Reiniciar assim que possível no pós-operatório, se suspenso. (Ibutilida e bretílio, também citados no texto do artigo, são formulações apenas IV para tratamento agudo de arritmias e não constam na tabela de medicações de manejo crônico.)",
      fonteReferenciaNumero: 2,
      fontePagina: "Texto p.10-11; Tabela p.4",
    })
  ),
  {
    id: "sotalol_classe_iii",
    nomeGenerico: "Sotalol",
    nomesComerciais: [],
    classe: "cardiovascular",
    subclasse: "Class III antiarrhythmic agents (bloqueadores de canal de potássio)",
    regra: { tipo: "continuar" },
    racional:
      "Bloqueia canais de potássio responsáveis pela repolarização de fase 3, prolongando o potencial de ação e prevenindo taquicardias de reentrada. É simultaneamente antiarrítmico e proarrítmico pelo potencial de prolongar o QTc e causar torsades de pointes — risco maior em síndrome do QT longo. Tem efeito betabloqueador associado (ver também a entrada de sotalol em 'b-Adrenoceptor blockers'). Há risco de recorrência de arritmia se descontinuado abruptamente.",
    situacoesEspeciais:
      "Minimizar outras medicações que prolongam o QT; monitorar ECG, magnésio e potássio cuidadosamente. Reiniciar assim que possível no pós-operatório, se suspenso.",
    fonteReferenciaNumero: 2,
    fontePagina: "Texto p.10-11; Tabela p.4",
  },

  // ---------------------------------------------------------------------
  // Potassium-channel openers (abridores de canal de potássio)
  // ---------------------------------------------------------------------
  {
    id: "minoxidil",
    nomeGenerico: "Minoxidil",
    nomesComerciais: [],
    classe: "cardiovascular",
    subclasse: "Potassium-channel openers (abridores de canal de potássio)",
    regra: { tipo: "continuar" },
    racional:
      "Relaxa o músculo liso de artérias pequenas e grandes, reduzindo a resistência vascular e a PA. Geralmente é um agente de terceira linha em pacientes com doença renal crônica. Único agente aprovado nesta classe.",
    situacoesEspeciais:
      "Nenhuma consideração perioperatória adicional listada além do uso típico como terapia de 3ª linha; sem dados perioperatórios diretos citados.",
    fonteReferenciaNumero: 2,
    fontePagina: "Texto p.7; Tabela p.4",
  },

  // ---------------------------------------------------------------------
  // Renin inhibitors (inibidores da renina)
  // ---------------------------------------------------------------------
  {
    id: "alisquireno",
    nomeGenerico: "Alisquireno",
    nomesComerciais: [],
    classe: "cardiovascular",
    subclasse: "Renin inhibitors (inibidores da renina)",
    regra: { tipo: "suspender_dia_cirurgia" },
    racional:
      "Inibe a renina, reduzindo a ativação do eixo renina-angiotensina-aldosterona. Tem efeitos aditivos quando combinado com diuréticos ou BRA. Baixa incidência de efeitos adversos, mas incluem angioedema e tosse. Risco aumentado de hiperpotassemia quando combinado com IECA, especialmente em diabéticos. Único agente disponível nesta classe.",
    situacoesEspeciais:
      "Monitorar presença de depleção de volume, pois o tratamento pode afetar adversamente a função renal. Contraindicado na gravidez. Não existem diretrizes específicas de outras sociedades para o manejo perioperatório desta classe — reinício pós-operatório deve ser cauteloso se houver depleção de volume ou hipotensão intraoperatória suspeitada.",
    fonteReferenciaNumero: 2,
    fontePagina: "Texto p.11; Tabela p.4",
  },

  // ---------------------------------------------------------------------
  // Class I antiarrhythmic agents (bloqueadores de canal de sódio — Ia/Ib/Ic)
  //
  // Nota: distinta da classe "Sodium-channel blocker (late sodium current) —
  // Ranolazina" mais abaixo, apesar do nome semelhante (ver comentário no
  // topo do arquivo).
  // ---------------------------------------------------------------------
  ...(["Disopiramida", "Procainamida", "Quinidina"] as const).map(
    (nome): Farmaco => ({
      id: nome.toLowerCase(),
      nomeGenerico: nome,
      nomesComerciais: [],
      classe: "cardiovascular",
      subclasse:
        "Class I antiarrhythmic agents (bloqueadores de canal de sódio — classes Ia, Ib, Ic)",
      regra: { tipo: "continuar" },
      racional:
        "Reduzem a velocidade e magnitude da despolarização, reduzindo a velocidade de condução no miocárdio e suprimindo taquicardias de reentrada. A subclasse Ia prolonga o QTc, aumentando o risco de torsades de pointes — cautela com uso concomitante de outras drogas que prolongam o QTc. Há pouca literatura sobre manejo perioperatório especificamente, mas, como são usadas para prevenir arritmias cardíacas, normalmente são continuadas no perioperatório.",
      situacoesEspeciais:
        "Nenhuma consideração adicional distinta listada na tabela para esta classe.",
      fonteReferenciaNumero: 2,
      fontePagina: "Texto p.11; Tabela p.4-5",
    })
  ),
  ...(
    [
      ["lidocaina", "Lidocaína"],
      ["mexiletina", "Mexiletina"],
    ] as const
  ).map(
    ([id, nome]): Farmaco => ({
      id,
      nomeGenerico: nome,
      nomesComerciais: [],
      classe: "cardiovascular",
      subclasse:
        "Class I antiarrhythmic agents (bloqueadores de canal de sódio — classes Ia, Ib, Ic)",
      regra: { tipo: "continuar" },
      racional:
        "Reduzem a velocidade e magnitude da despolarização, reduzindo a velocidade de condução no miocárdio e suprimindo taquicardias de reentrada. Há pouca literatura sobre manejo perioperatório especificamente, mas, como são usadas para prevenir arritmias cardíacas, normalmente são continuadas no perioperatório.",
      situacoesEspeciais:
        "Nenhuma consideração adicional distinta listada na tabela para esta classe.",
      fonteReferenciaNumero: 2,
      fontePagina: "Texto p.11; Tabela p.4-5",
    })
  ),
  ...(["Flecainida", "Propafenona"] as const).map(
    (nome): Farmaco => ({
      id: nome.toLowerCase(),
      nomeGenerico: nome,
      nomesComerciais: [],
      classe: "cardiovascular",
      subclasse:
        "Class I antiarrhythmic agents (bloqueadores de canal de sódio — classes Ia, Ib, Ic)",
      regra: { tipo: "continuar" },
      racional:
        "Reduzem a velocidade e magnitude da despolarização, reduzindo a velocidade de condução no miocárdio e suprimindo taquicardias de reentrada. Há pouca literatura sobre manejo perioperatório especificamente, mas, como são usadas para prevenir arritmias cardíacas, normalmente são continuadas no perioperatório.",
      situacoesEspeciais:
        "Nenhuma consideração adicional distinta listada na tabela para esta classe. Na tabela original do artigo, a linha da subclasse Ic aparece com célula mesclada à linha anterior (sem repetir explicitamente 'Continue'), mas o texto corrido trata a Classe I como bloco único recomendado 'CONTINUED' — interpretação consistente com o restante do artigo.",
      fonteReferenciaNumero: 2,
      fontePagina: "Texto p.11; Tabela p.4-5",
    })
  ),
  {
    id: "tocainida",
    nomeGenerico: "Tocainida",
    nomesComerciais: [],
    classe: "cardiovascular",
    subclasse:
      "Class I antiarrhythmic agents (bloqueadores de canal de sódio — classes Ia, Ib, Ic)",
    regra: { tipo: "continuar" },
    racional:
      "Reduz a velocidade e magnitude da despolarização, reduzindo a velocidade de condução no miocárdio e suprimindo taquicardias de reentrada. Há pouca literatura sobre manejo perioperatório especificamente, mas, como é usada para prevenir arritmias cardíacas, normalmente é continuada no perioperatório.",
    situacoesEspeciais:
      "Nota: tocainida foi retirada do mercado nos EUA por toxicidade e é praticamente obsoleta na prática clínica atual. Está listada aqui porque consta na tabela original do artigo (possivelmente por completude mecanística) — não omitida por fidelidade à fonte, mas vale considerar a relevância clínica real antes de destacá-la no app.",
    fonteReferenciaNumero: 2,
    fontePagina: "Texto p.11; Tabela p.4-5",
  },

  // ---------------------------------------------------------------------
  // Sodium-channel blocker (late sodium current) — Ranolazina
  //
  // Nota: classe DISTINTA de "Class I antiarrhythmic agents (sodium-channel
  // blockers)" acima, apesar do nome muito similar usado no artigo.
  // ---------------------------------------------------------------------
  {
    id: "ranolazina",
    nomeGenerico: "Ranolazina",
    nomesComerciais: [],
    classe: "cardiovascular",
    subclasse: "Sodium-channel blocker (late sodium current) — Ranolazina",
    regra: { tipo: "continuar" },
    racional:
      "Aprovada para angina crônica; mecanismo não totalmente entendido, mas atribuído à inibição da corrente tardia de sódio nos miócitos, reduzindo a sobrecarga de cálcio intracelular e a disfunção contrátil diastólica. Prolonga o QTc (recomenda-se ECG dentro de poucas semanas do início da terapia). Não existem dados sobre manejo perioperatório; como não afeta a estabilidade hemodinâmica, o consenso do grupo foi continuar.",
    situacoesEspeciais:
      "Nenhuma consideração adicional além do monitoramento de QTc geral da classe de antiarrítmicos.",
    fonteReferenciaNumero: 2,
    fontePagina: "Texto p.12; Tabela p.5",
  },

  // ---------------------------------------------------------------------
  // Sodium glucose cotransporter-2 inhibitors (SGLT2i)
  // ---------------------------------------------------------------------
  ...(["Dapagliflozina", "Empagliflozina", "Canagliflozina"] as const).map(
    (nome): Farmaco => ({
      id: nome.toLowerCase(),
      nomeGenerico: nome,
      nomesComerciais: [],
      classe: "cardiovascular",
      subclasse: "Sodium glucose cotransporter-2 inhibitors (SGLT2i)",
      regra: { tipo: "suspender_periodo_fixo", valor: 3, unidade: "dias" },
      racional:
        "Aprovados para insuficiência cardíaca com FE reduzida (com ou sem diabetes), com mecanismos cardiorrenais protetores (glicosúria, natriurese, melhora do controle pressórico, aumento da oferta de oxigênio cardíaco, prevenção de remodelamento). Em diabéticos, risco de cetoacidose diabética euglicêmica (eDKA), precipitada por jejum perioperatório, desidratação, doença aguda, dietas cetogênicas de baixo carboidrato ou neoplasia maligna subjacente. Em não-diabéticos, o risco não está bem estabelecido, mas um caso relatado de eDKA com hipoglicemia em paciente não-diabético usando dapagliflozina no dia de troca valvar motivou a extensão da recomendação também a não-diabéticos, dada a falta de dados de segurança de longo prazo. Aplica-se independentemente do paciente ter ou não diagnóstico de diabetes.",
      situacoesEspeciais:
        "Recomendação de suspender por 3-4 dias já respaldada por statement SPAQI anterior sobre medicações endócrinas/diabetes (referência 16 do artigo) e pela recomendação regulatória da FDA.",
      fonteReferenciaNumero: 2,
      fontePagina: "Texto p.12; Tabela p.5",
    })
  ),
  {
    id: "ertugliflozina",
    nomeGenerico: "Ertugliflozina",
    nomesComerciais: [],
    classe: "cardiovascular",
    subclasse: "Sodium glucose cotransporter-2 inhibitors (SGLT2i)",
    regra: { tipo: "suspender_periodo_fixo", valor: 4, unidade: "dias" },
    racional:
      "Aprovada para insuficiência cardíaca com FE reduzida (com ou sem diabetes), com mecanismos cardiorrenais protetores (glicosúria, natriurese, melhora do controle pressórico, aumento da oferta de oxigênio cardíaco, prevenção de remodelamento). Em diabéticos, risco de cetoacidose diabética euglicêmica (eDKA), precipitada por jejum perioperatório, desidratação, doença aguda, dietas cetogênicas de baixo carboidrato ou neoplasia maligna subjacente. Em não-diabéticos, o risco não está bem estabelecido, mas a SPAQI estendeu a recomendação de suspensão também a não-diabéticos por falta de dados de segurança de longo prazo em toda a classe.",
    situacoesEspeciais:
      "Ertugliflozina tem um dia a mais de antecedência recomendado (4 dias) em comparação às demais gliflozinas da tabela (3 dias). Recomendação já respaldada por statement SPAQI anterior sobre medicações endócrinas/diabetes (referência 16 do artigo) e pela recomendação regulatória da FDA.",
    fonteReferenciaNumero: 2,
    fontePagina: "Texto p.12; Tabela p.5",
  },
];
