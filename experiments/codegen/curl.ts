/* tsignore */
import { HAR, Request, Entry, Headers } from './har'
import { Files } from './codegen'

// const data: {[key: string]: Entry} = source

type APIDOM = HAR;

const blacklistedHeaders = new Set([
  'host',
  'dnt',
  'connection',
  'content-length',
  'cache-control',
  'origin',
  'upgrade-insecure-requests',
  'user-agent',
  'sec-fetch-site',
  'sec-fetch-dest',
  'sec-fetch-mode',
  'referer',
  'accept-encoding',
  'accept-language',
  'cookie'
])

const headersList = (headers: Headers): string[] => {
  return headers
    .filter(h => !blacklistedHeaders.has(h.name.toLowerCase()))
    .filter(h => !(h.name.toLowerCase() == 'accept' && h.value.includes('text/html'))) // Skip
    .map(h => {
    return `-H "${h.name}: ${h.value}"`
  })
}

const dataList = (req: Request): string[] => {
  if(req.postData?.params) {
    return req.postData.params.map( p => {
      return `--data"${p.name}=${p.value}"`
    })
  }

  if(req.bodySize)
    return ['--data-binary ' + "'" + req.postData.text + "'"]

  return []

}

const indentCli = (args: string[]) => {
  return args.join(' \\\n  ')
}

const responseExpected = (e: Entry) => {
  return `
# This call: ${e.response?.status}
`
}
const methodStr = (req: Request): string[] => {
  if(req.method === 'GET')
    return []
  return [`-X ${req.method}`]
}

export function curlStr (entry: Entry): string {
  const req = entry.request
  const {host, pathname,protocol} = new URL(req.url)
  const serverEnv = `SERVER=${protocol}//${host} \\`
  return responseExpected(entry)
    + serverEnv
    + '\n'
    + 'curl '
    + indentCli([
    `"$SERVER${pathname}"`,
    ...methodStr(req),
    ...headersList(req.headers),
    ...dataList(req),
  ])
}

export default function process(data: APIDOM, options: any): Files {
  const raw = data.log.entries
      .filter(a => a.request)
      .map(e => curlStr(e)).join('\n\n')

  return {
    raw
  }
}
