const NS=location.pathname.replace(/[^/]+$/,''),C='wallet-v33'+NS,SHELL=['./','index.html','manifest.json','jsbarcode.min.js','qrcode.js','stores.js','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(SHELL)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C&&(/^wallet-v\d+$/.test(x)||x.replace(/^wallet-v\d+/,'')===NS)).map(x=>caches.delete(x)))).then(()=>clients.claim()))});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET'||u.origin!==location.origin)return;
  if(u.pathname.endsWith('api.php')){
    if(u.searchParams.get('a')!=='img')return;
    e.respondWith(caches.open(C).then(async c=>{const m=await c.match(e.request);if(m)return m;const r=await fetch(e.request);if(r.ok)c.put(e.request,r.clone());return r}));return;
  }
  if(u.pathname.includes('/ocr/')){e.respondWith(caches.open(C).then(async c=>{const m=await c.match(e.request);if(m)return m;const r=await fetch(e.request);if(r.ok)c.put(e.request,r.clone());return r}));return}
  // shell: open instantly from cache, refresh in background
  e.respondWith(caches.open(C).then(async c=>{const m=await c.match(e.request,{ignoreSearch:true});
    const n=fetch(e.request,{cache:'no-cache'}).then(async r=>{if(r.ok){const txt=/\.(html|js)$|\/$/.test(u.pathname);
      const o=txt&&m?await m.clone().text():null,nw=txt?await r.clone().text():null;c.put(e.request,r.clone());
      if(o!==null&&o!==nw)self.clients.matchAll().then(cs=>cs.forEach(x=>x.postMessage('update')))}return r}).catch(()=>m);
    return m||n}));
});
