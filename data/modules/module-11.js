import { lesson1101 } from "../lessons/m11/lesson-11-01.js";
import { lesson1102 } from "../lessons/m11/lesson-11-02.js";
import { lesson1103 } from "../lessons/m11/lesson-11-03.js";
import { lesson1104 } from "../lessons/m11/lesson-11-04.js";
import { lesson1105 } from "../lessons/m11/lesson-11-05.js";
import { lesson1106 } from "../lessons/m11/lesson-11-06.js";
import { lesson1107 } from "../lessons/m11/lesson-11-07.js";
import { lesson1108 } from "../lessons/m11/lesson-11-08.js";
import { lesson1109 } from "../lessons/m11/lesson-11-09.js";
import { lesson1110 } from "../lessons/m11/lesson-11-10.js";

export const module11 = {
  id: "m11",
  number: 11,
  title: "Roteamento, OSPF, BGP e Troubleshooting de Caminhos",
  subtitle: "Roteamento entre redes, tabela de rotas, longest prefix match, rota default, rotas estáticas, inter-VLAN, métricas, OSPF, BGP introdutório e troubleshooting de caminhos.",
  level: "intermediário",
  estimatedHours: 78,
  icon: "routing",
  unlockedByDefault: false,
  prerequisites: [
    { type: "module", course: "Redes e Network", module: "m04", reason: "Roteamento depende de IPv4, máscara, gateway, ICMP e troubleshooting IPv4." },
    { type: "module", course: "Redes e Network", module: "m05", reason: "Rotas são construídas sobre prefixos e sub-redes planejadas no módulo de subnetting." },
    { type: "module", course: "Redes e Network", module: "m09", reason: "Políticas de firewall e segmentação influenciam o diagnóstico de caminho." },
    { type: "module", course: "Redes e Network", module: "m10", reason: "VPNs e túneis dependem de rotas e também criam novos caminhos a serem diagnosticados." }
  ],
  unlockRule: {
    type: "progress",
    requiredPreviousModule: "m10",
    requiredPreviousModulePercent: 70
  },
  objectives: [
    "Entender por que roteamento existe e como pacotes IPv4 atravessam redes diferentes.",
    "Ler e interpretar tabelas de rotas em hosts, roteadores, firewalls e cloud.",
    "Aplicar longest prefix match, rota default, next hop e rota de retorno.",
    "Configurar e diagnosticar rotas estáticas, rotas flutuantes e roteamento inter-VLAN.",
    "Entender métricas, distância administrativa, OSPF introdutório e BGP introdutório.",
    "Relacionar roteamento com segurança, segmentação, cloud, VPN, DevSecOps e troubleshooting."
  ],
  lessons: [
    lesson1101,
    lesson1102,
    lesson1103,
    lesson1104,
    lesson1105,
    lesson1106,
    lesson1107,
    lesson1108,
    lesson1109,
    lesson1110
  ],
  pendingLessons: [],
  plannedLessons: [
    { id: "11.1", title: "Por que roteamento existe" },
    { id: "11.2", title: "Tabela de rotas e longest prefix match" },
    { id: "11.3", title: "Rota padrão e gateway de último recurso" },
    { id: "11.4", title: "Rotas estáticas e rotas flutuantes" },
    { id: "11.5", title: "Roteamento inter-VLAN" },
    { id: "11.6", title: "Métrica, distância administrativa e escolha de caminho" },
    { id: "11.7", title: "OSPF introdutório" },
    { id: "11.8", title: "BGP introdutório e Internet" },
    { id: "11.9", title: "Troubleshooting com traceroute, mtr, route print e ip route" },
    { id: "11.10", title: "Revisão prática: desenhar rede roteada segura" }
  ],
  moduleProject: {
    title: "Desenho de rede roteada segura para empresa com matriz, filial e cloud",
    expectedDeliverables: [
      "Diagrama lógico com redes, gateways e próximos saltos",
      "Tabela de rotas por dispositivo ou domínio",
      "Rotas default e rotas específicas justificadas",
      "Roteamento inter-VLAN documentado",
      "Matriz de comunicação e pontos de firewall",
      "Plano de validação com ping, traceroute, mtr, route print, ip route, ip route get e show ip route",
      "Laboratórios Packet Tracer/GNS3 para rotas estáticas, inter-VLAN, decisão de caminho, OSPF e BGP",
      "Cenários de falha intencional com sintoma, hipótese, evidência, correção e RCA",
      "Análise de rota de retorno e caminhos assimétricos",
      "Riscos e controles de segurança relacionados ao roteamento, incluindo bypass, assimetria, route leak, RPKI/ROV conceitual e governança de mudanças"
    ]
  },
  assessment: {
    requiredProgressPercent: 70,
    requiredQuizAverage: 70,
    requiredLabs: ["lab-11.1", "lab-11.2", "lab-11.3", "lab-11.4", "lab-11.5", "lab-11.6", "lab-11.7", "lab-11.8", "lab-11.9", "lab-11.10"],
    completionUnlocks: ["m12"]
  }
};
