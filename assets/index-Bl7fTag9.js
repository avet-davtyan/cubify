function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/StarDrawer-Mtto-Oyk.js","assets/index-DdOcmjSi.js","assets/index-kB1-Xki0.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as e}from"./index-DdOcmjSi.js";async function _(a,t=!0){const{StarDrawer:r}=await e(()=>import("./StarDrawer-Mtto-Oyk.js"),__vite__mapDeps([0,1,2]));await a.addShape("star",new r,t)}export{_ as loadStarShape};