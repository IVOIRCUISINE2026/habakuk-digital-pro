import React, { useState } from 'react';
import { ArrowUp, Mail, Phone, MapPin, MessageSquare, Shield } from 'lucide-react';
import { SITE_CONFIG } from '../data/catalog';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [modalContent, setModalContent] = useState<{ title: string; body: string } | null>(null);

  const handleOpenLegal = (title: string, body: string) => {
    setModalContent({ title, body });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#173528] text-white pt-16 pb-24 sm:pb-20 border-t border-[#0B5D32]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-white/10">
          
          {/* Brand info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#168447] text-white flex items-center justify-center font-bold text-lg">
                U
              </div>
              <span className="font-heading font-extrabold text-xl tracking-tight text-white">
                {SITE_CONFIG.name}
              </span>
            </div>
            
            <p className="text-sm text-[#DCE9E0] leading-relaxed max-w-sm">
              L’innovation au service de vos ambitions. Développement d’applications web, mobiles et sur mesure en Côte d’Ivoire.
            </p>

            <div className="pt-2 text-xs text-[#C9F0D5] font-medium">
              {SITE_CONFIG.creator_credit} · Abidjan, Côte d’Ivoire
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <p className="font-heading font-bold text-sm uppercase tracking-wider text-[#C9F0D5]">
              Navigation
            </p>
            <ul className="space-y-2 text-xs text-[#DCE9E0]">
              <li>
                <button
                  onClick={() => { onNavigate('accueil'); scrollToTop(); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Accueil
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('applications'); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Nos applications (Catalogue)
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('services'); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Nos services
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('commande'); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Commander une application
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('suivi'); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Suivi de commande en direct
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('statistiques'); }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Statistiques de visites
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onNavigate('administration'); }}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                >
                  <Shield className="w-3.5 h-3.5 text-[#C9F0D5]" />
                  <span>Espace Administration</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-3">
            <p className="font-heading font-bold text-sm uppercase tracking-wider text-[#C9F0D5]">
              Contact & Échanges
            </p>
            <div className="space-y-2.5 text-xs text-[#DCE9E0]">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#C9F0D5] shrink-0" />
                <span>{SITE_CONFIG.contact.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C9F0D5] shrink-0" />
                <a href={`mailto:${SITE_CONFIG.contact.email}`} className="hover:text-white transition-colors">
                  {SITE_CONFIG.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C9F0D5] shrink-0" />
                <span>{SITE_CONFIG.contact.phone}</span>
              </div>
              <div className="pt-2">
                <a
                  href={`https://wa.me/2250704002387?text=${encodeURIComponent("Bonjour Univers Habakuk Digital Pro, je vous contacte depuis votre site web.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#168447] hover:bg-[#0B5D32] text-white text-xs font-semibold transition-all shadow-sm"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Discuter sur WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#DCE9E0]">
          <div>
            © {new Date().getFullYear()} {SITE_CONFIG.name}. Tous droits réservés.
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <button
              onClick={() => handleOpenLegal(
                "Politique de confidentialité",
                "Chez Univers Habakuk Digital Pro, nous respectons scrupuleusement la confidentialité de vos données personnelles. Les coordonnées et spécifications techniques soumises dans nos formulaires de commande ne sont transmises à aucun tiers et servent exclusivement à l'étude, la contractualisation et la livraison de votre application numérique en Côte d’Ivoire."
              )}
              className="hover:text-white underline transition-colors cursor-pointer"
            >
              Politique de confidentialité
            </button>
            <span>·</span>
            <button
              onClick={() => handleOpenLegal(
                "Conditions générales de vente & service",
                "Toute commande passée auprès d'Univers Habakuk Digital Pro fait l'objet d'un devis préalable détaillé stipulant le périmètre technique, le tarif convenu et le délai de réalisation. Aucun prix n'est imposé sans validation conjointe. La propriété des droits d'exploitation ou du code source est transférée selon les termes arrêtés dans le contrat de commande."
              )}
              className="hover:text-white underline transition-colors cursor-pointer"
            >
              Conditions générales
            </button>
            <span>·</span>
            <button
              onClick={() => handleOpenLegal(
                "Mentions légales",
                `Univers Habakuk Digital Pro est une entité de création et de développement de solutions logicielles et numériques, enregistrée et opérant en Côte d’Ivoire.\n\nFondateur et Responsable de la publication : Ahoret Jean Cyrille.\nContact : ahoretjeancyrille777@gmail.com / Côte d’Ivoire.`
              )}
              className="hover:text-white underline transition-colors cursor-pointer"
            >
              Mentions légales
            </button>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="Retour en haut"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Legal Notice Modal */}
      {modalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white text-[#173528] rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#DCE9E0]">
            <h3 className="font-heading font-bold text-lg text-[#173528] mb-3">
              {modalContent.title}
            </h3>
            <p className="text-xs text-[#64756B] leading-relaxed whitespace-pre-wrap mb-6">
              {modalContent.body}
            </p>
            <button
              onClick={() => setModalContent(null)}
              className="w-full py-2.5 text-xs font-semibold text-white bg-[#168447] rounded-xl hover:bg-[#0B5D32] transition-colors"
            >
              Compris et fermer
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};
