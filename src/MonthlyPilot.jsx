import React, { useMemo, useState } from "react";
import { CalendarDays, Users, CheckCircle2, ShieldCheck, Share2, Languages, MessageCircle, TrendingDown, Clock3, ArrowRight } from "lucide-react";

// Four-week pilot. These are planned weekly departures, NOT booked/confirmed trips.
// Never show fabricated occupancy, fixed departures or approved discounts.
const WA = "84937762607";
const EXPERIENCES = [
  { id:"bana", weekday:2, image:"/tour1.jpg", name:{ru:"Бана Хиллс и Золотой мост",en:"Ba Na Hills & Golden Bridge"}, short:{ru:"Горы, канатная дорога и знаменитый мост",en:"Mountains, cable car and the iconic bridge"}, baseline:1550000, from:"Da Nang", weather:false },
  { id:"hoian", weekday:4, image:"/tour8.jpg", name:{ru:"Хойан и кокосовый лес",en:"Hoi An & Coconut Forest"}, short:{ru:"Круглая лодка, фонарики и старый город",en:"Basket boat, lanterns and the old town"}, baseline:1250000, from:"Da Nang", weather:false },
  { id:"cham", weekday:6, image:"/tour6.jpg", name:{ru:"Остров Чам: снорклинг",en:"Cham Island Snorkeling"}, short:{ru:"Скоростной катер, пляж и подводный мир",en:"Speedboat, beach and snorkeling"}, baseline:950000, from:"Da Nang / Hoi An", weather:true }
];
const DAYS={ru:["вс","пн","вт","ср","чт","пт","сб"],en:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]};
const TXT={
ru:{
  pilot:"ПИЛОТНЫЙ ПРОЕКТ · 4 НЕДЕЛИ",headline:"Вместе путешествовать выгоднее.",lead:"Три экскурсии. Один день в неделю для каждой. До 10 путешественников в отдельной русскоязычной или англоязычной группе.",cta:"Выбрать дату",browse:"Ближайшие запланированные даты",sub:"Выберите удобную дату и язык экскурсии. Мы подтвердим стоимость, состав группы и выезд до оплаты.",ruGroup:"Русскоязычный гид",enGroup:"Англоязычный гид",planned:"Приём заявок",weeks:"4 недели",places:"До 10 мест в группе",price:"Обычный ориентир",notFinal:"Цена группового тура будет подтверждена после проверки расходов",tiers:"Как может снижаться цена",tierNote:"Пример механики, не опубликованные тарифы. Реальные цены для русского и английского гида рассчитываются отдельно и утверждаются до начала продаж.",guestCount:"Участников в примере",starting:"Цена до скидки",estimate:"Пример цены при таком размере группы",save:"Возможная экономия",floor:"Ни одна скидка не включается без подтверждённой себестоимости.",select:"Заявка на эту дату",language:"Язык экскурсии",date:"Дата",adults:"Взрослые",children:"Дети",name:"Ваше имя",phone:"WhatsApp с кодом страны",hotel:"Отель / район",notes:"Пожелания (необязательно)",agree:"Согласен(-на), чтобы GoVietStay связался со мной по этой заявке.",send:"Отправить заявку через WhatsApp",invalid:"Проверьте имя, дату, номер WhatsApp и согласие на связь.",cancel:"Закрыть",request:"Бесплатная заявка — без оплаты сейчас",uncertain:"Даты предварительные. Выезд и окончательная цена только после подтверждения. Если группа не наберётся, предложим перенос или отказ без оплаты.",sea:"Морская прогулка зависит от погоды и разрешения на выход.",how:"Всё просто",steps:["Выберите экскурсию, дату и язык гида","Оставьте заявку без предоплаты","После набора группы подтвердим маршрут, цену и выезд","Решите, оплачивать ли поездку. При более низкой окончательной цене она действует для всех"],share:"Поделиться поездкой",shareDone:"Ссылка скопирована",langSwitch:"English",guide:"Гид",refer:"Пригласите друзей — если группа растёт, цена может стать ниже для всех.",more:"Другие индивидуальные экскурсии",stamp:"30 дней теста · только реальные заявки",choose:"Выбрать",from:"Отправление из",privacy:"Телефоны других гостей никому не показываются.",number:"Человек",benefit:"Раннее обращение не должно означать более высокую итоговую цену."},
en:{
  pilot:"4-WEEK PILOT",headline:"Go together. Save together.",lead:"Three experiences. One planned departure per tour each week. Up to 10 travellers per dedicated English- or Russian-speaking guide group.",cta:"Choose a date",browse:"Upcoming planned departures",sub:"Pick your date and guide language. We confirm the group, itinerary and final price before any payment.",ruGroup:"Russian-speaking guide",enGroup:"English-speaking guide",planned:"Requests open",weeks:"4 weeks",places:"Up to 10 guests per group",price:"Regular price reference",notFinal:"Group price confirmed after supplier and guide costs are checked",tiers:"How group pricing could work",tierNote:"Illustrative mechanism, not published rates. English and Russian guided groups are costed separately and rates must be approved before sales.",guestCount:"Example group size",starting:"Regular reference",estimate:"Illustrative price at this group size",save:"Potential savings",floor:"No discount activates without verified costs and a minimum margin.",select:"Request this date",language:"Guide language",date:"Date",adults:"Adults",children:"Children",name:"Your name",phone:"WhatsApp with country code",hotel:"Hotel / area",notes:"Special requests (optional)",agree:"I agree that GoVietStay may contact me about this request.",send:"Send request via WhatsApp",invalid:"Please check your name, date, WhatsApp number and consent.",cancel:"Close",request:"Free request — no payment now",uncertain:"Dates are tentative. Departure and final price require confirmation. If the group is not formed, choose another date or decline without paying.",sea:"Sea trips depend on weather and departure clearance.",how:"How it works",steps:["Choose the tour, date and guide language","Send a free request with no deposit","Once a group forms, we confirm the itinerary, price and departure","Decide whether to pay. Any lower final group price applies to everyone"],share:"Share the trip",shareDone:"Link copied",langSwitch:"Русский",guide:"Guide",refer:"Invite friends — a larger group could mean a lower price for everyone.",more:"Other private tours",stamp:"30-day trial · genuine requests only",choose:"Choose",from:"Departure from",privacy:"Other guests' phone numbers are never displayed.",number:"Guests",benefit:"Booking interest early should never mean a higher final price."}
};
const fmt=n=>new Intl.NumberFormat("vi-VN").format(n)+" ₫";
function plannedDates(weekday){
  const now=new Date(), today=new Date(now.getFullYear(),now.getMonth(),now.getDate());
  const monday=new Date(today);
  monday.setDate(today.getDate()+((8-today.getDay())%7||7));
  return Array.from({length:4},(_,i)=>{const day=new Date(monday);day.setDate(monday.getDate()+i*7+weekday-1);return day;});
}
function iso(d){return [d.getFullYear(),String(d.getMonth()+1).padStart(2,"0"),String(d.getDate()).padStart(2,"0")].join("-");}
function createWhatsAppMessage({tour,lang,date,form,locale}){
  return [
    "GoVietStay · 4-week Group Deals PILOT","Request only — no payment or guaranteed departure.",
    "Tour: "+tour.name.en,"Preferred departure: "+date,
    "Guide: "+(lang==="ru"?"Russian-speaking":"English-speaking"),
    "Interface language: "+locale,"Adults: "+form.adults,"Children: "+form.children,
    "Name: "+form.name.trim(),"WhatsApp: "+form.phone.trim(),
    "Hotel/area: "+(form.hotel.trim()||"TBC"),"Notes: "+(form.notes.trim()||"None"),
    "Please confirm availability, departure, inclusions and final VND price before payment."
  ].join("\n");
}
export default function MonthlyPilot(){
  const [locale,setLocale]=useState("ru");
  const [guide,setGuide]=useState("ru");
  const [exampleSize,setExampleSize]=useState(6);
  const [selected,setSelected]=useState(null);
  const [form,setForm]=useState({name:"",phone:"",hotel:"",notes:"",adults:1,children:0,agree:false});
  const [error,setError]=useState("");
  const [copied,setCopied]=useState(false);
  const t=TXT[locale];
  const groupDiscount=exampleSize>=10?0.9:exampleSize>=8?0.92:exampleSize>=6?0.96:1;
  function request(tour,date){
    setSelected({tour,date:iso(date)});setError("");
    setForm(f=>({...f,agree:false}));
  }
  function send(e){
    e.preventDefault();
    if(!selected || !form.name.trim() || !/^\+?[0-9 ()-]{8,20}$/.test(form.phone.trim()) || !form.agree || Number(form.adults)+Number(form.children)<1){setError(t.invalid);return;}
    const text=createWhatsAppMessage({tour:selected.tour,date:selected.date,lang:guide,form,locale});
    window.open("https://wa.me/"+WA+"?text="+encodeURIComponent(text),"_blank","noopener,noreferrer");
  }
  async function share(tour){
    const url=window.location.origin+window.location.pathname+"#group-deals"+(tour?"?tour="+tour.id:"");
    try{
      if(navigator.share){await navigator.share({title:"GoVietStay Group Deals",url});return;}
      await navigator.clipboard.writeText(url);setCopied(true);setTimeout(()=>setCopied(false),1800);
    }catch(e){if(e.name!=="AbortError")window.prompt("Copy:",url);}
  }
  return <section id="group-deals" className="bg-[#f3f9f4] px-4 py-10 text-slate-900 md:px-7 md:py-16">
    <div className="mx-auto max-w-7xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3"><img src="/logo.jpg" alt="GoVietStay" className="h-14 w-14 rounded-full bg-white p-1 shadow"/><div><p className="text-sm font-black tracking-widest text-emerald-950">GOVIETSTAY</p><p className="text-xs font-bold tracking-wide text-emerald-700">WEEKLY GROUP DEALS</p></div></div>
        <button type="button" onClick={()=>setLocale(l=>l==="ru"?"en":"ru")} className="flex items-center gap-2 rounded-full bg-white px-5 py-3 font-bold text-emerald-950 shadow-sm ring-1 ring-emerald-200"><Languages size={17}/>{t.langSwitch}</button>
      </div>
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-700 p-7 text-white md:p-12">
        <div className="relative z-10 max-w-4xl"><span className="inline-block rounded-full bg-lime-300 px-4 py-2 text-xs font-black tracking-wider text-emerald-950">{t.pilot}</span><h2 className="mt-6 text-4xl font-black leading-[1.07] md:text-6xl">{t.headline}</h2><p className="mt-5 max-w-2xl text-base leading-relaxed text-emerald-50 md:text-xl">{t.lead}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">{[{i:<CalendarDays size={20}/>,v:t.weeks},{i:<Users size={20}/>,v:t.places},{i:<ShieldCheck size={20}/>,v:t.request}].map((x,i)=><div key={i} className="flex items-center gap-3 rounded-2xl bg-white/10 p-3 text-sm font-semibold">{x.i}{x.v}</div>)}</div>
          <a href="#pilot-trips" className="mt-8 inline-flex items-center gap-2 rounded-full bg-lime-300 px-7 py-4 text-lg font-black text-emerald-950 shadow-lg">{t.cta}<ArrowRight size={19}/></a>
        </div><div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-lime-200/10 blur-3xl"/>
      </div>
      <div className="my-9 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-emerald-100 md:p-7">
        <p className="mb-3 text-base font-black text-emerald-950">{t.language}</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {[["ru",t.ruGroup,"🇷🇺"],["en",t.enGroup,"🇬🇧"]].map(([value,label,flag])=><button key={value} onClick={()=>setGuide(value)} className={"flex items-center gap-3 rounded-2xl border-2 p-4 text-left font-black transition "+(guide===value?"border-emerald-700 bg-emerald-50 text-emerald-950":"border-slate-200 bg-white text-slate-700")}><span className="text-2xl">{flag}</span><span className="flex-1">{label}</span>{guide===value&&<CheckCircle2 className="text-emerald-700"/>}</button>)}
        </div><p className="mt-3 text-sm text-slate-600">{t.privacy}</p>
      </div>
      <div id="pilot-trips"><h3 className="text-3xl font-black text-emerald-950">{t.browse}</h3><p className="mt-2 max-w-3xl text-slate-600">{t.sub}</p></div>
      <div className="mt-6 grid gap-6 lg:grid-cols-3">{EXPERIENCES.map(tour=><article key={tour.id} className="overflow-hidden rounded-3xl bg-white shadow-lg shadow-emerald-900/5 ring-1 ring-emerald-100"><img src={tour.image} alt={tour.name.en} className="h-52 w-full object-cover"/><div className="p-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2"><span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-900">{t.planned}</span><span className="text-xs font-semibold text-slate-600">{t.places}</span></div>
        <h4 className="text-2xl font-black text-emerald-950">{tour.name[locale]}</h4><p className="mt-1 min-h-10 text-sm text-slate-600">{tour.short[locale]}</p>
        <p className="mt-3 text-sm font-medium text-slate-600">{t.from}: {tour.from}</p>
        <div className="mt-4 rounded-2xl bg-emerald-50 p-4"><p className="text-xs font-semibold text-emerald-900">{t.price}</p><p className="mt-1 text-2xl font-black text-emerald-950">{fmt(tour.baseline)}</p><p className="mt-1 text-xs leading-relaxed text-emerald-800">{t.notFinal}</p></div>
        {tour.weather&&<p className="mt-3 rounded-xl bg-amber-50 p-3 text-xs text-amber-900">{t.sea}</p>}
        <p className="mb-3 mt-5 text-sm font-black text-emerald-950">{t.date}</p><div className="grid grid-cols-2 gap-2">{plannedDates(tour.weekday).map(d=><button key={iso(d)} type="button" onClick={()=>request(tour,d)} className="flex items-center justify-between gap-1 rounded-xl border border-emerald-200 p-3 text-sm font-bold text-emerald-900 hover:border-emerald-700 hover:bg-emerald-50"><span>{DAYS[locale][d.getDay()]} {d.toLocaleDateString(locale==="ru"?"ru-RU":"en-GB",{day:"2-digit",month:"short"})}</span><ArrowRight size={15}/></button>)}</div>
        <button onClick={()=>share(tour)} className="mt-4 flex items-center gap-2 text-sm font-bold text-emerald-700"><Share2 size={15}/>{copied?t.shareDone:t.share}</button>
      </div></article>)}</div>
      <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-3xl bg-white p-6 ring-1 ring-emerald-100 md:p-8"><div className="flex items-center gap-2"><TrendingDown className="text-emerald-700"/><h3 className="text-2xl font-black text-emerald-950">{t.tiers}</h3></div><p className="mt-3 text-sm leading-relaxed text-slate-600">{t.tierNote}</p>
          <label className="mt-6 block text-sm font-bold text-emerald-950" htmlFor="pilot-size">{t.guestCount}: <b>{exampleSize}/10</b></label>
          <input id="pilot-size" className="mt-3 w-full accent-emerald-700" type="range" min="1" max="10" value={exampleSize} onChange={e=>setExampleSize(Number(e.target.value))}/>
          <div className="mt-4 grid grid-cols-4 gap-2">{[4,6,8,10].map(n=><div key={n} className={"rounded-xl p-3 text-center "+(exampleSize>=n?"bg-emerald-100 text-emerald-900":"bg-slate-100 text-slate-500")}><p className="font-black">{n}/10</p><p className="text-xs">{n===4?"0%":n===6?"4%":n===8?"8%":"10%"}</p></div>)}</div>
          <p className="mt-5 rounded-xl bg-amber-50 p-3 text-xs font-medium text-amber-900">{t.floor}</p>
        </div>
        <div className="rounded-3xl bg-emerald-950 p-6 text-white md:p-8"><h3 className="text-2xl font-black">{t.how}</h3><div className="mt-5 space-y-5">{t.steps.map((step,i)=><div className="flex items-start gap-3" key={i}><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-lime-300 font-black text-emerald-950">{i+1}</span><p className="pt-1 text-sm leading-relaxed text-emerald-50">{step}</p></div>)}</div><p className="mt-6 rounded-2xl bg-white/10 p-4 text-sm font-semibold">{t.refer}</p><p className="mt-3 text-xs text-emerald-100">{t.benefit}</p></div>
      </div><p className="mt-6 rounded-2xl border border-emerald-200 bg-white p-4 text-center text-xs leading-relaxed text-slate-600">{t.uncertain}</p>
    </div>
    {selected&&<div role="dialog" aria-modal="true" aria-labelledby="pilot-request" className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/70 p-3" onMouseDown={e=>{if(e.target===e.currentTarget)setSelected(null);}}>
      <div className="max-h-[94vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl md:p-8">
        <div className="flex items-start justify-between gap-3"><div><p className="text-xs font-bold text-emerald-700">{t.pilot}</p><h3 id="pilot-request" className="mt-1 text-2xl font-black text-emerald-950">{selected.tour.name[locale]}</h3><p className="mt-1 text-sm text-slate-600">{selected.date} · {guide==="ru"?t.ruGroup:t.enGroup}</p></div><button aria-label={t.cancel} onClick={()=>setSelected(null)} className="rounded-full bg-slate-100 px-3 py-2 font-bold">✕</button></div>
        <form onSubmit={send} className="mt-5 grid gap-4 sm:grid-cols-2">
          {[["name",t.name,"text"],["phone",t.phone,"tel"],["hotel",t.hotel,"text"]].map(([key,label,type])=><label key={key} className="text-sm font-semibold text-slate-700">{label}<input required={key!=="hotel"} type={type} value={form[key]} onChange={e=>setForm(f=>({...f,[key]:e.target.value}))} className="mt-1 w-full rounded-xl border border-slate-300 p-3 outline-emerald-600"/></label>)}
          {[["adults",t.adults],["children",t.children]].map(([key,label])=><label key={key} className="text-sm font-semibold text-slate-700">{label}<input type="number" min="0" max="10" value={form[key]} onChange={e=>setForm(f=>({...f,[key]:Math.max(0,Math.min(10,Number(e.target.value)))}))} className="mt-1 w-full rounded-xl border border-slate-300 p-3"/></label>)}
          <label className="text-sm font-semibold text-slate-700 sm:col-span-2">{t.notes}<textarea rows="2" value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))} className="mt-1 w-full rounded-xl border border-slate-300 p-3"/></label>
          <label className="flex gap-3 text-sm text-slate-700 sm:col-span-2"><input type="checkbox" checked={form.agree} onChange={e=>setForm(f=>({...f,agree:e.target.checked}))} className="mt-1 accent-emerald-700"/>{t.agree}</label>
          {error&&<p role="alert" className="rounded-xl bg-rose-100 p-3 text-sm font-semibold text-rose-700 sm:col-span-2">{error}</p>}
          <p className="rounded-xl bg-amber-50 p-3 text-xs leading-relaxed text-amber-900 sm:col-span-2">{t.uncertain}</p>
          <button type="submit" className="flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 py-4 font-black text-white sm:col-span-2"><MessageCircle size={18}/>{t.send}</button>
        </form>
      </div>
    </div>}
  </section>;
}
