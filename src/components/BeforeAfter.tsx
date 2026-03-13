import { XCircle, AlertCircle } from "lucide-react";

export default function BeforeAfter() {
  return (
    <section id="knowledge" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground text-center">
          Что изменилось?
        </h2>
        <p className="mt-3 text-foreground/60 text-center max-w-xl mx-auto">
          Сравните старый и новый правовой режим — и поймите, почему действовать нужно уже сейчас.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {/* Было */}
          <div className="rounded-2xl border border-gray-mid bg-gray-light p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 h-1.5 w-full bg-foreground/10" />
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-foreground/10">
                <XCircle size={20} className="text-foreground/40" />
              </div>
              <h3 className="text-xl font-bold text-foreground/50">Было</h3>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-foreground/40">Состояние</p>
                <p className="mt-1 text-base font-medium text-foreground/70">
                  Свободное использование фрагментов чужих произведений
                </p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-foreground/40">Значение</p>
                <p className="mt-1 text-sm text-foreground/50 leading-relaxed">
                  Допускалось использование чужих фрагментов без договора. Практика
                  основывалась на неформальных договорённостях.
                </p>
              </div>
            </div>
          </div>

          {/* Стало */}
          <div className="rounded-2xl border border-red/30 bg-red/5 p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 h-1.5 w-full bg-red" />
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red/10">
                <AlertCircle size={20} className="text-red" />
              </div>
              <h3 className="text-xl font-bold text-red">Стало</h3>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-red/60">Состояние</p>
                <p className="mt-1 text-base font-medium text-foreground">
                  Требуется явное письменное согласие правообладателя
                </p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-red/60">Значение</p>
                <p className="mt-1 text-sm text-foreground/70 leading-relaxed">
                  Риск блокировки! Для релиза трека или шоу нужен договор
                  с clearance. Нарушение грозит штрафами и удалением контента.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
