import { lesson0701 } from "../lessons/m07/lesson-07-01.js";
import { lesson0702 } from "../lessons/m07/lesson-07-02.js";
import { lesson0703 } from "../lessons/m07/lesson-07-03.js";
import { lesson0704 } from "../lessons/m07/lesson-07-04.js";
import { lesson0705 } from "../lessons/m07/lesson-07-05.js";
import { lesson0706 } from "../lessons/m07/lesson-07-06.js";
import { lesson0707 } from "../lessons/m07/lesson-07-07.js";
import { lesson0708 } from "../lessons/m07/lesson-07-08.js";
import { lesson0709 } from "../lessons/m07/lesson-07-09.js";
import { lesson0710 } from "../lessons/m07/lesson-07-10.js";

export const module07 = {
  id: "m07",
  number: 7,
  title: "DNS, DHCP, NAT e Serviços Essenciais",
  subtitle: "DNS, DHCP, NAT/PAT, NTP, logs e serviços essenciais que sustentam resolução de nomes, endereçamento dinâmico, tradução, publicação, auditoria e operação de redes corporativas e cloud.",
  level: "intermediário",
  estimatedHours: 88,
  icon: "services",
  unlockedByDefault: false,
  prerequisites: [
    { type: "module", course: "Redes e Network", module: "m04", reason: "Serviços de rede dependem de IPv4, endereços privados/públicos, gateway, ICMP e troubleshooting básico." },
    { type: "module", course: "Redes e Network", module: "m06", reason: "DNS, DHCP, NAT/PAT e publicação de serviços dependem de TCP/UDP, portas e fluxos de transporte." }
  ],
  unlockRule: { type: "progress", requiredPreviousModule: "m06", requiredPreviousModulePercent: 70 },
  objectives: [
    "Entender por que serviços fundamentais de rede existem e quais problemas resolvem.",
    "Explicar DNS, registros, zonas, cache, TTL e troubleshooting de resolução de nomes.",
    "Aprofundar DHCP, reservas, integração com DNS e riscos de DHCP rogue.",
    "Dominar NAT, PAT, port forwarding, publicação de serviços, hairpin NAT, CGNAT e diferença entre NAT e firewall.",
    "Entender NTP como dependência crítica de logs, certificados, autenticação e investigação.",
    "Conhecer SNMP, syslog e observabilidade básica como parte do desenho operacional.",
    "Aplicar segurança defensiva para DNS, DHCP, NAT, NTP e serviços essenciais.",
    "Construir runbooks que separem DNS, rota, NAT, firewall, aplicação, logs e evidências."
  ],
  lessons: [
    lesson0701,
    lesson0702,
    lesson0703,
    lesson0704,
    lesson0705,
    lesson0706,
    lesson0707,
    lesson0708,
    lesson0709,
    lesson0710
  ],
  pendingLessons: [],
  plannedLessons: [
    { id: "7.1", title: "Por que DNS existe" },
    { id: "7.2", title: "Hierarquia DNS, zonas e delegação" },
    { id: "7.3", title: "Resolução recursiva, autoritativa e cache" },
    { id: "7.4", title: "Registros DNS: A, AAAA, CNAME, MX, TXT, NS, SRV e PTR" },
    { id: "7.5", title: "TTL, cache DNS e troubleshooting de nomes" },
    { id: "7.6", title: "DHCP profundo e integração com DNS" },
    { id: "7.7", title: "NTP: tempo como dependência crítica" },
    { id: "7.8", title: "NAT, PAT, publicação de serviços e CGNAT" },
    { id: "7.9", title: "Segurança de serviços de rede: DNS, DHCP, NAT, NTP e logs" },
    { id: "7.10", title: "Revisão prática: DNS, DHCP, NAT, NTP, logs e serviços essenciais" }
  ],
  moduleProject: {
    title: "Desenho de serviços fundamentais para uma rede corporativa híbrida",
    expectedDeliverables: [
      "Mapa de resolução DNS interna e externa",
      "Tabela de zonas e registros críticos",
      "Política de TTL e cache para registros sensíveis",
      "Plano de DHCP com reservas e integração com DNS",
      "Matriz NAT/PAT com egress, publicação, hairpin/split DNS, CGNAT, logs e rollback",
      "Plano de NTP para servidores, rede, logs e segurança",
      "Fluxo de syslog/SNMP/telemetria para observabilidade",
      "Matriz de riscos e controles para DNS, DHCP, NAT, NTP e logs",
      "Runbook de troubleshooting de serviços fundamentais separando DNS, rota, NAT, firewall, aplicação e evidências"
    ]
  },
  assessment: {
    requiredProgressPercent: 70,
    requiredQuizAverage: 70,
    requiredLabs: ["lab-7.1", "lab-7.2", "lab-7.3", "lab-7.4", "lab-7.5", "lab-7.6", "lab-7.7", "lab-7.8", "lab-7.9", "lab-7.10"],
    completionUnlocks: ["m08"]
  }
};
