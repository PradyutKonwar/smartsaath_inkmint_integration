# SmartSaathi Hub - Multi-Vertical Digital Platform

A modern, responsive web application for SmartSaathi's three service verticals: Students, Inkmint, and Bridge.

## Features

- **Dynamic Background Gradients**: Smooth color transitions with adaptive UI elements
- **Floating Launcher Navigation**: Persistent vertical launchers for easy service access
- **Modal-Based Service Selection**: Clean, uncluttered interface with click-to-select functionality
- **WhatsApp Integration**: Seamless ordering workflow with pre-filled messages
- **Advanced Pricing Logic**: Complex discount calculations for different service tiers
- **Lead Capture System**: Comprehensive data collection with Google Sheets integration
- **Analytics Tracking**: Google Analytics 4 with custom event tracking
- **Mobile-First Design**: Fully responsive with smooth animations

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Analytics**: Google Analytics 4

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd smartsaathi-hub
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
├── App.tsx          # Main application component
├── main.tsx         # Application entry point
├── index.css        # Global styles and animations
└── vite-env.d.ts    # TypeScript declarations

public/
├── index.html       # HTML template
└── vite.svg         # Vite logo

config/
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
├── vite.config.ts        # Vite configuration
└── tsconfig.json         # TypeScript configuration
```

## Key Components

### Service Verticals

1. **SmartSaathi Students**: Academic documents, printing, and delivery services
2. **SmartSaathi Inkmint**: Creative design services with bulk discount tiers
3. **SmartSaathi Bridge**: Business documents (coming soon)

### Pricing Logic

- **Students**: Final rate pricing with minimum quantity handling
- **Inkmint**: 20% intro discount + bulk discounts (5-15% based on quantity)
- **Complex calculations**: Automatic total computation with all applicable discounts

### WhatsApp Integration

- Pre-filled messages with order details and calculated totals
- QR code for desktop users
- Direct link to WhatsApp number: +91 7002122703

### Analytics Events

- `launcher_click`: Track vertical navigation
- `service_selected`: Monitor service selection/deselection
- `cart_viewed`: Cart interaction tracking
- `order_form_submitted`: Lead capture events
- `whatsapp_order_initiated`: Order completion tracking

## Configuration

### Google Analytics

Update the GA4 tracking ID in `index.html`:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-360633556"></script>
```

### Google Sheets Integration

The project includes structure for Google Sheets integration. Implement the `submitToGoogleSheets` function in `App.tsx` with your preferred method (Google Apps Script, Zapier, etc.).

Required sheet headers:
- Timestamp
- Name
- Phone
- Details
- Services
- Total

## Customization

### Colors and Gradients

The dynamic gradient system uses these color percentages:
- Yellow: 60%
- Red: 20%
- White: 10%
- Green: 5%
- Pink: 5%

Modify the `gradients` array in `App.tsx` to customize color schemes.

### Service Data

Update service information in the `services` object within `App.tsx`. Each service includes:
- ID, name, category, description
- Pricing information (MRP, final rate, intro price)
- Minimum quantities and units where applicable

## Deployment

The project is optimized for deployment on:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

Build the project and upload the `dist` folder contents.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Optimized bundle size with code splitting
- Lazy loading for images
- Smooth 60fps animations
- Mobile-first responsive design

## Contact

- **Phone**: +91 7002122703
- **Email**: smartsaathi.dbr@gmail.com
- **Location**: Dibrugarh, Assam, India

## License

© 2025 SmartSaathi Hub. All rights reserved.