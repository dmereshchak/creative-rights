export const THEME_STORAGE_KEY = "cr_theme";

// Цвет строки состояния и панелей браузера на телефоне — как у шапки (surface) в каждой теме.
export const THEME_BAR_COLORS = { light: "#ffffff", dark: "#111930" } as const;

export function applyThemeBarColor(theme: "light" | "dark") {
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_BAR_COLORS[theme]);
}

// Ставится в <head> до отрисовки, чтобы не мигала светлая тема.
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(!t){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",t==="dark"?"${THEME_BAR_COLORS.dark}":"${THEME_BAR_COLORS.light}")}catch(e){}})();`;
