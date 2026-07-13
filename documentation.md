# IP Guardian - Full Documentation

## Overview
**IP Guardian** is a professional-grade intelligence platform that offers comprehensive network tools including IP lookup, VPN detection, WHOIS lookup, DNS analysis, and HTTP Headers inspection. It features a modern, god-tier user interface designed for both aesthetic appeal and high functional utility.

## Tech Stack
- **Framework:** React 19 + TypeScript
- **Routing:** TanStack Router (File-based routing setup)
- **Styling:** Tailwind CSS v4 + Framer Motion (for animations)
- **Maps:** Leaflet & React-Leaflet
- **Icons:** Lucide React
- **Data Fetching:** TanStack Query (React Query)
- **UI Components:** Radix UI primitives
- **Analytics:** React GA4

## Key Features
1. **Home / Landing Page (`/`)**: Displays the main value propositions, a hero section, and navigation to the primary tools.
2. **My IP (`/my-ip`)**: Automatically detects and displays the user's current public IP address along with details like location and network.
3. **IP Lookup (`/lookup`)**: Allows users to enter any IPv4 or IPv6 address to retrieve geographic location, ASN data, and VPN/Proxy detection status. Includes an interactive `LeafletMap`.
4. **DNS Lookup (`/dns`)**: Enables users to fetch DNS records (A, AAAA, MX, TXT, NS, CNAME) for any specified domain name.
5. **WHOIS Lookup (`/whois`)**: Provides domain registration data, including registrar, creation date, expiry date, and nameservers.
6. **HTTP Headers (`/headers`)**: Inspects the HTTP response headers returned by a given URL to check for security configurations and server information.
7. **Tools Dashboard (`/tools`)**: A central hub providing quick access to all available network intelligence tools.

## Design System
- **Theme:** Premium light theme (White/Slate combination).
- **Typography:** Uses **Space Grotesk** for display headers and **Manrope** for body text.
- **Font Sizes:** Base scale operates at 14px (high) and 12px (small) for maximum readability.
- **Micro-Interactions:** Heavily relies on hover states, glassmorphism (`backdrop-blur`), and Framer Motion transitions to ensure the interface feels alive and reactive.

---

# AI Development Prompt (Copy & Paste)

If you are working with an AI assistant or passing this project to another developer, you can use the following prompt to give them complete context about the website:

```text
You are assisting with the development of "IP Guardian", a modern, premium web application built with React 19, TypeScript, TanStack Router, and Tailwind CSS v4.

**Project Context & Core Features:**
- The app is a cyber-intelligence platform offering tools like IP Lookup (with VPN/Proxy detection), WHOIS Domain Lookup, DNS Record Lookup, and HTTP Header Inspection.
- It relies on TanStack Query for data fetching and caching.
- Maps are rendered using React-Leaflet.
- The project is fully responsive and prioritizes a clean, high-end "glassmorphism" aesthetic.

**Design System & Aesthetics:**
- The application currently uses a premium Light Theme, featuring a dynamic multi-stop gradient background (#F8FAFC to #E2E8F0) and frosted glass cards (backdrop-blur).
- **Typography:** The app uses Google Fonts "Space Grotesk" for display/headings and "Manrope" for body content.
- **Font Sizing:** The root font size is explicitly set to 14px (text-high) with 12px for secondary elements (text-small).

**Routing Structure (`src/routes`):**
- `/` - Landing page with hero section.
- `/my-ip` - Shows the visitor's public IP.
- `/lookup` - The main IP analysis and map interface.
- `/whois`, `/dns`, `/headers` - Dedicated pages for domain and server intelligence.
- `/tools` - A dashboard directory for all available modules.

**Your Goal:**
When generating code or making modifications, ensure you strictly adhere to the established light theme, maintain the high 14px / small 12px font scale, and use Tailwind utility classes in conjunction with the existing Radix UI primitives. Never compromise the premium aesthetic or break the TanStack Router structure.
```
