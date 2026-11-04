# Personal Task Manager

A browser-based task tracker with completion filters and local persistence.

## Features and current scope

- Add tasks with date and time metadata.
- Mark tasks complete using checkboxes.
- Filter all, completed, or unfinished tasks.
- Clear all tasks.
- Save and restore task objects using localStorage.

## Built with

HTML, CSS, and vanilla JavaScript. No package installation or build step is required.

## Run locally

Clone or download this repository, then serve its root with a local static server, such as VS Code Live Server. Open the address provided by the server. Serving the repository root preserves root-relative asset paths.

## Project structure

- `index.html`
- `style.css`
- `script.js`

## Learning focus

Arrays of objects, stable IDs, filtering, DOM rendering, event delegation, dates, and JSON persistence.

## Current limitations

Data is local to the current browser. Storage parsing is not guarded. Task descriptions are interpolated into HTML, so this learning implementation should not be treated as a safe renderer for untrusted input. Documentation reflects source inspection; browser behavior was not tested during this README update.
