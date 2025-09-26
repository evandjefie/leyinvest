// Polyfill pour import.meta.env dans l'environnement Jest
global.importMeta = { env: {} };

// Mock minimal pour Vite import.meta.env
Object.defineProperty(global, 'import', {
  value: {},
  writable: true,
});

// localStorage est déjà simulé par jsdom, mais on s'assure d'un état propre
beforeEach(() => {
  localStorage.clear();
});



