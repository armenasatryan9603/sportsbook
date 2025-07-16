# MAXXBET360 - Sports Betting & Casino Platform

A modern, responsive sports betting and casino platform built with React, TypeScript, and Tailwind CSS.

## Features

- **Responsive Design**: Optimized for all devices, minimum width support of 320px
- **Modern UI Components**: Reusable Button, Tab, Carousel, and other components
- **Sports Betting**: Live odds display for Premier League matches
- **Casino Games**: Carousel showcasing various casino games
- **Live Casino**: Live dealer games section
- **Multi-language Support**: Language dropdown with flag icons
- **Mobile-First**: Responsive navigation with mobile menu
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first CSS framework for styling

## Components

### Core Components

- **Button**: Versatile button component with multiple variants (primary, secondary, accent, outline)
- **Tab**: Tab navigation component with active/inactive states
- **Carousel**: Horizontal scrolling carousel for game displays
- **LanguageDropdown**: Multi-language selection with flag icons

### Layout Components

- **Header**: Navigation header with mobile menu support
- **Footer**: Footer with links and social media
- **HeroSection**: Main banner with call-to-action
- **SportsSection**: Sports betting odds display
- **PromoSection**: Promotional cards for Casino and Sports

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/armenasatryan9603/sportsbook
cd sportsbook
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── Components/
│   ├── Button.tsx              # Reusable button component
│   ├── Tab.tsx                 # Tab navigation component
│   ├── Carousel.tsx            # Game carousel component
│   ├── LanguageDropdown.tsx    # Language selection dropdown
│   ├── Header.tsx              # Site header with navigation
│   ├── Footer.tsx              # Site footer
│   ├── HeroSection.tsx         # Main banner section
│   ├── SportsSection.tsx       # Sports betting section
│   ├── PromoSection.tsx        # Promotional cards section
│   └── index.ts                # Component exports
├── App.tsx                     # Main application component
├── main.tsx                    # Application entry point
└── index.css                   # Global styles with Tailwind
```

## Customization

### Colors

The application uses a custom color palette defined in `tailwind.config.js`:

- **Primary**: Blue tones for general UI elements
- **Secondary**: Green tones for success states and highlights
- **Accent**: Pink/purple tones for call-to-action elements
- **Dark**: Gray scale for dark theme

### Images

Currently using placeholder images. Replace the image URLs in `App.tsx` with your actual game images:

- Casino games: `casinoGames` array
- Top rated games: `topRatedGames` array
- Live casino games: `liveCasinoGames` array

### Responsive Breakpoints

- **xs**: 320px (minimum width)
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

## Technologies Used

- **React 19**: Modern React with hooks
- **TypeScript**: Type safety and better development experience
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Fast build tool and development server
- **ESLint**: Code linting and formatting

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Minimum viewport width: 320px

## License

This project is licensed under the MIT License.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
