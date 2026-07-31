import { Farmaco } from "@/medperiop/types";

/**
 * Dados extraídos de DUAS fontes:
 *
 * 1) O'Rourke MJ, Keshock MC, Boxhorn CE, et al. Preoperative Management of
 *    Opioid and Nonopioid Analgesics: SPAQI Consensus Statement.
 *    Mayo Clin Proc. 2021;96(5):1325-1341. (opioides, relaxantes musculares,
 *    medicações para cefaleia — NÃO cobre AINEs nem gabapentinoides, ver nota
 *    de escopo abaixo)
 *
 * 2) Russell LA, Craig C, Flores EK, et al. Preoperative Management of
 *    Medications for Rheumatologic and HIV Diseases: SPAQI Consensus
 *    Statement. Mayo Clin Proc. 2022;97(8):1551-1571. (fonte real dos AINEs
 *    listados aqui — agrupados nesta categoria "Analgésicos" por decisão de
 *    UX, não porque vieram do artigo de analgésicos)
 *
 * Gabapentinoides (gabapentina/pregabalina) NÃO estão incluídos: o artigo de
 * analgésicos os excluiu de propósito, reservados para outro consensus
 * statement SPAQI ainda não incorporado a este app.
 *
 * Extraído coluna-por-coluna dos PDFs originais e conferido clinicamente
 * antes desta tradução para TypeScript — ver relatórios completos em
 * ~/Desktop/MedPeriOp-extracao-SPAQI/analgesicos.md e reumatologico-hiv.md
 */
export const FARMACOS_ANALGESICOS: Farmaco[] = [
  {
    id: "codeina",
    nomeGenerico: "Codeína",
    nomesComerciais: [],
    classe: "analgesicos",
    subclasse: "Opioides agonistas (uso crônico para dor)",
    regra: { tipo: "continuar" },
    racional:
      "Pacientes opioide-tolerantes têm escores de dor mais altos, resolução mais lenta da dor e internação mais longa quando o opioide é suspenso; risco de hiperalgesia e piora do controle álgico se reduzido abruptamente perto da cirurgia. A tolerância analgésica não 'resolve' rapidamente (meses), enquanto a tolerância ao efeito depressor respiratório resolve em dias a semanas, criando risco de depressão respiratória se doses altas forem mantidas após um período de abstinência involuntária.",
    situacoesEspeciais:
      "Pacientes em terapia crônica provavelmente vão precisar de doses de opioide maiores que o usual para controle da dor, ou de analgesia não-opioide adjuvante no perioperatório. Codeína e tramadol são pró-fármacos que dependem de metabolismo via CYP2D6 (inibidores como difenidramina, cimetidina, ropivacaína, metoclopramida podem reduzir a conversão e causar analgesia inadequada). Opioides com atividade inibidora de recaptação de serotonina (levorfanol, meperidina, fentanil, metadona, tapentadol, tramadol) aumentam risco de síndrome serotoninérgica com IMAOs, ISRSs, ISRSNs, tricíclicos terciários, trazodona, dextrometorfano, linezolida, ritonavir, sibutramina, ondansetron, granisetron, metoclopramida, triptanos, triptofano, erva-de-são-joão, ginseng. Adesivo transdérmico de fentanil não deve ficar sob aquecedor de ar forçado (aumenta liberação). Evitar meperidina, codeína e morfina em insuficiência renal (TFG <30 mL/min/1,73m²) e DRC terminal; tramadol e tapentadol não recomendados nesse cenário; hidrocodona, oxicodona e hidromorfona com cautela e ajuste de dose; fentanil, sufentanil e metadona são preferidos em insuficiência renal/DRC terminal. Metadona só deve ser administrada por clínicos experientes (risco de acúmulo). Se redução de dose for desejada por outro motivo, deve ser individualizada e gradual (não mais que 10%/semana) — não deve ser feita apenas por causa da cirurgia. Meperidina tem entrada separada nesta lista (classificação diferente do restante da classe).",
    fonteReferenciaNumero: 8,
    fontePagina: "4-5, 7-8",
  },
  {
    id: "fentanil",
    nomeGenerico: "Fentanil",
    nomesComerciais: ["Duragesic", "Ionsys", "Subsys"],
    classe: "analgesicos",
    subclasse: "Opioides agonistas (uso crônico para dor)",
    regra: { tipo: "continuar" },
    racional:
      "Pacientes opioide-tolerantes têm escores de dor mais altos, resolução mais lenta da dor e internação mais longa quando o opioide é suspenso; risco de hiperalgesia e piora do controle álgico se reduzido abruptamente perto da cirurgia. A tolerância analgésica não 'resolve' rapidamente (meses), enquanto a tolerância ao efeito depressor respiratório resolve em dias a semanas, criando risco de depressão respiratória se doses altas forem mantidas após um período de abstinência involuntária.",
    situacoesEspeciais:
      "Pacientes em terapia crônica provavelmente vão precisar de doses de opioide maiores que o usual para controle da dor, ou de analgesia não-opioide adjuvante no perioperatório. Codeína e tramadol são pró-fármacos que dependem de metabolismo via CYP2D6 (inibidores como difenidramina, cimetidina, ropivacaína, metoclopramida podem reduzir a conversão e causar analgesia inadequada). Opioides com atividade inibidora de recaptação de serotonina (levorfanol, meperidina, fentanil, metadona, tapentadol, tramadol) aumentam risco de síndrome serotoninérgica com IMAOs, ISRSs, ISRSNs, tricíclicos terciários, trazodona, dextrometorfano, linezolida, ritonavir, sibutramina, ondansetron, granisetron, metoclopramida, triptanos, triptofano, erva-de-são-joão, ginseng. Adesivo transdérmico de fentanil não deve ficar sob aquecedor de ar forçado (aumenta liberação). Evitar meperidina, codeína e morfina em insuficiência renal (TFG <30 mL/min/1,73m²) e DRC terminal; tramadol e tapentadol não recomendados nesse cenário; hidrocodona, oxicodona e hidromorfona com cautela e ajuste de dose; fentanil, sufentanil e metadona são preferidos em insuficiência renal/DRC terminal. Metadona só deve ser administrada por clínicos experientes (risco de acúmulo). Se redução de dose for desejada por outro motivo, deve ser individualizada e gradual (não mais que 10%/semana) — não deve ser feita apenas por causa da cirurgia. Meperidina tem entrada separada nesta lista (classificação diferente do restante da classe).",
    fonteReferenciaNumero: 8,
    fontePagina: "4-5, 7-8",
  },
  {
    id: "hidrocodona",
    nomeGenerico: "Hidrocodona",
    nomesComerciais: ["Zohydro ER", "Hysingla ER", "Vantrela ER"],
    classe: "analgesicos",
    subclasse: "Opioides agonistas (uso crônico para dor)",
    regra: { tipo: "continuar" },
    racional:
      "Pacientes opioide-tolerantes têm escores de dor mais altos, resolução mais lenta da dor e internação mais longa quando o opioide é suspenso; risco de hiperalgesia e piora do controle álgico se reduzido abruptamente perto da cirurgia. A tolerância analgésica não 'resolve' rapidamente (meses), enquanto a tolerância ao efeito depressor respiratório resolve em dias a semanas, criando risco de depressão respiratória se doses altas forem mantidas após um período de abstinência involuntária.",
    situacoesEspeciais:
      "Pacientes em terapia crônica provavelmente vão precisar de doses de opioide maiores que o usual para controle da dor, ou de analgesia não-opioide adjuvante no perioperatório. Codeína e tramadol são pró-fármacos que dependem de metabolismo via CYP2D6 (inibidores como difenidramina, cimetidina, ropivacaína, metoclopramida podem reduzir a conversão e causar analgesia inadequada). Opioides com atividade inibidora de recaptação de serotonina (levorfanol, meperidina, fentanil, metadona, tapentadol, tramadol) aumentam risco de síndrome serotoninérgica com IMAOs, ISRSs, ISRSNs, tricíclicos terciários, trazodona, dextrometorfano, linezolida, ritonavir, sibutramina, ondansetron, granisetron, metoclopramida, triptanos, triptofano, erva-de-são-joão, ginseng. Adesivo transdérmico de fentanil não deve ficar sob aquecedor de ar forçado (aumenta liberação). Evitar meperidina, codeína e morfina em insuficiência renal (TFG <30 mL/min/1,73m²) e DRC terminal; tramadol e tapentadol não recomendados nesse cenário; hidrocodona, oxicodona e hidromorfona com cautela e ajuste de dose; fentanil, sufentanil e metadona são preferidos em insuficiência renal/DRC terminal. Metadona só deve ser administrada por clínicos experientes (risco de acúmulo). Se redução de dose for desejada por outro motivo, deve ser individualizada e gradual (não mais que 10%/semana) — não deve ser feita apenas por causa da cirurgia. Meperidina tem entrada separada nesta lista (classificação diferente do restante da classe).",
    fonteReferenciaNumero: 8,
    fontePagina: "4-5, 7-8",
  },
  {
    id: "hidromorfona",
    nomeGenerico: "Hidromorfona",
    nomesComerciais: ["Dilaudid", "Palladone", "Exalgo"],
    classe: "analgesicos",
    subclasse: "Opioides agonistas (uso crônico para dor)",
    regra: { tipo: "continuar" },
    racional:
      "Pacientes opioide-tolerantes têm escores de dor mais altos, resolução mais lenta da dor e internação mais longa quando o opioide é suspenso; risco de hiperalgesia e piora do controle álgico se reduzido abruptamente perto da cirurgia. A tolerância analgésica não 'resolve' rapidamente (meses), enquanto a tolerância ao efeito depressor respiratório resolve em dias a semanas, criando risco de depressão respiratória se doses altas forem mantidas após um período de abstinência involuntária.",
    situacoesEspeciais:
      "Pacientes em terapia crônica provavelmente vão precisar de doses de opioide maiores que o usual para controle da dor, ou de analgesia não-opioide adjuvante no perioperatório. Codeína e tramadol são pró-fármacos que dependem de metabolismo via CYP2D6 (inibidores como difenidramina, cimetidina, ropivacaína, metoclopramida podem reduzir a conversão e causar analgesia inadequada). Opioides com atividade inibidora de recaptação de serotonina (levorfanol, meperidina, fentanil, metadona, tapentadol, tramadol) aumentam risco de síndrome serotoninérgica com IMAOs, ISRSs, ISRSNs, tricíclicos terciários, trazodona, dextrometorfano, linezolida, ritonavir, sibutramina, ondansetron, granisetron, metoclopramida, triptanos, triptofano, erva-de-são-joão, ginseng. Adesivo transdérmico de fentanil não deve ficar sob aquecedor de ar forçado (aumenta liberação). Evitar meperidina, codeína e morfina em insuficiência renal (TFG <30 mL/min/1,73m²) e DRC terminal; tramadol e tapentadol não recomendados nesse cenário; hidrocodona, oxicodona e hidromorfona com cautela e ajuste de dose; fentanil, sufentanil e metadona são preferidos em insuficiência renal/DRC terminal. Metadona só deve ser administrada por clínicos experientes (risco de acúmulo). Se redução de dose for desejada por outro motivo, deve ser individualizada e gradual (não mais que 10%/semana) — não deve ser feita apenas por causa da cirurgia. Meperidina tem entrada separada nesta lista (classificação diferente do restante da classe).",
    fonteReferenciaNumero: 8,
    fontePagina: "4-5, 7-8",
  },
  {
    id: "levorfanol",
    nomeGenerico: "Levorfanol",
    nomesComerciais: ["Levo-Dromoran"],
    classe: "analgesicos",
    subclasse: "Opioides agonistas (uso crônico para dor)",
    regra: { tipo: "continuar" },
    racional:
      "Pacientes opioide-tolerantes têm escores de dor mais altos, resolução mais lenta da dor e internação mais longa quando o opioide é suspenso; risco de hiperalgesia e piora do controle álgico se reduzido abruptamente perto da cirurgia. A tolerância analgésica não 'resolve' rapidamente (meses), enquanto a tolerância ao efeito depressor respiratório resolve em dias a semanas, criando risco de depressão respiratória se doses altas forem mantidas após um período de abstinência involuntária.",
    situacoesEspeciais:
      "Pacientes em terapia crônica provavelmente vão precisar de doses de opioide maiores que o usual para controle da dor, ou de analgesia não-opioide adjuvante no perioperatório. Codeína e tramadol são pró-fármacos que dependem de metabolismo via CYP2D6 (inibidores como difenidramina, cimetidina, ropivacaína, metoclopramida podem reduzir a conversão e causar analgesia inadequada). Opioides com atividade inibidora de recaptação de serotonina (levorfanol, meperidina, fentanil, metadona, tapentadol, tramadol) aumentam risco de síndrome serotoninérgica com IMAOs, ISRSs, ISRSNs, tricíclicos terciários, trazodona, dextrometorfano, linezolida, ritonavir, sibutramina, ondansetron, granisetron, metoclopramida, triptanos, triptofano, erva-de-são-joão, ginseng. Adesivo transdérmico de fentanil não deve ficar sob aquecedor de ar forçado (aumenta liberação). Evitar meperidina, codeína e morfina em insuficiência renal (TFG <30 mL/min/1,73m²) e DRC terminal; tramadol e tapentadol não recomendados nesse cenário; hidrocodona, oxicodona e hidromorfona com cautela e ajuste de dose; fentanil, sufentanil e metadona são preferidos em insuficiência renal/DRC terminal. Metadona só deve ser administrada por clínicos experientes (risco de acúmulo). Se redução de dose for desejada por outro motivo, deve ser individualizada e gradual (não mais que 10%/semana) — não deve ser feita apenas por causa da cirurgia. Meperidina tem entrada separada nesta lista (classificação diferente do restante da classe).",
    fonteReferenciaNumero: 8,
    fontePagina: "4-5, 7-8",
  },
  {
    id: "metadona",
    nomeGenerico: "Metadona",
    nomesComerciais: ["Dolophine", "Methadose", "Diskets Dispersible"],
    classe: "analgesicos",
    subclasse: "Opioides agonistas (uso crônico para dor)",
    regra: { tipo: "continuar" },
    racional:
      "Pacientes opioide-tolerantes têm escores de dor mais altos, resolução mais lenta da dor e internação mais longa quando o opioide é suspenso; risco de hiperalgesia e piora do controle álgico se reduzido abruptamente perto da cirurgia. A tolerância analgésica não 'resolve' rapidamente (meses), enquanto a tolerância ao efeito depressor respiratório resolve em dias a semanas, criando risco de depressão respiratória se doses altas forem mantidas após um período de abstinência involuntária.",
    situacoesEspeciais:
      "Pacientes em terapia crônica provavelmente vão precisar de doses de opioide maiores que o usual para controle da dor, ou de analgesia não-opioide adjuvante no perioperatório. Codeína e tramadol são pró-fármacos que dependem de metabolismo via CYP2D6 (inibidores como difenidramina, cimetidina, ropivacaína, metoclopramida podem reduzir a conversão e causar analgesia inadequada). Opioides com atividade inibidora de recaptação de serotonina (levorfanol, meperidina, fentanil, metadona, tapentadol, tramadol) aumentam risco de síndrome serotoninérgica com IMAOs, ISRSs, ISRSNs, tricíclicos terciários, trazodona, dextrometorfano, linezolida, ritonavir, sibutramina, ondansetron, granisetron, metoclopramida, triptanos, triptofano, erva-de-são-joão, ginseng. Adesivo transdérmico de fentanil não deve ficar sob aquecedor de ar forçado (aumenta liberação). Evitar meperidina, codeína e morfina em insuficiência renal (TFG <30 mL/min/1,73m²) e DRC terminal; tramadol e tapentadol não recomendados nesse cenário; hidrocodona, oxicodona e hidromorfona com cautela e ajuste de dose; fentanil, sufentanil e metadona são preferidos em insuficiência renal/DRC terminal. Metadona só deve ser administrada por clínicos experientes (risco de acúmulo). Se redução de dose for desejada por outro motivo, deve ser individualizada e gradual (não mais que 10%/semana) — não deve ser feita apenas por causa da cirurgia. Meperidina tem entrada separada nesta lista (classificação diferente do restante da classe).",
    fonteReferenciaNumero: 8,
    fontePagina: "4-5, 7-8",
  },
  {
    id: "morfina",
    nomeGenerico: "Morfina",
    nomesComerciais: ["MS Contin", "Avinza", "Kadian", "Roxanol", "Arymo", "Oramorph SR", "RMS", "MSIR", "MorphaBond ER"],
    classe: "analgesicos",
    subclasse: "Opioides agonistas (uso crônico para dor)",
    regra: { tipo: "continuar" },
    racional:
      "Pacientes opioide-tolerantes têm escores de dor mais altos, resolução mais lenta da dor e internação mais longa quando o opioide é suspenso; risco de hiperalgesia e piora do controle álgico se reduzido abruptamente perto da cirurgia. A tolerância analgésica não 'resolve' rapidamente (meses), enquanto a tolerância ao efeito depressor respiratório resolve em dias a semanas, criando risco de depressão respiratória se doses altas forem mantidas após um período de abstinência involuntária.",
    situacoesEspeciais:
      "Pacientes em terapia crônica provavelmente vão precisar de doses de opioide maiores que o usual para controle da dor, ou de analgesia não-opioide adjuvante no perioperatório. Codeína e tramadol são pró-fármacos que dependem de metabolismo via CYP2D6 (inibidores como difenidramina, cimetidina, ropivacaína, metoclopramida podem reduzir a conversão e causar analgesia inadequada). Opioides com atividade inibidora de recaptação de serotonina (levorfanol, meperidina, fentanil, metadona, tapentadol, tramadol) aumentam risco de síndrome serotoninérgica com IMAOs, ISRSs, ISRSNs, tricíclicos terciários, trazodona, dextrometorfano, linezolida, ritonavir, sibutramina, ondansetron, granisetron, metoclopramida, triptanos, triptofano, erva-de-são-joão, ginseng. Adesivo transdérmico de fentanil não deve ficar sob aquecedor de ar forçado (aumenta liberação). Evitar meperidina, codeína e morfina em insuficiência renal (TFG <30 mL/min/1,73m²) e DRC terminal; tramadol e tapentadol não recomendados nesse cenário; hidrocodona, oxicodona e hidromorfona com cautela e ajuste de dose; fentanil, sufentanil e metadona são preferidos em insuficiência renal/DRC terminal. Metadona só deve ser administrada por clínicos experientes (risco de acúmulo). Se redução de dose for desejada por outro motivo, deve ser individualizada e gradual (não mais que 10%/semana) — não deve ser feita apenas por causa da cirurgia. Meperidina tem entrada separada nesta lista (classificação diferente do restante da classe).",
    fonteReferenciaNumero: 8,
    fontePagina: "4-5, 7-8",
  },
  {
    id: "oxicodona",
    nomeGenerico: "Oxicodona",
    nomesComerciais: ["Oxycontin", "Xtampza ER"],
    classe: "analgesicos",
    subclasse: "Opioides agonistas (uso crônico para dor)",
    regra: { tipo: "continuar" },
    racional:
      "Pacientes opioide-tolerantes têm escores de dor mais altos, resolução mais lenta da dor e internação mais longa quando o opioide é suspenso; risco de hiperalgesia e piora do controle álgico se reduzido abruptamente perto da cirurgia. A tolerância analgésica não 'resolve' rapidamente (meses), enquanto a tolerância ao efeito depressor respiratório resolve em dias a semanas, criando risco de depressão respiratória se doses altas forem mantidas após um período de abstinência involuntária.",
    situacoesEspeciais:
      "Pacientes em terapia crônica provavelmente vão precisar de doses de opioide maiores que o usual para controle da dor, ou de analgesia não-opioide adjuvante no perioperatório. Codeína e tramadol são pró-fármacos que dependem de metabolismo via CYP2D6 (inibidores como difenidramina, cimetidina, ropivacaína, metoclopramida podem reduzir a conversão e causar analgesia inadequada). Opioides com atividade inibidora de recaptação de serotonina (levorfanol, meperidina, fentanil, metadona, tapentadol, tramadol) aumentam risco de síndrome serotoninérgica com IMAOs, ISRSs, ISRSNs, tricíclicos terciários, trazodona, dextrometorfano, linezolida, ritonavir, sibutramina, ondansetron, granisetron, metoclopramida, triptanos, triptofano, erva-de-são-joão, ginseng. Adesivo transdérmico de fentanil não deve ficar sob aquecedor de ar forçado (aumenta liberação). Evitar meperidina, codeína e morfina em insuficiência renal (TFG <30 mL/min/1,73m²) e DRC terminal; tramadol e tapentadol não recomendados nesse cenário; hidrocodona, oxicodona e hidromorfona com cautela e ajuste de dose; fentanil, sufentanil e metadona são preferidos em insuficiência renal/DRC terminal. Metadona só deve ser administrada por clínicos experientes (risco de acúmulo). Se redução de dose for desejada por outro motivo, deve ser individualizada e gradual (não mais que 10%/semana) — não deve ser feita apenas por causa da cirurgia. Meperidina tem entrada separada nesta lista (classificação diferente do restante da classe).",
    fonteReferenciaNumero: 8,
    fontePagina: "4-5, 7-8",
  },
  {
    id: "oximorfona",
    nomeGenerico: "Oximorfona",
    nomesComerciais: ["Numorphan", "Opana", "Opana ER"],
    classe: "analgesicos",
    subclasse: "Opioides agonistas (uso crônico para dor)",
    regra: { tipo: "continuar" },
    racional:
      "Pacientes opioide-tolerantes têm escores de dor mais altos, resolução mais lenta da dor e internação mais longa quando o opioide é suspenso; risco de hiperalgesia e piora do controle álgico se reduzido abruptamente perto da cirurgia. A tolerância analgésica não 'resolve' rapidamente (meses), enquanto a tolerância ao efeito depressor respiratório resolve em dias a semanas, criando risco de depressão respiratória se doses altas forem mantidas após um período de abstinência involuntária.",
    situacoesEspeciais:
      "Pacientes em terapia crônica provavelmente vão precisar de doses de opioide maiores que o usual para controle da dor, ou de analgesia não-opioide adjuvante no perioperatório. Codeína e tramadol são pró-fármacos que dependem de metabolismo via CYP2D6 (inibidores como difenidramina, cimetidina, ropivacaína, metoclopramida podem reduzir a conversão e causar analgesia inadequada). Opioides com atividade inibidora de recaptação de serotonina (levorfanol, meperidina, fentanil, metadona, tapentadol, tramadol) aumentam risco de síndrome serotoninérgica com IMAOs, ISRSs, ISRSNs, tricíclicos terciários, trazodona, dextrometorfano, linezolida, ritonavir, sibutramina, ondansetron, granisetron, metoclopramida, triptanos, triptofano, erva-de-são-joão, ginseng. Adesivo transdérmico de fentanil não deve ficar sob aquecedor de ar forçado (aumenta liberação). Evitar meperidina, codeína e morfina em insuficiência renal (TFG <30 mL/min/1,73m²) e DRC terminal; tramadol e tapentadol não recomendados nesse cenário; hidrocodona, oxicodona e hidromorfona com cautela e ajuste de dose; fentanil, sufentanil e metadona são preferidos em insuficiência renal/DRC terminal. Metadona só deve ser administrada por clínicos experientes (risco de acúmulo). Se redução de dose for desejada por outro motivo, deve ser individualizada e gradual (não mais que 10%/semana) — não deve ser feita apenas por causa da cirurgia. Meperidina tem entrada separada nesta lista (classificação diferente do restante da classe).",
    fonteReferenciaNumero: 8,
    fontePagina: "4-5, 7-8",
  },
  {
    id: "sufentanil",
    nomeGenerico: "Sufentanil",
    nomesComerciais: ["Sufenta", "Dsuvia"],
    classe: "analgesicos",
    subclasse: "Opioides agonistas (uso crônico para dor)",
    regra: { tipo: "continuar" },
    racional:
      "Pacientes opioide-tolerantes têm escores de dor mais altos, resolução mais lenta da dor e internação mais longa quando o opioide é suspenso; risco de hiperalgesia e piora do controle álgico se reduzido abruptamente perto da cirurgia. A tolerância analgésica não 'resolve' rapidamente (meses), enquanto a tolerância ao efeito depressor respiratório resolve em dias a semanas, criando risco de depressão respiratória se doses altas forem mantidas após um período de abstinência involuntária.",
    situacoesEspeciais:
      "Pacientes em terapia crônica provavelmente vão precisar de doses de opioide maiores que o usual para controle da dor, ou de analgesia não-opioide adjuvante no perioperatório. Codeína e tramadol são pró-fármacos que dependem de metabolismo via CYP2D6 (inibidores como difenidramina, cimetidina, ropivacaína, metoclopramida podem reduzir a conversão e causar analgesia inadequada). Opioides com atividade inibidora de recaptação de serotonina (levorfanol, meperidina, fentanil, metadona, tapentadol, tramadol) aumentam risco de síndrome serotoninérgica com IMAOs, ISRSs, ISRSNs, tricíclicos terciários, trazodona, dextrometorfano, linezolida, ritonavir, sibutramina, ondansetron, granisetron, metoclopramida, triptanos, triptofano, erva-de-são-joão, ginseng. Adesivo transdérmico de fentanil não deve ficar sob aquecedor de ar forçado (aumenta liberação). Evitar meperidina, codeína e morfina em insuficiência renal (TFG <30 mL/min/1,73m²) e DRC terminal; tramadol e tapentadol não recomendados nesse cenário; hidrocodona, oxicodona e hidromorfona com cautela e ajuste de dose; fentanil, sufentanil e metadona são preferidos em insuficiência renal/DRC terminal. Metadona só deve ser administrada por clínicos experientes (risco de acúmulo). Se redução de dose for desejada por outro motivo, deve ser individualizada e gradual (não mais que 10%/semana) — não deve ser feita apenas por causa da cirurgia. Meperidina tem entrada separada nesta lista (classificação diferente do restante da classe).",
    fonteReferenciaNumero: 8,
    fontePagina: "4-5, 7-8",
  },
  {
    id: "tapentadol",
    nomeGenerico: "Tapentadol",
    nomesComerciais: ["Nucynta", "Nucynta ER"],
    classe: "analgesicos",
    subclasse: "Opioides agonistas (uso crônico para dor)",
    regra: { tipo: "continuar" },
    racional:
      "Pacientes opioide-tolerantes têm escores de dor mais altos, resolução mais lenta da dor e internação mais longa quando o opioide é suspenso; risco de hiperalgesia e piora do controle álgico se reduzido abruptamente perto da cirurgia. A tolerância analgésica não 'resolve' rapidamente (meses), enquanto a tolerância ao efeito depressor respiratório resolve em dias a semanas, criando risco de depressão respiratória se doses altas forem mantidas após um período de abstinência involuntária.",
    situacoesEspeciais:
      "Pacientes em terapia crônica provavelmente vão precisar de doses de opioide maiores que o usual para controle da dor, ou de analgesia não-opioide adjuvante no perioperatório. Codeína e tramadol são pró-fármacos que dependem de metabolismo via CYP2D6 (inibidores como difenidramina, cimetidina, ropivacaína, metoclopramida podem reduzir a conversão e causar analgesia inadequada). Opioides com atividade inibidora de recaptação de serotonina (levorfanol, meperidina, fentanil, metadona, tapentadol, tramadol) aumentam risco de síndrome serotoninérgica com IMAOs, ISRSs, ISRSNs, tricíclicos terciários, trazodona, dextrometorfano, linezolida, ritonavir, sibutramina, ondansetron, granisetron, metoclopramida, triptanos, triptofano, erva-de-são-joão, ginseng. Adesivo transdérmico de fentanil não deve ficar sob aquecedor de ar forçado (aumenta liberação). Evitar meperidina, codeína e morfina em insuficiência renal (TFG <30 mL/min/1,73m²) e DRC terminal; tramadol e tapentadol não recomendados nesse cenário; hidrocodona, oxicodona e hidromorfona com cautela e ajuste de dose; fentanil, sufentanil e metadona são preferidos em insuficiência renal/DRC terminal. Metadona só deve ser administrada por clínicos experientes (risco de acúmulo). Se redução de dose for desejada por outro motivo, deve ser individualizada e gradual (não mais que 10%/semana) — não deve ser feita apenas por causa da cirurgia. Meperidina tem entrada separada nesta lista (classificação diferente do restante da classe).",
    fonteReferenciaNumero: 8,
    fontePagina: "4-5, 7-8",
  },
  {
    id: "tramadol",
    nomeGenerico: "Tramadol",
    nomesComerciais: ["Ultram", "Ultram ER", "Ryzolt", "Rybix ODT", "ConZip", "FusePaq Synapryn"],
    classe: "analgesicos",
    subclasse: "Opioides agonistas (uso crônico para dor)",
    regra: { tipo: "continuar" },
    racional:
      "Pacientes opioide-tolerantes têm escores de dor mais altos, resolução mais lenta da dor e internação mais longa quando o opioide é suspenso; risco de hiperalgesia e piora do controle álgico se reduzido abruptamente perto da cirurgia. A tolerância analgésica não 'resolve' rapidamente (meses), enquanto a tolerância ao efeito depressor respiratório resolve em dias a semanas, criando risco de depressão respiratória se doses altas forem mantidas após um período de abstinência involuntária.",
    situacoesEspeciais:
      "Pacientes em terapia crônica provavelmente vão precisar de doses de opioide maiores que o usual para controle da dor, ou de analgesia não-opioide adjuvante no perioperatório. Codeína e tramadol são pró-fármacos que dependem de metabolismo via CYP2D6 (inibidores como difenidramina, cimetidina, ropivacaína, metoclopramida podem reduzir a conversão e causar analgesia inadequada). Opioides com atividade inibidora de recaptação de serotonina (levorfanol, meperidina, fentanil, metadona, tapentadol, tramadol) aumentam risco de síndrome serotoninérgica com IMAOs, ISRSs, ISRSNs, tricíclicos terciários, trazodona, dextrometorfano, linezolida, ritonavir, sibutramina, ondansetron, granisetron, metoclopramida, triptanos, triptofano, erva-de-são-joão, ginseng. Adesivo transdérmico de fentanil não deve ficar sob aquecedor de ar forçado (aumenta liberação). Evitar meperidina, codeína e morfina em insuficiência renal (TFG <30 mL/min/1,73m²) e DRC terminal; tramadol e tapentadol não recomendados nesse cenário; hidrocodona, oxicodona e hidromorfona com cautela e ajuste de dose; fentanil, sufentanil e metadona são preferidos em insuficiência renal/DRC terminal. Metadona só deve ser administrada por clínicos experientes (risco de acúmulo). Se redução de dose for desejada por outro motivo, deve ser individualizada e gradual (não mais que 10%/semana) — não deve ser feita apenas por causa da cirurgia. Meperidina tem entrada separada nesta lista (classificação diferente do restante da classe).",
    fonteReferenciaNumero: 8,
    fontePagina: "4-5, 7-8",
  },
  {
    id: "meperidina",
    nomeGenerico: "Meperidina",
    nomesComerciais: ["Demerol", "Meperitab"],
    classe: "analgesicos",
    subclasse: "Opioides agonistas — entrada separada",
    regra: {
      tipo: "individualizado",
      motivoIndividualizado:
        "Baixa eficácia analgésica, toxicidade (acúmulo de normeperidina, risco de convulsão) e múltiplas interações medicamentosas (incluindo risco de síndrome serotoninérgica) tornam a meperidina uma classificação separada do restante dos opioides agonistas. Recomenda-se usar o encontro cirúrgico como oportunidade para encaminhar o paciente a um médico perioperatório ou especialista em dor para avaliar se meperidina é de fato a melhor opção. Preferencialmente trocar por outro agonista opioide; se meperidina for a única opção viável, tomar normalmente no pré-operatório, incluindo o dia da cirurgia. Evitar em insuficiência renal/DRC terminal (metabólitos ativos).",
    },
    racional:
      "Baixa eficácia analgésica, toxicidade (acúmulo de normeperidina, risco de convulsão) e múltiplas interações medicamentosas (incluindo risco de síndrome serotoninérgica).",
    situacoesEspeciais:
      "Evitar em insuficiência renal/DRC terminal (metabólitos ativos). Preferir trocar por outro agonista opioide sempre que possível.",
    fonteReferenciaNumero: 8,
    fontePagina: "4, 8",
  },
  {
    id: "alvimopana",
    nomeGenerico: "Alvimopana",
    nomesComerciais: ["Entereg"],
    classe: "analgesicos",
    subclasse: "Opioides antagonistas (ação periférica)",
    regra: { tipo: "suspender_dia_cirurgia" },
    racional:
      "Antagonistas periféricos de receptor mu usados para tratar constipação/disfunção intestinal induzida por opioide (não revertem a analgesia central, exceto se houver ruptura de barreira hematoencefálica). Não há indicação clara para o uso no dia da cirurgia; monitorar para sintomas de abstinência se combinado com outros antagonistas.",
    situacoesEspeciais:
      "Naldemedina — evitar uso concomitante com indutores fortes de CYP3A (reduz eficácia); interação relevante com naloxona. Naloxegol — evitar com inibidores moderados/fortes de CYP3A4 (aumenta exposição); pode gerar falso-positivo em triagem de naloxona.",
    fonteReferenciaNumero: 8,
    fontePagina: "4, 8-9",
  },
  {
    id: "metilnaltrexona",
    nomeGenerico: "Metilnaltrexona",
    nomesComerciais: ["Relistor"],
    classe: "analgesicos",
    subclasse: "Opioides antagonistas (ação periférica)",
    regra: { tipo: "suspender_dia_cirurgia" },
    racional:
      "Antagonistas periféricos de receptor mu usados para tratar constipação/disfunção intestinal induzida por opioide (não revertem a analgesia central, exceto se houver ruptura de barreira hematoencefálica). Não há indicação clara para o uso no dia da cirurgia; monitorar para sintomas de abstinência se combinado com outros antagonistas.",
    situacoesEspeciais:
      "Naldemedina — evitar uso concomitante com indutores fortes de CYP3A (reduz eficácia); interação relevante com naloxona. Naloxegol — evitar com inibidores moderados/fortes de CYP3A4 (aumenta exposição); pode gerar falso-positivo em triagem de naloxona.",
    fonteReferenciaNumero: 8,
    fontePagina: "4, 8-9",
  },
  {
    id: "naldemedina",
    nomeGenerico: "Naldemedina",
    nomesComerciais: ["Symproic"],
    classe: "analgesicos",
    subclasse: "Opioides antagonistas (ação periférica)",
    regra: { tipo: "suspender_dia_cirurgia" },
    racional:
      "Antagonistas periféricos de receptor mu usados para tratar constipação/disfunção intestinal induzida por opioide (não revertem a analgesia central, exceto se houver ruptura de barreira hematoencefálica). Não há indicação clara para o uso no dia da cirurgia; monitorar para sintomas de abstinência se combinado com outros antagonistas.",
    situacoesEspeciais:
      "Naldemedina — evitar uso concomitante com indutores fortes de CYP3A (reduz eficácia); interação relevante com naloxona. Naloxegol — evitar com inibidores moderados/fortes de CYP3A4 (aumenta exposição); pode gerar falso-positivo em triagem de naloxona.",
    fonteReferenciaNumero: 8,
    fontePagina: "4, 8-9",
  },
  {
    id: "naloxegol",
    nomeGenerico: "Naloxegol",
    nomesComerciais: ["Movantik"],
    classe: "analgesicos",
    subclasse: "Opioides antagonistas (ação periférica)",
    regra: { tipo: "suspender_dia_cirurgia" },
    racional:
      "Antagonistas periféricos de receptor mu usados para tratar constipação/disfunção intestinal induzida por opioide (não revertem a analgesia central, exceto se houver ruptura de barreira hematoencefálica). Não há indicação clara para o uso no dia da cirurgia; monitorar para sintomas de abstinência se combinado com outros antagonistas.",
    situacoesEspeciais:
      "Naldemedina — evitar uso concomitante com indutores fortes de CYP3A (reduz eficácia); interação relevante com naloxona. Naloxegol — evitar com inibidores moderados/fortes de CYP3A4 (aumenta exposição); pode gerar falso-positivo em triagem de naloxona.",
    fonteReferenciaNumero: 8,
    fontePagina: "4, 8-9",
  },
  {
    id: "naloxona",
    nomeGenerico: "Naloxona",
    nomesComerciais: ["Narcan"],
    classe: "analgesicos",
    subclasse: "Opioides antagonistas (ação periférica)",
    regra: { tipo: "continuar" },
    racional:
      "Antagonista competitivo de receptores mu (maior afinidade), kappa e delta; via oral é inativada e não tem efeito sistêmico. Continuar no pré-operatório se administrada por via oral ou em combinação com outro medicamento — geralmente não há motivo para suspender em circunstâncias comuns. Quando não administrada por via oral, geralmente está sendo usada para reverter depressão respiratória em paciente instável.",
    situacoesEspeciais:
      "Se o paciente recebeu naloxona nas últimas 4 horas antes da cirurgia, a equipe de anestesia deve ser informada do motivo, timing, via e dose administrados.",
    fonteReferenciaNumero: 8,
    fontePagina: "5, 8-9",
  },
  {
    id: "naltrexona_oral",
    nomeGenerico: "Naltrexona oral",
    nomesComerciais: ["Revia"],
    classe: "analgesicos",
    subclasse: "Opioides antagonistas (ação periférica)",
    regra: { tipo: "suspender_periodo_fixo", valor: 2, unidade: "dias" },
    racional:
      "Antagonista competitivo de receptor opioide (mu/kappa/delta); meia-vida plasmática de 4h, mas seu metabólito ativo (6-β-naltrexol) tem meia-vida de 13h, e o efeito antagonista pode persistir por 2-3 dias após suspensão — daí a suspensão antecipada para permitir efeito analgésico de opioides se necessários no perioperatório.",
    situacoesEspeciais:
      "O artigo recomenda suspender de 2 a 3 dias antes de procedimentos eletivos, se opioides forem esperados no perioperatório (usado aqui o limite inferior da faixa, 2 dias — considerar até 3 dias conforme julgamento clínico). Também usada para dependência de álcool.",
    fonteReferenciaNumero: 8,
    fontePagina: "5, 9",
  },
  {
    id: "naltrexona_liberacao_prolongada",
    nomeGenerico: "Naltrexona de liberação prolongada (injetável mensal)",
    nomesComerciais: ["Vivitrol"],
    classe: "analgesicos",
    subclasse: "Opioides antagonistas (ação periférica)",
    regra: { tipo: "suspender_periodo_fixo", valor: 24, unidade: "dias" },
    racional:
      "Antagonista competitivo de mu/kappa/delta em formulação injetável mensal, útil em dependência de álcool; a resposta a analgésicos narcóticos pode ficar imprevisível dependendo do tempo desde a última dose — pode ocorrer desde depressão respiratória até efeito mínimo. Pouca analgesia é possível até 2 semanas após a injeção; monitorização próxima é necessária se opioides forem usados no pós-operatório.",
    situacoesEspeciais:
      "O artigo recomenda suspender de 24 a 30 dias após a última injeção, antes de procedimentos eletivos, se opioides forem esperados no perioperatório (usado aqui o limite inferior da faixa, 24 dias). Pode haver upregulation de receptores opioides secundária ao uso crônico da terapia, contribuindo para resposta variável/imprevisível a opioides no perioperatório.",
    fonteReferenciaNumero: 8,
    fontePagina: "5, 9-10",
  },
  {
    id: "buprenorfina",
    nomeGenerico: "Buprenorfina / buprenorfina-naloxona (terapia de manutenção)",
    nomesComerciais: [
      "Buprenorfina (Belbuca, Butrans, Probuphine, Sublocade, Buprenex, Subutex)",
      "Buprenorfina-naloxona (Suboxone, Bunavail, Zubsolv, Cassipa)",
    ],
    classe: "analgesicos",
    subclasse: "Opioides agonistas-antagonistas",
    regra: {
      tipo: "individualizado",
      motivoIndividualizado:
        "Duas escolas de pensamento sem resolução única: (1) continuar em dose plena e adicionar agonista mu completo se necessário — posição do aviso PAIN (Perioperative Pain and Addiction Interdisciplinary Network, ago/2019); (2) reduzir/tapear para ≤12mg/dia ao longo de 2-3 dias pré-operatórios. Fatores a considerar: dose diária, indicação (dor vs. dependência), risco de recaída, dor pós-operatória esperada. Decisão compartilhada com paciente, prescritor, cirurgião, anestesiologista e especialista em dor.",
    },
    racional:
      "Buprenorfina é agonista parcial de receptor mu, usada tanto para tratamento de dor quanto para transtorno por uso de opioide (TUO). Há consenso geral de que formulações de baixa dose usadas para dor podem ser continuadas no perioperatório sem controvérsia. A controvérsia real está nas doses mais altas (>12 mg/dia), tipicamente prescritas para TUO — não há consenso na literatura sobre o manejo perioperatório ideal dessas doses.",
    situacoesEspeciais:
      "O grupo SPAQI reconhece que, embora seja frequentemente apropriado continuar, há situações em que reduzir ou suspender a dose pode ser o manejo mais adequado — por exemplo, falta de experiência/conforto do médico ou de recursos perioperatórios para transição do paciente para o ambulatório. Sufentanil tem alta afinidade de ligação comparado a outros opioides e pode ser apropriado para controle de dor perioperatória em pacientes em uso de buprenorfina. Quando combinada com outros opioides para dor pós-operatória, monitorização respiratória é sugerida. Múltiplas interações medicamentosas (prolongamento de QT, síndrome serotoninérgica, íleo paralítico, redução do efeito analgésico, ou precipitação de abstinência); uso concomitante com agentes que prolongam QT é contraindicado.",
    fonteReferenciaNumero: 8,
    fontePagina: "5, 10-11",
  },
  {
    id: "butorfanol",
    nomeGenerico: "Butorfanol",
    nomesComerciais: ["Stadol", "Stadol NS"],
    classe: "analgesicos",
    subclasse: "Opioides agonistas-antagonistas",
    regra: { tipo: "continuar" },
    racional:
      "Agonistas-antagonistas parciais usados como adjuntos anestésicos ou para dor moderada a intensa; nas doses clinicamente relevantes, essas medicações não parecem bloquear a ação de agonistas mu completos, mas sim agir sinergicamente.",
    situacoesEspeciais:
      "Uso concomitante de butorfanol ou nalbufina com agentes serotonérgicos, anfetaminas ou IMAOs pode aumentar risco de síndrome serotoninérgica.",
    fonteReferenciaNumero: 8,
    fontePagina: "5, 10-11",
  },
  {
    id: "nalbufina",
    nomeGenerico: "Nalbufina",
    nomesComerciais: ["Nubain"],
    classe: "analgesicos",
    subclasse: "Opioides agonistas-antagonistas",
    regra: { tipo: "continuar" },
    racional:
      "Agonistas-antagonistas parciais usados como adjuntos anestésicos ou para dor moderada a intensa; nas doses clinicamente relevantes, essas medicações não parecem bloquear a ação de agonistas mu completos, mas sim agir sinergicamente.",
    situacoesEspeciais:
      "Uso concomitante de butorfanol ou nalbufina com agentes serotonérgicos, anfetaminas ou IMAOs pode aumentar risco de síndrome serotoninérgica.",
    fonteReferenciaNumero: 8,
    fontePagina: "5, 10-11",
  },
  {
    id: "pentazocina",
    nomeGenerico: "Pentazocina",
    nomesComerciais: ["Talwin"],
    classe: "analgesicos",
    subclasse: "Opioides agonistas-antagonistas",
    regra: { tipo: "continuar" },
    racional:
      "Agonistas-antagonistas parciais usados como adjuntos anestésicos ou para dor moderada a intensa; nas doses clinicamente relevantes, essas medicações não parecem bloquear a ação de agonistas mu completos, mas sim agir sinergicamente.",
    situacoesEspeciais:
      "Uso concomitante de butorfanol ou nalbufina com agentes serotonérgicos, anfetaminas ou IMAOs pode aumentar risco de síndrome serotoninérgica.",
    fonteReferenciaNumero: 8,
    fontePagina: "5, 10-11",
  },
  {
    id: "acetaminofeno",
    nomeGenerico: "Acetaminofeno / paracetamol",
    nomesComerciais: [
      "Tylenol",
      "Genapap",
      "FeverAll",
      "Altenol",
      "Aminofen",
      "Ofirmev (IV)",
      "Anacin Aspirin Free",
      "Actamin Maximum Strength",
    ],
    classe: "analgesicos",
    subclasse: "Acetaminofeno / paracetamol",
    regra: { tipo: "continuar" },
    racional:
      "Analgésico e antipirético comum, usado isoladamente para dor leve a moderada ou como parte de analgesia multimodal para dor moderada a intensa; mecanismo central não totalmente esclarecido; metabolizado primariamente no fígado — dosagem deve evitar necrose hepática.",
    situacoesEspeciais:
      "Cautela especial (mas sem contraindicação absoluta declarada no artigo) em pacientes com insuficiência hepática grave, doença hepática ativa grave, alcoolismo, desnutrição crônica, hipovolemia ou insuficiência renal grave. É comumente administrado tanto no pré-operatório quanto no perioperatório.",
    fonteReferenciaNumero: 8,
    fontePagina: "6, 14",
  },
  {
    id: "baclofeno",
    nomeGenerico: "Baclofeno",
    nomesComerciais: ["Lioresal", "Gablofen", "Ozobax"],
    classe: "analgesicos",
    subclasse: "Relaxantes musculares",
    regra: { tipo: "continuar" },
    racional:
      "Agonista GABA-B; mecanismo exato na espasticidade não totalmente elucidado; excreção predominantemente renal.",
    situacoesEspeciais:
      "Uso oral e intratecal. Abstinência abrupta é potencialmente fatal, especialmente em baclofeno intratecal — sintomas incluem febre alta, alteração do estado mental, espasticidade rebote e rigidez muscular podendo levar a rabdomiólise, falência de múltiplos órgãos e morte. Manejo perioperatório de pacientes com baclofeno intratecal deve ser planejado com input de especialista na área.",
    fonteReferenciaNumero: 8,
    fontePagina: "6, 12-13",
  },
  {
    id: "tizanidina",
    nomeGenerico: "Tizanidina",
    nomesComerciais: ["Zanaflex"],
    classe: "analgesicos",
    subclasse: "Relaxantes musculares",
    regra: { tipo: "continuar" },
    racional:
      "Agonista α2-adrenérgico (derivado da clonidina), espasmolítico de ação central; dados crescentes sugerem benefício perioperatório (melhora do controle da dor pós-operatória, redução de necessidade de midazolam, redução de consumo de opioides, estabilidade hemodinâmica).",
    situacoesEspeciais:
      "Contraindicada com ciprofloxacino e fluvoxamina (redução significativa do clearance). Se precisar ser descontinuada em uso crônico, a dose deve ser reduzida gradualmente (risco de abstinência, taquicardia rebote, hipertensão, hipertonia). Evitar em disfunção hepática/renal e em idosos (sedação/hipotensão significativas).",
    fonteReferenciaNumero: 8,
    fontePagina: "6, 12-13",
  },
  {
    id: "carisoprodol",
    nomeGenerico: "Carisoprodol",
    nomesComerciais: ["Soma", "Vanadom"],
    classe: "analgesicos",
    subclasse: "Relaxantes musculares",
    regra: { tipo: "suspender_dia_cirurgia" },
    racional:
      "Relaxante muscular de ação central com ação biológica semelhante a barbitúrico; substância controlada pelo potencial de abuso/dependência; abstinência pode causar sintomas graves.",
    situacoesEspeciais:
      "Se houver tempo, considerar reduzir gradualmente (tapear) ou trocar por agente alternativo antes da cirurgia — tapear ao longo de 4 a 9 dias se optar por essa via. Efeitos adversos incluem sedação, convulsões, dependência.",
    fonteReferenciaNumero: 8,
    fontePagina: "6, 13",
  },
  {
    id: "ciclobenzaprina",
    nomeGenerico: "Ciclobenzaprina",
    nomesComerciais: ["Flexeril", "Amrix", "Fexmid", "FusePaq Tabradol"],
    classe: "analgesicos",
    subclasse: "Relaxantes musculares",
    regra: { tipo: "suspender_dia_cirurgia" },
    racional:
      "Antagonista central de receptor 5-HT2, estruturalmente relacionado à amitriptilina; efeitos anticolinérgicos.",
    situacoesEspeciais:
      "Uso crônico pode causar sintomas de abstinência (mal-estar, náusea, cefaleia) por 2 a 4 dias após descontinuação — desconfortáveis, mas não fatais; reduzir gradualmente por 2-3 semanas pode ajudar a prevenir a abstinência. Uso concomitante com IMAOs pode aumentar risco de síndrome serotoninérgica.",
    fonteReferenciaNumero: 8,
    fontePagina: "6, 13",
  },
  {
    id: "metaxalona",
    nomeGenerico: "Metaxalona",
    nomesComerciais: ["Skelaxin"],
    classe: "analgesicos",
    subclasse: "Relaxantes musculares",
    regra: { tipo: "suspender_dia_cirurgia" },
    racional:
      "Relaxante muscular esquelético de ação central que não atua diretamente sobre o músculo esquelético; mecanismo exato desconhecido.",
    situacoesEspeciais:
      "Contraindicada em disfunção hepática ou renal significativa; associada a anemia hemolítica ou outras anemias induzidas por drogas.",
    fonteReferenciaNumero: 8,
    fontePagina: "6, 13",
  },
  {
    id: "metocarbamol",
    nomeGenerico: "Metocarbamol",
    nomesComerciais: ["Robaxin"],
    classe: "analgesicos",
    subclasse: "Relaxantes musculares",
    regra: { tipo: "suspender_dia_cirurgia" },
    racional:
      "Relaxante muscular esquelético sedativo de ação central (oral ou IV) que não atua diretamente sobre o músculo esquelético.",
    situacoesEspeciais:
      "Eliminação significativamente prejudicada em hepatopatia/nefropatia; pode interferir com os efeitos da piridostigmina — não deve ser usado em miastenia gravis. Um estudo unicêntrico mostrou benefício com metocarbamol IV + acetaminofeno IV pré-operatórios em artroplastia primária (redução de consumo de opioide, melhor progresso em fisioterapia/deambulação, menor tempo de internação).",
    fonteReferenciaNumero: 8,
    fontePagina: "6, 13-14",
  },
  {
    id: "orfenadrina",
    nomeGenerico: "Orfenadrina",
    nomesComerciais: ["Norflex", "Orfro", "Orphenate", "Mio-Rel", "Antiflex"],
    classe: "analgesicos",
    subclasse: "Relaxantes musculares",
    regra: { tipo: "suspender_dia_cirurgia" },
    racional:
      "Relaxante muscular de ação central (oral/IV), estruturalmente semelhante à difenidramina; efeitos anticolinérgicos.",
    situacoesEspeciais:
      "Usar com cautela em pacientes com taquicardia, descompensação cardíaca, insuficiência coronariana, arritmias cardíacas e em idosos; contraindicada em obstrução gastrointestinal, úlcera péptica estenosante, hipertrofia prostática/obstrução da bexiga, glaucoma e miastenia gravis. Potencializa efeitos anticolinérgicos de outros medicamentos.",
    fonteReferenciaNumero: 8,
    fontePagina: "6, 14",
  },
  {
    id: "ergotamina",
    nomeGenerico: "Ergotamina",
    nomesComerciais: ["Ergomar"],
    classe: "analgesicos",
    subclasse: "Medicações para cefaleia/enxaqueca",
    regra: { tipo: "suspender_periodo_fixo", valor: 2, unidade: "dias" },
    racional:
      "Alcaloide do ergot, agonista de receptores serotonérgicos; causa vasoconstrição que pode durar mais que sua duração farmacológica; risco de síndrome serotoninérgica com opioides e resposta hipertensiva grave quando combinada com anestésicos locais e epinefrina.",
    situacoesEspeciais:
      "O artigo recomenda suspender pelo menos 2 dias antes da cirurgia (limite inferior — pode ser adequado suspender por mais tempo a critério clínico). Efeitos adversos cardiovasculares incluem fibrose valvular, alterações eletrocardiográficas, hipertensão, precipitação de isquemia miocárdica; associada a colite isquêmica.",
    fonteReferenciaNumero: 8,
    fontePagina: "5, 11",
  },
  {
    id: "butalbital",
    nomeGenerico: "Butalbital",
    nomesComerciais: [
      "Disponível apenas em combinação com outros medicamentos, incluindo codeína, cafeína, aspirina, acetaminofeno e fenacetina",
    ],
    classe: "analgesicos",
    subclasse: "Medicações para cefaleia/enxaqueca",
    regra: {
      tipo: "individualizado",
      motivoIndividualizado:
        "Idealmente reduzir gradualmente (tapear) ao longo de 2 semanas antes da cirurgia. Se não houver tempo hábil para tapear, a recomendação se inverte: tomar no pré-operatório (incluindo manhã da cirurgia) para evitar abstinência, em vez de suspender.",
    },
    racional:
      "Barbitúrico de curta a moderada duração, age via receptores GABA; pode se acumular e causar convulsões intratáveis; forma hábito, levando a dependência e convulsões de abstinência.",
    situacoesEspeciais:
      "Uso aditivo com opioides, benzodiazepínicos, anestésicos locais e depressores do SNC pode causar depressão respiratória; uso aditivo com anestésicos pode causar hipotensão, sedação profunda e morte.",
    fonteReferenciaNumero: 8,
    fontePagina: "5, 11",
  },
  {
    id: "almotriptana",
    nomeGenerico: "Almotriptana",
    nomesComerciais: ["Axert"],
    classe: "analgesicos",
    subclasse: "Medicações para cefaleia/enxaqueca",
    regra: { tipo: "suspender_dia_cirurgia" },
    racional:
      "Agonistas de receptores serotonérgicos 5-HT1B/1D usados no tratamento de enxaqueca; risco teórico de síndrome serotoninérgica quando combinados com ISRSs ou ISRSNs (às vezes coprescritos para cefaleia); algumas vias metabólicas incluem MAO-A, CYP3A4, CYP2D6 e CYP1A2, podendo interferir no metabolismo de outros medicamentos perioperatórios comuns.",
    situacoesEspeciais:
      "Existem relatos de caso de triptanos usados para tratar cefaleia pós-operatória com anestesia geral subsequente sem intercorrências, mas o consenso do grupo foi evitar essas medicações no dia da cirurgia e usar tratamento alternativo para cefaleia aguda se necessário.",
    fonteReferenciaNumero: 8,
    fontePagina: "11",
  },
  {
    id: "eletriptana",
    nomeGenerico: "Eletriptana",
    nomesComerciais: ["Relpax"],
    classe: "analgesicos",
    subclasse: "Medicações para cefaleia/enxaqueca",
    regra: { tipo: "suspender_dia_cirurgia" },
    racional:
      "Agonistas de receptores serotonérgicos 5-HT1B/1D usados no tratamento de enxaqueca; risco teórico de síndrome serotoninérgica quando combinados com ISRSs ou ISRSNs (às vezes coprescritos para cefaleia); algumas vias metabólicas incluem MAO-A, CYP3A4, CYP2D6 e CYP1A2, podendo interferir no metabolismo de outros medicamentos perioperatórios comuns.",
    situacoesEspeciais:
      "Existem relatos de caso de triptanos usados para tratar cefaleia pós-operatória com anestesia geral subsequente sem intercorrências, mas o consenso do grupo foi evitar essas medicações no dia da cirurgia e usar tratamento alternativo para cefaleia aguda se necessário.",
    fonteReferenciaNumero: 8,
    fontePagina: "11",
  },
  {
    id: "frovatriptana",
    nomeGenerico: "Frovatriptana",
    nomesComerciais: ["Frova"],
    classe: "analgesicos",
    subclasse: "Medicações para cefaleia/enxaqueca",
    regra: { tipo: "suspender_dia_cirurgia" },
    racional:
      "Agonistas de receptores serotonérgicos 5-HT1B/1D usados no tratamento de enxaqueca; risco teórico de síndrome serotoninérgica quando combinados com ISRSs ou ISRSNs (às vezes coprescritos para cefaleia); algumas vias metabólicas incluem MAO-A, CYP3A4, CYP2D6 e CYP1A2, podendo interferir no metabolismo de outros medicamentos perioperatórios comuns.",
    situacoesEspeciais:
      "Existem relatos de caso de triptanos usados para tratar cefaleia pós-operatória com anestesia geral subsequente sem intercorrências, mas o consenso do grupo foi evitar essas medicações no dia da cirurgia e usar tratamento alternativo para cefaleia aguda se necessário.",
    fonteReferenciaNumero: 8,
    fontePagina: "11",
  },
  {
    id: "naratriptana",
    nomeGenerico: "Naratriptana",
    nomesComerciais: ["Amerge"],
    classe: "analgesicos",
    subclasse: "Medicações para cefaleia/enxaqueca",
    regra: { tipo: "suspender_dia_cirurgia" },
    racional:
      "Agonistas de receptores serotonérgicos 5-HT1B/1D usados no tratamento de enxaqueca; risco teórico de síndrome serotoninérgica quando combinados com ISRSs ou ISRSNs (às vezes coprescritos para cefaleia); algumas vias metabólicas incluem MAO-A, CYP3A4, CYP2D6 e CYP1A2, podendo interferir no metabolismo de outros medicamentos perioperatórios comuns.",
    situacoesEspeciais:
      "Existem relatos de caso de triptanos usados para tratar cefaleia pós-operatória com anestesia geral subsequente sem intercorrências, mas o consenso do grupo foi evitar essas medicações no dia da cirurgia e usar tratamento alternativo para cefaleia aguda se necessário.",
    fonteReferenciaNumero: 8,
    fontePagina: "11",
  },
  {
    id: "rizatriptana",
    nomeGenerico: "Rizatriptana",
    nomesComerciais: ["Maxalt"],
    classe: "analgesicos",
    subclasse: "Medicações para cefaleia/enxaqueca",
    regra: { tipo: "suspender_dia_cirurgia" },
    racional:
      "Agonistas de receptores serotonérgicos 5-HT1B/1D usados no tratamento de enxaqueca; risco teórico de síndrome serotoninérgica quando combinados com ISRSs ou ISRSNs (às vezes coprescritos para cefaleia); algumas vias metabólicas incluem MAO-A, CYP3A4, CYP2D6 e CYP1A2, podendo interferir no metabolismo de outros medicamentos perioperatórios comuns.",
    situacoesEspeciais:
      "Existem relatos de caso de triptanos usados para tratar cefaleia pós-operatória com anestesia geral subsequente sem intercorrências, mas o consenso do grupo foi evitar essas medicações no dia da cirurgia e usar tratamento alternativo para cefaleia aguda se necessário.",
    fonteReferenciaNumero: 8,
    fontePagina: "11",
  },
  {
    id: "sumatriptana",
    nomeGenerico: "Sumatriptana",
    nomesComerciais: ["Imitrex"],
    classe: "analgesicos",
    subclasse: "Medicações para cefaleia/enxaqueca",
    regra: { tipo: "suspender_dia_cirurgia" },
    racional:
      "Agonistas de receptores serotonérgicos 5-HT1B/1D usados no tratamento de enxaqueca; risco teórico de síndrome serotoninérgica quando combinados com ISRSs ou ISRSNs (às vezes coprescritos para cefaleia); algumas vias metabólicas incluem MAO-A, CYP3A4, CYP2D6 e CYP1A2, podendo interferir no metabolismo de outros medicamentos perioperatórios comuns.",
    situacoesEspeciais:
      "Existem relatos de caso de triptanos usados para tratar cefaleia pós-operatória com anestesia geral subsequente sem intercorrências, mas o consenso do grupo foi evitar essas medicações no dia da cirurgia e usar tratamento alternativo para cefaleia aguda se necessário.",
    fonteReferenciaNumero: 8,
    fontePagina: "11",
  },
  {
    id: "zolmitriptana",
    nomeGenerico: "Zolmitriptana",
    nomesComerciais: ["Zomig"],
    classe: "analgesicos",
    subclasse: "Medicações para cefaleia/enxaqueca",
    regra: { tipo: "suspender_dia_cirurgia" },
    racional:
      "Agonistas de receptores serotonérgicos 5-HT1B/1D usados no tratamento de enxaqueca; risco teórico de síndrome serotoninérgica quando combinados com ISRSs ou ISRSNs (às vezes coprescritos para cefaleia); algumas vias metabólicas incluem MAO-A, CYP3A4, CYP2D6 e CYP1A2, podendo interferir no metabolismo de outros medicamentos perioperatórios comuns.",
    situacoesEspeciais:
      "Existem relatos de caso de triptanos usados para tratar cefaleia pós-operatória com anestesia geral subsequente sem intercorrências, mas o consenso do grupo foi evitar essas medicações no dia da cirurgia e usar tratamento alternativo para cefaleia aguda se necessário.",
    fonteReferenciaNumero: 8,
    fontePagina: "11",
  },
  {
    id: "erenumabe_aooe",
    nomeGenerico: "Erenumabe-aooe",
    nomesComerciais: ["Aimovig"],
    classe: "analgesicos",
    subclasse: "Medicações para cefaleia/enxaqueca",
    regra: { tipo: "continuar" },
    racional:
      "Antagonistas do receptor de CGRP (calcitonin gene-related peptide), anticorpos monoclonais injetados por via subcutânea mensalmente ou a cada 3 meses (conforme o fármaco); sem efeitos adversos cardiovasculares confirmados; preocupações teóricas sobre vasoconstrição não foram confirmadas clinicamente.",
    situacoesEspeciais:
      "Continuar ao longo de todo o período perioperatório; o tratamento cirúrgico pode ser agendado a qualquer momento do ciclo, inclusive no dia da injeção. Nenhuma restrição relevante identificada pelo grupo.",
    fonteReferenciaNumero: 8,
    fontePagina: "6, 11-12",
  },
  {
    id: "fremanezumabe",
    nomeGenerico: "Fremanezumabe",
    nomesComerciais: ["Ajovy"],
    classe: "analgesicos",
    subclasse: "Medicações para cefaleia/enxaqueca",
    regra: { tipo: "continuar" },
    racional:
      "Antagonistas do receptor de CGRP (calcitonin gene-related peptide), anticorpos monoclonais injetados por via subcutânea mensalmente ou a cada 3 meses (conforme o fármaco); sem efeitos adversos cardiovasculares confirmados; preocupações teóricas sobre vasoconstrição não foram confirmadas clinicamente.",
    situacoesEspeciais:
      "Continuar ao longo de todo o período perioperatório; o tratamento cirúrgico pode ser agendado a qualquer momento do ciclo, inclusive no dia da injeção. Nenhuma restrição relevante identificada pelo grupo.",
    fonteReferenciaNumero: 8,
    fontePagina: "6, 11-12",
  },
  {
    id: "galcanezumabe",
    nomeGenerico: "Galcanezumabe",
    nomesComerciais: ["Emgality"],
    classe: "analgesicos",
    subclasse: "Medicações para cefaleia/enxaqueca",
    regra: { tipo: "continuar" },
    racional:
      "Antagonistas do receptor de CGRP (calcitonin gene-related peptide), anticorpos monoclonais injetados por via subcutânea mensalmente ou a cada 3 meses (conforme o fármaco); sem efeitos adversos cardiovasculares confirmados; preocupações teóricas sobre vasoconstrição não foram confirmadas clinicamente.",
    situacoesEspeciais:
      "Continuar ao longo de todo o período perioperatório; o tratamento cirúrgico pode ser agendado a qualquer momento do ciclo, inclusive no dia da injeção. Nenhuma restrição relevante identificada pelo grupo.",
    fonteReferenciaNumero: 8,
    fontePagina: "6, 11-12",
  },
  {
    id: "aine_diclofenaco",
    nomeGenerico: "Diclofenaco",
    nomesComerciais: ["Cataflam", "Voltaren-XR", "Dyloject", "Cambia", "Zipsor", "Zorvolex"],
    classe: "analgesicos",
    subclasse: "Anti-inflamatórios não esteroidais (AINEs)",
    regra: { tipo: "suspender_periodo_fixo", valor: 1, unidade: "dias" },
    racional:
      "AINE não seletivo (inibidor de COX-1/COX-2); risco de sangramento em sítio cirúrgico, lesão renal e eventos cardiovasculares associados classicamente à inibição de COX-1 (proteção gastrointestinal e agregação plaquetária). Meia-vida de 2-3h.",
    situacoesEspeciais:
      "O artigo cita '7 dias' como piso conservador genérico para a classe de AINEs não seletivos, mas também fornece um tempo de suspensão específico por fármaco baseado na meia-vida — este app usa o valor específico por fármaco (mais preciso clinicamente), conforme recomendado pelos próprios extratores do relatório-fonte.",
    fonteReferenciaNumero: 7,
    fontePagina: "1567",
  },
  {
    id: "aine_diflunisal",
    nomeGenerico: "Diflunisal",
    nomesComerciais: ["Dolobid"],
    classe: "analgesicos",
    subclasse: "Anti-inflamatórios não esteroidais (AINEs)",
    regra: { tipo: "suspender_periodo_fixo", valor: 3, unidade: "dias" },
    racional:
      "AINE não seletivo (inibidor de COX-1/COX-2); risco de sangramento em sítio cirúrgico, lesão renal e eventos cardiovasculares associados classicamente à inibição de COX-1. Meia-vida de 8-12h.",
    situacoesEspeciais:
      "O artigo cita '7 dias' como piso conservador genérico para a classe de AINEs não seletivos, mas também fornece um tempo de suspensão específico por fármaco baseado na meia-vida — este app usa o valor específico por fármaco (mais preciso clinicamente).",
    fonteReferenciaNumero: 7,
    fontePagina: "1567",
  },
  {
    id: "aine_etodolaco",
    nomeGenerico: "Etodolaco",
    nomesComerciais: ["Lodine"],
    classe: "analgesicos",
    subclasse: "Anti-inflamatórios não esteroidais (AINEs)",
    regra: { tipo: "suspender_periodo_fixo", valor: 2, unidade: "dias" },
    racional:
      "AINE não seletivo (inibidor de COX-1/COX-2); risco de sangramento em sítio cirúrgico, lesão renal e eventos cardiovasculares associados classicamente à inibição de COX-1. Meia-vida de 7-11h.",
    situacoesEspeciais:
      "Na dose diária de 600-800mg é relativamente COX-2 seletivo; poderia ser continuado na ausência de cirurgia de alto risco de sangramento. O artigo cita '7 dias' como piso conservador genérico para a classe, mas este app usa o valor específico por fármaco (mais preciso clinicamente).",
    fonteReferenciaNumero: 7,
    fontePagina: "1567",
  },
  {
    id: "aine_fenoprofeno",
    nomeGenerico: "Fenoprofeno",
    nomesComerciais: ["Nalfon"],
    classe: "analgesicos",
    subclasse: "Anti-inflamatórios não esteroidais (AINEs)",
    regra: { tipo: "suspender_periodo_fixo", valor: 1, unidade: "dias" },
    racional:
      "AINE não seletivo (inibidor de COX-1/COX-2); risco de sangramento em sítio cirúrgico, lesão renal e eventos cardiovasculares associados classicamente à inibição de COX-1. Meia-vida de 3h.",
    situacoesEspeciais:
      "O artigo cita '7 dias' como piso conservador genérico para a classe de AINEs não seletivos, mas este app usa o valor específico por fármaco (mais preciso clinicamente).",
    fonteReferenciaNumero: 7,
    fontePagina: "1567",
  },
  {
    id: "aine_flurbiprofeno",
    nomeGenerico: "Flurbiprofeno",
    nomesComerciais: ["Ansaid", "Ocufen", "Strepfen"],
    classe: "analgesicos",
    subclasse: "Anti-inflamatórios não esteroidais (AINEs)",
    regra: { tipo: "suspender_periodo_fixo", valor: 2, unidade: "dias" },
    racional:
      "AINE não seletivo, mais COX-1 seletivo (inibidor de COX-1/COX-2); risco de sangramento em sítio cirúrgico, lesão renal e eventos cardiovasculares associados classicamente à inibição de COX-1. Meia-vida de 7-8h.",
    situacoesEspeciais:
      "O artigo cita '7 dias' como piso conservador genérico para a classe de AINEs não seletivos, mas este app usa o valor específico por fármaco (mais preciso clinicamente).",
    fonteReferenciaNumero: 7,
    fontePagina: "1567",
  },
  {
    id: "aine_ibuprofeno",
    nomeGenerico: "Ibuprofeno",
    nomesComerciais: ["Brufen", "Advil", "Motrin", "Nurofen"],
    classe: "analgesicos",
    subclasse: "Anti-inflamatórios não esteroidais (AINEs)",
    regra: { tipo: "suspender_periodo_fixo", valor: 1, unidade: "dias" },
    racional:
      "AINE não seletivo (inibidor de COX-1/COX-2); risco de sangramento em sítio cirúrgico, lesão renal e eventos cardiovasculares associados classicamente à inibição de COX-1. Meia-vida de 2-3h.",
    situacoesEspeciais:
      "O artigo cita '7 dias' como piso conservador genérico para a classe de AINEs não seletivos, mas este app usa o valor específico por fármaco (mais preciso clinicamente).",
    fonteReferenciaNumero: 7,
    fontePagina: "1567",
  },
  {
    id: "aine_indometacina",
    nomeGenerico: "Indometacina",
    nomesComerciais: ["Indocin", "Indocid"],
    classe: "analgesicos",
    subclasse: "Anti-inflamatórios não esteroidais (AINEs)",
    regra: { tipo: "suspender_periodo_fixo", valor: 1, unidade: "dias" },
    racional:
      "AINE não seletivo, mais COX-1 seletivo (inibidor de COX-1/COX-2); potente inibidor da síntese de prostaglandina renal. Meia-vida de 4-5h.",
    situacoesEspeciais:
      "O artigo cita '7 dias' como piso conservador genérico para a classe de AINEs não seletivos, mas este app usa o valor específico por fármaco (mais preciso clinicamente).",
    fonteReferenciaNumero: 7,
    fontePagina: "1567",
  },
  {
    id: "aine_cetoprofeno",
    nomeGenerico: "Cetoprofeno",
    nomesComerciais: ["Orudis", "Oruvail"],
    classe: "analgesicos",
    subclasse: "Anti-inflamatórios não esteroidais (AINEs)",
    regra: { tipo: "suspender_periodo_fixo", valor: 1, unidade: "dias" },
    racional:
      "AINE não seletivo, mais COX-1 seletivo (inibidor de COX-1/COX-2); risco de sangramento em sítio cirúrgico, lesão renal e eventos cardiovasculares associados classicamente à inibição de COX-1. Meia-vida de 2-4h.",
    situacoesEspeciais:
      "O artigo cita '7 dias' como piso conservador genérico para a classe de AINEs não seletivos, mas este app usa o valor específico por fármaco (mais preciso clinicamente).",
    fonteReferenciaNumero: 7,
    fontePagina: "1567",
  },
  {
    id: "aine_cetorolaco",
    nomeGenerico: "Cetorolaco",
    nomesComerciais: ["Toradol"],
    classe: "analgesicos",
    subclasse: "Anti-inflamatórios não esteroidais (AINEs)",
    regra: { tipo: "suspender_periodo_fixo", valor: 1, unidade: "dias" },
    racional:
      "AINE não seletivo, mais COX-1 seletivo (inibidor de COX-1/COX-2); risco de sangramento em sítio cirúrgico, lesão renal e eventos cardiovasculares associados classicamente à inibição de COX-1. Meia-vida de 6h.",
    situacoesEspeciais:
      "O artigo cita '7 dias' como piso conservador genérico para a classe de AINEs não seletivos, mas este app usa o valor específico por fármaco (mais preciso clinicamente).",
    fonteReferenciaNumero: 7,
    fontePagina: "1567",
  },
  {
    id: "aine_meloxicam",
    nomeGenerico: "Meloxicam",
    nomesComerciais: ["Mobic"],
    classe: "analgesicos",
    subclasse: "Anti-inflamatórios não esteroidais (AINEs)",
    regra: { tipo: "suspender_periodo_fixo", valor: 4, unidade: "dias" },
    racional:
      "AINE não seletivo (inibidor de COX-1/COX-2); risco de sangramento em sítio cirúrgico, lesão renal e eventos cardiovasculares associados classicamente à inibição de COX-1. Meia-vida de 15-20h.",
    situacoesEspeciais:
      "Na dose diária de 7,5mg é relativamente COX-2 seletivo (5-50x); poderia ser continuado na ausência de cirurgia de alto risco de sangramento. O artigo cita '7 dias' como piso conservador genérico para a classe, mas este app usa o valor específico por fármaco (mais preciso clinicamente).",
    fonteReferenciaNumero: 7,
    fontePagina: "1567",
  },
  {
    id: "aine_nabumetona",
    nomeGenerico: "Nabumetona",
    nomesComerciais: ["Relafen"],
    classe: "analgesicos",
    subclasse: "Anti-inflamatórios não esteroidais (AINEs)",
    regra: { tipo: "suspender_periodo_fixo", valor: 6, unidade: "dias" },
    racional:
      "AINE não seletivo (inibidor de COX-1/COX-2); risco de sangramento em sítio cirúrgico, lesão renal e eventos cardiovasculares associados classicamente à inibição de COX-1. Meia-vida de 26h.",
    situacoesEspeciais:
      "Na dose diária ≥1000mg/d é relativamente COX-2 seletivo. O artigo cita '7 dias' como piso conservador genérico para a classe, mas este app usa o valor específico por fármaco (mais preciso clinicamente).",
    fonteReferenciaNumero: 7,
    fontePagina: "1567",
  },
  {
    id: "aine_naproxeno",
    nomeGenerico: "Naproxeno",
    nomesComerciais: ["Aleve", "Naprosyn"],
    classe: "analgesicos",
    subclasse: "Anti-inflamatórios não esteroidais (AINEs)",
    regra: { tipo: "suspender_periodo_fixo", valor: 4, unidade: "dias" },
    racional:
      "AINE não seletivo, mais COX-1 seletivo (inibidor de COX-1/COX-2); risco de sangramento em sítio cirúrgico, lesão renal e eventos cardiovasculares associados classicamente à inibição de COX-1. Meia-vida de 12-17h.",
    situacoesEspeciais:
      "O artigo cita '7 dias' como piso conservador genérico para a classe de AINEs não seletivos, mas este app usa o valor específico por fármaco (mais preciso clinicamente).",
    fonteReferenciaNumero: 7,
    fontePagina: "1567",
  },
  {
    id: "aine_oxaprozina",
    nomeGenerico: "Oxaprozina",
    nomesComerciais: ["Daypro"],
    classe: "analgesicos",
    subclasse: "Anti-inflamatórios não esteroidais (AINEs)",
    regra: { tipo: "suspender_periodo_fixo", valor: 10, unidade: "dias" },
    racional:
      "AINE não seletivo (inibidor de COX-1/COX-2); risco de sangramento em sítio cirúrgico, lesão renal e eventos cardiovasculares associados classicamente à inibição de COX-1. Meia-vida de 36-92h.",
    situacoesEspeciais:
      "O artigo cita '7 dias' como piso conservador genérico para a classe de AINEs não seletivos, mas este app usa o valor específico por fármaco (mais preciso clinicamente) — neste caso, mais longo que o piso genérico.",
    fonteReferenciaNumero: 7,
    fontePagina: "1567",
  },
  {
    id: "aine_piroxicam",
    nomeGenerico: "Piroxicam",
    nomesComerciais: ["Feldene"],
    classe: "analgesicos",
    subclasse: "Anti-inflamatórios não esteroidais (AINEs)",
    regra: { tipo: "suspender_periodo_fixo", valor: 10, unidade: "dias" },
    racional:
      "AINE não seletivo, mais COX-1 seletivo (inibidor de COX-1/COX-2); risco de sangramento em sítio cirúrgico, lesão renal e eventos cardiovasculares associados classicamente à inibição de COX-1. Meia-vida de 50h.",
    situacoesEspeciais:
      "Doses diárias ≥20mg aumentam risco de complicações gastrointestinais sérias. O artigo cita '7 dias' como piso conservador genérico para a classe, mas este app usa o valor específico por fármaco (mais preciso clinicamente) — neste caso, mais longo que o piso genérico.",
    fonteReferenciaNumero: 7,
    fontePagina: "1567",
  },
  {
    id: "aine_salsalato",
    nomeGenerico: "Salsalato",
    nomesComerciais: ["Mono-Gesic", "Salflex", "Disalcid", "Salsitab"],
    classe: "analgesicos",
    subclasse: "Anti-inflamatórios não esteroidais (AINEs)",
    regra: { tipo: "suspender_periodo_fixo", valor: 1, unidade: "dias" },
    racional:
      "AINE não seletivo (inibidor de COX-1/COX-2). Meia-vida de 1h. Não interfere na função plaquetária/sangramento GI; nefrotoxicidade rara.",
    situacoesEspeciais:
      "O artigo cita '7 dias' como piso conservador genérico para a classe de AINEs não seletivos, mas este app usa o valor específico por fármaco (mais preciso clinicamente).",
    fonteReferenciaNumero: 7,
    fontePagina: "1567",
  },
  {
    id: "aine_sulindaco",
    nomeGenerico: "Sulindaco",
    nomesComerciais: ["Clinoril", "Sunil"],
    classe: "analgesicos",
    subclasse: "Anti-inflamatórios não esteroidais (AINEs)",
    regra: { tipo: "suspender_periodo_fixo", valor: 4, unidade: "dias" },
    racional:
      "AINE não seletivo (inibidor de COX-1/COX-2); risco de sangramento em sítio cirúrgico, lesão renal e eventos cardiovasculares associados classicamente à inibição de COX-1. Meia-vida de 16-18h.",
    situacoesEspeciais:
      "Pode causar anormalidades reversíveis de enzimas hepáticas. O artigo cita '7 dias' como piso conservador genérico para a classe, mas este app usa o valor específico por fármaco (mais preciso clinicamente).",
    fonteReferenciaNumero: 7,
    fontePagina: "1567",
  },
  {
    id: "aine_tolmetina",
    nomeGenerico: "Tolmetina",
    nomesComerciais: ["Tolectin"],
    classe: "analgesicos",
    subclasse: "Anti-inflamatórios não esteroidais (AINEs)",
    regra: { tipo: "suspender_periodo_fixo", valor: 2, unidade: "dias" },
    racional:
      "AINE não seletivo, mais COX-1 seletivo (inibidor de COX-1/COX-2); risco de sangramento em sítio cirúrgico, lesão renal e eventos cardiovasculares associados classicamente à inibição de COX-1. Meia-vida de 2-6h.",
    situacoesEspeciais:
      "O artigo cita '7 dias' como piso conservador genérico para a classe de AINEs não seletivos, mas este app usa o valor específico por fármaco (mais preciso clinicamente).",
    fonteReferenciaNumero: 7,
    fontePagina: "1567",
  },
  {
    id: "aine_celecoxibe",
    nomeGenerico: "Celecoxibe",
    nomesComerciais: ["Celebrex"],
    classe: "analgesicos",
    subclasse: "Anti-inflamatórios não esteroidais (AINEs)",
    regra: { tipo: "continuar" },
    racional:
      "Inibidor seletivo de COX-2; efeito mínimo sobre a coagulação (sem efeito na função plaquetária), o que o torna atrativo na população cirúrgica; cada vez mais incorporado em protocolos perioperatórios de analgesia multimodal para reduzir uso de opioide e melhorar recuperação funcional, embora a maioria dos estudos não seja potente o suficiente para avaliar efeitos adversos como desfecho primário. Meia-vida de 11h.",
    fonteReferenciaNumero: 7,
    fontePagina: "1568",
  },
];
