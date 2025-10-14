module.exports = {
  apps: [
    {
      name: 'catastro-api',
      script: './dist/src/main.js',
      instances: 'max', // Use the maximum number of instances available
      exec_mode: 'cluster', // Use cluster mode for load balancing
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
