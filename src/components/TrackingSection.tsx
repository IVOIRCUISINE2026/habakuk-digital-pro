import React, { useState, useEffect } from 'react';
import { Search, Package, Clock, CheckCircle, MessageSquare, AlertCircle, ArrowRight, ShieldCheck, ChevronRight } from 'lucide-react';
import { Order, OrderStatus } from '../types';
import { api } from '../services/api';
import { STATUS_DEFINITIONS, SITE_CONFIG } from '../data/catalog';

interface TrackingSectionProps {
  initialReference?: string;
  onGoToOrder: () => void;
}

export const TrackingSection: React.FC<TrackingSectionProps> = ({
  initialReference = '',
  onGoToOrder
}) => {
  const [searchQuery, setSearchQuery] = useState(initialReference);
  const [isSearching, setIsSearching] = useState(false);
  const [matchedOrders, setMatchedOrders] = useState<Order[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const performSearch = async (query: string) => {
    if (!query.trim()) return;
    setIsSearching(true);
    setHasSearched(true);
    try {
      const res = await api.trackOrder(query.trim());
      setMatchedOrders(res.orders || []);
      if (res.orders && res.orders.length > 0) {
        setSelectedOrder(res.orders[0]);
      } else {
        setSelectedOrder(null);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    if (initialReference) {
      setSearchQuery(initialReference);
      performSearch(initialReference);
    }
  }, [initialReference]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchQuery);
  };

  const handleQuickLookup = (ref: string) => {
    setSearchQuery(ref);
    performSearch(ref);
  };

  // Progression steps for visual pipeline
  const pipelineSteps: { key: OrderStatus; label: string }[] = [
    { key: 'received', label: 'Reçue' },
    { key: 'reviewing', label: 'À l’étude' },
    { key: 'quoted', label: 'Devis' },
    { key: 'approved', label: 'Validée' },
    { key: 'in_progress', label: 'En cours' },
    { key: 'testing', label: 'Tests' },
    { key: 'ready', label: 'Prête' },
    { key: 'completed', label: 'Terminée' }
  ];

  const getStepStatus = (stepKey: OrderStatus, currentStatus: OrderStatus) => {
    const orderIndex = pipelineSteps.findIndex(s => s.key === currentStatus);
    const thisIndex = pipelineSteps.findIndex(s => s.key === stepKey);

    if (currentStatus === 'cancelled') return 'cancelled';
    if (thisIndex < orderIndex) return 'completed';
    if (thisIndex === orderIndex) return 'current';
    return 'upcoming';
  };

  return (
    <section id="suivi" className="py-16 lg:py-24 bg-[#F7FBF8] border-b border-[#DCE9E0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#168447]">
            Transparence & Suivi en Direct
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#173528] mt-2">
            Suivi de votre commande
          </h2>
          <p className="text-sm sm:text-base text-[#64756B] mt-3">
            Consultez à tout moment l'état d'avancement de votre projet logiciel avec votre numéro de référence ou votre numéro de téléphone.
          </p>
        </div>

        {/* Search Input Box */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-[#DCE9E0] shadow-sm mb-8">
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-[#64756B] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Entrez votre référence (ex: UHD-2026-4821) ou votre numéro..."
                className="w-full pl-11 pr-4 py-3 text-sm rounded-xl border border-[#DCE9E0] bg-[#F7FBF8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#168447]/20 focus:border-[#168447] text-[#173528]"
              />
            </div>
            <button
              type="submit"
              disabled={isSearching}
              className="px-6 py-3 text-sm font-semibold text-white bg-[#168447] hover:bg-[#0B5D32] rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSearching ? <span>Recherche...</span> : <span>Vérifier le statut</span>}
            </button>
          </form>

          {/* Quick Demo Lookups */}
          <div className="mt-4 pt-3 border-t border-[#DCE9E0] flex flex-wrap items-center gap-2 text-xs text-[#64756B]">
            <span>Exemples à tester :</span>
            <button
              type="button"
              onClick={() => handleQuickLookup("UHD-2026-4821")}
              className="px-2.5 py-1 rounded bg-[#E8F5EC] text-[#0B5D32] hover:bg-[#C9F0D5] font-mono-code font-semibold transition-colors cursor-pointer"
            >
              UHD-2026-4821 (En cours)
            </button>
            <button
              type="button"
              onClick={() => handleQuickLookup("UHD-2026-7913")}
              className="px-2.5 py-1 rounded bg-[#E8F5EC] text-[#0B5D32] hover:bg-[#C9F0D5] font-mono-code font-semibold transition-colors cursor-pointer"
            >
              UHD-2026-7913 (À l'étude)
            </button>
          </div>
        </div>

        {/* Search Results Display */}
        {hasSearched && (
          <div>
            {matchedOrders.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-2xl border border-[#DCE9E0] space-y-3">
                <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
                <h3 className="font-heading font-bold text-base text-[#173528]">
                  Aucune commande trouvée
                </h3>
                <p className="text-xs text-[#64756B] max-w-md mx-auto">
                  Vérifiez l'orthographe de votre référence ou le numéro de téléphone utilisé lors de votre inscription.
                </p>
                <button
                  onClick={onGoToOrder}
                  className="mt-2 px-4 py-2 text-xs font-semibold text-white bg-[#168447] rounded-xl hover:bg-[#0B5D32] transition-colors"
                >
                  Passer une commande maintenant
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                
                {/* Multi-result picker if multiple orders match phone number */}
                {matchedOrders.length > 1 && (
                  <div className="flex items-center gap-2 overflow-x-auto pb-2">
                    <span className="text-xs font-medium text-[#64756B] shrink-0">Commandes trouvées :</span>
                    {matchedOrders.map((ord) => (
                      <button
                        key={ord.id}
                        onClick={() => setSelectedOrder(ord)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono-code transition-colors shrink-0 ${
                          selectedOrder?.id === ord.id
                            ? 'bg-[#168447] text-white font-bold'
                            : 'bg-white border border-[#DCE9E0] text-[#173528] hover:bg-[#F7FBF8]'
                        }`}
                      >
                        {ord.reference} ({ord.application_name})
                      </button>
                    ))}
                  </div>
                )}

                {/* Selected Order Details Card */}
                {selectedOrder && (
                  <div className="bg-white rounded-2xl border border-[#DCE9E0] p-6 sm:p-8 shadow-sm space-y-8 animate-in fade-in duration-150">
                    
                    {/* Top Row: Ref & Current Status Badge */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#DCE9E0]">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-[#64756B]">
                          <span>Commande Univers Habakuk</span>
                          <span>·</span>
                          <span>Déposée le {new Date(selectedOrder.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </div>
                        <h3 className="font-heading font-extrabold text-2xl text-[#173528] mt-0.5">
                          {selectedOrder.application_name}
                        </h3>
                        <p className="font-mono-code text-xs font-bold text-[#168447] mt-0.5">
                          Réf. {selectedOrder.reference}
                        </p>
                      </div>

                      {/* Status Tag */}
                      <div className="flex flex-col sm:items-end">
                        <span className={`inline-block px-3.5 py-1.5 text-xs font-bold rounded-xl border ${STATUS_DEFINITIONS[selectedOrder.status]?.color || 'bg-gray-100 text-gray-800'}`}>
                          {STATUS_DEFINITIONS[selectedOrder.status]?.label || selectedOrder.status}
                        </span>
                        <span className="text-[11px] text-[#64756B] mt-1">
                          Mise à jour : {new Date(selectedOrder.updated_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>

                    {/* Visual Progress Stepper */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#64756B] mb-4">
                        Évolution de la réalisation :
                      </h4>
                      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                        {pipelineSteps.map((step, idx) => {
                          const state = getStepStatus(step.key, selectedOrder.status);
                          return (
                            <div key={step.key} className="flex flex-col items-center text-center">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all mb-1.5 ${
                                  state === 'completed'
                                    ? 'bg-[#168447] text-white'
                                    : state === 'current'
                                    ? 'bg-[#E8F5EC] text-[#0B5D32] border-2 border-[#168447] shadow-xs'
                                    : 'bg-[#F7FBF8] text-[#64756B] border border-[#DCE9E0]'
                                }`}
                              >
                                {state === 'completed' ? '✓' : idx + 1}
                              </div>
                              <span className={`text-[10px] leading-tight ${
                                state === 'current' ? 'font-bold text-[#0B5D32]' : 'text-[#64756B]'
                              }`}>
                                {step.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Official Admin Message to Customer */}
                    <div className="p-4 rounded-xl bg-[#F7FBF8] border border-[#DCE9E0] space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#168447]">
                        <MessageSquare className="w-4 h-4" />
                        <span>Message de l'équipe Univers Habakuk :</span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#173528] leading-relaxed">
                        {selectedOrder.admin_message || "Votre commande est prise en charge selon les standards Univers Habakuk."}
                      </p>
                    </div>

                    {/* Specification Recap Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-white rounded-xl border border-[#DCE9E0] text-xs">
                      <div>
                        <span className="text-[#64756B]">Client :</span>
                        <p className="font-semibold text-[#173528] mt-0.5">{selectedOrder.customer.full_name}</p>
                        <p className="text-[11px] text-[#64756B]">{selectedOrder.customer.city}</p>
                      </div>

                      <div>
                        <span className="text-[#64756B]">Type & Plateformes :</span>
                        <p className="font-semibold text-[#173528] mt-0.5">{selectedOrder.order_type}</p>
                        <p className="text-[11px] text-[#64756B]">{selectedOrder.platform.join(', ')}</p>
                      </div>

                      <div>
                        <span className="text-[#64756B]">Délai & Budget :</span>
                        <p className="font-semibold text-[#173528] mt-0.5">{selectedOrder.deadline || 'Flexible'}</p>
                        <p className="text-[11px] text-[#64756B]">{selectedOrder.budget || 'Sur devis'}</p>
                      </div>
                    </div>

                    {/* Audit Timeline */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#64756B] mb-3">
                        Historique des étapes validées :
                      </h4>
                      <div className="space-y-2.5">
                        {selectedOrder.status_history.map((h, i) => (
                          <div key={i} className="flex items-start gap-3 text-xs p-2.5 rounded-lg bg-[#F7FBF8] border border-[#DCE9E0]">
                            <div className="w-2 h-2 rounded-full bg-[#168447] mt-1 shrink-0" />
                            <div className="flex-1">
                              <div className="flex justify-between items-center">
                                <span className="font-semibold text-[#173528]">
                                  {STATUS_DEFINITIONS[h.status]?.label || h.status}
                                </span>
                                <span className="text-[11px] text-[#64756B] font-mono-code">
                                  {new Date(h.changed_at).toLocaleDateString('fr-FR')} {new Date(h.changed_at).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                              {h.note && (
                                <p className="text-[#64756B] text-[11px] mt-0.5">
                                  {h.note}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick WhatsApp Action Button */}
                    <div className="pt-4 border-t border-[#DCE9E0] flex flex-col sm:flex-row items-center justify-between gap-3">
                      <div className="text-xs text-[#64756B]">
                        Une question sur cette commande ? Échangez directement avec le responsable.
                      </div>
                      <a
                        href={`https://wa.me/2250704002387?text=${encodeURIComponent(
                          `Bonjour Ahoret Jean Cyrille, je m'enquiers de l'avancement de ma commande N° ${selectedOrder.reference} (${selectedOrder.application_name}).`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-white bg-[#168447] hover:bg-[#0B5D32] rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Contacter sur WhatsApp</span>
                      </a>
                    </div>

                  </div>
                )}
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
