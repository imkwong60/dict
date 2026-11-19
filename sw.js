const CACHE='cangjie-pwa-v4';
const CORE=['./','./index.html','./manifest.json','./icon.svg','./icon-192.png','./icon-512.png'];
const OPTIONAL=['./dict.txt'];
self.addEventListener('install',e=>e.waitUntil((async()=>{
  const c=await caches.open(CACHE);
  await c.addAll(CORE);
  await Promise.allSettled(OPTIONAL.map(u=>c.add(u)));
  await self.skipWaiting();
})()));
self.addEventListener('activate',e=>e.waitUntil((async()=>{
  for(const k of await caches.keys()) if(k!==CACHE) await caches.delete(k);
  await self.clients.claim();
})()));
self.addEventListener('fetch',e=>{
  const req=e.request;
  if(req.method!=='GET')return;
  const u=new URL(req.url);
  if(u.origin!==location.origin)return;
  e.respondWith((async()=>{
    const c=await caches.open(CACHE);
    const hit=await c.match(req,{ignoreSearch:true});
    if(hit)return hit;
    try{
      const r=await fetch(req);
      if(r&&r.ok)c.put(req,r.clone());
      return r;
    }catch(err){
      if(req.mode==='navigate')return (await c.match('./index.html'))||(await c.match('./'));
      return new Response('',{status:504,statusText:'offline'});
    }
  })());
});
