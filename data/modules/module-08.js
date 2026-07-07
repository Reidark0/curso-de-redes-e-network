import { lesson0801 } from "../lessons/m08/lesson-08-01.js";
import { lesson0802 } from "../lessons/m08/lesson-08-02.js";
import { lesson0803 } from "../lessons/m08/lesson-08-03.js";
import { lesson0804 } from "../lessons/m08/lesson-08-04.js";
import { lesson0805 } from "../lessons/m08/lesson-08-05.js";
import { lesson0806 } from "../lessons/m08/lesson-08-06.js";
import { lesson0807 } from "../lessons/m08/lesson-08-07.js";
import { lesson0808 } from "../lessons/m08/lesson-08-08.js";
import { lesson0809 } from "../lessons/m08/lesson-08-09.js";
import { lesson0810 } from "../lessons/m08/lesson-08-10.js";

export const module08 = {
  id: "m08",
  number: 8,
  title: "HTTP, HTTPS, TLS, Proxies e APIs",
  subtitle: "Protocolos de aplicação modernos, web, HTTPS, TLS, certificados, proxies, APIs, troubleshooting e segurança de tráfego corporativo.",
  level: "intermediário",
  estimatedHours: 98,
  icon: "web",
  unlockedByDefault: false,
  prerequisites:   [
      {
          "type": "module",
          "course": "Redes e Network",
          "module": "m06",
          "reason": "HTTP depende de transporte, portas, TCP/UDP, NAT e estado de conexão."
      },
      {
          "type": "module",
          "course": "Redes e Network",
          "module": "m07",
          "reason": "HTTP normalmente depende de DNS e serviços fundamentais de rede antes da conexão ao servidor."
      }
  ],
  unlockRule: { type: "progress", requiredPreviousModule: "m07", requiredPreviousModulePercent: 70 },
  objectives: [
    "Explicar por que HTTP existe e como ele estrutura a Web e APIs.",
    "Entender requisições, respostas, métodos, headers, corpo e status codes.",
    "Relacionar HTTP com HTTPS, TLS, proxies, WAFs, gateways, load balancers e observabilidade.",
    "Diagnosticar falhas de aplicação web separando DNS, TCP, TLS, HTTP, proxy e backend.",
    "Aplicar boas práticas defensivas para serviços HTTP/HTTPS e APIs corporativas."
  ],
  lessons: [
    lesson0801,
    lesson0802,
    lesson0803,
    lesson0804,
    lesson0805,
    lesson0806,
    lesson0807,
    lesson0808,
    lesson0809,
    lesson0810
  ],
  pendingLessons: [],
  plannedLessons: [
    { id: "8.1", title: "Por que HTTP existe" },
    { id: "8.2", title: "Requisições e respostas: métodos, URLs, headers, body e status codes" },
    { id: "8.3", title: "HTTPS, TLS, certificados, SNI e cadeia de confiança" },
    { id: "8.4", title: "Cookies, sessões, tokens e estado em aplicações web" },
    { id: "8.5", title: "Proxies, reverse proxies, WAFs e load balancers HTTP" },
    { id: "8.6", title: "APIs REST, JSON, autenticação e contratos" },
    { id: "8.7", title: "HTTP/2, HTTP/3, QUIC e performance" },
    { id: "8.8", title: "Troubleshooting HTTP com curl, navegador, logs e traces" },
    { id: "8.9", title: "Segurança HTTP: headers, CORS, exposição e hardening" },
    { id: "8.10", title: "Revisão prática: publicar e diagnosticar uma API segura" }
  ],
  moduleProject: {
    title: "Publicação e diagnóstico de uma API HTTP/HTTPS segura",
    expectedDeliverables: [
      "Mapa de fluxo HTTP ponta a ponta",
      "Matriz de endpoints, métodos e responsáveis",
      "Checklist TLS e headers de segurança",
      "Runbook de troubleshooting com curl, DevTools, logs e traces",
      "Plano de publicação via proxy/WAF/API Gateway",
      "Evidências sanitizadas de status, headers, certificado e logs"
    ]
  },
  assessment: {
    requiredProgressPercent: 70,
    requiredQuizAverage: 70,
    requiredLabs: ["lab-8.1", "lab-8.2", "lab-8.3", "lab-8.4", "lab-8.5", "lab-8.6", "lab-8.7", "lab-8.8", "lab-8.9", "lab-8.10"],
    completionUnlocks: ["m09"]
  }
};
