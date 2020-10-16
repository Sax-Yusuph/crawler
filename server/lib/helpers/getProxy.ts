import axios from 'axios'
import * as cheerio from 'cheerio'

interface ProxyProps {
	ip_address: string
	port_number: string
	annonymity: string
}

export async function proxyGenerator() {
	let proxies: ProxyProps[] = []

	try {
		const response = await axios('https://sslproxies.org/')
		if (response.status == 200) {
			const $ = cheerio.load(response.data)
			const row = $('tbody tr')

			row.each(function (this: CheerioElement) {
				proxies.push({
					ip_address: $(this).find('td:nth-child(1)').text(),
					port_number: $(this).find('td:nth-child(2)').text(),
					annonymity: $(this).find('td:nth-child(5)').text(),
				})
			})
		} else {
			throw new Error('Error loading proxy, please try again')
		}

		const eliteProxies = proxies.filter(
			proxy => proxy.annonymity === 'elite proxy'
		)

		return eliteProxies
	} catch (error) {
		console.log(error.message)
		return error.message
	}
}
