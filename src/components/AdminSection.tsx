import React, { useState, useEffect, useMemo } from 'react';
import {
  ShieldCheck,
  Lock,
  LogOut,
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle2,
  Clock,
  AlertCircle,
  MessageSquare,
  FileText,
  UserCheck,
  Layers,
  RefreshCw,
  X,
  Send,
  Plus
} from 'lucide-react';
import { Order, OrderStatus, User, ApplicationItem } from '../types';
import { api } from '../services/api';
import { STATUS_DEFINITIONS, SITE_CONFIG } from '../data/catalog';

interface AdminSectionProps {
  applications: ApplicationItem[];
  onUpdateAppStatus: (appId: string, status: string) => void;
  onAdminAuthChange: (isLoggedIn: boolean) => void;
}

export const AdminSection: React.FC<AdminSectionProps> = ({
  applications,
  onUpdateAppStatus,
  onAdminAuthChange
}) => {
  // Authentication state
  const [currentUser, setCurrentUser] = useState<User | null>(api.getStoredUser());
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Dashboard active tab: 'orders' or 'catalog'
  const [activeTab, setActiveTab] = useState<'orders' | 'catalog'>('orders');

  // Orders state
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterApp, setFilterApp] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');

  // Edit order modal form state
  const [editStatus, setEditStatus] = useState<OrderStatus>('received');
  const [editAdminMessage, setEditAdminMessage] = useState('');
  const [editInternalNotes, setEditInternalNotes] = useState('');
  const [editStatusNote, setEditStatusNote] = useState('');
  const [isUpdatingOrder, setIsUpdatingOrder] = useState(false);
  const [updateSuccessMsg, setUpdateSuccessMsg] = useState(false);

  const fetchOrders = async () => {
    setIsLoadingOrders(true);
    try {
      const data = await api.getAdminOrders();
      setOrders(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingOrders(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchOrders();
      onAdminAuthChange(true);
    } else {
      onAdminAuthChange(false);
    }
  }, [currentUser]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoggingIn(true);
    try {
      const res = await api.adminLogin(loginPassword);
      if (res.success && res.user) {
        setCurrentUser(res.user);
        onAdminAuthChange(true);
      } else {
        setLoginError(res.error || 'Mot de passe incorrect.');
      }
    } catch {
      setLoginError('Erreur de connexion au serveur.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    api.logoutUser();
    setCurrentUser(null);
    onAdminAuthChange(false);
  };

  // Open detail modal
  const handleOpenDetail = (order: Order) => {
    setSelectedOrder(order);
    setEditStatus(order.status);
    setEditAdminMessage(order.admin_message || '');
    setEditInternalNotes(order.internal_notes || '');
    setEditStatusNote('');
    setUpdateSuccessMsg(false);
  };

  // Save order updates
  const handleSaveOrderUpdates = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;
    setIsUpdatingOrder(true);

    try {
      const res = await api.updateOrder(selectedOrder.id, {
        status: editStatus,
        admin_message: editAdminMessage.trim(),
        internal_notes: editInternalNotes.trim(),
        status_note: editStatusNote.trim() || undefined,
        operatorName: currentUser?.name || 'Administrateur'
      });

      if (res.success && res.order) {
        setSelectedOrder(res.order);
        setOrders(prev => prev.map(o => o.id === res.order!.id ? res.order! : o));
        setUpdateSuccessMsg(true);
        setTimeout(() => setUpdateSuccessMsg(false), 3000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsUpdatingOrder(false);
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    window.location.href = '/api/admin/orders/export';
  };

  // Reset sample data
  const handleResetData = () => {
    if (window.confirm("Voulez-vous réinitialiser les commandes aux 3 exemples prédéfinis ?")) {
      const reset = api.resetOrdersToDefault();
      setOrders(reset);
      setSelectedOrder(null);
    }
  };

  // Filtered orders list
  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q ||
        o.reference.toLowerCase().includes(q) ||
        o.customer.full_name.toLowerCase().includes(q) ||
        o.customer.phone.toLowerCase().includes(q) ||
        o.application_name.toLowerCase().includes(q);

      const matchStatus = filterStatus === 'all' || o.status === filterStatus;
      const matchApp = filterApp === 'all' || o.application_id === filterApp;
      const matchType = filterType === 'all' || o.order_type === filterType;

      return matchSearch && matchStatus && matchApp && matchType;
    });
  }, [orders, searchQuery, filterStatus, filterApp, filterType]);

  // KPIs calculations
  const kpis = useMemo(() => {
    return {
      total: orders.length,
      received: orders.filter(o => o.status === 'received').length,
      inProgress: orders.filter(o => o.status === 'in_progress').length,
      awaitingCustomer: orders.filter(o => o.status === 'awaiting_customer' || o.status === 'quoted').length,
      completed: orders.filter(o => o.status === 'completed').length,
      cancelled: orders.filter(o => o.status === 'cancelled').length,
    };
  }, [orders]);

  // LOGIN SCREEN
  if (!currentUser) {
    return (
      <section id="administration" className="py-16 lg:py-24 bg-[#F7FBF8] border-b border-[#DCE9E0]">
        <div className="max-w-md mx-auto px-4">
          <div className="bg-white p-8 rounded-2xl border border-[#DCE9E0] shadow-md">
            
            <div className="w-12 h-12 rounded-xl bg-[#E8F5EC] text-[#168447] flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>

            <div className="text-center mb-6">
              <h2 className="font-heading text-xl font-bold text-[#173528]">
                Portail Administration
              </h2>
              <p className="text-xs text-[#64756B] mt-1">
                Espace sécurisé réservé aux administrateurs Univers Habakuk Digital Pro.
              </p>
            </div>

            {loginError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#173528] mb-1.5">
                  Mot de passe d’administration
                </label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Entrez votre mot de passe..."
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DCE9E0] bg-[#F7FBF8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#168447]/20 focus:border-[#168447]"
                />
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3 text-xs sm:text-sm font-semibold text-white bg-[#168447] hover:bg-[#0B5D32] rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Lock className="w-4 h-4" />
                <span>{isLoggingIn ? 'Authentification...' : 'Accéder au portail'}</span>
              </button>
            </form>

          </div>
        </div>
      </section>
    );
  }

  // DASHBOARD VIEW
  return (
    <section id="administration" className="py-10 lg:py-16 bg-[#F7FBF8] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Bar / Profile */}
        <div className="bg-white p-6 rounded-2xl border border-[#DCE9E0] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#168447] text-white flex items-center justify-center font-bold text-lg">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-heading font-bold text-lg text-[#173528]">
                  {currentUser.name}
                </h2>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#E8F5EC] text-[#0B5D32] border border-[#C9F0D5]">
                  {currentUser.role === 'super_admin' ? 'Super Administrateur' : 'Gestionnaire'}
                </span>
              </div>
              <p className="text-xs text-[#64756B]">{currentUser.email} · Session active</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 text-xs font-semibold rounded-xl border border-[#DCE9E0] bg-white hover:bg-[#F7FBF8] text-[#173528] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#168447]" />
              <span>Exporter CSV</span>
            </button>

            <button
              onClick={handleResetData}
              className="px-3 py-2 text-xs font-medium rounded-xl border border-[#DCE9E0] bg-white hover:bg-[#F7FBF8] text-[#64756B] flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Restaurer les données démo"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Réinitialiser</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>

        {/* 6 KPIs Grid with Tabular Figures */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          <div className="p-4 bg-white rounded-xl border border-[#DCE9E0] shadow-xs">
            <span className="text-[11px] font-semibold text-[#64756B] uppercase tracking-wide">Total Commandes</span>
            <p className="font-heading font-extrabold text-2xl text-[#173528] mt-1 tabular-nums">
              {kpis.total}
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-blue-200 bg-blue-50/30 shadow-xs">
            <span className="text-[11px] font-semibold text-blue-800 uppercase tracking-wide">Nouvelles</span>
            <p className="font-heading font-extrabold text-2xl text-blue-900 mt-1 tabular-nums">
              {kpis.received}
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-[#C9F0D5] bg-[#E8F5EC]/40 shadow-xs">
            <span className="text-[11px] font-semibold text-[#0B5D32] uppercase tracking-wide">En cours</span>
            <p className="font-heading font-extrabold text-2xl text-[#0B5D32] mt-1 tabular-nums">
              {kpis.inProgress}
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-purple-200 bg-purple-50/30 shadow-xs">
            <span className="text-[11px] font-semibold text-purple-800 uppercase tracking-wide">En attente</span>
            <p className="font-heading font-extrabold text-2xl text-purple-900 mt-1 tabular-nums">
              {kpis.awaitingCustomer}
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-emerald-200 bg-emerald-50/30 shadow-xs">
            <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wide">Terminées</span>
            <p className="font-heading font-extrabold text-2xl text-emerald-900 mt-1 tabular-nums">
              {kpis.completed}
            </p>
          </div>

          <div className="p-4 bg-white rounded-xl border border-rose-200 bg-rose-50/30 shadow-xs">
            <span className="text-[11px] font-semibold text-rose-800 uppercase tracking-wide">Annulées</span>
            <p className="font-heading font-extrabold text-2xl text-rose-900 mt-1 tabular-nums">
              {kpis.cancelled}
            </p>
          </div>
        </div>

        {/* Tab switch between Orders and Catalog */}
        <div className="flex items-center gap-2 border-b border-[#DCE9E0] pb-2">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-[#168447] text-white shadow-xs'
                : 'text-[#64756B] hover:text-[#173528]'
            }`}
          >
            Gestion des commandes ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer ${
              activeTab === 'catalog'
                ? 'bg-[#168447] text-white shadow-xs'
                : 'text-[#64756B] hover:text-[#173528]'
            }`}
          >
            Statuts du catalogue ({applications.length})
          </button>
        </div>

        {/* TAB 1: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            
            {/* Filters Row */}
            <div className="bg-white p-4 rounded-xl border border-[#DCE9E0] shadow-xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#64756B] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Recherche par réf, client, téléphone, application..."
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-[#DCE9E0] bg-[#F7FBF8] focus:bg-white text-[#173528]"
                />
              </div>

              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 text-xs rounded-lg border border-[#DCE9E0] bg-[#F7FBF8] text-[#173528]"
              >
                <option value="all">Tous les statuts</option>
                <option value="received">Nouvelle demande</option>
                <option value="reviewing">À l’étude</option>
                <option value="awaiting_customer">En attente du client</option>
                <option value="quoted">Devis envoyé</option>
                <option value="approved">Commande validée</option>
                <option value="in_progress">En cours</option>
                <option value="testing">Tests</option>
                <option value="ready">Prête</option>
                <option value="completed">Terminée</option>
                <option value="cancelled">Annulée</option>
              </select>

              {/* Type Filter */}
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 text-xs rounded-lg border border-[#DCE9E0] bg-[#F7FBF8] text-[#173528]"
              >
                <option value="all">Tous les types</option>
                <option value="Application existante">Application existante</option>
                <option value="Personnalisation">Personnalisation</option>
                <option value="Application sur mesure">Application sur mesure</option>
              </select>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-2xl border border-[#DCE9E0] shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#F7FBF8] border-b border-[#DCE9E0] text-[#64756B] uppercase font-semibold">
                    <tr>
                      <th className="py-3 px-4">Référence</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Client</th>
                      <th className="py-3 px-4">Téléphone</th>
                      <th className="py-3 px-4">Application</th>
                      <th className="py-3 px-4">Type</th>
                      <th className="py-3 px-4">Statut</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DCE9E0]">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-8 text-center text-[#64756B]">
                          Aucune commande ne correspond aux critères sélectionnés.
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-[#F7FBF8]/80 transition-colors">
                          <td className="py-3 px-4 font-mono-code font-bold text-[#168447]">
                            {ord.reference}
                          </td>
                          <td className="py-3 px-4 text-[#64756B] tabular-nums whitespace-nowrap">
                            {new Date(ord.created_at).toLocaleDateString('fr-FR')}
                          </td>
                          <td className="py-3 px-4 font-medium text-[#173528]">
                            <div>{ord.customer.full_name}</div>
                            <div className="text-[10px] text-[#64756B]">{ord.customer.city}</div>
                          </td>
                          <td className="py-3 px-4 text-[#64756B] font-mono-code whitespace-nowrap">
                            {ord.customer.phone}
                          </td>
                          <td className="py-3 px-4 text-[#173528] font-semibold">
                            {ord.application_name}
                          </td>
                          <td className="py-3 px-4 text-[#64756B]">
                            {ord.order_type}
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap">
                            <span className={`inline-block px-2.5 py-1 text-[11px] font-semibold rounded-lg border ${STATUS_DEFINITIONS[ord.status]?.color || 'bg-gray-100 text-gray-800'}`}>
                              {STATUS_DEFINITIONS[ord.status]?.label || ord.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right whitespace-nowrap">
                            <button
                              onClick={() => handleOpenDetail(ord)}
                              className="px-3 py-1.5 text-xs font-semibold text-[#168447] bg-[#E8F5EC] hover:bg-[#C9F0D5] rounded-lg transition-colors cursor-pointer"
                            >
                              Gérer
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: CATALOG MANAGEMENT */}
        {activeTab === 'catalog' && (
          <div className="bg-white rounded-2xl border border-[#DCE9E0] p-6 shadow-xs space-y-4">
            <div>
              <h3 className="font-heading font-bold text-base text-[#173528]">
                Contrôle de disponibilité des applications du catalogue
              </h3>
              <p className="text-xs text-[#64756B]">
                Conformément aux règles Univers Habakuk, une application ne doit jamais être présentée comme disponible si son statut n’a pas été validé par l’administrateur.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {applications.map((app) => (
                <div key={app.id} className="p-4 rounded-xl border border-[#DCE9E0] bg-[#F7FBF8] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#64756B] mb-1">
                      <span className="font-mono-code font-bold text-[#168447]">{app.id}</span>
                      <span>{app.category}</span>
                    </div>
                    <h4 className="font-heading font-bold text-sm text-[#173528]">{app.name}</h4>
                    <p className="text-xs text-[#64756B] mt-1 line-clamp-2">{app.description}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#DCE9E0] flex items-center justify-between">
                    <span className="text-xs text-[#173528] font-medium">Statut affiché :</span>
                    <select
                      value={app.status}
                      onChange={(e) => onUpdateAppStatus(app.id, e.target.value)}
                      className="text-xs py-1 px-2 rounded-lg border border-[#DCE9E0] bg-white text-[#173528] focus:border-[#168447]"
                    >
                      <option value="Projet / disponibilité à confirmer">Projet / disponibilité à confirmer</option>
                      <option value="Disponible sur commande">Disponible sur commande</option>
                      <option value="En développement actif">En développement actif</option>
                      <option value="Disponible immédiatement">Disponible immédiatement</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ORDER DETAIL & STATUS UPDATE MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div
            className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-[#DCE9E0] overflow-hidden flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-4 bg-[#F7FBF8] border-b border-[#DCE9E0] flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono-code text-sm font-extrabold text-[#168447]">
                    {selectedOrder.reference}
                  </span>
                  <span className="text-xs text-[#64756B]">· {selectedOrder.order_type}</span>
                </div>
                <h3 className="font-heading font-bold text-lg text-[#173528]">
                  {selectedOrder.application_name}
                </h3>
              </div>

              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 text-[#64756B] hover:text-[#173528] rounded-xl hover:bg-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              
              {updateSuccessMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Commande et message client mis à jour avec succès.</span>
                </div>
              )}

              {/* Client specs summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-[#F7FBF8] rounded-xl border border-[#DCE9E0] text-xs">
                <div>
                  <span className="text-[#64756B]">Client :</span>
                  <p className="font-bold text-[#173528] mt-0.5">{selectedOrder.customer.full_name}</p>
                  <p className="text-[#64756B]">{selectedOrder.customer.city}</p>
                </div>
                <div>
                  <span className="text-[#64756B]">Contact direct :</span>
                  <p className="font-bold text-[#173528] mt-0.5">{selectedOrder.customer.phone}</p>
                  <p className="text-[#64756B]">{selectedOrder.customer.email || 'Aucun e-mail spécifié'}</p>
                </div>
                <div>
                  <span className="text-[#64756B]">Plateformes souhaitées :</span>
                  <p className="font-semibold text-[#173528] mt-0.5">{selectedOrder.platform.join(', ')}</p>
                </div>
                <div>
                  <span className="text-[#64756B]">Budget & Délai :</span>
                  <p className="font-semibold text-[#173528] mt-0.5">{selectedOrder.budget} · {selectedOrder.deadline}</p>
                </div>
                <div className="sm:col-span-2 pt-2 border-t border-[#DCE9E0]">
                  <span className="text-[#64756B]">Besoin exprimé :</span>
                  <p className="text-[#173528] mt-1 whitespace-pre-wrap">{selectedOrder.details}</p>
                </div>
                {selectedOrder.attachment_url && (
                  <div className="sm:col-span-2 pt-2 border-t border-[#DCE9E0] text-[#168447] font-medium">
                    {selectedOrder.attachment_url}
                  </div>
                )}
              </div>

              {/* Status Update Form */}
              <form onSubmit={handleSaveOrderUpdates} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#173528] mb-1.5">
                      Statut de la commande
                    </label>
                    <select
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value as OrderStatus)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#DCE9E0] bg-white text-[#173528] font-semibold"
                    >
                      <option value="received">Nouvelle demande (reçue)</option>
                      <option value="reviewing">À l’étude (analyse technique)</option>
                      <option value="awaiting_customer">En attente du client</option>
                      <option value="quoted">Devis envoyé</option>
                      <option value="approved">Commande validée</option>
                      <option value="in_progress">En cours de réalisation</option>
                      <option value="testing">Tests et vérification</option>
                      <option value="ready">Prête à livrer</option>
                      <option value="completed">Terminée (livrée)</option>
                      <option value="cancelled">Annulée</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#173528] mb-1.5">
                      Note pour l'historique d'audit
                    </label>
                    <input
                      type="text"
                      value={editStatusNote}
                      onChange={(e) => setEditStatusNote(e.target.value)}
                      placeholder="Ex : Devis transmis par WhatsApp..."
                      className="w-full px-3 py-2 text-xs rounded-xl border border-[#DCE9E0] bg-white text-[#173528]"
                    />
                  </div>
                </div>

                {/* Message to customer (Visible on public tracking page) */}
                <div>
                  <label className="block text-xs font-semibold text-[#168447] mb-1.5 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Message public destiné au client (visible sur le suivi de commande)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={editAdminMessage}
                    onChange={(e) => setEditAdminMessage(e.target.value)}
                    placeholder="Ex : Étude de faisabilité validée. Nous entamons le maquettage..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#DCE9E0] bg-white text-[#173528]"
                  />
                </div>

                {/* Private internal notes */}
                <div>
                  <label className="block text-xs font-semibold text-[#64756B] mb-1.5">
                    Notes internes confidentielles (visibles uniquement par l'équipe)
                  </label>
                  <textarea
                    rows={2}
                    value={editInternalNotes}
                    onChange={(e) => setEditInternalNotes(e.target.value)}
                    placeholder="Ex : Développeur assigné, montant de l'acompte perçu..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-[#DCE9E0] bg-white text-[#173528]"
                  />
                </div>

                {/* Action button */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isUpdatingOrder}
                    className="px-5 py-2.5 text-xs font-semibold text-white bg-[#168447] hover:bg-[#0B5D32] rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{isUpdatingOrder ? 'Sauvegarde...' : 'Enregistrer les modifications'}</span>
                  </button>
                </div>

              </form>

              {/* Status Audit Trail */}
              <div className="pt-4 border-t border-[#DCE9E0]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#64756B] mb-3">
                  Journal d’audit des actions (Audit Log) :
                </h4>
                <div className="space-y-2 text-xs">
                  {selectedOrder.status_history.map((h, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-[#F7FBF8] border border-[#DCE9E0] flex justify-between items-center">
                      <div>
                        <span className="font-bold text-[#173528]">
                          {STATUS_DEFINITIONS[h.status]?.label || h.status}
                        </span>
                        <span className="text-[#64756B] ml-2">par {h.changed_by}</span>
                        {h.note && <div className="text-[11px] text-[#64756B] mt-0.5">{h.note}</div>}
                      </div>
                      <span className="text-[11px] text-[#64756B] font-mono-code whitespace-nowrap">
                        {new Date(h.changed_at).toLocaleString('fr-FR')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </section>
  );
};
