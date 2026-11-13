export type OrderStatus =
  | 'received'
  | 'reviewing'
  | 'awaiting_customer'
  | 'quoted'
  | 'approved'
  | 'in_progress'
  | 'testing'
  | 'ready'
  | 'completed'
  | 'cancelled';

export interface StatusHistoryItem {
  status: OrderStatus;
  changed_at: string;
  changed_by: string;
  note?: string;
}

export interface ApplicationItem {
  id: string;
  name: string;
  category: 'Éducation et formation' | 'Création numérique et IA' | 'Gestion et services' | 'Jeux et divertissement' | 'Cuisine';
  description: string;
  features: string[];
  status: string;
  orderable: boolean;
  demoType?: 'code_generator' | 'calendar_designer' | 'quiz_chretien' | 'prompt_generator' | 'cv_builder' | 'cuisine_recipe' | 'interactive_feature';
  image_url?: string;
  pdf_catalog_url?: string;
}

export interface ServiceItem {
  name: string;
  description: string;
  iconName?: string;
}

export interface Order {
  id: string;
  reference: string;
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
  status: OrderStatus;
  admin_message?: string;
  internal_notes?: string;
  created_at: string;
  updated_at: string;
  status_history: StatusHistoryItem[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'manager';
  token?: string;
}

export interface StepItem {
  number: number;
  title: string;
  description: string;
}
