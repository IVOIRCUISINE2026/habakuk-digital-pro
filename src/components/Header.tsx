import React, { useState } from 'react';
import { Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { SITE_CONFIG } from '../data/catalog';

interface HeaderProps {
  currentTab: string;
  onNavigate: (tab: string, param?: string) => void;
  isAdminLoggedIn: boolean;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onNavigate, isAdminLoggedIn }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Accueil", id: "accueil" },
    { label: "Nos applications", id: "applications" },
    { label: "Nos services", id: "services" },
    { label: "Suivi de commande", id: "suivi" },
    { label: "Statistiques", id: "statistiques" },
    { label: "Administration", id: "administration" },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#DCE9E0] transition-colors w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 sm:gap-6 h-16 sm:h-18">
          
          {/* Zone 1: Unified Single Block for Brand and Info */}
          <div 
            onClick={() => handleLinkClick("accueil")}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none group min-w-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#168447] flex items-center justify-center text-white font-bold text-base sm:text-lg shadow-sm transition-transform group-hover:scale-105 shrink-0">
              U
            </div>
            
            {/* Single unified block containing brand, creator & location without horizontal overflow */}
            <div className="flex flex-col min-w-0">
              <span className="font-heading font-bold text-sm sm:text-base md:text-lg text-[#173528] tracking-tight truncate group-hover:text-[#168447] transition-colors">
                {SITE_CONFIG.name}
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#64756B] truncate">
                {SITE_CONFIG.creator_credit} · {SITE_CONFIG.market}
              </span>
            </div>
          </div>

          {/* Zone 2: Navigation Links for Desktop */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm font-medium text-[#64756B] shrink-0">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              const isAdmin = link.id === "administration";
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors cursor-pointer text-sm ${
                    isActive
                      ? "text-[#168447] font-semibold"
                      : "hover:text-[#173528]"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {link.label}
                    {isAdmin && isAdminLoggedIn && (
                      <span className="w-2 h-2 rounded-full bg-[#168447]" title="Session admin active" />
                    )}
                  </span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#168447] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions - Adaptive for all screen sizes */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={() => handleLinkClick("commande")}
              className="px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white bg-[#168447] hover:bg-[#0B5D32] rounded-xl shadow-sm transition-all hover:shadow hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <span className="hidden sm:inline">Commander une application</span>
              <span className="sm:hidden">Commander</span>
              <ArrowRight className="w-3.5 h-3.5 hidden sm:inline" />
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#173528] hover:bg-[#F7FBF8] border border-[#DCE9E0] shrink-0"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#DCE9E0] bg-[#F7FBF8] px-4 pt-3 pb-6 animate-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`flex items-center justify-between text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  currentTab === link.id
                    ? "bg-[#E8F5EC] text-[#0B5D32] font-semibold"
                    : "text-[#173528] hover:bg-white"
                }`}
              >
                <span>{link.label}</span>
                {link.id === "administration" && (
                  <ShieldCheck className="w-4 h-4 text-[#64756B]" />
                )}
              </button>
            ))}
            <div className="pt-3 mt-1 border-t border-[#DCE9E0]">
              <button
                onClick={() => handleLinkClick("commande")}
                className="w-full py-3 text-center text-sm font-semibold text-white bg-[#168447] rounded-xl shadow-sm"
              >
                Commander une application
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
