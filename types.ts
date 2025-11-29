export interface LeadMagnet {
  slug: string;
  title: string;
  description: string;
  fileName: string;
  icon: 'file' | 'book' | 'checklist';
}

export interface LeadFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  consent: boolean;
  honeypot?: string;
}

export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}