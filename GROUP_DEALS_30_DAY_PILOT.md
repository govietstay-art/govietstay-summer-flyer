# GoVietStay Weekly Group Deals — 30-day controlled pilot

## Purpose
Measure real demand and booking economics for self-serve small-group excursions. Russian is the default interface and primary acquisition market, but **Russian-speaking and English-speaking guide groups are separate**. The page must never mix cohorts automatically.

## Scope
- Exactly three products: Ba Na Hills & Golden Bridge (Tuesdays), Hoi An & Coconut Forest (Thursdays), Cham Island Snorkeling (Saturdays).
- Four planned dates per product from the next Monday, generated relative to the user's current browser date. That is **12 proposed dates per four-week period**, not confirmed departures.
- Two language cohorts per tour/date, each capped at 10 only after real availability and seat counts are integrated. During this first landing-page MVP, requests are collected through WhatsApp and seat counts are not displayed.
- Each date needs at least 4 paying adults before confirmation, subject to supplier economics; children must be costed separately.
- No payment on the form. Submission creates a prefilled WhatsApp request; it does **not** guarantee delivery until the guest presses send.
- Existing catalogue is preserved below the pilot section.

## Pricing — do not publish unapproved group prices
Public English baseline references from current catalogue, to be reconfirmed:
- Ba Na Hills 1,550,000 VND / adult.
- Hoi An + Coconut Forest 1,250,000 VND / adult.
- Cham Island 950,000 VND / adult.
Russian-guided cost calculations must be independently approved, including guide, vehicle, admission/boat/buffet, support, contingency and a minimum margin. The example discount staircase on the page is **illustrative only**, with 4 guests 0%, 6 guests 4%, 8 guests 8%, 10 guests 10%. Approval requires checking per-group cost and per-person ticket cost. Never assume 10% is profitable or that English and Russian can share rates.

Proposed price calculator for each guide-language cohort:
`totalCost(n) = fixedGuide + fixedTransport + fixedSupplier + n * variableAdultCost + childCosts + contingency`.
`priceFloor(n) = ceilToVND((totalCost(n) + targetMinimumProfit) / adultEquivalentUnits)`.
`displayPrice(n) = max(approvedTierPrice(n), priceFloor(n))`.
Every accepted attendee receives the **same final adult tier price** for their own cohort, subject to clearly agreed child pricing and package inclusions. If tier price drops after an early booking, adjust payment balance or refund the difference per preannounced terms.

## Required production automation — not claimed in current MVP
1. Persistent authenticated inventory: tour, date, guide language, total capacity, actual paid/held seats, confirmed trip status, approved pricing tiers and supplier cost settings.
2. Reserve seats atomically with an expiration; never count unverified WhatsApp clicks as reserved seats.
3. Process checkout payment callback, verify the signature, avoid duplicate counting and record refunds.
4. Trigger tier change and send notifications only when verified group count crosses an approved tier.
5. At the group minimum, create an operations approval task (guide, vehicle, ticket/boat availability, weather for Cham).
6. Automatic close at published cutoff (suggest 48 hours before departure for land tours; suppliers may require different cutoff).
7. No payment captured until confirmed product and refund terms are explicit; privacy limits public displays to aggregate counts.

## KPI scorecard for the first four weeks
Track per trip, date, and EN/RU cohort:
- unique landing visitors and traffic source / QR partner;
- WhatsApp opens versus manually verified **received** requests;
- unique valid adult-equivalent interests (remove duplicates);
- conversion from valid request to paid booking;
- cohort fill rate at cutoff and departure completion;
- actual gross revenue, per-guest cost, guide cost, contribution margin, cancellations and refunds;
- number of customers reporting that clear price tiers or language options influenced their decision.
Review once per week. At day 30, continue only if supplier-safe departures, genuine booking demand, and nonnegative contribution economics are demonstrated; change tiers or discontinue underperforming departures.

## Guest-first commitments
- Russian-language experience by default; Russian guide option is not merely translated UI.
- No fake live guests, countdowns, last-seat scarcity or locked-in departure guarantees.
- Ask only for necessary personal details and obtain explicit contact consent.
- Show inclusions, adult and child rules, cancellation policy, exact group language, cutoff and weather contingencies **before checkout**.
- If a group is unfilled, offer a date transfer or a decline with no charge during the request stage.

## Release gate
Current GitHub branch integrates a responsive Russian-first landing page and WhatsApp request handoff. It does **not** yet contain persistent inventory, automated payment, approved price reductions, a real-time Admin dashboard, or live occupancy. Test the build/mobile flow and validate Vercel project authorization before release. Run production automation only after an authenticated backend and verified supplier economics are ready.
