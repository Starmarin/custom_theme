<template>
  <form class="pb-e24" @submit.prevent="() => false" method="post" action="/cart/add" :data-productid="product.id">
    <!-- product swatches -->
    <div v-if="product_types.product_type_1" class="option-set flex flex-wrap justify-start py-2 pt-4 items-center px-0 md:px-6">
      <div class="w-full flex justify-between items-center font-medium text-e16 tracking-tighter mb-3">
        <p class="font-primary font-bold flex items-center text-megamenu_sub uppercase tracking-widest">{{ state.language.product_type }} <span class="font-body capitalize text-xs ml-2 tracking-normal">{{ productType }}</span></p>
      </div>
      <span class="flex">
        <a :href="product_type.url" v-for="product_type in product_types" :key="product_type.handle">
          <div v-if="product_type.available">
            <img 
              class="border w-e74 h-e74 object-contain mr-2 transition-all duration-200 hover:border-black" 
              :class="activeProduct(product_type.handle, product_type.type)" 
              :src="product_type.featured_image" 
              />
          </div>
        </a>
      </span>
    </div>

    <div v-if="product.metafields.pdp.countdown_timer_end_date && compareDates" class="countdown w-full my-4 md:my-6 p-4 text-center" :style="countdownStyle">
          <h3 v-if="product.metafields.pdp.countdown_headline_text" class="countdown_title uppercase font-bold text-e28 tracking-wide">{{product.metafields.pdp.countdown_headline_text}}</h3>
          <p class="countdown_text uppercase" style="word-spacing: 4px">
            <span class="font-semibold tracking-wider" v-if="product.metafields.pdp.countdown_sub_header_text_1">
              {{product.metafields.pdp.countdown_sub_header_text_1}}
            </span> 
            <span class="font-semibold tracking-wider" v-if="product.metafields.pdp.countdown_promocode" :style="{color: product.metafields.pdp.accent_text_color_1}">
              {{product.metafields.pdp.countdown_promocode}}
            </span> 
            <span class="font-semibold tracking-wider" v-if="product.metafields.pdp.countdown_sub_header_text_2">
              {{product.metafields.pdp.countdown_sub_header_text_2}}
            </span> 
          </p>
          <p v-if="product.metafields.pdp.available_in_text" class="countdown_text font-semibold tracking-wider opacity-50 my-e5">{{product.metafields.pdp.available_in_text}}</p>
          <Countdown 
            :endtime="product.metafields.pdp.countdown_timer_end_date"
            :bgcolor="product.metafields.pdp.accent_text_color_2"
            :slotcolor="product.metafields.pdp.primary_text_color"
            :shortslot="false"
            ></Countdown>
          <ProgressBar
            v-if="product.metafields.pdp.enable_progress_bar == 1"
            :endtime="product.metafields.pdp.countdown_timer_end_date" 
            :start="product.metafields.pdp.countdown_timer_start_date"
            :background="product.metafields.pdp.primary_text_color"
            :fill="product.metafields.pdp.accent_text_color_1">
          </ProgressBar>
    </div>

    <div v-else >
      <template v-if="!product.has_only_default_variant">
        <div v-for="(option, optionIndex) of product.options_with_values" :key="option.name" class="option-set py-2 pt-0 items-center md:px-6">
          <div class="w-full flex justify-between items-center font-medium text-e16 tracking-tighter mb-3">
            <p class="font-primary font-bold flex items-center text-megamenu_sub uppercase tracking-widest">{{option.name }} <span class="font-body capitalize text-xs ml-2 tracking-normal">{{ selectedOptions[optionIndex] }}</span></p>
            <button class="cursor-pointer border border-transparent focus:border-primary-500" @click="openSizeChart()" v-show="isSizeOption(option) && hasSizeChart">
              <span class="underline text-xs uppercase text-primary-500 font-bold font-primary tracking-wider">{{ state.language.size_chart }}</span>
            </button>
          </div>
          <span v-if="isColorOption(option)" class="flex">
            <VariantSwatch v-show="option.values.length > 1" class="mr-e6 color-swatch mb-e16 md:mb-e24" :option="option.name" :swatch="value" v-for="value in option.values" :key="value" :color="value" :size="44" :class="{ disabled: !optionValueHasInStockVariant(optionIndex, value) }" :active="value === selectedOptions[optionIndex]" @click="setOptionByIndex({ index: optionIndex, value })" />
          </span>
          <span v-else-if="!isSizeOption(option) && option.values.length > 4">
            <Dropdown 
              class="accent-two w-full mb-e16 md:mb-e24" 
              :option-available="(value) => optionValueHasInStockVariant(optionIndex, value)" 
              :placeholder="state.language.select_option" 
              :aria-label="option.name" :options="dropdownOptions(option.values)" 
              :selected="selectedOptions[optionIndex]" 
              @select="(value) => setOptionByIndex({ index: optionIndex, value })" />
          </span>
          <span v-else class="flex flex-wrap">
            <button 
              class="mr-e6 mb-e16 md:mb-e24 variant-btn cursor-pointer btn--variant  px-e16  font-body h-11 flex items-center justify-center font-semibold text-xs border border-gray-breadcrumbs bg-gray-200 hover:text-white hover:bg-gray-600 transition-all duration-300 focus:border-util-focus" 
              v-for="value in option.values" 
              :key="value" 
              :size="44" 
              :class="{ disabled: !optionValueHasInStockVariant(optionIndex, value), 'w-11 px-0': isSizeOption(option) }" 
              :active="value === selectedOptions[optionIndex]" 
              :data-productid="selectedVariant.id"
              @click="setOptionByIndex({ index: optionIndex, value })" >
              {{ value }}
            </button>
          </span>
        </div>
      </template>
      <transition-group name="fade-absolute" mode="in-out">
        <div v-if="addToCartStates.normal || addToCartStates.preorder || addToCartStates.backorder" class="flex flex-col px-0 md:px-6 mt-3 md:mt-e22" key="atc">
          <div v-if="!isGiftCard" class="flex mb-2">
            <div class="w-e78 min-w-e78"  id="pfCustomizeProductAnchor">
              <Dropdown :aria-label="state.language.quantity" class="pdp__quantity-dropdown" :options="quantityDropdownOptions" :selected="quantity" @select="(value) => setQuantity(value)" />
              <input v-if="product.metafields.pdp.is_customizable" class="hidden" type="text" name="quantity" min="1" :value="quantity">
            </div>
            <div class="w-full ml-4 flex justify-between items-center">
              <p class="font-body font-semibold text-megamenu_sub" v-if="selectedVariant.inventory_quantity <= 0 && selectedVariant.inventory_policy !== 'continue' && selectedVariant.available !== true">{{ state.language.out_of_stock }}</p>
              <p class="font-body font-semibold text-megamenu_sub" v-else-if="selectedVariant.inventory_quantity < product.metafields.pdp.low_stock_threshold && selectedVariant.inventory_quantity > 0">{{ state.language.only }} {{ selectedVariant.inventory_quantity }} {{ state.language.left }}!</p>
              <p class="font-body font-semibold text-megamenu_sub" v-else-if="selectedVariant.available">{{ state.language.available }}</p>
              <p v-if="selectedVariant.sku !== ''" class="font-body font-semibold text-xs hidden md:block">SKU {{ selectedVariant.sku }}</p>
            </div>
          </div>

          <ProductProvider>
            <ProductCrossSells class="w-full"></ProductCrossSells>
          </ProductProvider>
          <select v-if="product.metafields.pdp.is_customizable" name="id" v-model="selectedVariant.id" class="product-form__variants hidden">
            <option v-for="variant in product.variants" :value="variant.id" v-html="variant.title"></option>
          </select>
          <!-- subscription product -->
          <div v-if="product.type === 'Subscription' && product.metafields.pdp.is_subscription" class="subscription_widget mt-4">
            <div class="flex justify-between">
              <h3 v-if="product.metafields.pdp.subscriptions_block_title" class="uppercase text-e24 font-bold tracking-wide">{{ product.metafields.pdp.subscriptions_block_title }}</h3>
              <button 
                v-if="state.language.whats_this_text"
                @click="subscriptionInfo = true" 
                class="font-primary font-bold tracking-wide uppercase text-e12 underline cursor-pointer focus:border-util-focus">
                {{ state.language.whats_this_text}}
              </button>
            </div>
            <div v-for="sellingPlan in sellingsPlans" :key="sellingPlan.key" v-show="product.metafields.pdp.onetime_text || sellingPlan.key === 'subscriptions'" class="subscription_selector mb-3 py-e20 pr-e20 pl-e50 flex flex-col" :class="[plan === sellingPlan.key && !productExclusionCheck ? 'is_active' : '']">
              <input :disabled="productExclusionCheck" class="hidden" type="radio" :id="sellingPlan.key" name="selling_plan" v-model="plan" :value="sellingPlan.key" />
              <label :for="sellingPlan.key" v-html="sellingPlan.text" class="relative font-body text-e16"></label>
            </div>
            <p class="text-center font-body font-semibold text-e13 mt-4" v-if="state.language.shipping_by_text && product.metafields.pdp.expected_to_ship_date && !productExclusionCheck">
              {{ state.language.shipping_by_text }} <span class="font-body font-semibold text-e13 text-blue-200">{{ product.metafields.pdp.expected_to_ship_date }} </span>
            </p>
            <button
              v-if="!product.metafields.pdp.cross_products.cross_product_1"
              :disabled="productExclusionCheck"
              id="a2c_btn"
              name="add"
              @click="onAddToCart()"
              class="btn relative overflow-hidden inline-flex justify-center
                transition-colors ease-linear duration-200 text-white uppercase border-2 flex
                justify-center items-center border-transparent hover:bg-color-blue-700 focus:bg-color-blue-700
                focus:text-gray-300 focus:border-util-focus py-3 px-0 rounded-e2 w-full mt-e16 mb-2"
              :class="[plan === 'onetime' ? 'bg-text-dark2' : 'bg-text-accent2']"
              v-html="subscriptionBtnText"
            ></button>
            <div v-if="product.metafields.pdp.subscription_end_date && subscriptionDates" class="countdown w-full p-4 text-center" style="border: none" :style="subCountdownStyle">
              <h3 v-if="product.metafields.pdp.subscription_countdown_title" :style="{ color: product.metafields.pdp.subscription_countdown_title_color }" class="uppercase font-semibold text-e16 mb-4 tracking-wide">{{ product.metafields.pdp.subscription_countdown_title }}</h3>
              <Countdown :endtime="product.metafields.pdp.subscription_end_date" :bgcolor="product.metafields.pdp.subscription_timer_bg_color" :slotcolor="product.metafields.pdp.subscription_timer_bg_color" :shortslot="false" />
              <p class="text-e13 font-body mt-4" v-if="product.metafields.pdp.subscription_countdown_text">{{ product.metafields.pdp.subscription_countdown_text }}</p>
            </div>
          </div>
          <!-- end subscription product -->
          <div v-else>
            <BtnPrimary  :disabled="productExclusionCheck" v-if="!product.metafields.pdp.cross_products.cross_product_1" id="a2c_btn" name="add" @click="onAddToCart()" class="w-full mt-4 font-bold tracking-header md:mt-6" :style="{display: visibilityBtn}" v-html="btnCTAText"></BtnPrimary>
			        <div v-if="product.metafields.pdp.is_customizable">
                <button type="submit" class="hidden"></button>
                <button type="button" class="uppercase flex text-e16 items-center font-bold tracking-header py-3 w-full mt-0 text-black nline-flex justify-center
                  transition-colors ease-linear duration-200 mb-e16" :style="{backgroundColor: state.settings.customizable_btn_bg_color, color: state.settings.customizable_btn_text_color }" id="pfCustomizeProductBtn">
                  <Icon name="customizable" size="18px" class="mr-2" :style="{fill: state.settings.customizable_btn_text_color}"></Icon>
                  {{state.language.personalization_btn}}
                </button>
              </div>
            <BtnSecondary v-if="product.metafields.pdp.enable_buy_it_now == 1 && !product.metafields.pdp.cross_products.cross_product_1" @click="onBuyItNow()" class="w-full h-e50">{{ state.language.buy_now }}</BtnSecondary>
          </div>
          <p v-if="productExclusionCheck" class="font-body mt-2 text-sm">
            {{ state.language.product_exclusion_text }}
          </p>
          <p class="font-body text-megamenu_sub text-black mt-4 text-center" v-if="product.metafields.pdp.preorder_text !== null"><span class="text-primary-500 font-bold font-body">Notice: </span>{{ product.metafields.pdp.preorder_text }}</p>
        </div>
        <!-- back in stock form -->
        <div class="hidden" v-else-if="addToCartStates.outOfStock" key="oos">
          <p class="text-e14 leading-8">This product is out of stock. Please submit your email to be notified when it returns.</p>
          <div class="flex flex-no-wrap items-start mt-e16">
            <InputText class="rounded-e4 w-full" v-model="notificationEmail" :error-message="notificationErrorMessage" :valid="notificationValid" label="Email"></InputText>
            <BtnPill style="height: 46px" @click="onNotificationSubmit" class="ml-e8 items-center">{{ notificationStateMap[selectedVariant.id] ? 'Submitted' : 'Submit' }}</BtnPill>
          </div>
        </div>
        <div v-else-if="addToCartStates.unavailable" class="flex flex-no-wrap" key="atc">
          <Dropdown :aria-label="state.language.quantity" class="w-e72 shadow-none" :options="quantityDropdownOptions" :selected="quantity" @select="(value) => setQuantity(value)" />
          <BtnPrimary class="w-full ml-e4" disabled>Unavailable</BtnPrimary>
        </div>
      </transition-group>
    </div>
    <h3 class="font-primary font-bold text-md md:text-megamenu_top uppercase tracking-wider mt-6 px-0 md:px-6" v-if="product.metafields.pdp.short_description_heading !== null">{{ product.metafields.pdp.short_description_heading }}</h3>
    <div class="description-text my-2 px-0 md:px-6" v-if="product.metafields.pdp.short_description_text !== null" v-html="product.metafields.pdp.short_description_text"></div>

    <div class="featured-superstar mt-4 border-t border-gray-300 pt-4 flex items-center mx-0 md:mx-6" v-if="hasSuperstarCollection && showSuperstarIcon">
      <a class="font-secondary font-bold text-megamenu_sub capitalize flex items-center" :href="superstarUrl">
        <img class='w-10 h-10 object-contain min-w-e40 min-h-e40 mr-2 rounded-full' v-if="superstarImg" :src="superstarImg" :alt="superstarName">{{ superstarName }}
      </a>
      <Icon name="arrow-right" size="18px" class="ml-2"></Icon>
    </div>

    <AccordionGroup class="mobile-expand">
      <Accordion v-if="product.description !== ''" class="pl-3 md:pl-6 bg-gray-breadcrumbs my-4" :header-classes="['flex', 'justify-between', 'items-center', 'w-full']">
        <p slot="heading" class="text-megamenu_top font-primary uppercase font-bold tracking-wider">{{ state.language.details }}</p>
        <template slot="icons">
          <div class="bg-gray-700 hover:bg-btn-secondary_hover p-4">
            <Icon class="text-white transition-all duration-300" name="chevron-down" size="14px"></Icon>
          </div>
        </template>
        <div slot="content" class="py-3 pb-5 md:pb-3 pr-3 accordion-content">
          <div v-html="product.description"></div>
        </div>
      </Accordion>
      <Accordion v-if="product.metafields.pdp.heading_text !== null" class="pl-3 md:pl-6 bg-gray-breadcrumbs my-4" :header-classes="['flex', 'justify-between', 'items-center', 'w-full']">
        <p slot="heading" class="text-megamenu_top font-primary uppercase font-bold tracking-wider">{{ product.metafields.pdp.heading_text }}</p>
        <template slot="icons">
          <div class="bg-gray-700 hover:bg-btn-secondary_hover p-4">
            <Icon class="text-white transition-all duration-300" name="chevron-down" size="14px"></Icon>
          </div>
        </template>
        <div slot="content" class="py-3 pr-3 pb-5 md:pb-3 accordion-content">
          <div v-html="product.metafields.pdp.description"></div>
        </div>
      </Accordion>
    </AccordionGroup>

    <div v-if="product.metafields.pdp.icons_image.length > 0" class="bg-gray-breadcrumbs p-6 pb-0 w-full flex flex-wrap justify-center mobile-expand md:px-6">
      <div class="flex flex-col items-center w-1/2 mb-7" v-for="(icon, index) in product.metafields.pdp.icons_image" :key="icon.key">
        <img :alt="product.metafields.pdp.icons_line_one[index] + ' ' + product.metafields.pdp.icons_line_two[index]" class="w-10" :src="product.metafields.pdp.icons_image[index]" />
        <p class="text-center font-body text-xs">{{ product.metafields.pdp.icons_line_one[index] }}</p>
        <p class="text-center font-body text-xs">{{ product.metafields.pdp.icons_line_two[index] }}</p>
      </div>
    </div>

    <ProductProvider>
      <ProductCompleteLook class="w-full mobile-expand block md:hidden"></ProductCompleteLook>
    </ProductProvider>    

    <button
      class="block bg-black opacity-50 fixed top-0 left-0 w-full h-full z-60"
      @click="sizeChartOpen = false"
      v-if="sizeChartOpen"
      v-scroll-lock="sizeChartOpen"
    ></button>
    <ProductProvider>
      <ModalWithOverlay :open="sizeChartOpen" @update:open="sizeChartOpen = false" class="block modal-no-padding">
        <button
          class="absolute right-0 top-0 p-1 transition-colors duration-300 focus:shadow-outline z-80"
          @click="sizeChartOpen = false"
        > 
          <Icon name="modal-close" size="56px" class="bg-gray-200 text-black hover:text-primary-500 transition-all duration-200 p-e18"></Icon>
        </button>
        <div class="flex bg-gray-200">
          <button 
            :class="[sizeChartTab === 'sizeChart' ? 'bg-white text-black' : 'bg-gray-200 text-gray-discount']" 
            @click="sizeChartTab = 'sizeChart'" 
            class="py-e18 font-primary font-bold uppercase text-md px-10 cursor-pointer border border-transparent focus:border-util-focus"
          >
            {{ state.language.size_chart }}
          </button>
          <button 
            :class="[sizeChartTab === 'fits' ? 'bg-white text-black' : 'bg-gray-200 text-gray-discount']" 
            @click="sizeChartTab = 'fits'" 
            class="py-e18 font-primary font-bold uppercase text-md px-10 cursor-pointer border border-transparent focus:border-util-focus"
            v-if="sizeChart.show_fit_tab === 1"
          >
            {{ state.language.fits }}
          </button>
        </div>
        <div v-if="sizeChartTab === 'sizeChart'" class="py-15 px-0 md:px-e120 overflow-y-scroll h-e500 md:h-full">
          <p 
            v-if="sizeChart.size_chart_description !== null" 
            v-html="sizeChart.size_chart_description" 
            class="size-chart-description font-body text-megamenu_sub text-gray-800 px-3 md:px-0 text-center">
          </p>
          <div class="flex justify-center mt-9" role="tablist">
            <button 
              v-if="sizeChart.size_chart_1_title !== null" 
              tabindex="0"
              role="tab"
              id="size_chart_tab_1"
              @click="changeSizeSubTab(1)"
              class="font-secondary font-bold text-xs text-black uppercase border-b-2 pb-e2 mr-6 cursor-pointer transition-all duration-300"
              :class="[sizeChartSubTab === 1 ? 'border-primary-500' : 'border-transparent']"
            >
              {{ sizeChart.size_chart_1_title }}
            </button>
            <button 
              v-if="sizeChart.size_chart_2_title !== null" 
              tabindex="0"
              role="tab"
              id="size_chart_tab_2"
              @click="changeSizeSubTab(2)"
              class="font-secondary font-bold text-xs text-black uppercase border-b-2 pb-e2 mr-6 cursor-pointer transition-all duration-300"
              :class="[sizeChartSubTab === 2 ? 'border-primary-500' : 'border-transparent']"
            >
              {{ sizeChart.size_chart_2_title }}
            </button>
          </div>
          <div v-show="sizeChartSubTab === 1" class="mt-10" role="tabpanel" id="size_chart_tabpanel_1" aria-labelledby="size_chart_tab_1">

            <div class="table-scroll relative w-full z-1 m-auto overflow-auto">
              <table class="main-table w-full m-auto border-separate md:min-w-e750">
                <thead>
                  <tr>
                    <th class="w-e120 md:w-e120 md:max-w-e120 font-secondary font-bold uppercase text-xs uppercase text-white text-left px-6 py-4 bg-gray-700 border-r border-white">Size</th>
                    <th v-if="sizeChart.sc_1_2xs != ''" class="w-1/8 md:max-w-e78 font-secondary font-bold uppercase text-xs uppercase text-white text-center px-6 py-4 bg-gray-700">2XS</th>
                    <th v-if="sizeChart.sc_1_xs != ''" class="w-1/8 md:max-w-e78 font-secondary font-bold uppercase text-xs uppercase text-white text-center px-6 py-4 bg-gray-700">XS</th>
                    <th v-if="sizeChart.sc_1_s != ''" class="w-1/8 md:max-w-e78 font-secondary font-bold uppercase text-xs uppercase text-white text-center px-6 py-4 bg-gray-700">S</th>
                    <th v-if="sizeChart.sc_1_m != ''" class="w-1/8 md:max-w-e78 font-secondary font-bold uppercase text-xs uppercase text-white text-center px-6 py-4 bg-gray-700">M</th>
                    <th v-if="sizeChart.sc_1_l != ''" class="w-1/8 md:max-w-e78 font-secondary font-bold uppercase text-xs uppercase text-white text-center px-6 py-4 bg-gray-700">L</th>
                    <th v-if="sizeChart.sc_1_xl != ''" class="w-1/8 md:max-w-e78 font-secondary font-bold uppercase text-xs uppercase text-white text-center px-6 py-4 bg-gray-700">XL</th>
                    <th v-if="sizeChart.sc_1_2xl != ''" class="w-1/8 md:max-w-e78 font-secondary font-bold uppercase text-xs uppercase text-white text-center px-6 py-4 bg-gray-700">2XL</th>
                    <th v-if="sizeChart.sc_1_3xl != ''" class="w-1/8 md:max-w-e78 font-secondary font-bold uppercase text-xs uppercase text-white text-center px-6 py-4 bg-gray-700">3XL</th>
                    <th v-if="sizeChart.sc_1_4xl != ''" class="w-1/8 md:max-w-e78 font-secondary font-bold uppercase text-xs uppercase text-white text-center px-6 py-4 bg-gray-700">4XL</th>
                    <th v-if="sizeChart.sc_1_5xl != ''" class="w-1/8 md:max-w-e78 font-secondary font-bold uppercase text-xs uppercase text-white text-center px-6 py-4 bg-gray-700">5XL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr 
                    v-for="(sizeRow, sizeIndex) in sizeChart.sc_1_row_title" :key="sizeRow[sizeIndex]" 
                    :class="[sizeIndex % 2 === 0 ? 'bg-gray-200' : 'bg-white']"
                  >
                    <th 
                      class="w-e120 px-6 py-4 font-body font-semibold text-xs capitalize text-black text-left border-r border-black shadow-chart"
                      :class="[sizeIndex % 2 === 0 ? 'bg-gray-200' : 'bg-white']"
                    >
                      {{ sizeChart.sc_1_row_title[sizeIndex] }}
                    </th>
                    <td v-if="sizeChart.sc_1_2xs != ''" class="font-body font-semibold text-xs uppercase text-black text-center px-6 py-4 align-middle">{{ sizeChart.sc_1_2xs[sizeIndex] }}</td>
                    <td v-if="sizeChart.sc_1_cf_xs != ''" class="font-body font-semibold text-xs uppercase text-black text-center px-6 py-4 align-middle">{{ sizeChart.sc_1_cf_xs[sizeIndex] }}</td>
                    <td v-if="sizeChart.sc_1_cf_s != ''" class="font-body font-semibold text-xs uppercase text-black text-center px-6 py-4 align-middle">{{ sizeChart.sc_1_cf_s[sizeIndex] }}</td>
                    <td v-if="sizeChart.sc_1_cf_m != ''" class="font-body font-semibold text-xs uppercase text-black text-center px-6 py-4 align-middle">{{ sizeChart.sc_1_cf_m[sizeIndex] }}</td>
                    <td v-if="sizeChart.sc_1_cf_l != ''" class="font-body font-semibold text-xs uppercase text-black text-center px-6 py-4 align-middle">{{ sizeChart.sc_1_cf_l[sizeIndex] }}</td>
                    <td v-if="sizeChart.sc_1_cf_xl != ''" class="font-body font-semibold text-xs uppercase text-black text-center px-6 py-4 align-middle">{{ sizeChart.sc_1_cf_xl[sizeIndex] }}</td>
                    <td v-if="sizeChart.sc_1_2xl != ''" class="font-body font-semibold text-xs uppercase text-black text-center px-6 py-4 align-middle">{{ sizeChart.sc_1_2xl[sizeIndex] }}</td>
                    <td v-if="sizeChart.sc_1_3xl != ''" class="font-body font-semibold text-xs uppercase text-black text-center px-6 py-4 align-middle">{{ sizeChart.sc_1_3xl[sizeIndex] }}</td>
                    <td v-if="sizeChart.sc_1_4xl != ''" class="font-body font-semibold text-xs uppercase text-black text-center px-6 py-4 align-middle">{{ sizeChart.sc_1_4xl[sizeIndex] }}</td>
                    <td v-if="sizeChart.sc_1_5xl != ''" class="font-body font-semibold text-xs uppercase text-black text-center px-6 py-4 align-middle">{{ sizeChart.sc_1_5xl[sizeIndex] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div v-show="sizeChartSubTab === 2" class="mt-10" role="tabpanel" id="size_chart_tabpanel_2" aria-labelledby="size_chart_tab_2">
            <div class="table-scroll relative w-full z-1 m-auto overflow-auto">
              <table class="main-table w-full m-auto border-separate md:min-w-e750">
                <thead>
                  <tr>
                    <th class="w-e120 md:w-e120 md:max-w-e120 font-secondary font-bold uppercase text-xs uppercase text-white text-left px-6 py-4 bg-gray-700 border-r border-white">Size</th>
                    <th v-if="sizeChart.sc_2_2xs != ''" class="w-1/8 md:max-w-e78 font-secondary font-bold uppercase text-xs uppercase text-white text-center px-6 py-4 bg-gray-700">2XS</th>
                    <th v-if="sizeChart.sc_2_cf_xs != ''" class="w-1/8 md:max-w-e78 font-secondary font-bold uppercase text-xs uppercase text-white text-center px-6 py-4 bg-gray-700">XS</th>
                    <th v-if="sizeChart.sc_2_cf_s != ''" class="w-1/8 md:max-w-e78 font-secondary font-bold uppercase text-xs uppercase text-white text-center px-6 py-4 bg-gray-700">S</th>
                    <th v-if="sizeChart.sc_2_cf_m != ''" class="w-1/8 md:max-w-e78 font-secondary font-bold uppercase text-xs uppercase text-white text-center px-6 py-4 bg-gray-700">M</th>
                    <th v-if="sizeChart.sc_2_cf_l != ''" class="w-1/8 md:max-w-e78 font-secondary font-bold uppercase text-xs uppercase text-white text-center px-6 py-4 bg-gray-700">L</th>
                    <th v-if="sizeChart.sc_2_cf_xl != ''" class="w-1/8 md:max-w-e78 font-secondary font-bold uppercase text-xs uppercase text-white text-center px-6 py-4 bg-gray-700">XL</th>
                    <th v-if="sizeChart.sc_2_2xl != ''" class="w-1/8 md:max-w-e78 font-secondary font-bold uppercase text-xs uppercase text-white text-center px-6 py-4 bg-gray-700">2XL</th>
                    <th v-if="sizeChart.sc_2_3xl != ''" class="w-1/8 md:max-w-e78 font-secondary font-bold uppercase text-xs uppercase text-white text-center px-6 py-4 bg-gray-700">3XL</th>
                    <th v-if="sizeChart.sc_2_4xl != ''" class="w-1/8 md:max-w-e78 font-secondary font-bold uppercase text-xs uppercase text-white text-center px-6 py-4 bg-gray-700">4XL</th>
                    <th v-if="sizeChart.sc_2_5xl != ''" class="w-1/8 md:max-w-e78 font-secondary font-bold uppercase text-xs uppercase text-white text-center px-6 py-4 bg-gray-700">5XL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr 
                    v-for="(sizeRow, sizeIndex) in sizeChart.sc_2_row_title" :key="sizeRow[sizeIndex]" 
                    :class="[sizeIndex % 2 === 0 ? 'bg-gray-200' : 'bg-white']"
                  >
                    <th 
                      class="w-e120 px-6 py-4 font-body font-semibold text-xs capitalize text-black text-left border-r border-black shadow-chart"
                      :class="[sizeIndex % 2 === 0 ? 'bg-gray-200' : 'bg-white']"
                    >
                      {{ sizeChart.sc_2_row_title[sizeIndex] }}
                    </th>
                    <td v-if="sizeChart.sc_2_2xs != ''" class="font-body font-semibold text-xs uppercase text-black text-center px-6 py-4 align-middle">{{ sizeChart.sc_2_2xs[sizeIndex] }}</td>
                    <td v-if="sizeChart.sc_2_cf_xs != ''" class="font-body font-semibold text-xs uppercase text-black text-center px-6 py-4 align-middle">{{ sizeChart.sc_2_cf_xs[sizeIndex] }}</td>
                    <td v-if="sizeChart.sc_2_cf_s != ''" class="font-body font-semibold text-xs uppercase text-black text-center px-6 py-4 align-middle">{{ sizeChart.sc_2_cf_s[sizeIndex] }}</td>
                    <td v-if="sizeChart.sc_2_cf_m != ''" class="font-body font-semibold text-xs uppercase text-black text-center px-6 py-4 align-middle">{{ sizeChart.sc_2_cf_m[sizeIndex] }}</td>
                    <td v-if="sizeChart.sc_2_cf_l != ''" class="font-body font-semibold text-xs uppercase text-black text-center px-6 py-4 align-middle">{{ sizeChart.sc_2_cf_l[sizeIndex] }}</td>
                    <td v-if="sizeChart.sc_2_cf_xl != ''" class="font-body font-semibold text-xs uppercase text-black text-center px-6 py-4 align-middle">{{ sizeChart.sc_2_cf_xl[sizeIndex] }}</td>
                    <td v-if="sizeChart.sc_2_2xl != ''" class="font-body font-semibold text-xs uppercase text-black text-center px-6 py-4 align-middle">{{ sizeChart.sc_2_2xl[sizeIndex] }}</td>
                    <td v-if="sizeChart.sc_2_3xl != ''" class="font-body font-semibold text-xs uppercase text-black text-center px-6 py-4 align-middle">{{ sizeChart.sc_2_3xl[sizeIndex] }}</td>
                    <td v-if="sizeChart.sc_2_4xl != ''" class="font-body font-semibold text-xs uppercase text-black text-center px-6 py-4 align-middle">{{ sizeChart.sc_2_4xl[sizeIndex] }}</td>
                    <td v-if="sizeChart.sc_2_5xl != ''" class="font-body font-semibold text-xs uppercase text-black text-center px-6 py-4 align-middle">{{ sizeChart.sc_2_5xl[sizeIndex] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div v-if="sizeChartTab === 'fits'" class="py-10 px-9 md:px-e120 overflow-y-scroll h-e500 md:h-full">
          <div class="flex flex-wrap md:flex-no-wrap justify-between">
            <div class="flex flex-col items-center w-full md:w-1/2 md:mr-e80">
              <p v-if="sizeChart.fit_title_1 !== null" class="font-primary font-bold uppercase tracking-header text-megamenu_top text-black">{{ sizeChart.fit_title_1 }}</p>
              <img v-if="sizeChart.fit_image_1 !== null" class="mt-6 w-full max-w-e280" :src="sizeChart.fit_image_1" />
              <p v-if="sizeChart.fit_description_1 !== null" class="font-body text-megamenu_sub text-gray-800 mt-6 text-center">{{ sizeChart.fit_description_1 }}</p>
            </div>
            <div class="flex flex-col items-center w-full md:w-1/2">
              <p v-if="sizeChart.fit_title_2 !== null" class="font-primary font-bold uppercase tracking-header text-megamenu_top text-black">{{ sizeChart.fit_title_2 }}</p>
              <img v-if="sizeChart.fit_image_2 !== null" class="mt-6 w-full max-w-e280" :src="sizeChart.fit_image_2" />
              <p v-if="sizeChart.fit_description_2 !== null" class="font-body text-megamenu_sub text-gray-800 mt-6 text-center">{{ sizeChart.fit_description_2 }}</p>
            </div>
          </div>
        </div>
      </ModalWithOverlay>
    </ProductProvider>

     <ProductProvider>
      <ModalWithOverlay :open="subscriptionInfo" @update:open="subscriptionInfo = false" class="block modal-no-padding h-auto">
        <button
          class="absolute right-0 top-0 p-1 transition-colors duration-300 focus:shadow-outline z-80"
          @click="subscriptionInfo = false"
        > 
          <Icon name="modal-close" size="56px" class="text-black hover:text-primary-500 transition-all duration-200 p-e18"></Icon>
        </button>
        <h3 v-if="state.subscriptions_modal_headline" class="p-e18 font-bold uppercase text-e16">{{state.subscriptions_modal_headline}}</h3>
        <div class="md:px-p15 px-4 pb-5 md:pb-p10 text-center md:mt-e50">
          <h3 v-if="state.subscriptions_modal_title" class="font-bold uppercase text-e18 md:mb-4 md:tracking-header text-center">{{state.subscriptions_modal_title}}</h3>
          <p v-if="state.subscriptions_modal_text" class="text-center mb-4 md:mb-8 font-body md:font-bold text-e14">{{state.subscriptions_modal_text}}</p>
          <a v-if="state.subscription_modal_btn_text" class="font-primary font-bold text-md text-center text-white bg-black md:max-w-e256 tracking-header uppercase py-3 px-10 transition-all duration-200 hover:filter-brightness" :href="state.subscriptions_modal_btn_link">{{state.subscription_modal_btn_text}}</a>
        </div>
      </ModalWithOverlay>
    </ProductProvider>

  </form>  
</template>

<script lang="ts">
import Vue from 'vue';
import { Prop, Component, Watch } from 'vue-property-decorator';
import range from 'lodash/range';
import curry from 'lodash/curry';
import debounce from 'lodash/debounce';
import VariantSwatch from '../../components/VariantSwatch.vue';
import VariantBtn from '../../components/VariantBtn.vue';
import Dropdown from '../../components/Dropdown.vue';
import BtnPrimary from '../../components/BtnPrimary';
import BtnSecondary from '../../components/BtnSecondary';
import AccordionGroup from '../../components/AccordionGroup.vue';
import Accordion from '../../components/Accordion.vue';
import BtnPill from '../../components/BtnPill';
import ProductBriefValueProps from './ProductBriefValueProps.vue';
import ProductCompleteLook from './ProductCompleteLook.vue';
import ProductCrossSells from './ProductCrossSells.vue';
import { ProductProvider } from './ProductProvider';
import ModalWithOverlay from '../../components/ModalWithOverlay.vue';
import InputText from '../../components/InputText.vue';
import directiveScrollLock from '../../lib/directiveScrollLock';
import Icon from '../../components/Icon.vue';
import Countdown from '../../components/Countdown.vue';
import ProgressBar from '../../components/ProgressBar.vue';

@Component({
  components: { VariantSwatch, VariantBtn, Dropdown, BtnPrimary, BtnSecondary, ProductBriefValueProps, ProductCompleteLook, ProductCrossSells, ProductProvider, InputText, BtnPill, Icon, AccordionGroup, Accordion, ModalWithOverlay, Countdown, ProgressBar},
  methods: { curry },
})
export default class ProductForm extends Vue {
  @Prop() readonly product!: ShopifyProduct;

  @Prop() readonly sizeChart!: object;

  @Prop() readonly setOptionByIndex!: Function;

  @Prop() readonly selectedOptions!: string[];

  @Prop() readonly setQuantity!: Function;

  @Prop() readonly setSellingPlan!: Function;

  @Prop() readonly quantity!: number;

  @Prop() readonly crossProductPrice!: number;

  @Prop() readonly sellingPlan!: any;

  @Prop() readonly addToCartStates!: Record<'normal' | 'outOfStock' | 'unavailable' | 'preorder' | 'backorder', boolean>;

  @Prop() readonly customer!: any;

  @Prop() readonly linkedProducts!: any[];

  @Prop() readonly selectedVariant!: ShopifyVariant;

  @Prop() readonly onAddToCart!: Function;

  @Prop() readonly onBuyItNow!: Function;

  @Prop() readonly showSuperstarIcon!: boolean;

  product_types = this.product.metafields.pdp.product_types;

  @Prop({ default: '/pages/dev-compare-belts' }) readonly compareUrl!: string;

  maxQuantity = parseInt(this.product.tags.find(tag => tag.includes('max::'))?.split('max::')[1] || '20', 10);

  quantityDropdownOptions = range(1, this.maxQuantity + 1).map((value) => ({ label: value, value }));

  notificationEmail = (this.customer && this.customer.email) || '';

  notificationErrorMessage = '';

  productType = "";

  notificationValid = true;

  superstarName = "";

  superstarImg = "";

  superstarUrl = "";

  sizeChartOpen = false;

  sizeChartTab = 'sizeChart';

  sizeChartSubTab = 1;

  subscriptionInfo = false;

  sellingsPlans = [
    { key: 'onetime', text: `$${this.finalPrice(this.product.price_min)} / ${this.product.metafields.pdp.onetime_text}` },
    { key: 'subscriptions', text: `$${this.finalPrice(this.subscriptionPrice)} / ${this.product.metafields.pdp.subscriptions_text}` },
  ];

  plan = 'subscriptions';

  state = window.APPSTATE;

  notificationStateMap = JSON.parse(window.sessionStorage.bisState || '{}');

  scrollToSpecs() {
    document.getElementById('specs')?.scrollIntoView({ behavior: 'smooth' });
  }

  isColorOption(option: any) {
    return /color/i.test(option.name);
  }

  @Watch('plan', { deep: true })
  setPlans() {
    if(this.product.metafields.pdp.is_subscription) {
      const value = this.plan === 'onetime' ? null : this.product.metafields.pdp.is_subscription.selling_plans[0].id;
      this.setSellingPlan(value);
    }
  }

  get productExclusionCheck(){
    if (window.BorderFree.isInternational === 'true' && (this.product.vendor !== 'Radial' || this.product.tags.includes('usa_only')) && this.state.current_store !== 'eu') return true;
    const vendor = this.product.vendor;
    if (vendor === 'Printful' && this.state.valid_printful_user) return true;
    
    return false;
  }

  get subscriptionPrice(){
    let discount = 0;
    if(this.product.metafields.pdp.is_subscription) {
      discount += this.product.metafields.pdp.is_subscription.selling_plans[0].price_adjustments[0].value;
    }
    const finalPrice = this.product.price_min*(1-(discount/100));
    return finalPrice;
  }

  finalPrice(price: number) {
    return Math.round(price/100 * 100) / 100;
  }

  get subscriptionBtnText() {
    if (this.plan === 'onetime') {
      return this.state.language.preorder
    }
    if (window.BorderFree.isInternational === 'true' && (this.product.vendor !== "Radial"  || this.product.tags.includes('usa_only')) && this.state.current_store !== 'eu'){
      return this.state.language.not_available;
    }
    return this.state.language.subscription_btn
  }

  get btnCTAText(){
    const limitAlert = this.maxQuantity < 20 ? ` - Limit ${this.maxQuantity}` : '';
    if (window.BorderFree.isInternational === 'true' && this.product.vendor !== "Radial" && this.state.current_store !== 'eu'){
      return this.state.language.not_available;
    }
    if(this.addToCartStates.preorder){
      return this.state.language.preorder + limitAlert;
    }
    if(this.addToCartStates.backorder){
      return this.state.language.backorder + limitAlert;
    }
    return this.state.language.add_to_cart + limitAlert;
  }

  get visibilityBtn (){
    if ( this.product.type === "Gift Cards" || (this.product.metafields.pdp.is_customizable && this.state.settings.customizable_atc_disable)) {
      return 'none';
    }
    return "block";
  }

  get isGiftCard() {
    return this.product.type === "Gift Cards";
  }

  isSizeOption(option: any) {
    return /size/i.test(option.name);
  }

  get hasSuperstarCollection() {
    for (let i = 0; i < this.product.tags.length; i++){
      if (this.product.tags[i].toLowerCase().includes('superstar:')) {
        const handle = this.product.tags[i].split(':')[1].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '').replace(/^-/, '');
        this.superstarUrl ='/collections/' + handle;
        this.superstarName = this.product.tags[i].split(':')[1];
        const superstarImg = `https://cdn.shopify.com/s/files/1/0070/5698/2143/files/superstar-${handle}.png`;
        if (this.imageExists(superstarImg) !== 404) {
          this.superstarImg = superstarImg;
        }
        return true;
      }
    }
    return false;
  }

  get hasSizeChart() {
    for (let i = 0; i < this.product.tags.length; i++){
      if (this.product.tags[i].includes('SizeChart::')) {
        return true;
      }
    }
    return false;
  }

  get countdownStyle() {
    return {
      backgroundImage: `url(${this.product.metafields.pdp.countdown_background_image})`,
      backgroundColor: this.product.metafields.pdp.countdown_hex_color,
      color: this.product.metafields.pdp.primary_text_color,
    };
  }

  get subCountdownStyle() {
    return {
      backgroundColor: this.product.metafields.pdp.subscription_countdown_bg,
      color: this.product.metafields.pdp.subscription_countdown_text_color,
    };
  }

  get compareDates() {
    let settingDate: any = this.product.metafields.pdp.countdown_timer_end_date;
    let today: Date = new Date();
    let endDate: Date = new Date(settingDate);
    return endDate > today;
  }

  get subscriptionDates() {
    let settingDate: any = this.product.metafields.pdp.subscription_end_date;
    let today: Date = new Date();
    let endDate: Date = new Date(settingDate);
    return endDate > today;
  }

  imageExists(image_url: string){
    const http = new XMLHttpRequest();
    http.open('HEAD', image_url, false);
    http.send();
    return http.status;
  }

  formatDropdownOption(value: string) {
    return {
      label: value,
      value,
    };
  }

  changeSizeSubTab(tab: number){
    this.sizeChartSubTab = tab;
  }

  openSizeChart(){
    this.sizeChartOpen = true;
  }

  initResizeWatcher() {
    window.addEventListener(
      'resize',
      debounce(() => {
        this.sizeChartOpen = false;
      }),
    );
  }

  dropdownOptions(options: any) {
    return options.map((option: any) => {
      return {
        label: option,
        value: option
      }
    })
  }

  activeProduct(productHandle: string, productTypeName: string){
    if(productHandle === this.product.handle){
      this.productType = productTypeName
      return "border-black";
    }
    return "border-gray-breadcrumbs";
  }

  /** Attempt to create a Back In Stock notification */
  onNotificationSubmit() {
    if (!this.selectedVariant) {
      this.notificationErrorMessage = 'Please select a product';
      this.notificationValid = false;
      return;
    }

    // reset error state
    this.notificationErrorMessage = '';
    this.notificationValid = true;

    // BIS.create(email, variantId, productId, [attributes])
    window.BIS.create(this.notificationEmail, this.selectedVariant.id, this.product.id).then((res: any) => {
      if (res.status === 'OK') {
        this.$set(this.notificationStateMap, this.selectedVariant.id, true);
        window.sessionStorage.bisState = JSON.stringify(this.notificationStateMap);
      } else {
        this.notificationErrorMessage = res.errors.email[0];
        this.notificationValid = false;
      }
    });
  }

  // see if an option value has at least one in-stock variant
  optionValueHasInStockVariant(optionIndex: number, optionValue: string) {
    let variantOptions = [...this.selectedOptions];
    variantOptions.splice(optionIndex, 1, optionValue);
    const variantsWithOptions = this.product.variants.filter((variant) => variant.options.every(option => variantOptions.includes(option))).length;
    if (!variantsWithOptions) return false;
    const variantsMatchingAllOptions = this.product.variants.filter((variant) => variant.options.every(option => variantOptions.includes(option)));
    if (!variantsMatchingAllOptions) return false;
    const hasAvailableVariantsMatchingAllOptions = variantsMatchingAllOptions.some((variant) => variant.available);
    return hasAvailableVariantsMatchingAllOptions;
  }

  mounted(){
    if(this.product.metafields.pdp.is_subscription) {
      this.setSellingPlan(this.product.metafields.pdp.is_subscription.selling_plans[0].id);
    }
    this.$nextTick(() => {
      this.initResizeWatcher();
      if (document.location.href.includes('size_chart')){
        this.sizeChartOpen = true;
      }
    });
  }
}
</script>