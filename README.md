# Ah Uevo
A language flashcard app with an emphasis on multiple meaning words

for in depth documentation of the structure and components of this repo, please check https://github.com/alexjoyner/ro-libs/tree/rewrite/blueprint-templates/ro-nano-starter

## Developing and Contributing
this repository is intentionally kept to as little of dependencies and bloat as possible. All development is created through another repository that uses lerna to manage multiple smaller utility packages. This means to run any tests or view any of the storybook components in this package, you must do the following.

1) Install lerna: https://lerna.js.org/


2) Run project setup commands:
```
git clone https://github.com/alexjoyner/ro-libs.git
git submodule update --init --recursive
lerna bootstrap
```