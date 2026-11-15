import express, { Request, Response, Router } from 'express';
import path from 'path';
import fs from 'fs';
import os from 'os';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import {
  SITE_CONFIG,
  INITIAL_APPLICATIONS,
  SERVICES,
  ORDER_STEPS,
  STATUS_DEFINITIONS
} from '../src/data/catalog';

function buildKnowledgeBasePrompt(): string {
  const appsList = INITIAL_APPLICATIONS.map(
    (app) =>
      `- [${app.id}] ${app.name} (Catégorie : ${app.category}) : ${app.description} Fonctionnalités clés : ${app.features.join(', ')}. Statut : ${app.status}. Fiche PDF téléchargeable et aperçu démo disponibles sur le site.`
  ).join('\n');

  const servicesList = SERVICES.map(
    (srv, idx) => `${idx + 1}. ${srv.name} : ${srv.description}`
  ).join('\n');

  const stepsList = ORDER_STEPS.map(
    (step) => `Étape ${step.number} (${step.title}) : ${step.description}`
  ).join('\n');

  const statusesList = Object.values(STATUS_DEFINITIONS)
    .map((s) => `- ${s.label} : ${s.description}`)
    .join('\n');

  return `Tu es l’assistant client officiel de "${SITE_CONFIG.name}" (${SITE_CONFIG.short_name}), une plateforme numérique basée à ${SITE_CONFIG.contact.address} et conçue par ${SITE_CONFIG.creator_credit.replace('Conçu par ', '')}.

RÈGLES STRICTES :
1. Réponds UNIQUEMENT en français, avec un ton chaleureux, professionnel, clair et concis (3 à 6 phrases max sauf si le client demande la liste complète). N'utilise pas de syntaxe Markdown (pas d'astérisques ** ou *, pas de #) : écris en texte simple, lisible et bien structuré avec des retours à la ligne ou des tirets (-).
2. Base TOUTES tes réponses exclusivement sur les informations contenues dans l'application ci-dessous. N'invente jamais de prix, de délais garantis non mentionnés ou de fonctionnalités absentes.
3. Si une question porte sur un tarif précis non chiffré ou sur un besoin hors catalogue, explique que les tarifs sont confirmés sur devis gratuit et personnalisé, et invite le client à déposer une demande via l’onglet « Commander » ou à contacter directement l’équipe au ${SITE_CONFIG.contact.phone} (WhatsApp/Téléphone) ou par email à ${SITE_CONFIG.contact.email}.
4. Ne divulgue jamais d'informations sensibles d'administration (mots de passe ou notes internes).
5. Tu peux orienter le client vers les onglets du site : « Accueil », « Nos applications », « Nos services », « Commander », « Suivi de commande ».

INFORMATIONS GÉNÉRALES :
- Nom : ${SITE_CONFIG.name}
- Slogan : ${SITE_CONFIG.tagline}
- Description : ${SITE_CONFIG.description}
- Fondateur & Concepteur : Ahoret Jean Cyrille
- Localisation : ${SITE_CONFIG.contact.address}
- Téléphone & WhatsApp : ${SITE_CONFIG.contact.phone} (lien direct : https://wa.me/2250704002387)
- Email : ${SITE_CONFIG.contact.email}

CATALOGUE OFFICIEL (${INITIAL_APPLICATIONS.length} APPLICATIONS & PROJETS NUMÉRIQUES) :
${appsList}

NOS SERVICES (${SERVICES.length} PRESTATIONS) :
${servicesList}

COMMENT COMMANDER (PROCESSUS EN 4 ÉTAPES) :
${stepsList}

OPTIONS DU FORMULAIRE DE COMMANDE :
- Types de demande : Application existante, Personnalisation, Application sur mesure.
- Plateformes disponibles : Android, iPhone / iOS, Site web, Ordinateur.
- Fourchettes budgétaires indicatives : À convenir sur devis (recommandé), < 150 000 FCFA, 150 000 - 300 000 FCFA, 300 000 - 600 000 FCFA, > 600 000 FCFA.
- Délais souhaités : Urgent (< 1 semaine), 2 à 4 semaines, 1 à 2 mois, Flexible / Selon faisabilité.
- Pièce jointe : Possibilité de joindre un cahier des charges ou document.
- Confirmation : Génération immédiate d’une référence unique au format UHD-ANNÉE-XXXX (ex : UHD-2026-4821).

SUIVI DE COMMANDE EN DIRECT :
Les clients peuvent suivre l’avancement de leur projet à tout moment depuis l’onglet « Suivi de commande » en saisissant leur référence (UHD-2026-XXXX) ou leur numéro de téléphone.
Statuts possibles d'une commande :
${statusesList}

INCLUS DANS CHAQUE COMMANDE & GARANTIES :
- Devis préalable gratuit et détaillé (aucun tarif imposé sans validation conjointe).
- Code source ou déploiement sécurisé selon les termes du contrat.
- Formation et assistance de prise en main incluses.
- Personnalisation à l'identité visuelle du client (logo, couleurs, besoins métier).
- Respect strict de la confidentialité des données client et fiches catalogue téléchargeables en PDF A4 (individuellement ou tout le catalogue complet).`;
}

const INITIAL_ORDERS: any[] = [];

interface DailyStatRecord {
  date: string;
  views: number;
  uniqueVisitors: string[];
  pages: Record<string, number>;
}

let memoryOrders: any[] = [];
let memoryChatLogs: any[] = [];
let memoryStats: DailyStatRecord[] = [];

function resolveDataFile(filename: string, defaultContent: any[]): string | null {
  const isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
  const candidateDirs = isServerless
    ? [path.join(os.tmpdir(), 'univershabakuk-data')]
    : [path.resolve(process.cwd(), 'data'), path.join(os.tmpdir(), 'univershabakuk-data')];

  for (const dir of candidateDirs) {
    try {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      const file = path.join(dir, filename);
      if (!fs.existsSync(file)) {
        fs.writeFileSync(file, JSON.stringify(defaultContent, null, 2), 'utf-8');
      }
      return file;
    } catch {
      // Try next writable location
    }
  }
  return null;
}

function getOrders(): any[] {
  try {
    const file = resolveDataFile('orders.json', INITIAL_ORDERS);
    if (file && fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf-8');
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) {
        memoryOrders = parsed;
        return parsed;
      }
    }
  } catch {
    // Fallback to memoryOrders
  }
  return memoryOrders;
}

function saveOrders(orders: any[]): void {
  memoryOrders = orders;
  try {
    const file = resolveDataFile('orders.json', INITIAL_ORDERS);
    if (file) {
      fs.writeFileSync(file, JSON.stringify(orders, null, 2), 'utf-8');
    }
  } catch {
    // In-memory storage remains updated if filesystem is read-only
  }
}

function getChatLogs(): any[] {
  try {
    const file = resolveDataFile('chat_logs.json', []);
    if (file && fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf-8');
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) {
        memoryChatLogs = parsed;
        return parsed;
      }
    }
  } catch {
    // Fallback to memoryChatLogs
  }
  return memoryChatLogs;
}

function saveChatLogs(logs: any[]): void {
  memoryChatLogs = logs;
  try {
    const file = resolveDataFile('chat_logs.json', []);
    if (file) {
      fs.writeFileSync(file, JSON.stringify(logs, null, 2), 'utf-8');
    }
  } catch {
    // In-memory storage remains updated if filesystem is read-only
  }
}

function getAnalyticsRecords(): DailyStatRecord[] {
  try {
    const file = resolveDataFile('analytics.json', []);
    if (file && fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf-8');
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) {
        memoryStats = parsed;
        return parsed;
      }
    }
  } catch {
    // Fallback to memoryStats
  }
  return memoryStats;
}

function saveAnalyticsRecords(records: DailyStatRecord[]): void {
  memoryStats = records;
  try {
    const file = resolveDataFile('analytics.json', []);
    if (file) {
      fs.writeFileSync(file, JSON.stringify(records, null, 2), 'utf-8');
    }
  } catch {
    // In-memory storage remains updated if filesystem is read-only
  }
}

function toIsoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

function getMondayOfWeek(d: Date): Date {
  const copy = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  const day = copy.getUTCDay();
  const diff = day === 0 ? -6 : 1 - day;
  copy.setUTCDate(copy.getUTCDate() + diff);
  return copy;
}

const PAGE_LABELS: Record<string, string> = {
  accueil: 'Accueil',
  applications: 'Nos applications',
  services: 'Nos services',
  commande: 'Commander une application',
  suivi: 'Suivi de commande',
  statistiques: 'Statistiques',
  administration: 'Administration'
};

function computeStatsSummary(records: DailyStatRecord[]) {
  const now = new Date();
  const todayStr = toIsoDate(now);
  const recordMap = new Map<string, DailyStatRecord>();
  for (const r of records) {
    if (r && r.date) {
      recordMap.set(r.date, r);
    }
  }

  // Today
  const todayRec = recordMap.get(todayStr);
  const todayViews = todayRec?.views || 0;
  const todayUnique = Array.isArray(todayRec?.uniqueVisitors) ? todayRec.uniqueVisitors.length : 0;

  // Last 7 days (rolling weekly view)
  let weekViews = 0;
  const weekUniqueSet = new Set<string>();
  for (let i = 0; i < 7; i++) {
    const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - i));
    const rec = recordMap.get(toIsoDate(d));
    if (rec) {
      weekViews += rec.views || 0;
      (rec.uniqueVisitors || []).forEach((v) => weekUniqueSet.add(v));
    }
  }

  // Current calendar month (monthly view)
  const currentMonthPrefix = todayStr.slice(0, 7);
  let monthViews = 0;
  const monthUniqueSet = new Set<string>();
  for (const rec of records) {
    if (rec.date.startsWith(currentMonthPrefix)) {
      monthViews += rec.views || 0;
      (rec.uniqueVisitors || []).forEach((v) => monthUniqueSet.add(v));
    }
  }

  // All-time totals & page breakdown
  let totalViews = 0;
  const totalUniqueSet = new Set<string>();
  const pageCounts: Record<string, number> = {
    accueil: 0,
    applications: 0,
    services: 0,
    commande: 0,
    suivi: 0,
    statistiques: 0
  };

  for (const rec of records) {
    totalViews += rec.views || 0;
    (rec.uniqueVisitors || []).forEach((v) => totalUniqueSet.add(v));
    if (rec.pages) {
      for (const [pageKey, count] of Object.entries(rec.pages)) {
        if (pageKey !== 'administration') {
          pageCounts[pageKey] = (pageCounts[pageKey] || 0) + (Number(count) || 0);
        }
      }
    }
  }

  // Daily series (last 14 days, chronological)
  const dailySeries = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - i));
    const key = toIsoDate(d);
    const rec = recordMap.get(key);
    dailySeries.push({
      key,
      label: d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', timeZone: 'UTC' }),
      sublabel: d.toLocaleDateString('fr-FR', { weekday: 'short', timeZone: 'UTC' }),
      views: rec?.views || 0,
      uniqueVisitors: Array.isArray(rec?.uniqueVisitors) ? rec.uniqueVisitors.length : 0
    });
  }

  // Weekly series (last 8 calendar weeks, chronological)
  const currentMonday = getMondayOfWeek(now);
  const weeklySeries = [];
  for (let w = 7; w >= 0; w--) {
    const weekStart = new Date(currentMonday);
    weekStart.setUTCDate(weekStart.getUTCDate() - w * 7);
    const weekEnd = new Date(weekStart);
    weekEnd.setUTCDate(weekEnd.getUTCDate() + 6);

    let wViews = 0;
    const wUnique = new Set<string>();
    for (let dOffset = 0; dOffset < 7; dOffset++) {
      const dayDate = new Date(weekStart);
      dayDate.setUTCDate(dayDate.getUTCDate() + dOffset);
      const rec = recordMap.get(toIsoDate(dayDate));
      if (rec) {
        wViews += rec.views || 0;
        (rec.uniqueVisitors || []).forEach((v) => wUnique.add(v));
      }
    }

    const startLabel = weekStart.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', timeZone: 'UTC' });
    const endLabel = weekEnd.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', timeZone: 'UTC' });
    weeklySeries.push({
      key: toIsoDate(weekStart),
      label: w === 0 ? 'Cette sem.' : `Sem. ${startLabel}`,
      sublabel: `${startLabel} – ${endLabel}`,
      views: wViews,
      uniqueVisitors: wUnique.size
    });
  }

  // Monthly series (last 6 months, chronological)
  const monthlySeries = [];
  for (let m = 5; m >= 0; m--) {
    const mDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - m, 1));
    const monthKey = mDate.toISOString().slice(0, 7);
    let mViews = 0;
    const mUnique = new Set<string>();
    for (const rec of records) {
      if (rec.date.startsWith(monthKey)) {
        mViews += rec.views || 0;
        (rec.uniqueVisitors || []).forEach((v) => mUnique.add(v));
      }
    }
    const rawLabel = mDate.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric', timeZone: 'UTC' });
    monthlySeries.push({
      key: monthKey,
      label: rawLabel.charAt(0).toUpperCase() + rawLabel.slice(1),
      sublabel: m === 0 ? 'Mois en cours' : undefined,
      views: mViews,
      uniqueVisitors: mUnique.size
    });
  }

  const pageBreakdown = Object.entries(pageCounts)
    .map(([page, views]) => ({
      page,
      label: PAGE_LABELS[page] || page,
      views
    }))
    .sort((a, b) => b.views - a.views);

  return {
    todayViews,
    todayUnique,
    weekViews,
    weekUnique: weekUniqueSet.size,
    monthViews,
    monthUnique: monthUniqueSet.size,
    totalViews,
    totalUnique: totalUniqueSet.size,
    dailySeries,
    weeklySeries,
    monthlySeries,
    pageBreakdown,
    lastUpdated: now.toISOString()
  };
}

export const apiRouter: Router = express.Router();

// 1. POST /orders - Create an order
apiRouter.post('/orders', (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    if (!orderData || !orderData.customer || !orderData.customer.full_name || !orderData.customer.phone) {
      return res.status(400).json({ success: false, error: 'Informations client obligatoires manquantes.' });
    }

    const orders = getOrders();
    orders.unshift(orderData);
    saveOrders(orders);

    return res.status(201).json({
      success: true,
      order: orderData,
      reference: orderData.reference
    });
  } catch (error) {
    console.error('Create order error:', error);
    return res.status(500).json({ success: false, error: 'Erreur lors de l’enregistrement de la commande.' });
  }
});

// 2. GET /orders/track - Track order by reference or phone
apiRouter.get('/orders/track', (req: Request, res: Response) => {
  try {
    const q = ((req.query.q as string) || '').trim().toLowerCase();
    if (!q) {
      return res.json({ success: true, orders: [] });
    }

    const orders = getOrders();
    const queryClean = q.replace(/[\s\-\+]/g, '');

    const matched = orders.filter((o: any) => {
      const refMatch = o.reference && o.reference.toLowerCase() === q;
      const phoneClean = (o.customer?.phone || '').replace(/[\s\-\+]/g, '');
      const phoneMatch = phoneClean.includes(queryClean) || queryClean.includes(phoneClean);
      return refMatch || (queryClean.length >= 6 && phoneMatch);
    });

    return res.json({ success: true, orders: matched });
  } catch (error) {
    console.error('Track order error:', error);
    return res.status(500).json({ success: false, error: 'Erreur lors de la recherche.' });
  }
});

// 3. POST /admin/login - Authenticate solely with administrator password
apiRouter.post('/admin/login', (req: Request, res: Response) => {
  const { password } = req.body || {};

  if (password === 'Ahoret@77') {
    return res.json({
      success: true,
      user: {
        id: 'usr-admin-1',
        name: 'Ahoret Jean Cyrille',
        email: 'ahoretjeancyrille777@gmail.com',
        role: 'super_admin',
        token: 'token-admin-' + Date.now()
      }
    });
  }

  return res.status(401).json({ success: false, error: 'Mot de passe incorrect.' });
});

// 4. GET /admin/orders - List all orders
apiRouter.get('/admin/orders', (_req: Request, res: Response) => {
  try {
    const orders = getOrders();
    return res.json({ success: true, orders });
  } catch {
    return res.status(500).json({ success: false, error: 'Erreur de lecture.' });
  }
});

// 5. GET /admin/orders/export - CSV export (registered before :id route)
apiRouter.get('/admin/orders/export', (_req: Request, res: Response) => {
  try {
    const orders = getOrders();
    const headers = ['Référence', 'Date', 'Client', 'Téléphone', 'Email', 'Ville', 'Application', 'Type', 'Plateforme', 'Budget', 'Délai', 'Statut'];
    const rows = orders.map((o: any) => [
      `"${o.reference || ''}"`,
      `"${o.created_at || ''}"`,
      `"${(o.customer?.full_name || '').replace(/"/g, '""')}"`,
      `"${(o.customer?.phone || '').replace(/"/g, '""')}"`,
      `"${(o.customer?.email || '').replace(/"/g, '""')}"`,
      `"${(o.customer?.city || '').replace(/"/g, '""')}"`,
      `"${(o.application_name || '').replace(/"/g, '""')}"`,
      `"${(o.order_type || '').replace(/"/g, '""')}"`,
      `"${(Array.isArray(o.platform) ? o.platform.join(', ') : '').replace(/"/g, '""')}"`,
      `"${(o.budget || '').replace(/"/g, '""')}"`,
      `"${(o.deadline || '').replace(/"/g, '""')}"`,
      `"${(o.status || '').replace(/"/g, '""')}"`
    ].join(','));

    const csvContent = [headers.join(','), ...rows].join('\n');

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="univershabakuk_commandes.csv"');
    return res.send(csvContent);
  } catch (error) {
    console.error('Export CSV error:', error);
    return res.status(500).send('Erreur lors de l’export CSV.');
  }
});

// 6. GET /admin/orders/:id - Get single order
apiRouter.get('/admin/orders/:id', (req: Request, res: Response) => {
  const orders = getOrders();
  const found = orders.find((o: any) => o.id === req.params.id);
  if (!found) {
    return res.status(404).json({ success: false, error: 'Commande introuvable.' });
  }
  return res.json({ success: true, order: found });
});

// 7. PATCH /admin/orders/:id - Update order status, message, notes
apiRouter.patch('/admin/orders/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, admin_message, internal_notes, status_note, operatorName } = req.body || {};
    const orders = getOrders();
    const index = orders.findIndex((o: any) => o.id === id);

    if (index === -1) {
      return res.status(404).json({ success: false, error: 'Commande introuvable.' });
    }

    const current = orders[index];
    const statusChanged = status && status !== current.status;
    const newStatus = status || current.status;

    const history = Array.isArray(current.status_history) ? [...current.status_history] : [];
    if (statusChanged) {
      history.push({
        status: newStatus,
        changed_at: new Date().toISOString(),
        changed_by: operatorName || 'Administrateur',
        note: status_note || `Statut mis à jour vers: ${newStatus}`
      });
    }

    const updated = {
      ...current,
      status: newStatus,
      admin_message: admin_message !== undefined ? admin_message : current.admin_message,
      internal_notes: internal_notes !== undefined ? internal_notes : current.internal_notes,
      updated_at: new Date().toISOString(),
      status_history: history
    };

    orders[index] = updated;
    saveOrders(orders);

    return res.json({ success: true, order: updated });
  } catch (error) {
    console.error('Update order error:', error);
    return res.status(500).json({ success: false, error: 'Erreur lors de la mise à jour.' });
  }
});

// 7b. DELETE /admin/orders - Clear all orders
apiRouter.delete('/admin/orders', (_req: Request, res: Response) => {
  try {
    saveOrders([]);
    return res.json({ success: true, orders: [] });
  } catch {
    return res.status(500).json({ success: false, error: 'Erreur lors de la suppression des commandes.' });
  }
});

// 8. POST /chat - Grounded AI customer assistant powered by Gemini
apiRouter.post('/chat', async (req: Request, res: Response) => {
  try {
    const { message, history, sessionId } = req.body || {};
    if (typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ success: false, error: 'Veuillez saisir une question.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        success: false,
        error: 'Le service assistant est momentanément indisponible. Vous pouvez nous contacter directement sur WhatsApp au +225 07 04 00 23 87.'
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });

    const formattedHistory = Array.isArray(history)
      ? history
          .filter(
            (item: any) =>
              item &&
              (item.role === 'user' || item.role === 'model') &&
              typeof item.text === 'string' &&
              item.text.trim().length > 0
          )
          .slice(-10)
          .map((item: any) => ({
            role: item.role as 'user' | 'model',
            parts: [{ text: item.text.trim() }]
          }))
      : [];

    const chat = ai.chats.create({
      model: 'gemini-4-hydrogen',
      config: {
        systemInstruction: buildKnowledgeBasePrompt(),
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.LOW
        }
      },
      history: formattedHistory
    });

    const cleanQuestion = message.trim().slice(0, 2000);
    const response = await chat.sendMessage({
      message: cleanQuestion
    });

    const reply = (response.text || '').trim();
    if (!reply) {
      return res.status(502).json({
        success: false,
        error: 'Aucune réponse générée. Veuillez reformuler votre question.'
      });
    }

    // Record exchange for administrator traceability
    const exchange = {
      id: 'chat-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      session_id: typeof sessionId === 'string' && sessionId.trim() ? sessionId.trim() : 'session-' + Date.now(),
      user_message: cleanQuestion,
      bot_reply: reply,
      created_at: new Date().toISOString()
    };
    const logs = getChatLogs();
    logs.unshift(exchange);
    saveChatLogs(logs.slice(0, 500));

    return res.json({ success: true, reply, exchange });
  } catch (error: any) {
    const status = error?.status || error?.statusCode || 500;
    const rawMsg = String(error?.message || error || '');
    console.error('Chatbot Gemini error:', status, rawMsg);

    if (status === 400 || status === 403 || rawMsg.includes('API_KEY_INVALID') || rawMsg.includes('PERMISSION_DENIED')) {
      return res.status(status === 400 ? 400 : 403).json({
        success: false,
        error: 'Clé API Gemini manquante ou invalide. Vérifiez la clé GEMINI_API_KEY dans les paramètres (Settings > Secrets).'
      });
    }
    if (status === 429 || rawMsg.includes('RESOURCE_EXHAUSTED')) {
      return res.status(429).json({
        success: false,
        error: 'Le quota de l’assistant est momentanément atteint. Réessayez dans quelques instants ou contactez-nous au +225 07 04 00 23 87.'
      });
    }

    return res.status(500).json({
      success: false,
      error: 'Impossible de joindre l’assistant pour le moment. Veuillez réessayer ou nous contacter au +225 07 04 00 23 87.'
    });
  }
});

// 9. GET /admin/chats - List all chatbot exchanges for admin traceability
apiRouter.get('/admin/chats', (_req: Request, res: Response) => {
  try {
    const chats = getChatLogs();
    return res.json({ success: true, chats });
  } catch {
    return res.status(500).json({ success: false, error: 'Erreur de lecture de l’historique.' });
  }
});

// 10. GET /admin/chats/export - Export chatbot exchanges as CSV
apiRouter.get('/admin/chats/export', (_req: Request, res: Response) => {
  try {
    const chats = getChatLogs();
    const headers = ['ID', 'Session', 'Date', 'Question client', 'Réponse assistant'];
    const rows = chats.map((c: any) =>
      [
        `"${c.id || ''}"`,
        `"${(c.session_id || '').replace(/"/g, '""')}"`,
        `"${c.created_at || ''}"`,
        `"${(c.user_message || '').replace(/"/g, '""')}"`,
        `"${(c.bot_reply || '').replace(/"/g, '""')}"`
      ].join(',')
    );
    const csvContent = [headers.join(','), ...rows].join('\n');
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', 'attachment; filename="univershabakuk_echanges_chatbot.csv"');
    return res.send(csvContent);
  } catch {
    return res.status(500).send('Erreur lors de l’export CSV des échanges.');
  }
});

// 11. DELETE /admin/chats/:id - Delete a specific chat exchange
apiRouter.delete('/admin/chats/:id', (req: Request, res: Response) => {
  try {
    const logs = getChatLogs();
    const filtered = logs.filter((c: any) => c.id !== req.params.id);
    saveChatLogs(filtered);
    return res.json({ success: true });
  } catch {
    return res.status(500).json({ success: false, error: 'Erreur lors de la suppression.' });
  }
});

// 12. DELETE /admin/chats - Clear all chat exchanges
apiRouter.delete('/admin/chats', (_req: Request, res: Response) => {
  try {
    saveChatLogs([]);
    return res.json({ success: true });
  } catch {
    return res.status(500).json({ success: false, error: 'Erreur lors de la réinitialisation.' });
  }
});

// 13. POST /stats/visit - Record a real page view by an application user
apiRouter.post('/stats/visit', (req: Request, res: Response) => {
  try {
    const { visitorId, page } = req.body || {};
    const cleanPage = typeof page === 'string' && page.trim() ? page.trim().toLowerCase() : 'accueil';
    const cleanVisitor =
      typeof visitorId === 'string' && visitorId.trim()
        ? visitorId.trim().slice(0, 80)
        : 'anon-' + Date.now();

    const todayStr = toIsoDate(new Date());
    const records = getAnalyticsRecords();
    let todayRecord = records.find((r) => r.date === todayStr);

    if (!todayRecord) {
      todayRecord = {
        date: todayStr,
        views: 0,
        uniqueVisitors: [],
        pages: {}
      };
      records.push(todayRecord);
    }

    todayRecord.views = (todayRecord.views || 0) + 1;
    if (!Array.isArray(todayRecord.uniqueVisitors)) {
      todayRecord.uniqueVisitors = [];
    }
    if (!todayRecord.uniqueVisitors.includes(cleanVisitor)) {
      todayRecord.uniqueVisitors.push(cleanVisitor);
    }
    if (!todayRecord.pages) {
      todayRecord.pages = {};
    }
    todayRecord.pages[cleanPage] = (todayRecord.pages[cleanPage] || 0) + 1;

    saveAnalyticsRecords(records.slice(-365));

    return res.json({
      success: true,
      stats: computeStatsSummary(records)
    });
  } catch (error) {
    console.error('Record visit error:', error);
    return res.status(500).json({ success: false, error: 'Erreur d’enregistrement des statistiques.' });
  }
});

// 14. GET /stats - Return daily, weekly, and monthly visitor view statistics
apiRouter.get('/stats', (_req: Request, res: Response) => {
  try {
    const records = getAnalyticsRecords();
    return res.json({
      success: true,
      stats: computeStatsSummary(records)
    });
  } catch {
    return res.status(500).json({ success: false, error: 'Erreur de lecture des statistiques.' });
  }
});

// Vercel Serverless Express App
const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRouter);
app.use('/', apiRouter);

export default app;
