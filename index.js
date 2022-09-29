const {createServer} = require('@lhci/server')
require('dotenv').config()

console.log('Starting server...')
createServer({
  port: process.env.PORT,
  basicAuth: {
    "username": process.env.USERNAME,
    "password": process.env.PASSWORD
  },
  psiCollectCron: {
    psiApiKey: process.env.PSI_API_KEY,
    sites: [
      {
        label: 'Production',
        projectSlug: 'Tellustek',
        schedule: '0 * * * *', // at the top of the hour, every hour
        numberOfRuns: 3,
        urls: ['https://www.tellustek.com', 'https://www.tellustek.com/web-design'],
      }
    ],
  },
  storage: {
    storageMethod: 'sql',
    sqlDialect: 'sqlite',
    sqlDatabasePath: './db.sql',
  },
}).then(({port}) => console.log('LHCI listening on port', port))