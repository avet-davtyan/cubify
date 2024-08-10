function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-CXtcwC8z.js","assets/index-BBQOHCcO.js","assets/index-kB1-Xki0.css","assets/index-lxmH3Jir.js","assets/index-Dg84kvNL.js","assets/index-DFIEjUei.js","assets/index-yNQZ9gBt.js","assets/index-3a7JAPMP.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as t}from"./index-BBQOHCcO.js";async function s(a,_=!0){const{loadBaseMover:o}=await t(()=>import("./index-CXtcwC8z.js"),__vite__mapDeps([0,1,2])),{loadCircleShape:i}=await t(()=>import("./index-lxmH3Jir.js"),__vite__mapDeps([3,1,2])),{loadColorUpdater:r}=await t(()=>import("./index-Dg84kvNL.js"),__vite__mapDeps([4,1,2])),{loadOpacityUpdater:d}=await t(()=>import("./index-DFIEjUei.js"),__vite__mapDeps([5,1,2])),{loadOutModesUpdater:e}=await t(()=>import("./index-yNQZ9gBt.js"),__vite__mapDeps([6,1,2])),{loadSizeUpdater:l}=await t(()=>import("./index-3a7JAPMP.js"),__vite__mapDeps([7,1,2]));await o(a,!1),await i(a,!1),await r(a,!1),await d(a,!1),await e(a,!1),await l(a,!1),await a.refresh(_)}export{s as loadBasic};
