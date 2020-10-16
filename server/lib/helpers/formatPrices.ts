import axios from 'axios'
import { Product } from '../../../interfaces'
import { LocalStorage } from 'node-localstorage'

global.localStorage = new LocalStorage('./scratch')
//************************ Types definition*/

type GetActualPrice = (
	price: string
) => Promise<{
	value: number
	dollarPrice: number
	currency: string
}>

type IConvert = (price: number) => Promise<number>

//************************ Get Prices */
export const getPrices = (data: Product[]) => {
	return data.map(item => item.actualPrice.value)
}

//************************ Get Highest Price */
export const getHigestPrice = (prices: any) => {
	return prices.reduce((a: number, b: number) => Math.max(a, b))
}
//************************ Get Lowest Price */
export const getLowestPrice = (prices: any) => {
	return prices.reduce((a: number, b: number) => Math.min(a, b))
}
//************************Get Average Price */
export const getAveragePrice = (prices: any) => {
	const totalPrice = prices.reduce((a: number, b: number) => a + b)
	return totalPrice / prices.length
}

//************************ change Price String to Number */

export const getActualPrice: GetActualPrice = async price => {
	// if (!price) return
	const str = price.split('-')[0].split('.')[0].match(/\d+/g)!
	if (str && price.includes('₦')) {
		const nairaPrice = parseFloat(str.join(''))
		const dollar = await convertToDollar(nairaPrice)
		return {
			value: nairaPrice,
			dollarPrice: Math.floor(dollar),
			currency: '₦',
		}
	} else if (str && price.includes('$')) {
		const dollarPrice = parseFloat(str.join(''))
		const NairaPrice = await convertToNaira(dollarPrice)
		return {
			value: Math.floor(NairaPrice),
			dollarPrice,
			currency: '$',
		}
	} else {
		return {
			value: 0, //parseFloat(str.join('')),
			dollarPrice: 0, //parseFloat(str.join('')),
			currency: '',
		}
	}
}

interface Irate {
	USD: number
	NGN: number
}
interface IData {
	rates: Irate
}

//**@GET DOLLAR RATE *************************/
const getDollarRate = async () => {
	let currencyRate: Irate

	try {
		//@TODOS
		// @desc FETCH RESULTS IN CLOUD STORAGE OR CLOUD FIRESTORE
		const item = localStorage.getItem('price_track_currency_rate')
		const cur_Rate: Irate = JSON.parse(item!)
		if (Object.entries(cur_Rate).length !== 0 && item) {
			// console.log('true: using the value in localstorage')
			currencyRate = cur_Rate
		} else {
			const res = await axios.get(
				`http://data.fixer.io/api/latest?access_key=${process.env.FIXER_API_ACCESS_KEY}&base=EUR&symbols=NGN,USD`
			)
			console.log(res.data)
			const { rates }: IData = res.data
			currencyRate = { ...rates }
			localStorage.setItem(
				'price_track_currency_rate',
				JSON.stringify(currencyRate)
			)
		}
		const cr = (currencyRate.NGN * 100) / (currencyRate.USD * 100)
		// console.log(cr)
		return cr
	} catch (error) {
		console.log(error.message)
		return error.message
	}
}

//************************ Convert to Naira */
const convertToNaira: IConvert = async (dollarPrice: number) => {
	try {
		const rate: number = await getDollarRate()
		if (rate) {
			return dollarPrice * rate
		} else {
			return dollarPrice
		}
	} catch (error) {
		console.log(error.message)
		return error.message
	}
}
//************************ Convert to Dollar */
const convertToDollar: IConvert = async (nairaPrice: number) => {
	try {
		const rate = await getDollarRate()
		if (rate) {
			return nairaPrice / rate
		} else {
			return nairaPrice
		}
	} catch (error) {
		console.log(error)
		return error.message
	}
}
