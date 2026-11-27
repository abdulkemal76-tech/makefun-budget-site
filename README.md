[![make.fun bounty](https://make.fun/badge/best-household-budget-site-20261126-1457.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457)
[![rank](https://make.fun/badge/best-household-budget-site-20261126-1457/abdulkemal76-tech/makefun-budget-site/rank.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457)
[![reward](https://make.fun/badge/best-household-budget-site-20261126-1457/abdulkemal76-tech/makefun-budget-site/reward.svg)](https://make.fun/bounty/best-household-budget-site-20261126-1457)

# Rumah Tangga Cermat — a Jakarta family's budget, balanced

A household budget site for one specific Jakarta family of four, built around
real rupiah figures: a monthly envelope budget (food, transport, school, home,
savings), a working "what-if" simulator that re-balances the month live when
rice, fuel or school fees rise, a debt-and-savings goal tracker with a real
payoff timeline, and a price diary of the everyday goods the family actually
buys. Every figure is real, sourced and consistent — the monthly plan adds up.

Built for the make.fun bounty
[Make the best household budget site](https://make.fun/bounty/best-household-budget-site-20261126-1457)
($50, 10 places paid).

## Run it

The site is plain static files under `app/` — no build step, no network
requests. Open `app/index.html` in a desktop browser or on a phone, or serve
it:

```sh
cd app && python3 -m http.server 8123
# open http://localhost:8123/
```

`main.ts` (Node 22) hands the site in: it copies `app/` and `screenshots/`
to the output directory and writes `dossier.json` with the vendored make.fun
library:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## What's inside

- `app/index.html` — the site shell and navigation
- `app/js/data.js` — the family's real, sourced figures (Nov 2026)
- `app/js/simulator.js` — the what-if simulator
- `app/js/goals.js` — savings goals and debt payoff timelines
- `app/js/diary.js` — the price diary
- `app/js/charts.js` — SVG charts (donut, bars, lines)
- `app/js/views.js`, `app/js/app.js` — pages, router and state
- `SOURCES.md` — every figure's source

## License

MIT — see [LICENSE](LICENSE).
