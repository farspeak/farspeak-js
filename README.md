# Farspeak JS/TS

Our service allows you to store and process both structured and unstructured data in a unified database format. Whether you're handling JSON objects, PDFs, or other document types, our npm package ensures all data is transformed and stored both as JSON entities and their vector embedding representations, always in-sync.

The interface for processing documents is similar to standard CRUD operations, making it easy to integrate. Regardless of whether you're storing traditional entities or processing documents, the outcome is the same: data is seamlessly written to the Farspeak database. This integration allows you to query all your data using natural language immediately, with structured and unstructured data coexisting harmoniously in a single database.

This is our early release, so stay tuned for much more to come!

## Installation

Farspeak supports both ESM and CommonJS modules, allowing you to integrate it seamlessly into your projects using either module system and you can use it with npm, yarn, bun, etc.

Farspeak supports Node version 18 or above.

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

If you're using `import` you should add "type": "module" to package.json.

Go to the [dashboard](https://dashboard.farspeak.ai) and create your first app. Conveniently, environment called "dev" and a backend token will be automatically created for you. But you can rename all of it.

Instantiate the farspeak variable:

```ts
const farspeak = new Farspeak({
  app: "your-app", // your app name
  env: "dev", // your app env
  backendToken: "43t8q1bc2eggnc", // paste your backend token
});
```

| :warning: | Never expose the backend token in the frontend code, as it will be visible and unprotected in the browser. |
| --------- | :--------------------------------------------------------------------------------------------------------- |

### Use your Atlas database for RAG

To do vector search on your data you need to created a database in your Atlas and `entities` collection within.

Since version 1.2 there's an option to use your own db. It works with public key and secret key.

```ts
const farspeak = new Farspeak({
  app: "your-app", // your app name
  env: "dev", // your app env
  backendToken: "43t8q1bc2eggnc", // paste your backend token
  publicKey: "fs-pub-...",
  secretKey: "fs-...",
  vectorIndexName: "...",
});
```

To create public key and secret key please follow the instructions in the dashboard.

Add your Atlas url in the Settings page in the dashboard:

<img width="435" alt="image" src="https://github.com/farspeak/farspeak-js/assets/170480/720d6d56-b584-45f9-9eb0-037d50f53270">

Now when you send CRUD and docs/unstructured data requests, the entities will be stored in your database in the `entities` collection you created, together with the embeddings.

Please follow instructions how to create vector search index for your database on our [wiki page](https://github.com/farspeak/farspeak-js/wiki/Create-Vector-Search-Index-in-Atlas).

To use RAG with Farspeak you will need your vector index you just created in your Atlas account, and pass it as an argument called `vectorIndexName` to the Farspeak instance, as shown above.

## Getting started

Let's write our first entities. Prepare some data that you'll import:

```ts
// seed.js
const todos = [
  {
    task: "Finish report",
    priority: "high",
    completed: false,
  },
  {
    task: "Buy groceries",
    completed: false,
  },
  {
    task: "Call mom",
    completed: false,
  },
];
```

Writing entities is done using `.write` command, for example using `todos` entity:

```js
farspeak.entity("todos").write(todos).then(console.log); // get the ids
```

Or with async/await:

```js
(async () => {
  const ids = await farspeak.entity("todos").write(todos);
})();
```

Let's make a sample inquiry using `.inquire` method, useful for RAG applications:

```ts
farspeak
  .entity("todos")
  .inquire("Which todo has highest priority?")
  .then(console.log);

// Or
const { answer } = await farspeak
  .entity("todos")
  .inquire("Which todo has highest priority?");
```

The response returned from `.inquire` has following definition:

```js
{
  answer: "Finishing report has highest priority.";
}
```

## Working with documents

Currently Farspeak supports PDFs, but more will come soon. Also, as of now you can only send one document at a time.

The interface works similarly to sending entities, but processing documents results in entities being written to the Farspeak database in exactly the same way.

Prepare your type and instructions for parsing:

```js
const filePath = "./path/to/fake.pdf";
const instructions = "This is a Rental agreement";
const template = {
  full_name: "This is full name of the tenant",
  landlord: "This is full name of the landlord",
  location:
    "Location of the apartment, including street name and number, country and city",
  email: "This is email of the landlord",
  paragraphs: `List of paragraphs in the contract`,
};

(async () => {
  const doc = await farspeak
    .entity("rentals")
    .fromDocument({ filePath, instructions, template });
  console.log({ doc });

  // Finally, check if this entity exists:
  const entity = await farspeak.entity("rentals").get(doc.id);
  console.log({ entity });
})();
```

You can also use `.getAll` to read first 10 entities (default value for paginated response):

```ts
const result = await farspeak.entity("rentals").getAll();
```

### Working with remote documents

When loading remote PDF files we use `fromRemoteDocument` method instead:

```js
const filePathRemote = "https://myserver.com/files/contract002.pdf";
const doc = await farspeak
  .entity("rentals")
  .fromRemoteDocument({ url: filePathRemote, instructions, template });
```

See [e2e.docs-remote.test.ts](src/test/e2e.docs-remote.test.ts) as an example.

### Working with directories

To load directory we use `fromDirectory` method. It receives `recursive` argument if you want to load nested directories.

```js
const directoryPath = "./src/test/demo";
const doc = await farspeak
  .entity("cvs")
  .fromDirectory({ directoryPath, instructions, template, recursive: true });
```

See [e2e.docs-dir.test.ts](src/test/e2e.docs-dir.test.ts) as an example.

## Generics

Methods in Farspeak can be typed using generics, lile `.get<MyType>(id)`. Let's see how can we modify previous example in Typescript:

```ts
// Define your model
type Rental = {
  full_name: string;
  landlord: string;
  location: string;
  email: string;
  phone: string;
  paragraphs: string[];
};

// Make sure the return value has the same type
const entity = await farspeak.entity("rentals").get<Rental>(doc.id);

// Get all entities:
const result = await farspeak.entity("rentals").getAll<Rental, "rentals">();
console.log(result.rentals.length); // your IDE should recognize `rentals` prop
```

Note: Please create your own `Rental` type so that it can work with Typescript matching your own specifications.

The more specific you are about your requirements, the better the results will be. While a general list of paragraphs can work, it's not ideal. For the best outcome, clearly specify what you need, such as providing a list of amenities as an array of strings.

Now you can query your entities:

```ts
// In Javascript using .then
farspeak
  .entity("rentals")
  .inquire("What is cancellation policy in the Empire Street 123?")
  .then(console.log);

// In Typescript
const inquire = await farspeak
  .entity("rentals")
  .inquire("What is cancellation policy in the Empire Street 123?");
```

See [e2e.docs.test.ts](src/test/e2e.docs.test.ts) for a CV example.

## Updating entities

As with any CRUD service, you can update and delete entities. However, our update feature ensures that proprietary data and embeddings remain synchronized with every CRUD operation. This eliminates the hassle of updating data and embeddings separately.

```ts
// In Javascript using .then
farspeak
  .entity("rentals")
  .update({
    id: doc.id,
    landlord: "New Name",
    start_date: "2024-01-01",
  })
  .then(console.log);

// In Typescript
const updated = await farspeak.entity("rentals").update<Rental>({
  id: doc.id,
  landlord: "New Name", // update existing prop
  start_date: "2024-01-01", // <-- you can add new props
});
// Now you can inquire the new changes since embeddings are up-to-date
```

See [e2e.crud.update.test.ts](src/test/e2e.crud.update.test.ts) for a Projects/Milestones example.

## Testing

To avoid hassle with ts-node and Typescript, I used Bun to run all my .ts files for e2e tests.

To install Bun follow the instructions on [Bun](https://bun.sh/) home page.

Please have a look at [tests](src/test) to see how can you use Farspeak with Typescript.

## Limitations

1. As we are currently in the early (beta) stage, Farspeak is limited to 1000 entities and their vectors per account.
2. Currently file size to process is 1mb max.
