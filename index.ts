import createServer from './src/infra/webserver'

const start = async (): Promise<void> => {
  try {
    const serverPort = await createServer()
    console.log(`Server running at http://localhost:${serverPort}`)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

start()
