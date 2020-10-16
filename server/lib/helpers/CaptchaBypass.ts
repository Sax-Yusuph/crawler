import { Page } from 'puppeteer-extra/dist/puppeteer'

export const captchaOverride = async (page: Page) => {
	// await page.evaluateOnNewDocument(() => {
	// 	Object.defineProperty(navigator, 'webdriver', { get: () => false })
	// })

	let sliderElement = await page.$('.scale_text.slidetounlock')!
	let sliderHandle = await page.$('.nc_iconfont.btn_slide')

	if (sliderElement && sliderHandle) {
		let slider = await sliderElement.boundingBox()
		let handle = await sliderHandle.boundingBox()
		if (handle && slider) {
			await page.mouse.move(
				handle.x + handle.width / 2,
				handle.y + handle.height / 2
			)
			await page.mouse.down()
			await page.mouse.move(
				handle.x + slider.width,
				handle.y + handle.height / 2,
				{ steps: 50 }
			)
			await page.mouse.up()
		}
	} else {
		console.log('nocaptcha element found')
	}
}
