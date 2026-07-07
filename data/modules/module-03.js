import { lesson0301 } from "../lessons/m03/lesson-03-01.js";
import { lesson0302 } from "../lessons/m03/lesson-03-02.js";
import { lesson0303 } from "../lessons/m03/lesson-03-03.js";
import { lesson0304 } from "../lessons/m03/lesson-03-04.js";
import { lesson0305 } from "../lessons/m03/lesson-03-05.js";
import { lesson0306 } from "../lessons/m03/lesson-03-06.js";
import { lesson0307 } from "../lessons/m03/lesson-03-07.js";
import { lesson0308 } from "../lessons/m03/lesson-03-08.js";
import { lesson0309 } from "../lessons/m03/lesson-03-09.js";
import { lesson0310 } from "../lessons/m03/lesson-03-10.js";

export const module03 = {
  id: "m03",
  number: 3,
  title: "Ethernet, MAC, Switches e ARP",
  subtitle: "Como a rede local realmente entrega quadros: Ethernet, endereços MAC, switches, broadcast, ARP, VLANs, STP e riscos de Camada 2.",
  level: "iniciante-intermediário",
  estimatedHours: 52,
  icon: "switch",
  unlockedByDefault: false,
  prerequisites: [
    {
      type: "module",
      course: "Redes e Network",
      module: "m02",
      reason: "Ethernet, MAC, switches e ARP dependem do entendimento do Modelo OSI, especialmente Camadas 1, 2 e 3."
    },
    {
      type: "module",
      course: "Redes e Network",
      module: "m01",
      reason: "O aluno precisa conhecer dispositivos, topologias, meios de transmissão, cabeamento, equipamentos e diagnóstico inicial."
    }
  ],
  unlockRule: {
    type: "progress",
    requiredPreviousModule: "m02",
    requiredPreviousModulePercent: 70
  },
  objectives: [
    "Entender Ethernet como base da LAN cabeada.",
    "Analisar frames Ethernet, endereços MAC e EtherType.",
    "Explicar como switches aprendem MACs, encaminham frames e lidam com flooding.",
    "Compreender domínios de colisão, broadcast, VLANs, STP e loops.",
    "Aplicar troubleshooting e segurança defensiva em Camada 2."
  ],
  lessons: [
    lesson0301,
    lesson0302,
    lesson0303,
    lesson0304,
    lesson0305,
    lesson0306,
    lesson0307,
    lesson0308,
    lesson0309,
    lesson0310
  ],
  pendingLessons: [],
  moduleProject: {
    title: "Diagnóstico e desenho seguro de uma LAN Ethernet",
    expectedDeliverables: [
      "Mapa físico e lógico de uma LAN pequena",
      "Tabela de MACs, portas, VLANs e gateways",
      "Diagrama de frame até gateway",
      "Plano de troubleshooting de Camada 2",
      "Matriz de riscos e controles defensivos de L2",
      "Relatório técnico sanitizado"
    ]
  },
  assessment: {
    requiredProgressPercent: 70,
    requiredQuizAverage: 70,
    requiredLabs: ["lab-3.1", "lab-3.2", "lab-3.3", "lab-3.4", "lab-3.5", "lab-3.6", "lab-3.7", "lab-3.8", "lab-3.9", "lab-3.10"],
    completionUnlocks: ["m04"]
  }
};
