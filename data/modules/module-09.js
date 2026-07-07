import { lesson0901 } from "../lessons/m09/lesson-09-01.js";
import { lesson0902 } from "../lessons/m09/lesson-09-02.js";
import { lesson0903 } from "../lessons/m09/lesson-09-03.js";
import { lesson0904 } from "../lessons/m09/lesson-09-04.js";
import { lesson0905 } from "../lessons/m09/lesson-09-05.js";
import { lesson0906 } from "../lessons/m09/lesson-09-06.js";
import { lesson0907 } from "../lessons/m09/lesson-09-07.js";
import { lesson0908 } from "../lessons/m09/lesson-09-08.js";
import { lesson0909 } from "../lessons/m09/lesson-09-09.js";
import { lesson0910 } from "../lessons/m09/lesson-09-10.js";

export const module09 = {
  id: "m09",
  number: 9,
  title: "Firewalls, ACLs, WAF e Políticas de Tráfego",
  subtitle: "Políticas de tráfego, ACLs, firewall stateful, NAT, WAF, publicação segura, logs, troubleshooting e defesa em profundidade.",
  level: "intermediário",
  estimatedHours: 125,
  icon: "shield",
  unlockedByDefault: false,
  prerequisites:   [
      {
          "type": "module",
          "course": "Redes e Network",
          "module": "m04",
          "reason": "Políticas de tráfego dependem de IPv4, gateway, endereçamento público/privado e entendimento de caminho."
      },
      {
          "type": "module",
          "course": "Redes e Network",
          "module": "m05",
          "reason": "Segmentação e políticas por zona dependem de sub-redes e planejamento de endereçamento."
      },
      {
          "type": "module",
          "course": "Redes e Network",
          "module": "m06",
          "reason": "Firewalls dependem de TCP, UDP, portas, NAT/PAT e estado de conexão."
      },
      {
          "type": "module",
          "course": "Redes e Network",
          "module": "m08",
          "reason": "WAF e políticas HTTP dependem de HTTPS, proxies, APIs, headers e publicação web."
      }
  ],
  unlockRule: { type: "progress", requiredPreviousModule: "m08", requiredPreviousModulePercent: 70 },
  objectives: [
    "Explicar por que firewalls existem e quais problemas resolvem.",
    "Criar e revisar ACLs, regras permit/deny e políticas por zonas.",
    "Diferenciar firewalls stateless, stateful, NGFW, WAF, security groups e NACLs.",
    "Diagnosticar falhas de tráfego usando matriz de fluxos, logs, contadores e capturas.",
    "Aplicar governança defensiva com policy as code, revisão periódica e logs para SIEM."
  ],
  lessons: [
    lesson0901,
    lesson0902,
    lesson0903,
    lesson0904,
    lesson0905,
    lesson0906,
    lesson0907,
    lesson0908,
    lesson0909,
    lesson0910
  ],
  pendingLessons: [],
  plannedLessons: [
    { id: "9.1", title: "Por que firewalls existem" },
    { id: "9.2", title: "ACLs, regras e ordem de processamento" },
    { id: "9.3", title: "Firewalls stateless vs stateful" },
    { id: "9.4", title: "Zonas, DMZ e segmentação segura" },
    { id: "9.5", title: "NAT, port forwarding e publicação controlada" },
    { id: "9.6", title: "WAF, regras HTTP e proteção de APIs" },
    { id: "9.7", title: "Security groups, NACLs e firewalls em cloud" },
    { id: "9.8", title: "Troubleshooting de políticas com logs, contadores e packet capture" },
    { id: "9.9", title: "Governança de regras: revisão, exceções e policy as code" },
    { id: "9.10", title: "Revisão prática: desenhar política de tráfego segura" }
  ],
  integrativeLabs: [
    { id: "lab-9.2", title: "ACL, ordem de regras e shadowing", lessons: ["9.2"] },
    { id: "lab-9.3", title: "Stateless vs stateful, retorno e UDP timeout", lessons: ["9.3"] },
    { id: "lab-9.7", title: "Security Groups vs NACLs", lessons: ["9.7"] },
    { id: "lab-9.8", title: "Troubleshooting com logs, contadores e packet capture", lessons: ["9.8"] },
    { id: "lab-9.10", title: "Projeto integrador de política de tráfego", lessons: ["9.10"] }
  ],
  moduleProject: {
    title: "Desenho de política de tráfego segura para ambiente corporativo híbrido",
    expectedDeliverables: [
      "Mapa de zonas e fluxos autorizados",
      "Matriz de regras com origem, destino, protocolo, porta, dono, justificativa e validade",
      "Plano de logging e envio ao SIEM",
      "Checklist de exposição pública e administração",
      "Runbook de troubleshooting de regras",
      "Plano de revisão e remoção de exceções"
    ]
  },
  assessment: {
    requiredProgressPercent: 70,
    requiredQuizAverage: 70,
    requiredLabs: ["lab-9.2", "lab-9.3", "lab-9.7", "lab-9.8", "lab-9.10"],
    completionUnlocks: ["m10"]
  }
};
