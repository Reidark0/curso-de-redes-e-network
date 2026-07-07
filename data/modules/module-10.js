import { lesson1001 } from "../lessons/m10/lesson-10-01.js";
import { lesson1002 } from "../lessons/m10/lesson-10-02.js";
import { lesson1003 } from "../lessons/m10/lesson-10-03.js";
import { lesson1004 } from "../lessons/m10/lesson-10-04.js";
import { lesson1005 } from "../lessons/m10/lesson-10-05.js";
import { lesson1006 } from "../lessons/m10/lesson-10-06.js";
import { lesson1007 } from "../lessons/m10/lesson-10-07.js";
import { lesson1008 } from "../lessons/m10/lesson-10-08.js";
import { lesson1009 } from "../lessons/m10/lesson-10-09.js";
import { lesson1010 } from "../lessons/m10/lesson-10-10.js";

export const module10 = {
  id: "m10",
  number: 10,
  title: "VPN, Túneis, Acesso Remoto e Zero Trust",
  subtitle: "VPNs site-to-site e remote access, tunelamento, IPsec, SSL VPN, WireGuard, split/full tunnel, DNS, troubleshooting, hardening, ZTNA, SASE e Zero Trust.",
  level: "intermediário-avançado",
  estimatedHours: 98,
  icon: "vpn",
  unlockedByDefault: false,
  migrationStatus: "p1-m10-revisao-tecnica-fina-vpn-zero-trust",
  prerequisites: [
    { type: "module", course: "Redes e Network", module: "m08", reason: "VPN e ZTNA dependem de HTTP, HTTPS, TLS, DNS e APIs em muitos cenários modernos." },
    { type: "module", course: "Redes e Network", module: "m09", reason: "Túneis e acesso remoto dependem de firewall, ACLs, NAT, WAF e políticas de tráfego." }
  ],
  unlockRule: { type: "progress", requiredPreviousModule: "m09", requiredPreviousModulePercent: 70 },
  objectives: [
    "Explicar por que VPN, túneis e acesso remoto existem.",
    "Diferenciar tunelamento, criptografia, autenticação, rotas e políticas.",
    "Comparar site-to-site VPN, remote access VPN, SSL VPN, WireGuard, ZTNA e SASE.",
    "Diagnosticar problemas de VPN envolvendo rotas, DNS, MTU, firewall e identidade.",
    "Aplicar segurança operacional com MFA, certificados, logs, segmentação e menor privilégio.",
    "Validar tecnicamente IPsec/IKEv2, WireGuard, OpenVPN/SSL VPN, split/full tunnel, DNS, MTU/MSS, ZTNA, SASE e logs.",
    "Construir runbooks de troubleshooting e revogação com evidências por camada."
  ],
  lessons: [
    lesson1001,
    lesson1002,
    lesson1003,
    lesson1004,
    lesson1005,
    lesson1006,
    lesson1007,
    lesson1008,
    lesson1009,
    lesson1010
  ],
  pendingLessons: [],
  plannedLessons: [
    { id: "10.1", title: "Por que VPN, túneis e acesso remoto existem" },
    { id: "10.2", title: "Tunelamento, encapsulamento e rotas" },
    { id: "10.3", title: "Site-to-site VPN e IPsec na prática" },
    { id: "10.4", title: "Remote access VPN: usuário fora da rede" },
    { id: "10.5", title: "SSL VPN, OpenVPN, WireGuard e escolhas práticas" },
    { id: "10.6", title: "Split tunnel, full tunnel e DNS em VPN" },
    { id: "10.7", title: "Zero Trust, ZTNA, SASE e identidade" },
    { id: "10.8", title: "Troubleshooting VPN: rotas, MTU, DNS e firewall" },
    { id: "10.9", title: "Segurança operacional: MFA, certificados, logs e riscos" },
    { id: "10.10", title: "Revisão prática: desenhar acesso remoto seguro" }
  ],
  moduleProject: {
    title: "Desenho de acesso remoto seguro para empresa híbrida",
    expectedDeliverables: [
      "Diagrama de acesso remoto",
      "Matriz de usuários, recursos e políticas",
      "Decisão entre VPN, ZTNA, bastion e acesso privado",
      "Plano de DNS, rotas, logs e MFA",
      "Runbook de troubleshooting",
      "Critérios de revogação e auditoria",
      "Matriz VPN vs ZTNA vs bastion vs private endpoint",
      "Checklist de MTU/MSS, DNS, rotas, firewall, logs e rollback",
      "Estimativa de custos e limpeza de recursos cloud"
    ]
  },
  technicalReview: {
    status: "p1-aplicada",
    focus: ["IPsec/IKEv2", "WireGuard", "OpenVPN/SSL VPN", "split/full tunnel", "DNS em VPN", "MTU/MSS", "MFA", "certificados/chaves", "ZTNA", "SASE", "logs e SIEM"],
    requiredEvidence: ["matriz de acesso", "rotas", "DNS", "logs de autenticação", "logs de firewall", "estado do túnel", "plano de revogação", "rollback", "custos"],
    approvalCriterion: "O aluno deve demonstrar escolha arquitetural, evidências por camada, menor privilégio, logs e revogação testável."
  },
  assessment: {
    requiredProgressPercent: 70,
    requiredQuizAverage: 70,
    requiredLabs: ["lab-10.1", "lab-10.2", "lab-10.3", "lab-10.4", "lab-10.5", "lab-10.6", "lab-10.7", "lab-10.8", "lab-10.9", "lab-10.10"],
    completionUnlocks: ["m11"]
  }
};
