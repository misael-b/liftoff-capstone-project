module.exports = {
    async redirects() {
      return [
        {
          source: '/',
          destination: 'http://localhost:3000/',
          permanent: true,
        },
      ]
    },
  }