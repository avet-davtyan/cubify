function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-ay5vGzlo.js","assets/index-CSy8bGUR.js","assets/index-jQUsuZSA.css","assets/index-BqZ2eB5x.js","assets/index-CW51pgVk.js","assets/index-ecYkvDDx.js","assets/index-aoIweCMW.js","assets/index-C03Db7Cq.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as t}from"./index-CSy8bGUR.js";async function s(a,_=!0){const{loadBaseMover:o}=await t(()=>import("./index-ay5vGzlo.js"),__vite__mapDeps([0,1,2])),{loadCircleShape:i}=await t(()=>import("./index-BqZ2eB5x.js"),__vite__mapDeps([3,1,2])),{loadColorUpdater:r}=await t(()=>import("./index-CW51pgVk.js"),__vite__mapDeps([4,1,2])),{loadOpacityUpdater:d}=await t(()=>import("./index-ecYkvDDx.js"),__vite__mapDeps([5,1,2])),{loadOutModesUpdater:e}=await t(()=>import("./index-aoIweCMW.js"),__vite__mapDeps([6,1,2])),{loadSizeUpdater:l}=await t(()=>import("./index-C03Db7Cq.js"),__vite__mapDeps([7,1,2]));await o(a,!1),await i(a,!1),await r(a,!1),await d(a,!1),await e(a,!1),await l(a,!1),await a.refresh(_)}export{s as loadBasic};
