import * as express from 'express'
import { format } from '../server/lib/helpers/format'
const router = express.Router()

const defaultUserRequest = {
	item: 'infinix hot 8',
	urls: ['Konga', 'Jumia', 'AliExpress', 'Kara', 'Ebay', 'Slot'],
}
export default router.get('/', (req, res) => {
	const request = format(defaultUserRequest)
	res.json(request)
})
