import { AliProducts, Product } from '../../../interfaces'
import { AliProduct, KongaProducts } from '../models'
import { konga } from '../../selectors/selectors'
import { Page } from 'puppeteer-extra/dist/puppeteer'
import { captchaOverride } from '../helpers/CaptchaBypass'

// interface myWindow extends Window {
// 	runParams?: { items: AliProducts[] }
// }
declare var window: any

type IScrapSpa = (url: string, page: Page) => Promise<Product[]>

const crawlSPA: IScrapSpa = async (url, page) => {
	let data: Product[] = []
	console.log(url)
	console.log('about to crawl page')
	try {
		await page.setDefaultTimeout(0)
		switch (url) {
			case 'konga':
				await page.waitForSelector(konga.products!)
				let html = await page.content()
				if (html) {
					const results = new KongaProducts(html)
					console.log(results.scrappedProducts)
					data = results.scrappedProducts
				}
			case 'aliexpress':
				// BYPASS ALIEXPRESS SLIDER CAPTCHA
				await captchaOverride(page)
				await page.waitForNavigation({ timeout: 0, waitUntil: 'networkidle2' })
				return await page.evaluate(() => {
					console.log('scrapped ali express')
					const products: AliProducts[] = window.runParams?.items
					console.log(products)
					console.log('reached ali express but cant scrape products')
					try {
						const results = new AliProduct(products!)
						console.log('Jumia products have been scrapped!!!')
						return results.scrappedProducts
					} catch (error) {
						if (error)
							// throw new Error('issue getting result from jumia model')
							console.log(error.message)
						return error.message
					}
				})
		}
		return data
	} catch (error) {
		// if (error) throw new Error()
		console.log(error.message)
		return error.message
	}
}

export default crawlSPA
