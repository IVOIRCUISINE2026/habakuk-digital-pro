import { ApplicationItem, ServiceItem, StepItem, OrderStatus, Order } from '../types';

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
    image_url: "/assets/aistudio/file_00000000ebf881f4bce4d3aab20d6184_2678e92f.png",
    videoOverview: {
      durationSec: 45,
      headline: "La réussite scolaire du CM1 à la Terminale",
      narrationScript: "Découvrez IVOIR’EDUC PRO, la plateforme éducative complète du CM1 à la Terminale avec cours structurés, quiz, corrections détaillées et examens blancs.",
      scenes: [
        {
          badge: "01 · PRÉSENTATION",
          title: "Votre allié scolaire du CM1 à la Terminale",
          caption: "IVOIR’EDUC PRO centralise tout le programme officiel ivoirien dans une interface claire et motivante.",
          highlight: "Cours conformes du primaire au lycée",
          startSec: 0,
          endSec: 15
        },
        {
          badge: "02 · APPRENTISSAGE",
          title: "Cours, quiz et devoirs corrigés",
          caption: "Chaque leçon s’accompagne d’exercices pratiques et de corrections pas à pas pour progresser à son rythme.",
          highlight: "Mathématiques, Français, Sciences & plus",
          startSec: 15,
          endSec: 25
        },
        {
          badge: "03 · PERFORMANCE",
          title: "Examens blancs & suivi continu",
          caption: "Préparez le CEPE, le BEPC et le BAC avec des simulations d’épreuves et un tableau de bord des progrès.",
          highlight: "Suivi en temps réel pour élèves et parents",
          startSec: 25,
          endSec: 35
        },
        {
          badge: "04 · DÉPLOIEMENT",
          title: "Prêt pour écoles, parents et élèves",
          caption: "Commandez votre accès ou adaptez la plateforme à votre établissement avec Univers Habakuk Digital Pro.",
          highlight: "Disponible sur mobile, tablette et web",
          startSec: 35,
          endSec: 45
        }
      ]
    }
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
    image_url: "/assets/aistudio/152020491_1791988376466157_3459d23f.jpg",
    videoOverview: {
      durationSec: 45,
      headline: "Maîtrisez l’intelligence artificielle concrètement",
      narrationScript: "Formation IA Ahoret vous guide pas à pas pour transformer l’intelligence artificielle en levier professionnel concret en Afrique.",
      scenes: [
        {
          badge: "01 · PRÉSENTATION",
          title: "L’IA accessible et pratique en Afrique",
          caption: "Une formation conçue sur le terrain pour comprendre et exploiter les meilleurs outils d’IA au quotidien.",
          highlight: "Approche 100 % pragmatique et guidée",
          startSec: 0,
          endSec: 15
        },
        {
          badge: "02 · MÉTHODE",
          title: "Un parcours modulaire pas à pas",
          caption: "Avancez module par module : rédaction de prompts, automatisation de tâches et création de contenus.",
          highlight: "Leçons claires adaptées à chaque niveau",
          startSec: 15,
          endSec: 25
        },
        {
          badge: "03 · PRATIQUE",
          title: "Des cas réels d’entreprise et d’études",
          caption: "Appliquez directement vos acquis sur des exercices concrets dédiés aux métiers et projets locaux.",
          highlight: "Gagnez en productivité dès la 1ère semaine",
          startSec: 25,
          endSec: 35
        },
        {
          badge: "04 · DÉPLOIEMENT",
          title: "Formez vos équipes ou lancez votre parcours",
          caption: "Intégrez Formation IA Ahoret pour particuliers, écoles, startups ou programmes d’entreprise.",
          highlight: "Accompagnement sur mesure disponible",
          startSec: 35,
          endSec: 45
        }
      ]
    }
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
    image_url: "/assets/aistudio/file_00000000883c8210abbab37390ae9160_7a6f1604.png",
    videoOverview: {
      durationSec: 45,
      headline: "Structurez vos données et connectez-les à l’IA",
      narrationScript: "Avec Formation IA Data Base, apprenez à concevoir des bases de données solides et à les exploiter avec l’intelligence artificielle.",
      scenes: [
        {
          badge: "01 · PRÉSENTATION",
          title: "La puissance des données unie à l’IA",
          caption: "Apprenez comment structurer, sécuriser et interroger des bases de données modernes avec l’aide de l’IA.",
          highlight: "Fondamentaux solides & cas pratiques",
          startSec: 0,
          endSec: 15
        },
        {
          badge: "02 · ARCHITECTURE",
          title: "Modélisation et bases relationnelles",
          caption: "Maîtrisez la création de tables, les relations, les clés et l’organisation propre de l’information.",
          highlight: "Schémas clairs et bonnes pratiques SQL",
          startSec: 15,
          endSec: 25
        },
        {
          badge: "03 · SYNERGIE IA",
          title: "Requêtes SQL assistées & analyse",
          caption: "Utilisez l’IA pour générer des requêtes, détecter des anomalies et valoriser vos données métier.",
          highlight: "Exercices interactifs SQL & IA",
          startSec: 25,
          endSec: 35
        },
        {
          badge: "04 · DÉPLOIEMENT",
          title: "Une compétence clé pour vos projets",
          caption: "Déployez ce programme pour étudiants, développeurs juniors ou équipes informatiques d’entreprise.",
          highlight: "Personnalisation de programme incluse",
          startSec: 35,
          endSec: 45
        }
      ]
    }
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
    image_url: "/assets/aistudio/1792576666163_fd34c23a.jpg",
    videoOverview: {
      durationSec: 45,
      headline: "Passez du code HTML à vos propres applications web",
      narrationScript: "WEB CODING forme efficacement aux technologies HTML, CSS et JavaScript à travers la réalisation de projets web concrets.",
      scenes: [
        {
          badge: "01 · PRÉSENTATION",
          title: "Devenez créateur de solutions web",
          caption: "WEB CODING initie et perfectionne à la programmation front-end et à la construction d’interfaces modernes.",
          highlight: "Apprentissage orienté réalisation",
          startSec: 0,
          endSec: 15
        },
        {
          badge: "02 · FONDATIONS",
          title: "HTML5 & CSS3 responsive",
          caption: "Structurez vos pages proprement et concevez des designs élégants adaptés aux mobiles et ordinateurs.",
          highlight: "Mise en page moderne & maquettes réelles",
          startSec: 15,
          endSec: 25
        },
        {
          badge: "03 · INTERACTIVITÉ",
          title: "JavaScript & projets concrets",
          caption: "Rendez vos sites dynamiques : menus, formulaires, boutiques et mini-applications prêtes pour le web.",
          highlight: "De la première ligne de code au déploiement",
          startSec: 25,
          endSec: 35
        },
        {
          badge: "04 · DÉPLOIEMENT",
          title: "Lancez votre académie ou formation",
          caption: "Commandez la plateforme WEB CODING clé en main pour centres de formation et apprenants autonomes.",
          highlight: "Support pédagogique prêt à l’emploi",
          startSec: 35,
          endSec: 45
        }
      ]
    }
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
    image_url: "/assets/images/hero_digital_ecosystem_1794504391774.jpg",
    videoOverview: {
      durationSec: 45,
      headline: "Explorez et présentez vos médias avec fluidité",
      narrationScript: "Viewer Visual offre une expérience de consultation multimédia rapide, organisée et haute performance sur tous vos écrans.",
      scenes: [
        {
          badge: "01 · PRÉSENTATION",
          title: "Une vitrine multimédia haute précision",
          caption: "Viewer Visual transforme la consultation de visuels, galeries et documents numériques en expérience fluide.",
          highlight: "Rendu rapide et net sur chaque appareil",
          startSec: 0,
          endSec: 15
        },
        {
          badge: "02 · ORGANISATION",
          title: "Classement intelligent des contenus",
          caption: "Regroupez photos, présentations et archives par dossiers thématiques faciles à retrouver.",
          highlight: "Navigation intuitive sans ralentissement",
          startSec: 15,
          endSec: 25
        },
        {
          badge: "03 · CONSULTATION",
          title: "Zoom, prévisualisation & partage",
          caption: "Inspectez chaque détail en plein écran et présentez vos réalisations lors de réunions ou expositions.",
          highlight: "Expérience immersive sans distraction",
          startSec: 25,
          endSec: 35
        },
        {
          badge: "04 · DÉPLOIEMENT",
          title: "Adapté aux créateurs et entreprises",
          caption: "Personnalisez Viewer Visual à votre charte graphique avec Univers Habakuk Digital Pro.",
          highlight: "Déploiement web ou poste local",
          startSec: 35,
          endSec: 45
        }
      ]
    }
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
    image_url: "/assets/images/digital_showcase_tiles_1794504392037.jpg",
    videoOverview: {
      durationSec: 45,
      headline: "Obtenez de meilleurs résultats avec l’IA en 1 clic",
      narrationScript: "Habakuk Generated Prompts structure et optimise vos instructions IA pour obtenir des réponses précises et professionnelles.",
      scenes: [
        {
          badge: "01 · PRÉSENTATION",
          title: "Fini les prompts approximatifs",
          caption: "Habakuk Generated Prompts aide à formuler des instructions précises pour décupler la qualité de vos outils IA.",
          highlight: "Des requêtes structurées en quelques secondes",
          startSec: 0,
          endSec: 15
        },
        {
          badge: "02 · GÉNÉRATION",
          title: "Générateur intelligent par objectif",
          caption: "Choisissez votre domaine — rédaction, code, marketing ou éducation — et obtenez un prompt prêt à copier.",
          highlight: "Rôle, contexte et format inclus",
          startSec: 15,
          endSec: 25
        },
        {
          badge: "03 · BIBLIOTHÈQUE",
          title: "Classement et réutilisation rapide",
          caption: "Sauvegardez vos meilleurs modèles par catégorie et partagez-les avec toute votre équipe.",
          highlight: "Bibliothèque thématique évolutive",
          startSec: 25,
          endSec: 35
        },
        {
          badge: "04 · DÉPLOIEMENT",
          title: "Votre studio de productivité IA",
          caption: "Commandez l’outil personnalisé pour votre activité ou intégrez-le à votre espace de formation.",
          highlight: "Testez le générateur dans « Aperçu démo »",
          startSec: 35,
          endSec: 45
        }
      ]
    }
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
    image_url: "/assets/images/hero_digital_ecosystem_1794504391774.jpg",
    videoOverview: {
      durationSec: 45,
      headline: "Sublimez et exposez l’art photographique numérique",
      narrationScript: "Digital Art Photography met en valeur vos œuvres photographiques et créations visuelles dans une galerie numérique élégante.",
      scenes: [
        {
          badge: "01 · PRÉSENTATION",
          title: "Une vitrine dédiée à l’art visuel ivoirien",
          caption: "Valorisez vos photographies d’art, portraits et compositions graphiques dans un écrin numérique moderne.",
          highlight: "Esthétique galerie haute fidélité",
          startSec: 0,
          endSec: 15
        },
        {
          badge: "02 · CRÉATION",
          title: "Mise en scène et harmonisation",
          caption: "Organisez vos séries artistiques par thème, ambiance colorimétrique et collection exclusive.",
          highlight: "Qualité visuelle préservée sans compression",
          startSec: 15,
          endSec: 25
        },
        {
          badge: "03 · EXPOSITION",
          title: "Portfolio client & partage social",
          caption: "Présentez vos réalisations aux clients, galeries et partenaires depuis un lien professionnel unique.",
          highlight: "Catalogue visuel attractif 24h/24",
          startSec: 25,
          endSec: 35
        },
        {
          badge: "04 · DÉPLOIEMENT",
          title: "Idéal pour photographes et studios",
          caption: "Commandez votre espace Digital Art Photography personnalisé selon votre signature visuelle.",
          highlight: "Prêt pour mobile et grand écran",
          startSec: 35,
          endSec: 45
        }
      ]
    }
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
    image_url: "/assets/images/hero_digital_ecosystem_1794504391774.jpg",
    videoOverview: {
      durationSec: 45,
      headline: "Restaurez et sublimez chaque photo en un instant",
      narrationScript: "Photo Retouche simplifie l’amélioration lumineuse, la restauration et l’export net de vos portraits et paysages.",
      scenes: [
        {
          badge: "01 · PRÉSENTATION",
          title: "La retouche photo accessible à tous",
          caption: "Redonnez éclat, netteté et équilibre à vos clichés sans maîtriser de logiciels complexes.",
          highlight: "Interface simple, résultats professionnels",
          startSec: 0,
          endSec: 15
        },
        {
          badge: "02 · TRAITEMENT",
          title: "Portraits, paysages & restauration",
          caption: "Corrigez la luminosité, les contrastes, les imperfections et ravivez les photos anciennes.",
          highlight: "Amélioration assistée intelligente",
          startSec: 15,
          endSec: 25
        },
        {
          badge: "03 · EXPORTATION",
          title: "Export rapide prêt à imprimer ou publier",
          caption: "Téléchargez vos visuels optimisés pour les réseaux sociaux, l’impression ou le e-commerce.",
          highlight: "Formats légers et haute résolution",
          startSec: 25,
          endSec: 35
        },
        {
          badge: "04 · DÉPLOIEMENT",
          title: "Un atout pour studios et commerces",
          caption: "Intégrez Photo Retouche dans votre flux de travail ou proposez-le comme service en ligne.",
          highlight: "Personnalisation complète sur commande",
          startSec: 35,
          endSec: 45
        }
      ]
    }
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
    image_url: "/assets/images/app_carte_event_qr_1794505832685.jpg",
    videoOverview: {
      durationSec: 45,
      headline: "Des invitations digitales sécurisées par QR code",
      narrationScript: "Ahoret Carte Event génère des cartes d’invitation élégantes dotées d’un QR code individuel pour contrôler les entrées en direct.",
      scenes: [
        {
          badge: "01 · PRÉSENTATION",
          title: "Modernisez l’accueil de vos événements",
          caption: "Mariages, galas, conférences ou cérémonies : remplacez le papier par des invitations numériques prestigieuses.",
          highlight: "Envoi instantané sur WhatsApp et email",
          startSec: 0,
          endSec: 15
        },
        {
          badge: "02 · SÉCURITÉ",
          title: "Un QR code unique par invité",
          caption: "Chaque convive reçoit sa carte nominative munie d’un QR code chiffré impossible à dupliquer.",
          highlight: "Zéro fraude ni doublon à l’entrée",
          startSec: 15,
          endSec: 25
        },
        {
          badge: "03 · CONTRÔLE LIVE",
          title: "Validation et pointage en temps réel",
          caption: "Scannez à l’accueil avec un simple smartphone et suivez instantanément le taux de présence.",
          highlight: "Tableau de bord des entrées en direct",
          startSec: 25,
          endSec: 35
        },
        {
          badge: "04 · DÉPLOIEMENT",
          title: "Prêt pour votre prochain événement",
          caption: "Essayez le générateur dans « Aperçu démo » puis commandez votre pack personnalisé.",
          highlight: "Design adapté au thème de votre cérémonie",
          startSec: 35,
          endSec: 45
        }
      ]
    }
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
    image_url: "/assets/images/digital_showcase_tiles_1794504392037.jpg",
    videoOverview: {
      durationSec: 45,
      headline: "Décrochez plus d’entretiens avec un dossier soigné",
      narrationScript: "CV et Motivation Pro génère automatiquement des CV structurés et des lettres de motivation convaincantes prêtes pour les recruteurs.",
      scenes: [
        {
          badge: "01 · PRÉSENTATION",
          title: "Faites forte impression dès le premier regard",
          caption: "Concevez un curriculum vitae clair, structuré et conforme aux attentes des cabinets de recrutement.",
          highlight: "Adapté aux candidats, étudiants & cadres",
          startSec: 0,
          endSec: 15
        },
        {
          badge: "02 · DESIGN AUTO",
          title: "Mise en page élégante automatique",
          caption: "Renseignez vos expériences et compétences : l’application aligne automatiquement les rubriques sans effort.",
          highlight: "Modèles modernes sobres et lisibles",
          startSec: 15,
          endSec: 25
        },
        {
          badge: "03 · MOTIVATION",
          title: "Lettre de motivation personnalisée",
          caption: "Générez une lettre percutante ciblée sur le poste visé afin d’augmenter vos chances de sélection.",
          highlight: "Rédaction claire & vocabulaire professionnel",
          startSec: 25,
          endSec: 35
        },
        {
          badge: "04 · DÉPLOIEMENT",
          title: "Testez et lancez votre plateforme carrière",
          caption: "Simulez votre profil dans « Aperçu démo » ou commandez l’application pour votre cabinet ou campus.",
          highlight: "Export PDF prêt à envoyer aux recruteurs",
          startSec: 35,
          endSec: 45
        }
      ]
    }
  },
  {
    id: "APP-011",
    name: "Diplômes numériques",
    category: "Gestion et services",
    description: "Conception de tout type de diplômes numériques et diplômes personnalisés : diplômes scolaires et universitaires, certificats de formation, attestations d’honneur et parchemins officiels sécurisés.",
    features: [
      "Conception de tout type de diplômes numériques et personnalisés",
      "Modèles officiels, académiques, professionnels et honorifiques",
      "Intégration de sceau doré, signatures et QR code d’authenticité",
      "Génération en masse et export PDF haute définition imprimable"
    ],
    status: "Projet / disponibilité à confirmer",
    orderable: true,
    demoType: "diploma_designer",
    image_url: "/assets/images/app_diplomes_numeriques_1794544851006.jpg",
    videoOverview: {
      durationSec: 45,
      headline: "Créez et authentifiez tous types de diplômes",
      narrationScript: "Diplômes numériques permet de concevoir des diplômes personnalisés, certificats et attestations avec sceau doré et QR code d’authenticité.",
      scenes: [
        {
          badge: "01 · PRÉSENTATION",
          title: "Tout type de diplôme sur mesure",
          caption: "Diplômes scolaires, certificats de formation, attestations de réussite ou distinctions honorifiques.",
          highlight: "Design officiel de prestige clé en main",
          startSec: 0,
          endSec: 15
        },
        {
          badge: "02 · PERSONNALISATION",
          title: "Sceau doré, logos et signatures",
          caption: "Intégrez l’emblème de votre institution, la mention, la promotion et les signatures officielles.",
          highlight: "Modèles académiques & professionnels",
          startSec: 15,
          endSec: 25
        },
        {
          badge: "03 · AUTHENTICITÉ",
          title: "QR code de vérification & export masse",
          caption: "Chaque parchemin porte un code d’authenticité unique et s’exporte en PDF HD prêt pour l’impression.",
          highlight: "Protection anti-falsification intégrée",
          startSec: 25,
          endSec: 35
        },
        {
          badge: "04 · DÉPLOIEMENT",
          title: "Testez le studio de diplômes en direct",
          caption: "Personnalisez un modèle dans « Aperçu démo » ou commandez votre solution pour votre établissement.",
          highlight: "Idéal écoles, centres de formation & ONG",
          startSec: 35,
          endSec: 45
        }
      ]
    }
  },
  {
    id: "APP-012",
    name: "Calendrier numérique",
    category: "Gestion et services",
    description: "Conception de tout type de calendrier personnalisé : calendriers d’entreprise, scolaires, liturgiques, événementiels, muraux ou interactifs adaptés à votre identité.",
    features: [
      "Conception de tout type de calendrier personnalisé",
      "Modèles d’entreprise, scolaires, religieux et familiaux",
      "Intégration de logos, photos, jours fériés et temps forts",
      "Export haute définition et version numérique interactive"
    ],
    status: "Projet / disponibilité à confirmer",
    orderable: true,
    demoType: "calendar_designer",
    image_url: "/assets/images/app_calendrier_numerique_1794543703168.jpg",
    videoOverview: {
      durationSec: 45,
      headline: "Concevez tout type de calendrier à votre image",
      narrationScript: "Calendrier numérique crée des calendriers personnalisés d’entreprise, scolaires, religieux ou événementiels en version interactive et imprimable.",
      scenes: [
        {
          badge: "01 · PRÉSENTATION",
          title: "Des calendriers sur mesure pour chaque besoin",
          caption: "Entreprises, établissements scolaires, églises, associations ou familles : un calendrier à votre identité.",
          highlight: "Formats muraux, de bureau & interactifs",
          startSec: 0,
          endSec: 15
        },
        {
          badge: "02 · CONTENU",
          title: "Logos, photos et événements clés",
          caption: "Ajoutez vos visuels, jours fériés locaux, dates importantes et couleurs officielles de votre structure.",
          highlight: "Personnalisation mois par mois",
          startSec: 15,
          endSec: 25
        },
        {
          badge: "03 · DIFFUSION",
          title: "Version numérique + impression HD",
          caption: "Consultez votre planning sur téléphone ou imprimez des exemplaires nets pour vos partenaires et clients.",
          highlight: "Export haute définition garanti",
          startSec: 25,
          endSec: 35
        },
        {
          badge: "04 · DÉPLOIEMENT",
          title: "Configurez votre modèle dès maintenant",
          caption: "Essayez le créateur interactif dans « Aperçu démo » et commandez votre calendrier personnalisé.",
          highlight: "Livraison rapide adaptée à votre marque",
          startSec: 35,
          endSec: 45
        }
      ]
    }
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
    image_url: "/assets/images/app_quiz_chretien_1794505833585.jpg",
    videoOverview: {
      durationSec: 45,
      headline: "Le grand jeu biblique inspiré des plateaux TV",
      narrationScript: "Questions pour un Chrétien anime vos veillées, groupes de jeunesse et familles avec les célèbres manches 9 à la suite, 4 à la suite et Le Choc Final.",
      scenes: [
        {
          badge: "01 · PRÉSENTATION",
          title: "Apprendre la Bible dans la joie du jeu",
          caption: "Une émission de culture biblique interactive pensée pour les églises, mouvements de jeunesse et familles.",
          highlight: "Ambiance plateau télévisé authentique",
          startSec: 0,
          endSec: 15
        },
        {
          badge: "02 · MANCHE 1 & 2",
          title: "9 À LA SUITE & 4 À LA SUITE",
          caption: "Enchaînez les bonnes réponses contre la montre sur des thèmes bibliques variés pour vous qualifier.",
          highlight: "Chronomètre, points et suspense en direct",
          startSec: 15,
          endSec: 25
        },
        {
          badge: "03 · FINALE",
          title: "LE CHOC FINAL",
          caption: "Les finalistes s’affrontent sur des questions décisives pour décrocher le trophée de la session.",
          highlight: "Classement et scores automatiques",
          startSec: 25,
          endSec: 35
        },
        {
          badge: "04 · DÉPLOIEMENT",
          title: "Animez votre communauté dès aujourd’hui",
          caption: "Jouez à un extrait dans « Aperçu démo » ou commandez la version complète pour votre assemblée.",
          highlight: "Projection grand écran & mobile",
          startSec: 35,
          endSec: 45
        }
      ]
    }
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
    image_url: "/assets/images/app_quiz_chretien_1794505833585.jpg",
    videoOverview: {
      durationSec: 45,
      headline: "Un univers ludique et sain pensé pour la jeunesse",
      narrationScript: "Ahoret Games réunit des mini-jeux éducatifs et divertissants dans un univers coloré, sûr et stimulant pour les jeunes.",
      scenes: [
        {
          badge: "01 · PRÉSENTATION",
          title: "Jouer, réfléchir et grandir ensemble",
          caption: "L’univers Ahoret Kinds rassemble des jeux numériques conçus pour stimuler la curiosité des jeunes.",
          highlight: "Environnement ludique positif et sûr",
          startSec: 0,
          endSec: 15
        },
        {
          badge: "02 · EXPÉRIENCE",
          title: "Défis et parcours progressifs",
          caption: "Mémoire, logique, réflexes et culture générale : chaque activité récompense la persévérance.",
          highlight: "Mini-jeux variés et accessibles",
          startSec: 15,
          endSec: 25
        },
        {
          badge: "03 · UNIVERS VISUEL",
          title: "Une identité graphique attachante",
          caption: "Des écrans colorés, une prise en main immédiate et des animations adaptées aux enfants et ados.",
          highlight: "Ergonomie fluide sur tablette et mobile",
          startSec: 25,
          endSec: 35
        },
        {
          badge: "04 · DÉPLOIEMENT",
          title: "Créez votre portail jeunesse sur mesure",
          caption: "Commandez Ahoret Games ou adaptez ses modules ludiques à votre école ou centre éducatif.",
          highlight: "Évolutif avec de nouveaux jeux",
          startSec: 35,
          endSec: 45
        }
      ]
    }
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
    image_url: "/assets/images/app_quiz_chretien_1794505833585.jpg",
    videoOverview: {
      durationSec: 45,
      headline: "Grimpez les paliers de la culture générale",
      narrationScript: "Le Millionnaire Quiz propose un défi passionnant à choix multiples avec paliers progressifs, jokers stratégiques et tableau d’honneur.",
      scenes: [
        {
          badge: "01 · PRÉSENTATION",
          title: "Le frisson du quiz à paliers progressifs",
          caption: "Testez vos connaissances sur l’histoire, la science, l’Afrique et la culture générale en montant chaque palier.",
          highlight: "Tension et plaisir à chaque question",
          startSec: 0,
          endSec: 15
        },
        {
          badge: "02 · STRATÉGIE",
          title: "QCM dynamiques et jokers tactiques",
          caption: "Bloqué sur une question ? Activez vos jokers au bon moment pour sécuriser votre progression.",
          highlight: "4 propositions claires & validation directe",
          startSec: 15,
          endSec: 25
        },
        {
          badge: "03 · COMPÉTITION",
          title: "Score et tableau d’honneur",
          caption: "Enregistrez les meilleurs scores et lancez des tournois conviviaux entre amis, collègues ou élèves.",
          highlight: "Animation idéale d’événements & soirées",
          startSec: 25,
          endSec: 35
        },
        {
          badge: "04 · DÉPLOIEMENT",
          title: "Personnalisez vos banques de questions",
          caption: "Commandez votre quiz sur mesure pour campagnes d’entreprise, écoles ou compétitions locales.",
          highlight: "Démo jouable disponible immédiatement",
          startSec: 35,
          endSec: 45
        }
      ]
    }
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
    image_url: "/assets/aistudio/file_000000008dfc8246a4c54cb5af6e525f_ae275edd.png",
    videoOverview: {
      durationSec: 45,
      headline: "30 jours et plus de saveurs ivoiriennes et africaines",
      narrationScript: "Ivoir’Cuisine Pro rassemble les meilleures recettes ivoiriennes et africaines avec ingrédients précis, temps de cuisson et astuces de chef.",
      scenes: [
        {
          badge: "01 · PRÉSENTATION",
          title: "La gastronomie ivoirienne dans votre poche",
          caption: "Redécouvrez garba, alloco, kedjenou, sauce graine, poisson braisé et plats emblématiques d’Afrique.",
          highlight: "Recettes authentiques & modernes réunies",
          startSec: 0,
          endSec: 15
        },
        {
          badge: "02 · ORGANISATION",
          title: "Sauces, grillades et accompagnements",
          caption: "Naviguez par catégorie ou explorez le programme culinaire sur 30 jours selon vos envies du moment.",
          highlight: "Recherche rapide par plat ou ingrédient",
          startSec: 15,
          endSec: 25
        },
        {
          badge: "03 · PRÉPARATION",
          title: "Étapes détaillées & temps de cuisson",
          caption: "Suivez les proportions exactes, les conseils d’assaisonnement et conservez vos favoris même hors ligne.",
          highlight: "Réussissez chaque plat du premier coup",
          startSec: 25,
          endSec: 35
        },
        {
          badge: "04 · DÉPLOIEMENT",
          title: "Consultez une recette ou lancez l’app",
          caption: "Explorez un plat dans « Aperçu démo » ou commandez votre application culinaire personnalisée.",
          highlight: "Parfait pour passionnés, traiteurs & restos",
          startSec: 35,
          endSec: 45
        }
      ]
    }
  },
  {
    id: "APP-017",
    name: "Conception de site web",
    category: "Gestion et services",
    description: "Conception de tout type de site web personnalisé : sites vitrines, boutiques e-commerce, portails d’entreprise, plateformes institutionnelles et applications web sur mesure.",
    features: [
      "Conception de tout type de site web personnalisé",
      "Design moderne responsive (mobile, tablette, ordinateur)",
      "Boutiques e-commerce, sites vitrines, portails & blogs",
      "Optimisation SEO, sécurité SSL et mise en ligne complète"
    ],
    status: "Projet / disponibilité à confirmer",
    orderable: true,
    demoType: "web_designer",
    image_url: "/assets/images/app_conception_web_1794545302905.jpg",
    videoOverview: {
      durationSec: 45,
      headline: "Votre présence web professionnelle clé en main",
      narrationScript: "Conception de site web réalise tout type de site personnalisé : vitrine, e-commerce, portail d’entreprise ou plateforme métier sécurisée.",
      scenes: [
        {
          badge: "01 · PRÉSENTATION",
          title: "Tout type de site web sur mesure",
          caption: "Sites vitrines, boutiques e-commerce, portails institutionnels ou blogs : bâtissez une vitrine qui vous ressemble.",
          highlight: "Architecture adaptée à vos objectifs",
          startSec: 0,
          endSec: 15
        },
        {
          badge: "02 · DESIGN RESPONSIVE",
          title: "Fluide sur mobile, tablette et PC",
          caption: "Chaque interface s’adapte automatiquement à tous les écrans avec une navigation rapide et soignée.",
          highlight: "Identité visuelle et ergonomie moderne",
          startSec: 15,
          endSec: 25
        },
        {
          badge: "03 · PERFORMANCE",
          title: "SEO, sécurité SSL et mise en ligne",
          caption: "Nous intégrons le référencement naturel, le certificat HTTPS, les formulaires et le nom de domaine.",
          highlight: "Prêt à convertir vos visiteurs en clients",
          startSec: 25,
          endSec: 35
        },
        {
          badge: "04 · DÉPLOIEMENT",
          title: "Simulez votre projet en 30 secondes",
          caption: "Configurez votre site dans « Aperçu démo » puis passez commande auprès d’Ahoret Jean Cyrille.",
          highlight: "Accompagnement & maintenance en Côte d’Ivoire",
          startSec: 35,
          endSec: 45
        }
      ]
    }
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

export const INITIAL_ORDERS: Order[] = [];
