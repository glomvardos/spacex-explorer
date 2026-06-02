'use client';

import type { MouseEvent } from 'react';

export function SkipToContent() {
  function handleSkip(event: MouseEvent<HTMLAnchorElement>) {
    const main = document.getElementById('main-content');

    if (!main) {
      return;
    }

    event.preventDefault();
    main.focus();
    main.scrollIntoView();
  }

  return (
    <a
      href="#main-content"
      onClick={handleSkip}
      className="focus:bg-background focus:ring-ring/30 sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:border focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:shadow-md focus:ring-3 focus:outline-none"
    >
      Skip to content
    </a>
  );
}
