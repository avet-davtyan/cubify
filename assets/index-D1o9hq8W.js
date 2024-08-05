function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-BiU5TZ96.js","assets/index-DEi2n4cl.js","assets/index-jQUsuZSA.css","assets/index-MAazix_x.js","assets/index-wLPjsh8E.js","assets/index-C25sTAqa.js","assets/index-2E_dpEEy.js","assets/index-EAQL61E4.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as t}from"./index-DEi2n4cl.js";async function s(a,_=!0){const{loadBaseMover:o}=await t(()=>import("./index-BiU5TZ96.js"),__vite__mapDeps([0,1,2])),{loadCircleShape:i}=await t(()=>import("./index-MAazix_x.js"),__vite__mapDeps([3,1,2])),{loadColorUpdater:r}=await t(()=>import("./index-wLPjsh8E.js"),__vite__mapDeps([4,1,2])),{loadOpacityUpdater:d}=await t(()=>import("./index-C25sTAqa.js"),__vite__mapDeps([5,1,2])),{loadOutModesUpdater:e}=await t(()=>import("./index-2E_dpEEy.js"),__vite__mapDeps([6,1,2])),{loadSizeUpdater:l}=await t(()=>import("./index-EAQL61E4.js"),__vite__mapDeps([7,1,2]));await o(a,!1),await i(a,!1),await r(a,!1),await d(a,!1),await e(a,!1),await l(a,!1),await a.refresh(_)}export{s as loadBasic};
