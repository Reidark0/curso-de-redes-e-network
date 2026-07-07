import { lesson1501 } from "../lessons/m15/lesson-15-01.js";
import { lesson1502 } from "../lessons/m15/lesson-15-02.js";
import { lesson1503 } from "../lessons/m15/lesson-15-03.js";
import { lesson1504 } from "../lessons/m15/lesson-15-04.js";
import { lesson1505 } from "../lessons/m15/lesson-15-05.js";
import { lesson1506 } from "../lessons/m15/lesson-15-06.js";
import { lesson1507 } from "../lessons/m15/lesson-15-07.js";
import { lesson1508 } from "../lessons/m15/lesson-15-08.js";
import { lesson1509 } from "../lessons/m15/lesson-15-09.js";
import { lesson1510 } from "../lessons/m15/lesson-15-10.js";
import { lesson1511 } from "../lessons/m15/lesson-15-11.js";
import { lesson1512 } from "../lessons/m15/lesson-15-12.js";

export const module15 = {
  id: "m15",
  number: 15,
  title: "Troubleshooting Profissional de Redes",
  subtitle: "Método profissional para diagnóstico de falhas: evidências, baseline, camada física, LAN, IPv4, DNS, TCP/UDP, firewall, HTTP/TLS, VPN, cloud, pacotes, war room, RCA e playbooks.",
  level: "intermediário-avançado",
  estimatedHours: 34,
  prerequisites: [
    {
      course: "Redes e Network",
      module: "m03-m11",
      lesson: "fundamentos técnicos",
      reason: "Troubleshooting depende de compreender OSI/TCP-IP, Ethernet, IPv4, DNS, TCP/UDP, firewalls, VPN e HTTP/TLS."
    },
    {
      course: "Redes e Network",
      module: "m13",
      lesson: "13.9",
      reason: "Investigação profissional se beneficia de playbooks, logs e coordenação com SOC."
    },
    {
      course: "Redes e Network",
      module: "m14",
      lesson: "14.12",
      reason: "Troubleshooting cloud depende de flow logs, métricas, auditoria e observabilidade."
    }
  ],
  unlockRule: {
    type: "progress",
    requiredPreviousModulePercent: 70
  },
  objectives: [
    "Desenvolver mentalidade profissional de troubleshooting baseada em evidências.",
    "Coletar baseline, linha do tempo, logs, métricas e eventos de mudança.",
    "Diagnosticar problemas físicos, LAN, VLAN, IPv4, DNS, TCP/UDP, firewall, HTTP/TLS, VPN e cloud.",
    "Usar Wireshark, tcpdump e análise de pacotes para validar hipóteses.",
    "Conduzir war room, RCA e playbooks integrados.",
    "Evitar mudanças destrutivas e preservar segurança durante incidentes."
  ],
  lessons: [
    lesson1501,
    lesson1502,
    lesson1503,
    lesson1504,
    lesson1505,
    lesson1506,
    lesson1507,
    lesson1508,
    lesson1509,
    lesson1510,
    lesson1511,
    lesson1512
  ],
  plannedLessons: [
    "15.1",
    "15.2",
    "15.3",
    "15.4",
    "15.5",
    "15.6",
    "15.7",
    "15.8",
    "15.9",
    "15.10",
    "15.11",
    "15.12"
  ],
  moduleProject: {
    title: "War room, RCA e playbook integrado de troubleshooting",
    expectedDeliverables: [
      "Problem statement e escopo",
      "Linha do tempo do incidente",
      "Mapa de fluxo ponta a ponta",
      "Matriz de hipóteses e evidências",
      "Plano de testes por camada",
      "Capturas e logs relevantes",
      "Plano de mitigação e rollback",
      "RCA e ações preventivas",
      "Matriz de hipóteses, evidências e decisões por aula",
      "Runbooks revisados com sintomas intencionais"
    ]
  },

  pendingLessons: [],
  status: "completed",
  assessment: {
    requiredProgressPercent: 70,
    requiredQuizAverage: 70,
    requiredLabs: ["lab-15.1", "lab-15.2", "lab-15.3", "lab-15.4", "lab-15.5", "lab-15.6", "lab-15.7", "lab-15.8", "lab-15.9", "lab-15.10", "lab-15.11", "lab-15.12"],
    completionUnlocks: ["m16"]
  }
};
