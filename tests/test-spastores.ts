import * as express from 'express'
import { format } from '../server/lib/helpers/format'
import getSPAStores from '../server/lib/spa_stores'
import { crawlStoresData } from '../server/lib/crawlers/storeCrawler'
const router = express.Router()

const defaultUserRequest = {
	item: 'infinix hot 8',
	urls: ['Konga', 'Jumia', 'AliExpress', 'Kara', 'Ebay', 'Slot'],
}

export default router.get('/', async (req, res) => {
	const request = format(defaultUserRequest)
	try {
		const data = await getSPAStores(request.spaUrls[0])
		if (data) {
			const storesData = data.flat().filter(d => d.price !== '')
			if (storesData) res.json(storesData)
		} else {
			res.json([])
		}

		// const storesData = await Promise.all([...request.urls.map(fetchStoresData)])
		// res.send('ready to get spa results')
	} catch (error) {
		console.log(error.message)
		res.json({ error: error.message })
	}
})
