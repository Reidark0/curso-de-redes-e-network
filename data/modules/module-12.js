import { lesson1201 } from "../lessons/m12/lesson-12-01.js";
import { lesson1202 } from "../lessons/m12/lesson-12-02.js";
import { lesson1203 } from "../lessons/m12/lesson-12-03.js";
import { lesson1204 } from "../lessons/m12/lesson-12-04.js";
import { lesson1205 } from "../lessons/m12/lesson-12-05.js";
import { lesson1206 } from "../lessons/m12/lesson-12-06.js";
import { lesson1207 } from "../lessons/m12/lesson-12-07.js";
import { lesson1208 } from "../lessons/m12/lesson-12-08.js";
import { lesson1209 } from "../lessons/m12/lesson-12-09.js";
import { lesson1210 } from "../lessons/m12/lesson-12-10.js";

export const module12 = {
  id: "m12",
  number: 12,
  title: "Redes Wireless, Wi-Fi, RF e Segurança Sem Fio",
  subtitle: "Como redes sem fio funcionam por baixo: rádio, SSID, BSSID, associação, autenticação, segmentação, arquitetura corporativa e segurança defensiva.",
  level: "intermediário-avançado",
  estimatedHours: 14,
  prerequisites: [
    {
      course: "Redes e Network",
      module: "m01",
      lesson: "1.x",
      reason: "É necessário entender o que é uma rede, por que dispositivos se comunicam e como serviços dependem de conectividade."
    },
    {
      course: "Redes e Network",
      module: "m02",
      lesson: "2.x",
      reason: "Wireless exige separar camada física, enlace, rede, transporte e aplicação durante o diagnóstico."
    },
    {
      course: "Redes e Network",
      module: "m03",
      lesson: "3.x",
      reason: "Wi-Fi se integra ao mundo Ethernet por endereços MAC, quadros, switches e VLANs."
    },
    {
      course: "Redes e Network",
      module: "m07",
      lesson: "7.x",
      reason: "Clientes wireless dependem de DHCP, DNS e serviços essenciais após a associação."
    },
    {
      course: "Redes e Network",
      module: "m09",
      lesson: "9.x",
      reason: "Redes wireless corporativas precisam de firewall, ACLs, zonas, políticas e logs."
    }
  ],
  unlockRule: {
    type: "progress",
    requiredPreviousModulePercent: 70
  },
  objectives: [
    "Entender Wi-Fi como tecnologia de acesso local sem fio, não como sinônimo de internet.",
    "Explicar RF, frequência, canais, sinal, ruído, RSSI e SNR.",
    "Diferenciar padrões e gerações Wi-Fi, incluindo Wi-Fi 4, 5, 6, 6E e 7.",
    "Compreender SSID, BSSID, associação, autenticação e roaming.",
    "Comparar WPA2, WPA3, PSK, Enterprise, 802.1X e boas práticas corporativas.",
    "Projetar Wi-Fi corporativo com APs, VLANs, controladoras, rede guest, IoT, logs e segurança.",
    "Diagnosticar falhas wireless separando RF, autenticação, DHCP, DNS, firewall e aplicação.",
    "Analisar ameaças wireless de forma defensiva e ética."
  ],
  lessons: [
    lesson1201,
    lesson1202,
    lesson1203,
    lesson1204,
    lesson1205,
    lesson1206,
    lesson1207,
    lesson1208,
    lesson1209,
    lesson1210
  ],
  plannedLessons: [
    "12.1",
    "12.2",
    "12.3",
    "12.4",
    "12.5",
    "12.6",
    "12.7",
    "12.8",
    "12.9",
    "12.10"
  ],
  moduleProject: {
    title: "Projeto de Wi-Fi corporativo seguro e diagnosticável",
    expectedDeliverables: [
      "Mapa lógico de SSIDs, VLANs e políticas",
      "Plano de segmentação para funcionários, visitantes e IoT",
      "Checklist de RF, canais, cobertura e capacidade",
      "Modelo de autenticação e segurança",
      "Plano de logs e evidências para troubleshooting",
      "Relatório de riscos e mitigação"
    ]
  },

  pendingLessons: [],
  status: "completed",
  assessment: {
    requiredProgressPercent: 70,
    requiredQuizAverage: 70,
    requiredLabs: ["lab-12.1", "lab-12.2", "lab-12.3", "lab-12.4", "lab-12.5", "lab-12.6", "lab-12.7", "lab-12.8", "lab-12.9", "lab-12.10"],
    completionUnlocks: ["m13"]
  }
};
