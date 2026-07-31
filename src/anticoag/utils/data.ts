/**
 * Utilitários de data e hora. Diferente do app de GLP-1 (que só precisava de
 * dias inteiros), aqui os intervalos do guideline são em horas (24h, 36h,
 * 72h, 120h...), então guardamos data+hora, não só a data.
 *
 * Representação: string "AAAA-MM-DDTHH" (hora local, 0–23, sem minutos).
 */

export function montarDataISO(dia: number, mes: number, ano: number): string | null {
  if (!dia || !mes || !ano) return null;
  const d = new Date(ano, mes - 1, dia);
  if (d.getFullYear() !== ano || d.getMonth() !== mes - 1 || d.getDate() !== dia) {
    return null;
  }
  return `${ano.toString().padStart(4, "0")}-${mes.toString().padStart(2, "0")}-${dia
    .toString()
    .padStart(2, "0")}`;
}

export function combinarDataHora(dataISO: string, hora: number): string {
  return `${dataISO}T${hora.toString().padStart(2, "0")}`;
}

function paraDate(dataHoraISO: string): Date {
  const [dataParte, horaParte] = dataHoraISO.split("T");
  const [ano, mes, dia] = dataParte.split("-").map(Number);
  const hora = Number(horaParte);
  return new Date(ano, mes - 1, dia, hora, 0, 0);
}

function deDate(d: Date): string {
  const ano = d.getFullYear().toString().padStart(4, "0");
  const mes = (d.getMonth() + 1).toString().padStart(2, "0");
  const dia = d.getDate().toString().padStart(2, "0");
  const hora = d.getHours().toString().padStart(2, "0");
  return `${ano}-${mes}-${dia}T${hora}`;
}

export function somarHoras(dataHoraISO: string, horas: number): string {
  const d = paraDate(dataHoraISO);
  d.setHours(d.getHours() + horas);
  return deDate(d);
}

const MESES = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

export function formatarDataHoraExtenso(dataHoraISO: string): string {
  const [dataParte, horaParte] = dataHoraISO.split("T");
  const [ano, mes, dia] = dataParte.split("-").map(Number);
  return `${dia} de ${MESES[mes - 1]} de ${ano}, às ${horaParte}h`;
}

export function dataHoraEhFutura(dataHoraISO: string): boolean {
  return paraDate(dataHoraISO).getTime() >= new Date().getTime();
}
