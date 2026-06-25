# D&D Character Generator

A full-stack Dungeons & Dragons 5e character generator built with a React frontend and an Express backend. This project aims to deliver a polished character sheet creator with a medieval parchment-style UI, inventory management, combat entries, traits, and spell support.

## Project Structure

- `backend/`
  - Express API serving character-related behavior and endpoints
- `frontend/`
  - React application for interactive character creation and sheet layout
  - SCSS styling with a custom parchment-inspired theme

## Features

- Character creation form with:
  - Name, race, class, background, alignment, level, experience
  - Full D&D 5e attribute panel
  - Saving throws and skills mapping
  - Inventory and combat sections
  - Character biography section that fills the remaining left column height
  - Conditional spell block for casters
- Polished character sheet layout with card styling and responsive behavior
- Backend starter API ready for extension

## Getting Started

### Requirements

- Node.js 18+ recommended
- npm or yarn

### Backend

1. Open a terminal in `backend/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the backend in development mode:
   ```bash
   npm run dev
   ```
4. The backend will start on `http://localhost:3000` by default.

### Frontend

1. Open a terminal in `frontend/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the frontend app:
   ```bash
   npm start
   ```
4. The app will open on `http://localhost:3000` or the next available port.

## Build

To build the frontend for production:

```bash
cd frontend
npm run build
```

## Project Scripts

### Backend

- `npm start` - start the Express server
- `npm run dev` - start the Express server with `nodemon`

### Frontend

- `npm start` - start the React development server
- `npm run build` - build the production bundle
- `npm test` - run the test runner
- `npm run eject` - eject Create React App configuration

## Customization

- The frontend theme and sheet layout are defined in `frontend/src/styles/`
- Character logic lives in `frontend/src/utils/calculations.js`
- Major form components are located in `frontend/src/components/`

## Notes

- The frontend currently uses React Scripts and plain React 18.
- Backend is intentionally lightweight and built with Express for easy expansion.

## License

This project is provided as-is. Add your preferred license if you wish to open source it.
