// Выкладка собранного сайта (out/) в бакет Yandex Object Storage creativerights.ru.
// Ключи: переменные окружения или ~/.config/creativerights/yc-s3.env (в репозиторий не попадают).
// Запуск: npm run build && npm run deploy
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative, extname } from "node:path";
import { homedir } from "node:os";
import { fileURLToPath } from "node:url";
import {
  S3Client,
  PutObjectCommand,
  ListObjectsV2Command,
  DeleteObjectsCommand,
} from "@aws-sdk/client-s3";

const envFile = join(homedir(), ".config/creativerights/yc-s3.env");
if (existsSync(envFile)) {
  for (const line of readFileSync(envFile, "utf8").split("\n")) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
  }
}

const bucket = process.env.S3_BUCKET || "creativerights.ru";
const s3 = new S3Client({
  region: process.env.AWS_REGION || "ru-central1",
  endpoint: process.env.S3_ENDPOINT || "https://storage.yandexcloud.net",
});

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".webmanifest": "application/manifest+json",
};

function cacheControl(key) {
  if (key.startsWith("_next/static/")) return "public, max-age=31536000, immutable";
  if (/\.(html|txt|xml)$/.test(key)) return "no-cache";
  return "public, max-age=3600";
}

// iCloud плодит копии вида «_next 2» — их не выкладываем
const skip = (name) => name === ".DS_Store" || / \d+(\.[a-z0-9]+)?$/i.test(name);

function walk(dir, root = dir, acc = []) {
  for (const name of readdirSync(dir)) {
    if (skip(name)) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, root, acc);
    else acc.push(relative(root, p).split("\\").join("/"));
  }
  return acc;
}

const outDir = fileURLToPath(new URL("../out/", import.meta.url));
const keys = walk(outDir);
if (!keys.includes("index.html")) throw new Error("out/index.html не найден — сначала npm run build");

let n = 0;
const queue = [...keys];
async function worker() {
  while (queue.length) {
    const key = queue.shift();
    await s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: readFileSync(join(outDir, key)),
        ContentType: TYPES[extname(key).toLowerCase()] || "application/octet-stream",
        CacheControl: cacheControl(key),
      }),
    );
    n++;
  }
}
await Promise.all(Array.from({ length: 8 }, worker));
console.log(`загружено: ${n}`);

// Удаляем из бакета то, чего больше нет в сборке
const local = new Set(keys);
const stale = [];
let token;
do {
  const page = await s3.send(new ListObjectsV2Command({ Bucket: bucket, ContinuationToken: token }));
  for (const o of page.Contents || []) if (!local.has(o.Key)) stale.push({ Key: o.Key });
  token = page.IsTruncated ? page.NextContinuationToken : undefined;
} while (token);
for (let i = 0; i < stale.length; i += 1000) {
  await s3.send(new DeleteObjectsCommand({ Bucket: bucket, Delete: { Objects: stale.slice(i, i + 1000) } }));
}
console.log(`удалено старых: ${stale.length}`);
