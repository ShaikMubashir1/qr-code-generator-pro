# QR Code Generator Pro (WordPress Plugin)

[![WordPress](https://img.shields.io/badge/WordPress-5.0%2B-blue.svg)](https://wordpress.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb.svg)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![Version](https://img.shields.io/badge/Version-1.0.11-green.svg)](https://github.com/ShaikMubashir1/qr-code-generator-pro/releases)
[![License: GPL v2](https://img.shields.io/badge/License-GPL%20v2-orange.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.html)

A modern, highly customizable interactive QR code generator plugin for WordPress with **23+ decorative frames**, custom module and corner shapes, live device previews, dynamic global theme color detection, and high-resolution PNG & vector SVG downloads.

---

## ✨ Features

- **🚀 3-Step Guided Wizard**:
  1. **Select Type**: Website URL, Plain Text, WiFi, vCard, Email, Phone, SMS, WhatsApp, Location, Event.
  2. **Enter Content**: Real-time form fields tailored to each QR code type.
  3. **Customize Design**: Frames, colors, shapes, logos, and real-time live preview.
- **🎨 23+ Creative Decorative Frames**:
  - **Dining & Drinks**: Waiter Service Platter, Chef Hat, Food Cloche Dome, Cold Beer Mug, Tropical Drink, Coffee Cup.
  - **Retail & Delivery**: Delivery Scooter, Shopping Bag, Gift Box Ribbon, Store Receipt.
  - **Social & Modern**: Speech Bubble, Envelope, Polaroid Snap, Comic Energy Burst, Handdrawn Arrow.
  - **Classic Signage**: Scan Top Banner, Scan Bottom Banner, Modern Badge, Clipboard, Notepad, Smartphone Mockup.
- **📐 Advanced Dot & Corner Customization**:
  - Dot patterns: Square, Rounded, Dots, Classy, Classy Rounded, Extra Rounded.
  - Corner square & dot shapes including **Leaf / Petal**, Circle, Rounded, and Sharp corners.
- **🌈 Dynamic Theme Color Detection**:
  - Automatically reads and inherits your active WordPress / Elementor theme's global accent color (`--e-global-color-primary`, `--primary`, `--accent-color`).
  - Supports solid colors, linear/radial gradients, and background transparency.
- **🖼️ Logo & Image Branding**:
  - Upload custom center brand logos with auto-sizing and margin padding.
- **💾 High-Fidelity Exports**:
  - High-resolution **PNG (3x supersampled)** for crisp print quality.
  - Native **Vector SVG** export for infinite scaling and professional printing.
- **📱 Live Mockup & Preview**:
  - Toggle between Clean Preview and Interactive Smartphone Device Mockup view.

---

## 📦 Installation

### Via WordPress Admin:
1. Download `qr-code-generator-pro.zip` from the [Latest Release](https://github.com/ShaikMubashir1/qr-code-generator-pro/releases/latest).
2. In WordPress Admin, navigate to **Plugins** → **Add New** → **Upload Plugin**.
3. Choose the `.zip` file and click **Install Now**.
4. Click **Activate Plugin**.

### Usage via Shortcode:
Insert the shortcode anywhere on a page, post, or Elementor shortcode block:
```html
[custom_qr_generator]
```

---

## 🛠️ Development & Building

The frontend is built with React 18, Vite, and Tailwind CSS, bundled into a production asset that integrates seamlessly into WordPress without external runtime dependencies.

### Prerequisites:
- Node.js 18+ and npm

### Local Setup:
```bash
# Clone the repository
git clone https://github.com/ShaikMubashir1/qr-code-generator-pro.git
cd qr-code-generator-pro

# Install dependencies
npm install

# Run development server
npm run dev

# Build production assets
npm run build
```

Production builds output to `dist/assets/main.js` and `dist/assets/style.css`, which are enqueued by `qr-code-generator-pro.php`.

---

## 📜 Version History & Changelog

- **v1.0.11**:
  - Added 23 creative vector decorative frames (Waiter platter, Chef hat, Food cloche, Beer mug, Delivery scooter, Tropical drink, Shopping bag, Receipt, Polaroid, etc.).
  - Vector SVG math rendering for responsive preview and high-DPI downloads.
  - Responsive 4-column frame selector grid with live badges.
- **v1.0.10**:
  - Added React `ErrorBoundary` wrapper in `main.jsx` to prevent blank page crashes.
  - Resilient default fallback theme color resolution.
- **v1.0.9**:
  - Enhanced global color palette auto-detection for Elementor and theme CSS variables.
  - Fixed sync between preview frame colors and content fields.
- **v1.0.8**:
  - Introduced dynamic theme color extraction from DOM variables (`--e-global-color-primary`, etc.).
  - Fixed SVG path rendering for Ribbon and Coffee Cup frames.
- **v1.0.7**:
  - Modernized UI layout, removing cluttered templates and restructuring frame choices into a clear grid.
- **v1.0.6**:
  - Improved canvas export resolution and fidelity for both PNG and vector SVG downloads.
- **v1.0.5**:
  - Added Leaf corner style and enhanced dot pattern algorithms.
- **v1.0.4**:
  - POSIX-compliant ZIP archive packaging fix for Linux hosting environments.
  - Redundant asset path resolution (`dist/assets/`, `assets/`, plugin root).
- **v1.0.3**:
  - Added MutationObserver for Elementor asynchronous container mounting.
- **v1.0.2**:
  - Enqueue hooks for Elementor frontend and editor scripts.
- **v1.0.1**:
  - Initial layout adjustments and responsive container sizing.
- **v1.0.0**:
  - Initial release with 3-step wizard, core QR code types, and basic customization.

---

## 📄 License

This plugin is licensed under the [GPLv2 or later](https://www.gnu.org/licenses/old-licenses/gpl-2.0.html).
