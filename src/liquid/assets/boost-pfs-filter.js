if(typeof lazySizes !== 'function'){
	/*! lazysizes - v4.1.8 */
	!function (a, b) { var c = b(a, a.document); a.lazySizes = c, "object" == typeof module && module.exports && (module.exports = c) }(window, function (a, b) { "use strict"; if (b.getElementsByClassName) { var c, d, e = b.documentElement, f = a.Date, g = a.HTMLPictureElement, h = "addEventListener", i = "getAttribute", j = a[h], k = a.setTimeout, l = a.requestAnimationFrame || k, m = a.requestIdleCallback, n = /^picture$/i, o = ["load", "error", "lazyincluded", "_lazyloaded"], p = {}, q = Array.prototype.forEach, r = function (a, b) { return p[b] || (p[b] = new RegExp("(\\s|^)" + b + "(\\s|$)")), p[b].test(a[i]("class") || "") && p[b] }, s = function (a, b) { r(a, b) || a.setAttribute("class", (a[i]("class") || "").trim() + " " + b) }, t = function (a, b) { var c; (c = r(a, b)) && a.setAttribute("class", (a[i]("class") || "").replace(c, " ")) }, u = function (a, b, c) { var d = c ? h : "removeEventListener"; c && u(a, b), o.forEach(function (c) { a[d](c, b) }) }, v = function (a, d, e, f, g) { var h = b.createEvent("Event"); return e || (e = {}), e.instance = c, h.initEvent(d, !f, !g), h.detail = e, a.dispatchEvent(h), h }, w = function (b, c) { var e; !g && (e = a.picturefill || d.pf) ? (c && c.src && !b[i]("srcset") && b.setAttribute("srcset", c.src), e({ reevaluate: !0, elements: [b] })) : c && c.src && (b.src = c.src) }, x = function (a, b) { return (getComputedStyle(a, null) || {})[b] }, y = function (a, b, c) { for (c = c || a.offsetWidth; c < d.minSize && b && !a._lazysizesWidth;)c = b.offsetWidth, b = b.parentNode; return c }, z = function () { var a, c, d = [], e = [], f = d, g = function () { var b = f; for (f = d.length ? e : d, a = !0, c = !1; b.length;)b.shift()(); a = !1 }, h = function (d, e) { a && !e ? d.apply(this, arguments) : (f.push(d), c || (c = !0, (b.hidden ? k : l)(g))) }; return h._lsFlush = g, h }(), A = function (a, b) { return b ? function () { z(a) } : function () { var b = this, c = arguments; z(function () { a.apply(b, c) }) } }, B = function (a) { var b, c = 0, e = d.throttleDelay, g = d.ricTimeout, h = function () { b = !1, c = f.now(), a() }, i = m && g > 49 ? function () { m(h, { timeout: g }), g !== d.ricTimeout && (g = d.ricTimeout) } : A(function () { k(h) }, !0); return function (a) { var d; (a = !0 === a) && (g = 33), b || (b = !0, d = e - (f.now() - c), d < 0 && (d = 0), a || d < 9 ? i() : k(i, d)) } }, C = function (a) { var b, c, d = 99, e = function () { b = null, a() }, g = function () { var a = f.now() - c; a < d ? k(g, d - a) : (m || e)(e) }; return function () { c = f.now(), b || (b = k(g, d)) } }; !function () { var b, c = { lazyClass: "lazyload", loadedClass: "lazyloaded", loadingClass: "lazyloading", preloadClass: "lazypreload", errorClass: "lazyerror", autosizesClass: "lazyautosizes", srcAttr: "data-src", srcsetAttr: "data-srcset", sizesAttr: "data-sizes", minSize: 40, customMedia: {}, init: !0, expFactor: 1.5, hFac: .8, loadMode: 2, loadHidden: !0, ricTimeout: 0, throttleDelay: 125 }; d = a.lazySizesConfig || a.lazysizesConfig || {}; for (b in c) b in d || (d[b] = c[b]); a.lazySizesConfig = d, k(function () { d.init && F() }) }(); var D = function () { var g, l, m, o, p, y, D, F, G, H, I, J, K = /^img$/i, L = /^iframe$/i, M = "onscroll" in a && !/(gle|ing)bot/.test(navigator.userAgent), N = 0, O = 0, P = 0, Q = -1, R = function (a) { P-- , (!a || P < 0 || !a.target) && (P = 0) }, S = function (a) { return null == J && (J = "hidden" == x(b.body, "visibility")), J || "hidden" != x(a.parentNode, "visibility") && "hidden" != x(a, "visibility") }, T = function (a, c) { var d, f = a, g = S(a); for (F -= c, I += c, G -= c, H += c; g && (f = f.offsetParent) && f != b.body && f != e;)(g = (x(f, "opacity") || 1) > 0) && "visible" != x(f, "overflow") && (d = f.getBoundingClientRect(), g = H > d.left && G < d.right && I > d.top - 1 && F < d.bottom + 1); return g }, U = function () { var a, f, h, j, k, m, n, p, q, r, s, t, u = c.elements; if ((o = d.loadMode) && P < 8 && (a = u.length)) { for (f = 0, Q++; f < a; f++)if (u[f] && !u[f]._lazyRace) if (!M || c.prematureUnveil && c.prematureUnveil(u[f])) aa(u[f]); else if ((p = u[f][i]("data-expand")) && (m = 1 * p) || (m = O), r || (r = !d.expand || d.expand < 1 ? e.clientHeight > 500 && e.clientWidth > 500 ? 500 : 370 : d.expand, c._defEx = r, s = r * d.expFactor, t = d.hFac, J = null, O < s && P < 1 && Q > 2 && o > 2 && !b.hidden ? (O = s, Q = 0) : O = o > 1 && Q > 1 && P < 6 ? r : N), q !== m && (y = innerWidth + m * t, D = innerHeight + m, n = -1 * m, q = m), h = u[f].getBoundingClientRect(), (I = h.bottom) >= n && (F = h.top) <= D && (H = h.right) >= n * t && (G = h.left) <= y && (I || H || G || F) && (d.loadHidden || S(u[f])) && (l && P < 3 && !p && (o < 3 || Q < 4) || T(u[f], m))) { if (aa(u[f]), k = !0, P > 9) break } else !k && l && !j && P < 4 && Q < 4 && o > 2 && (g[0] || d.preloadAfterLoad) && (g[0] || !p && (I || H || G || F || "auto" != u[f][i](d.sizesAttr))) && (j = g[0] || u[f]); j && !k && aa(j) } }, V = B(U), W = function (a) { var b = a.target; if (b._lazyCache) return void delete b._lazyCache; R(a), s(b, d.loadedClass), t(b, d.loadingClass), u(b, Y), v(b, "lazyloaded") }, X = A(W), Y = function (a) { X({ target: a.target }) }, Z = function (a, b) { try { a.contentWindow.location.replace(b) } catch (c) { a.src = b } }, $ = function (a) { var b, c = a[i](d.srcsetAttr); (b = d.customMedia[a[i]("data-media") || a[i]("media")]) && a.setAttribute("media", b), c && a.setAttribute("srcset", c) }, _ = A(function (a, b, c, e, f) { var g, h, j, l, o, p; (o = v(a, "lazybeforeunveil", b)).defaultPrevented || (e && (c ? s(a, d.autosizesClass) : a.setAttribute("sizes", e)), h = a[i](d.srcsetAttr), g = a[i](d.srcAttr), f && (j = a.parentNode, l = j && n.test(j.nodeName || "")), p = b.firesLoad || "src" in a && (h || g || l), o = { target: a }, s(a, d.loadingClass), p && (clearTimeout(m), m = k(R, 2500), u(a, Y, !0)), l && q.call(j.getElementsByTagName("source"), $), h ? a.setAttribute("srcset", h) : g && !l && (L.test(a.nodeName) ? Z(a, g) : a.src = g), f && (h || l) && w(a, { src: g })), a._lazyRace && delete a._lazyRace, t(a, d.lazyClass), z(function () { var b = a.complete && a.naturalWidth > 1; p && !b || (b && s(a, "ls-is-cached"), W(o), a._lazyCache = !0, k(function () { "_lazyCache" in a && delete a._lazyCache }, 9)), "lazy" == a.loading && P-- }, !0) }), aa = function (a) { if (!a._lazyRace) { var b, c = K.test(a.nodeName), e = c && (a[i](d.sizesAttr) || a[i]("sizes")), f = "auto" == e; (!f && l || !c || !a[i]("src") && !a.srcset || a.complete || r(a, d.errorClass) || !r(a, d.lazyClass)) && (b = v(a, "lazyunveilread").detail, f && E.updateElem(a, !0, a.offsetWidth), a._lazyRace = !0, P++ , _(a, b, f, e, c)) } }, ba = C(function () { d.loadMode = 3, V() }), ca = function () { 3 == d.loadMode && (d.loadMode = 2), ba() }, da = function () { if (!l) { if (f.now() - p < 999) return void k(da, 999); l = !0, d.loadMode = 3, V(), j("scroll", ca, !0) } }; return { _: function () { p = f.now(), c.elements = b.getElementsByClassName(d.lazyClass), g = b.getElementsByClassName(d.lazyClass + " " + d.preloadClass), j("scroll", V, !0), j("resize", V, !0), a.MutationObserver ? new MutationObserver(V).observe(e, { childList: !0, subtree: !0, attributes: !0 }) : (e[h]("DOMNodeInserted", V, !0), e[h]("DOMAttrModified", V, !0), setInterval(V, 999)), j("hashchange", V, !0), ["focus", "mouseover", "click", "load", "transitionend", "animationend", "webkitAnimationEnd"].forEach(function (a) { b[h](a, V, !0) }), /d$|^c/.test(b.readyState) ? da() : (j("load", da), b[h]("DOMContentLoaded", V), k(da, 2e4)), c.elements.length ? (U(), z._lsFlush()) : V() }, checkElems: V, unveil: aa, _aLSL: ca } }(), E = function () { var a, c = A(function (a, b, c, d) { var e, f, g; if (a._lazysizesWidth = d, d += "px", a.setAttribute("sizes", d), n.test(b.nodeName || "")) for (e = b.getElementsByTagName("source"), f = 0, g = e.length; f < g; f++)e[f].setAttribute("sizes", d); c.detail.dataAttr || w(a, c.detail) }), e = function (a, b, d) { var e, f = a.parentNode; f && (d = y(a, f, d), e = v(a, "lazybeforesizes", { width: d, dataAttr: !!b }), e.defaultPrevented || (d = e.detail.width) && d !== a._lazysizesWidth && c(a, f, e, d)) }, f = function () { var b, c = a.length; if (c) for (b = 0; b < c; b++)e(a[b]) }, g = C(f); return { _: function () { a = b.getElementsByClassName(d.autosizesClass), j("resize", g) }, checkElems: g, updateElem: e } }(), F = function () { F.i || (F.i = !0, E._(), D._()) }; return c = { cfg: d, autoSizer: E, loader: D, init: F, uP: w, aC: s, rC: t, hC: r, fire: v, gW: y, rAF: z } } });
	/*! ls.rias.min.ks - v4.1.8 */
	!function (a, b) { var c = function () { b(a.lazySizes), a.removeEventListener("lazyunveilread", c, !0) }; b = b.bind(null, a, a.document), "object" == typeof module && module.exports ? b(require("lazysizes")) : a.lazySizes ? c() : a.addEventListener("lazyunveilread", c, !0) }(window, function (a, b, c) { "use strict"; function d(b, c) { var d, e, f, g, h = a.getComputedStyle(b); e = b.parentNode, g = { isPicture: !(!e || !m.test(e.nodeName || "")) }, f = function (a, c) { var d = b.getAttribute("data-" + a); if (!d) { var e = h.getPropertyValue("--ls-" + a); e && (d = e.trim()) } if (d) { if ("true" == d) d = !0; else if ("false" == d) d = !1; else if (l.test(d)) d = parseFloat(d); else if ("function" == typeof j[a]) d = j[a](b, d); else if (q.test(d)) try { d = JSON.parse(d) } catch (a) { } g[a] = d } else a in j && "function" != typeof j[a] ? g[a] = j[a] : c && "function" == typeof j[a] && (g[a] = j[a](b, d)) }; for (d in j) f(d); return c.replace(p, function (a, b) { b in g || f(b, !0) }), g } function e(a, b) { var c = [], d = function (a, c) { return k[typeof b[c]] ? b[c] : a }; return c.srcset = [], b.absUrl && (s.setAttribute("href", a), a = s.href), a = ((b.prefix || "") + a + (b.postfix || "")).replace(p, d), b.widths.forEach(function (d) { var e = b.widthmap[d] || d, f = b.aspectratio || b.ratio, g = !b.aspectratio && j.traditionalRatio, h = { u: a.replace(n, e).replace(o, f ? g ? Math.round(d * f) : Math.round(d / f) : ""), w: d }; c.push(h), c.srcset.push(h.c = h.u + " " + d + "w") }), c } function f(a, c, d) { var f = 0, g = 0, h = d; if (a) { if ("container" === c.ratio) { for (f = h.scrollWidth, g = h.scrollHeight; !(f && g || h === b);)h = h.parentNode, f = h.scrollWidth, g = h.scrollHeight; f && g && (c.ratio = g / f) } a = e(a, c), a.isPicture = c.isPicture, u && "IMG" == d.nodeName.toUpperCase() ? d.removeAttribute(i.srcsetAttr) : d.setAttribute(i.srcsetAttr, a.srcset.join(", ")), Object.defineProperty(d, "_lazyrias", { value: a, writable: !0 }) } } function g(a, b) { var e = d(a, b); return j.modifyOptions.call(a, { target: a, details: e, detail: e }), c.fire(a, "lazyriasmodifyoptions", e), e } function h(a) { return a.getAttribute(a.getAttribute("data-srcattr") || j.srcAttr) || a.getAttribute(i.srcsetAttr) || a.getAttribute(i.srcAttr) || a.getAttribute("data-pfsrcset") || "" } var i, j, k = { string: 1, number: 1 }, l = /^\-*\+*\d+\.*\d*$/, m = /^picture$/i, n = /\s*\{\s*width\s*\}\s*/i, o = /\s*\{\s*height\s*\}\s*/i, p = /\s*\{\s*([a-z0-9]+)\s*\}\s*/gi, q = /^\[.*\]|\{.*\}$/, r = /^(?:auto|\d+(px)?)$/, s = b.createElement("a"), t = b.createElement("img"), u = "srcset" in t && !("sizes" in t), v = !!a.HTMLPictureElement && !u; !function () { var b, d = function () { }, e = { prefix: "", postfix: "", srcAttr: "data-src", absUrl: !1, modifyOptions: d, widthmap: {}, ratio: !1, traditionalRatio: !1, aspectratio: !1 }; i = c && c.cfg || a.lazySizesConfig, i || (i = {}, a.lazySizesConfig = i), i.supportsType || (i.supportsType = function (a) { return !a }), i.rias || (i.rias = {}), "widths" in (j = i.rias) || (j.widths = [], function (a) { for (var b, c = 0; !b || b < 3e3;)c += 5, c > 30 && (c += 1), b = 36 * c, a.push(b) }(j.widths)); for (b in e) b in j || (j[b] = e[b]) }(), addEventListener("lazybeforesizes", function (a) { if (a.detail.instance == c) { var b, d, e, k, l, m, o, p, q, s, t, u, x; if (b = a.target, a.detail.dataAttr && !a.defaultPrevented && !j.disabled && (q = b.getAttribute(i.sizesAttr) || b.getAttribute("sizes")) && r.test(q)) { if (d = h(b), e = g(b, d), t = n.test(e.prefix) || n.test(e.postfix), e.isPicture && (k = b.parentNode)) for (l = k.getElementsByTagName("source"), m = 0, o = l.length; m < o; m++)(t || n.test(p = h(l[m]))) && (f(p, e, l[m]), u = !0); t || n.test(d) ? (f(d, e, b), u = !0) : u && (x = [], x.srcset = [], x.isPicture = !0, Object.defineProperty(b, "_lazyrias", { value: x, writable: !0 })), u && (v ? b.removeAttribute(i.srcAttr) : "auto" != q && (s = { width: parseInt(q, 10) }, w({ target: b, detail: s }))) } } }, !0); var w = function () { var d = function (a, b) { return a.w - b.w }, e = function (a) { var b, c, d = a.length, e = a[d - 1], f = 0; for (f; f < d; f++)if (e = a[f], e.d = e.w / a.w, e.d >= a.d) { !e.cached && (b = a[f - 1]) && b.d > a.d - .13 * Math.pow(a.d, 2.2) && (c = Math.pow(b.d - .6, 1.6), b.cached && (b.d += .15 * c), b.d + (e.d - a.d) * c > a.d && (e = b)); break } return e }, f = function (a, b) { var d; return !a._lazyrias && c.pWS && (d = c.pWS(a.getAttribute(i.srcsetAttr || ""))).length && (Object.defineProperty(a, "_lazyrias", { value: d, writable: !0 }), b && a.parentNode && (d.isPicture = "PICTURE" == a.parentNode.nodeName.toUpperCase())), a._lazyrias }, g = function (b) { var d = a.devicePixelRatio || 1, e = c.getX && c.getX(b); return Math.min(e || d, 2.4, d) }, h = function (b, c) { var h, i, j, k, l, m; if (l = b._lazyrias, l.isPicture && a.matchMedia) for (i = 0, h = b.parentNode.getElementsByTagName("source"), j = h.length; i < j; i++)if (f(h[i]) && !h[i].getAttribute("type") && (!(k = h[i].getAttribute("media")) || (matchMedia(k) || {}).matches)) { l = h[i]._lazyrias; break } return (!l.w || l.w < c) && (l.w = c, l.d = g(b), m = e(l.sort(d))), m }, j = function (d) { if (d.detail.instance == c) { var e, g = d.target; if (!u && (a.respimage || a.picturefill || lazySizesConfig.pf)) return void b.removeEventListener("lazybeforesizes", j); ("_lazyrias" in g || d.detail.dataAttr && f(g, !0)) && (e = h(g, d.detail.width)) && e.u && g._lazyrias.cur != e.u && (g._lazyrias.cur = e.u, e.cached = !0, c.rAF(function () { g.setAttribute(i.srcAttr, e.u), g.setAttribute("src", e.u) })) } }; return v ? j = function () { } : addEventListener("lazybeforesizes", j), j }() });
}

var onSale = false;
var soldOut = false;
var priceVaries = false;
var images = [];
var firstVariant = {};

// Fix the confict suggestion search in Debut theme
if (typeof theme !== 'undefined' && theme.hasOwnProperty('settings')) theme.settings.predictiveSearchEnabled = false;
// Override Settings
var boostPFSFilterConfig = {
	general: {
		limit: boostPFSThemeConfig.custom.products_per_page,
		/* Optional */
		loadProductFirst: false,
		breakpointMobile: '767',
		// Placeholder
		showPlaceholderProductList: true,
		placeholderProductPerRow: 3,
    placeholderProductGridItemClass: 'boost-pfs-filter-product-item boost-pfs-filter-product-item-grid boost-pfs-filter-grid-width-3 boost-pfs-filter-grid-width-mb-2',
		enableOTP: true,
		separateRefineByFromFilter: true,
		filterTreeMobileStyle: 'style3', // 'style2', 'style3',
		filterTreeMobileStyleFullWidth: false,
		equal_height: boostPFSThemeConfig.custom.equal_height,
		cropImagePossitionEqualHeight: boostPFSThemeConfig.custom.equal_height_crop_image_position
	},
	selector: {
		otpButtons:'.boost-pfs-filter-product-item-image'
	}
};

(function() {
	BoostPFS.inject(this);

	/************************** CUSTOMIZE DATA BEFORE BUILDING PRODUCT ITEM **************************/
	function prepareShopifyData(data) {
		// Displaying price base on the policy of Shopify, have to multiple by 100
		soldOut = !data.available; // Check a product is out of stock
		onSale = data.compare_at_price_min > data.price_min; // Check a product is on sale
		priceVaries = data.price_min != data.price_max; // Check a product has many prices
		// Convert images to array
		images = data.images_info;
		// Get First Variant (selected_or_first_available_variant)
		var firstVariant = data['variants'][0];
		if (Utils.getParam('variant') !== null && Utils.getParam('variant') != '') {
			var paramVariant = data.variants.filter(function(e) {
				return e.id == Utils.getParam('variant');
			});
			if (typeof paramVariant[0] !== 'undefined') firstVariant = paramVariant[0];
		} else {
			for (var i = 0; i < data['variants'].length; i++) {
				if (data['variants'][i].available) {
					firstVariant = data['variants'][i];
					break;
				}
			}
		}
		return data;
	}
	/************************** END CUSTOMIZE DATA BEFORE BUILDING PRODUCT ITEM **************************/
/************************** BUILD PRODUCT LIST **************************/
	let productCount = 0;
	// Build Product Grid Item
	ProductGridItem.prototype.compileTemplate = function(data) {
		if (!data) data = this.data;
		// Get Template
		var itemHtml = boostPFSTemplate.productGridItemHtml;
		// Customize API data to get the Shopify data
		data = prepareShopifyData(data);

		// Add Item Badging
		itemHtml = itemHtml.replace(/{{itemBadge}}/g, buildBadges(data));

		// Add Custom class
		var soldOutClass = soldOut ? boostPFSTemplate.soldOutClass : '';
		var saleClass = onSale ? boostPFSTemplate.saleClass : '';
		var state = window.APPSTATE;
		var vendor = data.vendor;
		if (vendor === 'Printful' && state.valid_printful_user) {
			itemHtml = itemHtml.replace(/{{soldOutClass}}/g, ' hidden');
		};
		itemHtml = itemHtml.replace(/{{soldOutClass}}/g, soldOutClass);
		itemHtml = itemHtml.replace(/{{saleClass}}/g, saleClass);
		// Add Grid Width class
		itemHtml = itemHtml.replace(/{{gridWidthClass}}/g, buildGridWidthClass(data));
		// Add Label
		itemHtml = itemHtml.replace(/{{itemLabels}}/g, buildLabels(data));
		// Add TAG Label
		itemHtml = itemHtml.replace(/{{itemTagLabels}}/g, buildTagLabels(data, false));
		// Add Images
		itemHtml = itemHtml.replace(/{{itemImages}}/g, buildImages(data));

		// Add Flex Order
		itemHtml = itemHtml.replace(/{{itemHoverable}}/g, buildHoverable(data));

		// Add Flex Order
		itemHtml = itemHtml.replace(/{{itemFlexOrder}}/g, buildFlexOrder(data, productCount));
		// Add AdSwerveClick
		itemHtml = itemHtml.replace(/{{adswerveClick}}/g, buildAdswerve(data, productCount));

		productCount++;

		// Add Item Vendor
		itemHtml = itemHtml.replace(/{{itemVendorLogoDesktop}}/g, buildVendorLogoDesktop(data));
		itemHtml = itemHtml.replace(/{{itemVendorLogoMobile}}/g, buildVendorLogoMobile(data));

		// Add Price
		itemHtml = itemHtml.replace(/{{itemPrice}}/g, buildPrice(data));

		// Add Quick Shop Button
		// itemHtml = itemHtml.replace(/{{itemQuickshop}}/g, buildQuickShopBtn(data));

		// Add Review
		if (boostPFSThemeConfig.custom.show_product_review) {
			// var yotpoHTML = '<div class="grid-view-item__reviews"><div class="yotpo bottomLine" data-appkey="3RT7ixY3EUVdQ8tJx321DZzk4D0pd6MGESVdMjNe" data-domain="[[itemDomain]]" data-product-id="[[itemId]]" data-product-models="[[itemId]]" data-name="[[itemTitle]]" data-url="[[itemUrl]]" data-image-url="[[itemThumbUrl]]" data-description="[[itemDescription]]" data-bread-crumbs="[[itemTags]]"> </div></div>';
			var itemReviewHtml = '<span class="shopify-product-reviews-badge" data-id="{{itemId}}"></span>';
			itemHtml = itemHtml.replace(/{{itemReviewHtml}}/g, itemReviewHtml);
		} else {
			itemHtml = itemHtml.replace(/{{itemReviewHtml}}/g, '');
		}

		// Build Domain
		itemHtml = itemHtml.replace(/{{itemDomain}}/g, Utils.escape(boostPFSAppConfig.shop.domain));

		// Build Description
		var itemDescription = data.description;
		itemDescription = itemDescription.substr(0, itemDescription.indexOf('##highlights##'));
		itemHtml = itemHtml.replace(/{{itemDescription}}/g, itemDescription);

		// Build Tags
		itemHtml = itemHtml.replace(/{{itemTags}}/g, Utils.escape(data.tags.join(';')));

		// Add Vendor
		itemHtml = itemHtml.replace(/{{itemVendor}}/g, buildVendor(data));
		// itemActiveSwapClass
		var itemActiveSwapClass = boostPFSThemeConfig.custom.active_image_swap ? 'has-bc-swap-image' : '';
		itemHtml = itemHtml.replace(/{{itemActiveSwapClass}}/g, itemActiveSwapClass);
		// Add Color Swatches
		itemHtml = itemHtml.replace(/{{itemColorSwatches}}/g, buildColorSwatches(data));

		// Add main attribute (Always put at the end of this function)
		itemHtml = itemHtml.replace(/{{itemId}}/g, data.id);
		itemHtml = itemHtml.replace(/{{itemTitle}}/g, data.title);
		itemHtml = itemHtml.replace(/{{itemHandle}}/g, data.handle);
		itemHtml = itemHtml.replace(/{{itemVendorLabel}}/g, data.vendor);
		itemHtml = itemHtml.replace(/{{itemUrl}}/g, Utils.buildProductItemUrl(data));

		if (data.id === 6535342522495) {
			return "";
		}

		return itemHtml;
	};
	// Build Product List Item
	ProductListItem.prototype.compileTemplate = function(data) {
		if (!data) data = this.data;
		// For List View
		/*** Prepare data ***/
		var images = data.images_info;
		// Displaying price base on the policy of Shopify, have to multiple by 100
		var soldOut = !data.available; // Check a product is out of stock
		var onSale = data.compare_at_price_min > data.price_min; // Check a product is on sale
		var priceVaries = data.price_min != data.price_max; // Check a product has many prices
		// Get First Variant (selected_or_first_available_variant)
		var firstVariant = data['variants'][0];
		if (Utils.getParam('variant') !== null && Utils.getParam('variant') != '') {
			var paramVariant = data.variants.filter(function(e) {
				return e.id == Utils.getParam('variant');
			});
			if (typeof paramVariant[0] !== 'undefined') firstVariant = paramVariant[0];
		} else {
			for (var i = 0; i < data['variants'].length; i++) {
				if (data['variants'][i].available) {
					firstVariant = data['variants'][i];
					break;
				}
			}
		}
		/*** End Prepare data ***/
		// Get Template
		var itemHtml = boostPFSTemplate.productListItemHtml;
		// Customize API data to get the Shopify data
		data = prepareShopifyData(data);
		// Add Custom class
		var soldOutClass = soldOut ? boostPFSTemplate.soldOutClass : '';
		var saleClass = onSale ? boostPFSTemplate.saleClass : '';
		itemHtml = itemHtml.replace(/{{soldOutClass}}/g, soldOutClass);
		itemHtml = itemHtml.replace(/{{saleClass}}/g, saleClass);
		// Add Label
		itemHtml = itemHtml.replace(/{{itemLabels}}/g, buildLabels(data));
		// Add TAG Label
		itemHtml = itemHtml.replace(/{{itemTagLabels}}/g, buildTagLabels(data, false));
		// Add Images
		itemHtml = itemHtml.replace(/{{itemImages}}/g, buildImages(data));

		// Add Review
		if (boostPFSThemeConfig.custom.show_product_review) {
			var itemReviewHtml = '<span class="shopify-product-reviews-badge" data-id="{{itemId}}"></span>';
			itemHtml = itemHtml.replace(/{{itemReviewHtml}}/g, itemReviewHtml);
		} else {
			itemHtml = itemHtml.replace(/{{itemReviewHtml}}/g, '');
		}

		// Add Vendor
		itemHtml = itemHtml.replace(/{{itemVendor}}/g, buildVendor(data));
		// Add Price
		var itemPriceHtml = buildPrice(data, onSale, priceVaries);
		itemHtml = itemHtml.replace(/{{itemPrice}}/g, itemPriceHtml);
		// Description
		var itemDescription = jQ('<p>' + data.body_html + '</p>').text();
		itemDescription = (itemDescription.split(" ")).length > 35 ? itemDescription.split(" ").splice(0, 35).join(" ") + '...' : itemDescription.split(" ").splice(0, 35).join(" ");
		itemHtml = itemHtml.replace(/{{itemDescription}}/g, itemDescription);
		// itemActiveSwapClass
		var itemActiveSwapClass = boostPFSThemeConfig.custom.active_image_swap ? 'has-bc-swap-image' : '';
		itemHtml = itemHtml.replace(/{{itemActiveSwapClass}}/g, itemActiveSwapClass);
		// Add Color Swatches
  		itemHtml = itemHtml.replace(/{{itemColorSwatches}}/g, buildColorSwatches(data));

		// Add main attribute
		itemHtml = itemHtml.replace(/{{itemTitle}}/g, data.title);
		itemHtml = itemHtml.replace(/{{itemVendorLabel}}/g, data.vendor);
		itemHtml = itemHtml.replace(/{{itemUrl}}/g, Utils.buildProductItemUrl(data));
		itemHtml = itemHtml.replace(/{{itemId}}/g, data.id);
		return itemHtml;
		// End For List View
	};
	/************************** END BUILD PRODUCT LIST **************************/
	/************************** BUILD PRODUCT ITEM ELEMENTS **************************/
	function buildGridWidthClass() {
		var gridWidthClass = '';
		// On PC
		switch (boostPFSThemeConfig.custom.products_per_row) {
			case 2:
				gridWidthClass = 'boost-pfs-filter-grid-width-2';
				break;
			case 3:
				gridWidthClass = 'boost-pfs-filter-grid-width-3';
				break;
			case 5:
				gridWidthClass = 'boost-pfs-filter-grid-width-5';
				break;
			default:
				gridWidthClass = 'boost-pfs-filter-grid-width-3';
				break;
		}
		// On Mobile
		switch (boostPFSThemeConfig.custom.products_per_row_mobile) {
			case 1:
				gridWidthClass += ' boost-pfs-filter-grid-width-mb-1';
				break;
			case 3:
				gridWidthClass += ' boost-pfs-filter-grid-width-mb-3';
				break;
			default:
				gridWidthClass += ' boost-pfs-filter-grid-width-mb-2';
				break;
		}
		return gridWidthClass;
	}

	function buildImages(data) {
	  var html = '';
      var aspect_ratio = '';
	  // Build Main Image
	  var thumbUrl = Utils.getFeaturedImage(images, '360x');
	  if (images.some(img => img.alt && img.alt.includes('main'))) {
			[images[0], images[1]] = [images[1], images[0]];
		}
	  var flipImageSrc = images.length > 1 ? Utils.optimizeImage(images[1]['src'],'360x') : (images.length > 0 ? Utils.optimizeImage(images[0]['src'], '360x') : boostPFSAppConfig.general.no_image_url);
    var flipImageSrcset = boostPFSAppConfig.general.no_image_url;
    if (images.length > 0) {
      var flipImageSrcset = images.length > 1 ? Utils.optimizeImage(images[1]['src'], '180x') + " " + '180w' + ', ' + Utils.optimizeImage(images[1]['src'], '260x') + " " + '260w' + ', ' + Utils.optimizeImage(images[1]['src'], '360x') + " " + '360w' + ', ' + Utils.optimizeImage(images[1]['src'], '480x') + " " + '480w' : Utils.optimizeImage(images[0]['src'], '180x') + " " + '180w' + ', ' + Utils.optimizeImage(images[0]['src'], '260x') + " " + '260w' + ', ' + Utils.optimizeImage(images[0]['src'], '360x') + " " + '360w' + ', ' + Utils.optimizeImage(images[0]['src'], '480x') + " " + '480w';
    }

	  html += '<a href="{{itemUrl}}" class="boost-pfs-filter-product-item-image-link" style="padding-top:';

		if (images.length > 0) {
		aspect_ratio = images[0]['width'] / images[0]['height'];
		html += 1 / aspect_ratio * 100;
		} else {
			html += 100;
		}
		html += '%;">';
      	html += '<img class="boost-pfs-filter-product-item-main-image lazyload Image--lazyLoad"' +
		  'data-srcset="' + Utils.getFeaturedImage(images, '180x') + " " + '180w' + ', ' + Utils.getFeaturedImage(images, '260x') + " " + '260w' + ', ' + Utils.getFeaturedImage(images, '360x') + " " + '360w' + '" ' + ', ' + Utils.getFeaturedImage(images, '480x') + " " + '480w' + '" ' +
		  'data-src="' + thumbUrl + '" ' + ', ' + Utils.getFeaturedImage(images, '480x') + " " + '480w' +
		  'data-widths="[180, 260, 360, 480]" ' +
		  'data-sizes="auto" ' +
		  'src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" ' +
          'data-img-flip = "' + flipImageSrc + '" ' +
          'data-img-flip-srcset = "' + flipImageSrcset + '" ' +
		  'alt="{{itemTitle}}" />';
        html += '</a>';

	  return html;
  }

	function buildVendor(data) {
		var html = '';
		if (boostPFSThemeConfig.custom.show_vendor) {
			html = boostPFSTemplate.vendorHtml;
		}
		return html;
	}

	function buildPrice(data) {
		let currencySymbol = "$";
		let price = data.price_min;
		let comparePrice = data.compare_at_price_min;
		if (Shopify.currency.active == 'GBP') {
			currencySymbol = "£";
			price = data.price_min_gbp;
			comparePrice = data.compare_at_price_min_gbp;
			} else if (Shopify.currency.active == 'EUR') {
			currencySymbol = "€";
			price = data.price_min_eur;
			comparePrice = data.compare_at_price_min_eur;
		} else {
			currencySymbol = "$";
			price = data.price_min;
			comparePrice = data.compare_at_price_min;
		}
		
		var html = '';
		if (boostPFSThemeConfig.custom.show_price) {
			html = '<p class="boost-pfs-filter-product-item-price transition-all duration-200 pb-1">';
			if (onSale) {
				html += '<span class="boost-pfs-filter-product-item-sale-price bfx-price bfx-original-price">' + currencySymbol + price.toFixed(2) + '</span>';
				html += '<s class="bfx-price" aria-hidden="true">' + currencySymbol + comparePrice.toFixed(2) + '</s> ';
			} else {
				if (priceVaries) {
					html += '<span class="boost-pfs-filter-product-item-price-from-text bfx-price">' + (boostPFSThemeConfig.label_basic.from) + ' '+ '</span>';
				}
				html += '<span class="boost-pfs-filter-product-item-regular-price bfx-price">' + currencySymbol + price.toFixed(2) + '</span>';
			}
			html += '</p>';
			if (data.metafields.length) {
				data.metafields.forEach(field => {
					html += '<p class="font-body font-semibold text-xs text-primary-500">' + field.value + '</p>';
				})
			}
		}
		return html;
	}

	function buildBadges(data) {

		let state = window.APPSTATE;

		let promoTag = '';

		for (let i = 0; i < data.tags.length; i++){
			if (data.tags[i].includes('promo:')) {
				promoTag = data.tags[i].split(":")[1];
			}
		}

		if (soldOut) {
			return "<div class='z-10 absolute top-12 left-8 px-4 py-1 tracking-header uppercase text-xxs font-bold' style='color:" + state.settings.oos_text_color + "; background-color:" + state.settings.oos_bg_color + "'>" + state.language.out_of_stock + "</div>"
		}
		if (promoTag != '') {
			return "<div class='z-10 absolute top-12 left-8 px-4 py-1 tracking-header uppercase text-xxs font-bold' style='color:" + state.settings.promo_text_color + "; background-color:" + state.settings.promo_bg_color + "'>" + promoTag + "</div>"
		}
		if (data.tags.includes('preorder')) {
			return "<div class='z-10 absolute top-12 left-8 px-4 py-1 tracking-header uppercase text-xxs font-bold' style='color:" + state.settings.preorder_text_color + "; background-color:" + state.settings.preorder_bg_color + "'>" + state.language.preorder + "</div>"
		}
		if (data.tags.includes('backorder')) {
			return "<div class='z-10 absolute top-12 left-8 px-4 py-1 tracking-header uppercase text-xxs font-bold' style='color:" + state.settings.backorder_text_color + "; background-color:" + state.settings.backorder_bg_color + "'>" + state.language.backorder + "</div>"
		}
		if (data.tags.includes('customizable')) {
			return "<div class='z-10 absolute top-12 left-8 px-4 py-1 tracking-header uppercase text-xxs font-bold' style='color:" + state.settings.customizable_text_color + "; background-color:" + state.settings.customizable_bg_color + "'>" + state.language.customizable + "</div>"
		}
		if (onSale) {
			return "<div class='z-10 absolute top-12 left-8 px-4 py-1 tracking-header uppercase text-xxs font-bold' style='color:" + state.settings.sale_text_color + "; background-color:" + state.settings.sale_bg_color + "'>" + state.language.sale + "</div>"
		}
		if (data.tags.includes('limited')) {
			return "<div class='z-10 absolute top-12 left-8 px-4 py-1 tracking-header uppercase text-xxs font-bold' style='color:" + state.settings.limited_text_color + "; background-color:" + state.settings.limited_bg_color + "'>" + state.language.limited + "</div>"
		}
		if (data.tags.includes('bestseller')) {
			return "<div class='z-10 absolute top-12 left-8 px-4 py-1 tracking-header uppercase text-xxs font-bold' style='color:" + state.settings.bestseller_text_color + "; background-color:" + state.settings.bestseller_bg_color + "'>" + state.language.bestseller + "</div>"
		}
		if (data.tags.includes('new')) {
			return "<div class='z-10 absolute top-12 left-8 px-4 py-1 tracking-header uppercase text-xxs font-bold' style='color:" + state.settings.new_text_color + "; background-color:" + state.settings.new_bg_color + "'>" + state.language.new + "</div>"
		}
		if (data.tags.includes('youth')) {
			return "<div class='z-10 absolute top-12 left-8 px-4 py-1 tracking-header uppercase text-xxs font-bold' style='color:" + state.settings.youth_text_color + "; background-color:" + state.settings.youth_bg_color + "'>" + state.language.youth + "</div>"
		}

		return "";
	}

	function buildFlexOrder(data, order) {
		return "style='order: " + order + "' id='order-" + order + "'";
	}

	function buildAdswerve(data, order) {
		if (document.location.href.includes("q=")) {
			return "onclick='adswerveClickSearch(" + order + ")'";
		}
		return `onclick='adswerveClickProduct("${data.collections[0] ? data.collections[0].handle : ''}", ${data.id}, "${data.handle}", "${data.product_type}", "${data.vendor}", ${data.variants[0].id}, ${data.variants[0].price}, ${order})'`;
	}

	function buildHoverable(data) {
		for (var i = 0; i < data.options.length; i++){
			if (data.options[i] == "color" || data.options[i] == "Color") {
				if (data.options_with_values[i].values.length > 1) {
					return "hoverable";
				}
			}
		}
		return "";
	}

	function buildVendorLogoDesktop(data){
		for (let i = 0; i < data.tags.length; i++){
			if (data.tags[i].includes('vendor:')) {
				let vendorBadgeUrl = 'https://cdn.shopify.com/s/files/1/0070/5698/2143/files/vendor_' + data.tags[i].split(":")[1] + '.png';
				return `
					<div class="z-10 absolute w-12 h-12 md:w-16 md:h-16 object-contain top-12 right-12 hidden md:block">
						<img alt="" src="${vendorBadgeUrl}" />
					</div>
				`;
			}
		}
		return "";
	}

	function buildVendorLogoMobile(data){
		for (let i = 0; i < data.tags.length; i++){
			if (data.tags[i].includes('vendor:')) {
				let vendorBadgeUrl = 'https://cdn.shopify.com/s/files/1/0070/5698/2143/files/vendor_' + data.tags[i].split(":")[1] + '.png';
				return `
					<div class="w-12 object-contain block md:hidden">
 						<img alt="" src="${vendorBadgeUrl}" />
 					</div>
				`;
			}
		}
		return "";
	}

	function buildQuickShopBtn(data) {
		let state = window.APPSTATE;
		return `
			<button class="hidden md:flex transition-opacity duration-200 opacity-0 z-10 absolute bottom-8 right-8 px-4 py-5 uppercase text-modal font-bold bg-gray-700 text-white rounded-e2 quickshop-btn">
				<svg style="width: 16px; height: 18px;" class="hidden-until-vue-loaded text-white mr-2">
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart"></use>
				</svg>
				${state.language.quick_shop}
			</button>
		`;
	}

	function buildLabels(data) {
		// Build Sold out label
		var soldOutLabel = '';
		if (boostPFSThemeConfig.custom.show_sold_out_label && soldOut) {
			soldOutLabel = boostPFSTemplate.soldOutLabelHtml.replace(/{{style}}/g, '');
		}
		// Build Sale label
		var saleLabel = '';
		if (boostPFSThemeConfig.custom.show_sale_label && onSale && !soldOut) {
			saleLabel = boostPFSTemplate.saleLabelHtml.replace(/{{style}}/g, '');
		}
		// Build Labels
		return soldOutLabel + saleLabel;
	}
	// BUILD LABEL PRODUCT WITH TAGS
	function buildTagLabels(data, showall) {
		if (boostPFSThemeConfig.custom.show_label_by_tag) {
			if (showall) {
				var tagLabel = '';
				if (data.tags) {
					for (var i = 0; i < data.tags.length; i++) {
						var tag = data.tags[i];
						if (tag.indexOf("pfs:label") !== -1) {
							var preTagLabel = boostPFSTemplate.tagLabelHtml.replace(/{{labelTag}}/g, tag.split('pfs:label-')[1]);
							tagLabel += preTagLabel;
						}
					}
				}
			} else {
				var tagLabel = '';
				if (data.tags) {
					for (var i = data.tags.length - 1; i >= 0; i--) {
						tag = data.tags[i];
						if (tag.indexOf("pfs:label") !== -1) {
							var preTagLabel = boostPFSTemplate.tagLabelHtml.replace(/{{labelTag}}/g, tag.split('pfs:label-')[1]);
							tagLabel += preTagLabel;
							break;
						}
					}
				}
			}
			return tagLabel;
		} else {
			return "";
		}
	}

	// Build Color Swatches
	function buildColorSwatches(data) {
		var colorSwatchesHtml = '';
		if (boostPFSThemeConfig.custom.display_item_swatch) {
			for (var index = 0; index < data.options.length; index++) {
				let option = data['options'][index].toLowerCase();
				if (option == 'color') {
					colorSwatchesHtml += '<p class="filter-item-title color-title-' + data.id + '">' + option + '</p>';
				}
			}
			colorSwatchesHtml += '<ul class="boost-pfs-filter-item-swatch colors-' + data.id  + '">';
			let activeColors = [];
			for (var index = 0; index < data.options.length; index++) {
				var option = data['options'][index].toLowerCase();
				if (option == 'color') {
					var colorlist = '';
					var color = '';
					var totalVariants = 0;
					for (var k = 0; k < data.variants.length; k++) {
						var variant = data['variants'][k];
						color = variant['options'][index];
						let dataColor = '#fff';
						if (colorlist.indexOf(color) == -1) {
							if (totalVariants < 100) {
								var text = Utils.slugify(color);
								var border = text == 'white' ? 'border: 1px solid #cbcbcb;' : '';
								var backgroundImage = Utils.optimizeImage(variant.image, '24x');
								var backgroundImageURL = '';
								var dataImg = '';

								dataColors = variant.option_color.toLowerCase().split(' ');

								var i = dataColors.length - 1;
								if (dataColors[i] !== '' && dataColors[i] !== 'colors') {
									dataColor = dataColors[i];
								}

								if (variant.image !== null) {
									dataImg = "data-img='" + Utils.optimizeImage(variant.image, '300x') + " 300w'";
								}

								// if (variant.image !== null) {
								// 	dataImg = "data-img='" + Utils.optimizeImage(variant.image) + "'";
								// } else {
								// 	var _file = variant.option_color.toLowerCase().replace(/ /g, '-');
								// 	backgroundImage = boostPFSAppConfig.general.file_url.split('?')[0] + 'color-' + _file + '.png';
								// }
								var _file = '';
								for (var i = 0; i < variant.merged_options.length;  i++) {
									var color = variant.merged_options[i];

									if(color.indexOf('color') != -1){
										_file = color.toLowerCase().replace(/: /g, '-').replace(/:/g, '-').replace(/ /g, '-').replace(/color-/g, '').replace(/\//g, '-');
									}
								}

								if (boostPFSThemeConfig.custom.swatch_color_display_type == 'swatch_color_display_type_image_color') {
									backgroundImage = boostPFSAppConfig.general.file_url.split('?')[0] + 'color-' + _file + '.png?v=' + boostPFSAppConfig.general.file_url.split('?')[1];
									backgroundImageURL = 'url(' + backgroundImage + ')';
								} else if (boostPFSThemeConfig.custom.swatch_color_display_type == 'swatch_color_display_type_image_product') {
									backgroundImage = Utils.optimizeImage(variant.image, '24x');
									backgroundImageURL = 'url(' + backgroundImage + ')';
								} else {
									backgroundImageURL = 'none';
								}
								if (!activeColors.includes(dataColor)) {
									colorSwatchesHtml += '<li class="colors">';
									colorSwatchesHtml += '<div class="tooltip capitalize">' + dataColor + '</div>';
									colorSwatchesHtml += '<div class="plp-color-swatch" style="background-color: ' + dataColor + '; background-image: ' + backgroundImageURL + ';" ' + dataImg + '></div>';
									activeColors.push(dataColor);
								}

								//colorSwatchesHtml += '<label style="' + border + 'background-image: url(' + Utils.optimizeImage(variant.image, '24x') + ');"' + if (variant.image !== null){ + 'data-img="' + Utils.optimizeImage(variant.image) + '"' + } '></label>';
								colorSwatchesHtml += '</li>';
							}
							var templist = colorlist + color + ' ';
							colorlist = templist;

							totalVariants++;

						}
					}
					// if (totalVariants == 1) {
					// colorSwatchesHtml = '<ul class="boost-pfs-filter-item-swatch">';
					// }
					if (activeColors.length < 2) {
						try {
							window.setTimeout(function () {
								document.querySelector('.colors-' + data.id).setAttribute('style', 'opacity: 0;');
								document.querySelector('.color-title-' + data.id).setAttribute('style', 'opacity: 0;');
							}, 300)
						}catch(e){}
					}
					if (totalVariants > 100) {
						colorSwatchesHtml += '<li class="boost-pfs-filter-item-swatch-more">';
						colorSwatchesHtml += '<a href="{{itemUrl}}" title="More Color">+' + (totalVariants - 4) + '</a>';
						colorSwatchesHtml += '</li>';
						totalVariants = 0;
					}
				}
			}
			colorSwatchesHtml += '</ul>';
		}
		return colorSwatchesHtml;
	}

	// Build Color Swatches
	function eventColorSwatches(event) {
		jQ('.boost-pfs-filter-item-swatch li label').each(function(){
			var img = jQ(this).parents('.boost-pfs-filter-product-item-inner').find('.boost-pfs-filter-product-item-main-image');
			if(event == 'hover'){
				jQ(this).hover(function(){
					var newImage = jQ(this).data('img');
					img.attr('srcset', newImage);
				});
			}
			if(event == 'click'){
				jQ(this).click(function(){
					var newImage = jQ(this).data('img');
					img.attr('srcset', newImage);
				});
			}
		});
	}

	/************************** END BUILD PRODUCT ITEM ELEMENTS **************************/
	/************************** BUILD TOOLBAR **************************/
	// Build Pagination
	ProductPaginationDefault.prototype.compileTemplate = function(totalProduct) {
		if (!totalProduct) totalProduct = this.totalProduct;
		// Get page info
		var currentPage = parseInt(Globals.queryParams.page);
		var totalPage = Math.ceil(totalProduct / Globals.queryParams.limit);
		// If it has only one page, clear Pagination
		if (totalPage <= 1) {
			return '';
		}

		var paginationHtml = boostPFSTemplate.paginateHtml;
		// Build Previous
		var previousHtml = (currentPage > 1) ? boostPFSTemplate.previousActiveHtml : boostPFSTemplate.previousDisabledHtml;
		previousHtml = previousHtml.replace(/{{itemUrl}}/g, Utils.buildToolbarLink('page', currentPage, currentPage - 1));
		paginationHtml = paginationHtml.replace(/{{previous}}/g, previousHtml);
		// Build Next
		var nextHtml = (currentPage < totalPage) ? boostPFSTemplate.nextActiveHtml : boostPFSTemplate.nextDisabledHtml;
		nextHtml = nextHtml.replace(/{{itemUrl}}/g, Utils.buildToolbarLink('page', currentPage, currentPage + 1));
		paginationHtml = paginationHtml.replace(/{{next}}/g, nextHtml);
		// Create page items array
		var beforeCurrentPageArr = [];
		for (var iBefore = currentPage - 1; iBefore > currentPage - 3 && iBefore > 0; iBefore--) {
			beforeCurrentPageArr.unshift(iBefore);
		}
		if (currentPage - 4 > 0) {
			beforeCurrentPageArr.unshift('...');
		}
		if (currentPage - 4 >= 0) {
			beforeCurrentPageArr.unshift(1);
		}
		beforeCurrentPageArr.push(currentPage);
		var afterCurrentPageArr = [];
		for (var iAfter = currentPage + 1; iAfter < currentPage + 3 && iAfter <= totalPage; iAfter++) {
			afterCurrentPageArr.push(iAfter);
		}
		if (currentPage + 3 < totalPage) {
			afterCurrentPageArr.push('...');
		}
		if (currentPage + 3 <= totalPage) {
			afterCurrentPageArr.push(totalPage);
		}
		// Build page items
		var pageItemsHtml = '';
		var pageArr = beforeCurrentPageArr.concat(afterCurrentPageArr);
		for (var iPage = 0; iPage < pageArr.length; iPage++) {
			if (pageArr[iPage] == '...') {
				pageItemsHtml += boostPFSTemplate.pageItemRemainHtml;
			} else {
				pageItemsHtml += (pageArr[iPage] == currentPage) ? boostPFSTemplate.pageItemSelectedHtml : boostPFSTemplate.pageItemHtml;
			}
			pageItemsHtml = pageItemsHtml.replace(/{{itemTitle}}/g, pageArr[iPage]);
			pageItemsHtml = pageItemsHtml.replace(/{{itemUrl}}/g, Utils.buildToolbarLink('page', currentPage, pageArr[iPage]));
		}
		paginationHtml = paginationHtml.replace(/{{pageItems}}/g, pageItemsHtml);
		return paginationHtml;
	};

	// Build Sorting
	ProductSorting.prototype.compileTemplate = function() {
		var html = '';
		if (boostPFSThemeConfig.custom.show_sorting && boostPFSTemplate.hasOwnProperty('sortingHtml')) {
			var sortingArr = Utils.getSortingList();
			if (sortingArr) {
				var paramSort = Globals.queryParams.sort || '';
				// Build content
				var sortingItemsHtml = '';
				for (var k in sortingArr) {
					activeClass = '';
					if(paramSort == k) {
						activeClass = 'boost-pfs-filter-sort-item-active';
					}
					sortingItemsHtml += '<li><a href="#" data-sort="' + k + '" class="' + activeClass+ '">' + sortingArr[k] + '</a></li>';
				}
				html = boostPFSTemplate.sortingHtml.replace(/{{sortingItems}}/g, sortingItemsHtml);
			}
		}
		return html;
	};

	ProductSorting.prototype.render = function() {
		jQ(Selector.topSorting).html(this.compileTemplate());

		if (jQ('.boost-pfs-filter-custom-sorting').hasClass('boost-pfs-filter-sort-active')) {
			jQ('.boost-pfs-filter-custom-sorting').toggleClass('boost-pfs-filter-sort-active');
		}

		var labelSort = '';
		var paramSort = Globals.queryParams.sort || '';
		if (paramSort.length > 0) {
			var labelHandle = 'sorting_' + paramSort.replace(/\-/g, '_');
			labelSort = Labels[labelHandle];
		} else {
			labelSort = Labels.sorting_heading;
		}

		jQ('.boost-pfs-filter-custom-sorting button span span').text(labelSort);
	}

	// Build Sorting event
	ProductSorting.prototype.bindEvents = function() {
		var _this = this;
		jQ('.boost-pfs-filter-filter-dropdown a').click(function(e){
			e.preventDefault();
			FilterApi.setParam('sort', jQ(this).data('sort'));
			FilterApi.setParam('page', 1);
			FilterApi.applyFilter('sort');
		});

		jQ(".boost-pfs-filter-custom-sorting > button").click(function(){
			if (!jQ('.boost-pfs-filter-filter-dropdown').is(':animated')) {
				if (this.getAttribute('aria-expanded') === 'false') {
					this.setAttribute('aria-expanded', 'true');
				} else {
					this.setAttribute('aria-expanded', 'false');
				}
				jQ('.boost-pfs-filter-filter-dropdown').toggle().parent().toggleClass('boost-pfs-filter-sort-active');
			}
		});

		jQ(Selector.filterTreeMobileButton).click(function(){
			jQ('.boost-pfs-filter-top-sorting-mobile .boost-pfs-filter-filter-dropdown').hide();
		});
	};
	// For Toolbar - Build Display type
	ProductDisplayType.prototype.compileTemplate = function() {
		var itemHtml = '<span>' + boostPFSThemeConfig.label.toolbar_viewas + '</span>';
		itemHtml += '<a href="' + Utils.buildToolbarLink('display', 'list', 'grid') + '" title="Grid view" class="{{class.productDisplayType}}-item {{class.productDisplayType}}-grid" data-view="grid"><span class="icon-fallback-text"><span class="fallback-text">Grid view</span></span></a>';
		itemHtml += '<a href="' + Utils.buildToolbarLink('display', 'grid', 'list') + '" title="List view" class="{{class.productDisplayType}}-item {{class.productDisplayType}}-list" data-view="list"><span class="icon-fallback-text"><span class="fallback-text">List view</span></span></a>';
		itemHtml = itemHtml.replace(/{{class.productDisplayType}}/g, Class.productDisplayType);

		return itemHtml;
	};

	// Build Show Limit
	ProductLimit.prototype.compileTemplate = function() {
		var html = '';
		if (boostPFSThemeConfig.custom.show_limit && boostPFSTemplate.hasOwnProperty('showLimitHtml')) {

			var numberList = Settings.getSettingValue('general.showLimitList');
			if (numberList != '') {
				// Build content
				var showLimitItemsHtml = '';
				var arr = numberList.split(',');
				for (var k in sortingArr) {
					showLimitItemsHtml += '<option value="' + arr[k].trim() + '">' + arr[k].trim() + '</option>';
				}
				html = boostPFSTemplate.showLimitHtml.replace(/{{showLimitItems}}/g, showLimitItemsHtml);
			}
		}
		return html;
	};
	// Build Breadcrumb
	Breadcrumb.prototype.compileTemplate = function (colData) {
		if (!colData) colData = this.collectionData;
		var breadcrumbItemsHtml = '';
		if (boostPFSTemplate.hasOwnProperty('breadcrumbHtml')) {
			if (typeof colData !== 'undefined' && colData.hasOwnProperty('collection')) {
				var colInfo = colData.collection;
				if (typeof this.collectionTags !== 'undefined' && this.collectionTags !== null) {
					breadcrumbItemsHtml += boostPFSTemplate.breadcrumbItemLink.replace(/{{itemLink}}/g, '/collections/' + colInfo.handle).replace(/{{itemTitle}}/g, colInfo.title);
					breadcrumbItemsHtml += " {{breadcrumbDivider}} ";
					breadcrumbItemsHtml += boostPFSTemplate.breadcrumbItemSelected.replace(/{{itemTitle}}/g, this.collectionTags[0]);
				} else {
					breadcrumbItemsHtml += boostPFSTemplate.breadcrumbItemSelected.replace(/{{itemTitle}}/g, colInfo.title);
				}
			} else {
				breadcrumbItemsHtml += boostPFSTemplate.breadcrumbItemSelected.replace(/{{itemTitle}}/g, Settings.getSettingValue('label.defaultCollectionHeader'));
			}
		}
		return breadcrumbItemsHtml
	};
	/************************** END BUILD TOOLBAR **************************/
	function matchHeightImage() {
		// jQ('.boost-pfs-filter-product-item-main-image').load(function() {
		// 	var imageContainer = jQ(this).parent();
		// 	imageContainer.css('width', '100%').css('height', jQ(this).height());
		// }).each(function() {
		// 	if (this.complete) jQ(this).load();
		// });
	}

	// Add additional feature for product list, used commonly in customizing product list
	ProductList.prototype.afterRender = function (data) {
		if (!data) data = this.data;

		// Intergrate Review Shopify
		if (window.SPR && boostPFSThemeConfig.custom.show_product_review) {
			window.SPR.initDomEls();
			window.SPR.loadBadges();
		}
	};

	// Build additional elements
	Filter.prototype.afterRender = function(data) {
		if (!data) data = this.data;

		var totalProduct = data.total_product + '<span> ' + boostPFSThemeConfig.label.items_with_count_other + '</span>';
		if (data.total_product == 1) {
			totalProduct = data.total_product + '<span> ' + boostPFSThemeConfig.label.items_with_count_one + '</span>';
		}
		jQ('.boost-pfs-filter-total-product').html(totalProduct);
		matchHeightImage();
		jQ(window).resize(function() {
			matchHeightImage();
		});

		jQ('body').find('.boost-pfs-filter-skeleton-button').remove();

		// Prevent double tap on iOS
		var isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
		if (isiOS){
			Utils.isMobile()&&jQ(".boost-pfs-filter-product-item").find("a").on("touchstart",function(){isScrolling=!1}).on("touchmove",function(){isScrolling=!0}).on("touchend",function(){isScrolling||(window.location=jQ(this).attr("href"))});
		}

		// Build Image Swap
		swapImage(data);

		// Build Equal Height
		if (Globals.queryParams.display !== 'list'){
			equalHeight(data);
		};

		jQ(window).resize(function() {
			if (Globals.queryParams.display !== 'list'){
			equalHeight(data);
			}
		});

			// Build Event Color Swatch
		if(boostPFSThemeConfig.custom.swatch_color_event_change_image != 'none'){
			eventColorSwatches(boostPFSThemeConfig.custom.swatch_color_event_change_image);
		}

	};

	ProductListPlaceholder.prototype.render = function() {
		// Set limit number for product skeleton
		var placeholderLimit = this.settings.productsPerRow || this.settings.placeholderProductPerRow;
		// Build placeholder items
		var placeholderItem = this.compileTemplate();
		this.$element = [];
		for (var i = 0; i < placeholderLimit; i++) {
		  	this.$element.push(jQ(placeholderItem));
		}
		// Show placeholder before send filter request OR hide it after get filter data
		if (!this.isFetchedProductData) {
		  	this.setShow();
		} else {
		  	this.setHide();
		}
	}

	ProductListPlaceholder.prototype.compileTemplateExtra = function() {
		var display = Globals.queryParams.display
		switch (display) {
			case 'list':
			//Todo: Build placeholder for List mode
			var template = boostPFSTemplate.productListPlaceholderHtml;
			var imgRatioSetting = parseFloat(this.settings.placeholderImageRatio);
			var imgRatio = imgRatioSetting > 0 ? imgRatioSetting : 1.4; // It mean w1:h1.4
			/**
			 * Set product class for product skeleton (to set column, style, etc.)
			 * - If had defined product_grid_class in boostPFSThemeConfig => use this config ELSE use our setting
			 */
			break;
		}
		return template
		.replace(/{{class.filterProductSkeleton}}/g, Class.filterProductSkeleton)
		.replace(/{{class.filterSkeleton}}/g, Class.filterSkeleton)
		.replace(/{{class.filterSkeletonText}}/g, Class.filterSkeletonText)
		.replace(/{{paddingTop}}/g, imgRatio * 100)
	}

	/* Prevent conflict with theme vendor js */
	Array.prototype.insert = function(a, b) {}

	/* Math qual Height */
	function equalHeight(data) {
		var equal_height = boostPFSFilterConfig.general.equal_height;

		if(equal_height != 'false'){
			var cropImagePosition = boostPFSFilterConfig.general.cropImagePossitionEqualHeight;
			var equal_i = -1;
			var equal_els = [];
			var equal_element = null;
			var widthImage = jQ('.boost-pfs-filter-product-item').width();
			var indexData = 0;


			// Equal Height Title
			jQ('.boost-pfs-filter-product-item').each(function(i, element) {

				var offsetTop = jQ(element).offset().top;
				if(!equal_element || equal_element.offset().top !== offsetTop) {
					equal_element = jQ(element);
					equal_i++;
				}

				if(!equal_els[equal_i]) {
					equal_els[equal_i] = [];
				}
				equal_els[equal_i].push(element);
			});


			// // For Auto
			// if(equal_height == 'auto'){
			//     for(var i = 0; i < equal_els.length; i++) {
			//       var max = 0;
			//       var maxRatio = 0;
			//       var iLength = equal_els[i].length;

			//       for(var j = 0; j < equal_els[i].length; j++) {
			//         var item = equal_els[i][j];
			//         var height = jQ(item).find('.boost-pfs-filter-product-item-title').height();
			//         max = Math.max(max, height);

			//         indexData = (i * iLength) + j;
			//         if (typeof(data[indexData]) != 'undefined') {
			//           var images = data[indexData].images_info;
			//           if(images.length > 0){
			//             var ratioImage = images[0].height / images[0].width;
			//             maxRatio = Math.max(maxRatio, ratioImage);
			//         	}
			//         }
			//       }

			//       jQ(equal_els[i]).find('.boost-pfs-filter-product-item-title').css({'min-height': max});

			//       var maxHeightImage = widthImage * maxRatio;
			//       jQ(equal_els[i]).find('.boost-pfs-filter-product-item-image-link').css({'padding-top': maxHeightImage}).addClass('boost-pfs-filter-crop-image-position-' + cropImagePosition);
			//     }
			//   }

			// For Ratio
			if(equal_height != 'false' && equal_height != 'auto'){
			var heightImage = 0;
			var widthImage = jQ('.boost-pfs-filter-product-item').width();
			if(equal_height != 'false' && equal_height != 'auto'){
				var ratioWidthHeight = boostPFSThemeConfig.custom.equal_height;
			} else {
				var ratioWidthHeight = '';
			}

			var ratioWidthHeightOther = boostPFSThemeConfig.custom.ratio_width_height_other;
			if (ratioWidthHeightOther == '' &&  ratioWidthHeight == ''){
				return null;
			} else {
				if (ratioWidthHeightOther == '') {
				ratioWidthHeight = ratioWidthHeight.split(':');
				ratioWidthHeight = parseInt(ratioWidthHeight[1]) / parseInt(ratioWidthHeight[0]);
				heightImage = widthImage * ratioWidthHeight;
				} else if (ratioWidthHeightOther != '')  {
				ratioWidthHeightOther = ratioWidthHeightOther.split(':');
				ratioWidthHeightOther = parseInt(ratioWidthHeightOther[1]) / parseInt(ratioWidthHeightOther[0]);
				heightImage = widthImage * ratioWidthHeightOther;
				}
			}
			jQ('.boost-pfs-filter-product-item-image-link').css({'padding-top': heightImage + 'px'}).addClass('boost-pfs-filter-crop-image-position-' + cropImagePosition);;

			}
    	}
 	}

	// Swap Image
	function swapImage(data) {
		if (!Utils.isMobile()) {
			if (boostPFSThemeConfig.custom.active_image_swap) {
				var thumbUrl = Utils.getFeaturedImage(images, '260x');

				jQ(".boost-pfs-filter-product-item").each(function(){
					var flipImageUrl = jQ(this).find('.boost-pfs-filter-product-item-main-image').data('img-flip');
					var flipImageSrcset= jQ(this).find('.boost-pfs-filter-product-item-main-image').data('img-flip-srcset');;

					var html = '<img class="boost-pfs-filter-product-item-flip-image lazyload Image--lazyLoad"' +
					'data-srcset="' + flipImageSrcset + '" ' +
					'data-src="' + flipImageUrl + '" ' +
					'data-widths="[180, 260, 360, 480]" ' +
					'data-sizes="auto" ' +
					'src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" ' +
					'alt="' + data.title + '" />';
					jQ(this).find('.boost-pfs-filter-product-item-image-link').prepend(html);
				});
			}
		}
	}
})();

	function adswerveClickSearch(index) {
		window.dataLayer = window.dataLayer || [];
		window.dataLayer.push({
				'event': 'site-search-click',
				'searchTerm': document.location.href.split('q=')[1],
				'searchResults': productCount,
				'searchCategory': 'products',
				'searchResultPosition': index,
				'searchType': ''
		});
	}

	function adswerveClickProduct(list, id, name, category, brand, variant, price, order) {
		window.dataLayer = window.dataLayer || [];
		window.dataLayer.push({
			'event': 'product-click',
			'ecommerce': {
				'currencyCode': '',
				'click': {
					'actionField': {
						'list': list
					},
					'products': [
						{
							'list': list,
							'position': order,
							'id': id,
							'name': name,
							'category': category,
							'brand': brand,
							'variant': variant,
							'price': price
						}
					]
				}
			}
		});
	}
