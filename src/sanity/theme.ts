import { buildLegacyTheme } from 'sanity';

const props = {
  '--my-white': '#fff',
  '--my-black': '#1a1a1a',
  '--lmb-green': '#069e8b',
  '--lmb-green-light': '#12c2ac',
  '--lmb-red': '#db4437',
  '--lmb-yellow': '#f4b400',
  '--lmb-gray': '#666',
};

export const myTheme = buildLegacyTheme({
  /* Base theme colors */
  '--black': props['--my-black'],
  '--white': props['--my-white'],

  '--gray': props['--lmb-gray'],
  '--gray-base': props['--lmb-gray'],

  '--component-bg': props['--my-white'],
  '--component-text-color': props['--my-black'],

  /* Brand */
  '--brand-primary': props['--lmb-green'],

  // Default button
  '--default-button-color': props['--lmb-gray'],
  '--default-button-primary-color': props['--lmb-green'],
  '--default-button-success-color': props['--lmb-green'],
  '--default-button-warning-color': props['--lmb-yellow'],
  '--default-button-danger-color': props['--lmb-red'],

  /* State */
  '--state-info-color': props['--lmb-green-light'],
  '--state-success-color': props['--lmb-green'],
  '--state-warning-color': props['--lmb-yellow'],
  '--state-danger-color': props['--lmb-red'],

  /* Navbar */
  '--main-navigation-color': props['--my-black'],
  '--main-navigation-color--inverted': props['--my-white'],

  '--focus-color': props['--lmb-green'],
});
