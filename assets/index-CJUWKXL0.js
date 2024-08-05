function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/PolygonDrawer-CDKVX_W3.js","assets/PolygonDrawerBase-DpvAjISt.js","assets/index-CSy8bGUR.js","assets/index-jQUsuZSA.css","assets/TriangleDrawer-CdEW5YP5.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as n}from"./index-CSy8bGUR.js";async function e(a,o=!0){const{PolygonDrawer:t}=await n(()=>import("./PolygonDrawer-CDKVX_W3.js"),__vite__mapDeps([0,1,2,3]));await a.addShape("polygon",new t,o)}async function i(a,o=!0){const{TriangleDrawer:t}=await n(()=>import("./TriangleDrawer-CdEW5YP5.js"),__vite__mapDeps([4,1,2,3]));await a.addShape("triangle",new t,o)}async function _(a,o=!0){await e(a,o),await i(a,o)}export{e as loadGenericPolygonShape,_ as loadPolygonShape,i as loadTriangleShape};
