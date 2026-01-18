const fs = require('fs');
const swagger = require('../src/output-swagger.json');

const isProd = process.env.NODE_ENV === 'production';

swagger.host = isProd
  ? 'inovax.cloud'
  : 'localhost:3000';

swagger.basePath = isProd
  ? '/api'
  : '/api';

swagger.schemes = isProd ? ['https'] : ['http'];

fs.writeFileSync(
  './src/output-swagger.json',
  JSON.stringify(swagger, null, 2)
);

console.log(`Swagger host set to: ${swagger.host}`);
console.log(`Swagger basePath set to: ${swagger.basePath}`);
console.log(`Swagger schemes set to: ${swagger.schemes}`);