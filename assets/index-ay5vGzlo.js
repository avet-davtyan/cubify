function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/BaseMover-DB35sks_.js","assets/index-CSy8bGUR.js","assets/index-jQUsuZSA.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as r}from"./index-CSy8bGUR.js";async function _(a,e=!0){await a.addMover("base",async()=>{const{BaseMover:o}=await r(()=>import("./BaseMover-DB35sks_.js"),__vite__mapDeps([0,1,2]));return new o},e)}export{_ as loadBaseMover};
