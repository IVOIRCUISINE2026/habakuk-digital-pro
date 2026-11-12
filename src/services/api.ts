import { Order, OrderStatus, ApplicationItem, User } from '../types';
import { INITIAL_APPLICATIONS, INITIAL_ORDERS } from '../data/catalog';

const STORAGE_KEYS = {
  ORDERS: 'univershabakuk_orders_v1',
  APPLICATIONS: 'univershabakuk_apps_v1',
  AUTH_USER: 'univershabakuk_admin_user_v1'
};

function getLocalOrders(): Order[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to get local orders', e);
    return INITIAL_ORDERS;
  }
}

function saveLocalOrders(orders: Order[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  } catch (e) {
    console.error('Failed to save local orders', e);
  }
}

function getLocalApplications(): ApplicationItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(INITIAL_APPLICATIONS));
      return INITIAL_APPLICATIONS;
    }
    const parsed: ApplicationItem[] = JSON.parse(raw);
    // Ensure all applications have the latest image_url
    return parsed.map(app => {
      const initial = INITIAL_APPLICATIONS.find(a => a.id === app.id);
      return {
        ...app,
        image_url: initial?.image_url || app.image_url
      };
    });
  } catch (e) {
    return INITIAL_APPLICATIONS;
  }
}

function saveLocalApplications(apps: ApplicationItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.APPLICATIONS, JSON.stringify(apps));
  } catch (e) {
    console.error('Failed to save local applications', e);
  }
}

// Generate human-readable reference: UHD-2026-XXXX
export function generateOrderReference(): string {
  const currentYear = new Date().getFullYear();
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `UHD-${currentYear}-${randomDigits}`;
}

export const api = {
  // 1. Submit an order
  async createOrder(data: {
    customer: {
      full_name: string;
      phone: string;
      email?: string;
      city: string;
    };
    application_id: string;
    application_name: string;
    order_type: 'Application existante' | 'Personnalisation' | 'Application sur mesure';
    platform: string[];
    budget?: string;
    deadline?: string;
    details: string;
    attachment_url?: string;
  }): Promise<{ success: boolean; order: Order; reference: string }> {
    const reference = generateOrderReference();
    const newOrder: Order = {
      id: 'ord-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      reference,
      customer: data.customer,
      application_id: data.application_id,
      application_name: data.application_name,
      order_type: data.order_type,
      platform: data.platform,
      budget: data.budget || "À déterminer",
      deadline: data.deadline || "Flexible",
      details: data.details,
      attachment_url: data.attachment_url,
      status: 'received',
      admin_message: "Votre demande a bien été enregistrée par Univers Habakuk Digital Pro. Notre équipe étudie votre dossier et vous contactera dans les plus brefs délais.",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      status_history: [
        {
          status: 'received',
          changed_at: new Date().toISOString(),
          changed_by: 'Système Univers Habakuk',
          note: 'Enregistrement initial de la commande'
        }
      ]
    };

    // Try server first
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder)
      });
      if (res.ok) {
        const json = await res.json();
        // also sync locally
        const local = getLocalOrders();
        saveLocalOrders([json.order, ...local.filter(o => o.reference !== json.order.reference)]);
        return json;
      }
    } catch {
      // Fallback to local
    }

    // Local fallback
    const orders = getLocalOrders();
    const updated = [newOrder, ...orders];
    saveLocalOrders(updated);
    return { success: true, order: newOrder, reference };
  },

  // 2. Track order by reference or phone
  async trackOrder(query: string): Promise<{ success: boolean; orders: Order[] }> {
    const trimmed = query.trim().toLowerCase();
    
    // Try server first
    try {
      const res = await fetch(`/api/orders/track?q=${encodeURIComponent(trimmed)}`);
      if (res.ok) {
        const json = await res.json();
        return json;
      }
    } catch {
      // Fallback
    }

    // Local lookup
    const all = getLocalOrders();
    const matches = all.filter(o => {
      const refMatch = o.reference.toLowerCase() === trimmed;
      const phoneClean = o.customer.phone.replace(/[\s\-\+]/g, '');
      const queryClean = trimmed.replace(/[\s\-\+]/g, '');
      const phoneMatch = phoneClean.includes(queryClean) || queryClean.includes(phoneClean);
      return refMatch || (queryClean.length >= 6 && phoneMatch);
    });

    return { success: true, orders: matches };
  },

  // 3. Admin Login (solely with administrator password)
  async adminLogin(password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    // Try server first
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.user) {
          localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(json.user));
        }
        return json;
      }
    } catch {
      // Fallback
    }

    // Local fallback validation
    if (password === 'Ahoret@77') {
      const user: User = {
        id: 'usr-admin-1',
        name: 'Ahoret Jean Cyrille',
        email: 'ahoretjeancyrille777@gmail.com',
        role: 'super_admin',
        token: 'token-super-admin-' + Date.now()
      };
      localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));
      return { success: true, user };
    }

    return { success: false, error: 'Mot de passe incorrect.' };
  },

  // Get current logged in user
  getStoredUser(): User | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  logoutUser(): void {
    localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
  },

  // 4. Admin Get Orders
  async getAdminOrders(): Promise<Order[]> {
    try {
      const res = await fetch('/api/admin/orders');
      if (res.ok) {
        const json = await res.json();
        if (Array.isArray(json.orders)) {
          saveLocalOrders(json.orders);
          return json.orders;
        }
      }
    } catch {
      // Fallback
    }
    return getLocalOrders();
  },

  // 5. Admin Update Order (status, admin_message, internal_notes)
  async updateOrder(orderId: string, updates: {
    status?: OrderStatus;
    admin_message?: string;
    internal_notes?: string;
    status_note?: string;
    operatorName?: string;
  }): Promise<{ success: boolean; order?: Order }> {
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (res.ok) {
        const json = await res.json();
        if (json.order) {
          const local = getLocalOrders();
          saveLocalOrders(local.map(o => o.id === orderId ? json.order : o));
          return { success: true, order: json.order };
        }
      }
    } catch {
      // Fallback
    }

    // Local update
    const orders = getLocalOrders();
    const target = orders.find(o => o.id === orderId);
    if (!target) return { success: false };

    const statusChanged = updates.status && updates.status !== target.status;
    const newStatus = updates.status || target.status;

    const newHistory = [...target.status_history];
    if (statusChanged) {
      newHistory.push({
        status: newStatus,
        changed_at: new Date().toISOString(),
        changed_by: updates.operatorName || 'Administrateur',
        note: updates.status_note || `Statut modifié vers "${newStatus}"`
      });
    }

    const updatedOrder: Order = {
      ...target,
      status: newStatus,
      admin_message: updates.admin_message !== undefined ? updates.admin_message : target.admin_message,
      internal_notes: updates.internal_notes !== undefined ? updates.internal_notes : target.internal_notes,
      updated_at: new Date().toISOString(),
      status_history: newHistory
    };

    const nextOrders = orders.map(o => o.id === orderId ? updatedOrder : o);
    saveLocalOrders(nextOrders);
    return { success: true, order: updatedOrder };
  },

  // 6. Reset or seed data
  resetOrdersToDefault(): Order[] {
    saveLocalOrders(INITIAL_ORDERS);
    return INITIAL_ORDERS;
  },

  // 7. Applications
  getApplications(): ApplicationItem[] {
    return getLocalApplications();
  },

  updateApplicationStatus(appId: string, newStatus: string): ApplicationItem[] {
    const apps = getLocalApplications();
    const updated = apps.map(a => a.id === appId ? { ...a, status: newStatus } : a);
    saveLocalApplications(updated);
    return updated;
  }
};
