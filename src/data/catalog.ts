import { ApplicationItem, ServiceItem, StepItem, OrderStatus } from '../types';

export const SITE_CONFIG = {
  name: "Univers Habakuk Digital Pro",
  short_name: "Univers Habakuk",
  language: "fr",
  market: "Côte d’Ivoire",
  tagline: "Vos idées prennent vie grâce au numérique.",
  description: "Découvrez des applications utiles, créatives et éducatives, et commandez une solution numérique adaptée à vos besoins.",
  brand: "Univers Habakuk Digital Pro",
  creator_credit: "Conçu par Ahoret Jean Cyrille",
  contact: {
    phone: "+225 07 04 00 23 87",
    whatsapp: "+225 07 04 00 23 87",
    email: "ahoretjeancyrille777@gmail.com",
    address: "Abidjan, Côte d’Ivoire"
  }
};

export const STATUS_DEFINITIONS: Record<OrderStatus, { label: string; color: string; description: string }> = {
  received: {
    label: "Nouvelle demande",
    color: "bg-blue-50 text-blue-800 border-blue-200",
    description: "Votre commande a été reçue et est enregistrée dans nos systèmes."
  },
  reviewing: {
    label: "À l’étude",
    color: "bg-amber-50 text-amber-800 border-amber-200",
    description: "Notre équipe technique analyse votre cahier des charges et vos spécifications."
  },
  awaiting_customer: {
    label: "En attente du client",
    color: "bg-purple-50 text-purple-800 border-purple-200",
    description: "Nous attendons vos précisions ou validations supplémentaires."
  },
  quoted: {
    label: "Devis envoyé",
    color: "bg-indigo-50 text-indigo-800 border-indigo-200",
    description: "Une proposition chiffrée détaillée vous a été transmise."
  },
  approved: {
    label: "Commande validée",
    color: "bg-emerald-50 text-emerald-800 border-emerald-200",
    description: "La commande est officiellement approuvée et entre en phase active."
  },
  in_progress: {
    label: "En cours de réalisation",
    color: "bg-[#E8F5EC] text-[#0B5D32] border-[#C9F0D5]",
    description: "Développement technique, design et paramétrage en cours."
  },
  testing: {
    label: "Tests et vérification",
    color: "bg-cyan-50 text-cyan-800 border-cyan-200",
    description: "Contrôle qualité, tests de sécurité et validation fonctionnelle."
  },
  ready: {
    label: "Prête à livrer",
    color: "bg-teal-50 text-teal-800 border-teal-200",
    description: "L'application est terminée et prête pour le déploiement final."
  },
  completed: {
    label: "Terminée",
    color: "bg-emerald-100 text-emerald-900 border-emerald-300",
    description: "Projet livré avec succès avec transfert des accès."
  },
  cancelled: {
    label: "Annulée",
    color: "bg-rose-50 text-rose-800 border-rose-200",
    description: "Commande clôturée ou annulée."
  }
};

export const INITIAL_APPLICATIONS: ApplicationItem[] = [
  {
    id: "APP-001",
    name: "IVOIR’EDUC PRO",
    category: "Éducation et formation",
    description: "Plateforme éducative pour les élèves du CM1 à la Terminale : cours, quiz, devoirs, corrections, révisions et examens blancs.",
    features: [
      "Cours et révisions",
      "Quiz et devoirs",
      "Corrections détaillées",
      "Examens blancs",
      "Tableau de bord de suivi"
    ],
    status: "Projet / disponibilité à confirmer",
    orderable: true,
    demoType: "interactive_feature",
    image_url: "/assets/images/app_ivoir_educ_1794505831655.jpg"
  },
  {
    id: "APP-002",
    name: "Formation IA Ahoret",
    category: "Éducation et formation",
    description: "Projet de formation pratique à l’intelligence artificielle et à ses usages professionnels en Afrique.",
    features: [
      "Parcours de formation modulaire",
      "Leçons pratiques pas à pas",
      "Exercices d'application réels"
    ],
    status: "Projet / disponibilité à confirmer",
    orderable: true,
    demoType: "prompt_generator",
    image_url: "/assets/images/digital_showcase_tiles_1794504392037.jpg"
  },
  {
    id: "APP-003",
    name: "Formation IA Data Base",
    category: "Éducation et formation",
    description: "Projet de formation autour des bases de données et de leurs usages conjoints avec l’intelligence artificielle.",
    features: [
      "Initiation aux structures de données",
      "Organisation des bases relationnelles",
      "Exercices pratiques SQL & IA"
    ],
    status: "Projet / disponibilité à confirmer",
    orderable: true,
    image_url: "/assets/images/digital_showcase_tiles_1794504392037.jpg"
  },
  {
    id: "APP-004",
    name: "WEB CODING",
    category: "Éducation et formation",
    description: "Projet de formation à la création de sites web modernes et d’applications dynamiques.",
    features: [
      "HTML & CSS moderne",
      "JavaScript interactif",
      "Création de projets web concrets"
    ],
    status: "Projet / disponibilité à confirmer",
    orderable: true,
    image_url: "/assets/images/hero_digital_ecosystem_1794504391774.jpg"
  },
  {
    id: "APP-005",
    name: "Viewer Visual",
    category: "Création numérique et IA",
    description: "Projet d’application de visualisation et de consultation interactive de contenus numériques.",
    features: [
      "Visualisation haute performance",
      "Interface de consultation fluide",
      "Organisation multimédia"
    ],
    status: "Projet / disponibilité à confirmer",
    orderable: true,
    image_url: "/assets/images/hero_digital_ecosystem_1794504391774.jpg"
  },
  {
    id: "APP-006",
    name: "Habakuk Generated Prompts",
    category: "Création numérique et IA",
    description: "Outil de création, d’organisation et d’optimisation de prompts pour les outils d’intelligence artificielle.",
    features: [
      "Génération automatique de prompts",
      "Bibliothèque de prompts thématiques",
      "Classement intelligent par usage"
    ],
    status: "Projet / disponibilité à confirmer",
    orderable: true,
    demoType: "prompt_generator",
    image_url: "/assets/images/digital_showcase_tiles_1794504392037.jpg"
  },
  {
    id: "APP-007",
    name: "Digital Art Photography",
    category: "Création numérique et IA",
    description: "Projet consacré à la photographie d'art et à la création artistique numérique ivoirienne.",
    features: [
      "Création et retouche visuelle",
      "Galerie d'exposition haute fidélité",
      "Présentation de réalisations"
    ],
    status: "Projet / disponibilité à confirmer",
    orderable: true,
    image_url: "/assets/images/hero_digital_ecosystem_1794504391774.jpg"
  },
  {
    id: "APP-008",
    name: "Photo Retouche",
    category: "Création numérique et IA",
    description: "Projet d’outil de retouche, de restauration et d’amélioration photographique assistée.",
    features: [
      "Retouche de portraits et paysages",
      "Amélioration visuelle automatique",
      "Export d’images optimisé"
    ],
    status: "Projet / disponibilité à confirmer",
    orderable: true,
    image_url: "/assets/images/hero_digital_ecosystem_1794504391774.jpg"
  },
  {
    id: "APP-009",
    name: "Ahoret Carte Event",
    category: "Gestion et services",
    description: "Projet de création de cartes d’invitation numériques avec QR code unique de validation pour mariages, galas et cérémonies.",
    features: [
      "Cartes d'invitation numériques",
      "QR code individuel sécurisé",
      "Gestion en direct des entrées"
    ],
    status: "Projet / disponibilité à confirmer",
    orderable: true,
    demoType: "code_generator",
    image_url: "/assets/images/app_carte_event_qr_1794505832685.jpg"
  },
  {
    id: "APP-010",
    name: "CV & MOTIVATION PRO",
    category: "Gestion et services",
    description: "Outil professionnel de création de CV aux normes de recrutement et de lettres de motivation percutantes.",
    features: [
      "Modèles de CV professionnels",
      "Mise en page automatique élégante",
      "Générateur de lettres de motivation"
    ],
    status: "Projet / disponibilité à confirmer",
    orderable: true,
    demoType: "cv_builder",
    image_url: "/assets/images/digital_showcase_tiles_1794504392037.jpg"
  },
  {
    id: "APP-011",
    name: "Base de données AD PHILADELPHIE",
    category: "Gestion et services",
    description: "Projet de gestion, d'annuaire et d’organisation des données de la communauté AD Philadelphie.",
    features: [
      "Gestion numérique des fiches",
      "Recherche rapide multicritères",
      "Organisation sécurisée des registres"
    ],
    status: "Projet / disponibilité à confirmer",
    orderable: true,
    image_url: "/assets/images/hero_digital_ecosystem_1794504391774.jpg"
  },
  {
    id: "APP-012",
    name: "Codes Générale",
    category: "Gestion et services",
    description: "Projet de génération et d'authentification de codes uniques selon le format officiel IVOIR + 4 chiffres + 1 lettre majuscule.",
    features: [
      "Génération algorithmique de codes",
      "Format strict IVOIR + 4 chiffres + Lettre",
      "Contrôle anti-doublons immédiat"
    ],
    status: "Projet / disponibilité à confirmer",
    orderable: true,
    demoType: "code_generator",
    image_url: "/assets/images/app_carte_event_qr_1794505832685.jpg"
  },
  {
    id: "APP-013",
    name: "QUESTIONS POUR UN CHRÉTIEN",
    category: "Jeux et divertissement",
    description: "Jeu de quiz biblique et chrétien captivant avec plusieurs manches inspirées des grands plateaux télévisés.",
    features: [
      "9 À LA SUITE",
      "4 À LA SUITE",
      "LE CHOC FINAL"
    ],
    status: "Projet / disponibilité à confirmer",
    orderable: true,
    demoType: "quiz_chretien",
    image_url: "/assets/images/app_quiz_chretien_1794505833585.jpg"
  },
  {
    id: "APP-014",
    name: "AHORET GAMES – L’UNIVERS AHORET KINDS",
    category: "Jeux et divertissement",
    description: "Projet d’univers ludique et éducatif regroupant des jeux numériques conçus pour la jeunesse.",
    features: [
      "Espace de jeux interactif",
      "Parcours ludiques et éducatifs",
      "Univers visuel signature"
    ],
    status: "Projet / disponibilité à confirmer",
    orderable: true,
    image_url: "/assets/images/app_quiz_chretien_1794505833585.jpg"
  },
  {
    id: "APP-015",
    name: "LE MILLIONNAIRE QUIZ",
    category: "Jeux et divertissement",
    description: "Jeu de questions-réponses interactif inspiré des grands quiz de culture générale à paliers progressifs.",
    features: [
      "Questions à choix multiples",
      "Paliers de progression & jokers",
      "Système de score et tableau d'honneur"
    ],
    status: "Projet / disponibilité à confirmer",
    orderable: true,
    demoType: "quiz_chretien",
    image_url: "/assets/images/app_quiz_chretien_1794505833585.jpg"
  },
  {
    id: "APP-016",
    name: "Ivoir’Cuisine Pro",
    category: "Cuisine",
    description: "Projet d’application gastronomique consacré à la richesse de la cuisine ivoirienne, ses recettes traditionnelles et modernes.",
    features: [
      "Recettes détaillées ivoiriennes",
      "Catégorisation (sauces, grillades, accompagnements)",
      "Conseils culinaires et temps de cuisson"
    ],
    status: "Projet / disponibilité à confirmer",
    orderable: true,
    demoType: "cuisine_recipe",
    image_url: "/assets/images/app_cuisine_ivoirienne_1794505832301.jpg"
  }
];

export const SERVICES: ServiceItem[] = [
  {
    name: "Commande d’application existante",
    description: "Sélectionnez une application du catalogue et obtenez votre version prête à l'emploi avec paramétrage initial."
  },
  {
    name: "Personnalisation d’application",
    description: "Adaptez une solution à votre identité visuelle, vos processus métier, votre logo et vos fonctionnalités spécifiques."
  },
  {
    name: "Création d’application sur mesure",
    description: "Présentez votre idée de projet numérique de A à Z pour recevoir une étude de faisabilité et une proposition technique."
  },
  {
    name: "Création de site web",
    description: "Développez une présence web professionnelle, moderne, ultra-rapide et responsive pour valoriser votre entreprise."
  },
  {
    name: "Accompagnement et formation",
    description: "Bénéficiez de conseils d'experts, d'une prise en main accompagnée et de formations pratiques pour votre équipe."
  }
];

export const ORDER_STEPS: StepItem[] = [
  {
    number: 1,
    title: "Choisissez",
    description: "Parcourez le catalogue et sélectionnez une application existante ou optez pour une création sur mesure."
  },
  {
    number: 2,
    title: "Personnalisez",
    description: "Précisez vos besoins, votre plateforme souhaitée (Android, iOS, Web, PC) et vos options de personnalisation."
  },
  {
    number: 3,
    title: "Envoyez votre demande",
    description: "Recevez instantanément une confirmation sécurisée et votre numéro de référence unique de suivi."
  },
  {
    number: 4,
    title: "Suivez votre commande",
    description: "Consultez l’avancement en temps réel depuis le suivi en ligne ou échangez directement sur WhatsApp."
  }
];

export const INITIAL_ORDERS = [
  {
    id: "ord-1",
    reference: "UHD-2026-4821",
    customer: {
      full_name: "Kouamé Eric N'Guessan",
      phone: "+225 07 45 12 89 00",
      email: "eric.kouame@example.ci",
      city: "Abidjan, Cocody"
    },
    application_id: "APP-001",
    application_name: "IVOIR’EDUC PRO",
    order_type: "Personnalisation" as const,
    platform: ["Android", "Site web"],
    budget: "150 000 - 300 000 FCFA",
    deadline: "3 semaines",
    details: "Nous souhaitons adapter IVOIR’EDUC PRO pour notre groupe scolaire à Cocody avec l'intégration des devoirs du premier trimestre et le logo de l'établissement.",
    status: "in_progress" as OrderStatus,
    admin_message: "Étude technique validée. Intégration de la charte graphique de votre école en cours. Maquette prévue sous 48h.",
    internal_notes: "Client sérieux. Acompte reçu. Développeur assigné: Cyrille.",
    created_at: "2026-11-10T08:30:00.000Z",
    updated_at: "2026-11-11T14:20:00.000Z",
    status_history: [
      {
        status: "received" as OrderStatus,
        changed_at: "2026-11-10T08:30:00.000Z",
        changed_by: "Système",
        note: "Demande enregistrée en ligne"
      },
      {
        status: "reviewing" as OrderStatus,
        changed_at: "2026-11-10T11:00:00.000Z",
        changed_by: "Ahoret Jean Cyrille",
        note: "Analyse du cahier des charges transmise"
      },
      {
        status: "quoted" as OrderStatus,
        changed_at: "2026-11-10T16:15:00.000Z",
        changed_by: "Ahoret Jean Cyrille",
        note: "Devis N°DEV-2026-088 transmis par WhatsApp"
      },
      {
        status: "approved" as OrderStatus,
        changed_at: "2026-11-11T09:00:00.000Z",
        changed_by: "Kouamé Eric N'Guessan",
        note: "Devis approuvé avec succès"
      },
      {
        status: "in_progress" as OrderStatus,
        changed_at: "2026-11-11T14:20:00.000Z",
        changed_by: "Ahoret Jean Cyrille",
        note: "Démarrage du paramétrage"
      }
    ]
  },
  {
    id: "ord-2",
    reference: "UHD-2026-7913",
    customer: {
      full_name: "Mariam Bakayoko",
      phone: "+225 05 66 33 22 11",
      email: "mariam.b@events-abidjan.ci",
      city: "Abidjan, Marcory"
    },
    application_id: "APP-009",
    application_name: "Ahoret Carte Event",
    order_type: "Application existante" as const,
    platform: ["Site web", "Android"],
    budget: "< 150 000 FCFA",
    deadline: "Urgent (< 1 semaine)",
    details: "Génération de 350 invitations avec QR Code unique pour une grande soirée de gala d'entreprise le samedi prochain.",
    status: "reviewing" as OrderStatus,
    admin_message: "Votre demande urgente est en cours d'analyse prioritaire. Notre équipe vous contacte par téléphone sous 2 heures.",
    internal_notes: "Gala d'entreprise. Priorité haute.",
    created_at: "2026-11-12T07:15:00.000Z",
    updated_at: "2026-11-12T07:45:00.000Z",
    status_history: [
      {
        status: "received" as OrderStatus,
        changed_at: "2026-11-12T07:15:00.000Z",
        changed_by: "Système",
        note: "Demande enregistrée en ligne"
      },
      {
        status: "reviewing" as OrderStatus,
        changed_at: "2026-11-12T07:45:00.000Z",
        changed_by: "Ahoret Jean Cyrille",
        note: "Prise en charge prioritaire"
      }
    ]
  },
  {
    id: "ord-3",
    reference: "UHD-2026-3024",
    customer: {
      full_name: "Pasteur David Brou",
      phone: "+225 01 02 03 04 05",
      city: "Yamoussoukro"
    },
    application_id: "APP-011",
    application_name: "Base de données AD PHILADELPHIE",
    order_type: "Personnalisation" as const,
    platform: ["Ordinateur", "Site web"],
    budget: "Sur devis",
    deadline: "1 mois",
    details: "Déploiement pour l'annuaire des fidèles et le suivi pastoral avec impression de fiches et statistiques de présence.",
    status: "quoted" as OrderStatus,
    admin_message: "Le devis détaillé et le plan d'installation vous ont été envoyés par email et WhatsApp. En attente de votre retour.",
    internal_notes: "Devis N°DEV-2026-085 envoyé.",
    created_at: "2026-11-08T10:00:00.000Z",
    updated_at: "2026-11-09T16:00:00.000Z",
    status_history: [
      {
        status: "received" as OrderStatus,
        changed_at: "2026-11-08T10:00:00.000Z",
        changed_by: "Système",
        note: "Demande reçue"
      },
      {
        status: "quoted" as OrderStatus,
        changed_at: "2026-11-09T16:00:00.000Z",
        changed_by: "Ahoret Jean Cyrille",
        note: "Devis transmis"
      }
    ]
  }
];
