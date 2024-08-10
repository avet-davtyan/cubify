function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-BE3sh-Ar.js","assets/index-C6KP8068.js","assets/index-kB1-Xki0.css","assets/index-BFGdPtUs.js","assets/index-49VQOc5h.js","assets/index-Ch390r01.js","assets/index-DyL80fDv.js","assets/index-Cz88yj0Y.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as t}from"./index-C6KP8068.js";async function s(a,_=!0){const{loadBaseMover:o}=await t(()=>import("./index-BE3sh-Ar.js"),__vite__mapDeps([0,1,2])),{loadCircleShape:i}=await t(()=>import("./index-BFGdPtUs.js"),__vite__mapDeps([3,1,2])),{loadColorUpdater:r}=await t(()=>import("./index-49VQOc5h.js"),__vite__mapDeps([4,1,2])),{loadOpacityUpdater:d}=await t(()=>import("./index-Ch390r01.js"),__vite__mapDeps([5,1,2])),{loadOutModesUpdater:e}=await t(()=>import("./index-DyL80fDv.js"),__vite__mapDeps([6,1,2])),{loadSizeUpdater:l}=await t(()=>import("./index-Cz88yj0Y.js"),__vite__mapDeps([7,1,2]));await o(a,!1),await i(a,!1),await r(a,!1),await d(a,!1),await e(a,!1),await l(a,!1),await a.refresh(_)}export{s as loadBasic};
