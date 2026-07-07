import { lesson1401 } from "../lessons/m14/lesson-14-01.js";
import { lesson1402 } from "../lessons/m14/lesson-14-02.js";
import { lesson1403 } from "../lessons/m14/lesson-14-03.js";
import { lesson1404 } from "../lessons/m14/lesson-14-04.js";
import { lesson1405 } from "../lessons/m14/lesson-14-05.js";
import { lesson1406 } from "../lessons/m14/lesson-14-06.js";
import { lesson1407 } from "../lessons/m14/lesson-14-07.js";
import { lesson1408 } from "../lessons/m14/lesson-14-08.js";
import { lesson1409 } from "../lessons/m14/lesson-14-09.js";
import { lesson1410 } from "../lessons/m14/lesson-14-10.js";
import { lesson1411 } from "../lessons/m14/lesson-14-11.js";
import { lesson1412 } from "../lessons/m14/lesson-14-12.js";
import { lesson1413 } from "../lessons/m14/lesson-14-13.js";
import { lesson1414 } from "../lessons/m14/lesson-14-14.js";

export const module14 = {
  id: "m14",
  number: 14,
  title: "Cloud Networking",
  subtitle: "VPC, VNet, subnets, rotas, gateways, security groups, NSGs, private endpoints, conectividade híbrida, custos, logs e arquitetura cloud segura.",
  level: "intermediário-avançado",
  estimatedHours: 34,
  prerequisites: [
    {
      course: "Redes e Network",
      module: "m04",
      lesson: "4.x",
      reason: "Cloud Networking depende de IPv4, CIDR e endereçamento."
    },
    {
      course: "Redes e Network",
      module: "m05",
      lesson: "5.x",
      reason: "O desenho de subnets cloud depende de subnetting."
    },
    {
      course: "Redes e Network",
      module: "m13",
      lesson: "13.10",
      reason: "Arquitetura defensiva de rede é pré-requisito para cloud segura."
    }
  ],
  unlockRule: {
    type: "progress",
    requiredPreviousModulePercent: 70
  },
  objectives: [
    "Entender por que cloud networking existe e como se diferencia de redes tradicionais.",
    "Projetar VPCs, VNets, subnets e tabelas de rota com segurança e crescimento.",
    "Comparar AWS, Azure e Google Cloud sem perder os fundamentos.",
    "Controlar exposição pública, acesso privado, egress, NAT e DNS privado.",
    "Planejar conectividade híbrida, peering, hub-spoke, transit e private endpoints.",
    "Analisar custos, logs de fluxo, troubleshooting e governança de redes cloud."
  ],
  lessons: [
    lesson1401,
    lesson1402,
    lesson1403,
    lesson1404,
    lesson1405,
    lesson1406,
    lesson1407,
    lesson1408,
    lesson1409,
    lesson1410,
    lesson1411,
    lesson1412,
    lesson1413,
    lesson1414
  ],
  plannedLessons: [
    "14.1",
    "14.2",
    "14.3",
    "14.4",
    "14.5",
    "14.6",
    "14.7",
    "14.8",
    "14.9",
    "14.10",
    "14.11",
    "14.12",
    "14.13",
    "14.14"
  ],
  moduleProject: {
    title: "Arquitetura cloud segura, híbrida e observável",
    expectedDeliverables: [
      "Plano de VPC/VNet e subnets",
      "Tabela de rotas e matriz de fluxos",
      "Modelo de security groups, NSGs e firewalls",
      "Desenho de DNS público e privado",
      "Plano de private endpoints e egress control",
      "Plano de conectividade híbrida",
      "Estimativa de custos de rede",
      "Plano de logs, troubleshooting e auditoria",
      "Plano Kubernetes networking: CNI/IPAM, Services, Ingress/Gateway, NetworkPolicy e egress",
      "Plano de custos e limpeza: NAT Gateway, endpoints privados, LB, firewall, VPN, peering, egress e logs",
      "Rubrica final de arquitetura cloud com critérios de aprovação"
    ]
  },

  pendingLessons: [],
  status: "completed",
  assessment: {
    requiredProgressPercent: 70,
    requiredQuizAverage: 70,
    requiredLabs: ["lab-14.1", "lab-14.2", "lab-14.3", "lab-14.4", "lab-14.5", "lab-14.6", "lab-14.7", "lab-14.8", "lab-14.9", "lab-14.10", "lab-14.11", "lab-14.12", "lab-14.13", "lab-14.14"],
    completionUnlocks: ["m15"],
    p1_09CloudNetworkingv2final: {
      status: "concluido",
      reviewedLessons: ["14.10", "14.11", "14.12", "14.13", "14.14"],
      policy: "labs simuláveis/local por padrão, cloud real apenas opcional e autorizada",
      requirements: [
        "custo estimado",
        "alternativa zero custo",
        "limpeza obrigatória",
        "validação objetiva",
        "evidências sanitizadas",
        "cross-links com Infra/DevSecOps e IAM"
      ]
    },
    p1CloudFinalReview: {
      reviewedLessons: ["14.10", "14.11", "14.12", "14.13", "14.14"],
      focus: "Kubernetes networking, observabilidade cloud, Landing Zone, custos, limpeza de recursos e projeto final cloud",
      requiredCapstoneScore: 80,
      requiredArtifacts: [
        "matriz de fluxos",
        "plano de DNS público e privado",
        "plano Kubernetes networking",
        "plano de private endpoints",
        "plano de observabilidade e auditoria",
        "estimativa FinOps e limpeza",
        "runbooks e rollback"
      ]
    }
  }
};
