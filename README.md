# spectral-jsonapi-ruleset

![Node.js CI](https://github.com/jmlue42/spectral-jsonapi-ruleset/workflows/Node.js%20CI/badge.svg)
![CodeQL](https://github.com/jmlue42/spectral-jsonapi-ruleset/workflows/CodeQL/badge.svg)

> A [Stoplight/Spectral](https://github.com/stoplightio/spectral) linting ruleset for the [JSON:API specification v1.0](https://jsonapi.org/format/1.0).

## Installation
For ways to integrate this ruleset into your Spectral linting suite. See [Sharing & Distributing Rulesets](https://meta.stoplight.io/docs/spectral/docs/guides/7-sharing-rulesets.md) at <https://meta.stoplight.io/>

## Organization

`.spectral.yml` - Spectral Ruleset

The ruleset `extends` - `spectral:oas`, spectral's built-in OAS linting rules.

The rules are generally organized by the JSON:API specification section the rule is mentioned in. Each rule notes the section url it realates to.

`examples` folder contains valid and invalid OAS3.1 examples

## Contributing
In lieu of a formal style guide (I know... ironic :grin:):
- Take care to maintain the existing coding format.
- Make needed adjustments to valid example
- Verify all linting PASS: `npm test`

## License
[MIT License](https://github.com/jmlue42/spectral-jsonapi-ruleset/blob/main/LICENSE)
