const fs = require('fs');
const swagger = require('../src/output-swagger.json');

const isProd = process.env.NODE_ENV === 'production';

swagger.host = isProd
  ? 'srv1157706.hstgr.cloud'
  : 'localhost:3000';

swagger.schemes = isProd ? ['http'] : ['http'];

fs.writeFileSync(
  './src/output-swagger.json',
  JSON.stringify(swagger, null, 2)
);

console.log(`Swagger host set to: ${swagger.host}`);