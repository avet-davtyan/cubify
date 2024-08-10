function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/ParallaxMover-BhnmyWY2.js","assets/index-DnB0oRlV.js","assets/index-kB1-Xki0.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as t}from"./index-DnB0oRlV.js";async function l(a,r=!0){await a.addMover("parallax",async()=>{const{ParallaxMover:o}=await t(()=>import("./ParallaxMover-BhnmyWY2.js"),__vite__mapDeps([0,1,2]));return new o},r)}export{l as loadParallaxMover};
