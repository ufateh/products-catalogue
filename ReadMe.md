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

going to install random srings to generate data,
npm install randomstring
npm install @types/randomstring
-------------------------------------------------------
