import React from 'react';
import { ArrowRight, MessageSquare, Check } from 'lucide-react';
import { ORDER_STEPS } from '../data/catalog';

interface StepsSectionProps {
  onOrderClick: () => void;
  onTrackClick: () => void;
}

export const StepsSection: React.FC<StepsSectionProps> = ({ onOrderClick, onTrackClick }) => {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#168447]">
            Processus Simple & Transparent
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#173528] mt-2">
            Comment commander votre application ?
          </h2>
          <p className="text-sm sm:text-base text-[#64756B] mt-3">
            En 4 étapes claires, de l’expression de votre idée jusqu'à la livraison et la mise en production.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {ORDER_STEPS.map((step, idx) => (
            <div
              key={step.number}
              className="relative p-6 rounded-2xl bg-[#F7FBF8] border border-[#DCE9E0] flex flex-col justify-between hover:border-[#168447] transition-colors"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#168447] text-white flex items-center justify-center font-heading font-bold text-base mb-4 shadow-sm">
                  {step.number}
                </div>
                <h3 className="font-heading text-lg font-bold text-[#173528]">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#64756B] mt-2 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[#DCE9E0] flex items-center justify-between text-[11px] text-[#168447] font-medium">
                <span>Étape {step.number} sur 4</span>
                <Check className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

        {/* Marquee Banner: "Une idée d’application ? Parlons-en" */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-[#0B5D32] via-[#168447] to-[#0B5D32] p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-xl text-center md:text-left">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C9F0D5]">
                Accompagnement Personnalisé
              </span>
              <h3 className="font-heading text-xl sm:text-2xl font-bold mt-1 text-white">
                Une idée d’application spécifique ? Parlons-en !
              </h3>
              <p className="text-xs sm:text-sm text-[#E8F5EC] mt-2 leading-relaxed">
                Contactez directement le concepteur Ahoret Jean Cyrille en Côte d’Ivoire pour étudier votre projet sans engagement.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onOrderClick}
                className="w-full sm:w-auto px-6 py-3 text-xs sm:text-sm font-semibold text-[#0B5D32] bg-white hover:bg-[#E8F5EC] rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Déposer une demande</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/2250704002387?text=${encodeURIComponent("Bonjour Univers Habakuk Digital Pro, j'ai une idée d'application et je souhaiterais échanger avec vous.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-white/20 hover:bg-white/30 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Direct</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
