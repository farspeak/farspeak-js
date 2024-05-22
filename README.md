# Farspeak JS/TS

Farspeak.ai offers AI tools to your app development workflow. This is our initial release, so stay tuned for much more to come!

## Getting started

First install the NPM package:

```
1. npm i farspeak
```

Then, in your JS or TS file import the `Farspeak` class:

```ts
import { Farspeak } from "farspeak";
//OR
const Farspeak = require("farspeak").Farspeak;
```

Instantiate the farspeak variable:

```js
const farspeak = new Farspeak({
  app: "your-app", // your app name
  env: "dev", // your app env
  backendToken: "43t8q1bc2eggnc", // paste your backend token
});
```

Next step is to write your first entity. This is done by `.write` command, for example using `cars` entity:

```js
// Entities have to be of array type even with only one element
const cars = [
  {
    name: "BMW",
    model: "X5",
    year: 2020,
  },
  {
    name: "Audi",
    model: "Q7",
    year: 2021,
  },
  {
    name: "Mercedes",
    model: "S-Class",
    year: 2022,
  },
];
farspeak
  .entity("cars")
  .write(cars)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log(err));
```

Let's make a sample inquiry using `.inquire` method, useful for RAG applications:

```js
farspeak
  .entity("cars")
  .inquire("From which year is our model Q7?")
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log(err));
```

You should get response like:

```js
{
  answer: "The Audi Q7 model is from the year 2021.";
}
```

Please have a look at [tests](src/test) to see how can you use Farspeak with Typescript.
