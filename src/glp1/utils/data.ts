/** Utilitários de data em formato ISO (AAAA-MM-DD), sem depender de fuso horário. */

export function montarISO(dia: number, mes: number, ano: number): string | null {
  if (!dia || !mes || !ano) return null;
  const d = new Date(Date.UTC(ano, mes - 1, dia));
  if (
    d.getUTCFullYear() !== ano ||
    d.getUTCMonth() !== mes - 1 ||
    d.getUTCDate() !== dia
  ) {
    return null; // data inválida (ex.: 31/02)
  }
  return `${ano.toString().padStart(4, "0")}-${mes.toString().padStart(2, "0")}-${dia
    .toString()
    .padStart(2, "0")}`;
}

export function subtrairDias(dataISO: string, dias: number): string {
  const [ano, mes, dia] = dataISO.split("-").map(Number);
  const d = new Date(Date.UTC(ano, mes - 1, dia));
  d.setUTCDate(d.getUTCDate() - dias);
  return `${d.getUTCFullYear().toString().padStart(4, "0")}-${(d.getUTCMonth() + 1)
    .toString()
    .padStart(2, "0")}-${d.getUTCDate().toString().padStart(2, "0")}`;
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

export function formatarDataExtenso(dataISO: string): string {
  const [ano, mes, dia] = dataISO.split("-").map(Number);
  return `${dia} de ${MESES[mes - 1]} de ${ano}`;
}

export function dataEhFutura(dataISO: string): boolean {
  const hoje = new Date();
  const hojeISO = `${hoje.getFullYear().toString().padStart(4, "0")}-${(
    hoje.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${hoje.getDate().toString().padStart(2, "0")}`;
  return dataISO >= hojeISO;
}
