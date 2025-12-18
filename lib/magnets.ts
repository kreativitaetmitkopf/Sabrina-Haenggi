import { LeadMagnet } from '../types';

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

export function getMagnetBySlug(slug: string): LeadMagnet | undefined {
  return LEAD_MAGNETS.find((m) => m.slug === slug);
}
