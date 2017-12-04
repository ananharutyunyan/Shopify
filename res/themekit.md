# TODO

1. [x] remove password from git
  * [x] add a .env file
  * [x] source .env in `spt` alias
  * [x] put in `.gitignore`
  * [x] revoke current api key
  * [x] make new api key
  * [x] add to .env
  * [x] remove password from config
  * [x] observed that env variables don't work; made a [ticket](https://github.com/Shopify/themekit/issues/462) and added `themk` alias that uses -p & -s flags for theme set to the env variables, because that does work
2. [x] use environments
  * [x] see what current theme id is and set it as production, in master
  * [x] download