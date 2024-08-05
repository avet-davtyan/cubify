function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/Linker-BM0OPIAq.js","assets/Ranges-BAodXpag.js","assets/index-CSy8bGUR.js","assets/index-jQUsuZSA.css","assets/index-CFE6iDfW.js","assets/OptionsColor-Bi-4S5kh.js","assets/ParticlesInteractorBase-vfDeBun3.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as i}from"./index-CSy8bGUR.js";async function o(t,r=!0){await t.addInteractor("particlesLinks",async a=>{const{Linker:n}=await i(()=>import("./Linker-BM0OPIAq.js"),__vite__mapDeps([0,1,2,3,4,5,6]));return new n(a)},r)}export{o as loadLinksInteraction};
