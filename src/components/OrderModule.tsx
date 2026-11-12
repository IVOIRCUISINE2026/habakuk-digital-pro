import React, { useState, useEffect } from 'react';
import { Check, Copy, AlertCircle, ArrowRight, MessageSquare, Send, Upload, FileText, Smartphone, Laptop, Globe, Monitor } from 'lucide-react';
import { ApplicationItem, Order } from '../types';
import { api } from '../services/api';
import { SITE_CONFIG } from '../data/catalog';

interface OrderModuleProps {
  applications: ApplicationItem[];
  preSelectedAppId?: string;
  onOrderSuccess: (order: Order) => void;
  onTrackOrder: (reference: string) => void;
}

export const OrderModule: React.FC<OrderModuleProps> = ({
  applications,
  preSelectedAppId,
  onOrderSuccess,
  onTrackOrder
}) => {
  // Form fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Abidjan, Côte d’Ivoire');
  const [appId, setAppId] = useState(preSelectedAppId || 'APP-001');
  const [orderType, setOrderType] = useState<'Application existante' | 'Personnalisation' | 'Application sur mesure'>('Application existante');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['Android', 'Site web']);
  const [budget, setBudget] = useState('À convenir sur devis');
  const [deadline, setDeadline] = useState('2 à 4 semaines');
  const [details, setDetails] = useState('');
  const [attachmentName, setAttachmentName] = useState<string | null>(null);
  const [consent, setConsent] = useState(true);

  // Status & Confirmation
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  useEffect(() => {
    if (preSelectedAppId) {
      setAppId(preSelectedAppId);
    }
  }, [preSelectedAppId]);

  const platformOptions = [
    { label: 'Android', icon: Smartphone },
    { label: 'iPhone / iOS', icon: Smartphone },
    { label: 'Site web', icon: Globe },
    { label: 'Ordinateur', icon: Laptop },
  ];

  const budgetOptions = [
    'À convenir sur devis (recommandé)',
    '< 150 000 FCFA',
    '150 000 - 300 000 FCFA',
    '300 000 - 600 000 FCFA',
    '> 600 000 FCFA',
  ];

  const deadlineOptions = [
    'Urgent (< 1 semaine)',
    '2 à 4 semaines',
    '1 à 2 mois',
    'Flexible / Selon faisabilité',
  ];

  const togglePlatform = (p: string) => {
    if (selectedPlatforms.includes(p)) {
      setSelectedPlatforms(selectedPlatforms.filter(item => item !== p));
    } else {
      setSelectedPlatforms([...selectedPlatforms, p]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachmentName(`${file.name} (${Math.round(file.size / 1024)} Ko)`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validation
    if (!fullName.trim()) {
      setErrorMsg('Veuillez renseigner votre nom et prénoms.');
      return;
    }
    if (!phone.trim()) {
      setErrorMsg('Veuillez renseigner votre numéro de téléphone ou WhatsApp.');
      return;
    }
    if (!city.trim()) {
      setErrorMsg('Veuillez préciser votre ville ou pays de résidence.');
      return;
    }
    if (!details.trim() || details.trim().length < 10) {
      setErrorMsg('Veuillez décrire votre besoin ou projet en quelques phrases (minimum 10 caractères).');
      return;
    }
    if (!consent) {
      setErrorMsg('Veuillez accepter d’être contacté au sujet de votre commande.');
      return;
    }

    const selectedApp = applications.find(a => a.id === appId);
    const appName = appId === 'custom' ? 'Projet Numérique Sur Mesure' : (selectedApp?.name || 'Application Univers Habakuk');

    setIsSubmitting(true);

    try {
      const result = await api.createOrder({
        customer: {
          full_name: fullName.trim(),
          phone: phone.trim(),
          email: email.trim() || undefined,
          city: city.trim()
        },
        application_id: appId,
        application_name: appName,
        order_type: orderType,
        platform: selectedPlatforms.length > 0 ? selectedPlatforms : ['Site web'],
        budget,
        deadline,
        details: details.trim(),
        attachment_url: attachmentName ? `Fichier: ${attachmentName}` : undefined
      });

      if (result.success && result.order) {
        setConfirmedOrder(result.order);
        onOrderSuccess(result.order);
      } else {
        setErrorMsg('Une erreur est survenue lors de l’envoi. Veuillez réessayer.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Erreur de connexion. Votre commande a été conservée localement.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyReference = () => {
    if (confirmedOrder) {
      navigator.clipboard.writeText(confirmedOrder.reference);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  const handleResetForm = () => {
    setConfirmedOrder(null);
    setDetails('');
    setAttachmentName(null);
  };

  return (
    <section id="commande" className="py-16 lg:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#168447]">
            Formulaire de commande officiel
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#173528] mt-2">
            Commande d’application
          </h2>
          <p className="text-sm sm:text-base text-[#64756B] mt-3 leading-relaxed">
            Dites-nous ce dont vous avez besoin. Notre équipe vous recontactera pour confirmer les détails, le devis personnalisé et le calendrier de livraison.
          </p>
        </div>

        {/* Confirmation State View */}
        {confirmedOrder ? (
          <div className="rounded-2xl border border-[#C9F0D5] bg-[#F7FBF8] p-6 sm:p-10 shadow-lg animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-2xl bg-[#168447] text-white flex items-center justify-center mx-auto mb-5 shadow-sm">
              <Check className="w-7 h-7" />
            </div>

            <div className="text-center max-w-lg mx-auto">
              <h3 className="font-heading text-2xl font-bold text-[#173528]">
                Commande enregistrée avec succès !
              </h3>
              <p className="text-sm text-[#64756B] mt-2 leading-relaxed">
                Votre demande a bien été prise en compte par Univers Habakuk Digital Pro. Conservez précieusement votre numéro de référence pour suivre son évolution.
              </p>
            </div>

            {/* Reference Box */}
            <div className="my-8 p-5 bg-white rounded-xl border border-[#DCE9E0] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-[#64756B] uppercase tracking-wider font-semibold">
                  Numéro de référence unique :
                </span>
                <p className="font-mono-code text-2xl font-extrabold text-[#0B5D32] mt-0.5">
                  {confirmedOrder.reference}
                </p>
              </div>

              <button
                onClick={handleCopyReference}
                className="px-4 py-2.5 text-xs font-semibold rounded-lg border border-[#DCE9E0] hover:bg-[#E8F5EC] text-[#173528] flex items-center gap-2 transition-colors cursor-pointer"
              >
                {copiedRef ? <Check className="w-4 h-4 text-[#168447]" /> : <Copy className="w-4 h-4" />}
                <span>{copiedRef ? 'Référence copiée !' : 'Copier la référence'}</span>
              </button>
            </div>

            {/* Recap Summary */}
            <div className="p-4 bg-white rounded-xl border border-[#DCE9E0] text-xs space-y-2 mb-8">
              <div className="flex justify-between border-b border-[#DCE9E0] pb-2">
                <span className="text-[#64756B]">Client :</span>
                <strong className="text-[#173528]">{confirmedOrder.customer.full_name} ({confirmedOrder.customer.city})</strong>
              </div>
              <div className="flex justify-between border-b border-[#DCE9E0] pb-2">
                <span className="text-[#64756B]">Téléphone :</span>
                <strong className="text-[#173528]">{confirmedOrder.customer.phone}</strong>
              </div>
              <div className="flex justify-between border-b border-[#DCE9E0] pb-2">
                <span className="text-[#64756B]">Application :</span>
                <strong className="text-[#168447]">{confirmedOrder.application_name}</strong>
              </div>
              <div className="flex justify-between border-b border-[#DCE9E0] pb-2">
                <span className="text-[#64756B]">Type :</span>
                <strong className="text-[#173528]">{confirmedOrder.order_type}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64756B]">Plateformes :</span>
                <strong className="text-[#173528]">{confirmedOrder.platform.join(', ')}</strong>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => onTrackOrder(confirmedOrder.reference)}
                className="w-full sm:w-auto px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-[#168447] hover:bg-[#0B5D32] rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Accéder au suivi en direct</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/2250704002387?text=${encodeURIComponent(
                  `Bonjour Ahoret Jean Cyrille, je viens d'enregistrer ma commande Univers Habakuk N° ${confirmedOrder.reference} pour "${confirmedOrder.application_name}". Mon nom est ${confirmedOrder.customer.full_name}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3 text-xs sm:text-sm font-semibold text-[#0B5D32] bg-[#E8F5EC] hover:bg-[#C9F0D5] border border-[#C9F0D5] rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Notifier par WhatsApp</span>
              </a>

              <button
                onClick={handleResetForm}
                className="w-full sm:w-auto px-4 py-3 text-xs font-medium text-[#64756B] hover:text-[#173528] transition-colors"
              >
                Passer une autre commande
              </button>
            </div>
          </div>
        ) : (
          /* Main Order Form */
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-[#DCE9E0] bg-[#F7FBF8] p-6 sm:p-10 shadow-sm space-y-8"
          >
            {errorMsg && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Block 1: Coordonnées du client */}
            <div>
              <h3 className="font-heading font-bold text-base text-[#173528] pb-2 border-b border-[#DCE9E0]">
                1. Vos coordonnées de contact
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                
                <div>
                  <label className="block text-xs font-semibold text-[#173528] mb-1.5">
                    Nom et prénoms <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ex : Koffi Kouassi Ange"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DCE9E0] bg-white text-[#173528] focus:outline-none focus:ring-2 focus:ring-[#168447]/20 focus:border-[#168447]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#173528] mb-1.5">
                    Téléphone / WhatsApp <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ex : +225 07 00 00 00 00"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DCE9E0] bg-white text-[#173528] focus:outline-none focus:ring-2 focus:ring-[#168447]/20 focus:border-[#168447]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#173528] mb-1.5">
                    Adresse e-mail <span className="text-[#64756B] font-normal">(Optionnel)</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="exemple@email.com"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DCE9E0] bg-white text-[#173528] focus:outline-none focus:ring-2 focus:ring-[#168447]/20 focus:border-[#168447]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#173528] mb-1.5">
                    Ville / Pays <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Ex : Abidjan, Bouaké, San-Pédro..."
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DCE9E0] bg-white text-[#173528] focus:outline-none focus:ring-2 focus:ring-[#168447]/20 focus:border-[#168447]"
                  />
                </div>

              </div>
            </div>

            {/* Block 2: Choix de l'application & Type de commande */}
            <div>
              <h3 className="font-heading font-bold text-base text-[#173528] pb-2 border-b border-[#DCE9E0]">
                2. Application souhaitée & Type de commande
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                
                <div>
                  <label className="block text-xs font-semibold text-[#173528] mb-1.5">
                    Application du catalogue <span className="text-rose-600">*</span>
                  </label>
                  <select
                    value={appId}
                    onChange={(e) => setAppId(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DCE9E0] bg-white text-[#173528] focus:outline-none focus:ring-2 focus:ring-[#168447]/20 focus:border-[#168447]"
                  >
                    <option value="custom">✨ Autre projet numérique / Sur mesure</option>
                    {applications.map((app) => (
                      <option key={app.id} value={app.id}>
                        {app.id} — {app.name} ({app.category})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#173528] mb-1.5">
                    Type de commande <span className="text-rose-600">*</span>
                  </label>
                  <select
                    value={orderType}
                    onChange={(e) => setOrderType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DCE9E0] bg-white text-[#173528] focus:outline-none focus:ring-2 focus:ring-[#168447]/20 focus:border-[#168447]"
                  >
                    <option value="Application existante">Application existante (prête à l'emploi)</option>
                    <option value="Personnalisation">Personnalisation (avec votre marque & options)</option>
                    <option value="Application sur mesure">Application sur mesure (création complète)</option>
                  </select>
                </div>

              </div>

              {/* Platform multi-select */}
              <div className="mt-4">
                <label className="block text-xs font-semibold text-[#173528] mb-2">
                  Plateforme(s) cible(s) souhaitée(s) :
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {platformOptions.map((opt) => {
                    const active = selectedPlatforms.includes(opt.label);
                    const Icon = opt.icon;
                    return (
                      <button
                        type="button"
                        key={opt.label}
                        onClick={() => togglePlatform(opt.label)}
                        className={`p-3 rounded-xl border text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          active
                            ? 'bg-[#E8F5EC] border-[#168447] text-[#0B5D32] shadow-xs'
                            : 'bg-white border-[#DCE9E0] text-[#64756B] hover:text-[#173528]'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${active ? 'text-[#168447]' : 'text-[#64756B]'}`} />
                        <span>{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Block 3: Budget, Délai & Cahier des charges */}
            <div>
              <h3 className="font-heading font-bold text-base text-[#173528] pb-2 border-b border-[#DCE9E0]">
                3. Détails techniques & Cahier des charges
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-xs font-semibold text-[#173528] mb-1.5">
                    Budget indicatif
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DCE9E0] bg-white text-[#173528] focus:outline-none focus:ring-2 focus:ring-[#168447]/20 focus:border-[#168447]"
                  >
                    {budgetOptions.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#173528] mb-1.5">
                    Délai souhaité
                  </label>
                  <select
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DCE9E0] bg-white text-[#173528] focus:outline-none focus:ring-2 focus:ring-[#168447]/20 focus:border-[#168447]"
                  >
                    {deadlineOptions.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="mt-4">
                <label className="block text-xs font-semibold text-[#173528] mb-1.5">
                  Décrivez votre besoin en détail <span className="text-rose-600">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Précisez vos objectifs, le public cible, les fonctionnalités prioritaires ou vos contraintes particulières..."
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-[#DCE9E0] bg-white text-[#173528] focus:outline-none focus:ring-2 focus:ring-[#168447]/20 focus:border-[#168447] leading-relaxed"
                />
              </div>

              {/* Attachment field */}
              <div className="mt-4">
                <label className="block text-xs font-semibold text-[#173528] mb-1.5">
                  Document ou image de référence <span className="text-[#64756B] font-normal">(Optionnel - PDF, Word, Image)</span>
                </label>
                <div className="flex items-center gap-3">
                  <label className="px-4 py-2.5 text-xs font-medium text-[#173528] bg-white border border-[#DCE9E0] hover:bg-[#E8F5EC] rounded-xl cursor-pointer transition-colors flex items-center gap-2">
                    <Upload className="w-4 h-4 text-[#168447]" />
                    <span>Sélectionner un fichier</span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileUpload}
                      accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                    />
                  </label>
                  {attachmentName && (
                    <span className="text-xs text-[#0B5D32] font-medium flex items-center gap-1.5 bg-[#E8F5EC] px-3 py-1.5 rounded-lg border border-[#C9F0D5]">
                      <FileText className="w-3.5 h-3.5" />
                      <span>{attachmentName}</span>
                    </span>
                  )}
                </div>
              </div>

            </div>

            {/* Consent & Submit */}
            <div className="pt-4 border-t border-[#DCE9E0] space-y-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-[#168447] border-[#DCE9E0] focus:ring-[#168447]"
                />
                <span className="text-xs text-[#64756B] leading-relaxed">
                  J’accepte d’être recontacté(e) par l'équipe d'Univers Habakuk Digital Pro au sujet de cette commande et confirme l'exactitude de mes coordonnées.
                </span>
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold text-white bg-[#168447] hover:bg-[#0B5D32] rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Enregistrement en cours...</span>
                ) : (
                  <>
                    <span>Envoyer ma commande</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </section>
  );
};
