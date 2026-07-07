import { lesson0101 } from "../lessons/m01/lesson-01-01.js";
import { lesson0102 } from "../lessons/m01/lesson-01-02.js";
import { lesson0103 } from "../lessons/m01/lesson-01-03.js";
import { lesson0104 } from "../lessons/m01/lesson-01-04.js";
import { lesson0105 } from "../lessons/m01/lesson-01-05.js";
import { lesson0106 } from "../lessons/m01/lesson-01-06.js";
import { lesson0107 } from "../lessons/m01/lesson-01-07.js";
import { lesson0108 } from "../lessons/m01/lesson-01-08.js";
import { lesson0109 } from "../lessons/m01/lesson-01-09.js";
import { lesson0110 } from "../lessons/m01/lesson-01-10.js";

export const module01 = {
  id: "m01",
  number: 1,
  title: "Fundamentos de Redes",
  subtitle: "O primeiro bloco propriamente de redes: o que é uma rede, quem participa dela, seus tipos, topologias, meios, equipamentos, métricas e diagnóstico inicial.",
  level: "iniciante",
  estimatedHours: 24,
  icon: "network",
  unlockedByDefault: false,
  prerequisites: [
    {
      type: "module",
      course: "Redes e Network",
      module: "m00",
      reason: "O Módulo 1 depende dos fundamentos de bits, sinais, protocolos, métricas e pensamento em camadas vistos no Módulo 0."
    }
  ],
  unlockRule: {
    type: "progress",
    requiredPreviousModule: "m00",
    requiredPreviousModulePercent: 70
  },
  objectives: [
    "Definir rede como sistema de comunicação, operação e segurança.",
    "Diferenciar dispositivos finais, intermediários e serviços.",
    "Conhecer tipos de rede, topologias, meios de transmissão e equipamentos básicos.",
    "Relacionar métricas de rede com diagnóstico inicial.",
    "Executar comandos introdutórios como ipconfig, ping, arp, tracert e nslookup.",
    "Mapear uma rede pequena com visão de segurança e troubleshooting."
  ],
  lessons: [
    lesson0101,
    lesson0102,
    lesson0103,
    lesson0104,
    lesson0105,
    lesson0106,
    lesson0107,
    lesson0108,
    lesson0109,
    lesson0110
  ],
  pendingLessons: [],
  moduleProject: {
    title: "Mapeamento inicial de uma rede pequena",
    expectedDeliverables: [
      "Mapa textual ou visual da rede",
      "Lista de dispositivos finais, intermediários e serviços",
      "Tabela de endereçamento inicial",
      "Checklist de diagnóstico básico",
      "Lista de riscos de segurança e mitigações iniciais"
    ]
  },
  assessment: {
    requiredProgressPercent: 70,
    requiredQuizAverage: 70,
    requiredLabs: ["lab-1.1", "lab-1.2", "lab-1.3", "lab-1.4", "lab-1.5", "lab-1.6", "lab-1.7", "lab-1.8", "lab-1.9", "lab-1.10"],
    completionUnlocks: ["m02"]
  }
};
