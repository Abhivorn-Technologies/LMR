# LMB Insurance Brokers – Knowledge Transfer (KT) Document

This document provides a comprehensive overview of the **LMB Insurance Brokers** corporate website. It is designed to serve as a Knowledge Transfer (KT) guide for developers, clients, or stakeholders taking ownership of the project.

---

## 1. Project Overview

**LMB Insurance Brokers** is a premium composite insurance broking firm. This project is their corporate website, designed to showcase their services, business lines, industries they serve, and company information. 

**Key Objectives:**
- Provide a highly premium, modern, and visually striking digital presence.
- Ensure smooth, high-performance animations and transitions.
- Maintain a scalable, maintainable codebase that allows for easy content updates.
- Adhere to an aesthetic of deep blacks (`#000000`, `#050505`) and vibrant cyan accents (`#00d4ff`).

---

## 2. Technology Stack

The project leverages a modern, performance-oriented tech stack:

### Core Framework & Language
- **[Next.js 15 (App Router)](https://nextjs.org/)**: The core React framework used for routing, server-side rendering (SSR), and static site generation (SSG). 
- **[React 19](https://react.dev/)**: Building user interfaces using the latest React features.
- **[TypeScript](https://www.typescriptlang.org/)**: For robust type-safety across the entire codebase.

### Styling & Design
- **[Tailwind CSS v4](https://tailwindcss.com/)**: Utility-first CSS framework for rapid UI development, configured with CSS-based `@theme`.
- **[Lucide React](https://lucide.dev/)**: A clean, customizable icon library.

### Animations & Interactions
- **[Framer Motion](https://www.framer.com/motion/)**: Used for seamless page transitions and declarative UI micro-interactions.
- **[GSAP (GreenSock) & ScrollTrigger](https://gsap.com/)**: Used for complex, high-performance scroll-driven animations and reveals.
- **[Lenis](https://lenis.studiofreight.com/)**: Provides a buttery-smooth scrolling experience overriding the default browser scroll.
- **[Embla Carousel](https://www.embla-carousel.com/)**: A lightweight, fluid carousel library for sliders (e.g., testimonials, logos).

### Data Management & Content Management System (CMS)
The project utilizes a hybrid approach for content and data management:

#### 1. Custom Built Admin CMS (`/admin`)
- **Location:** `src/app/admin/`
- **Libraries & Stack:** Built natively with **Next.js App Router**, **Tailwind CSS**, and **Lucide React** for the UI.
- **Data Layer:** Interfaces directly with **MongoDB** using the **Mongoose** ORM (`mongoose`).
- **Functionality:** Provides a fully custom dashboard for managing "Site Sections" (pages), "Collections", "Analytics", "Reports", and "Users". 
- **Authentication:** Custom JWT-based authentication using `jsonwebtoken`, `jose`, and `bcryptjs` for hashing passwords. Admin routes are strictly protected by Next.js edge middleware (`middleware.ts`).

#### 2. Sanity CMS (Headless Content)
- **Location:** Configuration in `src/sanity/`
- **Libraries Used:** 
  - `sanity` and `next-sanity` for core integration and data fetching.
  - `@sanity/visual-editing` for real-time visual previews.
  - `sanity-plugin-media` and `sanity-plugin-iframe-pane` for advanced asset and preview management.
- **Functionality:** Used for managing structured block content (e.g., Hero Blocks, FAQ Accordions, Rich Text). Schemas are defined in `src/sanity/schemaTypes/`. It allows the client to dynamically build pages using pre-defined modular blocks.

### Forms & Validation
- **[React Hook Form](https://react-hook-form.com/)**: For performant, flexible, and extensible forms with easy-to-use validation.
- **[Zod](https://zod.dev/)**: TypeScript-first schema declaration and validation library, integrated with React Hook Form.

---

## 3. Project Architecture & File Structure

The project follows a modular, feature-based architecture within the Next.js `src` directory.

### Directory Breakdown
```text
src/
├── app/                  # Next.js App Router (Pages & API routes)
│   ├── (site)/           # Public-facing pages (Home, About, Services, etc.)
│   ├── api/              # Backend API routes (Auth, CMS integrations)
│   └── layout.tsx        # Root layout with global providers (Lenis, Theme)
├── components/           # Reusable React Components
│   ├── layout/           # Structural components (Header, Footer, PageHero)
│   ├── motion/           # Animation wrappers (FadeIn, TextReveal, PageTransition)
│   ├── providers/        # Context providers (LenisProvider, AuthProvider)
│   ├── sections/         # Large page-specific blocks (e.g., HeroSection, ContactForm)
│   └── ui/               # Granular UI elements (Buttons, Cards, Inputs)
├── lib/                  # Utilities and static data
│   ├── content/          # Hardcoded/fallback content (navigation, company data)
│   └── utils.ts          # Helper functions (e.g., `cn()` for Tailwind class merging)
├── models/               # MongoDB Mongoose schemas (User, Content, PageMetadata)
├── sanity/               # Sanity CMS configuration and schemas
├── services/             # Business logic and external API integrations
└── middleware.ts         # Next.js Edge Middleware for route protection/auth
```

---

## 4. Implementation Journey (Start to Finish)

### Phase 1: Foundation & Setup
1. **Initialization:** The project was scaffolded using Next.js 15 with TypeScript and Tailwind CSS v4.
2. **Design System Configuration:** Tailwind was configured in `globals.css` with the specific brand colors (Black, Deep Graphite, and Cyan accents) and typography (Inter for body, Syne for headings).
3. **Core Utilities:** Setup of utility functions like `cn()` (using `clsx` and `tailwind-merge`) to conditionally merge Tailwind classes cleanly.

### Phase 2: Layout & Global Providers
1. **Smooth Scrolling:** Integration of `Lenis` globally to ensure all scroll interactions feel premium.
2. **Page Transitions:** Creation of a `PageTransition` wrapper using `Framer Motion` to animate route changes smoothly.
3. **Global UI Elements:** Development of a responsive navigation `Header` (with keyboard accessibility) and a comprehensive `Footer`.

### Phase 3: Component Development & Animations
1. **UI Kit:** Building atomic components (Buttons, Cards, Inputs) in `src/components/ui/`.
2. **Motion Primitives:** Creating reusable animation wrappers like `FadeIn` and `TextReveal` to standardise how elements appear on scroll.
3. **Section Building:** Assembling complex sections (e.g., Hero banners, Services grids) in `src/components/sections/`. Note: Hover states were strictly defined to use a subtle cyan illumination and a slight upward lift (`-translate-y-1`).

### Phase 4: Data, Backend, & CMS Integration
1. **Database Setup:** Integration of MongoDB via Mongoose. Schemas for `User` (Admin roles), `Content`, and `PageMetadata` were defined to support the custom backend.
2. **Custom Admin Dashboard:** A bespoke admin panel was developed at `src/app/admin/`. It features a custom sidebar layout, authentication, and direct hooks into MongoDB for managing site collections and users without relying on a third-party service.
3. **Authentication:** Implementation of secure login for the admin dashboard using JWTs, safeguarded by Next.js `middleware.ts` to ensure only authorized personnel can access the custom CMS.
4. **Sanity CMS Integration:** Sanity CMS was configured in `src/sanity/` alongside the custom admin. Modular block schemas (e.g., `faqAccordionBlock`, `heroBlock`) were created to allow the client to construct and edit rich page structures visually.

### Phase 5: Page Assembly
Pages were constructed in the `src/app/` directory by composing the pre-built layout, section, and motion components. 
- **Routes created:** `/`, `/about`, `/services`, `/business-lines`, `/reinsurance`, `/industries`, `/why-lmb`, `/process`, `/leadership`, `/careers`, `/resources`, `/faq`, `/contact`, `/privacy`, `/terms`.
- Placeholder content was marked with `(Content Required from Client)` to ensure easy identification during content population.

### Phase 6: Polish & Performance
1. **Optimization:** Ensuring all images use `next/image` for automatic optimization.
2. **Accessibility (a11y):** Ensuring WCAG AA contrast ratios, implementing keyboard navigation for complex components (like FAQ accordions), and adding ARIA labels.
3. **Lazy Loading:** Dynamically importing heavy libraries (like GSAP and Lenis components) where appropriate to keep the initial load fast (Targeting Lighthouse 95+).

---

## 5. Development Guidelines & Best Practices

If the client's development team takes over, they should adhere to these rules defined in the project:

- **Styling:** Always use the `cn()` utility for class merging. Stick to the defined color palette; avoid introducing generic colors.
- **Animations:** Respect the user's `prefers-reduced-motion` settings. Do not over-animate; stick to 300–500ms for micro-interactions (hovers) and 700ms+ for scroll reveals.
- **Content:** Do not invent facts or statistics. If client content is missing, explicitly mark it.
- **Architecture:** Keep Server Components as the default. Only use `"use client"` at the top of a file when hooks (`useState`, `useEffect`) or browser APIs are strictly necessary.

> [!TIP]
> **Running Locally:**
> 1. Ensure Node.js (v18+) is installed.
> 2. Run `npm install` to install dependencies.
> 3. Provide necessary environment variables in `.env.local` (MongoDB URI, Sanity credentials, JWT Secret).
> 4. Run `npm run dev` and navigate to `http://localhost:3000`.
