# Authsoriser

![Authsoriser Logo](/public/assets/images/auth-logo.png)

Welcome to the Authsoriser website repository - a modern React application for Authsoriser's pipeline automation and software development services.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
- [Deployment](#deployment)
  - [Building for Production](#building-for-production)
  - [Deploying to Netlify](#deploying-to-netlify)
  - [Deploying to Vercel](#deploying-to-vercel)
- [Project Structure](#project-structure)
- [Contributing](#contributing)

## Features

- Modern, responsive user interface built with React and Tailwind CSS
- Dynamic service pages with customizable content
- Advanced video background components for immersive user experience
- Interactive UI elements including service cards with hover effects
- Optimized for performance and SEO

## Tech Stack

- **Frontend Framework**: React with Hooks
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **State Management**: Recoil
- **Routing**: React Router v6
- **Animations**: Custom CSS transitions
- **Media Handling**: Custom video background components

## Getting Started

### Prerequisites

Before running this project, you should have the following installed:

- Node.js (v16 or newer)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone hhttps://github.com/shaolighosh/gcp-consuling-website-new
   cd gcp-consuling-website-new
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Running Locally

To start the development server:

```bash
npm run dev
# or
yarn dev
```

This will start the development server at `http://localhost:5173` (or another port if 5173 is in use).

## Deployment

### Building for Production

To build the project for production:

```bash
npm run build
# or
yarn build
```

This will generate optimized files in the `dist` directory.

To preview the production build locally:

```bash
npm run preview
# or
yarn preview
```

### Deploying to Netlify

1. **Manual Deployment**:
   - Create a new site in Netlify
   - Deploy by uploading the `dist` folder after running `npm run build`

2. **Continuous Deployment**:
   - Connect your GitHub repository to Netlify
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Configure environment variables if needed

3. **Netlify CLI Deployment**:
   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli
   
   # Login to Netlify
   netlify login
   
   # Initialize your site
   netlify init
   
   # Deploy to production
   netlify deploy --prod
   ```

### Deploying to Vercel

1. **Using Vercel Dashboard**:
   - Import your GitHub repository
   - Configure project settings:
     - Framework preset: Vite
     - Build command: `npm run build`
     - Output directory: `dist`

2. **Using Vercel CLI**:
   ```bash
   # Install Vercel CLI
   npm install -g vercel
   
   # Login to Vercel
   vercel login
   
   # Deploy to production
   vercel --prod
   ```

## Project Structure

```
gcp-consuling-website-new/
├── public/               # Static assets
│   └── assets/
│       ├── images/       # Images used throughout the site
│       └── gif/          # GIF animations
├── src/
│   ├── components/       # React components
│   │   ├── layout/       # Layout components (Navbar, Footer)
│   │   ├── ui/           # UI components (Buttons, Cards, etc.)
│   │   └── utils/        # Utility components
│   ├── data/             # Data files (navData, serviceData)
│   ├── pages/            # Page components
│   ├── routes/           # Routing configuration
│   ├── App.jsx           # Main app component
│   └── main.jsx          # Entry point
├── .gitignore
├── index.html            # HTML template
├── package.json          # Project dependencies
├── tailwind.config.js    # Tailwind CSS configuration
├── vite.config.js        # Vite configuration
└── README.md             # Project documentation
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push the branch: `git push origin feature/my-feature`
5. Submit a pull request

---

Built with ❤️ by the Authsoriser team
