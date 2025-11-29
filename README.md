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

## 🏗 Architecture

The project is structured as a Single Page Application (SPA) using React Router (HashRouter) for compatibility with static hosting environments.

- **`/components`**: Reusable UI blocks (Navbar, Buttons, Forms).
- **`/pages`**: Route views.
- **`/constants.ts`**: Central config for contact info and text.
- **`types.ts`**: TypeScript interfaces.

## 🛠 Backend Integration (Next.js Migration Guide)

While this is a client-side React app, the requirement specified a Lead Magnet flow. In a full Next.js environment, migrate as follows:

1.  **Database (Supabase):**
    Create a table `leads`:
    ```sql
    create table leads (
      id uuid default uuid_generate_v4() primary key,
      email text not null,
      phone text,
      download_slug text,
      created_at timestamp with time zone default timezone('utc'::text, now())
    );
    ```

2.  **Email Service (Resend):**
    Create an API route `app/api/lead/route.ts` to handle form submissions, save to Supabase, and send an email via Resend.

3.  **Environment Variables:**
    Create a `.env.local` file:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
    RESEND_API_KEY=re_123456789
    SITE_URL=https://sabrinahaenggi.com
    ```

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

## ⚖️ Legal

Includes templates for Impressum and Datenschutz. **Note:** These are placeholders and do not constitute legal advice.

---
Deployed via Vercel.
