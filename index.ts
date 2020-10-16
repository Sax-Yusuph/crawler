import express from 'express'
import dotenv from 'dotenv'
import formatUserString from './tests/test-formatRequest'
import helloworld from './tests/helloworld'
import getstores from './tests/test-getStores'
import getspaStores from './tests/test-spastores'

dotenv.config()

const app = express()

app.use('/', helloworld)
app.use('/format', formatUserString)
app.use('/getstores', getstores)
app.use('/getspastores', getspaStores)

app.listen(5000, () => {
	console.log('server started on port 5000')
})
