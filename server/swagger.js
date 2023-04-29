import swaggerAutogen from 'swagger-autogen'
const autogen = swaggerAutogen()
const outputFile = './swagger_output.json'
const endpointsFiles = ['./routes/index.js']

autogen(outputFile, endpointsFiles).then(async () => {
  await import('./index.js');
})