import { LeadMagnet, NavItem } from './types';

export const SITE_CONFIG = {
  name: 'Sabrina Hänggi',
  role: 'Dipl. Pflegefachfrau HF',
  phone: '+34 682 187 615',
  whatsappUrl: 'https://wa.me/34682187615',
  email: 'haenggi.sabrina@gmail.com',
  facebookUrl: 'https://www.facebook.com/sabrina.haenggi?locale=de_DE',
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Leistungen', href: '/#services' },
  { label: 'Über Sabrina', href: '/#about' },
  { label: 'Für Angehörige', href: '/#families' },
  { label: 'Downloads', href: '/downloads' },
  { label: 'Kontakt', href: '/#contact' },
];

export const LEAD_MAGNETS: LeadMagnet[] = [
  {
    slug: 'pflege-checkliste',
    title: 'Pflege auf Lanzarote organisieren: 12-Schritte-Checkliste',
    description: 'Vermeiden Sie die häufigsten Fehler bei der Organisation. Eine klare Schritt-für-Schritt Anleitung für einen sicheren Start.',
    fileName: 'pflege-checkliste.pdf',
    icon: 'checklist',
  },
  {
    slug: 'notfallmappe',
    title: 'Notfallmappe: Kontakte, Medikamente, Dokumente',
    description: 'Im Ernstfall zählt jede Sekunde. Diese Vorlage bündelt alle lebenswichtigen Informationen für Ärzte und Sanitäter.',
    fileName: 'notfallmappe.pdf',
    icon: 'file',
  },
  {
    slug: 'ebook-entlastung',
    title: 'E-Book: Entlastung für Angehörige',
    description: 'Abläufe verstehen, Fragen klären, nächste Schritte planen. Ein Leitfaden für Familien aus dem DACH-Raum.',
    fileName: 'ebook-entlastung.pdf',
    icon: 'book',
  },
];