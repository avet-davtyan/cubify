function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/CircleDrawer-DRIki7ab.js","assets/index-CSy8bGUR.js","assets/index-jQUsuZSA.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as i}from"./index-CSy8bGUR.js";async function o(a,e=!0){const{CircleDrawer:r}=await i(()=>import("./CircleDrawer-DRIki7ab.js"),__vite__mapDeps([0,1,2]));await a.addShape("circle",new r,e)}export{o as loadCircleShape};
