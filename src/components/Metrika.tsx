import Script from "next/script";
import { YM_ID } from "@/lib/config";

// Яндекс Метрика. Грузится, только если в config.ts указан номер счётчика.
export default function Metrika() {
  if (!YM_ID) return null;
  return (
    <Script id="yandex-metrika" strategy="afterInteractive">
      {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
ym(${Number(YM_ID)}, "init", { clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: true });`}
    </Script>
  );
}
