# MovieDB

A modern movie and TV show discovery app built with React, TypeScript, and Vite. Browse, search, and manage your favorite movies and shows with a beautiful, responsive interface featuring light/dark theme support.

## Getting Started

### Clone Repository

```bash
git clone <repository-url>
cd movies
```

### Install Dependencies

Using Bun (recommended):

```bash
bun install
```

Using Node.js:

```bash
npm install
# or
yarn install
```

### Fill in Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Add your TMDB API key:

```env
VITE_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
# Optional for production
VITE_PUBLIC_BASE_URL=your_base_url
```

> **Your API key WILL BE EXPOSED and accessible through dev tools. If you care about it, do not use this project.**

Get your API key from [The Movie Database (TMDB)](https://www.themoviedb.org/settings/api).

### Start Development Server

Using Bun:

```bash
bun dev
```

Using Node.js:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app in your browser.
