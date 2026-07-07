import { lesson0401 } from "../lessons/m04/lesson-04-01.js";
import { lesson0402 } from "../lessons/m04/lesson-04-02.js";
import { lesson0403 } from "../lessons/m04/lesson-04-03.js";
import { lesson0404 } from "../lessons/m04/lesson-04-04.js";
import { lesson0405 } from "../lessons/m04/lesson-04-05.js";
import { lesson0406 } from "../lessons/m04/lesson-04-06.js";
import { lesson0407 } from "../lessons/m04/lesson-04-07.js";
import { lesson0408 } from "../lessons/m04/lesson-04-08.js";
import { lesson0409 } from "../lessons/m04/lesson-04-09.js";
import { lesson0410 } from "../lessons/m04/lesson-04-10.js";

export const module04 = {
  id: "m04",
  number: 4,
  title: "IPv4 e Endereçamento",
  subtitle: "Endereços IPv4, octetos, máscara, CIDR, gateway, tipos de endereço, DHCP, ICMP e troubleshooting básico.",
  level: "iniciante-intermediário",
  estimatedHours: 60,
  icon: "ipv4",
  unlockedByDefault: false,
  prerequisites: [
    {
      type: "module",
      course: "Redes e Network",
      module: "m03",
      reason: "IPv4 depende do entendimento de Ethernet, MAC, ARP, VLANs e entrega local ao gateway."
    },
    {
      type: "module",
      course: "Redes e Network",
      module: "m02",
      reason: "O aluno precisa entender Camada 3, encapsulamento, roteamento e diagnóstico por camadas."
    }
  ],
  unlockRule: {
    type: "progress",
    requiredPreviousModule: "m03",
    requiredPreviousModulePercent: 70
  },
  objectives: [
    "Entender por que IPv4 existe e como complementa Ethernet.",
    "Ler endereços IPv4 em octetos e relacioná-los com binário.",
    "Compreender máscara, CIDR, endereço de rede, hosts e broadcast.",
    "Explicar gateway padrão, rota local, endereços públicos, privados, loopback e APIPA.",
    "Aplicar troubleshooting IPv4 com Windows, Linux e Cisco."
  ],
  lessons: [
    lesson0401,
    lesson0402,
    lesson0403,
    lesson0404,
    lesson0405,
    lesson0406,
    lesson0407,
    lesson0408,
    lesson0409,
    lesson0410
  ],
  pendingLessons: [],
  moduleProject: {
    title: "Diagnóstico e documentação IPv4 de uma rede pequena",
    expectedDeliverables: [
      "Mapa de sub-redes e gateways",
      "Tabela de endereços IPv4, máscaras e funções",
      "Matriz de rota local e gateway",
      "Checklist de troubleshooting IPv4",
      "Matriz de riscos e controles de exposição IPv4",
      "Relatório técnico sanitizado"
    ]
  },
  assessment: {
    requiredProgressPercent: 70,
    requiredQuizAverage: 70,
    requiredLabs: ["lab-4.1", "lab-4.2", "lab-4.3", "lab-4.4", "lab-4.5", "lab-4.6", "lab-4.7", "lab-4.8", "lab-4.9", "lab-4.10"],
    completionUnlocks: ["m05"]
  }
};
