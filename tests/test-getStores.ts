import * as express from 'express'
import { format } from '../server/lib/helpers/format'
import { crawlStoresData } from '../server/lib/crawlers/storeCrawler'
const router = express.Router()

const defaultUserRequest = {
	item: 'infinix hot 8',
	urls: ['Konga', 'Jumia', 'AliExpress', 'Kara', 'Ebay', 'Slot'],
}

export default router.get('/', async (req, res) => {
	const request = format(defaultUserRequest)
	try {
		const data = await Promise.all([...request.urls.map(crawlStoresData)])
		const storesData = data.flat().filter(d => d.price !== '')
		res.json(storesData)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
})
