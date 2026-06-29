# spectral-jsonapi-ruleset

![Node.js CI](https://github.com/jmlue42/spectral-jsonapi-ruleset/workflows/Node.js%20CI/badge.svg)
![CodeQL](https://github.com/jmlue42/spectral-jsonapi-ruleset/workflows/CodeQL/badge.svg)

> A [Stoplight/Spectral](https://github.com/stoplightio/spectral) linting ruleset for the [JSON:API specification](https://jsonapi.org/), supporting both [v1.0](https://jsonapi.org/format/1.0) and [v1.1](https://jsonapi.org/format/1.1).

## Installation
For ways to integrate this ruleset into your Spectral linting suite. See [Sharing & Distributing Rulesets](https://meta.stoplight.io/docs/spectral/docs/guides/7-sharing-rulesets.md) at <https://meta.stoplight.io/>

## Organization

`.spectral.yml` - Spectral Ruleset for JSON:API **v1.0**

`jsonapi-1.1.yml` - Spectral Ruleset for JSON:API **v1.1**

Point Spectral at the file matching the JSON:API version your API targets:

```bash
# Lint a v1.0 API definition
spectral lint your-api.yml -r ./.spectral.yml

# Lint a v1.1 API definition
spectral lint your-api.yml -r ./jsonapi-1.1.yml
```

The v1.0 ruleset `extends` - `spectral:oas`, spectral's built-in OAS linting rules.

`jsonapi-1.1.yml` is an additive overlay: it `extends` `.spectral.yml` and only redefines the rules that changed in v1.1 (the `ext`/`profile` media type parameters, the expanded `links` object members, the `jsonapi` object `ext`/`profile`/`meta` members, and the `lid` local identifier). Everything else is inherited unchanged. (Note: Spectral does not inherit `aliases` through `extends`, so the alias block is duplicated in the overlay; keep the two in sync.)

The rules are generally organized by the JSON:API specification section the rule is mentioned in. Each rule notes the section url it realates to.

`examples` folder contains valid and invalid OAS3.1 examples. `examples/valid` is linted against the v1.0 ruleset and `examples/valid-1.1` against the v1.1 ruleset.

## Contributing
In lieu of a formal style guide (I know... ironic :grin:):
- Take care to maintain the existing coding format.
- Make needed adjustments to valid example
- Verify all linting PASS: `npm test`

## License
[MIT License](https://github.com/jmlue42/spectral-jsonapi-ruleset/blob/main/LICENSE)
