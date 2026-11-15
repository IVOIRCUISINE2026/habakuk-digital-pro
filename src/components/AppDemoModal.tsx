import React from 'react';
import { X, Check, Sparkles, ArrowRight, FileDown } from 'lucide-react';
import { ApplicationItem } from '../types';
import { downloadApplicationPdf } from '../utils/pdfGenerator';
import { AppInteractiveSimulator } from './AppInteractiveSimulators';

interface AppDemoModalProps {
  app: ApplicationItem | null;
  onClose: () => void;
  onOrder: (app: ApplicationItem) => void;
}

export const AppDemoModal: React.FC<AppDemoModalProps> = ({ app, onClose, onOrder }) => {
  if (!app) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
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
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-[#64756B] hover:text-[#173528] hover:bg-white border border-transparent hover:border-[#DCE9E0] transition-colors cursor-pointer"
            aria-label="Fermer la démonstration"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Status banner */}
          <div className="p-3.5 rounded-xl bg-[#E8F5EC] border border-[#C9F0D5] flex items-center justify-between text-xs text-[#0B5D32]">
            <span>
              Statut : <strong>{app.status}</strong>
            </span>
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

          <p className="text-sm text-[#64756B] leading-relaxed">{app.description}</p>

          {/* Interactive Simulator tailored to each of the 17 apps */}
          <div className="border border-[#DCE9E0] rounded-xl p-5 bg-[#F7FBF8]">
            <AppInteractiveSimulator key={app.id} app={app} />
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
              type="button"
              onClick={() => downloadApplicationPdf(app)}
              className="px-3.5 py-2.5 text-xs font-semibold text-[#0B5D32] bg-[#E8F5EC] hover:bg-[#C9F0D5] border border-[#C9F0D5] rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              title="Télécharger la fiche catalogue officielle en PDF"
            >
              <FileDown className="w-3.5 h-3.5 text-[#168447]" />
              <span>Fiche PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-medium text-[#64756B] hover:text-[#173528] rounded-xl hover:bg-white border border-[#DCE9E0] transition-colors cursor-pointer"
            >
              Fermer
            </button>
            <button
              type="button"
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
