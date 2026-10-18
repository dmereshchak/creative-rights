import { readFileSync } from "node:fs";
import { join } from "node:path";

// Минимальный markdown для юридических текстов: заголовки, списки, таблицы, абзацы, **жирный**, ссылки.
// Читается при сборке из папки content/.

const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const inline = (s: string) =>
  escape(s)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+|\/[^)\s]*)\)/g, '<a href="$2">$1</a>');

export function renderMarkdown(md: string): string {
  const out: string[] = [];
  let list: "ul" | null = null;
  let para: string[] = [];
  let table: string[][] = [];

  const flushPara = () => {
    if (para.length) out.push(`<p>${inline(para.join(" "))}</p>`);
    para = [];
  };
  const closeList = () => {
    if (list) out.push(`</${list}>`);
    list = null;
  };
  const flushTable = () => {
    if (!table.length) return;
    const [head, ...rows] = table;
    out.push(
      `<div class="legal-table"><table><thead><tr>${head.map((c) => `<th>${inline(c)}</th>`).join("")}</tr></thead>` +
        `<tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`,
    );
    table = [];
  };

  for (const raw of md.split("\n")) {
    const line = raw.trim();
    const heading = line.match(/^(#{1,4})\s+(.*)$/);
    const ol = line.match(/^\d+(?:\.\d+)*[.)]\s+(.*)$/);
    const ul = line.match(/^[-*]\s+(.*)$/);

    if (line.startsWith("|")) {
      flushPara();
      closeList();
      if (/^\|[\s|:-]+\|$/.test(line)) continue; // разделитель под шапкой
      table.push(line.replace(/^\||\|$/g, "").split("|").map((c) => c.trim()));
      continue;
    }
    flushTable();

    if (!line) {
      flushPara();
      closeList();
    } else if (heading) {
      flushPara();
      closeList();
      const level = Math.min(heading[1].length + 1, 4);
      out.push(`<h${level}>${inline(heading[2])}</h${level}>`);
    } else if (ol) {
      // В юридических текстах номер пункта — часть текста («5.2.»), его не перенумеровываем
      flushPara();
      closeList();
      out.push(`<p class="legal-item${/^\s/.test(raw) ? " legal-sub" : ""}">${inline(line)}</p>`);
    } else if (ul) {
      flushPara();
      if (list !== "ul") {
        closeList();
        out.push("<ul>");
        list = "ul";
      }
      out.push(`<li>${inline(ul[1])}</li>`);
    } else {
      closeList();
      para.push(line);
    }
  }
  flushPara();
  closeList();
  flushTable();
  return out.join("\n");
}

export function readContent(name: string): string {
  return renderMarkdown(readFileSync(join(process.cwd(), "content", name), "utf-8"));
}
