function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/OpacityUpdater-BTF6N5iw.js","assets/index-CSy8bGUR.js","assets/index-jQUsuZSA.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as i}from"./index-CSy8bGUR.js";async function p(t,a=!0){await t.addParticleUpdater("opacity",async r=>{const{OpacityUpdater:e}=await i(()=>import("./OpacityUpdater-BTF6N5iw.js"),__vite__mapDeps([0,1,2]));return new e(r)},a)}export{p as loadOpacityUpdater};
