# Professional Portfolio (React)

A clean, responsive, single-page portfolio built with React (no backend required).  
Includes a sticky navbar and scrollable sections: **About**, **Skills**, **Projects** (with search + tech filter), and **Contact** (UI-only form with success toast).

## Run locally

```bash
npm install
npm start
```

Open http://localhost:3000

## Customize content

All profile + project content lives in:

- `src/portfolioData.js`

Update:
- `profile` (name, title, bio, links)
- `skills` (grouped lists)
- `projects` (4–6 entries with tags, responsibilities, outcomes, links)

## Projects search & filter

- Search matches: title, description, role, tags, responsibilities, outcomes
- Filter buttons are generated automatically from project `tags`

## Contact form

The contact form is **UI-only** and does not submit to a backend by default.  
On submit it shows a success toast and resets the form.

To wire later:
- Replace the `onContactSubmit` handler in `src/App.js` to POST to your API endpoint.

## Environment variables (optional)

This app is frontend-only; no env vars are required.

If you choose to wire a backend later, Create React App supports env vars prefixed with `REACT_APP_`, e.g.:

- `REACT_APP_API_BASE=https://api.example.com`

(Do not commit `.env`—use `.env.example` if needed.)
