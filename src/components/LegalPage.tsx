import Link from "next/link";
import { readContent } from "@/lib/markdown";

// Страница юридического документа из content/<file>.md.
export default function LegalPage({ file }: { file: string }) {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/" className="text-sm font-medium text-accent-strong hover:underline">
        ← На главную
      </Link>
      <article className="legal mt-6" dangerouslySetInnerHTML={{ __html: readContent(file) }} />
    </main>
  );
}
