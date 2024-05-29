# Farspeak JS/TS

Our service allows you to store and process both structured and unstructured data in a unified database format. Whether you're handling JSON files, PDFs, or other document types, our npm package ensures all data is transformed and stored as JSON entities. The interface for processing documents is similar to standard CRUD operations, making it easy to integrate. Regardless of whether you're storing traditional entities or processing documents, the outcome is the same: data is seamlessly written to the Farspeak database. This integration allows you to query all your data using natural language immediately, with structured and unstructured data coexisting harmoniously in a single database.

This is our early release, so stay tuned for much more to come!

## Getting started

First install the NPM package (e.g. with npm, yarn, pnpm, bun):

```
npm i farspeak
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

## Working with documents

Currently Farspeak supports PDFs, but more will come soon. Also, as of now you can only send one document at a time.

The interface works similarly to sending entities, but processing documents results in entities being written to the Farspeak database in exactly the same way.

Using Typescript it becomes very easy, just prepare your type and instructions for parsing.

```js
type MyEntityType = {
  full_name: string;
  landlord: string;
  location: string;
  email: string;
  phone: string;
  paragraphs: string[];
};
const filePath = "./path/to/fake.pdf";
const instructions = "This is a Rental agreement";
const template = {
  full_name: "This is full name of the tenant",
  landlord: "This is full name of the landlord",
  location: "Location of the apartment, including street name and number, country and city",
  email: "This is email of the landlord",
  paragraphs: `List of paragraphs in the contract`,
};
const doc = await farspeak
  .entity("rentals")
  .analyseDocument({ filePath, instructions, template });
// Finally, check if this entity exists:
const entity = await farspeak.entity("rentals").get<MyEntityType>(doc.id);
```

The more specific you are about your requirements, the better the results will be. While a general list of paragraphs can work, it's not ideal. For the best outcome, clearly specify what you need, such as providing a list of amenities as an array of strings.

Now you can query your entities:

```js
const inquire = await farspeak
  .entity("rentals")
  .inquire("What is cancellation policy in the Empire Street 123?");
```

See [e2e.docs.test.ts](src/test/e2e.docs.test.ts) for a CV example.

## Updating entities

As with any CRUD service, you can update and delete entities. However, our update feature ensures that proprietary data and embeddings remain synchronized with every CRUD operation. This eliminates the hassle of updating data and embeddings separately.

```js
let updated = await farspeak.entity("rentals").update<MyEntityType>({
  id: doc.id,
  landlord: "New Name",
  start_date: "2024-01-01", // <-- add new props
});
// Now you can inquire the new changes since embeddings are up-to-date
```

See [e2e.crud.update.test.ts](src/test/e2e.crud.update.test.ts) for a Projects/Milestones example.

## Testing

Please have a look at [tests](src/test) to see how can you use Farspeak with Typescript.

## Changelog

1.1.0 - Added initial pdf support

1.0.0 - Initial release
