import Link from "next/link";
import { Mail, Send } from "lucide-react";
import { CONTACT_EMAIL, TELEGRAM_CONTACT_URL } from "@/lib/config";
import { CookieSettingsButton } from "./Metrika";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Logo & disclaimer */}
          <div className="max-w-md">
            <Logo className="h-8 w-auto text-white" />
            <p className="mt-3 text-base font-semibold text-white">Твоё творчество — твои правила!</p>
            <p className="mt-3 text-sm text-white/40 leading-relaxed">
              Юридическая помощь музыкантам. Материалы на сайте — справочные; разбор вашего договора
              делаем по заявке.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-8">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wide text-white/50 mb-3">Документы</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy/" className="text-sm text-white/70 hover:text-accent transition-colors">
                    Политика обработки персональных данных
                  </Link>
                </li>
                <li>
                  <Link href="/consent/" className="text-sm text-white/70 hover:text-accent transition-colors">
                    Согласие на обработку персональных данных
                  </Link>
                </li>
                <li>
                  <Link href="/cookies/" className="text-sm text-white/70 hover:text-accent transition-colors">
                    Согласие на cookie и Яндекс Метрику
                  </Link>
                </li>
                <li>
                  <CookieSettingsButton className="text-sm text-white/70 hover:text-accent transition-colors cursor-pointer" />
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wide text-white/50 mb-3">Контакты</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-accent transition-colors"
                  >
                    <Mail size={14} />
                    {CONTACT_EMAIL}
                  </a>
                </li>
                {TELEGRAM_CONTACT_URL && (
                  <li>
                    <a
                      href={TELEGRAM_CONTACT_URL}
                      className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-accent transition-colors"
                    >
                      <Send size={14} />
                      Telegram
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} CreativeRights
          </p>
        </div>
      </div>
    </footer>
  );
}
