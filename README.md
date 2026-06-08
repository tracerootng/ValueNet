# ValueNet Associate (VNP Ltd)

<div align="center">
  <h3>Precision in Audit. Excellence in Strategy.</h3>
  <p>High-end corporate website for an Abuja-based firm specializing in Audit, Tax, and Financial Advisory</p>
</div>

## Features

- ✨ **Modern React Application** - Built with React 19, TypeScript, and Vite
- 🎨 **Sophisticated Design** - Glass-morphism UI with gold accents and dark/light themes
- 🤖 **AI Tax Assistant** - Powered by Google Gemini AI for Nigerian tax law queries
- 📄 **Document Scanner** - Automated compliance checker for FIRS requirements
- 📱 **Fully Responsive** - Optimized for all devices
- 🚀 **Performance Optimized** - Local fonts, optimized assets, fast loading

## Tech Stack

- React 19 + TypeScript
- Vite 6
- Tailwind CSS 4
- Google Gemini AI
- Motion (Framer Motion)
- Lucide React Icons

## Quick Start

**Prerequisites:** Node.js v18 or higher

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set environment variables:**
   - Create/edit `.env.local` file
   - Add your Gemini API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

4. **Build for production:**
   ```bash
   npm run build
   ```

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions to Vercel.

**Quick Deploy to Vercel:**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/valuenet)

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Services.tsx
│   ├── About.tsx
│   ├── Leadership.tsx
│   ├── AIChatbot.tsx   # AI tax assistant
│   ├── DocumentScanner.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   └── Gallery.tsx
├── services/
│   └── geminiService.ts # Gemini AI integration
├── App.tsx
├── main.tsx
└── index.css
```

## Key Features Details

### AI Tax Assistant
- Conversational interface for Nigerian tax law queries
- Supports CITA, PITA, VAT, Finance Act 2024/25
- Multi-session chat history
- Statutory law search with filtering

### Document Scanner
- Upload invoices/financial statements (PDF, PNG, JPG)
- Automated FIRS compliance checking
- Extracts metadata and provides suggestions
- Checks TIN, VAT registration, calculations

## License

Licensed under Apache-2.0

## Support

For technical support or inquiries, contact the VNP technical team.
