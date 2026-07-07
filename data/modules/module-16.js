import { lesson1601 } from "../lessons/m16/lesson-16-01.js";
import { lesson1602 } from "../lessons/m16/lesson-16-02.js";
import { lesson1603 } from "../lessons/m16/lesson-16-03.js";
import { lesson1604 } from "../lessons/m16/lesson-16-04.js";
import { lesson1605 } from "../lessons/m16/lesson-16-05.js";
import { lesson1606 } from "../lessons/m16/lesson-16-06.js";
import { lesson1607 } from "../lessons/m16/lesson-16-07.js";
import { lesson1608 } from "../lessons/m16/lesson-16-08.js";
import { lesson1609 } from "../lessons/m16/lesson-16-09.js";
import { lesson1610 } from "../lessons/m16/lesson-16-10.js";
import { lesson1611 } from "../lessons/m16/lesson-16-11.js";
import { lesson1612 } from "../lessons/m16/lesson-16-12.js";

export const module16 = {
  id: "m16",
  number: 16,
  title: "Redes como fundação da cibersegurança",
  subtitle: "Como os fundamentos de redes sustentam defesa, detecção, resposta, threat hunting, DFIR, segmentação, Zero Trust e validação autorizada de controles.",
  level: "avançado",
  estimatedHours: 38,
  prerequisites: [
    {
      course: "Redes e Network",
      module: "m13",
      lesson: "13.10",
      reason: "Segurança de redes e arquitetura defensiva são base direta deste módulo."
    },
    {
      course: "Redes e Network",
      module: "m14",
      lesson: "14.14",
      reason: "A maior parte da cibersegurança corporativa moderna atravessa cloud networking."
    },
    {
      course: "Redes e Network",
      module: "m15",
      lesson: "15.12",
      reason: "Investigação defensiva depende de evidências, troubleshooting e RCA."
    }
  ],
  unlockRule: {
    type: "progress",
    requiredPreviousModulePercent: 70
  },
  objectives: [
    "Conectar fundamentos de redes com cibersegurança defensiva.",
    "Estabelecer limites éticos, legais e operacionais para validações autorizadas.",
    "Entender superfície de ataque, reconhecimento autorizado e varredura defensiva.",
    "Analisar sinais de DNS, HTTP/TLS, MITM, movimento lateral, C2 e exfiltração.",
    "Usar telemetria de rede para threat hunting e DFIR.",
    "Executar projeto final integrando Blue Team e validação autorizada de rede."
  ],
  lessons: [
    lesson1601,
    lesson1602,
    lesson1603,
    lesson1604,
    lesson1605,
    lesson1606,
    lesson1607,
    lesson1608,
    lesson1609,
    lesson1610,
    lesson1611,
    lesson1612
  ],
  plannedLessons: [
    "16.1",
    "16.2",
    "16.3",
    "16.4",
    "16.5",
    "16.6",
    "16.7",
    "16.8",
    "16.9",
    "16.10",
    "16.11",
    "16.12"
  ],
  moduleProject: {
    title: "Blue Team + validação autorizada de rede",
    expectedDeliverables: [
      "Escopo e regras de engajamento",
      "Mapa de superfície de ataque autorizada",
      "Matriz de fluxos e controles defensivos",
      "Plano de detecção para DNS, HTTP/TLS, C2 e exfiltração",
      "Playbooks de contenção e investigação",
      "Relatório defensivo com riscos, evidências e melhorias",
      "Análise de dataset sintético com logs DNS, flow, proxy, Zeek ou PCAP textual",
      "Timeline de incidente simulado com fatos, hipóteses, falsos positivos e rollback"
    ]
  },

  pendingLessons: [],
  status: "completed",
  assessment: {
    requiredProgressPercent: 70,
    requiredQuizAverage: 70,
    requiredLabs: ["lab-16.1", "lab-16.2", "lab-16.3", "lab-16.4", "lab-16.5", "lab-16.6", "lab-16.7", "lab-16.8", "lab-16.9", "lab-16.10", "lab-16.11", "lab-16.12"],
    completionUnlocks: ["m17"]
  }
};
