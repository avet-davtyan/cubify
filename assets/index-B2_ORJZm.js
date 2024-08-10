function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-D5CyadCW.js","assets/index-BzbF8JXD.js","assets/index-kB1-Xki0.css","assets/index-DK6Mz8MU.js","assets/index-DqQb-vAj.js","assets/index-CT0WqoCl.js","assets/index-2yA74mkN.js","assets/index-3lIRveEJ.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as t}from"./index-BzbF8JXD.js";async function s(a,_=!0){const{loadBaseMover:o}=await t(()=>import("./index-D5CyadCW.js"),__vite__mapDeps([0,1,2])),{loadCircleShape:i}=await t(()=>import("./index-DK6Mz8MU.js"),__vite__mapDeps([3,1,2])),{loadColorUpdater:r}=await t(()=>import("./index-DqQb-vAj.js"),__vite__mapDeps([4,1,2])),{loadOpacityUpdater:d}=await t(()=>import("./index-CT0WqoCl.js"),__vite__mapDeps([5,1,2])),{loadOutModesUpdater:e}=await t(()=>import("./index-2yA74mkN.js"),__vite__mapDeps([6,1,2])),{loadSizeUpdater:l}=await t(()=>import("./index-3lIRveEJ.js"),__vite__mapDeps([7,1,2]));await o(a,!1),await i(a,!1),await r(a,!1),await d(a,!1),await e(a,!1),await l(a,!1),await a.refresh(_)}export{s as loadBasic};
