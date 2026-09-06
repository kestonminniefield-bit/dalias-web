# PRD — Dalia's Harlem Cafe (Restaurant Website)

## Original Problem Statement
Build a simple, modern, easy-to-use restaurant website with: a searchable, mobile-ready menu; Google Business profile setup; a contact form; a tap-to-call button; map & directions; explicitly NOT ADA compliant. Menu provided covers breakfast sandwiches, wings (5 flavors), lunch (burgers, chopped cheese, philly, tenders, quesadilla), salads, Spanish lunch specials, and beverages.

## User Choices
- Design: "Cute and cozy" (warm cream/espresso/bodega-red palette, Fraunces + Outfit type)
- Contact messages: saved to DB, viewed in an admin page (no email)
- Scrambled menu text: organized into clean categories with best interpretation
- Restaurant name/address/phone: REAL details provided 2026-09-01 — Dalia's Harlem Cafe, 2394 Adam Clayton Powell Jr Blvd, New York, NY 10030, (646) 692-3878. Hours (real, daily): 8:00 AM – 4:30 PM. Hero uses the real storefront photo at /images/storefront.webp. Real dish photos added: chopped cheese + sausage-egg-and-cheese (feature cards), wings + breakfast plate (gallery), plus 2 AI-generated fillers (avocado toast, coffee, Gemini Nano Banana) — all in /app/frontend/public/images/.

## Architecture
- Frontend: React (CRA/craco), react-router-dom, framer-motion, lenis smooth scroll, Tailwind. Pages: Home `/`, Menu `/menu`, Contact `/contact`, Admin `/admin`, plus static printable menu `/menu.html`.
- Backend: FastAPI + motor (MongoDB). Routes under /api: /auth/login, /auth/logout, /auth/me, /contact (POST), /messages (GET, admin-only).
- Auth: single seeded admin (env ADMIN_EMAIL/ADMIN_PASSWORD), bcrypt hash, JWT httpOnly cookies, 5-attempt/15-min lockout.

## Implemented (2026-09-01)
- Kinetic hero with masked line-by-line reveal, parallax image, floating special card
- Editorial marquee ribbon, grain texture overlay, sticky glass nav
- Highlights section with two food photos (clipped, tilted frames)
- Menu data fully replaced 2026-09-06 with the real Dalia's menu: 8 categories (Breakfast platters, Omelettes, Breakfast Sandwiches roll/hero, Wings 6pc/10pc/deluxe, Lunch Entrees reg/deluxe, Salads, Spanish Lunch Specials sm/md/lg, Beverages). Hero card price updated to $5.
- Visit section: address, hours, tap-to-call pill, "Get directions" (Google Maps), embedded map
- Mobile floating "Tap to call" button
- Contact form saving to MongoDB with toast feedback
- Admin inbox at /admin: login, message grid, Google Business Profile setup checklist linking to business.google.com
- Brute-force protection on login

## Verified
- POST /api/contact, login, /auth/me, /messages chain via curl (unauth /messages returns 401)
- UI: hero render, menu search ("wings"), map embed, contact form submit + toast, admin login + 2 messages visible

## Backlog
- P0: Replace placeholder name/address/phone/hours with real details (user to provide)
- P1: Actual Google Business Profile creation (manual step by owner; checklist lives in admin)
- P1: Email notifications for new contact messages (Resend)
- P2: Menu item photos, online ordering, printable menu PDF
