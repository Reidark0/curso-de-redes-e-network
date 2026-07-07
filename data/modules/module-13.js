import { lesson1301 } from "../lessons/m13/lesson-13-01.js";
import { lesson1302 } from "../lessons/m13/lesson-13-02.js";
import { lesson1303 } from "../lessons/m13/lesson-13-03.js";
import { lesson1304 } from "../lessons/m13/lesson-13-04.js";
import { lesson1305 } from "../lessons/m13/lesson-13-05.js";
import { lesson1306 } from "../lessons/m13/lesson-13-06.js";
import { lesson1307 } from "../lessons/m13/lesson-13-07.js";
import { lesson1308 } from "../lessons/m13/lesson-13-08.js";
import { lesson1309 } from "../lessons/m13/lesson-13-09.js";
import { lesson1310 } from "../lessons/m13/lesson-13-10.js";

export const module13 = {
  id: "m13",
  number: 13,
  title: "Segurança de Redes",
  subtitle: "Defesa em profundidade, segmentação, hardening, IDS/IPS, NDR, SIEM, Zero Trust, investigação e arquitetura defensiva de redes corporativas.",
  level: "intermediário-avançado",
  estimatedHours: 20,
  prerequisites: [
    {
      course: "Redes e Network",
      module: "m09",
      lesson: "9.x",
      reason: "Firewalls, ACLs, WAF e políticas de tráfego são base para segurança de rede."
    },
    {
      course: "Redes e Network",
      module: "m10",
      lesson: "10.x",
      reason: "VPN, túneis, acesso remoto e Zero Trust são necessários para entender acesso seguro."
    },
    {
      course: "Redes e Network",
      module: "m12",
      lesson: "12.10",
      reason: "Wi-Fi corporativo é uma borda de acesso que precisa entrar na arquitetura defensiva."
    }
  ],
  unlockRule: {
    type: "progress",
    requiredPreviousModulePercent: 70
  },
  objectives: [
    "Entender segurança de redes como arquitetura defensiva, não como ferramenta isolada.",
    "Aplicar defesa em profundidade, segmentação e menor privilégio em redes corporativas.",
    "Relacionar firewall, ACL, IDS/IPS, NDR, SIEM, logs e resposta a incidente.",
    "Projetar controles defensivos para tráfego norte-sul e leste-oeste.",
    "Entender Zero Trust aplicado à rede e seus limites operacionais.",
    "Criar playbooks de investigação e arquitetura defensiva integrada."
  ],
  lessons: [
    lesson1301,
    lesson1302,
    lesson1303,
    lesson1304,
    lesson1305,
    lesson1306,
    lesson1307,
    lesson1308,
    lesson1309,
    lesson1310
  ],
  plannedLessons: [
    "13.1",
    "13.2",
    "13.3",
    "13.4",
    "13.5",
    "13.6",
    "13.7",
    "13.8",
    "13.9",
    "13.10"
  ],
  moduleProject: {
    title: "Arquitetura defensiva de rede corporativa",
    expectedDeliverables: [
      "Mapa de zonas de segurança",
      "Matriz de fluxos permitidos e negados",
      "Política de firewall e revisão de exceções",
      "Plano de logs, SIEM e detecção",
      "Playbooks de investigação de rede",
      "Plano de redução de movimento lateral",
      "Relatório de riscos, limitações e próximos passos"
    ]
  },

  pendingLessons: [],
  status: "completed",
  assessment: {
    requiredProgressPercent: 70,
    requiredQuizAverage: 70,
    requiredLabs: ["lab-13.1", "lab-13.2", "lab-13.3", "lab-13.4", "lab-13.5", "lab-13.6", "lab-13.7", "lab-13.8", "lab-13.9", "lab-13.10"],
    completionUnlocks: ["m14"]
  }
};
