const fs = require('fs');
const swagger = require('../dist/src/output-swagger.json');

const isProd = process.env.NODE_ENV === 'production';

swagger.host = isProd
  ? 'inovax.cloud:3000'
  : 'localhost:3000';

swagger.schemes = isProd ? ['http'] : ['http'];

fs.writeFileSync(
  './dist/src/output-swagger.json',
  JSON.stringify(swagger, null, 2)
);

console.log(`Swagger host set to: ${swagger.host}`);