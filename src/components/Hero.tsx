import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Laptop, PhoneCall, Code, Layers } from 'lucide-react';
import { SITE_CONFIG } from '../data/catalog';

interface HeroProps {
  onDiscoverClick: () => void;
  onOrderClick: () => void;
  onTrackClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onDiscoverClick, onOrderClick, onTrackClick }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F7FBF8] via-white to-white pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#DCE9E0]">
      {/* Decorative backdrop shapes */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C9F0D5]/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#E8F5EC]/60 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 2-column hero split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Proposition and Copy */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#E8F5EC] border border-[#C9F0D5] text-[#0B5D32] text-xs font-semibold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>L’innovation numérique à votre portée</span>
            </div>

            {/* Headline */}
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-[#173528] leading-[1.15] tracking-tight mb-5 text-balance">
              Bienvenue dans l’<span className="text-[#168447]">Univers Habakuk</span> Digital Pro
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#64756B] max-w-2xl leading-relaxed mb-8">
              {SITE_CONFIG.tagline} Découvrez 16 applications conçues pour l’éducation, la gestion, les jeux et la créativité en Côte d’Ivoire, ou commandez votre propre solution sur mesure.
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-10">
              <button
                onClick={onDiscoverClick}
                className="px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#168447] hover:bg-[#0B5D32] rounded-xl shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <span>Découvrir les applications</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOrderClick}
                className="px-6 py-3.5 text-sm sm:text-base font-semibold text-[#0B5D32] bg-[#E8F5EC] hover:bg-[#C9F0D5] border border-[#C9F0D5] rounded-xl transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Commander une application</span>
              </button>

              <button
                onClick={onTrackClick}
                className="px-4 py-3.5 text-xs sm:text-sm font-medium text-[#64756B] hover:text-[#173528] rounded-xl hover:bg-[#F7FBF8] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Suivre ma commande</span>
              </button>
            </div>

            {/* Creator signature attribution */}
            <div className="flex items-center gap-3 text-xs text-[#64756B] pt-4 border-t border-[#DCE9E0] w-full">
              <span className="font-medium text-[#173528]">{SITE_CONFIG.creator_credit}</span>
              <span>·</span>
              <span>Abidjan, Côte d’Ivoire</span>
              <span>·</span>
              <span className="text-[#168447] font-medium">Développement & Innovation</span>
            </div>

          </div>

          {/* Right Column: Visual Anchor */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto rounded-2xl overflow-hidden shadow-2xl border border-[#DCE9E0] bg-white group">
              <img
                src="/src/assets/images/hero_digital_ecosystem_1794504391774.jpg"
                alt="Univers Habakuk Digital Pro - Écosystème Numérique en Côte d’Ivoire"
                className="w-full h-80 sm:h-96 object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback styled visual container
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    parent.classList.add('bg-gradient-to-br', 'from-[#0B5D32]', 'to-[#168447]', 'p-8', 'flex', 'flex-col', 'justify-center', 'text-white');
                  }
                }}
              />
              
              {/* Overlay card tag */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-[#DCE9E0] shadow-lg flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-[#168447] uppercase tracking-wider">Catalogue 2026</p>
                  <p className="text-sm font-bold text-[#173528]">16 Projets Numériques Disponibles</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-[#E8F5EC] text-[#168447] flex items-center justify-center font-bold">
                  16+
                </div>
              </div>
            </div>

            {/* Subtle floating badge */}
            <div className="hidden sm:flex absolute top-3 right-3 bg-white/95 backdrop-blur-sm p-2.5 rounded-xl shadow-md border border-[#DCE9E0] items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#168447] text-white flex items-center justify-center">
                <Code className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-[11px] text-[#64756B]">Solutions Numériques</p>
                <p className="text-xs font-bold text-[#173528]">Web, Mobile & Logiciel</p>
              </div>
            </div>
          </div>

        </div>

        {/* Full-width 3-pillar Trust Points strip */}
        <div className="mt-14 pt-10 border-t border-[#DCE9E0] grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#F7FBF8] border border-[#DCE9E0]">
            <div className="w-9 h-9 rounded-lg bg-[#E8F5EC] text-[#168447] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-sm text-[#173528]">Solutions pensées pour vos besoins</h3>
              <p className="text-xs text-[#64756B] mt-1 leading-relaxed">
                Des applications ergonomiques, intuitives et adaptées aux réalités locales et professionnelles.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#F7FBF8] border border-[#DCE9E0]">
            <div className="w-9 h-9 rounded-lg bg-[#E8F5EC] text-[#168447] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-sm text-[#173528]">Accompagnement de bout en bout</h3>
              <p className="text-xs text-[#64756B] mt-1 leading-relaxed">
                De l’étude du besoin à la livraison, avec suivi transparent en direct et assistance technique.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#F7FBF8] border border-[#DCE9E0]">
            <div className="w-9 h-9 rounded-lg bg-[#E8F5EC] text-[#168447] flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-sm text-[#173528]">Éducation, entreprises & grand public</h3>
              <p className="text-xs text-[#64756B] mt-1 leading-relaxed">
                Une diversité de domaines : plateformes d'apprentissage, outils de gestion et créations interactives.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
