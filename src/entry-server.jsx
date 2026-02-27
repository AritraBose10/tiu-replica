import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { AppShell } from './App.jsx';

/**
 * SSR entry point — renders the AppShell inside a StaticRouter for a given URL.
 * Used by the prerender script after building with `vite build --ssr`.
 */
export function render(url) {
  return React.createElement(
    StaticRouter,
    { location: url },
    React.createElement(AppShell)
  );
}
