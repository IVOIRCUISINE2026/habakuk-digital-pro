import React, { useState, useMemo } from 'react';
import { Search, Eye, ShoppingCart, Check, FileDown, Download } from 'lucide-react';
import { ApplicationItem } from '../types';
import { downloadApplicationPdf, downloadFullCataloguePdf } from '../utils/pdfGenerator';

interface CatalogSectionProps {
  applications: ApplicationItem[];
  onOrderApp: (app: ApplicationItem) => void;
  onPreviewApp: (app: ApplicationItem) => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  applications,
  onOrderApp,
  onPreviewApp,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'Tous',
    'Éducation et formation',
    'Création numérique et IA',
    'Gestion et services',
    'Jeux et divertissement',
    'Cuisine',
  ];

  const filteredApps = useMemo(() => {
    return applications.filter((app) => {
      const matchCat =
        selectedCategory === 'Tous' || app.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        app.name.toLowerCase().includes(q) ||
        app.description.toLowerCase().includes(q) ||
        app.id.toLowerCase().includes(q) ||
        app.features.some((f) => f.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [applications, selectedCategory, searchQuery]);

  return (
    <section id="applications" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#168447]">
              Catalogue Officiel Univers Habakuk
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#173528] mt-2">
              Nos applications & projets numériques
            </h2>
            <p className="text-sm sm:text-base text-[#64756B] mt-3 leading-relaxed">
              Explorez nos {applications.length} solutions logicielles prêtes à être commandées ou adaptées à vos besoins en Côte d’Ivoire.
              Consultez leurs images de référence et téléchargez leur fiche technique au format PDF officiel.
            </p>
          </div>

          {/* Download Complete Catalogue PDF Button & Notice */}
          <div className="flex flex-col sm:flex-row md:flex-col items-stretch sm:items-center md:items-end gap-3 shrink-0">
            <button
              onClick={() => downloadFullCataloguePdf(applications)}
              className="px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-[#0B5D32] hover:bg-[#168447] rounded-xl shadow-sm transition-all hover:shadow hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
              title="Télécharger le catalogue complet au format PDF A4 officiel"
            >
              <Download className="w-4 h-4" />
              <span>Télécharger tout le catalogue (PDF)</span>
            </button>
            <span className="text-[11px] text-[#64756B] text-center md:text-right">
              Fiches techniques & cahier des charges imprimables
            </span>
          </div>
        </div>

        {/* Filter controls & Search */}
        <div className="space-y-4 mb-10">
          
          {/* Search bar */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-[#64756B] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher par nom, mot-clé, code (ex: IVOIR'EDUC, QR code, Quiz)..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DCE9E0] bg-[#F7FBF8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#168447]/20 focus:border-[#168447] transition-all text-[#173528]"
            />
          </div>

          {/* Category Tabs (interactive segmented buttons) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const count =
                cat === 'Tous'
                  ? applications.length
                  : applications.filter((a) => a.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-xl whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#168447] text-white shadow-sm'
                      : 'bg-[#F7FBF8] text-[#64756B] hover:text-[#173528] border border-[#DCE9E0] hover:bg-white'
                  }`}
                >
                  <span>{cat}</span>
                  <span className="ml-1.5 opacity-75 font-mono-code">
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Grid of Applications */}
        {filteredApps.length === 0 ? (
          <div className="py-16 text-center border border-dashed border-[#DCE9E0] rounded-2xl bg-[#F7FBF8]">
            <p className="text-sm font-medium text-[#173528]">
              Aucune application ne correspond à votre recherche.
            </p>
            <p className="text-xs text-[#64756B] mt-1">
              Essayez un autre mot-clé ou réinitialisez les filtres.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('Tous');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-[#168447] bg-[#E8F5EC] rounded-lg hover:bg-[#C9F0D5] transition-colors"
            >
              Afficher toutes les applications
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredApps.map((app) => (
              <div
                key={app.id}
                className="flex flex-col justify-between rounded-2xl border border-[#DCE9E0] bg-[#F7FBF8] hover:bg-white p-5 sm:p-6 shadow-sm hover:shadow-md transition-all group overflow-hidden"
              >
                <div>
                  
                  {/* Reference Image Container with subtle hover zoom */}
                  <div className="relative w-full h-44 sm:h-48 rounded-xl overflow-hidden mb-4 border border-[#DCE9E0] bg-[#E8F5EC] group-hover:border-[#168447]/40 transition-colors">
                    {app.image_url ? (
                      <img
                        src={app.image_url}
                        alt={`Image de référence ${app.name} - Univers Habakuk`}
                        className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : null}
                    
                    {/* Floating badge for ID */}
                    <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-mono-code font-bold text-[#0B5D32] shadow-xs border border-[#DCE9E0]">
                      {app.id}
                    </div>

                    {/* Category pill on image */}
                    <div className="absolute bottom-2.5 right-2.5 bg-[#173528]/85 backdrop-blur-xs text-white px-2.5 py-0.5 rounded-md text-[10px] font-medium">
                      {app.category}
                    </div>
                  </div>

                  {/* Clean unboxed metadata with typographic separators (Zero-Pill Discipline) */}
                  <div className="flex items-center gap-2 text-xs text-[#64756B] mb-1.5 font-medium">
                    <span className="text-[#168447] font-semibold">{app.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono-code text-[11px]">{app.id}</span>
                  </div>

                  {/* App Title */}
                  <h3 className="font-heading text-lg font-bold text-[#173528] group-hover:text-[#168447] transition-colors">
                    {app.name}
                  </h3>

                  {/* Status Note */}
                  <p className="text-[11px] text-[#64756B] mt-0.5 italic">
                    {app.status}
                  </p>

                  {/* Description */}
                  <p className="text-xs text-[#64756B] mt-2.5 leading-relaxed line-clamp-3">
                    {app.description}
                  </p>

                  {/* Features List */}
                  <div className="mt-4 pt-3.5 border-t border-[#DCE9E0]">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#173528] mb-2">
                      Fonctionnalités au cahier des charges :
                    </p>
                    <ul className="space-y-1.5">
                      {app.features.slice(0, 3).map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-[#173528]">
                          <Check className="w-3.5 h-3.5 text-[#168447] shrink-0" />
                          <span className="truncate">{feat}</span>
                        </li>
                      ))}
                      {app.features.length > 3 && (
                        <li className="text-[11px] text-[#64756B] font-medium pl-5.5">
                          + {app.features.length - 3} autres spécifications incluses
                        </li>
                      )}
                    </ul>
                  </div>

                </div>

                {/* Actions: Download PDF, Demo Simulator, and Mandatory Order Button */}
                <div className="mt-6 pt-4 border-t border-[#DCE9E0] space-y-2">
                  
                  {/* Row 1: PDF Download & Demo View */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => downloadApplicationPdf(app)}
                      className="flex-1 py-2 px-2.5 text-xs font-semibold text-[#0B5D32] bg-[#E8F5EC] hover:bg-[#C9F0D5] border border-[#C9F0D5] rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                      title="Télécharger la fiche catalogue officielle en PDF"
                    >
                      <FileDown className="w-3.5 h-3.5 text-[#168447]" />
                      <span>Catalogue PDF</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onPreviewApp(app)}
                      className="flex-1 py-2 px-2.5 text-xs font-medium text-[#173528] bg-white hover:bg-[#F7FBF8] border border-[#DCE9E0] hover:border-[#168447] rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#168447]" />
                      <span>Aperçu démo</span>
                    </button>
                  </div>

                  {/* Row 2: Primary Order Button */}
                  <button
                    type="button"
                    onClick={() => onOrderApp(app)}
                    className="w-full py-2.5 px-3 text-xs font-semibold text-white bg-[#168447] hover:bg-[#0B5D32] rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    <span>Commander cette application</span>
                  </button>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
