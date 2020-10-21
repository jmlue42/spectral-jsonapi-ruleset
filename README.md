# spectral-jsonapi-ruleset

> A [Stoplight/Spectral](https://github.com/stoplightio/spectral) linting ruleset for the [JSON:API specification](https://jsonapi.org/format).

## Installation
For ways to integrate this ruleset into your Spectral linting suite. See [Sharing & Distributing Rulesets](https://meta.stoplight.io/docs/spectral/docs/guides/7-sharing-rulesets.md) at <https://meta.stoplight.io/>

## Organization
Rules and Rulesets are organized by section of the JSON:API specification:
- Primary Ruleset
  - `./jsonapi-ruleset.yaml`
- Main Sections
  - `./rules/jsonapi-{name-of-section}-ruleset.yaml`
- Sub Sections
  - `./rules/jsonapi-{name-of-section}.yaml`

Each file `extends` rules/rulesets contained in its corresponding subsections.

## Contributing
In lieu of a formal style guide (I know... ironic :grin:):
- Take care to maintain the existing coding style, including tests.
- Add tests for all new/edited rules including JSONPath testing.

## License
[MIT License](https://github.com/jmlue42/spectral-jsonapi-ruleset/blob/main/LICENSE)
