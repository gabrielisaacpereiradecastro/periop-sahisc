export const PROTOCOLO_META = {
  titulo:
    "Nota da Sociedade Brasileira de Anestesiologia (SBA) de atualização sobre as recomendações do manejo perioperatório dos agonistas do receptor GLP-1 e coagonistas GLP-1/GIP",
  numero: "C.SBA - 01744/2026",
  data: "15 de maio de 2026",
  autores:
    "Força-tarefa do Comitê de Medicina Perioperatória da SBA: Lorena Ibiapina Mendes de Carvalho, Liana Maria Torres de Araújo Azi, Gabriel Magalhaes Nunes Guimaraes, Maristela Bueno Lopes, Danillo Ewerton Oliveira Amaral, Amanda Gomes Fonseca, Francília Faloni Coelho, Vanessa Henriques Carvalho, Luiz Carlos Bastos Salles, Plinio da Cunha Leal.",
  chancela:
    "Dr. Luiz Carlos Bastos Salles (Vice-Diretor do Departamento Científico da SBA), Dr. Plínio da Cunha Leal (Diretor do Departamento Científico da SBA), Dr. Vicente Faraon Fonseca (Diretor-Presidente da SBA).",
};

export interface Referencia {
  numero: number;
  citacao: string;
  url?: string;
}

export const REFERENCIAS: Referencia[] = [
  {
    numero: 1,
    citacao:
      "Marino EC, Negretto LAF, Ribeiro RS, Momesso D, Feitosa ACR, Toyoshima MTK, et al. Perioperative screening and management of hyperglycemia: a joint position statement from the Brazilian Diabetes Society (SBD), the Brazilian Society of Anesthesiology (SBA) and the Brazilian Association for the Study of Obesity and Metabolic Syndrome (ABESO). Diabetol Metab Syndr. 2026 Feb 27;18(1):91. doi:10.1186/s13098-025-02060-5",
  },
  {
    numero: 2,
    citacao:
      "Wu HL, Chen JT, Cata JP, Hsieh CH, Cherng YG, Tai YH. Risk of perioperative cardiorespiratory complications and mortality associated with preoperative glucagon-like peptide-1 receptor agonist use in type 2 diabetes mellitus: a nationwide propensity-score matched study. Br J Anaesth. 2026 Jan;136(1):86–97. doi:10.1016/j.bja.2025.08.003",
  },
  {
    numero: 3,
    citacao:
      "Mendes FF, Carvalho LIM, Lopes MB. Glucagon-Like Peptide-1 agonists in perioperative medicine: to suspend or not to suspend, that is the question. Braz J Anesthesiol. 2024 Nov;74(6):844538. doi:10.1016/j.bjane.2024.844538",
  },
  {
    numero: 4,
    citacao:
      "Pai SL, Nimma SR, Beam WB, VanderWielen BA, Kalagara HK, Bettini LM, et al. Assessment of Gastric Content Using Gastric Ultrasound in Patients on Glucagon-Like Peptide-1 Receptor Agonists Before Anesthesia. Anesth Analg. 2026 Apr 1;142(4):640–9. doi:10.1213/ANE.0000000000007764",
  },
  {
    numero: 5,
    citacao:
      "Boudreau B, Watson NC. Anesthesiologists' Perspectives on GLP-1 Receptor Agonists in Elective Surgeries: A Qualitative Survey Analysis of National Data. Cureus. 2025 Nov 3. doi:10.7759/cureus.95986",
  },
  {
    numero: 6,
    citacao:
      "Australian and New Zealand College of Anaesthetists, Australian Diabetes Society, Gastroenterological Society of Australia, National Association of Clinical Obesity Services. Clinical Practice Recommendations Regarding Patients Taking GLP-1 Receptor Agonists and Dual GLP-1/GIP Receptor Co-agonists Prior to Anaesthesia or Sedation 2025. Melbourne; 2025 Apr.",
    url: "https://www.anzca.edu.au/safety-and-advocacy/standards-of-practice/clinicalpractice-recommendations-regarding-patients-taking-glp-1",
  },
  {
    numero: 7,
    citacao:
      "El-Boghdadly K, Dhesi J, Fabb P, Levy N, Lobo DN, McKechnie A, et al. Elective perioperative management of adults taking glucagon-like peptide-1 receptor agonists, glucose-dependent insulinotropic peptide agonists and sodium-glucose cotransporter-2 inhibitors: a multidisciplinary consensus statement. Anaesthesia. 2025. doi:10.1111/anae.16541",
  },
  {
    numero: 8,
    citacao:
      "Chang MG, Bittner EA. Comparison of societal guidance on perioperative management of glucagon-like peptide-1 receptor agonists: implications for clinical practice and future investigations. Can J Anesth. 2024 Sep 26;71(9):1302–15. doi:10.1007/s12630-024-02810-5",
  },
  {
    numero: 9,
    citacao:
      "Oprea AD, Ostapenko LJ, Sweitzer B, Selzer A, Irizarry-Alvarado JM, Hurtado Andrade MD, et al. Perioperative management of patients taking glucagon-like peptide 1 receptor agonists: SPAQI multidisciplinary consensus statement. Br J Anaesth. 2025 Jul;135(1):48–78. doi:10.1016/j.bja.2025.04.001",
  },
  {
    numero: 10,
    citacao:
      "Kindel TL, Wang AY, Wadhwa A, Schulman AR, Sharaiha RZ, Kroh M, et al. Multisociety Clinical Practice Guidance for the Safe Use of Glucagon-like Peptide-1 Receptor Agonists in the Perioperative Period. Clin Gastroenterol Hepatol. 2025 Nov;23(12):2083–5. doi:10.1016/j.cgh.2024.10.003",
  },
  {
    numero: 11,
    citacao:
      "Nersessian RSF, et al. Relationship between residual gastric content and peri-operative semaglutide use assessed by gastric ultrasound: a prospective observational study. Anaesthesia. 2024;79(12):1317–24. doi:10.1111/anae.16454",
  },
  {
    numero: 12,
    citacao:
      "Sherwin M, Hamburger J, Katz D, DeMaria S. Influence of semaglutide use on the presence of residual gastric solids on gastric ultrasound. Can J Anesth. 2023 Aug 19;70(8):1300–6. doi:10.1007/s12630-023-02549-5",
  },
  {
    numero: 13,
    citacao:
      "Sen S, Potnuru PP, Hernandez N, Goehl C, Praestholm C, Sridhar S, et al. Glucagon-Like Peptide-1 Receptor Agonist Use and Residual Gastric Content Before Anesthesia. JAMA Surg. 2024;159(6):660–7. doi:10.1001/jamasurg.2024.0111",
  },
  {
    numero: 14,
    citacao:
      "Perlas A, Arzola C, Van de Putte P. Point-of-care gastric ultrasound and aspiration risk assessment: a narrative review. Can J Anaesth. 2018 Apr;65(4):437–48. doi:10.1007/s12630-017-1031-9",
  },
  {
    numero: 15,
    citacao:
      "Vlaeminck N, Van de Putte P, Dekeyser M, Baert N, Wallyn A, Vernieuwe L, et al. Gastric ultrasound in patients receiving semaglutide: a prospective, multicentre, matched control study. Anaesthesia. 2026 Feb 3. doi:10.1111/anae.70129",
  },
  {
    numero: 16,
    citacao:
      "Muranaka MO, Nguyen TH, Wang AT, Cordero J, Yang SJ, Felix J, et al. Role of Gastric Point-of-Care Ultrasound in Perioperative Management of Semaglutide. Cureus. 2025 Jun 11. doi:10.7759/cureus.85791",
  },
  {
    numero: 17,
    citacao:
      "Ahmad AI, Garg S, Jacobs J, Ansari Z, Al-Din TJ, Almomani A, et al. Holding vs Continuing GLP-1/GIP Agonists Before Upper Endoscopy: The OCULUS Randomized Clinical Trial. JAMA Intern Med. 2026 May 1;186(5):578. doi:10.1001/jamainternmed.2026.0027",
  },
  {
    numero: 18,
    citacao:
      "Wolla CD, Pecha TJ, Sirianni JM, Schorg LM, Wolf BJ, Wilson SH. Ultrasound assessment of preoperative gastric volume in fasted diabetic surgical patients. J Clin Anesth. 2025 Jun;104:111853. doi:10.1016/j.jclinane.2025.111853",
  },
  {
    numero: 19,
    citacao:
      "Chhabra P, Bhandari R, Singh R. Unmasking Aspiration Risks: A Propensity-Matched Odyssey of GLP-1 Receptor Agonists and Colonoscopy. J Gastroenterol Hepatol. 2025 Nov 15;40(11):2732–7. doi:10.1111/jgh.70071",
  },
  {
    numero: 20,
    citacao:
      "Joshi GP, Abdelmalak BB, Weigel WA, Harbell MW, Kuo CI, Soriano SG, et al. 2023 American Society of Anesthesiologists Practice Guidelines for Preoperative Fasting. Anesthesiology. 2023 Feb 11;138(2):132–51. doi:10.1097/ALN.0000000000004381",
  },
  {
    numero: 21,
    citacao:
      "Warner MA, Meyerhoff KL, Warner ME, Posner KL, Stephens L, Domino KB. Pulmonary Aspiration of Gastric Contents: A Closed Claims Analysis. Anesthesiology. 2021 Aug 1;135(2):284–91. doi:10.1097/ALN.0000000000003831",
  },
  {
    numero: 22,
    citacao:
      "Phan J, Chang P, Issa D, Turner R, Dodge J, Westanmo A, et al. Glucagon-Like Peptide Receptor Agonists Use Before Endoscopy Is Associated With Low Retained Gastric Contents: A Multicenter Cross-Sectional Analysis. American Journal of Gastroenterology. 2025 Mar;120(3):554–61. doi:10.14309/ajg.0000000000002969",
  },
];
