import fs from './fs.js'

const dotenv = {}

dotenv.config = function () {
  const s = fs.readFileSync('.env')
  if (!s) { return }
  const ss = s.split('\n')
  for (const line of ss) {
    const n = line.indexOf('=')
    if (n < 0) { continue }
    const name = line.substring(0, n).trim()
    const val = line.substring(n + 1).trim()
    Deno.env.set(name, val)
  }
}

export default dotenv
