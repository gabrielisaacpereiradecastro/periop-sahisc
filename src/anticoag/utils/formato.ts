/** "168" -> "168 horas (7 dias)"; abaixo de 24h não mostra a conversão
 * (não ajuda em nada saber que 6h são "0,25 dias"). */
export function horasComDias(horas: number): string {
  if (horas < 24) return `${horas} horas`;
  const dias = horas / 24;
  const diasTexto = Number.isInteger(dias) ? `${dias}` : dias.toFixed(1).replace(".", ",");
  return `${horas} horas (${diasTexto} dia${dias === 1 ? "" : "s"})`;
}
