function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-D4AYotcf.js","assets/index-DdOcmjSi.js","assets/index-kB1-Xki0.css","assets/index-DtAn9rVq.js","assets/index-Dce4S-tm.js","assets/index-BRv1YNC3.js","assets/index-CQxRsxGD.js","assets/index-V-nMQZ7O.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as t}from"./index-DdOcmjSi.js";async function s(a,_=!0){const{loadBaseMover:o}=await t(()=>import("./index-D4AYotcf.js"),__vite__mapDeps([0,1,2])),{loadCircleShape:i}=await t(()=>import("./index-DtAn9rVq.js"),__vite__mapDeps([3,1,2])),{loadColorUpdater:r}=await t(()=>import("./index-Dce4S-tm.js"),__vite__mapDeps([4,1,2])),{loadOpacityUpdater:d}=await t(()=>import("./index-BRv1YNC3.js"),__vite__mapDeps([5,1,2])),{loadOutModesUpdater:e}=await t(()=>import("./index-CQxRsxGD.js"),__vite__mapDeps([6,1,2])),{loadSizeUpdater:l}=await t(()=>import("./index-V-nMQZ7O.js"),__vite__mapDeps([7,1,2]));await o(a,!1),await i(a,!1),await r(a,!1),await d(a,!1),await e(a,!1),await l(a,!1),await a.refresh(_)}export{s as loadBasic};
