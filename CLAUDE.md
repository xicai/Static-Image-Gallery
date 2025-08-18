# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based static image gallery application built with Vite. The project is currently in its initial template phase but is structured to evolve into a full-featured image gallery.

## Tech Stack

- **Frontend**: React 19.1.1 with React DOM 19.1.1
- **Build Tool**: Vite 7.1.2
- **Development**: ESLint 9.33.0, TypeScript types support
- **Package Manager**: npm with ES6 modules

## Common Commands

### Development
- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run lint` - Run ESLint checks
- `npm run preview` - Preview production build

## Architecture

### Data Structure
The gallery uses `public/images.json` as its data source, which contains:
- Image metadata (ID, URL, description, dimensions)
- Related image references
- Cloudinary-hosted images

### Key Files
- `src/main.jsx` - Application entry point using React 18 createRoot API
- `src/App.jsx` - Main application component (currently a template)
- `public/images.json` - Image data configuration
- `vite.config.js` - Minimal Vite configuration with React plugin

### Component Structure
The project follows standard React component architecture with:
- ES6 module imports/exports
- CSS modules support
- Built-in support for React Hooks and Fast Refresh

## Development Notes

- The project uses modern React patterns with StrictMode enabled
- ESLint is configured to ignore unused variables starting with capital letters
- Image optimization is handled via Cloudinary URL transformations in `src/utils/cloudinary.js`
- Upload workflow requires Cloudinary configuration in `src/components/Uploader.jsx`
- GitHub Pages deployment is configured via `.github/workflows/deploy.yml`
- Image data is static and should be updated via `public/images.json`

## Deployment

1. Configure Cloudinary settings in Uploader.jsx
2. Update vite.config.js base path to match GitHub repository name
3. Push to main branch to trigger automatic deployment
4. Enable GitHub Pages in repository settings

See DEPLOYMENT.md for detailed instructions.