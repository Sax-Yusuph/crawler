const fs = require('fs')
const puppeteer = require('puppeteer')

const userRequest = {
	item: 'iphone 6s',
	jumia: false,
	konga: false,
	Ebay: false,
	Slot: false,
	Ali: true,
}

const blockedResourceTypes = [
	'image',
	'media',
	'stylesheet',
	'font',
	'texttrack',
	'object',
	'beacon',
	'csp_report',
	'imageset',
]

const skippedResources = [
	'quantserve',
	'adzerk',
	'doubleclick',
	'adition',
	'exelator',
	'sharethrough',
	'fullstory',
	'cdn.api.twitter',
	'analytics.twitter.com',
	'static.ads-twitter.com',
	'google-analytics',
	'googletagmanager',
	'google',
	'fontawesome',
	'facebook',
	'analytics',
	'optimizely',
	'clicktale',
	'mixpanel',
	'zedo',
	'clicksor',
	'tiqcdn',
	'b9zcrrrvom',
	'cloudflare',
	'cdn-cgi',
	'chunks',
	'commons',
	'webpack',
	'runtime',
	'_next/static/',
	'tmall',
	'retcode',
	'mpulse.net',
	'alilog',
	'cobra',
	'setCommonCookie',
	'lighthouse',
	'lighthouse.config',
	'messageUnreadCountAjaxService',
	'header-ui',
	'vendors.js',
	'home.js',
	'alicdn',
	'standalone',
]
const scrapSite = async userRequest => {
	const browser = await puppeteer.launch({
		headless: false,
		args: [
			// "--proxy-server=" + proxy,
			'--no-sandbox',
			'--disable-setuid-sandbox',
			'--disable-dev-shm-usage',
			'--disable-accelerated-2d-canvas',
			'--disable-gpu',
			'--window-size=1920x1080',
		],
	})
	const page = await browser.newPage()
	await page.setRequestInterception(true)
	// await page.setUserAgent(userAgent);

	// PAGE SETTINGS ***************************************
	page.on('request', request => {
		const requestUrl = request._url.split('?')[0].split('#')[0]
		if (
			blockedResourceTypes.indexOf(request.resourceType()) !== -1 ||
			skippedResources.some(resource => requestUrl.indexOf(resource) !== -1)
		) {
			request.abort()
		} else {
			console.log(requestUrl)
			request.continue()
		}
	})

	let queryString = userRequest.item.replace(/\s/g, '+')
	let url = `https://www.aliexpress.com/wholesale?SearchText=${queryString}`

	try {
		// NAVIGATE TO THE PAGE VIA PUPPETEEER
		await page.goto(url, { waitUntil: 'networkidle2', timeout: 0 })
		// const html = await page.content()
		const data = await page.evaluate(() => {
			const products = window.runParams.items
			const ScrapedData = products.map(product => {
				return {
					productName: product.title,
					productLink: `https:${product.productDetailUrl.split('?')[0]}`,
					newPrice: product.price,
					pickUp: product.logisticsDesc,
					productAvailability: product.tradeDesc,
					productImage: `https:${product.imageUrl}`,
				}
			})
			return ScrapedData
		})

		console.log(`${data.length} results`)
		console.log(
			`.....................................................................\n........................................................`
		)
		console.log(data)

		fs.writeFile('./aliData.json', JSON.stringify(data, null, 3), err => {
			if (err) throw err
			console.log('done successfully')
		})

		// fs.writeFile('aliexpress.html', html, (err) => {
		//   if (err) throw new err()
		//   console.log('done successfully!')
		// })
	} catch (error) {
		console.log(error.message)
	}

	await browser.close()
}

// scrapSite(userRequest)
