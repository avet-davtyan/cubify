function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/LinkInstance-f4rinyEX.js","assets/index-CSy8bGUR.js","assets/index-jQUsuZSA.css","assets/CanvasUtils-x_VMMK6R.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as i}from"./index-CSy8bGUR.js";class s{constructor(){this.id="links"}async getPlugin(n){const{LinkInstance:t}=await i(()=>import("./LinkInstance-f4rinyEX.js"),__vite__mapDeps([0,1,2,3]));return new t(n)}loadOptions(){}needsPlugin(){return!0}}export{s as LinksPlugin};
