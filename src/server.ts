import { app } from './app'
import { startDatabase } from './database/connection'

app.listen(Number(process.env.PORT_API), () => {
  startDatabase(), console.log('Sever running')
})
