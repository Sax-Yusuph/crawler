// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//

// import User from 'path/to/interfaces';
export type availableStores =
	| 'Konga'
	| 'Jumia'
	| 'AliExpress'
	| 'Kara'
	| 'Ebay'
	| 'Slot'

export type User = {
	id: number
	name: string
}

export interface UserRequest {
	item: string
	urls: string[]
}

export interface Selector {
	products?: string
	productName: string
	productLink: string
	productImage?: string
	price: string
	productStore?: string
	productAvailability?: string
	officialBadge?: string
	shipping?: string
	from?: string
}

export interface Product extends Selector {
	id?: string
	websiteName: string
	actualPrice: {
		value: number
		dollarPrice: number
		currency: string
	}
}

export type TrendingProduct = {
	id: number
	website: string
	tag: string
	imgSrc: string
	title: string
	link: string
	price: string
	description: string
}

export type FeaturedProduct = {
	image: string
	tag: string
	description: string
	title: string
	id: number
}
export type CheapProduct = {
	website: string
	tag: string
	id: number
	imgSrc: string
	title: string
	link: string
	price: string
	description: string
}

export type GlobalProduct = FeaturedProduct | CheapProduct | TrendingProduct
export type GlobalProducts = GlobalProduct[]

export type BlockedResourceTypes = string[]
export type SkippedResources = string[]

export interface AliProducts {
	imageWidth: number
	productId: number
	saleMode: string
	discount: number
	store: {
		storeUrl: string
		aliMemberId: number
		storeName: string
		storeId: number
	}
	title: string
	tradeDesc: string
	saleUnit: string
	imageHeight: number
	logisticsDesc: string
	tags: {}
	productDetailUrl: string
	traceInfo: {
		displayCategoryId: string
		algo_pvid: string
		postCategoryId: string
		ownerMemberId: string
		algo_expid: string
	}
	price: string
	imageUrl: string
	starRating: string
	productType: string
}
