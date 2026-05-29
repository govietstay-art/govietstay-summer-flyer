import React, { useState } from "react";
import {
  MessageCircle,
  MapPin,
  Star,
  ShieldCheck,
  X,
  Clock,
  CheckCircle2,
  XCircle,
  Sparkles,
  Languages,
} from "lucide-react";

const WHATSAPP = "https://wa.me/84937762607";
const GOOGLE_MAPS = "https://maps.app.goo.gl/zRcGfc5q7itp1coy6?g_st=ic";

const tours = [
  {
    id: 1,
    title: "Ba Na Hills & Golden Bridge",
    titleRu: "Бана Хиллс и Золотой мост",
    oldPrice: "68 USD",
    price: "58 USD",
    image: "/tour1.jpg",
    tag: "MOUNTAIN ICONIC",
    duration: "Full Day",
    bestFor: ["Families", "Couples", "First-time visitors", "Photo lovers"],
    overview:
      "Walk above the clouds on the iconic Golden Bridge, ride one of Vietnam’s most scenic cable cars, enjoy cool mountain air and explore the European-style French Village.",
    overviewRu:
      "Прогулка над облаками по знаменитому Золотому мосту, живописная канатная дорога, прохладный горный воздух и атмосфера Французской деревни.",
    itinerary: [
      ["07:30 – 08:00", "Hotel pick-up in Da Nang or Hoi An area."],
      ["09:00", "Arrive at Ba Na Hills cable car station and start the mountain journey."],
      ["10:00", "Visit Golden Bridge and take photos with the giant stone hands."],
      ["11:30", "Explore Le Jardin, wine cellar area, gardens and mountain viewpoints."],
      ["12:30", "Lunch break. Buffet or local meal option depending on selected package."],
      ["13:30", "Visit French Village, Fantasy Park and scenic walking areas."],
      ["15:30 – 16:00", "Return by cable car and transfer back to hotel."],
    ],
    included: [
      "Hotel pick-up support",
      "Private/local support arrangement",
      "Cable car ticket support",
      "English support",
      "Russian-speaking guide/support available for Russian guests",
    ],
    notIncluded: ["Personal expenses", "Drinks", "Tips", "Meals if not selected in package"],
    tips: [
      "Bring a light jacket because the mountain can be cool.",
      "Morning is better for photos and fewer crowds.",
      "Final price depends on ticket/transport option and will be confirmed in VND.",
    ],
  },
  {
    id: 2,
    title: "Hoi An Ancient Town & Memories Show",
    titleRu: "Старый город Хойан и шоу Memories",
    oldPrice: "100 USD",
    price: "85 USD",
    image: "/tour2.jpg",
    tag: "CULTURE & LANTERNS",
    duration: "Afternoon / Evening",
    bestFor: ["Couples", "Culture lovers", "Families", "Night market lovers"],
    overview:
      "A magical evening in Hoi An with lantern streets, riverside beauty, optional basket boat or lantern boat, night market and the famous Hoi An Memories Show.",
    overviewRu:
      "Волшебный вечер в Хойане: улицы с фонарями, набережная, ночной рынок, лодка с фонариками и знаменитое шоу Hoi An Memories.",
    itinerary: [
      ["14:30 – 15:00", "Pick up from hotel in Da Nang."],
      ["15:30", "Arrive in Hoi An area. Optional stop at coconut village or local coffee."],
      ["16:30", "Walk through Hoi An Ancient Town, Japanese Bridge area and old streets."],
      ["17:30", "Lantern photo time and riverside walking."],
      ["18:30", "Dinner time or free time at night market."],
      ["19:30", "Hoi An Memories Show option."],
      ["21:00 – 21:30", "Return to Da Nang."],
    ],
    included: [
      "Hotel pick-up support",
      "Ancient town walking support",
      "Night market guidance",
      "English support",
      "Russian-speaking guide/support available for Russian guests",
    ],
    notIncluded: ["Show ticket if not selected", "Meals", "Lantern boat fee", "Personal shopping"],
    tips: [
      "Best time for lantern photos is after sunset.",
      "Wear comfortable shoes for walking.",
      "Ask us on WhatsApp if you want Memories Show tickets included.",
    ],
  },
  {
    id: 3,
    title: "Aphrodite Sunset Cruise",
    titleRu: "Круиз Aphrodite на закате",
    oldPrice: "84 USD",
    price: "71 USD",
    image: "/tour3.jpg",
    tag: "SUNSET CRUISE",
    duration: "Evening",
    bestFor: ["Couples", "Relaxing evening", "Romantic travelers", "Photo lovers"],
    overview:
      "Relax on the river with sunset views, Da Nang skyline, romantic atmosphere and an easy evening plan after a beach day.",
    overviewRu:
      "Расслабляющий вечерний круиз с видом на закат, огни Дананга, романтичная атмосфера и легкая программа после пляжа.",
    itinerary: [
      ["16:30 – 17:00", "Pick-up or meeting support depending on hotel location."],
      ["17:30", "Board the cruise and enjoy welcome atmosphere."],
      ["18:00", "Sunset viewing and photo time."],
      ["18:30", "Relax on board with music and river views."],
      ["19:30", "Enjoy Da Nang night skyline and bridges."],
      ["20:00 – 20:30", "Return and transfer support."],
    ],
    included: [
      "Booking support",
      "Cruise ticket support",
      "WhatsApp assistance",
      "English support",
      "Russian-speaking guide/support available for Russian guests",
    ],
    notIncluded: ["Personal drinks", "Premium dining extras", "Tips", "Private transfer if not selected"],
    tips: [
      "Sunset time can change by season.",
      "Book early on weekends.",
      "Great option for couples and relaxed travelers.",
    ],
  },
  {
    id: 4,
    title: "Off-Road Jeep & SUP Experience",
    titleRu: "Джип-тур и SUP-приключение",
    oldPrice: "116 USD",
    price: "99 USD",
    image: "/tour4.jpg",
    tag: "ADVENTURE & NATURE",
    duration: "Half Day / Flexible",
    bestFor: ["Adventure travelers", "Friends", "Couples", "Photo lovers"],
    overview:
      "A scenic jeep adventure through coastal roads, mountain viewpoints, hidden nature corners and optional SUP experience for a fun outdoor day.",
    overviewRu:
      "Живописное приключение на джипе: морские дороги, горные виды, скрытые природные места и SUP-активность.",
    itinerary: [
      ["08:00 or 14:30", "Pick-up from hotel, flexible morning or afternoon option."],
      ["09:00 / 15:30", "Start scenic jeep ride along coastal and mountain roads."],
      ["10:00 / 16:30", "Photo stops at viewpoints and hidden nature corners."],
      ["11:00 / 17:30", "SUP or beach activity depending on weather and sea condition."],
      ["12:00 / 18:30", "Coffee, local drink or free time option."],
      ["13:00 / 19:00", "Return to hotel."],
    ],
    included: [
      "Jeep experience support",
      "Local guide/support",
      "Photo stop planning",
      "SUP activity support if available",
      "Russian-speaking guide/support available for Russian guests",
    ],
    notIncluded: ["Meals", "Personal expenses", "Extra activities not confirmed", "Tips"],
    tips: [
      "SUP depends on weather and sea condition.",
      "Bring swimwear and towel.",
      "Afternoon option is better for sunset photos.",
    ],
  },
  {
    id: 5,
    title: "Dong Giang Heaven Gate",
    titleRu: "Небесные ворота Донгзянг",
    oldPrice: "68 USD",
    price: "58 USD",
    image: "/tour5.jpg",
    tag: "SCENIC MOUNTAINS",
    duration: "Full Day",
    bestFor: ["Nature lovers", "Mountain views", "Local culture", "Quiet travelers"],
    overview:
      "Explore mountain roads, local culture, cool air, forest scenery and peaceful highland views away from the busy city.",
    overviewRu:
      "Горные дороги, местная культура, свежий воздух, лесные пейзажи и спокойная атмосфера вдали от города.",
    itinerary: [
      ["07:30 – 08:00", "Hotel pick-up in Da Nang."],
      ["09:30", "Scenic drive through mountain roads and countryside."],
      ["10:30", "Visit Heaven Gate area and viewpoint."],
      ["12:00", "Lunch break with local food option."],
      ["13:30", "Explore local culture, nature scenery and photo spots."],
      ["15:30", "Relaxing return drive to Da Nang."],
      ["17:00", "Drop-off at hotel."],
    ],
    included: [
      "Transport support",
      "Local itinerary planning",
      "Photo stops",
      "English support",
      "Russian-speaking guide/support available for Russian guests",
    ],
    notIncluded: ["Entrance fees if applicable", "Meals if not selected", "Personal expenses", "Tips"],
    tips: [
      "Good for travelers who want nature and less crowded places.",
      "Bring comfortable shoes.",
      "Weather can change in mountain areas.",
    ],
  },
  {
    id: 6,
    title: "Cham Island Snorkeling",
    titleRu: "Снорклинг на острове Чам",
    oldPrice: "52 USD",
    price: "44 USD",
    image: "/tour6.jpg",
    tag: "ISLAND & SEA",
    duration: "Full Day",
    bestFor: ["Beach lovers", "Families", "Snorkeling", "Island day trip"],
    overview:
      "Enjoy an island day with speed boat, snorkeling, coral reefs, beach time and fresh seafood lunch.",
    overviewRu:
      "День на острове: скоростная лодка, снорклинг, кораллы, пляжное время и морской обед.",
    itinerary: [
      ["07:30 – 08:00", "Pick-up from hotel and transfer to pier."],
      ["09:00", "Speed boat to Cham Island."],
      ["10:00", "Snorkeling and coral reef experience."],
      ["11:30", "Beach time and relaxing."],
      ["12:30", "Lunch with seafood/local dishes."],
      ["14:00", "Free time, swimming or walking."],
      ["15:00 – 16:00", "Return to mainland and hotel drop-off."],
    ],
    included: [
      "Speed boat support",
      "Snorkeling equipment support",
      "Lunch support depending on package",
      "Hotel pick-up support",
      "Russian-speaking guide/support available for Russian guests",
    ],
    notIncluded: ["Personal expenses", "Drinks", "Extra water sports", "Tips"],
    tips: [
      "Best in good weather season.",
      "Bring sunscreen and swimwear.",
      "Tour may change if sea conditions are not safe.",
    ],
  },
  {
    id: 7,
    title: "Hue Imperial City Discovery",
    titleRu: "Императорский город Хюэ",
    oldPrice: "116 USD",
    price: "99 USD",
    image: "/tour7.jpg",
    tag: "HISTORY & HERITAGE",
    duration: "Full Day",
    bestFor: ["History lovers", "Culture travelers", "Families", "Architecture lovers"],
    overview:
      "Discover Vietnam’s royal history through Imperial City, ancient tombs, pagodas and the peaceful Perfume River atmosphere.",
    overviewRu:
      "Королевская история Вьетнама: Императорский город, древние гробницы, пагоды и атмосфера реки Ароматов.",
    itinerary: [
      ["07:00 – 07:30", "Pick-up from Da Nang hotel."],
      ["09:30", "Arrive in Hue, visit Imperial City."],
      ["11:30", "Explore royal history and ancient architecture."],
      ["12:30", "Lunch break with Hue local food option."],
      ["13:30", "Visit royal tomb or pagoda depending on route."],
      ["15:30", "Perfume River / photo stop / local coffee option."],
      ["17:30 – 18:30", "Return to Da Nang."],
    ],
    included: [
      "Transport support",
      "Hue route planning",
      "Local historical guidance support",
      "English support",
      "Russian-speaking guide/support available for Russian guests",
    ],
    notIncluded: ["Entrance tickets if not selected", "Meals", "Personal expenses", "Tips"],
    tips: [
      "Hue is a longer day trip, start early.",
      "Bring hat and water in hot season.",
      "Great for culture and history-focused travelers.",
    ],
  },
  {
    id: 8,
    title: "Bay Mau Coconut Forest & Hoi An",
    titleRu: "Кокосовая деревня Bay Mau и Хойан",
    oldPrice: "63 USD",
    price: "54 USD",
    image: "/tour8.jpg",
    tag: "LOCAL LIFE & FUN",
    duration: "Half Day / Afternoon",
    bestFor: ["Families", "Fun activity", "Local life", "Hoi An combo"],
    overview:
      "A fun local experience with basket boat ride, coconut forest, countryside vibes and easy connection to Hoi An Ancient Town.",
    overviewRu:
      "Веселый местный опыт: лодка-корзина, кокосовый лес, деревенская атмосфера и удобное сочетание с Хойаном.",
    itinerary: [
      ["08:00 or 14:00", "Pick-up from hotel."],
      ["09:00 / 15:00", "Arrive at Bay Mau Coconut Forest."],
      ["09:30 / 15:30", "Basket boat ride and local activity."],
      ["10:30 / 16:30", "Photo time and countryside scenery."],
      ["11:30 / 17:30", "Optional Hoi An Ancient Town stop."],
      ["13:00 / 20:00", "Return to hotel depending on selected route."],
    ],
    included: [
      "Basket boat support",
      "Local activity support",
      "Hotel pick-up support",
      "Hoi An combo planning",
      "Russian-speaking guide/support available for Russian guests",
    ],
    notIncluded: ["Meals", "Extra local activities", "Personal expenses", "Tips"],
    tips: [
      "Good for families and relaxed travelers.",
      "Afternoon works well if combining with Hoi An evening.",
      "Ask WhatsApp if you prefer private timing.",
    ],
  },
  {
    id: 9,
    title: "Da Nang Omakase Experience",
    titleRu: "Омакасе в Дананге",
    oldPrice: "89 USD",
    price: "76 USD",
    image: "/tour9.jpg",
    tag: "PREMIUM DINING",
    duration: "Dinner Experience",
    bestFor: ["Couples", "Food lovers", "Special occasions", "Luxury travelers"],
    overview:
      "A refined Japanese omakase dining experience in Da Nang with chef-selected seasonal dishes, premium atmosphere and easy booking support.",
    overviewRu:
      "Премиальный японский омакасе-ужин в Дананге: блюда от шефа, сезонные ингредиенты, уютная атмосфера и удобное бронирование.",
    itinerary: [
      ["Before dinner", "WhatsApp reservation support and time confirmation."],
      ["Arrival", "Welcome and seating at the dining venue."],
      ["Dinner", "Chef-selected omakase tasting menu with seasonal dishes."],
      ["Experience", "Enjoy premium Japanese dining atmosphere."],
      ["After dinner", "Support for transport, next bar/café or night market suggestion."],
    ],
    included: [
      "Reservation support",
      "Omakase dining arrangement",
      "WhatsApp assistance",
      "English support",
      "Russian-speaking support available for Russian guests",
    ],
    notIncluded: ["Extra drinks", "Additional dishes", "Transport if not requested", "Tips"],
    tips: [
      "Book early because seats may be limited.",
      "Best for couples, food lovers and special nights.",
      "Final menu and price are confirmed before booking.",
    ],
  },
];

function DetailSection({ title, children }) {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
      <h3 className="mb-4 text-xl font-black text-emerald-950">{title}</h3>
      {children}
    </div>
  );
}

export default function App() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="min-h-screen bg-[#fff7e7] text-slate-900">
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-teal-900 to-yellow-900 px-5 py-16 text-center text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-emerald-300 blur-3xl" />
          <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-amber-300 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <img
            src="/logo.jpg"
            alt="GoVietStay"
            className="mx-auto mb-5 h-28 w-28 rounded-full bg-white/95 object-contain p-2 shadow-2xl"
          />

          <h1 className="text-5xl font-black tracking-tight md:text-7xl">GoVietStay</h1>
          <p className="mt-2 text-xs uppercase tracking-[0.45em] text-amber-100 md:text-sm">
            Da Nang • Hoi An • Vietnam
          </p>

          <p className="mt-8 font-serif text-5xl italic text-amber-200 md:text-7xl">
            Summer Special
          </p>
          <h2 className="mt-2 text-7xl font-black md:text-9xl">2026</h2>

          <p className="mx-auto mt-6 max-w-5xl text-3xl font-black md:text-5xl">
            9 Signature Experiences • Up to <span className="text-amber-300">15% OFF</span>
          </p>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-white/90 md:text-xl">
            EN/RU digital travel flyer for beach travelers: cinematic images, clear tour details,
            Google Maps trust, and instant WhatsApp booking.
          </p>

          <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur">
              <MessageCircle className="mx-auto mb-2" />
              <b>Easy WhatsApp Booking</b>
            </div>
            <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur">
              <ShieldCheck className="mx-auto mb-2" />
              <b>Trusted Local Support</b>
            </div>
            <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur">
              <Star className="mx-auto mb-2" />
              <b>Google Maps Reviews</b>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={WHATSAPP}
              className="rounded-full bg-green-500 px-8 py-4 text-lg font-black text-white shadow-xl transition hover:bg-green-400"
            >
              Chat on WhatsApp
            </a>
            <a
              href={GOOGLE_MAPS}
              className="rounded-full bg-white px-8 py-4 text-lg font-black text-emerald-950 shadow-xl transition hover:bg-amber-100"
            >
              Google Reviews
            </a>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 md:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <div className="mb-4 inline-block rounded-full bg-emerald-800 px-6 py-2 text-sm font-black text-white">
            Tap each experience to see full itinerary
          </div>

          <h2 className="text-4xl font-black text-emerald-950 md:text-6xl">
            9 Experiences — Unlimited Memories
          </h2>

          <p className="mt-3 text-slate-600">
            EN/RU overview, detailed program, inclusions, tips, summer reference price and instant WhatsApp booking.
          </p>

          <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tours.map((tour) => (
              <button
                key={tour.id}
                onClick={() => setSelected(tour)}
                className="group overflow-hidden rounded-[2rem] bg-white text-left shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="h-full w-full object-cover object-center transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute left-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-white text-xl font-black text-emerald-900 shadow-lg">
                    {tour.id}
                  </div>

                  <div className="absolute right-4 top-4 rounded-full bg-rose-500 px-4 py-2 text-sm font-black text-white shadow">
                    15% OFF
                  </div>

                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <p className="text-xs font-black uppercase tracking-[0.25em] text-amber-200">
                      {tour.tag}
                    </p>
                    <h3 className="mt-2 text-2xl font-black leading-tight drop-shadow">
                      {tour.title}
                    </h3>
                    <p className="mt-1 text-sm text-white/90">{tour.titleRu}</p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-end gap-3">
                    <span className="text-lg text-slate-500 line-through">{tour.oldPrice}</span>
                    <span className="text-4xl font-black text-emerald-700">{tour.price}</span>
                  </div>

                  <div className="mt-5 rounded-2xl bg-amber-50 p-4 text-sm font-bold text-emerald-950">
                    4+ Guests = FREE Private Tour Upgrade + 30-min Foot Massage
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <span className="font-bold text-slate-600">Tap for full details</span>
                    <span className="rounded-full bg-green-500 px-5 py-2 font-black text-white">
                      Explore
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="fixed bottom-5 left-1/2 z-40 w-[90%] max-w-xl -translate-x-1/2">
        <a
          href={WHATSAPP}
          className="flex items-center justify-center gap-3 rounded-full border-4 border-white bg-green-500 px-6 py-4 text-xl font-black text-white shadow-2xl transition hover:bg-green-400"
        >
          <MessageCircle /> Chat on WhatsApp
        </a>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 bg-black/70 p-3 backdrop-blur-sm md:p-8">
          <div className="mx-auto max-h-[94vh] max-w-5xl overflow-y-auto rounded-[2rem] bg-[#fffaf0] shadow-2xl">
            <div className="relative h-[420px] overflow-hidden md:h-[520px]">
              <img
                src={selected.image}
                alt={selected.title}
                className="h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              <button
                onClick={() => setSelected(null)}
                className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-full bg-white text-emerald-950 shadow-xl"
              >
                <X />
              </button>

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-sm font-black uppercase tracking-[0.3em] text-amber-200">
                  {selected.tag}
                </p>
                <h2 className="mt-2 text-4xl font-black md:text-6xl">{selected.title}</h2>
                <p className="mt-2 text-lg text-white/90">{selected.titleRu}</p>
              </div>
            </div>

            <div className="space-y-6 p-6 md:p-10">
              <div className="flex flex-wrap items-end gap-4">
                <span className="text-2xl text-slate-500 line-through">{selected.oldPrice}</span>
                <span className="text-6xl font-black text-emerald-700">{selected.price}</span>
                <span className="rounded-full bg-rose-100 px-4 py-2 font-black text-rose-700">
                  Summer reference price
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-3xl bg-white p-5 shadow-sm">
                  <Clock className="mb-2 text-emerald-700" />
                  <b>Duration</b>
                  <p className="text-slate-600">{selected.duration}</p>
                </div>
                <div className="rounded-3xl bg-white p-5 shadow-sm">
                  <Languages className="mb-2 text-emerald-700" />
                  <b>Language Support</b>
                  <p className="text-slate-600">EN / RU support available</p>
                </div>
                <div className="rounded-3xl bg-white p-5 shadow-sm">
                  <MapPin className="mb-2 text-emerald-700" />
                  <b>Booking</b>
                  <p className="text-slate-600">Confirm by WhatsApp</p>
                </div>
              </div>

              <DetailSection title="Overview / Обзор">
                <p className="text-lg leading-relaxed text-slate-700">
                  <b>EN:</b> {selected.overview}
                </p>
                <p className="mt-4 text-lg leading-relaxed text-slate-700">
                  <b>RU:</b> {selected.overviewRu}
                </p>
              </DetailSection>

              <DetailSection title="Detailed Program / Подробная программа">
                <div className="space-y-3">
                  {selected.itinerary.map(([time, item]) => (
                    <div
                      key={time + item}
                      className="grid gap-2 rounded-2xl bg-amber-50 p-4 md:grid-cols-[150px_1fr]"
                    >
                      <div className="font-black text-emerald-800">{time}</div>
                      <div className="text-slate-700">{item}</div>
                    </div>
                  ))}
                </div>
              </DetailSection>

              <div className="grid gap-6 md:grid-cols-2">
                <DetailSection title="Included / Включено">
                  <ul className="space-y-3">
                    {selected.included.map((item) => (
                      <li key={item} className="flex gap-3">
                        <CheckCircle2 className="mt-1 shrink-0 text-green-600" size={20} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </DetailSection>

                <DetailSection title="Not Included / Не включено">
                  <ul className="space-y-3">
                    {selected.notIncluded.map((item) => (
                      <li key={item} className="flex gap-3">
                        <XCircle className="mt-1 shrink-0 text-rose-500" size={20} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </DetailSection>
              </div>

              <DetailSection title="Best For / Лучше всего для">
                <div className="flex flex-wrap gap-3">
                  {selected.bestFor.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-emerald-50 px-4 py-2 font-bold text-emerald-900"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </DetailSection>

              <DetailSection title="Local Tips / Местные советы">
                <ul className="space-y-3">
                  {selected.tips.map((item) => (
                    <li key={item} className="flex gap-3">
                      <Sparkles className="mt-1 shrink-0 text-amber-500" size={20} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </DetailSection>

              <div className="rounded-3xl bg-green-50 p-6 text-lg font-black text-emerald-950">
                EN: 4+ Guests = FREE Private Tour Upgrade + 30-minute Foot Massage at Night Market.
                <br />
                RU: Для групп от 4 гостей: бесплатный Private Tour + 30 минут массажа ног на ночном рынке.
              </div>

              <div className="rounded-3xl bg-slate-50 p-6 text-slate-700">
                <b>Price note:</b> USD prices are for easy reference only. Main payment in Vietnam is VND.
                Final price will be confirmed in VND before booking.
                <br />
                <b>Примечание:</b> Цены в USD указаны только для удобства. Основная оплата во Вьетнаме — VND.
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <a
                  href={WHATSAPP}
                  className="rounded-full bg-green-500 px-8 py-4 text-center text-xl font-black text-white shadow-xl transition hover:bg-green-400"
                >
                  Book on WhatsApp
                </a>
                <a
                  href={GOOGLE_MAPS}
                  className="rounded-full bg-emerald-950 px-8 py-4 text-center text-xl font-black text-white shadow-xl transition hover:bg-emerald-900"
                >
                  View Google Reviews
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="pb-28 pt-10 text-center text-sm text-slate-500">
        GoVietStay • Da Nang • Hoi An • Vietnam • WhatsApp: +84 937 762 607
      </footer>
    </div>
  );
}
