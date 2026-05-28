import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MapPin,
  MessageCircle,
  Star,
  Users,
  ShieldCheck,
  Car,
  Wifi,
  Plane,
  Compass,
  Sparkles,
  CheckCircle2,
  Languages,
  Footprints,
  BadgePercent,
} from "lucide-react";

const WHATSAPP = "https://wa.me/84937762607";
const GOOGLE_MAPS = "https://maps.app.goo.gl/zRcGfc5q7itp1coy6?g_st=ic";

// NOTE FOR IMAGES:
// These images are arranged to match the visual feeling of the second poster:
// Golden Bridge, Hoi An lanterns, sunset cruise, jeep/SUP, mountains, snorkeling,
// Hue heritage, coconut basket boat. If you later have exact real tour images,
// just replace the image URLs below.

const tours = [
  {
    id: 1,
    title: "Ba Na Hills & Golden Bridge",
    titleRu: "Бана Хиллс и Золотой мост",
    oldPrice: "65 USD",
    price: "55 USD",
    image:
      "./tour1.jpg",
    tag: "Mountain Iconic",
    short:
      "Walk above the clouds on the iconic Golden Bridge and enjoy cool mountain weather, cable car views and French Village atmosphere.",
    shortRu:
      "Прогуляйтесь над облаками по знаменитому Золотому мосту, насладитесь прохладной погодой, канатной дорогой и атмосферой Французской деревни.",
    duration: "Full day",
    perfect: "Families, couples, first-time visitors, photo lovers",
    includes: [
      ["Cable car ticket", "Канатная дорога"],
      ["Golden Bridge", "Золотой мост"],
      ["French Village", "Французская деревня"],
      ["Hotel pick-up", "Трансфер из отеля"],
      ["Local support", "Местная поддержка"],
    ],
    itinerary: [
      ["Hotel pick-up in Da Nang", "Встреча в отеле в Дананге"],
      ["Visit Ba Na Hills by cable car", "Подъем на Бана Хиллс по канатной дороге"],
      ["Explore Golden Bridge & gardens", "Золотой мост и сады"],
      ["Free time at French Village", "Свободное время во Французской деревне"],
      ["Return to hotel", "Возвращение в отель"],
    ],
    note:
      "Best choice for travelers who want the most iconic Da Nang experience.",
    noteRu:
      "Лучший выбор для гостей, которые хотят увидеть самый знаковый символ Дананга.",
  },
  {
    id: 2,
    title: "Hoi An Ancient Town & Memories Show",
    titleRu: "Старый город Хойан и шоу Memories",
    oldPrice: "95 USD",
    price: "80 USD",
    image:
      "./tour2.jpg",
    tag: "Culture & Lanterns",
    short:
      "A magical evening with lantern streets, riverside beauty, night market and the famous Hoi An Memories Show.",
    shortRu:
      "Волшебный вечер с улицами фонарей, речной атмосферой, ночным рынком и знаменитым шоу Hoi An Memories.",
    duration: "Afternoon & evening",
    perfect: "Couples, culture lovers, families, night photography",
    includes: [
      ["Hoi An Ancient Town", "Старый город Хойан"],
      ["Lantern boat", "Лодка с фонариками"],
      ["Night market", "Ночной рынок"],
      ["Memories Show", "Шоу Memories"],
      ["Hotel pick-up", "Трансфер из отеля"],
    ],
    itinerary: [
      ["Pick-up from hotel", "Встреча в отеле"],
      ["Explore Hoi An Ancient Town", "Прогулка по старому городу Хойан"],
      ["Lantern boat experience", "Лодка с фонариками"],
      ["Enjoy local night market", "Ночной рынок"],
      ["Watch Hoi An Memories Show", "Шоу Hoi An Memories"],
    ],
    note: "A beautiful evening tour with culture, lights and emotional memories.",
    noteRu: "Красивый вечерний тур с культурой, огнями и яркими впечатлениями.",
  },
  {
    id: 3,
    title: "Aphrodite Sunset Cruise",
    titleRu: "Круиз Aphrodite на закате",
    oldPrice: "80 USD",
    price: "68 USD",
    image:
      "./tour3.jpg",
    tag: "Sunset Cruise",
    short:
      "Relax on the Han River with sunset views, romantic atmosphere and beautiful Da Nang night skyline.",
    shortRu:
      "Отдохните на реке Хан с видом на закат, романтической атмосферой и вечерней панорамой Дананга.",
    duration: "Evening",
    perfect: "Couples, honeymooners, relaxing travelers",
    includes: [
      ["Han River cruise", "Круиз по реке Хан"],
      ["Sunset view", "Вид на закат"],
      ["Night skyline", "Вечерний город"],
      ["Romantic atmosphere", "Романтическая атмосфера"],
      ["Booking support", "Поддержка при бронировании"],
    ],
    itinerary: [
      ["Arrive at cruise meeting point", "Прибытие к месту посадки"],
      ["Board the Aphrodite cruise", "Посадка на круиз Aphrodite"],
      ["Enjoy sunset on Han River", "Закат на реке Хан"],
      ["See city lights & bridges", "Огни города и мосты"],
      ["Finish with easy WhatsApp support", "Поддержка через WhatsApp"],
    ],
    note: "Perfect for travelers who want a calm and beautiful evening in Da Nang.",
    noteRu: "Идеально для спокойного и красивого вечера в Дананге.",
  },
  {
    id: 4,
    title: "Off-Road Jeep & SUP Experience",
    titleRu: "Джип-тур и SUP-приключение",
    oldPrice: "110 USD",
    price: "93 USD",
    image:
      "./tour4.jpg",
    tag: "Adventure & Nature",
    short:
      "A fun adventure with jeep ride, hidden nature spots, mountain views and SUP experience.",
    shortRu:
      "Веселое приключение на джипе, скрытые природные места, горные виды и SUP-прогулка.",
    duration: "Half day / full day",
    perfect: "Adventure lovers, friends, active travelers",
    includes: [
      ["Jeep adventure", "Джип-тур"],
      ["SUP experience", "SUP-прогулка"],
      ["Hidden nature spots", "Скрытые природные места"],
      ["Local guide", "Местный гид"],
      ["Hotel pick-up", "Трансфер из отеля"],
    ],
    itinerary: [
      ["Hotel pick-up", "Встреча в отеле"],
      ["Jeep ride through scenic roads", "Джип-маршрут по красивым дорогам"],
      ["Photo stops at hidden spots", "Фото-остановки"],
      ["SUP activity", "SUP-прогулка"],
      ["Return with local support", "Возвращение с поддержкой"],
    ],
    note: "For travelers who love freedom, movement and nature.",
    noteRu: "Для тех, кто любит свободу, движение и природу.",
  },
  {
    id: 5,
    title: "Dong Giang Heaven Gate",
    titleRu: "Небесные ворота Донгзянг",
    oldPrice: "65 USD",
    price: "55 USD",
    image:
      "./tour5.jpg",
    tag: "Scenic Mountains",
    short:
      "Escape to peaceful mountains, glass bridge views, waterfalls and unique local culture.",
    shortRu:
      "Путешествие в спокойные горы, стеклянный мост, водопады и местную культуру.",
    duration: "Full day",
    perfect: "Nature lovers, families, peaceful travelers",
    includes: [
      ["Heaven Gate", "Небесные ворота"],
      ["Glass bridge", "Стеклянный мост"],
      ["Mountain scenery", "Горные пейзажи"],
      ["Transportation", "Транспорт"],
      ["Local support", "Местная поддержка"],
    ],
    itinerary: [
      ["Hotel pick-up", "Встреча в отеле"],
      ["Drive to Dong Giang", "Поездка в Донгзянг"],
      ["Visit Heaven Gate area", "Посещение Heaven Gate"],
      ["Enjoy mountain scenery", "Горные пейзажи"],
      ["Return to Da Nang", "Возвращение в Дананг"],
    ],
    note: "A relaxing mountain escape away from the busy city.",
    noteRu: "Спокойный горный отдых вдали от городской суеты.",
  },
  {
    id: 6,
    title: "Cham Island Snorkeling Tour",
    titleRu: "Снорклинг на острове Чам",
    oldPrice: "49 USD",
    price: "42 USD",
    image:
      "./tour6.jpg",
    tag: "Island & Snorkeling",
    short:
      "Swim in crystal-clear water, enjoy coral reefs, speedboat ride and tropical island vibes.",
    shortRu:
      "Плавайте в кристально чистой воде, наслаждайтесь коралловыми рифами, скоростной лодкой и тропическим островом.",
    duration: "Full day",
    perfect: "Beach lovers, friends, active travelers",
    includes: [
      ["Speedboat", "Скоростная лодка"],
      ["Snorkeling gear", "Снаряжение для снорклинга"],
      ["Coral reef experience", "Коралловый риф"],
      ["Beach relax time", "Отдых на пляже"],
      ["Local support", "Местная поддержка"],
    ],
    itinerary: [
      ["Hotel pick-up", "Встреча в отеле"],
      ["Speedboat to Cham Island", "Скоростная лодка на остров Чам"],
      ["Snorkeling activity", "Снорклинг"],
      ["Beach relax time", "Отдых на пляже"],
      ["Return by speedboat", "Возвращение на лодке"],
    ],
    note: "One of the best summer experiences near Da Nang and Hoi An.",
    noteRu: "Одно из лучших летних впечатлений рядом с Данангом и Хойаном.",
  },
  {
    id: 7,
    title: "Hue Imperial City Discovery",
    titleRu: "Императорский город Хюэ",
    oldPrice: "110 USD",
    price: "93 USD",
    image:
      "./tour7.jpg",
    tag: "History & Heritage",
    short:
      "Discover Vietnam’s royal history, Imperial City, ancient tombs and traditional architecture.",
    shortRu:
      "Откройте для себя королевскую историю Вьетнама, Императорский город, древние гробницы и традиционную архитектуру.",
    duration: "Full day",
    perfect: "History lovers, culture travelers, families",
    includes: [
      ["Imperial City", "Императорский город"],
      ["Royal tombs", "Королевские гробницы"],
      ["Scenic journey", "Живописная дорога"],
      ["Local guide support", "Поддержка местного гида"],
      ["Hotel pick-up", "Трансфер из отеля"],
    ],
    itinerary: [
      ["Hotel pick-up from Da Nang", "Встреча в отеле в Дананге"],
      ["Scenic drive to Hue", "Живописная дорога в Хюэ"],
      ["Visit Imperial City", "Императорский город"],
      ["Explore royal tombs", "Королевские гробницы"],
      ["Return to Da Nang", "Возвращение в Дананг"],
    ],
    note: "A meaningful cultural journey into Vietnam’s ancient royal capital.",
    noteRu: "Культурное путешествие в древнюю королевскую столицу Вьетнама.",
  },
  {
    id: 8,
    title: "Bay Mau Coconut Forest & Hoi An",
    titleRu: "Кокосовый лес Bay Mau и Хойан",
    oldPrice: "60 USD",
    price: "51 USD",
    image:
      "./tour8.jpg",
    tag: "Local Life & Fun",
    short:
      "Enjoy basket boat fun, coconut forest atmosphere and the charming beauty of Hoi An.",
    shortRu:
      "Веселая прогулка на круглой лодке, атмосфера кокосового леса и очарование Хойана.",
    duration: "Half day / afternoon",
    perfect: "Families, friends, fun local experience seekers",
    includes: [
      ["Basket boat", "Круглая лодка"],
      ["Coconut forest", "Кокосовый лес"],
      ["Hoi An visit", "Посещение Хойана"],
      ["Local experience", "Местный опыт"],
      ["Hotel pick-up", "Трансфер из отеля"],
    ],
    itinerary: [
      ["Hotel pick-up", "Встреча в отеле"],
      ["Visit Bay Mau Coconut Forest", "Кокосовый лес Bay Mau"],
      ["Basket boat experience", "Прогулка на круглой лодке"],
      ["Explore Hoi An", "Прогулка по Хойану"],
      ["Return to hotel", "Возвращение в отель"],
    ],
    note: "A light, fun and easy tour for travelers who want local color and photos.",
    noteRu: "Легкий и веселый тур для красивых фото и местного колорита.",
  },
];

function whatsappTourLink(tour) {
  const text = `Hello GoVietStay, I want to ask about ${tour.title}. Please send me details. / Здравствуйте GoVietStay, хочу узнать подробнее о туре ${tour.titleRu}.`;
  return `${WHATSAPP}?text=${encodeURIComponent(text)}`;
}

function LanguageNote() {
  return (
    <div className="mx-auto mt-6 max-w-5xl rounded-3xl border border-amber-200 bg-white/90 p-4 text-sm text-slate-800 shadow-xl backdrop-blur">
      <div className="grid gap-3 md:grid-cols-3">
        <div className="flex gap-2">
          <BadgePercent className="mt-1 h-5 w-5 shrink-0 text-amber-600" />
          <p>
            <b>EN:</b> USD prices are for easy reference only. Main payment in Vietnam is VND. Final price will be confirmed in VND before booking.
            <br />
            <b>RU:</b> Цены в USD указаны только для удобства. Основная оплата во Вьетнаме — VND. Финальная цена подтверждается во VND.
          </p>
        </div>
        <div className="flex gap-2">
          <Footprints className="mt-1 h-5 w-5 shrink-0 text-emerald-700" />
          <p>
            <b>EN:</b> 4+ guests = FREE Private Tour Upgrade + 30-minute Foot Massage at Night Market.
            <br />
            <b>RU:</b> Для групп от 4 гостей: бесплатный Private Tour + 30 минут массажа ног на ночном рынке.
          </p>
        </div>
        <div className="flex gap-2">
          <Languages className="mt-1 h-5 w-5 shrink-0 text-sky-700" />
          <p>
            <b>EN:</b> Russian-speaking guide/support available for Russian guests.
            <br />
            <b>RU:</b> Для русскоязычных гостей доступен русскоговорящий гид/сопровождение.
          </p>
        </div>
      </div>
    </div>
  );
}

function TourCard({ tour, onClick }) {
  return (
    <motion.button
      onClick={() => onClick(tour)}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="group overflow-hidden rounded-[2rem] border border-white/70 bg-white text-left shadow-2xl shadow-emerald-900/10"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={tour.image}
          alt={tour.title}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
        <div className="absolute left-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-white text-xl font-black text-emerald-900 shadow-xl">
          {tour.id}
        </div>
        <div className="absolute right-4 top-4 rounded-full bg-rose-500 px-3 py-2 text-sm font-black text-white shadow-xl">
          15% OFF
        </div>
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-200">
            {tour.tag}
          </p>
          <h3 className="mt-1 text-2xl font-black leading-tight drop-shadow">
            {tour.title}
          </h3>
          <p className="text-sm text-white/90">{tour.titleRu}</p>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-3 flex items-end gap-3">
          <span className="text-lg text-slate-500 line-through">{tour.oldPrice}</span>
          <span className="text-3xl font-black text-emerald-700">{tour.price}</span>
        </div>
        <p className="min-h-20 text-sm leading-relaxed text-slate-700">{tour.short}</p>
        <div className="mt-4 rounded-2xl bg-amber-50 px-4 py-3 text-xs font-black text-emerald-950">
          4+ Guests = FREE Private Tour + 30-min Foot Massage
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm font-bold text-slate-600">Tap for details</span>
          <span className="rounded-full bg-green-500 px-4 py-2 text-sm font-black text-white">
            Explore
          </span>
        </div>
      </div>
    </motion.button>
  );
}

function DetailList({ title, items }) {
  return (
    <div className="rounded-3xl bg-slate-50 p-5">
      <h3 className="mb-3 text-lg font-black text-emerald-950">{title}</h3>
      <div className="space-y-2">
        {items.map(([en, ru]) => (
          <div key={en} className="flex gap-2 text-sm text-slate-700">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
            <p>
              <b>{en}</b>
              <br />
              <span className="text-slate-500">{ru}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function GoVietStayDigitalFlyer() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="min-h-screen bg-[#fff7e6] text-slate-900">
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-teal-800 to-amber-500 text-white">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top_left,_#fde68a,_transparent_35%),radial-gradient(circle_at_bottom_right,_#22c55e,_transparent_35%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,0,0,.55),rgba(0,0,0,.1),rgba(0,0,0,.55))]" />

        <div className="relative mx-auto max-w-7xl px-5 py-10 md:py-16">
          <div className="mb-8 flex items-center justify-center gap-4">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-white/95 text-4xl shadow-2xl">
              🌴
            </div>
            <div>
              <img src="./logo.jpg" className="w-28 mx-auto mb-4" />
              <h1 className="text-4xl font-black md:text-6xl">GoVietStay</h1>
              <p className="text-xs uppercase tracking-[0.35em] text-amber-100 md:text-sm">
                Da Nang • Hoi An • Vietnam
              </p>
            </div>
          </div>

          <div className="text-center">
            <p className="font-serif text-4xl italic text-amber-200 md:text-6xl">
              Summer Special
            </p>
            <h2 className="text-6xl font-black tracking-tight md:text-9xl">2026</h2>
            <p className="mt-3 text-2xl font-black md:text-4xl">
              8 Signature Tours • Up to 15% OFF
            </p>
            <p className="mx-auto mt-4 max-w-3xl text-base text-white/90 md:text-lg">
              EN/RU digital travel flyer for beach travelers: cinematic images,
              clear tour details, Google Maps trust, and instant WhatsApp booking.
            </p>
          </div>

          <div className="mx-auto mt-8 grid max-w-4xl grid-cols-3 gap-3 text-center text-sm font-bold md:text-base">
            <div className="rounded-3xl bg-white/15 p-4 backdrop-blur">
              <MessageCircle className="mx-auto mb-2" /> Easy WhatsApp Booking
            </div>
            <div className="rounded-3xl bg-white/15 p-4 backdrop-blur">
              <ShieldCheck className="mx-auto mb-2" /> Trusted Local Support
            </div>
            <div className="rounded-3xl bg-white/15 p-4 backdrop-blur">
              <Star className="mx-auto mb-2" /> Google Maps Reviews
            </div>
          </div>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={WHATSAPP}
              className="rounded-full bg-green-500 px-8 py-4 text-center text-lg font-black text-white shadow-2xl hover:bg-green-400"
            >
              WhatsApp: +84 937 762 607
            </a>
            <a
              href={GOOGLE_MAPS}
              className="rounded-full bg-white px-8 py-4 text-center text-lg font-black text-emerald-950 shadow-2xl hover:bg-amber-100"
            >
              Open Google Reviews
            </a>
          </div>

          <LanguageNote />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10">
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-900 px-5 py-2 text-sm font-black text-white">
            <Sparkles className="h-4 w-4" /> Tap each tour to see details
          </div>
          <h2 className="text-4xl font-black text-emerald-950 md:text-5xl">
            8 Experiences — Unlimited Memories
          </h2>
          <p className="mt-3 text-slate-600">
            EN/RU details, summer price, included highlights, simple program, WhatsApp booking.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} onClick={setSelected} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-28">
        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-[2rem] border border-emerald-100 bg-white p-6 shadow-2xl">
            <h3 className="mb-4 text-2xl font-black text-emerald-950">
              Why Book With GoVietStay?
            </h3>
            <div className="space-y-3 text-sm text-slate-700">
              <p>✅ Local expert team / Местная команда</p>
              <p>✅ Flexible & private tours / Гибкие private-туры</p>
              <p>✅ 4+ guests private upgrade / Private для 4+ гостей</p>
              <p>✅ 30-min foot massage bonus / Бонус массаж ног</p>
              <p>✅ 24/7 WhatsApp support / Поддержка WhatsApp</p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-emerald-100 bg-white p-6 text-center shadow-2xl">
            <h3 className="text-2xl font-black text-emerald-950">
              Trusted by International Travelers
            </h3>
            <div className="my-3 text-4xl">⭐⭐⭐⭐⭐</div>
            <p className="mb-4 text-sm text-slate-600">
              Check real traveler experiences and local trust on Google Maps.
            </p>
            <a
              href={GOOGLE_MAPS}
              className="inline-block rounded-full bg-emerald-900 px-6 py-3 font-black text-white"
            >
              View Google Reviews
            </a>
          </div>

          <div className="rounded-[2rem] bg-emerald-950 p-6 text-white shadow-2xl">
            <h3 className="mb-4 text-2xl font-black">Local Support — Beyond Tours</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <p className="flex items-center gap-2"><Wifi className="h-4 w-4" /> SIM Delivery</p>
              <p className="flex items-center gap-2"><Plane className="h-4 w-4" /> Airport Transfer</p>
              <p className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Local Tips</p>
              <p className="flex items-center gap-2"><Compass className="h-4 w-4" /> Event Info</p>
              <p className="flex items-center gap-2"><Car className="h-4 w-4" /> Private Car</p>
              <p className="flex items-center gap-2"><Users className="h-4 w-4" /> Groups</p>
            </div>
          </div>
        </div>
      </section>

      <div className="fixed bottom-4 left-4 right-4 z-40 mx-auto max-w-md">
        <a
          href={WHATSAPP}
          className="flex items-center justify-center gap-3 rounded-full border-4 border-white bg-green-500 px-6 py-4 font-black text-white shadow-2xl"
        >
          <MessageCircle /> Chat on WhatsApp
        </a>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 overflow-y-auto bg-black/75 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="mx-auto max-w-3xl overflow-hidden rounded-[2rem] bg-white shadow-2xl"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
            >
              <div className="relative h-80">
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute right-4 top-4 rounded-full bg-white p-3 shadow-xl"
                >
                  <X />
                </button>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="text-sm font-bold uppercase tracking-[0.25em] text-amber-200">
                    {selected.tag}
                  </p>
                  <h2 className="mt-1 text-4xl font-black leading-tight">
                    {selected.title}
                  </h2>
                  <p className="text-lg text-white/90">{selected.titleRu}</p>
                </div>
              </div>

              <div className="p-6 md:p-8">
                <div className="mb-5 flex flex-wrap items-end gap-3">
                  <span className="text-xl text-slate-500 line-through">
                    {selected.oldPrice}
                  </span>
                  <span className="text-5xl font-black text-emerald-700">
                    {selected.price}
                  </span>
                  <span className="rounded-full bg-rose-100 px-3 py-1 text-sm font-black text-rose-700">
                    Summer reference price
                  </span>
                </div>

                <div className="mb-5 rounded-3xl bg-amber-50 p-5 text-sm text-slate-800">
                  <p><b>EN:</b> {selected.short}</p>
                  <p className="mt-2"><b>RU:</b> {selected.shortRu}</p>
                </div>

                <div className="mb-5 rounded-3xl bg-emerald-50 p-5 font-black text-emerald-950">
                  EN: 4+ Guests = FREE Private Tour Upgrade + 30-minute Foot Massage at Night Market.
                  <br />
                  RU: Для групп от 4 гостей: бесплатный Private Tour + 30 минут массажа ног на ночном рынке.
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <DetailList title="Included / Включено" items={selected.includes} />
                  <DetailList title="Simple Program / Программа" items={selected.itinerary} />
                </div>

                <div className="mt-5 rounded-3xl bg-slate-50 p-5 text-sm text-slate-700">
                  <p><b>Perfect for:</b> {selected.perfect}</p>
                  <p className="mt-2"><b>Local note:</b> {selected.note}</p>
                  <p className="mt-2"><b>RU:</b> {selected.noteRu}</p>
                  <p className="mt-3 text-xs text-slate-500">
                    USD prices are for easy reference only. Main payment in Vietnam is VND. Final price will be confirmed in VND before booking.
                  </p>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <a
                    href={whatsappTourLink(selected)}
                    className="rounded-full bg-green-500 py-4 text-center font-black text-white shadow-xl"
                  >
                    Book This Tour on WhatsApp
                  </a>
                  <a
                    href={GOOGLE_MAPS}
                    className="rounded-full bg-emerald-950 py-4 text-center font-black text-white shadow-xl"
                  >
                    Check Google Reviews
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
