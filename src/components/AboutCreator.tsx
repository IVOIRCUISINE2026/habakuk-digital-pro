import React from 'react';
import { Award, Mail, Phone, MapPin, CheckCircle, MessageSquare } from 'lucide-react';
import { SITE_CONFIG } from '../data/catalog';

interface AboutCreatorProps {
  onContactClick: () => void;
}

export const AboutCreator: React.FC<AboutCreatorProps> = ({ onContactClick }) => {
  return (
    <section className="py-16 lg:py-24 bg-white border-t border-[#DCE9E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Creator Portrait Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md rounded-2xl overflow-hidden border border-[#DCE9E0] shadow-xl bg-[#F7FBF8]">
              <img
                src="/src/assets/images/founder_jean_cyrille_1794504393029.jpg"
                alt="Ahoret Jean Cyrille - Concepteur et Fondateur de Univers Habakuk Digital Pro"
                className="w-full h-auto object-cover aspect-square"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    parent.classList.add('bg-gradient-to-br', 'from-[#0B5D32]', 'to-[#168447]', 'p-10', 'text-white', 'text-center');
                  }
                }}
              />
              <div className="p-4 bg-white/95 backdrop-blur-xs border-t border-[#DCE9E0]">
                <h4 className="font-heading font-bold text-base text-[#173528]">
                  Ahoret Jean Cyrille
                </h4>
                <p className="text-xs text-[#168447] font-medium">
                  Fondateur & Concepteur Numérique · Côte d’Ivoire
                </p>
              </div>
            </div>
          </div>

          {/* Vision & Narrative Column */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#168447]">
                Vision & Leadership Numérique
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#173528] mt-2">
                "Donner vie à vos ambitions grâce au génie du logiciel"
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#64756B] leading-relaxed">
              Basé en Côte d’Ivoire, <strong>Univers Habakuk Digital Pro</strong> a été fondé par <strong>Ahoret Jean Cyrille</strong> avec une mission claire : concevoir des applications concrètes, innovantes et accessibles qui répondent aux besoins éducatifs, entrepreneuriaux et organisationnels de notre pays et de la sous-région.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F7FBF8] border border-[#DCE9E0] text-xs">
                <CheckCircle className="w-4 h-4 text-[#168447] shrink-0 mt-0.5" />
                <span><strong>Qualité logicielle :</strong> Architecture moderne, sécurité et code robuste.</span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F7FBF8] border border-[#DCE9E0] text-xs">
                <CheckCircle className="w-4 h-4 text-[#168447] shrink-0 mt-0.5" />
                <span><strong>Proximité humaine :</strong> Écoute, conseils d'experts et suivi direct.</span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F7FBF8] border border-[#DCE9E0] text-xs">
                <CheckCircle className="w-4 h-4 text-[#168447] shrink-0 mt-0.5" />
                <span><strong>Adaptabilité :</strong> Applications web, mobiles Android/iOS et logicielles.</span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F7FBF8] border border-[#DCE9E0] text-xs">
                <CheckCircle className="w-4 h-4 text-[#168447] shrink-0 mt-0.5" />
                <span><strong>Formation incluse :</strong> Prise en main accompagnée de chaque solution.</span>
              </div>
            </div>

            {/* Direct contact links */}
            <div className="pt-4 border-t border-[#DCE9E0] flex flex-wrap items-center gap-6 text-xs text-[#64756B]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#168447]" />
                <span>{SITE_CONFIG.contact.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#168447]" />
                <a href={`mailto:${SITE_CONFIG.contact.email}`} className="hover:text-[#168447] transition-colors">
                  {SITE_CONFIG.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#168447]" />
                <span>{SITE_CONFIG.contact.phone}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
