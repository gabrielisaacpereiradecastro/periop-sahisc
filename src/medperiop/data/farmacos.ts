import { Farmaco, ClasseTerapeutica } from "@/medperiop/types";
import { FARMACOS_CARDIOVASCULAR } from "@/medperiop/data/cardiovascular";
import { FARMACOS_ENDOCRINO } from "@/medperiop/data/endocrino";
import { FARMACOS_GI_PULMONAR } from "@/medperiop/data/giPulmonar";
import { FARMACOS_NEUROLOGICO } from "@/medperiop/data/neurologico";
import { FARMACOS_PSIQUIATRICO } from "@/medperiop/data/psiquiatrico";
import { FARMACOS_REUMATOLOGICO_HIV } from "@/medperiop/data/reumatologicoHiv";
import { FARMACOS_ANALGESICOS } from "@/medperiop/data/analgesicos";

export const TODOS_FARMACOS: Farmaco[] = [
  ...FARMACOS_CARDIOVASCULAR,
  ...FARMACOS_ENDOCRINO,
  ...FARMACOS_GI_PULMONAR,
  ...FARMACOS_NEUROLOGICO,
  ...FARMACOS_PSIQUIATRICO,
  ...FARMACOS_REUMATOLOGICO_HIV,
  ...FARMACOS_ANALGESICOS,
];

export function farmacosPorClasse(classe: ClasseTerapeutica): Farmaco[] {
  return TODOS_FARMACOS.filter((f) => f.classe === classe);
}

/**
 * Alguns fármacos aparecem em mais de um artigo-fonte com papéis clínicos
 * diferentes (ex.: guanfacina como anti-hipertensivo cardiovascular E como
 * não-estimulante para TDAH; carbamazepina como anticonvulsivante neurológico
 * E como estabilizador de humor psiquiátrico) — o `id` sozinho não é único
 * globalmente, só dentro de cada `classe`. A busca precisa das duas chaves.
 */
export function buscarFarmaco(classe: ClasseTerapeutica | null, id: string | null): Farmaco | null {
  if (!classe || !id) return null;
  return TODOS_FARMACOS.find((f) => f.classe === classe && f.id === id) ?? null;
}
