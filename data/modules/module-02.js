import { lesson0201 } from "../lessons/m02/lesson-02-01.js";
import { lesson0202 } from "../lessons/m02/lesson-02-02.js";
import { lesson0203 } from "../lessons/m02/lesson-02-03.js";
import { lesson0204 } from "../lessons/m02/lesson-02-04.js";
import { lesson0205 } from "../lessons/m02/lesson-02-05.js";
import { lesson0206 } from "../lessons/m02/lesson-02-06.js";
import { lesson0207 } from "../lessons/m02/lesson-02-07.js";
import { lesson0208 } from "../lessons/m02/lesson-02-08.js";
import { lesson0209 } from "../lessons/m02/lesson-02-09.js";
import { lesson0210 } from "../lessons/m02/lesson-02-10.js";

export const module02 = {
  id: "m02",
  number: 2,
  title: "Modelo OSI",
  subtitle: "As sete camadas como ferramenta prática de diagnóstico, troubleshooting, Wireshark, arquitetura e cibersegurança.",
  level: "iniciante-intermediário",
  estimatedHours: 44,
  icon: "layers",
  unlockedByDefault: false,
  prerequisites: [
    {
      type: "module",
      course: "Redes e Network",
      module: "m00",
      reason: "O Modelo OSI depende dos fundamentos de representação, sinais, protocolos, métricas e pensamento em camadas."
    },
    {
      type: "module",
      course: "Redes e Network",
      module: "m01",
      reason: "O aluno precisa entender redes, dispositivos, topologias, meios, equipamentos, métricas e diagnóstico inicial antes de organizar tudo em camadas."
    }
  ],
  unlockRule: {
    type: "progress",
    requiredPreviousModule: "m01",
    requiredPreviousModulePercent: 70
  },
  objectives: [
    "Entender por que o Modelo OSI existe e como ele ajuda no diagnóstico.",
    "Explicar encapsulamento, desencapsulamento e PDUs.",
    "Relacionar cada camada OSI com protocolos, equipamentos, evidências e riscos.",
    "Aplicar troubleshooting por camadas em cenários domésticos, empresariais, cloud e DevSecOps.",
    "Usar o OSI como ponte para Ethernet, IPv4, TCP/UDP, DNS, HTTP, TLS, firewalls e segurança de redes."
  ],
  lessons: [
    lesson0201,
    lesson0202,
    lesson0203,
    lesson0204,
    lesson0205,
    lesson0206,
    lesson0207,
    lesson0208,
    lesson0209,
    lesson0210
  ],
  pendingLessons: [],
  moduleProject: {
    title: "Diagnóstico completo por camadas OSI",
    expectedDeliverables: [
      "Matriz OSI com perguntas e evidências por camada",
      "Diagrama de encapsulamento e desencapsulamento",
      "Tabela de camadas, protocolos e equipamentos",
      "Plano de troubleshooting por camadas",
      "Análise de riscos e controles de segurança por camada",
      "Relatório final sanitizado"
    ]
  },
  assessment: {
    requiredProgressPercent: 70,
    requiredQuizAverage: 70,
    requiredLabs: ["lab-2.1", "lab-2.2", "lab-2.3", "lab-2.4", "lab-2.5", "lab-2.6", "lab-2.7", "lab-2.8", "lab-2.9", "lab-2.10"],
    completionUnlocks: ["m03"]
  }
};
