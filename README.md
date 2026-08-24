# Garden Hotel & SPA — redesign

A cleaner public site for [ghs.kg](https://ghs.kg/), using the hotel’s real rooms, prices, photos, and booking links.

Live: https://tipilek2020-ai.github.io/garden-hotel-site/

## Pages

- `index.html` — stay, rooms, halls, reviews
- `rooms.html` — five keys with live booking IDs
- `spa.html` — pool, sauna, massage rates
- `events.html` — Aigul / Jasmine / Archa + banquet
- `photos.html` — house gallery
- `amenities.html` — facilities
- `contacts.html` — phones, mail, map

Booking still goes to the hotel’s Exely calendar at `https://ghs.kg/booking/`.

## Run locally

```bash
cd ghs-redesign
python -m http.server 4173
```

Open http://127.0.0.1:4173/
