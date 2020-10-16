import axios from 'axios'
import { Product } from '../../../interfaces'
import {
	EbayProducts,
	JumiaProducts,
	KaraProducts,
	SlotProducts,
} from '../models'

type FetchStores = (a: string) => Promise<Product[]>

export const crawlStoresData: FetchStores = async (URL: string) => {
	try {
		const response = await axios.get(URL)
		const uri = URL.split('.')[1].includes('ng/?s=')
			? 'slot'
			: URL.split('.')[1]
		switch (uri) {
			case 'jumia':
				console.log('reached jumia website')
				return new JumiaProducts(response.data).scrappedProducts
			case 'ebay':
				console.log('reached ebay website')
				return new EbayProducts(response.data).scrappedProducts
			case 'slot':
				console.log('reached slot website')
				return new SlotProducts(response.data).scrappedProducts
			case 'kara':
				console.log('reached kara website')
				return new KaraProducts(response.data).scrappedProducts
		}
	} catch (error) {
		console.log(error.message)
		return error.message
	}
}
