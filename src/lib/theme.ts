export const THEME_STORAGE_KEY = "cr_theme";

// Ставится в <head> до отрисовки, чтобы не мигала светлая тема.
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(!t){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){}})();`;
