function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-Bk6pLnLH.js","assets/index-CjIPU67M.js","assets/index-jQUsuZSA.css","assets/index-ljvoNTIs.js","assets/index-2Zr6zNU4.js","assets/index-BOKDn1VE.js","assets/index-CuB1CL0D.js","assets/index-zVnV8Nmk.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as t}from"./index-CjIPU67M.js";async function s(a,_=!0){const{loadBaseMover:o}=await t(()=>import("./index-Bk6pLnLH.js"),__vite__mapDeps([0,1,2])),{loadCircleShape:i}=await t(()=>import("./index-ljvoNTIs.js"),__vite__mapDeps([3,1,2])),{loadColorUpdater:r}=await t(()=>import("./index-2Zr6zNU4.js"),__vite__mapDeps([4,1,2])),{loadOpacityUpdater:d}=await t(()=>import("./index-BOKDn1VE.js"),__vite__mapDeps([5,1,2])),{loadOutModesUpdater:e}=await t(()=>import("./index-CuB1CL0D.js"),__vite__mapDeps([6,1,2])),{loadSizeUpdater:l}=await t(()=>import("./index-zVnV8Nmk.js"),__vite__mapDeps([7,1,2]));await o(a,!1),await i(a,!1),await r(a,!1),await d(a,!1),await e(a,!1),await l(a,!1),await a.refresh(_)}export{s as loadBasic};
