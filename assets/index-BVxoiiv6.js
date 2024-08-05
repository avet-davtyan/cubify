function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/Attractor-BYdoeJx6.js","assets/ParticlesInteractorBase-vfDeBun3.js","assets/index-CSy8bGUR.js","assets/index-jQUsuZSA.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{_ as c}from"./index-CSy8bGUR.js";async function i(t,r=!0){await t.addInteractor("particlesAttract",async a=>{const{Attractor:o}=await c(()=>import("./Attractor-BYdoeJx6.js"),__vite__mapDeps([0,1,2,3]));return new o(a)},r)}export{i as loadParticlesAttractInteraction};
