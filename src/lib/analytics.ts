import { YM_ID } from "./config";

type YmFn = (id: number, method: string, ...args: unknown[]) => void;

// Цель в Яндекс Метрике. Без счётчика — пишет в консоль, чтобы было видно при проверке.
export function reachGoal(goal: string, params?: Record<string, string>) {
  if (typeof window === "undefined") return;
  const ym = (window as unknown as { ym?: YmFn }).ym;
  if (YM_ID && ym) {
    ym(Number(YM_ID), "reachGoal", goal, params);
  } else {
    console.info("[goal]", goal, params ?? "");
  }
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
const UTM_STORAGE = "cr_utm";

// UTM первого захода: сохраняем, чтобы не потерять после переходов по якорям.
export function getUtm(): string {
  if (typeof window === "undefined") return "";
  const params = new URLSearchParams(window.location.search);
  const fromUrl = UTM_KEYS.filter((k) => params.get(k))
    .map((k) => `${k}=${params.get(k)}`)
    .join("&");
  try {
    if (fromUrl) {
      sessionStorage.setItem(UTM_STORAGE, fromUrl);
      return fromUrl;
    }
    return sessionStorage.getItem(UTM_STORAGE) ?? "";
  } catch {
    return fromUrl;
  }
}
