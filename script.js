if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
function resetToHome() {
  if (window.location.hash) {
    const homeUrl = new URL(window.location.href);
    homeUrl.hash = '';
    history.replaceState(null, '', homeUrl);
  }
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
}
resetToHome();
window.addEventListener('pageshow', resetToHome);

const landingScreen=document.querySelector('.landing-screen');
landingScreen.querySelector('.landing-open').addEventListener('click',()=>{
  landingScreen.classList.add('is-opening');
  window.setTimeout(()=>{
    landingScreen.hidden=true;
    document.body.classList.remove('landing-active');
  },650);
});

const nav=document.querySelector('.nav');window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',window.scrollY>60),{passive:true});const menu=document.querySelector('.menu');menu.addEventListener('click',()=>{const links=document.querySelector('.links');const open=links.classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});document.querySelectorAll('.links a').forEach(a=>a.addEventListener('click',()=>{document.querySelector('.links').classList.remove('open');menu.setAttribute('aria-expanded','false')}));const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));function tick(){const delta=Math.max(0,new Date('2026-12-19T08:30:00-05:00')-new Date());const values=[Math.floor(delta/86400000),Math.floor(delta/3600000)%24,Math.floor(delta/60000)%60,Math.floor(delta/1000)%60];['days','hours','minutes','seconds'].forEach((id,i)=>document.getElementById(id).textContent=String(values[i]).padStart(2,'0'))}tick();setInterval(tick,1000);
const hero=document.querySelector('.hero');
const heroStage=document.querySelector('.hero-stage');
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let heroFrame=0;
let heroProgress=0;
let targetHeroProgress=0;

function updateHero(){
  heroFrame=0;
  if(reduceMotion)return;
  heroProgress+=(targetHeroProgress-heroProgress)*.14;
  if(Math.abs(targetHeroProgress-heroProgress)<.001)heroProgress=targetHeroProgress;
  heroStage.style.setProperty('--hero-progress',heroProgress.toFixed(3));
  heroStage.style.setProperty('--art-y',`${-heroProgress*42}px`);
  heroStage.style.setProperty('--art-scale',String(1+heroProgress*.035));
  heroStage.style.setProperty('--title-opacity',String(Math.max(0,1-heroProgress*1.7)));
  heroStage.style.setProperty('--title-y',`${-heroProgress*24}px`);
  if(heroProgress!==targetHeroProgress)heroFrame=requestAnimationFrame(updateHero);
}

function requestHeroUpdate(){
  if(reduceMotion)return;
  const range=hero.offsetHeight-heroStage.offsetHeight;
  targetHeroProgress=range>0?Math.min(1,Math.max(0,-hero.getBoundingClientRect().top/range)):0;
  if(!heroFrame)heroFrame=requestAnimationFrame(updateHero);
}

window.addEventListener('scroll',requestHeroUpdate,{passive:true});
window.addEventListener('resize',requestHeroUpdate);
updateHero();
