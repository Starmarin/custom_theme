// Override Settings
var boostPFSInstantSearchConfig = {
	search: {
		suggestionWidth: 'fullwidth',
		suggestionStyle: 'style2',
		suggestionMobileStyle: 'style2',
	}
};

(function() {
	BoostPFS.inject(this);

	// Customize style of Suggestion box
	SearchInput.prototype.customizeInstantSearch = function() {
		var suggestionElement = this.$uiMenuElement;
		var searchElement = this.$element;
		var searchBoxId = this.id;
	};
  
  
  	/* CUSTOMIZE COLLECTION */
    InstantSearchResultItemCollection.prototype.getTemplate = function() {
      return `
			<li class="{{class.searchSuggestionItem}} {{class.searchUiAutocompleteItem}} flex items-center" aria-label="{{escapedBlockType}}: {{escapedDataTitle}}">
				<a href="{{searchLink}}">
					{{featuredImage}}
					{{highlightedSuggestionResult}}
				</a>
			</li>
		`;
    }
    
    InstantSearchResultItemCollection.prototype.compileTemplate = function() {
      if (!this.isShow) {
              return '';
			}
			this.searchTerm = Utils.escape(Globals.currentTerm);
			var searchLink = Utils.reBuildUrlBaseOnLocale('/collections/' + this.data.handle);
			var highlightedSuggestionResult = this._highlightSuggestionResult(this.data.title, this.searchTerm);
			var parentType = Utils.escape(this.parent.type);
			var title = Utils.escape(this.data.title);
			var id = Utils.escape(this.data.id);
			let collectionImg = "https://cdn.shopify.com/s/files/1/0070/5698/2143/files/superstar-new-" + this.data.handle + ".png";
			function imageExists(image_url){
				var http = new XMLHttpRequest();
				http.open('HEAD', image_url, false);
				http.send();
				return http.status;
			}

			let collectionImage = imageExists(collectionImg) != 404 ? collectionImg : "https://cdn.shopify.com/s/files/1/0070/5698/2143/files/superstar-" + this.data.handle + ".png"; 

			if (imageExists(collectionImage) != 404) {
				var imageURL = collectionImage;
				var featuredImage = "<img class='w-10 h-10 object-contain min-w-e40 min-h-e40 mr-1 rounded-full' src='" + imageURL + "' />";					
			} else {
				var featuredImage = "";
			}
	
			return this.getTemplate()
				.replace(/{{escapedBlockType}}/g, parentType)
				.replace(/{{escapedDataTitle}}/g, title)
				.replace(/{{escapedDataId}}/g, id)
				.replace(/{{class.searchSuggestionItem}}/g, Class.searchSuggestionItem)
				.replace(/{{class.searchUiAutocompleteItem}}/g, Class.searchUiAutocompleteItem)
				.replace(/{{searchLink}}/g, searchLink)
				.replace(/{{highlightedSuggestionResult}}/g, highlightedSuggestionResult)
				.replace(/{{featuredImage}}/g, featuredImage);
}
    
    /* CUSTOMIZE PRODUCT */    
    InstantSearchResultItemProduct.prototype.getTemplate = function(tempType) {
		switch (tempType) {
			case InstantSearchResultItemProduct.tempType.IMAGE:
				return `
					<div class="{{class.searchSuggestion}}-left">
						<img src="{{imageUrl}}" alt="{{escapedTitle}}">
					</div>
				`;
			case InstantSearchResultItemProduct.tempType.SKU:
				return `
					<p class="{{class.searchSuggestion}}-product-sku">SKU: {{sku}}</p>
				`;
			case InstantSearchResultItemProduct.tempType.VENDOR:
				return `
					<p class="{{class.searchSuggestion}}-product-vendor">{{vendor}}</p>
				`;
			case InstantSearchResultItemProduct.tempType.PRICE:
				return `
					<p class="{{class.searchSuggestion}}-product-price bfx-price-container">
						<span class="{{class.searchSuggestion}}-product-regular-price bfx-price">{{regularPrice}}</span>
					</p>
				`;
			case InstantSearchResultItemProduct.tempType.PRICE_SALE:
				return `
					<p class="{{class.searchSuggestion}}-product-price instant-search-sale bfx-price-container">
						<span class="{{class.searchSuggestion}}-product-sale-price bfx-price">{{regularPrice}}</span>&nbsp;
						<s class="bfx-price bfx-original-price">{{compareAtPrice}}</s>
					</p>
				`;
			default:
				return `
					<li class="{{class.searchSuggestionItem}} {{class.searchSuggestionItem}}-product {{class.searchUiAutocompleteItem}}" aria-label="{{escapedBlockType}}: {{escapedTitle}}" data-id="{{id}}">
						<a href="{{url}}" {{newTabAttribute}}>
							{{itemProductImage}}
							<div class="{{class.searchSuggestion}}-right">
								<p class="{{class.searchSuggestion}}-product-title">{{title}}</p>
								{{itemProductSku}}
								{{itemProductVendor}}
								<div class="grid-view-item__reviews"><div class="yotpo bottomLine" data-appkey="3RT7ixY3EUVdQ8tJx321DZzk4D0pd6MGESVdMjNe" data-domain="{{itemDomain}}" data-product-id="{{id}}" data-product-models="{{id}}" data-name="{{title}}" data-url="{{url}}" data-image-url="{{imageUrl}}" data-description="{{itemDescription}}" data-bread-crumbs="{{itemTags}}"> </div></div>
								{{itemProductPrice}}
							</div>
						</a>
					</li>
				`;
		}      
    }
    
    InstantSearchResultItemProduct.prototype.compileTemplate = function() {
		
			if (this.data.id === 6535342522495) {
				return "";
			}
			var state = window.APPSTATE;
			var vendor = this.data.vendor;
			if (vendor === 'Printful' && state.valid_printful_user) {
				return "";
			};
		if (this.isShow) {          
			var searchTerm = Utils.escape(Globals.currentTerm);
			// Product image
			var imageHTML = '';
			if (Settings.getSettingValue('search.showSuggestionProductImage') && this.imageUrl.length) {
				imageHTML = this.getTemplate(InstantSearchResultItemProduct.tempType.IMAGE);
				imageHTML = imageHTML.replace(/{{imageUrl}}/g, this.imageUrl);
			}
			// Product title
			var productTitle = this.customizeProductTitle();
			productTitle = this._highlightSuggestionResult(productTitle, searchTerm);
			// SKU
			var skuHTML = '';
			if (Settings.getSettingValue('search.showSuggestionProductSku') && this.sku.length) {
				skuHTML = this.getTemplate(InstantSearchResultItemProduct.tempType.SKU);
				skuHTML = skuHTML.replace(/{{sku}}/g, this.sku);
			}
			// Vendor
			var vendorHTML = '';
			if (Settings.getSettingValue('search.showSuggestionProductVendor') && this.vendor.length) {
				vendorHTML = this.getTemplate(InstantSearchResultItemProduct.tempType.VENDOR);
				vendorHTML = vendorHTML.replace(/{{vendor}}/g, this.vendor);
			}
			// Price
			var priceHTML = this.compileSuggestionProductPrice();
			// Open the result item in new tab when selected
			var newTabAttr = Settings.getSettingValue('search.openProductNewTab') ? 'target="_blank"' : '';
 
			// Build Description
			var itemDescription = this.data.body_html;
			itemDescription = itemDescription.substr(0, itemDescription.indexOf('##highlights##'));

			return this.getTemplate()
				.replace(/{{id}}/g, this.id)
				.replace(/{{escapedBlockType}}/g, Utils.escape(this.parent.type))
				.replace(/{{url}}/g, this.url)
				.replace(/{{newTabAttribute}}/g, newTabAttr)
				.replace(/{{itemProductImage}}/g, imageHTML)
				.replace(/{{title}}/g, productTitle)
				.replace(/{{escapedTitle}}/g, Utils.escape(productTitle))
				.replace(/{{itemProductSku}}/g, skuHTML)
				.replace(/{{itemProductVendor}}/g, vendorHTML)
				.replace(/{{itemProductPrice}}/, priceHTML)
				.replace(/{{itemDomain}}/g, Utils.escape(boostPFSAppConfig.shop.domain))
				.replace(/{{itemTags}}/g, Utils.escape(this.data.tags.join(';')))
				.replace(/{{itemDescription}}/g, itemDescription)
				.replace(/{{class.searchSuggestion}}/g, Class.searchSuggestion)
				.replace(/{{class.searchSuggestionItem}}/g, Class.searchSuggestionItem)
				.replace(/{{class.searchUiAutocompleteItem}}/g, Class.searchUiAutocompleteItem);
			} else {
				return '';
			}      
		}
	
		function currencyConversion(original) {
			let rate = parseFloat(Shopify.currency.rate);
			if (Shopify.currency.active == 'GBP') {
				return "£" + (original / rate).toFixed(2);
			} else if (Shopify.currency.active == 'EUR') {
				return "€" + (original / rate).toFixed(2);
			} else {
				return "$" + original;
			}
		}	
    InstantSearchResultItemProduct.prototype.compileSuggestionProductPrice = function() {
			let currencySymbol = "$";
			let shownPrice = this.data.price_min;
			let comparePrice = this.data.compare_at_price_min;
			if (Shopify.currency.active == 'GBP') {
				currencySymbol = "£";
				shownPrice = this.data.price_min_gbp;
				comparePrice = this.data.compare_at_price_min_gbp;
			} else if (Shopify.currency.active == 'EUR') {
				currencySymbol = "€";
				shownPrice = this.data.price_min_eur;
				comparePrice = this.data.compare_at_price_min_eur;
			} else {
				currencySymbol = "$";
				shownPrice = this.data.price_min;
				comparePrice = this.data.compare_at_price_min;
			}
			// If the multi-currency feature is enabled, update the product price
			this.prepareSuggestionProductPriceData();
			// Check on sale
			var onSale = this.data.compare_at_price_min > this.data.price_min;
			// Format price
			var price = currencySymbol + shownPrice;
			var compareAtPrice = '';
			if (this.data && this.data.compare_at_price_min) {
				compareAtPrice = currencySymbol + comparePrice;
				if (Settings.getSettingValue('search.removePriceDecimal')) {
					price = Utils.removeDecimal(price);
					compareAtPrice = Utils.removeDecimal(compareAtPrice);
				}
			}
		
		// Build Price
		var result = '';
		if (Settings.getSettingValue('search.showSuggestionProductPrice')) {
			if (onSale && Settings.getSettingValue('search.showSuggestionProductSalePrice')) {
				result = this.getTemplate(InstantSearchResultItemProduct.tempType.PRICE_SALE);
			} else {
				result = this.getTemplate(InstantSearchResultItemProduct.tempType.PRICE);
			}
		}
		return result
			.replace(/{{regularPrice}}/g, price)
			.replace(/{{compareAtPrice}}/g, compareAtPrice);
	}
    
    var renderSuggestion = InstantSearchResult.prototype._renderSuggestion;    
  
    InstantSearchResult.prototype._renderSuggestion = function () {
      renderSuggestion.call(this);
			if (typeof Yotpo !== 'undefined') {
				var api = new Yotpo.API(yotpo);
				api.refreshWidgets();
			}
			for (let i = 0; i < this.data.length; i++){
				if (this.data[i].key === 'query') {
					window.dataLayer = window.dataLayer || [];
					window.dataLayer.push({
							'event': 'site-search',
							'searchTerm': this.data[i].values,
							'searchType': 'instant'
					});					
				}
			}
    }
})();