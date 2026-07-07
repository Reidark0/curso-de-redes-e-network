import { lesson0601 } from "../lessons/m06/lesson-06-01.js";
import { lesson0602 } from "../lessons/m06/lesson-06-02.js";
import { lesson0603 } from "../lessons/m06/lesson-06-03.js";
import { lesson0604 } from "../lessons/m06/lesson-06-04.js";
import { lesson0605 } from "../lessons/m06/lesson-06-05.js";
import { lesson0606 } from "../lessons/m06/lesson-06-06.js";
import { lesson0607 } from "../lessons/m06/lesson-06-07.js";
import { lesson0608 } from "../lessons/m06/lesson-06-08.js";
import { lesson0609 } from "../lessons/m06/lesson-06-09.js";
import { lesson0610 } from "../lessons/m06/lesson-06-10.js";

export const module06 = {
  id: "m06",
  number: 6,
  title: "TCP, UDP e Portas",
  subtitle: "Camada de transporte, portas, sockets, TCP, UDP, estados de conexão, confiabilidade, desempenho, firewalls, NAT, troubleshooting e segurança de serviços expostos.",
  level: "intermediário",
  estimatedHours: 86,
  icon: "transport",
  unlockedByDefault: false,
  prerequisites: [
    { type: "module", course: "Redes e Network", module: "m04", reason: "TCP/UDP depende de IPv4, endereçamento, gateway e conectividade IP." },
    { type: "module", course: "Redes e Network", module: "m05", reason: "Portas e fluxos ficam mais claros quando o aluno entende sub-redes, origem, destino e escopo de rede." }
  ],
  unlockRule: { type: "progress", requiredPreviousModule: "m05", requiredPreviousModulePercent: 70 },
  objectives: [
    "Explicar por que a camada de transporte existe acima do IP.",
    "Entender portas, sockets, fluxos e multiplexação de aplicações.",
    "Comparar TCP e UDP em funcionamento, uso, desempenho e segurança.",
    "Diagnosticar problemas de porta, firewall, NAT, estado de conexão e aplicação.",
    "Relacionar transporte com cloud, DevSecOps, Kubernetes, load balancers e segurança defensiva."
  ],
  lessons: [
    lesson0601,
    lesson0602,
    lesson0603,
    lesson0604,
    lesson0605,
    lesson0606,
    lesson0607,
    lesson0608,
    lesson0609,
    lesson0610
  ],
  pendingLessons: [],
  plannedLessons: [
    { id: "6.1", title: "Por que a camada de transporte existe" },
    { id: "6.2", title: "Portas, sockets e multiplexação" },
    { id: "6.3", title: "TCP: handshake, estado e encerramento" },
    { id: "6.4", title: "TCP: confiabilidade, janela, retransmissão e congestionamento" },
    { id: "6.5", title: "UDP: simplicidade, latência e aplicações em tempo real" },
    { id: "6.6", title: "Portas comuns e serviços corporativos" },
    { id: "6.7", title: "NAT, PAT, firewalls stateful e rastreamento de conexão" },
    { id: "6.8", title: "Troubleshooting TCP/UDP com netstat, ss, tcpdump e Wireshark" },
    { id: "6.9", title: "Segurança em transporte: exposição, scans, TLS e hardening" },
    { id: "6.10", title: "Revisão prática: diagnosticar fluxo de aplicação ponta a ponta" }
  ],
  moduleProject: {
    title: "Diagnóstico e hardening de fluxos TCP/UDP em uma rede corporativa",
    expectedDeliverables: [
      "Mapa de serviços, portas e donos",
      "Matriz de fluxos permitidos por origem/destino/protocolo/porta",
      "Runbook de troubleshooting TCP/UDP",
      "Checklist de exposição segura de serviços",
      "Plano de logs de firewall, load balancer e sistema operacional",
      "Evidências de testes com Windows, Linux e captura controlada"
    ]
  },
  assessment: {
    requiredProgressPercent: 70,
    requiredQuizAverage: 70,
    requiredLabs: ["lab-6.1", "lab-6.2", "lab-6.3", "lab-6.4", "lab-6.5", "lab-6.6", "lab-6.7", "lab-6.8", "lab-6.9", "lab-6.10"],
    completionUnlocks: ["m07"]
  }
};
