function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-D09bHrlm.js","assets/index-C_fUvfwj.js","assets/index-jQUsuZSA.css","assets/index-CW5mU_NR.js","assets/index-9E_si7iq.js","assets/index-Df7Y0LwJ.js","assets/index-CgTZjRvs.js","assets/index-B6nFiHZJ.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as t}from"./index-C_fUvfwj.js";async function s(a,_=!0){const{loadBaseMover:o}=await t(()=>import("./index-D09bHrlm.js"),__vite__mapDeps([0,1,2])),{loadCircleShape:i}=await t(()=>import("./index-CW5mU_NR.js"),__vite__mapDeps([3,1,2])),{loadColorUpdater:r}=await t(()=>import("./index-9E_si7iq.js"),__vite__mapDeps([4,1,2])),{loadOpacityUpdater:d}=await t(()=>import("./index-Df7Y0LwJ.js"),__vite__mapDeps([5,1,2])),{loadOutModesUpdater:e}=await t(()=>import("./index-CgTZjRvs.js"),__vite__mapDeps([6,1,2])),{loadSizeUpdater:l}=await t(()=>import("./index-B6nFiHZJ.js"),__vite__mapDeps([7,1,2]));await o(a,!1),await i(a,!1),await r(a,!1),await d(a,!1),await e(a,!1),await l(a,!1),await a.refresh(_)}export{s as loadBasic};
