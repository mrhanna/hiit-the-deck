# HIIT the Deck

A fitness card game, developed for mobile with Expo. I started this project in early 2023, based on an idea by [Jim Goza](https://jimsgym.fit/).

## Roadmap

- ~~Rewrite existing game logic in TypeScript~~
- ~~Rewrite existing UI with modern libraries~~
- ...?

## Development log

### 8/27/2025

I have rewritten everything (card logic, data model, state logic, etc.) in TypeScript. I have also reimplemented the UI. There are plenty of improvements yet to be made but already it is much more polished than before.

I implemented the card drawing animation from scratch rather than relying on a carousel library like before. This should render less greedily, be more performant, and hopefully avoid future framework upgrade woes.

The app understand supersets now. I never got around to that before.

I need to polish the navigation (esp. add close/return to home buttons), add timers and related features to the workout screen. Eventually, I will make decks customizable too. Right now, the "API" is just a dummy that contains a library of hard-coded exercises and decks - eventually I will make a REST service (Strapi??) so that Jim can manage the exercise library and curate decks, and the API will fetch from that.

### 8/7/2025

It is August 2025, and I want to resurrect the old codebase and turn it into a publishable mobile app. At the moment, the old codebase will only run using Node 16. Many dependencies are outdated/deprecated, and there doesn't seem to be a straightforward way to update anything. There's work to do.

I am starting with a fresh Expo project. The old state logic (Redux) should still be useable, so I will pull it into this new repo and rewrite it in TypeScript. My best bet is to just start over again with the UI and leverage Expo's new routing paradigm.
