#!/usr/bin/env node
// Scans every git-tracked file for credential-shaped strings and exits 1 on a hit.
// No dependencies. Run with: npm run check:secrets
import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

const PATTERNS = [
  { name: 'Google API key', re: /AIza[0-9A-Za-z_-]{35}/ },
  { name: 'Sanity token', re: /\bsk[A-Za-z0-9]{80,}\b/ },
  { name: 'GoHighLevel PIT', re: /\bpit-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/ },
  { name: 'JWT', re: /\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b/ },
  { name: 'OpenAI/Anthropic key', re: /\bsk-(?:ant-)?[A-Za-z0-9_-]{32,}\b/ },
  { name: 'AWS access key', re: /\bAKIA[0-9A-Z]{16}\b/ },
]
const SKIP = /\.(png|jpe?g|gif|webp|svg|ico|woff2?|ttf|otf|pdf|lock)$|^package-lock\.json$|^scripts\/check-no-secrets\.mjs$/

const files = execSync('git ls-files -z', { encoding: 'utf8' }).split('\0').filter(Boolean)
let hits = 0
for (const file of files) {
  if (SKIP.test(file)) continue
  let text
  try { text = readFileSync(file, 'utf8') } catch { continue }
  const lines = text.split('\n')
  lines.forEach((line, i) => {
    for (const { name, re } of PATTERNS) {
      if (re.test(line)) {
        hits++
        console.error(`${file}:${i + 1}: possible ${name}`)
      }
    }
  })
}
if (hits) {
  console.error(`\ncheck-no-secrets: ${hits} possible secret(s) found in tracked files.`)
  process.exit(1)
}
console.log(`check-no-secrets: OK (${files.length} tracked files scanned)`)
