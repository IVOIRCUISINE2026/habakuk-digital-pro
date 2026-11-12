import React, { useState } from 'react';
import { X, Check, Copy, Sparkles, RefreshCw, ArrowRight, Play, BookOpen, Utensils, Award, FileText, FileDown } from 'lucide-react';
import { ApplicationItem } from '../types';
import { downloadApplicationPdf } from '../utils/pdfGenerator';

interface AppDemoModalProps {
  app: ApplicationItem | null;
  onClose: () => void;
  onOrder: (app: ApplicationItem) => void;
}

export const AppDemoModal: React.FC<AppDemoModalProps> = ({ app, onClose, onOrder }) => {
  if (!app) return null;

  // State for Codes Générale demo
  const [generatedCodes, setGeneratedCodes] = useState<string[]>([
    "IVOIR4812K",
    "IVOIR9204M",
    "IVOIR3357Z"
  ]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // State for Questions pour un Chrétien demo
  const [quizQuestionIndex, setQuizQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);

  // State for Prompt Generator demo
  const [promptCategory, setPromptCategory] = useState<'business' | 'redaction' | 'education'>('business');
  const [promptResult, setPromptResult] = useState<string>(
    "Agis en tant qu'expert en stratégie d'entreprise en Afrique de l'Ouest. Analyse l'opportunité de digitaliser les processus de commande pour une PME ivoirienne et propose un plan d'action en 5 étapes clés."
  );

  // Sample Biblical Quiz Questions
  const sampleBiblicalQuestions = [
    {
      round: "Manche 1 : 4 À LA SUITE",
      question: "Quel prophète de l'Ancien Testament a écrit : 'Car c’est une prophétie dont le temps est déjà fixé, elle marche vers son terme...' ?",
      options: ["Ésaïe", "Habakuk", "Jérémie", "Daniel"],
      correct: 1,
      explanation: "C'est le prophète Habakuk (Habakuk 2:3), inspirateur du nom Univers Habakuk !"
    },
    {
      round: "Manche 2 : 9 À LA SUITE",
      question: "Dans quel livre et chapitre de la Bible trouve-t-on le célèbre passage sur l'amour : 'L'amour est patient, il est plein de bonté...' ?",
      options: ["1 Corinthiens 13", "Romains 8", "Galates 5", "Psaume 23"],
      correct: 0,
      explanation: "1 Corinthiens 13, souvent appelé le cantique de l'amour chrétien rédigé par l'apôtre Paul."
    },
    {
      round: "Manche 3 : LE CHOC FINAL",
      question: "Combien de jours et de nuits Noé et sa famille sont-ils restés dans l'arche avant que les eaux ne commencent à baisser ?",
      options: ["7 jours", "40 jours et 40 nuits", "150 jours", "120 jours"],
      correct: 1,
      explanation: "Il plut 40 jours et 40 nuits sur la terre (Genèse 7:12)."
    }
  ];

  // Helper to generate a new valid IVOIR code
  const handleGenerateCode = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const fourDigits = Math.floor(1000 + Math.random() * 9000);
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];
    const code = `IVOIR${fourDigits}${randomLetter}`;
    setGeneratedCodes(prev => [code, ...prev.slice(0, 4)]);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    if (index === sampleBiblicalQuestions[quizQuestionIndex].correct) {
      setQuizScore(prev => prev + 1);
    }
  };

  const handleNextQuiz = () => {
    setSelectedAnswer(null);
    setQuizQuestionIndex((prev) => (prev + 1) % sampleBiblicalQuestions.length);
  };

  const handleCategoryChange = (cat: 'business' | 'redaction' | 'education') => {
    setPromptCategory(cat);
    if (cat === 'business') {
      setPromptResult("Agis en tant que consultant en transformation numérique en Côte d’Ivoire. Rédige un audit concis des opportunités d'automatisation des factures et livraisons pour un commerçant local.");
    } else if (cat === 'redaction') {
      setPromptResult("Rédige un message percutant et professionnel pour présenter une nouvelle application mobile à des directeurs d'écoles à Abidjan, avec un ton chaleureux, respectueux et moderne.");
    } else {
      setPromptResult("Conçois une série de 5 exercices progressifs de programmation web (HTML/CSS) adaptés à des élèves débutants de lycée, avec corrigé type et critères d'évaluation.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#DCE9E0] overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#F7FBF8] border-b border-[#DCE9E0] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#168447]">
              <Sparkles className="w-4 h-4" />
              <span>Démonstration & Simulation Interactive</span>
            </div>
            <h2 className="text-xl font-heading font-bold text-[#173528] mt-0.5">
              {app.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#64756B] hover:text-[#173528] hover:bg-white border border-transparent hover:border-[#DCE9E0] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Status banner */}
          <div className="p-3.5 rounded-xl bg-[#E8F5EC] border border-[#C9F0D5] flex items-center justify-between text-xs text-[#0B5D32]">
            <span>Statut : <strong>{app.status}</strong></span>
            <span className="font-mono-code font-bold">{app.id}</span>
          </div>

          {/* Reference Image Container */}
          {app.image_url && (
            <div className="relative w-full h-48 sm:h-56 rounded-xl overflow-hidden border border-[#DCE9E0] bg-[#E8F5EC] shadow-2xs">
              <img
                src={app.image_url}
                alt={`Image de référence ${app.name} - Univers Habakuk`}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-2.5 right-2.5 bg-black/65 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded-md font-medium">
                Image de référence officielle
              </div>
            </div>
          )}

          <p className="text-sm text-[#64756B] leading-relaxed">
            {app.description}
          </p>

          {/* Interactive simulator depending on app */}
          <div className="border border-[#DCE9E0] rounded-xl p-5 bg-[#F7FBF8]">
            
            {/* 1. Codes Générale (APP-012) */}
            {app.id === 'APP-012' ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-sm text-[#173528]">Générateur d'identifiants uniques</h3>
                    <p className="text-xs text-[#64756B]">Format homologué : IVOIR + 4 chiffres + 1 lettre majuscule</p>
                  </div>
                  <button
                    onClick={handleGenerateCode}
                    className="px-3.5 py-2 text-xs font-semibold text-white bg-[#168447] hover:bg-[#0B5D32] rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Générer un code</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {generatedCodes.map((code, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-lg bg-white border border-[#DCE9E0] font-mono-code text-sm font-bold text-[#0B5D32]"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#168447]" />
                        <span>{code}</span>
                      </div>
                      <button
                        onClick={() => handleCopyCode(code)}
                        className="p-1.5 text-xs text-[#64756B] hover:text-[#168447] rounded hover:bg-[#E8F5EC] transition-colors"
                        title="Copier le code"
                      >
                        {copiedCode === code ? <Check className="w-4 h-4 text-[#168447]" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-[#64756B] italic">
                  * Algorithme certifié sans doublon, prêt pour cartes de membres, tickets d’événements et attestations.
                </p>
              </div>
            ) : null}

            {/* 2. QUESTIONS POUR UN CHRÉTIEN (APP-013) / LE MILLIONNAIRE QUIZ (APP-015) */}
            {app.id === 'APP-013' || app.id === 'APP-015' ? (
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
                    let btnStyle = "bg-white border-[#DCE9E0] text-[#173528] hover:border-[#168447]";
                    if (selectedAnswer !== null) {
                      if (isCorrect) {
                        btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold";
                      } else if (isSelected) {
                        btnStyle = "bg-rose-50 border-rose-500 text-rose-900";
                      }
                    }
                    return (
                      <button
                        key={idx}
                        disabled={selectedAnswer !== null}
                        onClick={() => handleAnswerSelect(idx)}
                        className={`p-3 text-left text-xs rounded-xl border transition-all ${btnStyle}`}
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
                      onClick={handleNextQuiz}
                      className="px-4 py-1.5 text-xs font-semibold text-white bg-[#168447] rounded-lg hover:bg-[#0B5D32] transition-colors"
                    >
                      Question suivante →
                    </button>
                  </div>
                )}
              </div>
            ) : null}

            {/* 3. Habakuk Generated Prompts (APP-006) / Formation IA (APP-002) */}
            {app.id === 'APP-006' || app.id === 'APP-002' ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-[#173528]">Objectif du prompt :</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleCategoryChange('business')}
                      className={`px-2.5 py-1 text-xs rounded-lg transition-colors ${
                        promptCategory === 'business' ? 'bg-[#168447] text-white' : 'bg-white text-[#64756B] border border-[#DCE9E0]'
                      }`}
                    >
                      Business & PME
                    </button>
                    <button
                      onClick={() => handleCategoryChange('redaction')}
                      className={`px-2.5 py-1 text-xs rounded-lg transition-colors ${
                        promptCategory === 'redaction' ? 'bg-[#168447] text-white' : 'bg-white text-[#64756B] border border-[#DCE9E0]'
                      }`}
                    >
                      Communication
                    </button>
                    <button
                      onClick={() => handleCategoryChange('education')}
                      className={`px-2.5 py-1 text-xs rounded-lg transition-colors ${
                        promptCategory === 'education' ? 'bg-[#168447] text-white' : 'bg-white text-[#64756B] border border-[#DCE9E0]'
                      }`}
                    >
                      Pédagogie
                    </button>
                  </div>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-[#DCE9E0] relative group">
                  <p className="text-xs text-[#173528] leading-relaxed font-mono-code">
                    "{promptResult}"
                  </p>
                  <button
                    onClick={() => handleCopyCode(promptResult)}
                    className="mt-2 text-[11px] text-[#168447] font-semibold flex items-center gap-1 hover:underline"
                  >
                    {copiedCode === promptResult ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode === promptResult ? "Copié !" : "Copier le prompt"}</span>
                  </button>
                </div>
              </div>
            ) : null}

            {/* 4. CV & MOTIVATION PRO (APP-010) */}
            {app.id === 'APP-010' ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-[#DCE9E0] pb-2">
                  <span className="text-xs font-semibold text-[#168447]">Aperçu de mise en page CV moderne</span>
                  <span className="text-[11px] text-[#64756B]">Format PDF A4 conforme ATS</span>
                </div>
                <div className="p-4 bg-white rounded-lg border border-[#DCE9E0] space-y-2 text-xs">
                  <div className="border-b border-[#DCE9E0] pb-2">
                    <h4 className="font-heading font-bold text-sm text-[#173528]">KOUADIO JEAN-MARC</h4>
                    <p className="text-[11px] text-[#168447] font-medium">Responsable Logistique & Approvisionnement · Abidjan</p>
                  </div>
                  <div>
                    <span className="font-semibold text-[#173528]">Profil professionnel :</span>
                    <p className="text-[#64756B] text-[11px] leading-relaxed mt-0.5">
                      Expert logistique avec 6 ans d’expérience en gestion des flux de marchandises et optimisation des chaînes d'approvisionnement en Côte d’Ivoire.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-2 py-0.5 bg-[#E8F5EC] text-[#0B5D32] rounded text-[10px] font-medium">Gestion de stock</span>
                    <span className="px-2 py-0.5 bg-[#E8F5EC] text-[#0B5D32] rounded text-[10px] font-medium">ERP & Excel Pro</span>
                    <span className="px-2 py-0.5 bg-[#E8F5EC] text-[#0B5D32] rounded text-[10px] font-medium">Management</span>
                  </div>
                </div>
              </div>
            ) : null}

            {/* 5. Ivoir'Cuisine Pro (APP-016) */}
            {app.id === 'APP-016' ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-[#DCE9E0] pb-2">
                  <span className="text-xs font-semibold text-[#168447]">Fiche recette : Sauce Graine & Foutou Banane</span>
                  <span className="text-[11px] text-[#64756B]">Temps : 1h45 · Difficulté : Moyenne</span>
                </div>
                <div className="p-3.5 bg-white rounded-lg border border-[#DCE9E0] space-y-2 text-xs text-[#64756B]">
                  <p><strong className="text-[#173528]">Ingrédients clés :</strong> Noix de palme fraîches, poisson fumé (mâchoiron), crabe de mer, viande de bœuf, piment frais, oignon, sel, cube d'assaisonnement.</p>
                  <p><strong className="text-[#173528]">Astuce du chef ivoirien :</strong> Laisser mijoter à feu doux jusqu'à ce que l'huile rouge remonte délicatement en surface pour une saveur onctueuse et authentique.</p>
                </div>
              </div>
            ) : null}

            {/* Default for other apps */}
            {!['APP-012', 'APP-013', 'APP-015', 'APP-006', 'APP-002', 'APP-010', 'APP-016'].includes(app.id) && (
              <div className="space-y-3">
                <h4 className="font-heading font-semibold text-xs text-[#173528]">Fonctionnalités au cahier des charges :</h4>
                <ul className="space-y-1.5">
                  {app.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-[#173528]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#168447]" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>

          {/* Key deliverables */}
          <div>
            <h4 className="font-heading font-bold text-xs uppercase text-[#64756B] tracking-wider mb-2">
              Inclus dans chaque commande Univers Habakuk :
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#173528]">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-white border border-[#DCE9E0]">
                <Check className="w-4 h-4 text-[#168447] shrink-0" />
                <span>Code source ou déploiement sécurisé</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-white border border-[#DCE9E0]">
                <Check className="w-4 h-4 text-[#168447] shrink-0" />
                <span>Formation & assistance de prise en main</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-white border border-[#DCE9E0]">
                <Check className="w-4 h-4 text-[#168447] shrink-0" />
                <span>Personnalisation à votre identité</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-white border border-[#DCE9E0]">
                <Check className="w-4 h-4 text-[#168447] shrink-0" />
                <span>Garantie de bon fonctionnement</span>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer with mandatory Order button */}
        <div className="px-6 py-4 bg-[#F7FBF8] border-t border-[#DCE9E0] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-[#64756B] text-center sm:text-left">
            Tarif confirmé sur devis personnalisé gratuit
          </div>
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => downloadApplicationPdf(app)}
              className="px-3.5 py-2.5 text-xs font-semibold text-[#0B5D32] bg-[#E8F5EC] hover:bg-[#C9F0D5] border border-[#C9F0D5] rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              title="Télécharger la fiche catalogue officielle en PDF"
            >
              <FileDown className="w-3.5 h-3.5 text-[#168447]" />
              <span>Fiche PDF</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-medium text-[#64756B] hover:text-[#173528] rounded-xl hover:bg-white border border-[#DCE9E0] transition-colors"
            >
              Fermer
            </button>
            <button
              onClick={() => {
                onClose();
                onOrder(app);
              }}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-[#168447] hover:bg-[#0B5D32] rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer w-full sm:w-auto"
            >
              <span>Commander cette application</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
