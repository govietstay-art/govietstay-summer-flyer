import React, { useState } from "react";
import { CalendarDays, Users, MapPin, MessageCircle, Share2, CheckCircle2, Info, ArrowRight } from "lucide-react";

// Group Deal MVP: requests are reviewed manually. No fictitious live seat counts or payments.
const WhatsAppNumber = "84937762607";
const trips = [
  { id: "bana", en: "Ba Na Hills & Golden Bridge", ru: "Бана Хиллс и Золотой мост", region: "Da Nang", image: "/tour1.jpg", min: 4, duration: "Full day", guide: "English", note: "Cable car / buffet / transport options confirmed before payment.", noteRu: "Варианты билетов, обеда и транспорта уточняются до оплаты." },
  { id: "hoian", en: "Hoi An & Coconut Forest", ru: "Хойан и кокосовый лес", region: "Hoi An", image: "/tour8.jpg", min: 4, duration: "Afternoon–evening", guide: "English", note: "Basket boat and lantern boat options confirmed in the quotation.", noteRu: "Корзинная лодка и прогулка на лодке уточняются в предложении." },
  { id: "cham", en: "Cham Island Snorkeling", ru: "Остров Чам · снорклинг", region: "Cham Island", image: "/tour6.jpg", min: 4, duration: "Full day", guide: "English or Russian departure", note: "Weather-dependent sea trip. Route, safety and final price are checked before confirmation.", noteRu: "Морская экскурсия зависит от погоды. Программа, безопасность и окончательная цена подтверждаются заранее." },
];
const copy = {
  en: { eyebrow: "SMALL GROUP · LOCAL SUPPORT", title: "Find your people. Share the journey.", subtitle: "Travelling solo, as a couple or with family? Tell us your preferred date. We check compatible requests and confirm the trip only after availability, route and price are agreed.", all: "All", browse: "Choose an experience", request: "Request to join", min: "Minimum group", group: "guests", guide: "Guide", duration: "Duration", price: "Price", quote: "Confirmed quote after group match", safety: "No charge to request · No guaranteed departure yet", how: "How Group Deals work", steps: ["Pick a trip and preferred date", "Send one complete request", "We check matching travellers and confirm an offer", "Choose to book, change date or decline"], modal: "Join a Group Deal", close: "Close", name: "Your name", wa: "WhatsApp number (including country code)", date: "Preferred travel date", adults: "Adults", children: "Children", ages: "Children's ages (if any)", hotel: "Hotel / pickup area", language: "Preferred support language", flexibility: "Date flexibility", fixed: "Only this date", nearby: "± 1–2 days", any: "Other dates possible", notes: "Anything we should know?", consent: "I agree that GoVietStay may contact me about this request.", submit: "Send request on WhatsApp", error: "Please enter your name, a valid WhatsApp number, your preferred date and agree to be contacted.", whats: "I would like to join a Group Deal", pending: "This is a request only. The trip is not confirmed until GoVietStay confirms availability, inclusions and final VND price.", share: "Share Group Deals", shareSuccess: "Link copied", alt: "Group tour experience", offers: "Existing private tours and summer offers", back: "Browse tour catalogue" },
  ru: { eyebrow: "МИНИ-ГРУППЫ · МЕСТНАЯ ПОДДЕРЖКА", title: "Найдите попутчиков. Путешествуйте вместе.", subtitle: "Путешествуете один, вдвоём или с семьёй? Укажите удобную дату. Мы проверим совпадающие заявки и подтвердим поездку только после согласования программы и цены.", all: "Все", browse: "Выберите экскурсию", request: "Оставить заявку", min: "Минимум в группе", group: "человека", guide: "Гид", duration: "Длительность", price: "Стоимость", quote: "После набора группы и подтверждения", safety: "Заявка бесплатная · Выезд пока не гарантирован", how: "Как это работает", steps: ["Выберите экскурсию и дату", "Отправьте заявку с контактами", "Мы найдём подходящие заявки и пришлём предложение", "Подтвердите бронь, перенесите дату или откажитесь"], modal: "Заявка на групповую поездку", close: "Закрыть", name: "Ваше имя", wa: "Номер WhatsApp с кодом страны", date: "Желаемая дата", adults: "Взрослые", children: "Дети", ages: "Возраст детей (если есть)", hotel: "Отель / район посадки", language: "Язык сопровождения", flexibility: "Гибкость даты", fixed: "Только эта дата", nearby: "± 1–2 дня", any: "Другие даты возможны", notes: "Дополнительные пожелания", consent: "Согласен(-на), чтобы GoVietStay связался со мной по этой заявке.", submit: "Отправить через WhatsApp", error: "Укажите имя, действующий WhatsApp, дату и согласие на связь.", whats: "Хочу присоединиться к групповой экскурсии", pending: "Это только запрос. Выезд будет подтверждён после проверки наличия мест, программы и окончательной цены в VND.", share: "Поделиться", shareSuccess: "Ссылка скопирована", alt: "Групповая экскурсия", offers: "Индивидуальные туры и сезонные предложения", back: "Смотреть каталог туров" }
};
function buildMessage(trip, f, locale) {
  return [
    "GoVietStay Group Deal · NEW REQUEST",
    locale === "ru" ? "Interface: Russian" : "Interface: English",
    "Tour: " + trip.en,
    "Group: " + f.guide + " (never automatically mixed with another guide language)",
    "Preferred date: " + f.date,
    "Date flexibility: " + f.flex,
    "Adults: " + f.adults,
    "Children: " + f.children,
    "Children ages: " + (f.ages || "N/A"),
    "Name: " + f.name,
    "WhatsApp: " + f.phone,
    "Hotel/pickup: " + (f.hotel || "Not decided"),
    "Preferred guide/support: " + f.guide,
    "Notes: " + (f.notes || "None"),
    "Request only — awaiting availability, inclusions and final VND quote."
  ].join("\n");
}
export default function GroupDeals() {
  const [locale, setLocale] = useState("ru");
  const [region, setRegion] = useState("All");
  const [selected, setSelected] = useState(null);
  const [shared, setShared] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", phone: "", date: "", adults: 1, children: 0, ages: "", hotel: "", guide: "Russian-speaking guide", flex: "Only this date", notes: "", consent: false });
  const t = copy[locale];
  const update = (k,v) => { setForm(old => ({ ...old, [k]: v })); if(error)setError(""); };
  function openTrip(trip) { setSelected(trip); setError(""); setForm(f=>({ ...f, guide: locale === "ru" ? "Russian-speaking guide" : "English-speaking guide", consent:false })); }
  function send(e) {
    e.preventDefault();
    if(!form.name.trim() || !/^\+?[0-9 ()-]{8,20}$/.test(form.phone.trim()) || !form.date || !form.consent || Number(form.adults)+Number(form.children)<1) {setError(t.error);return;}
    const msg = buildMessage(selected,form,locale);
    window.open("https://wa.me/" + WhatsAppNumber + "?text=" + encodeURIComponent(msg), "_blank", "noopener,noreferrer");
  }
  async function share() {
    const url = window.location.origin + window.location.pathname + "#group-deals";
    if(navigator.share) {try{await navigator.share({title:"GoVietStay Group Deals",url});return;}catch(e){if(e.name==="AbortError")return;}}
    try{await navigator.clipboard.writeText(url);setShared(true);setTimeout(()=>setShared(false),2500);}catch(e){window.prompt("Copy link",url);}
  }
  return (
    <section id="group-deals" className="relative scroll-mt-8 bg-[#f3faf5] px-4 py-14 md:px-8" aria-labelledby="group-heading">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3"><img src="/logo.jpg" alt="GoVietStay" className="h-14 w-14 rounded-full bg-white object-contain p-1 shadow"/><span className="font-black tracking-wide text-emerald-950">GoVietStay <span className="text-emerald-600">GROUP DEALS</span></span></div>
          <div className="flex items-center gap-2"><button onClick={()=>{const next=locale==="en"?"ru":"en";setLocale(next);setForm(f=>({...f,guide:next==="ru"?"Russian-speaking guide":"English-speaking guide"}));}} className="rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-bold text-emerald-950" aria-label="Switch language">{locale==="en"?"Русский 🇷🇺":"English 🇬🇧"}</button><button onClick={share} className="flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-bold text-emerald-950"><Share2 size={16}/>{shared?t.shareSuccess:t.share}</button></div>
        </div>
        <div className="relative mb-10 overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-950 via-emerald-800 to-teal-600 p-7 text-white md:p-12">
          <div className="absolute -right-16 -top-20 h-72 w-72 rounded-full bg-lime-300/10 blur-3xl"/>
          <div className="relative max-w-3xl"><p className="text-xs font-black uppercase tracking-[.23em] text-lime-200">{t.eyebrow}</p><h2 id="group-heading" className="mt-4 text-4xl font-black leading-tight md:text-6xl">{t.title}</h2><p className="mt-5 text-base leading-relaxed text-emerald-50 md:text-lg">{t.subtitle}</p><div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold"><ShieldIcon/>{t.safety}</div></div>
        </div>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3"><h3 className="text-2xl font-black text-emerald-950 md:text-3xl">{t.browse}</h3><div className="flex flex-wrap gap-2">{["All","Da Nang","Hoi An","Cham Island"].map(r=><button key={r} onClick={()=>setRegion(r)} className={"rounded-full px-4 py-2 text-sm font-bold transition "+(r===region?"bg-emerald-800 text-white":"bg-white text-emerald-950 ring-1 ring-emerald-100")}>{r==="All"?t.all:r}</button>)}</div></div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{trips.filter(x=>region==="All"||x.region===region).map(trip=><article key={trip.id} className="flex flex-col overflow-hidden rounded-[1.7rem] bg-white shadow-lg shadow-emerald-900/5 ring-1 ring-emerald-950/5">
          {trip.image?<img src={trip.image} alt={trip.en} className="h-56 w-full object-cover"/>:<div className="flex h-56 flex-col items-center justify-center bg-gradient-to-br from-cyan-600 via-teal-600 to-emerald-800 text-center text-white"><MapPin size={38}/><span className="mt-3 text-2xl font-black">PHU QUOC</span><span className="text-sm">3 Islands · Sea & Snorkeling</span></div>}
          <div className="flex flex-1 flex-col p-6"><p className="text-xs font-black uppercase tracking-widest text-emerald-700">{trip.region}</p><h4 className="mt-2 text-2xl font-black text-emerald-950">{locale==="en"?trip.en:trip.ru}</h4><div className="mt-5 flex flex-wrap gap-2 text-xs font-bold text-slate-600"><span className="rounded-xl bg-slate-100 px-3 py-2"><Users size={14} className="mr-1 inline"/>{t.min}: {trip.min} {t.group}</span><span className="rounded-xl bg-slate-100 px-3 py-2"><CalendarDays size={14} className="mr-1 inline"/>{trip.duration}</span></div><p className="mt-4 text-sm text-slate-600">{locale==="en"?trip.note:trip.noteRu}</p><p className="mt-3 rounded-xl bg-emerald-50 p-3 text-sm font-bold text-emerald-900">{locale==="ru"?"Выберите отдельную русскоязычную группу. Никакого смешивания языков без вашего согласия.":"Choose your own English- or Russian-speaking guide group. No mixed-language tours without your agreement."}</p><div className="mt-auto pt-5"><p className="mb-4 text-sm text-emerald-900"><b>{t.price}:</b> {t.quote}</p><button onClick={()=>openTrip(trip)} className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 py-3.5 font-black text-white transition hover:bg-emerald-700">{t.request}<ArrowRight size={18}/></button></div></div>
        </article>)}</div>
        <div className="mt-10 rounded-3xl bg-white p-6 ring-1 ring-emerald-100 md:p-8"><h3 className="text-2xl font-black text-emerald-950">{t.how}</h3><div className="mt-5 grid gap-5 md:grid-cols-4">{t.steps.map((step,i)=><div key={i} className="flex items-start gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-emerald-100 font-black text-emerald-900">{i+1}</span><p className="text-sm leading-relaxed text-slate-700">{step}</p></div>)}</div></div>
        <div className="mt-6 text-center"><a href="#tour-catalogue" className="inline-flex items-center gap-2 font-bold text-emerald-900 underline underline-offset-4">{t.back}<ArrowRight size={16}/></a></div>
      </div>
      {selected && <div role="dialog" aria-modal="true" aria-labelledby="group-form-title" className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-3" onMouseDown={e=>{if(e.target===e.currentTarget)setSelected(null);}}>
        <div className="max-h-[94vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl md:p-7"><div className="mb-5 flex items-start justify-between gap-3"><div><p className="text-xs font-black uppercase tracking-wider text-emerald-600">GoVietStay Group Deals</p><h3 id="group-form-title" className="mt-1 text-2xl font-black text-emerald-950">{t.modal}</h3><p className="mt-1 text-sm text-slate-600">{locale==="en"?selected.en:selected.ru}</p><p className="mt-2 text-sm text-emerald-800">{locale==="ru"?"Русскоязычный гид — полноценная отдельная опция, наличие подтверждаем до оплаты.":"A Russian-speaking guide is a separate group option; availability is confirmed before payment."}</p></div><button aria-label={t.close} onClick={()=>setSelected(null)} className="rounded-full bg-slate-100 p-2 text-slate-800">✕</button></div>
        <form onSubmit={send} className="grid gap-4 sm:grid-cols-2">
          <Field label={t.name}><input required value={form.name} onChange={e=>update("name",e.target.value)} className="field" placeholder="Name"/></Field>
          <Field label={t.wa}><input required type="tel" inputMode="tel" value={form.phone} onChange={e=>update("phone",e.target.value)} className="field" placeholder="+7 ..."/></Field>
          <Field label={t.date}><input required type="date" min={new Date().toLocaleDateString("en-CA")} value={form.date} onChange={e=>update("date",e.target.value)} className="field"/></Field>
          <Field label={t.flexibility}><select className="field" value={form.flex} onChange={e=>update("flex",e.target.value)}><option value="Only this date">{t.fixed}</option><option value="+/- 1-2 days">{t.nearby}</option><option value="Other dates possible">{t.any}</option></select></Field>
          <Field label={t.adults}><input type="number" className="field" min="0" max="20" value={form.adults} onChange={e=>update("adults",Math.max(0,Number(e.target.value)))}/></Field>
          <Field label={t.children}><input type="number" className="field" min="0" max="20" value={form.children} onChange={e=>update("children",Math.max(0,Number(e.target.value)))}/></Field>
          {form.children>0 && <Field label={t.ages}><input className="field" value={form.ages} onChange={e=>update("ages",e.target.value)} placeholder="5, 9"/></Field>}
          <Field label={t.hotel}><input className="field" value={form.hotel} onChange={e=>update("hotel",e.target.value)} placeholder="Hotel or area"/></Field>
          <Field label={t.language}><select className="field" value={form.guide} onChange={e=>update("guide",e.target.value)}><option value="Russian-speaking guide">{locale==="en"?"Russian-speaking guide · separate group":"Русскоязычный гид · отдельная группа"}</option><option value="English-speaking guide">{locale==="en"?"English-speaking guide · separate group":"Англоязычный гид · отдельная группа"}</option></select></Field>
          <div className="sm:col-span-2"><Field label={t.notes}><textarea className="field min-h-[75px]" value={form.notes} onChange={e=>update("notes",e.target.value)} placeholder="..." /></Field></div>
          <label className="flex items-start gap-2 text-sm text-slate-700 sm:col-span-2"><input type="checkbox" className="mt-1 accent-emerald-700" checked={form.consent} onChange={e=>update("consent",e.target.checked)}/>{t.consent}</label>
          {error&&<p role="alert" className="rounded-xl bg-rose-50 p-3 text-sm font-bold text-rose-700 sm:col-span-2">{error}</p>}
          <div className="rounded-xl bg-amber-50 p-3 text-xs leading-relaxed text-amber-900 sm:col-span-2"><Info size={16} className="mr-1 inline"/>{t.pending}</div>
          <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 py-4 font-black text-white hover:bg-emerald-700 sm:col-span-2"><MessageCircle size={19}/>{t.submit}</button>
        </form>
        <style>{`.field{width:100%;margin-top:6px;border:1px solid #cbd5e1;border-radius:12px;padding:11px 12px;outline-color:#059669;background:#fff;color:#0f172a}`}</style>
        </div>
      </div>}
    </section>
  );
}
function ShieldIcon(){return <CheckCircle2 size={16} className="shrink-0 text-lime-200"/>;}
function Field({label,children}){return <label className="block text-sm font-bold text-slate-700">{label}{children}</label>;}
