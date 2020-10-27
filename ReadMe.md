# Simple Express app with retreival of documents from mongo.

## How to Run:

> checkout project, then perform below commands in terminal on root level folder:

>`npm install`

>`npm start`

    Import postman collections into your postman, and execute the saved requests for test.

> This is a demonstration of mongodb data retreive, a seed funciton has been added in server.ts to randomly populate data in mongo. A clould instance of mongo has been used. Sample data has already been generated.

> Query param is only supported on get products call. To create a query, you can visit https://www.npmjs.com/package/api-query-params

---

    Please ignore below text

```
Going to create a sample nodeJs application, which will connect to a clould mongodb instance, and store and fetch products and product categories.

Target APIs to be created:

1: Fetch products based on request query.
2: List of products
3: Product categories list



Steps executed:
npm init
npm install mongodb express
npm install ts-node-dev -D
npm install typescript -D
npm instal @types/mongodb @types/express
npx tsc --init

tsconfig file settings, set up the src and output directory in tsconfig.json

updated the scripts in package.json
created src folder, and server.ts file in it
tested the server.ts with a simple console output.

installing mongoose to take care of the document schema

npm i mongoose
npm i @types/mongoose -D

going to install below to generate data,
npm i chance
npm install @types/chance
npm i body-parser
npm i --save api-query-params
npm install mongoose-slug-generator --save

```
