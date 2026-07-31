/** Converte um período em horas ou dias para um número inteiro de dias. */
export function paraDias(valor: number, unidade: "horas" | "dias"): number {
  return unidade === "horas" ? Math.ceil(valor / 24) : valor;
}
