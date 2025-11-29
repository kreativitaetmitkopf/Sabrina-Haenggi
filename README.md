# Sabrina Hänggi - Pflege Lanzarote Website

This project is a high-performance web application built with React, TypeScript, and Tailwind CSS. It is designed to act as a lead generation tool for mobile care services on Lanzarote.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1.  Clone the repository
2.  Install dependencies:
    ```bash
    pnpm install
    # Dependencies needed: react, react-dom, react-router-dom, lucide-react, clsx, tailwind-merge
    # Dev Dependencies: typescript, vite, @types/react, @types/node, tailwindcss, postcss, autoprefixer
    ```
3.  Start the development server:
    ```bash
    pnpm dev
    ```

## 📝 Wartelisten-Formular einrichten (Google Forms)

Die Seite `/warteliste` nutzt ein eingebettetes Formular ("Native Form"), das Daten an Google Forms sendet. Damit dies funktioniert, müssen Sie die Datei `pages/Waitlist.tsx` bearbeiten:

1.  Erstellen Sie ein Google Formular mit den Feldern: Vorname, Nachname, E-Mail, Telefon, Nachricht.
2.  Öffnen Sie das Formular im Browser ("Vorschau" / Augen-Icon).
3.  Machen Sie einen Rechtsklick auf die Seite -> "Seitenquelltext anzeigen" (View Source).
4.  Suchen Sie (Strg+F) nach `<form action="`. Die URL darin ist die `GOOGLE_FORM_ACTION_URL`.
5.  Suchen Sie nach den Namen der Eingabefelder. Diese sehen aus wie `entry.123456789`.
6.  Tragen Sie diese Werte in `pages/Waitlist.tsx` im Bereich `GOOGLE_FORM_ENTRY_IDS` ein.

## 🏗 Architecture

The project is structured as a Single Page Application (SPA) using React Router (HashRouter) for compatibility with static hosting environments.

- **`/components`**: Reusable UI blocks (Navbar, Buttons, Forms).
- **`/pages`**: Route views.
- **`/constants.ts`**: Central config for contact info and text.
- **`types.ts`**: TypeScript interfaces.

## 🎨 Design System

- **Primary Blue:** `#6495ED` (Cornflower Blue)
- **Accent Yellow:** `#FFC72C` (Sunflower Yellow)
- **Background:** `#F7F9FC` (Very light blue/grey)
- **Typography:** Inter (Google Fonts)

## 📄 Content & Copy

All German text follows strict conversion copywriting rules:
- No use of "aber" or "weil".
- Focus on benefits and clarity.
- Tone: Professional, warm, reliable.

---
Deployed via Vercel.