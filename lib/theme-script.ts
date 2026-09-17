export const THEME_KEY = "theme";

/** Inline, render-blocking script: apply the persisted theme before first paint. */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('${THEME_KEY}');document.documentElement.dataset.theme=t==='dark'?'dark':'light'}catch(e){document.documentElement.dataset.theme='light'}})();`;
