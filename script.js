const nav=document.querySelector('.nav');window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',window.scrollY>60),{passive:true});const menu=document.querySelector('.menu');menu.addEventListener('click',()=>{const links=document.querySelector('.links');const open=links.classList.toggle('open');menu.setAttribute('aria-expanded',String(open))});document.querySelectorAll('.links a').forEach(a=>a.addEventListener('click',()=>{document.querySelector('.links').classList.remove('open');menu.setAttribute('aria-expanded','false')}));const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));function tick(){const delta=Math.max(0,new Date('2026-12-19T08:30:00-05:00')-new Date());const values=[Math.floor(delta/86400000),Math.floor(delta/3600000)%24,Math.floor(delta/60000)%60,Math.floor(delta/1000)%60];['days','hours','minutes','seconds'].forEach((id,i)=>document.getElementById(id).textContent=String(values[i]).padStart(2,'0'))}tick();setInterval(tick,1000);const form=document.getElementById('rsvp-form');form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const d=Object.fromEntries(new FormData(form));const entries=JSON.parse(localStorage.getItem('kws-preview-rsvp')||'[]');entries.push({...d,savedAt:new Date().toISOString()});localStorage.setItem('kws-preview-rsvp',JSON.stringify(entries));document.getElementById('form-status').textContent='Preview saved in this browser only. The couple will not receive this RSVP until the form is connected to a submission service.';form.reset()});
const hero=document.querySelector('.hero');
const heroStage=document.querySelector('.hero-stage');
const revealButton=document.querySelector('.scroll-down');
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let heroFrame=0;

function updateHero(){
  heroFrame=0;
  if(reduceMotion)return;
  const range=hero.offsetHeight-window.innerHeight;
  const progress=range>0?Math.min(1,Math.max(0,-hero.getBoundingClientRect().top/range)):0;
  heroStage.style.setProperty('--hero-scale',String(1+progress*(window.innerWidth<=760?3.8:.62)));
  heroStage.style.setProperty('--sky-opacity',String(Math.max(0,1-progress*2.8)));
  heroStage.style.setProperty('--title-opacity',String(Math.min(1,Math.max(0,(progress-.28)*3.5))));
  heroStage.style.setProperty('--title-offset',`${Math.max(0,1-progress*2)*32}px`);
  heroStage.style.setProperty('--birds-opacity',String(Math.max(0,1-progress*3)));
}

function requestHeroUpdate(){
  if(!heroFrame)heroFrame=requestAnimationFrame(updateHero);
}

window.addEventListener('scroll',requestHeroUpdate,{passive:true});
window.addEventListener('resize',requestHeroUpdate);
updateHero();
revealButton.addEventListener('click',()=>window.scrollBy({
  top:Math.round(window.innerHeight*.45),
  behavior:reduceMotion?'auto':'smooth'
}));
