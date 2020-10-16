import { Page } from 'puppeteer-extra/dist/puppeteer'
import resource from '../../../utils/resource.json'

const pageSettings = async (page: Page) => {
	// PAGE SETTINGS ***************************************
	try {
		if (page) {
			await page.setRequestInterception(true)
			page.on('request', request => {
				const requestUrl = request.url().split('?')[0].split('#')[0]
				if (
					resource.blockedResourceTypes.indexOf(request.resourceType()) !==
						-1 ||
					resource.skippedResources.some(
						resource => requestUrl.indexOf(resource) !== -1
					)
				) {
					request.abort()
					// console.log(`blocked ----- ${requestUrl}`)
				} else {
					console.log('allowing requests ------------------------')
					console.log(requestUrl)
					request.continue()
					console.log('finished allowing requests ------------------------')
				}
			})
		}
	} catch (error) {
		if (error) throw new Error('Page isnt defined yet bro')
		console.log(error.message)
	}
}

export default pageSettings
