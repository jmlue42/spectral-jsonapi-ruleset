# @stoplight/lifecycle

[![Maintainability](https://api.codeclimate.com/v1/badges/79ae2a385f589a16e38a/maintainability)](https://codeclimate.com/github/stoplightio/lifecycle/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/79ae2a385f589a16e38a/test_coverage)](https://codeclimate.com/github/stoplightio/lifecycle/test_coverage)

Event and disposable helpers.

- Explore the interfaces: [TSDoc](https://stoplightio.github.io/lifecycle)
- View the changelog: [Releases](https://github.com/stoplightio/lifecycle/releases)

### Features

- Disposable helpers.
- Event emitter helpers.

### Installation

Supported in modern browsers and node.

```bash
# latest stable
yarn add @stoplight/lifecycle
```

### Usage

#### Disposables

A standardized way for things to declare how they cleanup. Simple example below:

```ts
import {
  DisposableCollection,
  EventEmitter,
  IDisposable
} from "@stoplight/lifecycle";

export class Editor implements IDisposable {
  // EventEmitter itself is an IDisposable
  public readonly valueEmitter = new EventEmitter<string, "didUpdate">();

  private readonly disposables: DisposableCollection = new DisposableCollection();

  constructor() {
    this.disposables.push(this.valueEmitter);
  }

  // Implement IDisposable
  dispose() {
    this.disposables.dispose();
  }
}
```

#### Emitter

A simple example editor that allows users to subscribe to value update events.

```ts
import { EventEmitter, IDisposable } from "@stoplight/lifecycle";

class Editor implements IDisposable {
  private _value = "";

  // create an emitter instance for this editor, defining the possible events and event object value
  private valueEmitter = new EventEmitter<string, "willUpdate" | "didUpdate">();

  get value() {
    return this._value;
  }

  set value(val: string) {
    this.valueEmitter.emit("willUpdate", this._value);
    this._value = val;
    this.valueEmitter.emit("didUpdate", this._value);
  }

  get onWillUpdateValue() {
    return this.valueEmitter.on("willUpdate");
  }

  get onDidUpdateValue() {
    return this.valueEmitter.on("didUpdate");
  }

  dispose() {
    // best practice to cleanup the emitter
    this.valueEmitter.dispose();
  }
}

const editor = new Editor();

const willUpdateListener = editor.onWillUpdateValue(val => {
  console.log("next value: ", val);
});

const didUpdateListener = editor.onDidUpdateValue(val => {
  console.log("new value: ", val);
});

// stop listening to willUpdate event
willUpdateListener.dispose();
```

### Contributing

1. Clone repo.
2. Create / checkout `feature/{name}`, `chore/{name}`, or `fix/{name}` branch.
3. Install deps: `yarn`.
4. Make your changes.
5. Run tests: `yarn test.prod`.
6. Stage relevant files to git.
7. Commit: `yarn commit`. _NOTE: Commits that don't follow the [conventional](https://github.com/marionebl/commitlint/tree/master/%40commitlint/config-conventional) format will be rejected. `yarn commit` creates this format for you, or you can put it together manually and then do a regular `git commit`._
8. Push: `git push`.
9. Open PR targeting the `next` branch.
