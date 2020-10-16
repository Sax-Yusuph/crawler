import * as cheerio from 'cheerio'
import { AliProducts, Product } from '../../interfaces'
import { ebay, jumia, kara, konga, slot } from '../selectors/selectors'
import { v4 as uuidv4 } from 'uuid'
import { getActualPrice } from './helpers/formatPrices'
import * as fs from 'fs'
import { JSHandle } from 'puppeteer'

/*****************************
 @STORE
 **********************************************/
export class StoreModel {
	$: CheerioStatic
	items: Cheerio
	_scrappedProducts: Product[] = []

	constructor(html: string) {
		this.$ = cheerio.load(html)
		this.items = this.$('')
	}

	get scrappedProducts() {
		return this._scrappedProducts
	}
}

/*****************************
 JUMIA
 **********************************************/

export class JumiaProducts extends StoreModel {
	constructor(html: string) {
		super(html)
		this.items = this.$(jumia.products)
	}

	get scrappedProducts() {
		let $ = this.$
		let scrappedProducts: Product[] = []

		this.items.each(async function (this: CheerioElement) {
			const productName = $(this).find(jumia.productName).text()
			const productLink = $(this).attr('href')
			const productStore = $(this).find(jumia.productStore!).text()
			const price = $(this).find(jumia.price).text()
			const officialBadge = $(this).find(jumia.officialBadge!).attr('src')
			const productAvailability = $(this)
				.find(jumia.productAvailability!)
				.text()
			const productImage = $(this).find(jumia.productImage!).attr('data-src')

			scrappedProducts.push({
				id: uuidv4(),
				websiteName: 'jumia',
				productName,
				productLink: `https://www.jumia.com.ng/${productLink}`,
				productImage,
				price,
				actualPrice: await getActualPrice(price),
				productStore,
				productAvailability,
				officialBadge,
			})
		})
		this._scrappedProducts = scrappedProducts
		return this._scrappedProducts
	}
}

/*****************************
 KONGA
 **********************************************/

export class KongaProducts extends StoreModel {
	html: string
	constructor(html: string) {
		super(html)
		this.items = this.$(konga.products)
		this.html = html
	}

	get scrappedProducts() {
		let $ = this.$
		let scrappedProducts: Product[] = []
		// testing the model function
		fs.writeFile('konga.html', this.html, err => {
			if (err) throw new Error('an error occured on konga')
			console.log('written konga to file')
		})

		this.items.each(async function (this: CheerioElement) {
			const productName = $(this).find(konga.productName).text()
			const productLink = $(this).find(konga.productLink).attr('href')
			const productStore = $(this).find(konga.productStore!).text()
			const price = $(this).find(konga.price).text()
			const officialBadge = $(this).find(konga.officialBadge!).attr('src')
			const productAvailability = $(this)
				.find(konga.productAvailability!)
				.text()
			const productImage = $(this)
				.find(konga.productImage!)
				.children()
				.first()
				.attr('data-srcset')

			scrappedProducts.push({
				id: uuidv4(),
				websiteName: 'konga',
				productName,
				productLink: `https://www.konga.com${productLink}`,
				productImage,
				price,
				actualPrice: await getActualPrice(price),
				productStore,
				productAvailability,
				officialBadge,
			})
		})
		this._scrappedProducts = scrappedProducts
		return this._scrappedProducts
	}
}

/*****************************
 SLOT NG
 **********************************************/

export class SlotProducts extends StoreModel {
	constructor(html: string) {
		super(html)
		this.items = this.$(slot.products)
	}

	get scrappedProducts() {
		let $ = this.$
		let scrappedProducts: Product[] = []
		this.items.each(async function (this: CheerioElement) {
			const productName = $(this).find(slot.productName).text()
			const productLink = $(this).find(slot.productLink).attr('href')!
			const price = $(this).find(slot.price).text()
			const productImage = $(this).find(slot.productImage!).attr('src')

			scrappedProducts.push({
				id: uuidv4(),
				websiteName: 'slot',
				productName,
				productLink,
				productImage,
				price,
				actualPrice: await getActualPrice(price),
			})
		})
		this._scrappedProducts = scrappedProducts
		return this._scrappedProducts
	}
}

/*****************************
 KARA NG
 **********************************************/

export class KaraProducts extends StoreModel {
	constructor(html: string) {
		super(html)
		this.items = this.$(kara.products)
	}

	get scrappedProducts() {
		let $ = this.$
		let scrappedProducts: Product[] = []
		this.items.each(async function (this: CheerioElement) {
			const productName = $(this).find(kara.productName).text()
			const productLink = $(this).find(kara.productLink).attr('href')!

			const price = $(this).find(kara.price).text()
			const productImage = $(this).find(kara.productImage!).attr('src')

			scrappedProducts.push({
				id: uuidv4(),
				websiteName: 'kara',
				productName,
				productLink,
				productImage,
				price,
				actualPrice: await getActualPrice(price),
			})
		})
		this._scrappedProducts = scrappedProducts
		return this._scrappedProducts
	}
}

/*****************************
 EBAY
 **********************************************/

export class EbayProducts extends StoreModel {
	constructor(html: string) {
		super(html)
		this.items = this.$(ebay.products)
	}

	get scrappedProducts() {
		let $ = this.$
		let scrappedProducts: Product[] = []
		this.items.each(async function (this: CheerioElement) {
			const productName = $(this).find(ebay.productName).text()
			const productLink = $(this).find(ebay.productLink).attr('href')!
			const price = $(this).find(ebay.price).text()

			const info = $(this).find(ebay.productAvailability!).text()
			const shipping = $(this).find(ebay.shipping!).text()
			const infoAlt = $(this).find(ebay.from!).text()
			const productImage = $(this).find(ebay.productImage!).attr('src')

			scrappedProducts.push({
				id: uuidv4(),
				websiteName: 'ebay',
				productName,
				productLink,
				productImage,
				productAvailability: info,
				shipping,
				from: infoAlt,
				price,
				actualPrice: await getActualPrice(price),
			})
		})
		this._scrappedProducts = scrappedProducts
		return this._scrappedProducts
	}
}

/*****************************
 ALIEXPRESS
 **********************************************/
export class AliProduct {
	_scrappedProducts: Product[] = []
	constructor(products: AliProducts[]) {
		products.forEach(async product => {
			this._scrappedProducts.push({
				id: uuidv4(),
				websiteName: 'ali express',
				productName: product.title,
				productLink: `https:${product.productDetailUrl.split('?')[0]}`,
				price: product.price,
				actualPrice: await getActualPrice(product.price),
				shipping: product.logisticsDesc,
				productAvailability: product.tradeDesc,
				productImage: `https:${product.imageUrl}`,
			})
		})
	}
	get scrappedProducts() {
		return this._scrappedProducts
	}
}
