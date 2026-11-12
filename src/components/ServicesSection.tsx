import React from 'react';
import { ArrowRight, Package, Palette, Sparkles, Globe, GraduationCap } from 'lucide-react';
import { SERVICES } from '../data/catalog';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const serviceIcons = [Package, Palette, Sparkles, Globe, GraduationCap];

  return (
    <section id="services" className="py-16 lg:py-24 bg-[#F7FBF8] border-t border-b border-[#DCE9E0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#168447]">
            Prestations Professionnelles
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#173528] mt-2">
            Nos domaines d’expertise & services
          </h2>
          <p className="text-sm sm:text-base text-[#64756B] mt-3 leading-relaxed">
            Que vous ayez besoin d'une application existante prête à l'emploi ou d'un projet informatique sur mesure en Côte d'Ivoire, Univers Habakuk Digital Pro vous guide étape par étape.
          </p>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((srv, index) => {
            const Icon = serviceIcons[index % serviceIcons.length];
            const isFeatured = index === 2; // Création sur mesure

            return (
              <div
                key={srv.name}
                className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                  isFeatured
                    ? 'bg-gradient-to-br from-[#E8F5EC] to-white border-[#C9F0D5] shadow-sm md:col-span-2 lg:col-span-1'
                    : 'bg-white border-[#DCE9E0] hover:border-[#168447] shadow-sm hover:shadow-md'
                }`}
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#E8F5EC] text-[#168447] flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  <div className="text-xs font-semibold text-[#168447] mb-1">
                    Service 0{index + 1}
                  </div>

                  <h3 className="font-heading text-lg font-bold text-[#173528]">
                    {srv.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#64756B] mt-2 leading-relaxed">
                    {srv.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#DCE9E0]">
                  <button
                    onClick={() => onSelectService(srv.name)}
                    className="text-xs font-semibold text-[#168447] hover:text-[#0B5D32] flex items-center gap-1.5 transition-colors group cursor-pointer"
                  >
                    <span>Faire une demande pour ce service</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
