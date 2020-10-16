import { UserRequest } from '../../interfaces'
import { format } from './helpers/format'
import { crawlStoresData } from './crawlers/storeCrawler'

module.exports = async function crawl(userRequest: UserRequest) {
	const urls = format(userRequest)
	const storesData = await Promise.allSettled([
		...urls.urls.map(crawlStoresData),
	])

	return storesData.flat()
}

//  getSPAStores(urls.spaUrls),
