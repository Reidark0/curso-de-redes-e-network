import { lesson0001 } from "../lessons/m00/lesson-00-01.js";
import { lesson0002 } from "../lessons/m00/lesson-00-02.js";
import { lesson0003 } from "../lessons/m00/lesson-00-03.js";
import { lesson0004 } from "../lessons/m00/lesson-00-04.js";
import { lesson0005 } from "../lessons/m00/lesson-00-05.js";
import { lesson0006 } from "../lessons/m00/lesson-00-06.js";
import { lesson0007 } from "../lessons/m00/lesson-00-07.js";
import { lesson0008 } from "../lessons/m00/lesson-00-08.js";
import { lesson0009 } from "../lessons/m00/lesson-00-09.js";
import { lesson0010 } from "../lessons/m00/lesson-00-10.js";

export const module00 = {
  id: "m00",
  number: 0,
  title: "Fundamentos da Computação",
  subtitle: "A base antes das redes: representação digital, bases numéricas, codificação, sinais, métricas, protocolos e pensamento em camadas.",
  level: "iniciante",
  estimatedHours: 14,
  icon: "computing",
  unlockedByDefault: true,
  prerequisites: [],
  unlockRule: {
    type: "always"
  },
  objectives: [
    "Entender como computadores representam informação.",
    "Compreender bits, bytes, binário, hexadecimal, codificações e sinais físicos.",
    "Relacionar fundamentos digitais com redes, segurança, cloud, DevSecOps e troubleshooting.",
    "Preparar o aluno para Modelo OSI, Ethernet, IPv4, subnetting, protocolos e análise de tráfego."
  ],
  lessons: [
    lesson0001,
    lesson0002,
    lesson0003,
    lesson0004,
    lesson0005,
    lesson0006,
    lesson0007,
    lesson0008,
    lesson0009,
    lesson0010
  ],
  pendingLessons: [],
  moduleProject: {
    title: "Mapa de representação digital antes das redes",
    expectedDeliverables: [
      "Tabela diferenciando informação, dado, byte, bit e sinal físico.",
      "Evidências do laboratório da aula 0.1.",
      "Mapa mental conectando representação digital com redes e segurança.",
      "Lista de dúvidas para as aulas 0.2 e 0.3."
    ]
  },
  assessment: {
    requiredProgressPercent: 70,
    requiredQuizAverage: 70,
    requiredLabs: ["lab-0.1", "lab-0.2", "lab-0.3", "lab-0.4", "lab-0.5", "lab-0.6", "lab-0.7", "lab-0.8", "lab-0.9", "lab-0.10"]
  }
};
