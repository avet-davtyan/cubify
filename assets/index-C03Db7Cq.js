function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/SizeUpdater-BSWiV8Mn.js","assets/index-CSy8bGUR.js","assets/index-jQUsuZSA.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as r}from"./index-CSy8bGUR.js";async function o(t,a=!0){await t.addParticleUpdater("size",async()=>{const{SizeUpdater:e}=await r(()=>import("./SizeUpdater-BSWiV8Mn.js"),__vite__mapDeps([0,1,2]));return new e},a)}export{o as loadSizeUpdater};
