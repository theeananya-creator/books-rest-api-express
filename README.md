# Rick & Morty Explorer (React + Vite)

A React app that fetches and displays data from the public
[Rick and Morty API](https://rickandmortyapi.com/) (no API key needed).

## Features
- Fetches characters with `fetch` and `useEffect`
- Debounced search by name and status filter
- Pagination
- Loading, empty and error states
- Cancels outdated requests with `AbortController`

## Run locally
```bash
npm install
npm run dev
```
Then open the URL shown in the terminal (usually http://localhost:5173).

## Deploy (optional live link)
Push to GitHub, then import the repo on Vercel or Netlify. The build
command is `npm run build` and the output directory is `dist`.
