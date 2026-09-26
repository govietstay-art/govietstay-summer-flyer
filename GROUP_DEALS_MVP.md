# GoVietStay Group Deals — MVP

This branch adds a bilingual (EN/RU) Group Deals experience **inside the existing Summer Flyer**. The existing 9-tour catalogue remains available below the new section.

## MVP customer flow
1. Open **Find a Group Deal** from the hero or visit `#group-deals`.
2. Choose Ba Na Hills & Golden Bridge, Hoi An & Coconut Forest, or Phu Quoc 3 Islands.
3. Enter preferred date, flexibility, adults, children and ages, pickup area, support language, name, WhatsApp, and notes.
4. Consent to be contacted, then submit. A prefilled WhatsApp request opens to GoVietStay (+84 937 762 607).
5. GoVietStay checks matching requests, tour availability, route, inclusions and final VND price manually; only then confirms departure and payment.

## Important safeguards
- No invented live dates, occupancy, seat counts, confirmed departures, or discounts.
- Requesting a group deal is free. The form does not charge customers.
- Prices are **confirmed individually**, not copied from the older summer flyer.
- English is default for listed trips; Russian guide/support is **on request**, subject to confirmation.
- Weather-dependent Phu Quoc boat travel requires reconfirmation.
- No server-side booking database is included in this MVP. Clicking the WhatsApp button opens a message; actual sending requires the customer to press **Send** in WhatsApp.
- The existing summer flyer has separate historical prices and blanket promotion copy. Review that catalogue before advertising it as a current offer.

## Before opening to paid traffic
1. Confirm current supplier rates, minimum groups, inclusions and cancellation policy for each trip.
2. Validate that WhatsApp number and Google Reviews link are still correct.
3. Have team staff manually record requests and follow-ups in GoVietStay Admin; do not treat WhatsApp-open clicks as received leads.
4. Test mobile form, EN/RU copy, calendar, sharing, and WhatsApp opening on the live deployment.
5. For automated matching and real status tracking: add a server-side API with persistent storage and restricted Admin roles; avoid exposing customer phone numbers publicly.

## Deployment
This Vite application uses `npm run build`. The connected Vercel account currently lists only `govietstay-main-website`; verify the ownership/deployment connection for `govietstay-summer-flyer.vercel.app` before claiming the branch is live.
