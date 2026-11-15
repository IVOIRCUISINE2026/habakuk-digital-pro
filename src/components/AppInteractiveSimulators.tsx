import React, { useState } from 'react';
import {
  Check,
  Copy,
  Calendar,
  Award,
  Globe,
  BookOpen,
  Database,
  Code2,
  SlidersHorizontal,
  QrCode,
  ScanLine,
  FileText,
  Gamepad2,
  Trophy,
  UtensilsCrossed,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Users,
  Sparkles,
  Play,
  Camera,
} from 'lucide-react';
import { ApplicationItem } from '../types';

interface SimulatorProps {
  app: ApplicationItem;
}

export const AppInteractiveSimulator: React.FC<SimulatorProps> = ({ app }) => {
  switch (app.id) {
    case 'APP-001':
      return <IvoirEducSimulator />;
    case 'APP-002':
      return <FormationIASimulator />;
    case 'APP-003':
      return <DataBaseIASimulator />;
    case 'APP-004':
      return <WebCodingSimulator />;
    case 'APP-005':
      return <ViewerVisualSimulator imageUrl={app.image_url} />;
    case 'APP-006':
      return <PromptGeneratorSimulator />;
    case 'APP-007':
      return <DigitalArtSimulator imageUrl={app.image_url} />;
    case 'APP-008':
      return <PhotoRetoucheSimulator imageUrl={app.image_url} />;
    case 'APP-009':
      return <CarteEventSimulator />;
    case 'APP-010':
      return <CvMotivationSimulator />;
    case 'APP-011':
      return <DiplomaSimulator />;
    case 'APP-012':
      return <CalendarSimulator />;
    case 'APP-013':
      return <QuizChretienSimulator />;
    case 'APP-014':
      return <AhoretGamesSimulator />;
    case 'APP-015':
      return <MillionnaireQuizSimulator />;
    case 'APP-016':
      return <IvoirCuisineSimulator />;
    case 'APP-017':
      return <WebDesignerSimulator />;
    default:
      return <QuizChretienSimulator />;
  }
};

/* ============================================================================
   APP-001 : IVOIR'EDUC PRO (Cours & Quiz CM1 → Terminale)
   ============================================================================ */
const IvoirEducSimulator: React.FC = () => {
  const [level, setLevel] = useState<'CM1' | '3ème' | 'Terminale'>('CM1');
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const exercises = {
    CM1: {
      subject: 'Mathématiques · CM1',
      lesson: 'Un périmètre mesure le contour d’une figure. Pour un rectangle : P = (Longueur + largeur) × 2.',
      question: 'Un terrain d’école rectangulaire mesure 25 m de long et 15 m de large. Quel est son périmètre ?',
      options: ['40 m', '80 m', '375 m', '60 m'],
      correct: 1,
      explanation: 'P = (25 + 15) × 2 = 40 × 2 = 80 mètres.',
    },
    '3ème': {
      subject: 'Physique-Chimie · 3ème (BEPC)',
      lesson: 'La loi d’Ohm relie la tension U (en Volts), la résistance R (en Ohms) et l’intensité I (en Ampères) : U = R × I.',
      question: 'Quelle est la tension aux bornes d’une résistance de 20 Ω traversée par un courant de 0,5 A ?',
      options: ['10 V', '40 V', '20,5 V', '5 V'],
      correct: 0,
      explanation: 'U = R × I = 20 × 0,5 = 10 Volts.',
    },
    Terminale: {
      subject: 'Philosophie · Terminale (BAC)',
      lesson: 'En dissertation philosophique, l’analyse conceptuelle permet de dégager le problème central du sujet.',
      question: 'Quelle structure compose une introduction complète au BAC en Côte d’Ivoire ?',
      options: [
        'Résumé du cours uniquement',
        'Amorce, définition, problématique et annonce du plan',
        'Conclusion directe sans exemple',
        'Liste de citations sans lien',
      ],
      correct: 1,
      explanation: 'Une bonne introduction amène le sujet, pose le paradoxe/problème et annonce clairement le plan.',
    },
  };

  const current = exercises[level];

  const handleChoose = (idx: number) => {
    setSelected(idx);
    if (idx === current.correct) setScore((s) => s + 1);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#DCE9E0] pb-2">
        <span className="text-xs font-bold text-[#168447] flex items-center gap-1.5">
          <BookOpen className="w-4 h-4" />
          <span>{current.subject}</span>
        </span>
        <span className="text-xs font-mono-code text-[#64756B]">
          Bonnes réponses : <strong className="text-[#173528]">{score}</strong>
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {(['CM1', '3ème', 'Terminale'] as const).map((lvl) => (
          <button
            key={lvl}
            type="button"
            onClick={() => {
              setLevel(lvl);
              setSelected(null);
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              level === lvl
                ? 'bg-[#168447] text-white'
                : 'bg-white text-[#64756B] border border-[#DCE9E0] hover:text-[#173528]'
            }`}
          >
            Niveau {lvl}
          </button>
        ))}
      </div>

      <div className="p-3 rounded-lg bg-[#E8F5EC] border border-[#C9F0D5] text-xs text-[#0B5D32]">
        <strong>Rappel de cours :</strong> {current.lesson}
      </div>

      <p className="text-sm font-semibold text-[#173528]">{current.question}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {current.options.map((opt, idx) => {
          let style = 'bg-white border-[#DCE9E0] text-[#173528] hover:border-[#168447]';
          if (selected !== null) {
            if (idx === current.correct) {
              style = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold';
            } else if (idx === selected) {
              style = 'bg-rose-50 border-rose-500 text-rose-900';
            }
          }
          return (
            <button
              key={idx}
              type="button"
              disabled={selected !== null}
              onClick={() => handleChoose(idx)}
              className={`p-2.5 text-left text-xs rounded-xl border transition-all cursor-pointer ${style}`}
            >
              <span className="font-bold mr-1.5">{String.fromCharCode(65 + idx)}.</span>
              {opt}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div className="p-3 bg-white rounded-lg border border-[#DCE9E0] text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <p className="text-[#64756B]">
            <strong className="text-[#173528]">Correction :</strong> {current.explanation}
          </p>
          <button
            type="button"
            onClick={() => setSelected(null)}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-[#168447] rounded-lg hover:bg-[#0B5D32] shrink-0 cursor-pointer"
          >
            Réessayer
          </button>
        </div>
      )}
    </div>
  );
};

/* ============================================================================
   APP-002 : Formation IA Ahoret (Module + Exercice pratique IA)
   ============================================================================ */
const FormationIASimulator: React.FC = () => {
  const [moduleIdx, setModuleIdx] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);

  const modules = [
    {
      label: 'Module 1 · Prompts',
      objective: 'Obtenir un plan marketing précis pour une boutique à Abidjan.',
      question: 'Quel prompt donnera le résultat le plus exploitable avec l’IA ?',
      options: [
        '« Fais-moi du marketing. »',
        '« Agis en expert marketing digital en Côte d’Ivoire. Propose 5 actions WhatsApp et Facebook pour une boutique de mode à Cocody avec budget modéré. »',
      ],
      correct: 1,
      tip: 'Préciser le rôle, le contexte géographique, la cible et le format multiplie par 5 la pertinence de la réponse IA.',
    },
    {
      label: 'Module 2 · Automatisation',
      objective: 'Gagner du temps sur la rédaction des devis et emails clients.',
      question: 'Quelle bonne pratique adopter lors de la génération d’un devis par IA ?',
      options: [
        'Fournir un modèle structuré (prestation, délai, conditions) et relire les montants avant envoi',
        'Envoyer le texte brut sans aucune relecture',
      ],
      correct: 0,
      tip: 'L’IA accélère la rédaction à 80 %, tandis que le contrôle humain garantit l’exactitude des chiffres.',
    },
  ];

  const mod = modules[moduleIdx];

  return (
    <div className="space-y-3.5">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#DCE9E0] pb-2">
        <span className="text-xs font-bold text-[#168447] flex items-center gap-1.5">
          <Sparkles className="w-4 h-4" />
          <span>Atelier pratique · Formation IA Ahoret</span>
        </span>
        <div className="flex gap-1.5">
          {modules.map((m, i) => (
            <button
              key={m.label}
              type="button"
              onClick={() => {
                setModuleIdx(i);
                setChoice(null);
              }}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg cursor-pointer ${
                moduleIdx === i
                  ? 'bg-[#168447] text-white'
                  : 'bg-white text-[#64756B] border border-[#DCE9E0]'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-[#64756B]">
        <strong className="text-[#173528]">Objectif :</strong> {mod.objective}
      </p>
      <p className="text-xs sm:text-sm font-semibold text-[#173528]">{mod.question}</p>

      <div className="space-y-2">
        {mod.options.map((opt, idx) => {
          let cls = 'bg-white border-[#DCE9E0] text-[#173528] hover:border-[#168447]';
          if (choice !== null) {
            if (idx === mod.correct) cls = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold';
            else if (idx === choice) cls = 'bg-rose-50 border-rose-500 text-rose-900';
          }
          return (
            <button
              key={idx}
              type="button"
              disabled={choice !== null}
              onClick={() => setChoice(idx)}
              className={`w-full p-3 text-left text-xs rounded-xl border transition-all cursor-pointer ${cls}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {choice !== null && (
        <div className="p-3 bg-white rounded-lg border border-[#DCE9E0] text-xs text-[#0B5D32] flex items-center justify-between gap-2">
          <span>
            <strong>À retenir :</strong> {mod.tip}
          </span>
          <button
            type="button"
            onClick={() => setChoice(null)}
            className="px-3 py-1 bg-[#E8F5EC] rounded-lg font-semibold shrink-0 cursor-pointer"
          >
            Rejouer
          </button>
        </div>
      )}
    </div>
  );
};

/* ============================================================================
   APP-003 : Formation IA Data Base (Bac à sable SQL & IA)
   ============================================================================ */
const DataBaseIASimulator: React.FC = () => {
  const [queryKey, setQueryKey] = useState<'clients' | 'ventes' | 'attente'>('clients');
  const [executed, setExecuted] = useState(true);

  const scenarios = {
    clients: {
      prompt: '« Afficher les clients basés à Abidjan triés par nom »',
      sql: "SELECT nom, ville, telephone\nFROM clients\nWHERE ville = 'Abidjan'\nORDER BY nom ASC;",
      columns: ['Nom', 'Ville', 'Téléphone'],
      rows: [
        ['Bamba Moussa', 'Abidjan', '+225 07 12 45 89 10'],
        ['Koffi Amenan', 'Abidjan', '+225 05 44 21 09 32'],
        ['Touré Ibrahim', 'Abidjan', '+225 01 02 98 76 54'],
      ],
    },
    ventes: {
      prompt: '« Calculer le total des commandes par application »',
      sql: 'SELECT application, COUNT(*) AS nb_commandes\nFROM commandes\nGROUP BY application\nORDER BY nb_commandes DESC;',
      columns: ['Application', 'Commandes'],
      rows: [
        ['IVOIR’EDUC PRO', '14'],
        ['Ahoret Carte Event', '9'],
        ['Diplômes numériques', '7'],
      ],
    },
    attente: {
      prompt: '« Lister les dossiers en cours de vérification »',
      sql: "SELECT reference, client, statut\nFROM commandes\nWHERE statut IN ('reviewing', 'in_progress');",
      columns: ['Référence', 'Client', 'Statut'],
      rows: [
        ['UHD-2026-4812', 'Collège Saint-Paul', 'À l’étude'],
        ['UHD-2026-5104', 'ONG Espoir CI', 'En cours'],
      ],
    },
  };

  const current = scenarios[queryKey];

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#DCE9E0] pb-2">
        <span className="text-xs font-bold text-[#168447] flex items-center gap-1.5">
          <Database className="w-4 h-4" />
          <span>Simulateur SQL assisté par IA</span>
        </span>
        <button
          type="button"
          onClick={() => setExecuted(true)}
          className="px-3 py-1 text-xs font-semibold text-white bg-[#168447] hover:bg-[#0B5D32] rounded-lg flex items-center gap-1 cursor-pointer"
        >
          <Play className="w-3 h-3" />
          <span>Exécuter</span>
        </button>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {([
          { id: 'clients', label: 'Clients Abidjan' },
          { id: 'ventes', label: 'Stats par app' },
          { id: 'attente', label: 'Dossiers actifs' },
        ] as const).map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setQueryKey(item.id);
              setExecuted(true);
            }}
            className={`px-2.5 py-1 text-xs font-medium rounded-lg cursor-pointer ${
              queryKey === item.id
                ? 'bg-[#168447] text-white'
                : 'bg-white text-[#64756B] border border-[#DCE9E0]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <p className="text-[11px] text-[#64756B]">
        <strong className="text-[#173528]">Demande en langage naturel :</strong> {current.prompt}
      </p>

      <pre className="p-3 rounded-xl bg-[#173528] text-emerald-200 text-[11px] font-mono-code overflow-x-auto leading-relaxed">
        {current.sql}
      </pre>

      {executed && (
        <div className="overflow-x-auto rounded-lg border border-[#DCE9E0] bg-white">
          <table className="w-full text-left text-[11px]">
            <thead className="bg-[#F7FBF8] border-b border-[#DCE9E0] text-[#0B5D32] font-bold">
              <tr>
                {current.columns.map((c) => (
                  <th key={c} className="py-1.5 px-3">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCE9E0]">
              {current.rows.map((row, idx) => (
                <tr key={idx}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="py-1.5 px-3 text-[#173528]">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

/* ============================================================================
   APP-004 : WEB CODING (Mini Éditeur HTML/CSS en direct)
   ============================================================================ */
const WebCodingSimulator: React.FC = () => {
  const [heading, setHeading] = useState('Bienvenue sur Mon Site');
  const [btnLabel, setBtnLabel] = useState('Découvrir nos offres');
  const [themeColor, setThemeColor] = useState<'#168447' | '#EA580C' | '#1D4ED8'>('#168447');

  const htmlPreview = `<section style="background: ${themeColor}; color: white;">
  <h1>${heading || 'Titre du site'}</h1>
  <button>${btnLabel || 'Action'}</button>
</section>`;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between border-b border-[#DCE9E0] pb-2">
        <span className="text-xs font-bold text-[#168447] flex items-center gap-1.5">
          <Code2 className="w-4 h-4" />
          <span>Bac à sable HTML / CSS en direct</span>
        </span>
        <div className="flex items-center gap-1.5">
          {(['#168447', '#EA580C', '#1D4ED8'] as const).map((col) => (
            <button
              key={col}
              type="button"
              onClick={() => setThemeColor(col)}
              style={{ backgroundColor: col }}
              className={`w-5 h-5 rounded-full border-2 cursor-pointer ${
                themeColor === col ? 'border-[#173528] scale-110' : 'border-white'
              }`}
              title="Changer la couleur CSS"
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <div>
          <label className="block text-[11px] font-semibold text-[#173528] mb-1">Texte &lt;h1&gt;</label>
          <input
            type="text"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-[#DCE9E0] bg-white text-[#173528]"
          />
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-[#173528] mb-1">Texte &lt;button&gt;</label>
          <input
            type="text"
            value={btnLabel}
            onChange={(e) => setBtnLabel(e.target.value)}
            className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-[#DCE9E0] bg-white text-[#173528]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <pre className="p-3 rounded-xl bg-[#173528] text-amber-200 text-[11px] font-mono-code overflow-x-auto leading-relaxed">
          {htmlPreview}
        </pre>

        <div
          style={{ backgroundColor: themeColor }}
          className="rounded-xl p-4 text-white flex flex-col items-start justify-center gap-2.5 shadow-xs transition-colors"
        >
          <span className="text-[10px] uppercase tracking-wider opacity-80">Rendu navigateur live</span>
          <h4 className="font-heading font-bold text-base leading-snug">
            {heading || 'Titre du site'}
          </h4>
          <span className="px-3 py-1.5 rounded-lg bg-white text-[#173528] text-xs font-bold shadow-2xs">
            {btnLabel || 'Action'}
          </span>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
   APP-005 : Viewer Visual (Visionneuse multimédia interactive)
   ============================================================================ */
const ViewerVisualSimulator: React.FC<{ imageUrl?: string }> = ({ imageUrl }) => {
  const slides = [
    { title: 'Écosystème Univers Habakuk', src: imageUrl || '/assets/images/hero_digital_ecosystem_1794504391774.jpg', tag: 'Interface HD' },
    { title: 'Vitrine Multi-Applications', src: '/assets/images/digital_showcase_tiles_1794504392037.jpg', tag: 'Catalogue' },
    { title: 'Cartes QR Événements', src: '/assets/images/app_carte_event_qr_1794505832685.jpg', tag: 'Événementiel' },
  ];
  const [activeIdx, setActiveIdx] = useState(0);
  const [zoom, setZoom] = useState(100);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#DCE9E0] pb-2">
        <span className="text-xs font-bold text-[#168447]">Visionneuse haute performance</span>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setZoom((z) => Math.max(100, z - 25))}
            className="p-1.5 rounded-lg bg-white border border-[#DCE9E0] text-[#173528] cursor-pointer"
            title="Dézoomer"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-mono-code font-bold text-[#0B5D32] w-11 text-center">{zoom}%</span>
          <button
            type="button"
            onClick={() => setZoom((z) => Math.min(175, z + 25))}
            className="p-1.5 rounded-lg bg-white border border-[#DCE9E0] text-[#173528] cursor-pointer"
            title="Zoomer"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="relative h-44 rounded-xl overflow-hidden border border-[#DCE9E0] bg-[#173528]">
        <img
          src={slides[activeIdx].src}
          alt={slides[activeIdx].title}
          style={{ transform: `scale(${zoom / 100})` }}
          className="w-full h-full object-cover transition-transform duration-300"
        />
        <div className="absolute bottom-2 left-2 bg-black/70 text-white text-[11px] px-2.5 py-1 rounded-md">
          {slides[activeIdx].title} · {slides[activeIdx].tag}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {slides.map((s, idx) => (
          <button
            key={s.title}
            type="button"
            onClick={() => {
              setActiveIdx(idx);
              setZoom(100);
            }}
            className={`p-2 rounded-lg border text-left text-[11px] transition-all cursor-pointer ${
              activeIdx === idx
                ? 'bg-[#E8F5EC] border-[#168447] text-[#0B5D32] font-bold'
                : 'bg-white border-[#DCE9E0] text-[#64756B]'
            }`}
          >
            <p className="truncate">{s.title}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

/* ============================================================================
   APP-006 : Habakuk Generated Prompts
   ============================================================================ */
const PromptGeneratorSimulator: React.FC = () => {
  const [promptCategory, setPromptCategory] = useState<'business' | 'redaction' | 'education'>('business');
  const [customSubject, setCustomSubject] = useState('une PME ivoirienne');
  const [copied, setCopied] = useState(false);

  const subject = customSubject.trim() || 'votre projet';
  const promptResult =
    promptCategory === 'business'
      ? `Agis en tant qu'expert en stratégie d'entreprise en Côte d’Ivoire. Analyse les opportunités de croissance numérique pour ${subject} et propose un plan d'action concret en 5 étapes.`
      : promptCategory === 'redaction'
        ? `Rédige un message commercial chaleureux et professionnel destiné à présenter ${subject} à des clients à Abidjan, avec un appel à l'action clair sur WhatsApp.`
        : `Conçois un programme de 5 ateliers pratiques et exercices corrigés adaptés pour former efficacement des apprenants autour de ${subject}.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(promptResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-[#173528]">Objectif :</span>
        {([
          { id: 'business', label: 'Business & PME' },
          { id: 'redaction', label: 'Communication' },
          { id: 'education', label: 'Pédagogie' },
        ] as const).map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setPromptCategory(cat.id)}
            className={`px-2.5 py-1 text-xs rounded-lg transition-colors cursor-pointer ${
              promptCategory === cat.id
                ? 'bg-[#168447] text-white font-semibold'
                : 'bg-white text-[#64756B] border border-[#DCE9E0]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div>
        <label className="block text-[11px] font-semibold text-[#173528] mb-1">
          Personnalisez votre sujet :
        </label>
        <input
          type="text"
          value={customSubject}
          onChange={(e) => setCustomSubject(e.target.value)}
          placeholder="Ex : un restaurant à Cocody"
          className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#DCE9E0] bg-white text-[#173528]"
        />
      </div>

      <div className="p-3.5 bg-white rounded-xl border border-[#DCE9E0]">
        <p className="text-xs text-[#173528] leading-relaxed font-mono-code">"{promptResult}"</p>
        <button
          type="button"
          onClick={handleCopy}
          className="mt-2.5 text-[11px] text-[#168447] font-semibold flex items-center gap-1 hover:underline cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Prompt copié !' : 'Copier le prompt généré'}</span>
        </button>
      </div>
    </div>
  );
};

/* ============================================================================
   APP-007 : Digital Art Photography (Studio de filtres artistiques)
   ============================================================================ */
const DigitalArtSimulator: React.FC<{ imageUrl?: string }> = ({ imageUrl }) => {
  const [styleFilter, setStyleFilter] = useState<'original' | 'noir' | 'or' | 'cinema'>('original');

  const cssFilters = {
    original: 'none',
    noir: 'grayscale(100%) contrast(125%)',
    or: 'sepia(45%) saturate(140%) brightness(105%)',
    cinema: 'contrast(118%) saturate(125%) hue-rotate(-8deg)',
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between border-b border-[#DCE9E0] pb-2">
        <span className="text-xs font-bold text-[#168447] flex items-center gap-1.5">
          <Camera className="w-4 h-4" />
          <span>Atelier d’exposition & styles artistiques</span>
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {([
          { id: 'original', label: 'Original HD' },
          { id: 'noir', label: 'Noir & Blanc d’Art' },
          { id: 'or', label: 'Chaleur Dorée' },
          { id: 'cinema', label: 'Contraste Cinéma' },
        ] as const).map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setStyleFilter(item.id)}
            className={`px-3 py-1 text-xs rounded-lg font-medium cursor-pointer ${
              styleFilter === item.id
                ? 'bg-[#168447] text-white'
                : 'bg-white text-[#64756B] border border-[#DCE9E0]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="relative h-44 rounded-xl overflow-hidden border border-[#DCE9E0] bg-black">
        <img
          src={imageUrl || '/assets/images/hero_digital_ecosystem_1794504391774.jpg'}
          alt="Exposition Digital Art Photography"
          style={{ filter: cssFilters[styleFilter] }}
          className="w-full h-full object-cover transition-all duration-300"
        />
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2.5 py-1 rounded">
          Rendu appliqué : {styleFilter.toUpperCase()}
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
   APP-008 : Photo Retouche (Réglages en temps réel)
   ============================================================================ */
const PhotoRetoucheSimulator: React.FC<{ imageUrl?: string }> = ({ imageUrl }) => {
  const [brightness, setBrightness] = useState(105);
  const [contrast, setContrast] = useState(110);
  const [saturate, setSaturate] = useState(115);

  const resetAll = () => {
    setBrightness(100);
    setContrast(100);
    setSaturate(100);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between border-b border-[#DCE9E0] pb-2">
        <span className="text-xs font-bold text-[#168447] flex items-center gap-1.5">
          <SlidersHorizontal className="w-4 h-4" />
          <span>Retouche photo assistée en temps réel</span>
        </span>
        <button
          type="button"
          onClick={resetAll}
          className="text-[11px] font-semibold text-[#0B5D32] hover:underline cursor-pointer"
        >
          Réinitialiser
        </button>
      </div>

      <div className="relative h-40 rounded-xl overflow-hidden border border-[#DCE9E0]">
        <img
          src={imageUrl || '/assets/images/hero_digital_ecosystem_1794504391774.jpg'}
          alt="Aperçu retouche photo"
          style={{ filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturate}%)` }}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px]">
        <label className="space-y-1 block">
          <span className="flex justify-between font-semibold text-[#173528]">
            <span>Luminosité</span>
            <span className="font-mono-code text-[#168447]">{brightness}%</span>
          </span>
          <input
            type="range"
            min={60}
            max={150}
            value={brightness}
            onChange={(e) => setBrightness(Number(e.target.value))}
            className="w-full accent-[#168447]"
          />
        </label>
        <label className="space-y-1 block">
          <span className="flex justify-between font-semibold text-[#173528]">
            <span>Contraste</span>
            <span className="font-mono-code text-[#168447]">{contrast}%</span>
          </span>
          <input
            type="range"
            min={60}
            max={160}
            value={contrast}
            onChange={(e) => setContrast(Number(e.target.value))}
            className="w-full accent-[#168447]"
          />
        </label>
        <label className="space-y-1 block">
          <span className="flex justify-between font-semibold text-[#173528]">
            <span>Couleurs</span>
            <span className="font-mono-code text-[#168447]">{saturate}%</span>
          </span>
          <input
            type="range"
            min={0}
            max={180}
            value={saturate}
            onChange={(e) => setSaturate(Number(e.target.value))}
            className="w-full accent-[#168447]"
          />
        </label>
      </div>
    </div>
  );
};

/* ============================================================================
   APP-009 : Ahoret Carte Event (Invitation QR + Scan Live)
   ============================================================================ */
const CarteEventSimulator: React.FC = () => {
  const [guestName, setGuestName] = useState('M. Kouadio Serge');
  const [tableName, setTableName] = useState('Table VIP 03');
  const [scanCount, setScanCount] = useState(0);

  const qrCells = Array.from({ length: 25 }, (_, i) => {
    const seed = (guestName.length * 7 + tableName.length * 3 + i * 13) % 5;
    return i < 5 || i % 5 === 0 || seed < 2;
  });

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between border-b border-[#DCE9E0] pb-2">
        <span className="text-xs font-bold text-[#168447] flex items-center gap-1.5">
          <QrCode className="w-4 h-4" />
          <span>Créateur de carte QR & Simulation d’entrée</span>
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <div>
          <label className="block text-[11px] font-semibold text-[#173528] mb-1">Nom de l’invité</label>
          <input
            type="text"
            value={guestName}
            onChange={(e) => {
              setGuestName(e.target.value);
              setScanCount(0);
            }}
            className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-[#DCE9E0] bg-white text-[#173528]"
          />
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-[#173528] mb-1">Place / Table</label>
          <input
            type="text"
            value={tableName}
            onChange={(e) => {
              setTableName(e.target.value);
              setScanCount(0);
            }}
            className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-[#DCE9E0] bg-white text-[#173528]"
          />
        </div>
      </div>

      <div className="p-4 rounded-xl bg-white border border-[#DCE9E0] flex items-center justify-between gap-4">
        <div className="space-y-1 min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#168447]">
            Invitation Officielle · Gala Abidjan
          </p>
          <p className="font-heading font-bold text-sm text-[#173528] truncate">
            {guestName || 'Invité d’honneur'}
          </p>
          <p className="text-xs text-[#64756B]">{tableName || 'Accès Standard'}</p>
        </div>

        <div className="grid grid-cols-5 gap-0.5 p-2 rounded-lg border border-[#DCE9E0] bg-white shrink-0">
          {qrCells.map((filled, idx) => (
            <span
              key={idx}
              className={`w-2.5 h-2.5 rounded-[1px] ${filled ? 'bg-[#173528]' : 'bg-transparent'}`}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => setScanCount((c) => c + 1)}
          className="px-3.5 py-2 text-xs font-semibold text-white bg-[#168447] hover:bg-[#0B5D32] rounded-lg flex items-center gap-1.5 cursor-pointer"
        >
          <ScanLine className="w-3.5 h-3.5" />
          <span>Simuler le scan à l’entrée</span>
        </button>

        <span className="text-xs font-medium">
          {scanCount === 0 && <span className="text-[#64756B]">En attente de contrôle</span>}
          {scanCount === 1 && <span className="text-emerald-700 font-bold">✓ Entrée validée (1/1)</span>}
          {scanCount > 1 && <span className="text-amber-700 font-bold">⚠ QR déjà scanné ({scanCount}x) — doublon bloqué</span>}
        </span>
      </div>
    </div>
  );
};

/* ============================================================================
   APP-010 : CV & MOTIVATION PRO (Éditeur interactif CV + Lettre)
   ============================================================================ */
const CvMotivationSimulator: React.FC = () => {
  const [mode, setMode] = useState<'cv' | 'lettre'>('cv');
  const [fullName, setFullName] = useState('KOUADIO JEAN-MARC');
  const [jobTitle, setJobTitle] = useState('Responsable Logistique');

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#DCE9E0] pb-2">
        <span className="text-xs font-semibold text-[#168447] flex items-center gap-1.5">
          <FileText className="w-4 h-4" />
          <span>Éditeur interactif CV & Lettre</span>
        </span>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => setMode('cv')}
            className={`px-2.5 py-1 text-xs rounded-lg font-medium cursor-pointer ${
              mode === 'cv' ? 'bg-[#168447] text-white' : 'bg-white text-[#64756B] border border-[#DCE9E0]'
            }`}
          >
            Aperçu CV
          </button>
          <button
            type="button"
            onClick={() => setMode('lettre')}
            className={`px-2.5 py-1 text-xs rounded-lg font-medium cursor-pointer ${
              mode === 'lettre' ? 'bg-[#168447] text-white' : 'bg-white text-[#64756B] border border-[#DCE9E0]'
            }`}
          >
            Lettre de motivation
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Nom complet"
          className="px-2.5 py-1.5 text-xs rounded-lg border border-[#DCE9E0] bg-white text-[#173528]"
        />
        <input
          type="text"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          placeholder="Poste visé"
          className="px-2.5 py-1.5 text-xs rounded-lg border border-[#DCE9E0] bg-white text-[#173528]"
        />
      </div>

      {mode === 'cv' ? (
        <div className="p-4 bg-white rounded-lg border border-[#DCE9E0] space-y-2 text-xs">
          <div className="border-b border-[#DCE9E0] pb-2">
            <h4 className="font-heading font-bold text-sm text-[#173528]">{fullName || 'VOTRE NOM'}</h4>
            <p className="text-[11px] text-[#168447] font-medium">{jobTitle || 'Poste visé'} · Abidjan</p>
          </div>
          <p className="text-[#64756B] text-[11px] leading-relaxed">
            Professionnel engagé en {jobTitle || 'gestion de projets'}, doté d’une solide maîtrise opérationnelle et du sens des résultats en Côte d’Ivoire.
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="px-2 py-0.5 bg-[#E8F5EC] text-[#0B5D32] rounded text-[10px] font-medium">Organisation</span>
            <span className="px-2 py-0.5 bg-[#E8F5EC] text-[#0B5D32] rounded text-[10px] font-medium">Outils numériques</span>
            <span className="px-2 py-0.5 bg-[#E8F5EC] text-[#0B5D32] rounded text-[10px] font-medium">Leadership</span>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-white rounded-lg border border-[#DCE9E0] text-xs text-[#64756B] leading-relaxed space-y-2">
          <p className="font-semibold text-[#173528]">Objet : Candidature au poste de {jobTitle || 'Collaborateur'}</p>
          <p>
            Madame, Monsieur, fort de mon parcours professionnel, je souhaite mettre mon expertise au service de votre entreprise en qualité de {jobTitle || 'spécialiste'}.
          </p>
          <p className="font-semibold text-[#0B5D32]">— {fullName || 'Candidat'}</p>
        </div>
      )}
    </div>
  );
};

/* ============================================================================
   APP-011 : Diplômes numériques (Studio interactif)
   ============================================================================ */
const DiplomaSimulator: React.FC = () => {
  const [diplomaStyle, setDiplomaStyle] = useState<'formation' | 'honneur' | 'academique'>('formation');
  const [diplomaRecipient, setDiplomaRecipient] = useState<string>('Konan Ahoua Jean');
  const [mention, setMention] = useState<'Très Bien' | 'Bien' | 'Félicitations'>('Très Bien');

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-heading font-bold text-sm text-[#173528] flex items-center gap-1.5">
          <Award className="w-4 h-4 text-[#168447]" />
          <span>Studio interactif de diplômes personnalisés</span>
        </h3>
        <p className="text-xs text-[#64756B]">Testez le modèle, la mention et le bénéficiaire en direct</p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {([
          { id: 'formation', label: 'Certificat de formation' },
          { id: 'honneur', label: 'Diplôme d’honneur' },
          { id: 'academique', label: 'Diplôme académique' },
        ] as const).map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setDiplomaStyle(item.id)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              diplomaStyle === item.id
                ? 'bg-[#168447] text-white'
                : 'bg-white text-[#64756B] border border-[#DCE9E0] hover:text-[#173528]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <div>
          <label className="block text-[11px] font-semibold text-[#173528] mb-1">Nom du bénéficiaire</label>
          <input
            type="text"
            value={diplomaRecipient}
            onChange={(e) => setDiplomaRecipient(e.target.value)}
            placeholder="Ex : Konan Ahoua Jean"
            className="w-full px-3 py-2 text-xs rounded-lg border border-[#DCE9E0] bg-white text-[#173528]"
          />
        </div>
        <div>
          <label className="block text-[11px] font-semibold text-[#173528] mb-1">Mention décernée</label>
          <select
            value={mention}
            onChange={(e) => setMention(e.target.value as 'Très Bien' | 'Bien' | 'Félicitations')}
            className="w-full px-3 py-2 text-xs rounded-lg border border-[#DCE9E0] bg-white text-[#173528]"
          >
            <option value="Très Bien">Mention Très Bien</option>
            <option value="Bien">Mention Bien</option>
            <option value="Félicitations">Avec Félicitations du Jury</option>
          </select>
        </div>
      </div>

      <div className="rounded-xl border-2 border-[#0B5D32]/30 bg-white p-4 sm:p-5 shadow-2xs text-center space-y-2 relative overflow-hidden">
        <div className="text-[10px] font-bold uppercase tracking-widest text-[#168447]">
          Univers Habakuk Digital Pro · Authentifié QR
        </div>
        <h4 className="font-heading text-base font-extrabold text-[#173528]">
          {diplomaStyle === 'formation'
            ? 'CERTIFICAT DE RÉUSSITE'
            : diplomaStyle === 'honneur'
              ? 'DIPLÔME D’HONNEUR & MÉRITE'
              : 'DIPLÔME OFFICIEL DE FIN D’ÉTUDES'}
        </h4>
        <p className="text-[11px] text-[#64756B]">Décerné avec {mention} à</p>
        <p className="font-heading text-lg font-bold text-[#0B5D32] border-b border-dashed border-[#DCE9E0] pb-1.5 inline-block px-4">
          {diplomaRecipient.trim() || 'Nom du Lauréat'}
        </p>
        <div className="flex items-center justify-between pt-2 text-[10px] text-[#64756B]">
          <span>Sceau officiel & Signature</span>
          <span className="font-mono-code font-semibold text-[#0B5D32] bg-[#E8F5EC] px-2 py-0.5 rounded">
            ID #DIP-2026-CI
          </span>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
   APP-012 : Calendrier numérique (Configurateur cliquable)
   ============================================================================ */
const CalendarSimulator: React.FC = () => {
  const [calendarType, setCalendarType] = useState<'entreprise' | 'scolaire' | 'eglise' | 'personnel'>('entreprise');
  const [calendarAccent, setCalendarAccent] = useState<'emerald' | 'amber' | 'slate'>('emerald');
  const [customDays, setCustomDays] = useState<number[]>([4, 15, 22, 28]);

  const calendarPresets = {
    entreprise: {
      title: 'Calendrier Corporate 2026',
      subtitle: 'Logo société · Réunions trimestrielles · Jours fériés CI',
      highlights: [4, 15, 22, 28],
    },
    scolaire: {
      title: 'Calendrier Académique 2026-2027',
      subtitle: 'Rentrées · Examens blancs · Congés scolaires',
      highlights: [2, 11, 19, 26],
    },
    eglise: {
      title: 'Calendrier Cultuel & Événements',
      subtitle: 'Séminaires · Veillées · Temps forts communautaires',
      highlights: [7, 14, 21, 29],
    },
    personnel: {
      title: 'Calendrier Photo & Famille',
      subtitle: 'Anniversaires · Souvenirs illustrés · Citations',
      highlights: [5, 12, 18, 25],
    },
  };

  const toggleDay = (day: number) => {
    setCustomDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="font-heading font-bold text-sm text-[#173528] flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-[#168447]" />
            <span>Configurateur de calendrier personnalisé</span>
          </h3>
          <p className="text-xs text-[#64756B]">Cliquez sur un jour du calendrier pour marquer un événement</p>
        </div>
        <div className="flex items-center gap-1.5">
          {(['emerald', 'amber', 'slate'] as const).map((accent) => (
            <button
              key={accent}
              type="button"
              onClick={() => setCalendarAccent(accent)}
              className={`w-5 h-5 rounded-full border-2 transition-transform cursor-pointer ${
                accent === 'emerald'
                  ? 'bg-[#168447]'
                  : accent === 'amber'
                    ? 'bg-amber-600'
                    : 'bg-slate-800'
              } ${calendarAccent === accent ? 'border-[#173528] scale-110' : 'border-white'}`}
              title="Changer le thème couleur"
            />
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {([
          { id: 'entreprise', label: 'Entreprise' },
          { id: 'scolaire', label: 'Scolaire' },
          { id: 'eglise', label: 'Église & Culte' },
          { id: 'personnel', label: 'Photo & Famille' },
        ] as const).map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setCalendarType(item.id);
              setCustomDays(calendarPresets[item.id].highlights);
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              calendarType === item.id
                ? 'bg-[#168447] text-white'
                : 'bg-white text-[#64756B] border border-[#DCE9E0] hover:text-[#173528]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-white border border-[#DCE9E0] overflow-hidden shadow-2xs">
        <div
          className={`px-4 py-2.5 text-white flex items-center justify-between ${
            calendarAccent === 'emerald'
              ? 'bg-[#168447]'
              : calendarAccent === 'amber'
                ? 'bg-amber-600'
                : 'bg-slate-800'
          }`}
        >
          <div>
            <p className="text-xs font-bold">{calendarPresets[calendarType].title}</p>
            <p className="text-[10px] opacity-90">{calendarPresets[calendarType].subtitle}</p>
          </div>
          <span className="text-[10px] font-mono-code font-semibold bg-white/20 px-2 py-0.5 rounded">
            NOV. 2026
          </span>
        </div>

        <div className="p-3">
          <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-[#64756B] mb-1.5">
            {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, idx) => (
              <span key={idx}>{d}</span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-[11px]">
            {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
              const isHighlighted = customDays.includes(day);
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={`py-1 rounded font-medium cursor-pointer transition-colors ${
                    isHighlighted
                      ? calendarAccent === 'emerald'
                        ? 'bg-[#E8F5EC] text-[#0B5D32] font-bold border border-[#C9F0D5]'
                        : calendarAccent === 'amber'
                          ? 'bg-amber-50 text-amber-900 font-bold border border-amber-200'
                          : 'bg-slate-100 text-slate-900 font-bold border border-slate-300'
                      : 'text-[#173528] hover:bg-[#F7FBF8]'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================================
   APP-013 : QUESTIONS POUR UN CHRÉTIEN
   ============================================================================ */
const QuizChretienSimulator: React.FC = () => {
  const [quizQuestionIndex, setQuizQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);

  const sampleBiblicalQuestions = [
    {
      round: 'Manche 1 : 4 À LA SUITE',
      question:
        "Quel prophète de l'Ancien Testament a écrit : 'Car c’est une prophétie dont le temps est déjà fixé, elle marche vers son terme...' ?",
      options: ['Ésaïe', 'Habakuk', 'Jérémie', 'Daniel'],
      correct: 1,
      explanation: "C'est le prophète Habakuk (Habakuk 2:3), inspirateur du nom Univers Habakuk !",
    },
    {
      round: 'Manche 2 : 9 À LA SUITE',
      question:
        "Dans quel livre et chapitre de la Bible trouve-t-on le célèbre passage sur l'amour : 'L'amour est patient, il est plein de bonté...' ?",
      options: ['1 Corinthiens 13', 'Romains 8', 'Galates 5', 'Psaume 23'],
      correct: 0,
      explanation: "1 Corinthiens 13, souvent appelé le cantique de l'amour chrétien rédigé par l'apôtre Paul.",
    },
    {
      round: 'Manche 3 : LE CHOC FINAL',
      question:
        "Combien de jours et de nuits Noé et sa famille sont-ils restés dans l'arche avant que les eaux ne commencent à baisser ?",
      options: ['7 jours', '40 jours et 40 nuits', '150 jours', '120 jours'],
      correct: 1,
      explanation: 'Il plut 40 jours et 40 nuits sur la terre (Genèse 7:12).',
    },
  ];

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    if (index === sampleBiblicalQuestions[quizQuestionIndex].correct) {
      setQuizScore((prev) => prev + 1);
    }
  };

  const handleNextQuiz = () => {
    setSelectedAnswer(null);
    setQuizQuestionIndex((prev) => (prev + 1) % sampleBiblicalQuestions.length);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-[#DCE9E0] pb-2">
        <span className="text-xs font-bold text-[#168447] uppercase tracking-wide">
          {sampleBiblicalQuestions[quizQuestionIndex].round}
        </span>
        <span className="text-xs text-[#64756B] font-mono-code">
          Score : <strong className="text-[#173528]">{quizScore} pts</strong>
        </span>
      </div>

      <p className="text-sm font-semibold text-[#173528]">
        {sampleBiblicalQuestions[quizQuestionIndex].question}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {sampleBiblicalQuestions[quizQuestionIndex].options.map((opt, idx) => {
          const isSelected = selectedAnswer === idx;
          const isCorrect = idx === sampleBiblicalQuestions[quizQuestionIndex].correct;
          let btnStyle = 'bg-white border-[#DCE9E0] text-[#173528] hover:border-[#168447]';
          if (selectedAnswer !== null) {
            if (isCorrect) {
              btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold';
            } else if (isSelected) {
              btnStyle = 'bg-rose-50 border-rose-500 text-rose-900';
            }
          }
          return (
            <button
              key={idx}
              type="button"
              disabled={selectedAnswer !== null}
              onClick={() => handleAnswerSelect(idx)}
              className={`p-3 text-left text-xs rounded-xl border transition-all cursor-pointer ${btnStyle}`}
            >
              <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>
              {opt}
            </button>
          );
        })}
      </div>

      {selectedAnswer !== null && (
        <div className="p-3 bg-white rounded-lg border border-[#DCE9E0] text-xs space-y-2">
          <p className="text-[#64756B]">
            <strong>Explication :</strong> {sampleBiblicalQuestions[quizQuestionIndex].explanation}
          </p>
          <button
            type="button"
            onClick={handleNextQuiz}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-[#168447] rounded-lg hover:bg-[#0B5D32] transition-colors cursor-pointer"
          >
            Question suivante →
          </button>
        </div>
      )}
    </div>
  );
};

/* ============================================================================
   APP-014 : AHORET GAMES – L'UNIVERS AHORET KINDS (Mini-jeu Memory)
   ============================================================================ */
const AhoretGamesSimulator: React.FC = () => {
  const initialDeck = ['spark', 'globe', 'award', 'game', 'globe', 'game', 'spark', 'award'] as const;
  type CardKey = (typeof initialDeck)[number];
  const [deck, setDeck] = useState<CardKey[]>([...initialDeck]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  const renderSymbol = (key: CardKey) => {
    switch (key) {
      case 'spark':
        return <Sparkles className="w-5 h-5 text-amber-500" />;
      case 'globe':
        return <Globe className="w-5 h-5 text-blue-600" />;
      case 'award':
        return <Award className="w-5 h-5 text-emerald-600" />;
      case 'game':
        return <Trophy className="w-5 h-5 text-rose-500" />;
    }
  };

  const handleCardClick = (idx: number) => {
    if (flipped.length === 2 || flipped.includes(idx) || matched.includes(idx)) return;
    const nextFlipped = [...flipped, idx];
    setFlipped(nextFlipped);

    if (nextFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = nextFlipped;
      if (deck[a] === deck[b]) {
        setMatched((prev) => [...prev, a, b]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 650);
      }
    }
  };

  const resetGame = () => {
    const shuffled = [...initialDeck].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between border-b border-[#DCE9E0] pb-2">
        <span className="text-xs font-bold text-[#168447] flex items-center gap-1.5">
          <Gamepad2 className="w-4 h-4" />
          <span>Mini-jeu Mémoire · Ahoret Kinds</span>
        </span>
        <div className="flex items-center gap-3 text-xs">
          <span className="font-mono-code text-[#64756B]">
            Coups : <strong className="text-[#173528]">{moves}</strong>
          </span>
          <button
            type="button"
            onClick={resetGame}
            className="text-[#168447] font-semibold flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Rejouer</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {deck.map((symbol, idx) => {
          const isVisible = flipped.includes(idx) || matched.includes(idx);
          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleCardClick(idx)}
              className={`h-14 rounded-xl border text-base font-bold transition-all cursor-pointer flex items-center justify-center ${
                matched.includes(idx)
                  ? 'bg-emerald-50 border-emerald-500'
                  : isVisible
                    ? 'bg-white border-[#168447]'
                    : 'bg-[#168447] border-[#0B5D32] text-white hover:bg-[#0B5D32]'
              }`}
            >
              {isVisible ? renderSymbol(symbol) : '?'}
            </button>
          );
        })}
      </div>

      {matched.length === deck.length && (
        <p className="text-xs font-bold text-emerald-700 text-center">
          Bravo ! Toutes les paires trouvées en {moves} coups !
        </p>
      )}
    </div>
  );
};

/* ============================================================================
   APP-015 : LE MILLIONNAIRE QUIZ (Culture générale + Paliers + Joker 50:50)
   ============================================================================ */
const MillionnaireQuizSimulator: React.FC = () => {
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [hiddenIndices, setHiddenIndices] = useState<number[]>([]);
  const [jokerUsed, setJokerUsed] = useState(false);

  const questions = [
    {
      level: 'Palier 1 · 100 000 FCFA',
      question: 'Quelle ville est la capitale politique et administrative de la Côte d’Ivoire ?',
      options: ['Abidjan', 'Yamoussoukro', 'Bouaké', 'San-Pédro'],
      correct: 1,
      explanation: 'Yamoussoukro est la capitale politique officielle depuis 1983.',
    },
    {
      level: 'Palier 2 · 500 000 FCFA',
      question: 'Quel fleuve est le plus long traversant la Côte d’Ivoire du nord au sud ?',
      options: ['Le Bandama', 'La Comoé', 'Le Sassandra', 'Le Cavally'],
      correct: 0,
      explanation: 'Le fleuve Bandama s’étend sur environ 1 050 km entièrement en territoire ivoirien.',
    },
    {
      level: 'Palier 3 · 1 000 000 FCFA',
      question: 'En quelle année la Côte d’Ivoire a-t-elle remporté sa troisième Coupe d’Afrique des Nations (CAN) ?',
      options: ['2015', '2021', '2024', '1992'],
      correct: 2,
      explanation: 'Les Éléphants ont remporté leur 3e CAN à domicile en février 2024 (édition 2023).',
    },
  ];

  const current = questions[qIdx];

  const activate5050 = () => {
    if (jokerUsed || selected !== null) return;
    const wrong = [0, 1, 2, 3].filter((i) => i !== current.correct).slice(0, 2);
    setHiddenIndices(wrong);
    setJokerUsed(true);
  };

  return (
    <div className="space-y-3.5">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#DCE9E0] pb-2">
        <span className="text-xs font-bold text-[#168447] flex items-center gap-1.5">
          <Trophy className="w-4 h-4" />
          <span>{current.level}</span>
        </span>
        <button
          type="button"
          disabled={jokerUsed || selected !== null}
          onClick={activate5050}
          className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border cursor-pointer ${
            jokerUsed
              ? 'bg-gray-100 text-gray-400 border-gray-200'
              : 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
          }`}
        >
          {jokerUsed ? 'Joker 50:50 utilisé' : 'Utiliser Joker 50:50'}
        </button>
      </div>

      <p className="text-sm font-semibold text-[#173528]">{current.question}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {current.options.map((opt, idx) => {
          const isHidden = hiddenIndices.includes(idx);
          let cls = 'bg-white border-[#DCE9E0] text-[#173528] hover:border-[#168447]';
          if (selected !== null) {
            if (idx === current.correct) cls = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold';
            else if (idx === selected) cls = 'bg-rose-50 border-rose-500 text-rose-900';
          }
          return (
            <button
              key={idx}
              type="button"
              disabled={selected !== null || isHidden}
              onClick={() => setSelected(idx)}
              className={`p-2.5 text-left text-xs rounded-xl border transition-all cursor-pointer ${
                isHidden ? 'opacity-25 bg-gray-100' : cls
              }`}
            >
              <span className="font-bold mr-1.5">{String.fromCharCode(65 + idx)}.</span>
              {opt}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div className="p-3 bg-white rounded-lg border border-[#DCE9E0] text-xs space-y-2">
          <p className="text-[#64756B]">
            <strong>Réponse :</strong> {current.explanation}
          </p>
          <button
            type="button"
            onClick={() => {
              setSelected(null);
              setHiddenIndices([]);
              setQIdx((prev) => (prev + 1) % questions.length);
            }}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-[#168447] rounded-lg hover:bg-[#0B5D32] cursor-pointer"
          >
            Palier suivant →
          </button>
        </div>
      )}
    </div>
  );
};

/* ============================================================================
   APP-016 : Ivoir'Cuisine Pro (Recettes interactives + portions)
   ============================================================================ */
const IvoirCuisineSimulator: React.FC = () => {
  const [recipeKey, setRecipeKey] = useState<'graine' | 'kedjenou' | 'garba'>('graine');
  const [servings, setServings] = useState<number>(4);

  const recipes = {
    graine: {
      title: 'Sauce Graine & Foutou Banane',
      time: '1h45',
      ingredients: [
        { name: 'Noix de palme fraîches', baseQty: 250, unit: 'g' },
        { name: 'Poisson fumé (mâchoiron)', baseQty: 150, unit: 'g' },
        { name: 'Bananes plantains mûres', baseQty: 2, unit: 'pièces' },
      ],
      tip: 'Laisser mijoter à feu doux jusqu’à ce que l’huile rouge remonte délicatement en surface.',
    },
    kedjenou: {
      title: 'Kedjenou de Poulet Africain',
      time: '1h10',
      ingredients: [
        { name: 'Poulet bicyclette découpé', baseQty: 300, unit: 'g' },
        { name: 'Tomates & oignons frais', baseQty: 1, unit: 'pièce(s)' },
        { name: 'Aubergines africaines', baseQty: 1, unit: 'pièce(s)' },
      ],
      tip: 'Cuire à l’étouffée sans ajouter d’eau pour concentrer tous les arômes naturels.',
    },
    garba: {
      title: 'Garba Authentique d’Abidjan',
      time: '30 min',
      ingredients: [
        { name: 'Attiéké frais de qualité', baseQty: 200, unit: 'g' },
        { name: 'Thon frit croustillant', baseQty: 180, unit: 'g' },
        { name: 'Tomates, oignons & piment frais', baseQty: 1, unit: 'portion(s)' },
      ],
      tip: 'Servir immédiatement avec le thon bien chaud et un filet d’huile de friture parfumée.',
    },
  };

  const current = recipes[recipeKey];
  const factor = servings / 2;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#DCE9E0] pb-2">
        <span className="text-xs font-bold text-[#168447] flex items-center gap-1.5">
          <UtensilsCrossed className="w-4 h-4" />
          <span>{current.title} · {current.time}</span>
        </span>
        <div className="flex items-center gap-1.5 text-xs">
          <Users className="w-3.5 h-3.5 text-[#168447]" />
          {[2, 4, 8].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setServings(n)}
              className={`px-2 py-0.5 rounded font-mono-code font-semibold cursor-pointer ${
                servings === n ? 'bg-[#168447] text-white' : 'bg-white border border-[#DCE9E0] text-[#173528]'
              }`}
            >
              {n} pers.
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {([
          { id: 'graine', label: 'Sauce Graine' },
          { id: 'kedjenou', label: 'Kedjenou Poulet' },
          { id: 'garba', label: 'Garba' },
        ] as const).map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => setRecipeKey(r.id)}
            className={`px-3 py-1 text-xs rounded-lg font-medium cursor-pointer ${
              recipeKey === r.id
                ? 'bg-[#168447] text-white'
                : 'bg-white text-[#64756B] border border-[#DCE9E0]'
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      <div className="p-3.5 bg-white rounded-xl border border-[#DCE9E0] space-y-2 text-xs">
        <p className="font-bold text-[#173528]">Ingrédients calculés pour {servings} personnes :</p>
        <ul className="space-y-1 text-[#64756B]">
          {current.ingredients.map((ing) => (
            <li key={ing.name} className="flex justify-between">
              <span>{ing.name}</span>
              <strong className="text-[#0B5D32] font-mono-code">
                {Math.round(ing.baseQty * factor)} {ing.unit}
              </strong>
            </li>
          ))}
        </ul>
        <p className="text-[11px] text-[#64756B] pt-1 border-t border-[#DCE9E0]">
          <strong className="text-[#173528]">Astuce du chef :</strong> {current.tip}
        </p>
      </div>
    </div>
  );
};

/* ============================================================================
   APP-017 : Conception de site web (Configurateur live)
   ============================================================================ */
const WebDesignerSimulator: React.FC = () => {
  const [webSiteType, setWebSiteType] = useState<'vitrine' | 'ecommerce' | 'portail'>('vitrine');
  const [brandName, setBrandName] = useState('Mon Entreprise CI');

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-heading font-bold text-sm text-[#173528] flex items-center gap-1.5">
          <Globe className="w-4 h-4 text-[#168447]" />
          <span>Configurateur de site web personnalisé</span>
        </h3>
        <p className="text-xs text-[#64756B]">Testez le nom de votre marque et l’architecture web</p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {([
          { id: 'vitrine', label: 'Site Vitrine Pro' },
          { id: 'ecommerce', label: 'Boutique E-commerce' },
          { id: 'portail', label: 'Portail & Application Web' },
        ] as const).map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setWebSiteType(item.id)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              webSiteType === item.id
                ? 'bg-[#168447] text-white'
                : 'bg-white text-[#64756B] border border-[#DCE9E0] hover:text-[#173528]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <input
        type="text"
        value={brandName}
        onChange={(e) => setBrandName(e.target.value)}
        placeholder="Nom de votre entreprise ou boutique"
        className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#DCE9E0] bg-white text-[#173528]"
      />

      <div className="rounded-xl bg-white border border-[#DCE9E0] overflow-hidden shadow-2xs">
        <div className="px-3 py-2 bg-[#F7FBF8] border-b border-[#DCE9E0] flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-400" />
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>
          <span className="text-[10px] font-mono-code text-[#64756B]">
            https://{(brandName || 'mon-site').toLowerCase().replace(/[^a-z0-9]/g, '') || 'mon-site'}.ci
          </span>
        </div>
        <div className="p-4 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold text-[#0B5D32]">
              {brandName || 'Votre Marque'} —{' '}
              {webSiteType === 'vitrine'
                ? 'Vitrine & Prise de rendez-vous'
                : webSiteType === 'ecommerce'
                  ? 'Boutique & Panier en ligne'
                  : 'Portail & Espace Membre'}
            </span>
            <span className="text-[10px] font-semibold bg-[#E8F5EC] text-[#0B5D32] px-2 py-0.5 rounded shrink-0">
              100% Responsive
            </span>
          </div>
          <p className="text-[11px] text-[#64756B] leading-relaxed">
            {webSiteType === 'vitrine'
              ? 'Idéal pour entreprises, cabinets, écoles et ONG souhaitant présenter leurs services avec formulaire et WhatsApp.'
              : webSiteType === 'ecommerce'
                ? 'Vendez vos articles 24h/24 avec catalogue, panier et suivi des commandes adapté à la Côte d’Ivoire.'
                : 'Plateforme web sur mesure avec espace membre sécurisé, gestion des utilisateurs et base de données.'}
          </p>
        </div>
      </div>
    </div>
  );
};
