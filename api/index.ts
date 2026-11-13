import express, { Request, Response, Router } from 'express';
import path from 'path';
import fs from 'fs';
import os from 'os';

const INITIAL_ORDERS = [
  {
    id: "ord-1",
    reference: "UHD-2026-4821",
    customer: {
      full_name: "Kouamé Eric N'Guessan",
      phone: "+225 07 45 12 89 00",
      email: "eric.kouame@example.ci",
      city: "Abidjan, Cocody"
    },
    application_id: "APP-001",
    application_name: "IVOIR’EDUC PRO",
    order_type: "Personnalisation",
    platform: ["Android", "Site web"],
    budget: "150 000 - 300 000 FCFA",
    deadline: "3 semaines",
    details: "Nous souhaitons adapter IVOIR’EDUC PRO pour notre groupe scolaire à Cocody avec l'intégration des devoirs du premier trimestre et le logo de l'établissement.",
    status: "in_progress",
    admin_message: "Étude technique validée. Intégration de la charte graphique de votre école en cours. Maquette prévue sous 48h.",
    internal_notes: "Client sérieux. Acompte reçu. Développeur assigné: Cyrille.",
    created_at: "2026-11-10T08:30:00.000Z",
    updated_at: "2026-11-11T14:20:00.000Z",
    status_history: [
      {
        status: "received",
        changed_at: "2026-11-10T08:30:00.000Z",
        changed_by: "Système",
        note: "Demande enregistrée en ligne"
      },
      {
        status: "reviewing",
        changed_at: "2026-11-10T11:00:00.000Z",
        changed_by: "Ahoret Jean Cyrille",
        note: "Analyse du cahier des charges transmise"
      },
      {
        status: "quoted",
        changed_at: "2026-11-10T16:15:00.000Z",
        changed_by: "Ahoret Jean Cyrille",
        note: "Devis N°DEV-2026-088 transmis par WhatsApp"
      },
      {
        status: "approved",
        changed_at: "2026-11-11T09:00:00.000Z",
        changed_by: "Kouamé Eric N'Guessan",
        note: "Devis approuvé avec succès"
      },
      {
        status: "in_progress",
        changed_at: "2026-11-11T14:20:00.000Z",
        changed_by: "Ahoret Jean Cyrille",
        note: "Démarrage du paramétrage"
      }
    ]
  },
  {
    id: "ord-2",
    reference: "UHD-2026-7913",
    customer: {
      full_name: "Mariam Bakayoko",
      phone: "+225 05 66 33 22 11",
      email: "mariam.b@events-abidjan.ci",
      city: "Abidjan, Marcory"
    },
    application_id: "APP-009",
    application_name: "Ahoret Carte Event",
    order_type: "Application existante",
    platform: ["Site web", "Android"],
    budget: "< 150 000 FCFA",
    deadline: "Urgent (< 1 semaine)",
    details: "Génération de 350 invitations avec QR Code unique pour une grande soirée de gala d'entreprise le samedi prochain.",
    status: "reviewing",
    admin_message: "Votre demande urgente est en cours d'analyse prioritaire. Notre équipe vous contacte par téléphone sous 2 heures.",
    internal_notes: "Gala d'entreprise. Priorité haute.",
    created_at: "2026-11-12T07:15:00.000Z",
    updated_at: "2026-11-12T07:45:00.000Z",
    status_history: [
      {
        status: "received",
        changed_at: "2026-11-12T07:15:00.000Z",
        changed_by: "Système",
        note: "Demande enregistrée en ligne"
      },
      {
        status: "reviewing",
        changed_at: "2026-11-12T07:45:00.000Z",
        changed_by: "Ahoret Jean Cyrille",
        note: "Prise en charge prioritaire"
      }
    ]
  }
];

let memoryOrders: any[] = [...INITIAL_ORDERS];

function resolveOrdersFile(): string | null {
  const isServerless = Boolean(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);
  const candidateDirs = isServerless
    ? [path.join(os.tmpdir(), 'univershabakuk-data')]
    : [path.resolve(process.cwd(), 'data'), path.join(os.tmpdir(), 'univershabakuk-data')];

  for (const dir of candidateDirs) {
    try {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      const file = path.join(dir, 'orders.json');
      if (!fs.existsSync(file)) {
        fs.writeFileSync(file, JSON.stringify(INITIAL_ORDERS, null, 2), 'utf-8');
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
    const file = resolveOrdersFile();
    if (file && fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf-8');
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed) && parsed.length > 0) {
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
    const file = resolveOrdersFile();
    if (file) {
      fs.writeFileSync(file, JSON.stringify(orders, null, 2), 'utf-8');
    }
  } catch {
    // In-memory storage remains updated if filesystem is read-only
  }
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

// Vercel Serverless Express App
const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRouter);
app.use('/', apiRouter);

export default app;
