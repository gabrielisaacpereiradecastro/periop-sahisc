import { Fitoterapico } from "@/anticoag/types";

/**
 * Tabela 1 de Elvir Lazo OL, White PF, Lee C, Cruz Eng H, Matin JM, Lin C,
 * Del Cid F, Yumul R. "Use of herbal medication in the perioperative
 * period: Potential adverse drug interactions." J Clin Anesth.
 * 2024;95:111473 — os 33 fitoterápicos mais usados, revisão sobre risco
 * de sangramento e outras complicações perioperatórias GERAIS (não
 * específica de bloqueio neuraxial — ver aviso na tela de resultado).
 *
 * `regra.valorDias` usa sempre o extremo mais conservador (mais dias)
 * quando o artigo cita uma faixa (ex.: "2-3 weeks" → 21); o texto completo
 * da faixa e de eventuais recomendações alternativas de outros autores
 * citados no mesmo artigo fica em `recomendacaoTexto`.
 */
export const FITOTERAPICOS: Fitoterapico[] = [
  {
    id: "arnica",
    nomeGenerico: "Arnica",
    sinonimos: "Arnica montana, pata-de-lobo, tabaco-da-montanha, arnica-da-montanha",
    usosClinicos:
      "Tratamento de inflamação e dor associadas a contusões, dores, edema/equimose pós-cirúrgica e entorses; alívio de inflamação de boca e garganta; abortivo; propriedades anti-inflamatórias, antissépticas, analgésicas, antirreumáticas, antineoplásicas e vasodilatadoras.",
    mecanismoAcao:
      "Inibe a função plaquetária humana e diminui a agregação plaquetária ao inibir a atividade de NF-kB, IL-12 e fosfolipase A2; potencializa os efeitos anticoagulantes e antiplaquetários de medicações anticoagulantes; altera níveis de cálcio intracelular por ação estabilizadora de membrana; reduz o tempo de contração e o período refratário do miocárdio.",
    efeitosAdversos: "Cefaleia, sonolência, letargia, boca seca, vômito, diarreia e falta de ar.",
    interacoesMedicamentosas:
      "Aumenta o risco de sangramento no sítio operatório ao potencializar efeitos anticoagulantes e antiplaquetários; reduz a eficácia de medicações anti-hipertensivas; pode causar falta de ar, taquicardia e parada cardíaca.",
    regra: { tipo: "suspender_periodo_fixo", valorDias: 21 },
    recomendacaoTexto:
      "Suspender 2-3 semanas antes da cirurgia; pode ser retomada 2 semanas após a cirurgia. Alguns estudos sugerem que o uso perioperatório de arnica pode facilitar a cicatrização de feridas.",
  },
  {
    id: "ashwagandha",
    nomeGenerico: "Ashwagandha",
    sinonimos: "Rasayana, Withania somnifera",
    usosClinicos:
      "Anti-inflamatório, antioxidante, anticâncer, antidiabético, antienvelhecimento, anticoagulante, anti-hipertensivo, ansiolítico, antidepressivo, fortalecedor do sistema neuroprotetor, afrodisíaco, tônico termogênico/energizante, indutor de sono, melhora função tireoidiana e alivia sintomas climatéricos na perimenopausa.",
    mecanismoAcao:
      "Relaxamento direto da musculatura lisa; efeito GABA-mimético; equilibra o eixo hipotálamo-hipófise-adrenal e reduz cortisol em 23-33%, reduz TSH e T4. Aumenta enzimas hepáticas (ALT, AST, GGT, ALP), bilirrubina total, colesterol total, triglicerídeos e ferritina.",
    efeitosAdversos: "Doses altas podem causar dano hepático colestático, icterícia grave e elevação de enzimas hepáticas.",
    interacoesMedicamentosas: "Risco de hipoglicemia, sangramento e bradicardia. Potencializa efeitos de anticoagulantes e anti-hipertensivos.",
    regra: { tipo: "suspender_periodo_fixo", valorDias: 14 },
    recomendacaoTexto: "Suspender 2 semanas antes da cirurgia.",
  },
  {
    id: "cimicifuga",
    nomeGenerico: "Black Cohosh (Cimicífuga)",
    sinonimos: "Actaea racemosa, Cimicifuga racemosa, black snakeroot, rattlesnake root, squawroot, bugbane",
    usosClinicos:
      "Tratamento de dor menstrual, sintomas vasomotores e menopausa (fogachos, sudorese, alterações de humor, insônia, ansiedade); anti-inflamatório (artrite reumatoide, desconforto musculoesquelético); antioxidante; propriedades antipiréticas.",
    mecanismoAcao:
      "Atividade pró-coagulante ao facilitar a geração de trombina; efeito sobre o nervo vago pode induzir bradicardia e hipotensão, exacerbadas por anestésicos gerais; reduz a eficácia de amiodarona oral, glibenclamida, fexofenadina e estatinas. Reduz sintomas vasomotores por ação dopaminérgica, serotoninérgica e GABAérgica; tem atividade agonista parcial nos sistemas serotoninérgico e opioide.",
    efeitosAdversos: "Dor musculoesquelética, sangramento uterino, dor mamária, bloqueio cardíaco, rash, tontura, náusea e vômito.",
    interacoesMedicamentosas: "Bradicardia e hipotensão exacerbadas por anestésicos gerais; náusea e vômito.",
    regra: { tipo: "suspender_periodo_fixo", valorDias: 14 },
    recomendacaoTexto: "Suspender 2 semanas antes da cirurgia.",
  },
  {
    id: "bromelina",
    nomeGenerico: "Bromelina",
    sinonimos: "Enzima sulfidrila/proteolítica do abacaxi — Ananas sativus, ananase, bromelaína",
    usosClinicos:
      "Usada para reduzir edema, inflamação, dor e hematomas; facilita cicatrização, melhora circulação ao aumentar a permeabilidade vascular ao oxigênio/nutrientes e a fluidez sanguínea; previne coágulos.",
    mecanismoAcao:
      "Propriedades anticoagulantes: reduz fibrinogênio e agregação plaquetária, prolonga tempo de protrombina e tromboplastina parcial, aumenta permeabilidade tecidual e facilita reabsorção de fluido para o espaço intravascular.",
    efeitosAdversos: "Efeitos infrequentes: diarreia, náusea, palpitações, fadiga, letargia, menstruação intensa, dispneia e reações alérgicas.",
    interacoesMedicamentosas: "Aumenta o risco de sangramento.",
    regra: { tipo: "suspender_periodo_fixo", valorDias: 21 },
    recomendacaoTexto: "Suspender 2-3 semanas antes da cirurgia; pode ser retomada 2 semanas após. Alegadamente facilita a cicatrização de feridas.",
  },
  {
    id: "cannabis",
    nomeGenerico: "Cannabis",
    sinonimos: "Cannabis sativa, maconha, erva",
    usosClinicos:
      "Propriedades analgésicas, ansiolíticas, sedativo-hipnóticas, anticâncer e anti-inflamatórias; uso tópico, oral, fumado ou vaporizado; tratamento de Alzheimer, ELA, câncer, doença de Crohn, convulsões, glaucoma, hepatite C, AIDS, esclerose múltipla, dor crônica, náusea, dor neuropática e TEPT. O THC trata espasticidade na esclerose múltipla, náusea/vômito induzidos por quimioterapia, doença inflamatória intestinal, e é estimulante de apetite; >25% dos pacientes com dor crônica nos EUA usam produtos de cannabis.",
    mecanismoAcao:
      "CBD e THC inibem CYP2C9 e CYP2C19, reduzindo o metabolismo de varfarina e clopidogrel e aumentando INR/PT/PTT; THC é metabolizado por CYP3A4 e CYP2C9; ambos inibem CYP3A4 e CYP2D6; CBD também inibe fortemente CYP1A1, CYP1A2, CYP1B1, CYP2B6, CYP2C8, CYP2C9, CYP2C19, CYP2D6, CYP3A4, UGT1A9 e UGT2B7 — pode aumentar níveis plasmáticos de substratos dessas enzimas (ex.: flunisal, propofol, fenofibrato, gemfibrozila, lamotrigina, morfina, lorazepam). THC é agonista parcial dos receptores canabinoides CB1/CB2 (SNC e sistema imune); outros alvos incluem receptores NMDA e GABA.",
    efeitosAdversos: "Uso crônico pode aumentar necessidade de sedação, escores de dor, necessidade de opioide pós-operatório e hiper-reatividade de vias aéreas; uso de THC no pós-operatório imediato pode causar desorientação e hipotermia.",
    interacoesMedicamentosas:
      "Estimulação cardiovascular e dano cardíaco (taquicardia, hipertensão, arritmias) com anfetaminas, atropina, pseudoefedrina, epinefrina ou dobutamina; sonolência aumentada com lorazepam, diazepam e zolpidem; mania com fluoxetina; delirium e hipomania com dissulfiram; aumenta risco de sangramento perioperatório com varfarina e clopidogrel.",
    regra: {
      tipo: "individualizado",
      motivoIndividualizado:
        "O próprio artigo não dá um número único: recomenda reduzir o uso ('desmamar') antes de cirurgia eletiva e suspender se possível com >2 semanas de antecedência; a suspensão abrupta pode causar síndrome de abstinência de cannabis (mais provável com produtos de razão CBD:THC >10:1). As diretrizes de consenso da ASRA Pain Medicine recomendam adiar cirurgias eletivas em pacientes com intoxicação aguda por cannabis. Recomendações de diferentes fontes para suspensão pré-operatória variam de 3 a 7 dias — decisão deve ser individualizada com a equipe.",
    },
    recomendacaoTexto:
      "Reduzir o uso de produtos com cannabis antes de cirurgia eletiva ('desmame') e suspender se possível com mais de 2 semanas de antecedência. Doses baixas de dronabinol (agonista canabinoide) podem ser usadas para tratar síndrome de abstinência grave no pós-operatório. Recomendações de suspensão pré-operatória variam de 3 a 7 dias conforme a fonte.",
  },
  {
    id: "cogumelo_chaga",
    nomeGenerico: "Cogumelo Chaga",
    sinonimos: "Inonotus obliquus, clinker polypore, Birch conk, Cinder conk",
    usosClinicos:
      "Tratamento de dislipidemia e diabetes tipo 2; reduz inflamação, estimula o sistema imune; usado como antitumoral (hepatite C e HIV), antiviral e antioxidante; reduz sintomas da doença de Crohn; melhora aprendizado e memória.",
    mecanismoAcao:
      "Inibe fatores de coagulação e amplifica drogas anticoagulantes e peptídeo inibidor da agregação plaquetária; regula positivamente atividades de PPAR-γ (alvo no tratamento de dislipidemia e diabetes tipo 2).",
    efeitosAdversos: "Nefropatia oxalática aguda após ingestão excessiva.",
    interacoesMedicamentosas: "Risco de hipoglicemia e sangramento.",
    regra: { tipo: "suspender_periodo_fixo", valorDias: 21 },
    recomendacaoTexto: "Suspender 2-3 semanas antes de cirurgia eletiva.",
  },
  {
    id: "camomila",
    nomeGenerico: "Camomila",
    sinonimos: "Matricaria chamomilla, Chamomilla recutita (camomila alemã), Chamaemelum nobile (camomila romana)",
    usosClinicos:
      "Usada como sedativo, ansiolítico, antidepressivo e antiespasmódico, anti-inflamatório e antisséptico; tratamento de insônia, tosse, náusea, síndrome do intestino irritável, distúrbios gastrointestinais, cólica infantil, síndrome pré-menstrual e cicatrização de feridas.",
    mecanismoAcao:
      "Potencializa os efeitos anticoagulantes da varfarina; possui efeito sedativo tipo benzodiazepínico por atividade em receptores GABAérgicos centrais e interação com opioides/benzodiazepínicos (inibível por flumazenil, antagonista GABA); inibe o sistema citocromo P450, principalmente CYP1A2, com menor efeito em 2C9, 2D6 e 3A4.",
    efeitosAdversos: "Reações alérgicas, asma, anafilaxia, rinite alérgica e dermatite de contato.",
    interacoesMedicamentosas:
      "Aumenta o risco de sangramento perioperatório em pacientes usando varfarina concomitantemente; pode causar sedação excessiva quando combinada com medicações sedativo-ansiolíticas.",
    regra: { tipo: "suspender_periodo_fixo", valorDias: 14 },
    recomendacaoTexto: "Suspender 2 semanas antes de cirurgia eletiva.",
  },
  {
    id: "canela",
    nomeGenerico: "Canela",
    sinonimos: "Cinnamomum zeylanicum, C. aromaticum, C. loureiroi, C. burmannii",
    usosClinicos:
      "Tratamento de artrite, inflamação e dispepsia; propriedades antioxidantes, imunomoduladoras, antimicrobianas, anticâncer, antiestrogênicas, hipolipemiantes, neuroprotetoras e cardioprotetoras; em diabetes tipo 2 e pré-diabetes reduz glicemia de jejum e pode causar resistência à insulina.",
    mecanismoAcao:
      "A cumarina inibe a vitamina K, causando INR prolongado com aPTT normal; previne gliconeogênese ao limitar a absorção de alanina (substrato gliconeogênico); potencializa sensibilidade e secreção de insulina; diminui atividade de alfa-glicosidase intestinal e alfa-amilase pancreática; regula metabolismo de glicose no fígado, tecido adiposo e músculo; aumenta biodisponibilidade da pioglitazona.",
    efeitosAdversos: "Distúrbios gastrointestinais, estomatite, dermatite perioral, gengivite e hipersensibilidade. Pode aumentar hepatotoxicidade quando combinada com estatina.",
    interacoesMedicamentosas:
      "Pode aumentar risco de dermatite de contato, hipersensibilidade e hepatotoxicidade. Em excesso, pode causar sangramento cirúrgico excessivo e hipoglicemia perioperatória. A canela cássia contém 5% de cumarina, enquanto a canela do Ceilão contém 250 vezes menos cumarina.",
    regra: { tipo: "suspender_periodo_fixo", valorDias: 14 },
    recomendacaoTexto: "Suspender 2 semanas antes de cirurgia eletiva.",
  },
  {
    id: "dong_quai",
    nomeGenerico: "Dong Quai",
    sinonimos: "Angelica sinensis, angélica-chinesa, dang gui, tang-kuei, ginseng feminino",
    usosClinicos:
      "Tratamento de osteoartrite, redução de sintomas menstruais e menopáusicos, além de propriedades 'de fortalecer o sangue'; atividade antitumoral e neuroprotetora; aumenta angiogênese.",
    mecanismoAcao:
      "Contém seis derivados de cumarina com atividade anticoagulante e antiplaquetária; efeito antitrombótico por redução de tromboxano A2; interfere na agregação e adesão plaquetária e melhora o fluxo sanguíneo.",
    efeitosAdversos: "Fotossensibilidade, supressão de apetite, distensão abdominal, febre e ginecomastia.",
    interacoesMedicamentosas: "Pode aumentar o risco de sangramento; em combinação com varfarina, pode aumentar INR, tempo de protrombina e tempo de tromboplastina parcial ativada.",
    regra: { tipo: "suspender_periodo_fixo", valorDias: 14 },
    recomendacaoTexto: "Suspender 2 semanas antes de cirurgia eletiva.",
  },
  {
    id: "equinacea",
    nomeGenerico: "Equinácea",
    sinonimos: "Echinacea purpurea, E. angustifolia, E. pallida",
    usosClinicos:
      "Tratamento de dor de dente, dor intestinal, picadas de cobra, distúrbios de pele, convulsões, infecções crônicas do trato respiratório superior e inferior; ajuda na cicatrização e fortalece o sistema imune e contra câncer. Possui atividade antifúngica, antibacteriana e antiviral.",
    mecanismoAcao:
      "Inibe o citocromo P450 (CYP3A4), interferindo no metabolismo da varfarina (sem afetar sua farmacocinética ou a agregação plaquetária). Induz CYP3A4, reduzindo o metabolismo e potencializando esteroides e ciclosporina. Deve ser evitada em pacientes recebendo imunossupressores.",
    efeitosAdversos: "Taquifilaxia, cefaleia, náusea, constipação, dor abdominal, rash, leucopenia, hepatotoxicidade, insuficiência hepática aguda.",
    interacoesMedicamentosas: "Pode reduzir os efeitos de esteroides e potencializar a toxicidade de barbitúricos. Reações alérgicas; reduz a eficácia de imunossupressores.",
    regra: { tipo: "suspender_periodo_fixo", valorDias: 21 },
    recomendacaoTexto: "Suspender 2-3 semanas antes de cirurgia eletiva.",
  },
  {
    id: "efedra",
    nomeGenerico: "Efedra",
    sinonimos: "Ephedra sinica, E. equisetina, Huang, herbal ecstasy, herbal fen-phen",
    usosClinicos:
      "Usada para perder peso e aumentar energia; tratar tosse, asma, resfriado comum, calafrios, febre, congestão nasal, dispepsia, febre do feno, nefrite, sífilis e gonorreia; antimalárico e cicatrizante.",
    mecanismoAcao:
      "Ações cardiovasculares por efedrina, pseudoefedrina, norefedrina e metilefedrina; a efedrina libera norepinefrina endógena; induz CYP1A2; uso concomitante de inibidores da monoamina-oxidase pode causar hipertermia maligna, hipotensão e coma; os efeitos da efedra são potencializados tanto por metilxantinas (cafeína, teofilina) quanto por inibidores da MAO.",
    efeitosAdversos:
      "AVC, estimulação excessiva do SNC, ansiedade, inquietação, distúrbios do sono, psicose, formação de cálculo renal, hipertermia maligna, coma; 64% de todos os eventos adversos por suplementação herbal nos EUA vieram de produtos contendo efedra; em 2004 a FDA determinou a remoção de produtos com efedra do mercado por esses riscos.",
    interacoesMedicamentosas:
      "Risco de isquemia miocárdica e AVC por taquicardia, hipertensão, arritmias ventriculares; uso prolongado depleta catecolaminas endógenas e pode causar instabilidade hemodinâmica durante anestesia; interação potencialmente fatal com inibidores da monoamina-oxidase.",
    regra: { tipo: "suspender_periodo_fixo", valorDias: 14 },
    recomendacaoTexto:
      "Idealmente suspender pelo menos 2 semanas antes de cirurgia eletiva. Outra publicação citada no artigo sugere 'pelo menos 24h antes da cirurgia' como alternativa menos conservadora.",
  },
  {
    id: "feverfew",
    nomeGenerico: "Matricária (Feverfew)",
    sinonimos: "Tanacetum parthenium, Chrysanthemum parthenium, Pyrethrum parthenium, camomila-brava, altamisa",
    usosClinicos: "Tratamento de enxaqueca, cefaleia, artrite, dor abdominal, dor de dente, picadas de inseto, infertilidade, dor menstrual, câncer e dor de parto.",
    mecanismoAcao:
      "Atividade antiplaquetária por inibição da agregação e secreção plaquetária; interage com medicamentos metabolizados no fígado por enzimas P450 (ex.: AINEs e anticoagulantes).",
    efeitosAdversos:
      "Inflamação da mucosa oral e da língua com edema labial, perda de paladar e ulcerações; a 'síndrome pós-feverfew' inclui dor e rigidez articular, cefaleia, insônia e fadiga após descontinuação de uso crônico.",
    interacoesMedicamentosas: "Pode aumentar o risco de sangramento e potencializar os efeitos de drogas anticoagulantes; taquicardia.",
    regra: { tipo: "suspender_periodo_fixo", valorDias: 21 },
    recomendacaoTexto:
      "Reduzir gradualmente (desmame) para evitar sintomas de abstinência e suspender completamente 2-3 semanas antes de cirurgia eletiva. Pode ser retomada 2 semanas após a cirurgia.",
  },
  {
    id: "alho",
    nomeGenerico: "Alho",
    sinonimos: "Allium sativum",
    usosClinicos:
      "Tratamento de infecções, tosse, aterosclerose, formação de trombos, resistência vascular pulmonar e sistêmica, diabetes, hipertensão e hiperlipidemia. Usado como expectorante, diurético, anticâncer e para fortalecer o sistema imune.",
    mecanismoAcao:
      "A ajoena, composto ativo do alho, potencializa inibidores plaquetários. A aliina causa hipoglicemia, melhorando a sensibilidade à insulina ao inibir glicólise e estimular secreção de insulina; manipula o metabolismo hepático de glicogênio; fitoquímicos inibem dipeptidil-peptidase-4 e têm atividade antioxidante.",
    efeitosAdversos: "Halitose ou odor cutâneo, desconforto gastrointestinal e ocasionalmente rash cutâneo.",
    interacoesMedicamentosas: "Aumenta o risco de sangramento, especialmente combinado com outras medicações que inibem agregação plaquetária; pode aumentar o risco de hematoma epidural; e hipoglicemia.",
    regra: { tipo: "suspender_periodo_fixo", valorDias: 14 },
    recomendacaoTexto:
      "Suspender 1-2 semanas antes da cirurgia e pode ser retomado 1 semana após. Um estudo sugeriu que o alho da dieta era seguro no pós-operatório, enquanto outro recomendou esperar 4-8 semanas antes de retomar produtos com alho.",
  },
  {
    id: "gengibre",
    nomeGenerico: "Gengibre",
    sinonimos: "Zingiber officinale, Zingiberis rhizoma",
    usosClinicos:
      "Tratamento de náusea e vômito na gravidez, após quimioterapia e no pós-operatório (NVPO); tratamento de problemas respiratórios (ex.: asma) ao atenuar hiper-resposta de vias aéreas e romper tampões de muco espesso; dor de garganta.",
    mecanismoAcao:
      "Prolonga o tempo de sangramento via inibição do tromboxano e agregação plaquetária prejudicada; interfere nas propriedades anticoagulantes da varfarina, resultando em INR supra-terapêutico. Inibe enzimas alfa-glicosidase e alfa-amilase, estimula a via metabólica da glicose e potencializa a regulação glicêmica mediada por insulina; reduz HbA1c sugerindo efeito hipoglicemiante de longo prazo; tem ação antioxidante/anti-inflamatória via via NF-κB.",
    efeitosAdversos: "Desconforto gastrointestinal, incluindo azia, diarreia e dor abdominal.",
    interacoesMedicamentosas: "Risco potencial de sangramento, hematomas epidurais com anestesia neuraxial.",
    regra: { tipo: "suspender_periodo_fixo", valorDias: 21 },
    recomendacaoTexto:
      "Suspender 2-3 semanas antes da cirurgia e retomar 2 semanas após. Embora controverso, alguns estudos sugerem que pode ajudar a prevenir NVPO.",
  },
  {
    id: "ginkgo",
    nomeGenerico: "Ginkgo biloba",
    sinonimos: "árvore-fóssil, maidenhair tree, kew tree, bai guo ye, yinshing",
    usosClinicos:
      "Melhora a função cognitiva e trata doenças cerebrovasculares e vasculares periféricas; usado para tratar morte neuronal hipocampal após isquemia global transitória e outros distúrbios cognitivos e de memória (ex.: Alzheimer, demência pós-infarto).",
    mecanismoAcao: "Propriedades anti-inflamatórias e antiplaquetárias. Afeta a regulação vascular, modulação de neurotransmissores, e potencializa o efeito do cilostazol em prolongar o tempo de sangramento.",
    efeitosAdversos: "Hiponatremia, contribuindo para cefaleia, confusão e letargia; reduz o limiar convulsivo.",
    interacoesMedicamentosas: "Risco de sangramento perioperatório, sangramento intracraniano espontâneo, hematoma subdural, hifema espontâneo.",
    regra: { tipo: "suspender_periodo_fixo", valorDias: 14 },
    recomendacaoTexto:
      "As recomendações para suspensão variam de 3 dias a 2 semanas antes de cirurgia eletiva, conforme a fonte. Pode ser retomado uma semana após a cirurgia.",
  },
  {
    id: "ginseng",
    nomeGenerico: "Ginseng",
    sinonimos:
      "Panax ginseng (ginseng chinês/coreano) — não confundir com ginseng americano (Panax quinquefolius) ou ginseng siberiano (Eleutherococcus senticosus), que têm propriedades diferentes",
    usosClinicos: "Tratamento de diabetes, angina e estresse; melhora força, resistência e desempenho sexual, efeito antienvelhecimento, e imunoestimulante em pacientes com câncer.",
    mecanismoAcao:
      "Prolonga tanto o tempo de trombina quanto o tempo de tromboplastina parcial ativada e modula a função plaquetária; os ginsenosídeos têm efeito antidiabético ao aumentar sensibilidade e secreção de insulina; estimula metabolismo; reduz apoptose de células beta pancreáticas, aumenta captação de glicose, retarda absorção intestinal de glicose e inibe acúmulo lipídico e produção hepática de glicose.",
    efeitosAdversos: "Boca seca, problemas gastrointestinais, insônia, palpitações e ansiedade; usar com cautela em pacientes tomando AINEs, varfarina (Coumadin) e fenelzina (Nardil), e em hipertensos.",
    interacoesMedicamentosas: "Risco de sangramento potencializado quando tomado concomitantemente com AINEs, varfarina ou aspirina; hipoglicemia; palpitações.",
    regra: { tipo: "suspender_periodo_fixo", valorDias: 14 },
    recomendacaoTexto: "Suspender 1-2 semanas antes de cirurgia eletiva e pode ser retomado 2 semanas após a cirurgia.",
  },
  {
    id: "hidraste",
    nomeGenerico: "Hidraste (Goldenseal)",
    sinonimos: "Hydrastis canadensis, goldenroot, eye root, turmeric root, yellow paint root",
    usosClinicos: "Usado como anti-inflamatório e antibacteriano para distúrbios digestivos; tratamento de resfriado, gripe, infecções respiratórias, câncer de mama/próstata, e para reduzir colesterol.",
    mecanismoAcao:
      "Inibe isoenzimas do citocromo P450 (CYP3A4, CYP2D6 e provavelmente CYP2C9); atividade antiplaquetária e anticoagulante via inibição do sistema citocromo hepático, principalmente CYP3A4; altera o transportador de efluxo intestinal BCRP e transportadores hepáticos de captação OATP1B1/B3; efeito anti-hipertensivo por vasodilatação; inibe canais de cálcio na musculatura lisa vascular (reduz resistência vascular e pressão arterial), melhora função endotelial; propriedades anti-inflamatórias; estimula contratilidade cardíaca (inotrópico positivo) ao aumentar cálcio intracelular; antagonismo em alfa-1-adrenoceptores vasculares; potencializa efeito hipotensor da acetilcolina via nervo vago, inibe reflexo pressor do seio carotídeo e liberação de óxido nítrico dependente de endotélio; produz hipoglicemia ao promover secreção de insulina e regeneração de células beta.",
    efeitosAdversos: "Fotossensibilidade; hepatotoxicidade; eleva transitoriamente AST e ALT.",
    interacoesMedicamentosas:
      "Aumenta o risco perioperatório de sangramento; risco de sedação perioperatória ao aumentar a biodisponibilidade do midazolam (40%); piora o controle glicêmico ao reduzir a biodisponibilidade da metformina (23-27%); risco de hipernatremia.",
    regra: { tipo: "suspender_periodo_fixo", valorDias: 21 },
    recomendacaoTexto: "Suspender pelo menos 2-3 semanas antes de cirurgia eletiva.",
  },
  {
    id: "cha_verde",
    nomeGenerico: "Chá verde",
    sinonimos: "Camellia sinensis, extrato de chá verde, polifenóis do chá verde, EGCG (epigalocatequina galato)",
    usosClinicos: "Usado para reduzir colesterol, melhorar saúde cardíaca, tratar hipertensão, perda de peso ('queima de gordura') e prevenir câncer.",
    mecanismoAcao:
      "Inibe a formação de tromboxano A2, exercendo efeito antitrombótico; pode conter grande quantidade de vitamina K, que interage com varfarina e outras drogas metabolizadas por CYP1A2, CYP2C9 e CYP3A4; contém altas concentrações de cafeína, que alteram níveis plasmáticos de epinefrina e norepinefrina causando taquicardia e hipertensão; altos níveis de cafeína podem antagonizar receptores de benzodiazepínicos, adenosina e histamina, reduzindo os efeitos sedativo-hipnóticos.",
    efeitosAdversos: "Combinado com estatinas, pode causar dor musculoesquelética e fadiga; efeito antitrombótico; eleva AST e ALT por hepatotoxicidade.",
    interacoesMedicamentosas: "Aumenta o risco de sangramento pós-cirúrgico; aumenta pressão arterial e frequência cardíaca; reduz o efeito sedativo-hipnótico perioperatório de benzodiazepínicos e anestésicos gerais.",
    regra: { tipo: "suspender_periodo_fixo", valorDias: 7 },
    recomendacaoTexto: "Suspender pelo menos 1 semana antes de cirurgia eletiva. Outra publicação citada no artigo sugere que é seguro usar no período perioperatório.",
  },
  {
    id: "guduchi",
    nomeGenerico: "Guduchi",
    sinonimos: "Tinospora cordifolia",
    usosClinicos:
      "Usado para reduzir glicemia e colesterol; efeitos cardio-, hepato- e renoprotetores; imunomodulador, antioxidante, expectorante, analgésico, antidiabético, antialérgico, anti-inflamatório, anticâncer, anti-osteoporótico, antimicrobiano, antileprótico; possui atividade anti-HIV e anti-SARS-CoV-2.",
    mecanismoAcao:
      "Tem propriedades trombolíticas e potencializa drogas trombolíticas; aumenta secreção de insulina e diminui gliconeogênese e glicogenólise; atividade imunomoduladora atribuída ao aumento da atividade de macrófagos e produção de espécies reativas de oxigênio.",
    efeitosAdversos: "Desconforto gastrointestinal.",
    interacoesMedicamentosas: "Pode aumentar o risco de sangramento no sítio cirúrgico ao potencializar drogas trombolíticas; aumenta o risco de hipoglicemia intra e pós-operatória.",
    regra: { tipo: "suspender_periodo_fixo", valorDias: 21 },
    recomendacaoTexto: "Suspender pelo menos 2-3 semanas antes de cirurgia eletiva.",
  },
  {
    id: "epimedium",
    nomeGenerico: "Erva-do-bode-córneo (Horny Goat Weed)",
    sinonimos: "Epimedium sagittatum, E. grandiflorum, E. brevicornum, yin yang huo, inyokaku, herba epimedii",
    usosClinicos: "Usado para melhorar desempenho sexual, sintomas de menopausa, fortalecer ossos, tratar osteoporose e condições reumatológicas; efeito cardioprotetor.",
    mecanismoAcao:
      "Aumenta o relaxamento da musculatura lisa e causa vasodilatação por bloqueio de canais de cálcio e bloqueio catecolaminérgico; melhora disfunção ventricular e remodelamento cardíaco, promovendo recuperação de lesões de reperfusão e isquemia cardíaca; propriedades neuroprotetoras por proliferação de células-tronco neurais hipocampais.",
    efeitosAdversos: "Sudorese e sensação de calor; arritmias, dor torácica e falta de ar.",
    interacoesMedicamentosas: "Vasodilatação e hipotensão.",
    regra: { tipo: "suspender_periodo_fixo", valorDias: 14 },
    recomendacaoTexto: "Suspender 2 semanas antes da cirurgia.",
  },
  {
    id: "kava",
    nomeGenerico: "Kava",
    sinonimos: "Piper methysticum, kava-kava, kawa, kavain, rauschpfeffer, tonga, yaqona",
    usosClinicos: "Usado para tratar ansiedade, insônia, asma, cefaleia e infecções do trato urinário; relaxamento mental, melhora função cognitiva e tem propriedades relaxantes musculares.",
    mecanismoAcao:
      "Similar a sedativo-hipnóticos ao potencializar atividade inibitória GABAérgica no SNC, potencializando a ação de anestésicos inalatórios, barbitúricos e benzodiazepínicos; as cavapironas da kava medeiam seus efeitos sedativos, ansiolíticos, anticonvulsivantes, relaxantes musculares, anestésicos locais e hipnóticos.",
    efeitosAdversos: "Dermopatia, potencial de dependência e abuso; hepatotoxicidade.",
    interacoesMedicamentosas: "Potencializa efeitos sedativos de anestésicos gerais, barbitúricos e opioides no período perioperatório; reduz a necessidade de anestésico.",
    regra: { tipo: "suspender_periodo_fixo", valorDias: 21 },
    recomendacaoTexto: "Suspender 2-3 semanas antes de cirurgia eletiva. Outros autores sugerem que basta suspender pelo menos 1 dia antes.",
  },
  {
    id: "alcacuz",
    nomeGenerico: "Alcaçuz (Licorice)",
    sinonimos: "Glycyrrhiza glabra, gan cao, sweet root",
    usosClinicos:
      "Usado como hepatoprotetor, anti-inflamatório, antiviral, antiulceroso, antioxidante, antialérgico e para sintomas de Parkinson; possui propriedades antimicrobianas e imunorreguladoras; usado para tratar síndrome do ovário policístico (SOP) por suas propriedades antiandrogênicas e semelhantes ao estrogênio; usado principalmente como adoçante/aromatizante de alimentos.",
    mecanismoAcao:
      "Inibe enzimas CYP; previne a toxicidade hepática induzida por álcool; o ácido glicirrízico previne o metabolismo do cortisol com uso prolongado, e níveis excessivos se ligam a receptores mineralocorticoides, resultando em pseudo-hiperaldosteronismo.",
    efeitosAdversos:
      "Pseudo-hiperaldosteronismo (hipertensão, arritmia cardíaca, edema, alcalose metabólica e supressão do sistema renina-angiotensina-aldosterona) por ingestão prolongada; doses altas podem causar paralisia, rabdomiólise, trombocitopenia e insuficiência renal.",
    interacoesMedicamentosas:
      "Pseudo-hiperaldosteronismo, hipertensão, hipocalemia. Interações com cilostazol e diuréticos que depletam potássio (tiazídicos e de alça) podem produzir hipocalemia.",
    regra: { tipo: "suspender_periodo_fixo", valorDias: 21 },
    recomendacaoTexto:
      "Suspender 2-3 semanas antes de cirurgia eletiva. O uso tópico de alcaçuz pode ser mantido no pré-operatório, pois já demonstrou reduzir dor de garganta pós-operatória.",
  },
  {
    id: "tilia",
    nomeGenerico: "Flor de tília (Linden)",
    sinonimos: "Tilia cordata, Basswood, Fleur de Tilleul, Lime Blossom, Tilo",
    usosClinicos: "Tratamento de insônia, ansiedade e condições relacionadas a estresse; usado para tratar hipertensão, cefaleia, histeria, resfriados, congestão nasal, irritação de garganta, palpitações; diurético e antiespasmódico.",
    mecanismoAcao: "Atua em sinapses GABAérgicas hipocampais e inibe a excitabilidade de rede ao potencializar a saída sináptica inibitória.",
    efeitosAdversos: "Dano cardíaco pode ocorrer com uso frequente.",
    interacoesMedicamentosas: "Aumenta o efeito sedativo-hipnótico de drogas tipo benzodiazepínico.",
    regra: { tipo: "suspender_periodo_fixo", valorDias: 21 },
    recomendacaoTexto: "Suspender pelo menos 2-3 semanas antes de cirurgia eletiva.",
  },
  {
    id: "juba_de_leao",
    nomeGenerico: "Juba-de-leão (Lion's Mane)",
    sinonimos: "Hericium erinaceus, Yamabushitake, Houtou, Monkey's mushroom, bearded tooth",
    usosClinicos:
      "Usado para tratar diversas condições neurológicas, incluindo Alzheimer, Parkinson e comprometimento cognitivo por propriedades neuroprotetoras; também usado por efeitos imunomodulador, antioxidante, antiplaquetário, hipolipemiante, hipoglicemiante, gastroprotetor, ansiolítico e antidepressivo.",
    mecanismoAcao: "Forte atividade antiplaquetária inibindo agregação plaquetária induzida por colágeno; estimula produção pancreática de insulina via células beta existentes.",
    efeitosAdversos: "Efeito colateral raro: síndrome do desconforto respiratório agudo secundária à estimulação linfocitária.",
    interacoesMedicamentosas: "Risco aumentado de sangramento e hipoglicemia perioperatória.",
    regra: { tipo: "suspender_periodo_fixo", valorDias: 21 },
    recomendacaoTexto: "Suspender pelo menos 2-3 semanas antes de cirurgia eletiva.",
  },
  {
    id: "cardo_mariano",
    nomeGenerico: "Cardo-mariano (Milk Thistle)",
    sinonimos: "Silybum marianum, Carduus marianum, holy thistle, lady's thistle, marian thistle",
    usosClinicos:
      "Aumenta secreção de leite em lactantes, reduz cólica menstrual; previne cálculos biliares e icterícia; melhora função renal, hepática e esplênica; usado para tratar varizes; pode beneficiar doenças neurodegenerativas (Alzheimer, Parkinson); propriedades hipocolesterolemiantes e antidiabéticas.",
    mecanismoAcao: "Inibe o CYP2C9, elevando o INR quando tomado concomitantemente com varfarina.",
    efeitosAdversos:
      "Distúrbios gastrointestinais (náusea, vômito, fezes soltas e diarreia) levando à depleção de volume no período perioperatório; alterações de humor, cefaleia, mialgia e dermatopatia.",
    interacoesMedicamentosas: "Pode aumentar o risco de sangramento e o INR quando tomado concomitantemente com varfarina; náusea pós-operatória.",
    regra: { tipo: "suspender_periodo_fixo", valorDias: 21 },
    recomendacaoTexto: "Suspender 1-3 semanas antes de cirurgia eletiva.",
  },
  {
    id: "urtiga",
    nomeGenerico: "Urtiga",
    sinonimos: "Stinging nettle, common nettle, greater nettle",
    usosClinicos:
      "Tratamento de artrite, gota, eczema, infecções urinárias e hiperplasia prostática benigna (HPB); hipertensão e recuperação pós-parto (reduz risco de hemorragia pós-parto e estimula lactação); propriedades anti-inflamatórias e estimula atividade adrenal; tanto oral quanto tópica reduzem dor osteoartrítica; atividade antimicrobiana contra bactérias Gram-positivas e Gram-negativas.",
    mecanismoAcao:
      "Interfere na atividade das enzimas CYP450 e pode prolongar a ação de medicações metabolizadas por essa via; interage com antiplaquetários e anticoagulantes, além de inibidores da ECA, betabloqueadores, bloqueadores de canal de cálcio, diuréticos, antidiabéticos e lítio.",
    efeitosAdversos: "Inibe absorção de ferro; ginecomastia, galactorreia, urticária e rinite alérgica.",
    interacoesMedicamentosas:
      "Risco de sangramento aumentado com uso concomitante de antiplaquetários e anticoagulantes; risco de hipotensão, potencializado por inibidores da ECA, betabloqueadores, bloqueadores de canal de cálcio e diuréticos; hipoglicemia (por potencializar antidiabéticos), desidratação.",
    regra: { tipo: "suspender_periodo_fixo", valorDias: 14 },
    recomendacaoTexto: "Suspender pelo menos 2 semanas antes de cirurgia eletiva.",
  },
  {
    id: "hortela_pimenta",
    nomeGenerico: "Hortelã-pimenta (Peppermint)",
    sinonimos: "Mentha piperita, balm mint, Japanese peppermint, lamb mint",
    usosClinicos:
      "Tratamento de cefaleia, síndrome do intestino irritável, náusea, distúrbios respiratórios e vômito induzido por quimioterapia; também usada para prurido, irritação de pele, anti-inflamatório e antimicrobiano; o mentol da hortelã relaxa a musculatura do cólon e reduz inflamação; aumenta alerta, melhora humor e desempenho cognitivo.",
    mecanismoAcao:
      "Melhora o humor via modulação de vias dopaminérgicas centrais; melhora níveis de insulina e peptídeo-C, restaurando a estrutura pancreática; aumenta a biodisponibilidade de drogas metabolizadas via CYP1A2 (ex.: amitriptilina, varfarina, ciclosporina, haloperidol); reduz fibrose hepática e melhora função hepática; reverte lesão hepática em pacientes diabéticos via efeitos hepatoprotetores do mentol; ação antiapoptótica, aumentando sobrevida celular ao regular positivamente Bcl-2.",
    efeitosAdversos:
      "Pode causar azia, náusea, alterações visuais, queimação perianal e dermatite de contato com uso tópico; nefrite intersticial, insuficiência renal e lesão pulmonar aguda foram relatadas com injeção IV de óleo de hortelã-pimenta.",
    interacoesMedicamentosas: "Risco de sangramento quando tomada com varfarina; hipoglicemia.",
    regra: { tipo: "suspender_periodo_fixo", valorDias: 21 },
    recomendacaoTexto:
      "Suspender 2-3 semanas antes de cirurgia eletiva. A aromaterapia com hortelã-pimenta tem sido usada no pós-operatório para tratar distúrbios de sono, dor, ansiedade aguda e náusea.",
  },
  {
    id: "polygonum_multiflorum",
    nomeGenerico: "Polygonum multiflorum (He Shou Wu)",
    sinonimos: "PM, Fo-Ti",
    usosClinicos:
      "Tratamento de sintomas de envelhecimento (ex.: encanecimento precoce dos cabelos); possui efeitos hepatoprotetores ao inibir produção de ácidos graxos, promover decomposição de triglicerídeos, reduzir inflamação e inibir fibrose hepática; usado para hiperlipidemia, inflamação, disfunção sexual, espermatorreia, leucorreia, tontura com zumbido, dor lombar, constipação e para prevenir recorrência de malária.",
    mecanismoAcao: "Potente atividade antiplaquetária devido ao componente tetrahidroxistilbeno glicosídeo; estimula secreção de insulina e mantém a função das células beta.",
    efeitosAdversos: "Dor abdominal, diarreia, náusea e vômito; lesão hepática resulta de disrupção da homeostase de ácidos biliares.",
    interacoesMedicamentosas: "Aumenta os riscos de sangramento e hipoglicemia; náusea e vômito pós-operatórios.",
    regra: { tipo: "suspender_periodo_fixo", valorDias: 21 },
    recomendacaoTexto: "Suspender pelo menos 2-3 semanas antes de cirurgia eletiva.",
  },
  {
    id: "saw_palmetto",
    nomeGenerico: "Palmeira-anã (Saw Palmetto)",
    sinonimos: "Serenoa repens, american dwarf palm tree, cabbage palm",
    usosClinicos:
      "Tratamento de alopecia induzida por andrógenos, disfunção sexual, sintomas do trato urinário inferior (fluxo urinário fraco, hesitação, esforço e esvaziamento incompleto, frequência, urgência e noctúria) e hiperplasia prostática benigna (HPB).",
    mecanismoAcao:
      "Causa disfunção plaquetária e prolongamento do tempo de sangramento por inibição da ciclo-oxigenase; inibe enzimas CYP450, prolongando a duração de ação de drogas metabolizadas por essas enzimas devido à inibição da glicoproteína-P e da atividade CYP3A4.",
    efeitosAdversos: "Desconforto gastrointestinal leve, náusea, fadiga, cefaleia, diminuição da libido e rinite.",
    interacoesMedicamentosas: "Pode aumentar o risco de sangramento e prolongar o tempo de sangramento quando tomado concomitantemente com rivaroxabana.",
    regra: { tipo: "suspender_periodo_fixo", valorDias: 21 },
    recomendacaoTexto: "Suspender pelo menos 2-3 semanas antes da cirurgia e retomar 2 semanas após.",
  },
  {
    id: "erva_de_sao_joao",
    nomeGenerico: "Erva-de-São-João (St. John's Wort)",
    sinonimos: "Hypericum perforatum, goatweed",
    usosClinicos: "Usada para tratar depressão leve a moderada; reduzir complicações pós-operatórias e melhorar a cicatrização após remoção cirúrgica de terceiros molares impactados.",
    mecanismoAcao:
      "Diminui a agregação plaquetária e reduz os efeitos clínicos da varfarina; inibe a recaptação de serotonina, norepinefrina e dopamina; age como inibidor fraco da monoamina-oxidase, e tem alta afinidade por receptores GABA centrais; induz as isoformas CYP3A4 e CYP2C9, reduzindo os efeitos clínicos de alfentanil, midazolam, lidocaína, bloqueadores de canal de cálcio, antagonistas do receptor de serotonina, digoxina, AINEs, varfarina e ciclosporina — mas não afeta o fentanil; a inibição do P450 pode prolongar os efeitos de agentes anestésicos.",
    efeitosAdversos: "Cefaleia, náusea, boca seca, desconforto gastrointestinal, letargia e fotossensibilidade.",
    interacoesMedicamentosas:
      "Síndrome serotoninérgica; efeito reduzido de alfentanil, midazolam, lidocaína, bloqueadores de canal de cálcio e antagonistas do receptor de serotonina; reduz efeitos de varfarina e AINEs; pode prolongar a ação do agente anestésico e aumentar o risco de sangramento pós-operatório.",
    regra: { tipo: "suspender_periodo_fixo", valorDias: 21 },
    recomendacaoTexto: "Suspender pelo menos 2-3 semanas antes de cirurgia eletiva.",
  },
  {
    id: "tribulus_terrestris",
    nomeGenerico: "Tribulus terrestris",
    sinonimos: "Caltrop, puncture vine, gokhru, al-gutub, ba ji li",
    usosClinicos:
      "Melhora desempenho em esportes; trata disfunção sexual feminina (desejo, excitação, lubrificação e satisfação) e masculina; propriedades analgésicas; usado para diabetes, distúrbios cardiovasculares (anti-hipertensivo), cálculos renais e infecções fúngicas.",
    mecanismoAcao:
      "Relaxamento direto da musculatura lisa; inibe a enzima conversora de angiotensina quando tomado com anti-hipertensivos; componentes principais são glicosídeos esteroidais e alcaloides que inibem gliconeogênese; propriedades diuréticas por efeito poupador de potássio, aumentando débito urinário (eficácia comparável à furosemida).",
    efeitosAdversos:
      "Irritação da mucosa gástrica, refluxo gástrico, priapismo; doses excessivas podem causar hiperbilirrubinemia, hepatite, convulsões, lesão renal aguda e necrose tubular aguda com insuficiência renal aguda.",
    interacoesMedicamentosas: "Hipoglicemia (necessário monitorar glicemia perioperatória em diabéticos); uso concomitante com anti-hipertensivos pode causar hipotensão.",
    regra: { tipo: "suspender_periodo_fixo", valorDias: 21 },
    recomendacaoTexto: "Suspender pelo menos 2-3 semanas antes da cirurgia.",
  },
  {
    id: "curcuma",
    nomeGenerico: "Cúrcuma (Turmeric)",
    sinonimos: "Curcuma longa, açafrão-da-índia, curcumina, jiang huang",
    usosClinicos: "Usada como anticarcinogênica, anti-inflamatória, antioxidante, antidepressiva, e possui propriedades hepatoprotetoras.",
    mecanismoAcao:
      "Inibe a atividade da trombina e do fator Xa, prolongando aPTT e PT; eleva níveis de serotonina e dopamina e inibe enzimas monoamina-oxidase; inibe glicolato oxidase, prevenindo cristalização de oxalato de cálcio; inibe CYP450 e prolonga a duração de ação de drogas metabolizadas por essa via (ex.: fentanil, midazolam, varfarina, teofilina, bupivacaína, ropivacaína e lidocaína).",
    efeitosAdversos: "Dor abdominal, rash e reações alérgicas.",
    interacoesMedicamentosas: "Risco aumentado de sangramento. Precaução em pacientes recebendo fentanil, midazolam, varfarina, teofilina, bupivacaína, ropivacaína e lidocaína pelo potencial de prolongamento de suas durações de ação.",
    regra: { tipo: "suspender_periodo_fixo", valorDias: 14 },
    recomendacaoTexto: "Suspender pelo menos 2 semanas antes de cirurgia eletiva.",
  },
  {
    id: "valeriana",
    nomeGenerico: "Valeriana",
    sinonimos: "Valeriana officinalis, garden valerian, Indian valerian, pacific valerian, Mexican valerian",
    usosClinicos:
      "Tratamento de ansiedade, espasmos musculares, sintomas menopáusicos, insônia e distúrbios do sono pós-operatório; pode prevenir disfunção cognitiva pós-operatória precoce após cirurgia de revascularização do miocárdio; indutores de sono à base de ervas frequentemente contêm valeriana.",
    mecanismoAcao: "Efeito sedativo-hipnótico dose-dependente por potenciação de sistemas neurotransmissores mediados por GABA no SNC; pode causar letargia e depressão.",
    efeitosAdversos: "Desconforto gastrointestinal, cefaleia, palpitações, letargia, depressão, hepatotoxicidade e sudorese.",
    interacoesMedicamentosas: "Potencializa a sedação durante e após a cirurgia quando combinada com drogas anestésicas; uso de longo prazo aumenta a necessidade de anestésico durante a cirurgia.",
    regra: { tipo: "suspender_periodo_fixo", valorDias: 14 },
    recomendacaoTexto:
      "Reduzir gradualmente (desmame) ao longo de 1-2 semanas antes de cirurgia eletiva para evitar sintomas de abstinência. Se descontinuada abruptamente no dia da cirurgia, recomenda-se terapia de reposição com benzodiazepínico.",
  },
];

export function buscarFitoterapico(id: string | null): Fitoterapico | null {
  return FITOTERAPICOS.find((f) => f.id === id) ?? null;
}
