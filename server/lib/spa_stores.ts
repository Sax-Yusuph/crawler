import puppeteer from 'puppeteer-extra'
// import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

puppeteer.use(StealthPlugin())
import chromeOptions from './browserConfig/chromOptions'
import pageSettings from './browserConfig/pageSettings'

import crawlSPA from './crawlers/SpaCrawler'
import { Product } from '../../interfaces'

type IGetSpa = (Urls: string) => Promise<Product[][]>

const getSPAStores: IGetSpa = async Urls => {
	let data: Product[] = []
	const browser = await puppeteer.launch(chromeOptions)
	const context = await browser.createIncognitoBrowserContext()

	try {
		const page = await context.newPage()

		//  Page settings
		await pageSettings(page)

		// NAVIGATE TO THE PAGE VIA PUPPETEEER
		await page.goto(Urls, {
			waitUntil: 'networkidle2',
			timeout: 0,
		})
		console.log('scraping spa sites ---------------------')
		data = await crawlSPA(Urls.split('.')[1], page)

		await context.close()
		await browser.close()
	} catch (error) {
		console.log(error.message)
		await context.close()
		await browser.close()
		return error.message
	}
	// if (browser) await browser.close()
	return data
}

export default getSPAStores

// const getSPAStores: IGetSpa = async (Urls: string[]) => {
// 	try {
// 		const browser = await puppeteer.launch({
// 			headless: false,
// 			args: [
// 				// "--proxy-server=" + proxy,
// 				'--no-sandbox',
// 				'--disable-setuid-sandbox',
// 				'--disable-dev-shm-usage',
// 				'--disable-accelerated-2d-canvas',
// 				'--disable-gpu',
// 				'--window-size=1920x1080',
// 			],
// 		})
// 		if (browser) {
// 			const context = await browser.createIncognitoBrowserContext()
// 			let results = await Promise.allSettled(
// 				Urls.map(async url => {
// 					try {
// 						const page = await context.newPage()
// 						//  Page settings
// 						await pageSettings(page)
// 						// NAVIGATE TO THE PAGE VIA PUPPETEEER
// 						await page.goto(url, {
// 							waitUntil: 'domcontentloaded',
// 							timeout: 0,
// 						})
// 						console.log('scraping spa sites ---------------------')
// 						return scrapSPA(url.split('.')[1], page)
// 					} catch (error) {
// 						if (error) throw new Error('puppeteer failed to work')
// 						console.error(error.message)
// 						return error.message
// 					}
// 				})
// 			)
// 			await context.close()
// 			console.log('done bro! 👍 👍 ')
// 			return results
// 		} else {
// 			console.log('issue launching puppeteer')
// 		}
// 	} catch (error) {
// 		if (error) throw new Error('oops this might be a puppeteer issue bro!')
// 		console.log(error.message)
// 		return error.message
// 	}
// }

// export default getSPAStores
