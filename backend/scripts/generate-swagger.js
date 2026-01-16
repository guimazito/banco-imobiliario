const fs = require('fs');
const swagger = require('../dist/src/output-swagger.json');

const isProd = process.env.NODE_ENV === 'production';

swagger.host = isProd
  ? 'inovax.cloud'
  : 'localhost:3000';

swagger.basePath = isProd
  ? '/api'
  : '/api';

swagger.schemes = isProd ? ['https'] : ['http'];

fs.writeFileSync(
  './dist/src/output-swagger.json',
  JSON.stringify(swagger, null, 2)
);

console.log(`Swagger host set to: ${swagger.host}`);