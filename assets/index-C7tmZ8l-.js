function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-Bi59PQhf.js","assets/index-3PCYTNKd.js","assets/index-jQUsuZSA.css","assets/index-DYkFwCJ9.js","assets/index-Cc-LnLMS.js","assets/index-DpLCaqXT.js","assets/index-Bludcv86.js","assets/index-DhbvWGSQ.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as t}from"./index-3PCYTNKd.js";async function s(a,_=!0){const{loadBaseMover:o}=await t(()=>import("./index-Bi59PQhf.js"),__vite__mapDeps([0,1,2])),{loadCircleShape:i}=await t(()=>import("./index-DYkFwCJ9.js"),__vite__mapDeps([3,1,2])),{loadColorUpdater:r}=await t(()=>import("./index-Cc-LnLMS.js"),__vite__mapDeps([4,1,2])),{loadOpacityUpdater:d}=await t(()=>import("./index-DpLCaqXT.js"),__vite__mapDeps([5,1,2])),{loadOutModesUpdater:e}=await t(()=>import("./index-Bludcv86.js"),__vite__mapDeps([6,1,2])),{loadSizeUpdater:l}=await t(()=>import("./index-DhbvWGSQ.js"),__vite__mapDeps([7,1,2]));await o(a,!1),await i(a,!1),await r(a,!1),await d(a,!1),await e(a,!1),await l(a,!1),await a.refresh(_)}export{s as loadBasic};
