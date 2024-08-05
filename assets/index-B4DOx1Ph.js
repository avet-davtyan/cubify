function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/RotateUpdater-DoXzP1SE.js","assets/index-CSy8bGUR.js","assets/index-jQUsuZSA.css","assets/ValueWithRandom-Xgv1nLVw.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as o}from"./index-CSy8bGUR.js";async function i(t,a=!0){await t.addParticleUpdater("rotate",async e=>{const{RotateUpdater:r}=await o(()=>import("./RotateUpdater-DoXzP1SE.js"),__vite__mapDeps([0,1,2,3]));return new r(e)},a)}export{i as loadRotateUpdater};
