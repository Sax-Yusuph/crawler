import { Selector } from '../../interfaces'

export const konga: Selector = {
	products: '.a2cf5_2S5q5.cf5dc_3HhOq',
	productName: '._4941f_1HCZm > a > .af885_1iPzH > h3',
	productLink: '._4941f_1HCZm > a',
	productStore: '._4941f_1HCZm > form > ._7cc7b_23GsY',
	price: '._4e81a_39Ehs > .d7c0f_sJAqi',
	officialBadge: '.top-badge > img',
	productAvailability: '._4941f_1HCZm > form > ._09e22_1ojNd',
	productImage: '._7e903_3FsI6 > a > picture',
}

export const jumia: Selector = {
	products: 'a[class=core]',
	productName: '.info > .name',
	productLink: '',
	productStore: '.shop-logo > span',
	price: '.info > .prc',
	officialBadge: '.top-badge > img',
	productAvailability: '.info > .tag',
	productImage: '.img-c > img',
}

export const slot: Selector = {
	products: '.product-inner',
	productName: '.mf-product-content > h2',
	productLink: '.mf-product-thumbnail > a',
	productStore: '',
	price: '.mf-product-price-box> .price > .woocommerce-Price-amount.amount',
	officialBadge: '',
	productAvailability: '',
	productImage: '.mf-product-thumbnail > a > img',
}

export const kara: Selector = {
	products: '.product-item-info',
	productName: '.product-item-name > a',
	productLink: '.product-item-name > a',
	productStore: '',
	price: ".price-wrapper[data-price-type='finalPrice']",
	officialBadge: '',
	productAvailability: '',
	productImage: 'img.product-image-photo',
}
export const ebay: Selector = {
	products: '.s-item__wrapper',
	productName: '.s-item__title',
	productLink: '.s-item__info > a',
	productStore: '',
	price: '.s-item__detail--primary > .s-item__price',
	officialBadge: '',
	productAvailability: '.s-item__subtitle > .SECONDARY_INFO',
	shipping: '.s-item__detail--primary > .s-item__logisticsCost',
	productImage: '.s-item__image-wrapper > img',
	from: '.s-item__detail--secondary > span ',
}
