import { Mail, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-foreground text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Logo & disclaimer */}
          <div className="max-w-md">
            <span className="text-xl font-extrabold tracking-tight">
              Creative<span className="text-accent">Rights</span>
            </span>
            <p className="mt-3 text-sm text-white/40 leading-relaxed">
              Проект носит справочный характер и не заменяет консультацию юриста.
              Информация предоставляется &laquo;как есть&raquo;.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-8">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wide text-white/50 mb-3">Документы</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-sm text-white/70 hover:text-accent transition-colors">
                    Политика обработки персональных данных
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-white/70 hover:text-accent transition-colors">
                    Оферта
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wide text-white/50 mb-3">Контакты</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="mailto:hello@creativerights.ru"
                    className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-accent transition-colors"
                  >
                    <Mail size={14} />
                    hello@creativerights.ru
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-accent transition-colors"
                  >
                    <Send size={14} />
                    Telegram
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} CreativeRights. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}
