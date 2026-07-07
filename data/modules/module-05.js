import { lesson0501 } from "../lessons/m05/lesson-05-01.js";
import { lesson0502 } from "../lessons/m05/lesson-05-02.js";
import { lesson0503 } from "../lessons/m05/lesson-05-03.js";
import { lesson0504 } from "../lessons/m05/lesson-05-04.js";
import { lesson0505 } from "../lessons/m05/lesson-05-05.js";
import { lesson0506 } from "../lessons/m05/lesson-05-06.js";
import { lesson0507 } from "../lessons/m05/lesson-05-07.js";
import { lesson0508 } from "../lessons/m05/lesson-05-08.js";
import { lesson0509 } from "../lessons/m05/lesson-05-09.js";
import { lesson0510 } from "../lessons/m05/lesson-05-10.js";

export const module05 = {
  id: "m05",
  number: 5,
  title: "Subnetting e planejamento de endereçamento IPv4",
  subtitle: "CIDR, máscaras, hosts úteis, rede, broadcast, bloco mágico, prefixos comuns, VLSM, planejamento, Packet Tracer, segurança e cloud.",
  level: "iniciante-intermediário",
  estimatedHours: 68,
  icon: "subnetting",
  unlockedByDefault: false,
  prerequisites: [
    {
      type: "module",
      course: "Redes e Network",
      module: "m04",
      reason: "Subnetting depende de IPv4, octetos, máscara, CIDR, rede, broadcast, gateway, DHCP, ICMP e troubleshooting."
    },
    {
      type: "module",
      course: "Redes e Network",
      module: "m03",
      reason: "O planejamento de sub-redes geralmente acompanha VLANs, gateways e segmentação de Camada 2."
    }
  ],
  unlockRule: {
    type: "progress",
    requiredPreviousModule: "m04",
    requiredPreviousModulePercent: 70
  },
  objectives: [
    "Entender por que subnetting existe e qual problema operacional ele resolve.",
    "Calcular CIDR, máscaras, quantidade de hosts, rede, broadcast, primeiro e último host.",
    "Aplicar o método do bloco mágico sem decorar tabelas cegamente.",
    "Usar prefixos comuns como /24, /25, /26, /27, /28, /29, /30 e /32.",
    "Planejar VLSM e endereçamento corporativo por função, crescimento e segurança.",
    "Relacionar subnetting com VLANs, roteamento, firewall, cloud, DevSecOps e troubleshooting."
  ],
  lessons: [
    lesson0501,
    lesson0502,
    lesson0503,
    lesson0504,
    lesson0505,
    lesson0506,
    lesson0507,
    lesson0508,
    lesson0509,
    lesson0510
  ],
  pendingLessons: [],
  plannedLessons: [
    { id: "5.1", title: "Por que subnetting existe" },
    { id: "5.2", title: "CIDR, máscara e quantidade de hosts" },
    { id: "5.3", title: "Rede, broadcast, primeiro e último host" },
    { id: "5.4", title: "Método do bloco mágico" },
    { id: "5.5", title: "Prefixos comuns na prática: /24 a /32" },
    { id: "5.6", title: "VLSM: sub-redes de tamanhos diferentes" },
    { id: "5.7", title: "Planejamento de endereçamento corporativo" },
    { id: "5.8", title: "Laboratório Packet Tracer: quatro sub-redes /26" },
    { id: "5.9", title: "Subnetting para segurança e cloud" },
    { id: "5.10", title: "Revisão prática e desafios de subnetting" }
  ],
  integrativeLabs: [
    { id: "lab-5.2", title: "Lab 1 — Cálculo de sub-redes com validação manual", lesson: "5.2", purpose: "Substitui pequenos labs de cálculo por uma prática manual auditável." },
    { id: "lab-5.8", title: "Lab 2 — Packet Tracer: quatro sub-redes /26", lesson: "5.8", purpose: "Configura rede realista com gateways, PCs, falhas e validação." },
    { id: "lab-5.6", title: "Lab 3 — VLSM corporativo com departamentos", lesson: "5.6", purpose: "Transforma cálculo em decisão arquitetural de capacidade e segurança." },
    { id: "lab-5.9", title: "Lab 4 — Subnetting para cloud: pública, privada, banco e gestão", lesson: "5.9", purpose: "Conecta subnetting a cloud, custo, limpeza e não sobreposição." }
  ],
  moduleProject: {
    title: "Plano de subnetting para uma pequena empresa híbrida",
    expectedDeliverables: [
      "Tabela de sub-redes por função",
      "Cálculo de rede, primeiro host, último host e broadcast",
      "Gateways e escopos DHCP planejados",
      "Diagrama lógico com VLANs e sub-redes",
      "Matriz de firewall entre sub-redes",
      "Verificação de sobreposição com cloud/VPN",
      "Documentação IPAM sanitizada",
      "Plano de validação em Packet Tracer",
      "Evidências dos quatro labs integradores do M05"
    ]
  },
  assessment: {
    requiredProgressPercent: 70,
    requiredQuizAverage: 70,
    requiredLabs: ["lab-5.2", "lab-5.6", "lab-5.8", "lab-5.9"],
    completionUnlocks: ["m06"]
  }
};
