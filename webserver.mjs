/*
// webserver module for Deno

- how to use
// provide under docs folder as web

import { serve } from 'https://deno.land/std@0.50.0/http/server.ts'
import { serveWeb } from 'https://taisukef.github.io/denolib/webserver.mjs'

const PORT = 80
const server = serve({ port: PORT })
for await (const req of server) {
  serveWeb(req)
}
*/

const CONTENT_TYPE = {
  html: "text/html; charset=utf-8",
  png: "image/png",
  gif: "image/gif",
  jpg: "image/jpeg",
  txt: "text/plain",
  js: "application/javascript",
  mjs: "application/javascript",
  json: "application/json",
  jsonld: "application/ld+json",
  csv: "text/csv",
  css: "text/css",
  pdf: "application/pdf",
  ico: "image/vnd.microsoft.icon",
};

const serveWeb = (req, basedir) => {
  if (basedir == null) {
    basedir = "docs";
  }
  let url = req.url;
  if (url === "/favicon.ico") {
    req.respond({ body: "" });
    return;
  }
  if (url === "/") {
    url = "/index.html";
  }
  if (basedir.endsWith("/")) {
    basedir = basedir.substring(0, basedir.length - 1);
  }
  const n = url.lastIndexOf(".");
  if (url.indexOf("..") === -1 && n >= 0) {
    const ext = url.substring(n + 1);
    const path = basedir + url;
    // console.log(path)
    try {
      const body = Deno.readFileSync(path);
      if (body) {
        const headers = new Headers();
        headers.set("Content-Type", CONTENT_TYPE[ext] || "text/plain");
        req.respond({ body, headers });
        return;
      }
    } catch (e) {
      const headers = new Headers();
      headers.set("Content-Type", "text/html");
      req.respond({ body: 'error', headers });
      return;
    }
  }
  req.respond({ body: "" });
};

export { serveWeb };
