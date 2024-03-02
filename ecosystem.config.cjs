module.exports = {
  apps: [
    {
      name: 'WealthWars',
      port: '80',
      exec_mode: 'cluster',
      instances: 'max',
      script: './.output/server/index.mjs'
    }
  ]
}
