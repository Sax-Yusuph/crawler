import proxies from '../../../utils/proxy.json'

const rand = Math.floor(Math.random() * proxies.length)
const proxy = proxies[rand]
console.log({ proxy_in_use: proxy })

//@TODOS
//ALWAYS FETCH PROXIES FROM DATABASE -- CLOUD DATASTORE OR CLOUD STORAGE
const chromeOptions: any = {
	headless: false,
	slowMo: 1200,
	args: [
		// `--proxy-server=https://${proxy.ip_address}:${proxy.port_number}`,
		'--no-sandbox',
		'--disable-setuid-sandbox',
		'--disable-dev-shm-usage',
		'--disable-accelerated-2d-canvas',
		'--disable-gpu',
		'--window-size=1920x1080',
	],
}

export default chromeOptions
