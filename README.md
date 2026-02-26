# CodeAsthram Frontend

A **standalone**, visual block-based programming environment for Python, built with React and Blockly.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## ✨ Features

- 🎨 **Visual Block Programming** - Drag-and-drop interface powered by Google Blockly
- 🐍 **Python Code Generation** - Real-time Python code generation from blocks
- 💾 **Workspace Management** - Save and load your block workspace as XML
- 📸 **Screenshot Capture** - Export your workspace as PNG image
- 📚 **Templates Library** - Pre-built project templates to get started quickly
- 🎓 **Interactive Tutorials** - Learn programming with guided tutorials
- 🎨 **Theme Support** - Light and dark mode with smooth transitions
- 📱 **Responsive Design** - Works on desktop and tablet devices

## 📁 Project Structure

```
Frontend/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   ├── modules/         # Core modules
│   ├── generators/      # Code generators
│   ├── toolbox/         # Blockly toolbox configuration
│   ├── blocks/          # Custom block definitions
│   ├── tutorials/       # Tutorial definitions
│   ├── templates/       # Template definitions
│   └── styles/          # CSS stylesheets
├── index.html           # Entry HTML
├── package.json         # Dependencies
└── vite.config.mjs      # Vite configuration
```

## 🎯 Key Technologies

- **React** - UI framework
- **Blockly** - Visual programming library
- **Vite** - Build tool and dev server
- **React Icons** - Icon library
- **Lucide** - Additional icons

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for local development:

```env
# Add your environment variables here
```

### Build Configuration

The project uses Vite for development and production builds. Configuration is in `vite.config.mjs`.

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 🎨 Customization

### Adding New Blocks

1. Define block in `src/blocks/`
2. Add generator in `src/generators/python.js`
3. Update toolbox in `src/toolbox/`

### Creating Templates

Add new templates in `src/templates/index.js` with workspace XML.

### Adding Tutorials

Define tutorials in `src/tutorials/index.js` with step-by-step guidance.

## 🌐 Deployment

This is a **standalone frontend application** that can be deployed anywhere:

### Static Hosting (Recommended)

```bash
npm run build
# Deploy the 'dist' folder to:
# - Vercel
# - Netlify
# - GitHub Pages
# - AWS S3
# - Any static host
```

### Docker

```bash
# Build
docker build -t codeasthram-frontend .

# Run
docker run -p 3000:80 codeasthram-frontend
```

## 📝 License

See LICENSE file for details.

## 🤝 Contributing

Contributions welcome! Please follow the project's coding standards.

## 📞 Support

For issues and questions, please open a GitHub issue.

---

**Built with ❤️ for making programming accessible to everyone**