import { lesson1701 } from "../lessons/m17/lesson-17-01.js";
import { lesson1702 } from "../lessons/m17/lesson-17-02.js";
import { lesson1703 } from "../lessons/m17/lesson-17-03.js";
import { lesson1704 } from "../lessons/m17/lesson-17-04.js";
import { lesson1705 } from "../lessons/m17/lesson-17-05.js";
import { lesson1706 } from "../lessons/m17/lesson-17-06.js";
import { lesson1707 } from "../lessons/m17/lesson-17-07.js";
import { lesson1708 } from "../lessons/m17/lesson-17-08.js";
import { lesson1709 } from "../lessons/m17/lesson-17-09.js";
import { lesson1710 } from "../lessons/m17/lesson-17-10.js";
import { lesson1711 } from "../lessons/m17/lesson-17-11.js";
import { lesson1712 } from "../lessons/m17/lesson-17-12.js";

export const module17 = {
  id: "m17",
  number: 17,
  title: "Revisão, simulados, estudos de caso e capstone final",
  subtitle: "Consolidação completa do curso Redes e Network por revisão ativa, mapas mentais, simulados, estudos de caso, portfólio e projeto final ponta a ponta.",
  level: "avançado",
  estimatedHours: 54,
  prerequisites: [
    { course: "Redes e Network", module: "m12", lesson: "12.10", reason: "Wireless e segurança Wi-Fi aparecem nos simulados e estudos de caso finais." },
    { course: "Redes e Network", module: "m13", lesson: "13.10", reason: "Segurança de redes sustenta arquitetura defensiva, estudos de caso e capstone." },
    { course: "Redes e Network", module: "m14", lesson: "14.14", reason: "Cloud Networking será integrado ao projeto final e aos simulados avançados." },
    { course: "Redes e Network", module: "m15", lesson: "15.12", reason: "Troubleshooting, war room, RCA e playbooks são base dos estudos de caso." },
    { course: "Redes e Network", module: "m16", lesson: "16.12", reason: "Cibersegurança defensiva baseada em redes fecha a base para o capstone final." }
  ],
  unlockRule: { type: "progress", requiredPreviousModulePercent: 70 },
  objectives: [
    "Revisar redes de forma profissional e baseada em aplicação.",
    "Construir mapa mental completo do curso, do bit à cloud.",
    "Praticar simulados por blocos de conhecimento.",
    "Resolver estudos de caso corporativos e híbridos.",
    "Transformar laboratórios em portfólio técnico.",
    "Concluir o curso com capstone de arquitetura, defesa e diagnóstico ponta a ponta."
  ],
  lessons: [
    lesson1701,
    lesson1702,
    lesson1703,
    lesson1704,
    lesson1705,
    lesson1706,
    lesson1707,
    lesson1708,
    lesson1709,
    lesson1710,
    lesson1711,
    lesson1712
  ],
  plannedLessons: ["17.1", "17.2", "17.3", "17.4", "17.5", "17.6", "17.7", "17.8", "17.9", "17.10", "17.11", "17.12"],
  competencyMatrix: [
    {
      "id": "C01",
      "name": "Fundamentos, OSI e encapsulamento",
      "modules": [
        "M00",
        "M01",
        "M02"
      ],
      "minimum": 70,
      "mastery": 90,
      "evidence": "explica fluxo de dados por camadas e reconhece onde cada evidência aparece"
    },
    {
      "id": "C02",
      "name": "Ethernet, ARP, VLAN, switching e camada 2",
      "modules": [
        "M03"
      ],
      "minimum": 70,
      "mastery": 90,
      "evidence": "diagnostica MAC, ARP, VLAN, trunk, STP e domínio de broadcast"
    },
    {
      "id": "C03",
      "name": "IPv4, subnetting, gateway e roteamento básico",
      "modules": [
        "M04",
        "M05",
        "M11"
      ],
      "minimum": 75,
      "mastery": 90,
      "evidence": "calcula redes, identifica rota local/default e justifica escolha de caminho"
    },
    {
      "id": "C04",
      "name": "TCP, UDP, portas e serviços essenciais",
      "modules": [
        "M06",
        "M07"
      ],
      "minimum": 75,
      "mastery": 90,
      "evidence": "diferencia conectividade, serviço escutando, firewall, DNS, DHCP, NAT e logs"
    },
    {
      "id": "C05",
      "name": "HTTP, TLS, proxy, firewall, VPN e publicação segura",
      "modules": [
        "M08",
        "M09",
        "M10"
      ],
      "minimum": 75,
      "mastery": 90,
      "evidence": "interpreta erros de aplicação/rede e propõe controles com rollback"
    },
    {
      "id": "C06",
      "name": "Wireless, segurança defensiva e Blue Team",
      "modules": [
        "M12",
        "M13",
        "M16"
      ],
      "minimum": 75,
      "mastery": 90,
      "evidence": "define escopo autorizado, telemetria, detecção, contenção e mitigação"
    },
    {
      "id": "C07",
      "name": "Cloud Networking, Kubernetes e arquitetura híbrida",
      "modules": [
        "M14"
      ],
      "minimum": 75,
      "mastery": 90,
      "evidence": "projeta VPC/VNet, subnets, rotas, Private Endpoint, DNS privado, egress e custos"
    },
    {
      "id": "C08",
      "name": "Troubleshooting profissional, RCA e comunicação",
      "modules": [
        "M15",
        "M17"
      ],
      "minimum": 80,
      "mastery": 92,
      "evidence": "transforma sintomas em hipóteses, coleta evidências, decide, comunica e previne recorrência"
    }
  ],
  finalAssessment: {
    "title": "Avaliação final por competências — Redes e Network v2.0",
    "minimumOverallScore": 80,
    "masteryOverallScore": 92,
    "rule": "concluir M17 exige evidência por competência, simulados corrigidos por tema, capstone com rubrica e plano de revisão para lacunas críticas",
    "scoreBands": [
      {
        "range": "0-59%",
        "status": "insuficiente para conclusão",
        "action": "Não avance. Refaça a revisão guiada, execute laboratórios essenciais e produza nova tentativa com evidências."
      },
      {
        "range": "60-74%",
        "status": "base parcial",
        "action": "Revise competências abaixo do mínimo, foque nos erros conceituais e refaça somente os blocos afetados."
      },
      {
        "range": "75-89%",
        "status": "aprovado com ressalvas",
        "action": "Avance, mas registre lacunas residuais e execute pelo menos um mini lab de reforço por competência fraca."
      },
      {
        "range": "90-100%",
        "status": "domínio forte",
        "action": "Use o resultado como artefato de portfólio, explique decisões em voz alta e ajude outro aluno a revisar o tema."
      }
    ],
    "requiredArtifacts": [
      "matriz de competências C01-C08",
      "simulados 17.3-17.6 com 30 questões cada e simulado final 17.11 com 90 questões corrigidos por competência",
      "estudos de caso 17.7-17.8 com RCA",
      "portfólio 17.9 sanitizado",
      "roadmap 17.10 priorizado",
      "auditoria 17.11 concluída",
      "capstone 17.12 defendido com rubrica"
    ]
  },

  simulationPlan: {
      "status": "p2-05-simulados-concluido",
      "blockSimulations": [
          {
              "lesson": "17.3",
              "title": "Simulado I",
              "questionCount": 30,
              "domains": [
                  "Fundamentos",
                  "OSI/TCP-IP",
                  "Ethernet/L2",
                  "IPv4"
              ]
          },
          {
              "lesson": "17.4",
              "title": "Simulado II",
              "questionCount": 30,
              "domains": [
                  "Subnetting",
                  "TCP/UDP",
                  "DNS",
                  "DHCP",
                  "NAT"
              ]
          },
          {
              "lesson": "17.5",
              "title": "Simulado III",
              "questionCount": 30,
              "domains": [
                  "HTTP/TLS",
                  "Firewalls",
                  "VPN",
                  "Roteamento"
              ]
          },
          {
              "lesson": "17.6",
              "title": "Simulado IV",
              "questionCount": 30,
              "domains": [
                  "Wireless",
                  "Segurança",
                  "Cloud",
                  "Troubleshooting"
              ]
          }
      ],
      "finalSimulation": {
          "lesson": "17.11",
          "questionCount": 90,
          "domains": 12,
          "minimumOverallScore": 80,
          "masteryOverallScore": 92
      },
      "domainGapReport": {
          "required": true,
          "domains": [
              "Fundamentos de Computação",
              "Fundamentos de Redes",
              "OSI/TCP-IP",
              "Ethernet/L2/ARP/VLAN/STP",
              "IPv4/Subnetting/Roteamento",
              "TCP/UDP/DNS/DHCP/NAT",
              "HTTP/TLS/Proxy/API",
              "Firewall/VPN/Zero Trust",
              "Wireless",
              "Cloud Networking",
              "Troubleshooting Profissional",
              "Segurança/Blue Team"
          ]
      }
  },

  moduleProject: {
    title: "Capstone final — arquitetura, defesa, diagnóstico e avaliação por competências",
    expectedDeliverables: [
      "Mapa mental completo do curso",
      "Resultados comentados dos simulados por bloco e do simulado final de 90 questões",
      "Estudos de caso resolvidos",
      "Checklist de laboratórios e portfólio",
      "Roadmap pós-curso",
      "Auditoria de consolidação",
      "Projeto final capstone com arquitetura, segurança, cloud, troubleshooting e defesa",
      "Checklist de aprovação, aprovação com ressalvas ou refazer competência crítica",
      "Trilha de revisão automática baseada em erros dos simulados",
      "Rubrica final de 100 pontos aplicada ao capstone",
      "Matriz de competências C01-C08 com pontuação, evidência e feedback"
    ]
  },

  pendingLessons: [],
  status: "completed",
  assessment: {
    requiredProgressPercent: 70,
    requiredQuizAverage: 70,
    requiredLabs: ["lab-17.1", "lab-17.2", "lab-17.3", "lab-17.4", "lab-17.5", "lab-17.6", "lab-17.7", "lab-17.8", "lab-17.9", "lab-17.10", "lab-17.11", "lab-17.12"],
    completionUnlocks: []
  }
};
