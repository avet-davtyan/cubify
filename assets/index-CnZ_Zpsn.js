function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/StarDrawer-B2yO1I79.js","assets/index-CSy8bGUR.js","assets/index-jQUsuZSA.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as e}from"./index-CSy8bGUR.js";async function _(a,t=!0){const{StarDrawer:r}=await e(()=>import("./StarDrawer-B2yO1I79.js"),__vite__mapDeps([0,1,2]));await a.addShape("star",new r,t)}export{_ as loadStarShape};
