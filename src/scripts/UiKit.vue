<template>
  <div class="ui-kit">
    <div class="flex items-center justify-between w-full mb-e80">
      <p class="flex justify-between items-center mb-0 mr-8 whitespace-no-wrap float-left w-auto font-secondary font-bold uppercase">01 | Logo</p>
      <hr class="w-full" />
    </div>
    <div class="flex justify-around w-full">
      <div class="flex items-center flex-col">
        <p class="uppercase text-xs">Color Logo Primary</p>
        <img class="mt-2" src="https://cdn.shopify.com/s/files/1/0506/4409/1049/files/Primary_3x.svg?v=1604520525" />
      </div>
      <div class="flex items-center flex-col">
        <p class="uppercase text-xs">Black Logo</p>
        <img class="mt-2" src="https://cdn.shopify.com/s/files/1/0506/4409/1049/files/Black_3x.svg?v=1604520520" />
      </div>
      <div class="flex items-center flex-col">
        <p class="uppercase text-xs">White Logo</p>
        <img class="bg-black mt-2" src="https://cdn.shopify.com/s/files/1/0506/4409/1049/files/White_3x.svg?v=1604520512" />
      </div>
    </div>

    <div class="flex items-center justify-between w-full mt-10 mb-e80">
      <p class="flex justify-between items-center m-0 mr-8 whitespace-no-wrap float-left w-auto uppercase font-secondary font-bold">02 | Breakpoints</p>
      <hr class="w-full" />
    </div>
    <div class="flex items-center justify-around w-full">
      <div class="flex items-center flex-col">
        <p class="m-0 font-body font-normal text-sm">Mobile</p>
        <p class="m-0 font-body font-normal text-sm">< 650px</p>
      </div>
      <div class="flex items-center flex-col">
        <p class="m-0 font-body font-normal text-sm">Tablet</p>
        <p class="m-0 font-body font-normal text-sm">650px - 991px</p>
      </div>
      <div class="flex items-center flex-col">
        <p class="m-0 font-body font-normal text-sm">Desktop</p>
        <p class="m-0 font-body font-normal text-sm">992px +</p>
      </div>
      <div class="flex items-center flex-col">
        <p class="m-0 font-body font-normal text-sm">Full Width</p>
        <p class="m-0 font-body font-normal text-sm">2560px</p>
      </div>
    </div>

    <div class="flex items-center justify-between w-full mt-10 mb-e80">
      <p class="flex justify-between items-center m-0 mr-8 whitespace-no-wrap float-left w-auto uppercase font-secondary font-bold">03 | Grid & Modular Scale</p>
      <hr class="w-full" />
    </div>
    <p class="font-body font-bold text-md mb-4">Desktop Grid at 1440px breakpoint</p>
    <p class="font-body font-normal text-md mb-8">Total Width: 1360px   /   Offset: 40px   /   Number of columns: 12   /   Gutter Width: 36px   /   Column Width: 80px</p>
    
    <div class="flex flex-wrap sm:justify-center lg:flex-no-wrap mr-9 ml-9 bg-gray-100 h-e125">
      <div class="w-full h-full sm:w-1/3 md:w-1/6 lg:w-1/12 bg-gray-300 mx-0 md:mx-5 lg:mr-5 lg:ml-0 text-center text-white">1</div>
      <div class="w-full h-full sm:w-1/3 md:w-1/6 lg:w-1/12 bg-gray-300 mx-0 md:mx-5 text-center text-white">2</div>
      <div class="w-full h-full sm:w-1/3 md:w-1/6 lg:w-1/12 bg-gray-300 mx-0 md:mx-5 text-center text-white">3</div>
      <div class="w-full h-full sm:w-1/3 md:w-1/6 lg:w-1/12 bg-gray-300 mx-0 md:mx-5 text-center text-white">4</div>
      <div class="w-full h-full sm:w-1/3 md:w-1/6 lg:w-1/12 bg-gray-300 mx-0 md:mx-5 text-center text-white">5</div>
      <div class="w-full h-full sm:w-1/3 md:w-1/6 lg:w-1/12 bg-gray-300 mx-0 md:mx-5 text-center text-white">6</div>
      <div class="w-full h-full sm:w-1/3 md:w-1/6 lg:w-1/12 bg-gray-300 mx-0 md:mx-5 text-center text-white">7</div>
      <div class="w-full h-full sm:w-1/3 md:w-1/6 lg:w-1/12 bg-gray-300 mx-0 md:mx-5 text-center text-white">8</div>
      <div class="w-full h-full sm:w-1/3 md:w-1/6 lg:w-1/12 bg-gray-300 mx-0 md:mx-5 text-center text-white">9</div>
      <div class="w-full h-full sm:w-1/3 md:w-1/6 lg:w-1/12 bg-gray-300 mx-0 md:mx-5 text-center text-white">10</div>
      <div class="w-full h-full sm:w-1/3 md:w-1/6 lg:w-1/12 bg-gray-300 mx-0 md:mx-5 text-center text-white">11</div>
      <div class="w-full h-full sm:w-1/3 md:w-1/6 lg:w-1/12 bg-gray-300 mx-0 md:mx-5 lg:ml-5 lg:mr-0 text-center text-white">12</div>
    </div>

    <div class="flex mt-e100 h-auto">
      <div class="w-1/2 justify-center flex-wrap">
        <p class="font-body font-bold text-md w-full mb-8">Mobile Grid at 375px breakpoint</p>
        <div class="flex bg-gray-100 w-full h-e125">
          <div class="w-1/4 h-full bg-gray-300 mr-2 text-center text-white">1</div>
          <div class="w-1/4 h-full bg-gray-300 mx-2 text-center text-white">2</div>
          <div class="w-1/4 h-full bg-gray-300 mx-2 text-center text-white">3</div>
          <div class="w-1/4 h-full bg-gray-300 ml-2 text-center text-white">4</div>
        </div>
      </div>
      <div class="w-px mx-e125 bg-gray-300 h-auto"></div>
      <div class="w-1/2 flex justify-center flex-wrap">
        <p class="font-body font-semibold text-md uppercase w-full mb-8">4PX Base Unit</p>
        <div class="flex items-end w-full">
          <div class="w-e100 h-e100 bg-black mr-6 font-body font-normal text-md flex items-center justify-center text-white">80</div>
          <div class="w-e68 h-e68 bg-black mr-6 font-body font-normal text-md flex items-center justify-center text-white">56</div>
          <div class="w-10 h-10 bg-black mr-6 font-body font-normal text-md flex items-center justify-center text-white">40</div>
          <div class="w-6 h-6 bg-black mr-6 font-body font-normal text-md flex items-center justify-center text-white">24</div>
          <div class="w-4 h-4 bg-black mr-6 font-body font-normal text-xs flex items-center justify-center text-white">16</div>
          <div class="w-2 h-2 bg-black flex font-body font-normal text-xs items-center justify-center text-white">8</div>
        </div>
        <p class="font-body font-normal text-md w-full my-4">
          Ratio: 2x<br>
          Multiples: 4<br>
          Section Padding: 96px, 48px
        </p>
        <div class="bg-gray-100">
          <p class="font-body font-normal text-md px-14 py-7 w-full">
            An 4px Base Unit provides resonant numbers using a robust, consistant ratio and encourages thoughtful repetition. Repetition breeds familiarity and reinforces a pattern that helps the user make sense of the content and layout.
            <br><br>
            We use the grid to determine font sizes and spacing throughout the designs.
          </p>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-between w-full mt-10 mb-6">
      <p class="flex justify-between items-center m-0 mr-8 whitespace-no-wrap float-left w-auto uppercase font-secondary font-bold">04 | Color</p>
      <hr class="w-full" />
    </div>
    <p class="w-full px-6 py-3 font-body font-normal text-md border border-solid border-gray-200 mb-11">There is no inherent limit to color selection in your UI kit, but colors should be organized in a 100-900 scale</p>
    <div class="flex justify-between mb-10">
      <div class="w-1/3">
        <p class="font-body font-semibold uppercase text-lg mb-6">Primary X Scale</p>
        <div class="w-full px-6 py-5 bg-primary-200 flex justify-between">
          <p class="text-white font-body font-semibold text-md">Primary 200</p>
          <p class="text-white font-body font-semibold text-md">#C11425</p>
        </div>
        <div class="w-full px-6 py-5 bg-primary-400 flex justify-between">
          <p class="text-white font-body font-semibold text-md">Primary 400</p>
          <p class="text-white font-body font-semibold text-md">#D31A30</p>
        </div>
        <div class="w-full px-6 py-5 bg-primary-500 flex justify-between">
          <p class="text-white font-body font-semibold text-md">Primary 500</p>
          <p class="text-white font-body font-semibold text-md">#D0021B</p>
        </div>
        <div class="w-full px-6 py-5 bg-primary-700 flex justify-between">
          <p class="text-white font-body font-semibold text-md">Primary 700</p>
          <p class="text-white font-body font-semibold text-md">#B30000</p>
        </div>
      </div>
      <div class="w-1/3 mx-5">
        <p class="font-body font-semibold uppercase text-lg mb-6">Greyscale 1/2</p>
        <div class="w-full px-6 py-5 bg-gray-100 flex justify-between">
          <p class="text-black font-body font-semibold text-md">Gray 100</p>
          <p class="text-black font-body font-semibold text-md">#F9F9F9</p>
        </div>
        <div class="w-full px-6 py-5 bg-gray-200 flex justify-between">
          <p class="text-black font-body font-semibold text-md">Gray 200</p>
          <p class="text-black font-body font-semibold text-md">#EEEEEE</p>
        </div>
        <div class="w-full px-6 py-5 bg-gray-300 flex justify-between">
          <p class="text-white font-body font-semibold text-md">Gray 300</p>
          <p class="text-white font-body font-semibold text-md">#AAAAAA</p>
        </div>
        <div class="w-full px-6 py-5 bg-gray-400 flex justify-between">
          <p class="text-white font-body font-semibold text-md">Gray 400</p>
          <p class="text-white font-body font-semibold text-md">#666666</p>
        </div>
      </div>
      <div class="w-1/3">
        <p class="font-body font-semibold uppercase text-lg mb-6">Greyscale 2/2</p>
        <div class="w-full px-6 py-5 bg-gray-500 flex justify-between">
          <p class="text-white font-body font-semibold text-md">Gray 500</p>
          <p class="text-white font-body font-semibold text-md">#333333</p>
        </div>
        <div class="w-full px-6 py-5 bg-gray-600 flex justify-between">
          <p class="text-white font-body font-semibold text-md">Gray 600</p>
          <p class="text-white font-body font-semibold text-md">#444444</p>
        </div>
        <div class="w-full px-6 py-5 bg-gray-700 flex justify-between">
          <p class="text-white font-body font-semibold text-md">Gray 700</p>
          <p class="text-white font-body font-semibold text-md">#232828</p>
        </div>
        <div class="w-full px-6 py-5 bg-gray-900 flex justify-between">
          <p class="text-white font-body font-semibold text-md">Gray 900</p>
          <p class="text-white font-body font-semibold text-md">#000000</p>
        </div>
      </div>
    </div>
    <div class="flex justify-between mb-10">
      <div class="w-1/3">
        <p class="font-body font-semibold uppercase text-lg mb-6">Red (RAW)</p>
        <div class="w-full px-6 py-5 bg-red-200 flex justify-between">
          <p class="text-white font-body font-semibold text-md">Raw Red 200</p>
          <p class="text-white font-body font-semibold text-md">#D7182A</p>
        </div>
        <div class="w-full px-6 py-5 bg-red-500 flex justify-between">
          <p class="text-white font-body font-semibold text-md">Raw Red 500</p>
          <p class="text-white font-body font-semibold text-md">#EB1826</p>
        </div>
        <div class="w-full px-6 py-5 bg-red-700 flex justify-between">
          <p class="text-white font-body font-semibold text-md">Raw Red 700</p>
          <p class="text-white font-body font-semibold text-md">#CD0404</p>
        </div>
      </div>
      <div class="w-1/3 mx-5">
        <p class="font-body font-semibold uppercase text-lg mb-6">Blue (Smackdown)</p>
        <div class="w-full px-6 py-5 bg-blue-200 flex justify-between">
          <p class="text-white font-body font-semibold text-md">Blue 200</p>
          <p class="text-white font-body font-semibold text-md">#3B30FE</p>
        </div>
        <div class="w-full px-6 py-5 bg-blue-500 flex justify-between">
          <p class="text-white font-body font-semibold text-md">Blue 500</p>
          <p class="text-white font-body font-semibold text-md">#2C24D9</p>
        </div>
        <div class="w-full px-6 py-5 bg-blue-700 flex justify-between">
          <p class="text-white font-body font-semibold text-md">Blue 700</p>
          <p class="text-white font-body font-semibold text-md">#2812CB</p>
        </div>
      </div>
      <div class="w-1/3">
        <p class="font-body font-semibold uppercase text-lg mb-6">Yellow (NXT)</p>
        <div class="w-full px-6 py-5 bg-yellow-200 flex justify-between">
          <p class="text-black font-body font-semibold text-md">Yellow 200</p>
          <p class="text-black font-body font-semibold text-md">#F0A71F</p>
        </div>
        <div class="w-full px-6 py-5 bg-yellow-500 flex justify-between">
          <p class="text-black font-body font-semibold text-md">Yellow 500</p>
          <p class="text-black font-body font-semibold text-md">#FFC71C</p>
        </div>
        <div class="w-full px-6 py-5 bg-yellow-700 flex justify-between">
          <p class="text-black font-body font-semibold text-md">Yellow 700</p>
          <p class="text-black font-body font-semibold text-md">#F6B324</p>
        </div>
      </div>
    </div>
    <div class="flex justify-start mb-10">
      <div class="w-1/3">
        <p class="font-body font-semibold uppercase text-lg mb-6">Teal (Legends)</p>
        <div class="w-full px-6 py-5 bg-teal-500 flex justify-between">
          <p class="text-black font-body font-semibold text-md">Teal 500</p>
          <p class="text-black font-body font-semibold text-md">#60AFE7</p>
        </div>
      </div>
      <div class="w-1/3 mx-5">
        <p class="font-body font-semibold uppercase text-lg mb-6">Text Blue</p>
        <div class="w-full px-6 py-5 bg-lightblue-500 flex justify-between">
          <p class="text-black font-body font-semibold text-md">Text Blue 500</p>
          <p class="text-black font-body font-semibold text-md">#53B4FD</p>
        </div>
      </div>
    </div>
    <div class="flex justify-between mb-10">
      <div class="w-1/3">
        <p class="font-body font-semibold uppercase text-lg mb-6">Utility</p>
        <div class="w-full px-6 py-5 bg-util-error flex justify-between">
          <p class="text-white font-body font-normal text-md">Error</p>
          <p class="text-white font-body font-normal text-md">#E00000</p>
        </div>
        <div class="w-full px-6 py-5 bg-util-success flex justify-between">
          <p class="text-white font-body font-normal text-md">Success</p>
          <p class="text-white font-body font-normal text-md">#50B169</p>
        </div>
        <div class="w-full px-6 py-5 bg-util-notification flex justify-between">
          <p class="text-black font-body font-normal text-md">Notification</p>
          <p class="text-black font-body font-normal text-md">#53B4FD</p>
        </div>
        <div class="w-full px-6 py-5 border-2 border-util-focus flex justify-between">
          <p class="text-black font-body font-normal text-md">Focus</p>
          <p class="text-black font-body font-normal text-md">#0064FF</p>
        </div>
        <div class="w-full px-6 py-5 bg-util-sale flex justify-between">
          <p class="text-white font-body font-normal text-md">Sale</p>
          <p class="text-white font-body font-normal text-md">#003250</p>
        </div>
      </div>
      <div class="w-1/3 mx-5">
        <p class="font-body font-semibold uppercase text-lg mb-6">Text</p>
        <div class="w-full px-6 py-5 bg-text-dark1 flex justify-between">
          <p class="text-white font-body font-normal text-md">Dark 1</p>
          <p class="text-white font-body font-normal text-md">#000000</p>
        </div>
        <div class="w-full px-6 py-5 bg-text-dark2 flex justify-between">
          <p class="text-white font-body font-normal text-md">Dark 2</p>
          <p class="text-white font-body font-normal text-md">#232828</p>
        </div>
        <div class="w-full px-6 py-5 bg-text-accent1 flex justify-between">
          <p class="text-white font-body font-normal text-md">Accent 1</p>
          <p class="text-white font-body font-normal text-md">#EB1826</p>
        </div>
        <div class="w-full px-6 py-5 bg-text-accent2 flex justify-between">
          <p class="text-white font-body font-normal text-md">Accent 2</p>
          <p class="text-white font-body font-normal text-md">#003250</p>
        </div>        
        <div class="w-full px-6 py-5 bg-white flex justify-between border border-gray-200">
          <p class="text-black font-body font-normal text-md">Light</p>
          <p class="text-black font-body font-normal text-md">#FFFFFF</p>
        </div>        
      </div>
      <div class="w-1/3">
        <p class="font-body font-semibold uppercase text-lg mb-6">Drop Shadow</p>
        <div class="w-full px-6 py-5 bg-white flex justify-between shadow-sm mb-6 border border-gray-200 rounded-e4">
          <p class="text-black font-body font-normal text-md">Light</p>
          <p class="text-black font-body font-normal text-md">#404040 8% 0px  8px 12px 0px </p>
        </div>
        <div class="w-full px-6 py-5 bg-white flex justify-between shadow-md mb-6 border border-gray-200 rounded-e4">
          <p class="text-black font-body font-normal text-md">Standard</p>
          <p class="text-black font-body font-normal text-md">#404040 16% 0px  12px 16px 0px </p>
        </div>
        <div class="w-full px-6 py-5 bg-white flex justify-between shadow-lg border border-gray-200 rounded-e4">
          <p class="text-black font-body font-normal text-md">Heavy</p>
          <p class="text-black font-body font-normal text-md">#404040 30% 0px  8px 16px 0px </p>
        </div>
      </div>
    </div>
    <div class="flex justify-start mb-10">
      <div class="w-1/3">
        <p class="font-body font-semibold uppercase text-lg mb-6">Borders</p>
        <div class="w-full px-6 py-5 border border-gray-300 flex justify-between">
          <p class="text-black font-body font-normal text-md">Dark - 1px</p>
          <p class="text-black font-body font-normal text-md">#AAAAAA</p>
        </div>
        <div class="w-full px-6 py-5 border-2 border-gray-300 flex justify-between">
          <p class="text-black font-body font-normal text-md">Dark - 2px</p>
          <p class="text-black font-body font-normal text-md">#AAAAAA</p>
        </div>
        <div class="w-full px-6 py-5 border border-gray-300 bg-white flex justify-between">
          <p class="text-black font-body font-normal text-md">Dark - White BG 1px</p>
          <p class="text-black font-body font-normal text-md">#FFFFFF</p>
        </div>
        <div class="w-full px-6 py-5 border border-white flex justify-between">
          <p class="text-black font-body font-normal text-md">White - 1px</p>
          <p class="text-black font-body font-normal text-md">#FFFFFF</p>
        </div>
        <div class="w-full px-6 py-5 border-2 border-white flex justify-between">
          <p class="text-black font-body font-normal text-md">White - 2px</p>
          <p class="text-black font-body font-normal text-md">#FFFFFF</p>
        </div>
      </div>
      <div class="w-1/3 mx-5">
        <p class="font-body font-semibold uppercase text-lg mb-6">Dividers</p>
        <div class="w-full px-6 py-5 border border-gray-300 flex justify-between">
          <p class="text-black font-body font-normal text-md">Dark</p>
          <p class="text-black font-body font-normal text-md">#AAAAAA</p>
        </div>
        <hr class="divider-dark my-4" />
        <div class="w-full px-6 py-5 border border-gray-200 flex justify-between">
          <p class="text-black font-body font-normal text-md">Light</p>
          <p class="text-black font-body font-normal text-md">#E5E5E5</p>
        </div>
        <hr class="divider-light my-4" />
      </div>
    </div>

    <div class="bg-gray-200 w-full px-10 py-14">
      <div class="flex items-center justify-between w-full mt-10 mb-6">
        <p class="flex justify-between items-center m-0 mr-8 whitespace-no-wrap float-left w-auto uppercase font-secondary font-bold">05 | Typography</p>
        <hr class="w-full" />
      </div>
      <div class="flex justify-between">
        <div class="w-1/3">
          <p class="text-xl font-primary font-bold mb-10">Heading Pro Normal</p>
          <div class="flex flex-wrap">
            <p class="font-primary font-normal text-md w-3/4">Book</p>
            <p class="font-primary font-normal text-md w-1/4">400</p>
            <p class="font-primary font-bold text-md w-3/4">Bold</p>
            <p class="font-primary font-bold text-md w-1/4">700</p>
            <p class="font-primary font-extrabold text-md w-3/4">ExtraBold</p>
            <p class="font-primary font-extrabold text-md w-1/4">800</p>
            <p class="font-primary font-black text-md w-3/4">Heavy</p>
            <p class="font-primary font-black text-md w-1/4">900</p>
          </div>
        </div>
        <div class="w-1/3 mx-5">
          <p class="text-xl font-secondary font-bold mb-10">Heading Pro Double</p>
          <div class="flex flex-wrap">
            <p class="font-secondary font-normal text-md w-3/4">Bold</p>
            <p class="font-secondary font-normal text-md w-1/4">700</p>
          </div>
        </div>
        <div class="w-1/3">
          <p class="text-xl font-body font-normal mb-10">Open Sans</p>
          <div class="flex flex-wrap">
            <p class="font-body font-light text-md w-3/4">Light</p>
            <p class="font-body font-light text-md w-1/4">300</p>
            <p class="font-body font-normal text-md w-3/4">Regular</p>
            <p class="font-body font-normal text-md w-1/4">400</p>
            <p class="font-body font-semibold text-md w-3/4">Semibold</p>
            <p class="font-body font-semibold text-md w-1/4">600</p>
            <p class="font-body font-bold text-md w-3/4">Bold</p>
            <p class="font-body font-bold text-md w-1/4">700</p>
          </div>
        </div>
      </div>
    </div>

    <div class="py-8 border-t mt-8 border-gray-200 flex justify-between items-center">
      <p class="h1 w-1/4 text-left">H1</p>
      <p class="font-body w-1/4 text-left">Heading Pro Normal <br> Heading Pro Normal</p>
      <p class="font-body w-1/4 text-left">Heavy / 900 <br> Heavy / 900</p>
      <p class="font-body w-1/4 text-left">48px <br> 36px</p>
    </div>
    <div class="py-8 border-t border-gray-200 flex justify-between items-center">
      <p class="h2 w-1/4 text-left">H2</p>
      <p class="font-body w-1/4 text-left">Heading Pro Normal <br> Heading Pro Normal</p>
      <p class="font-body w-1/4 text-left">Heavy / 900 <br> ExtraBold / 800</p>
      <p class="font-body w-1/4 text-left">44px <br> 28px</p>
    </div>
    <div class="py-8 border-t border-gray-200 flex justify-between items-center">
      <p class="h3 w-1/4 text-left">H3</p>
      <p class="font-body w-1/4 text-left">Heading Pro Normal <br> Heading Pro Normal</p>
      <p class="font-body w-1/4 text-left">ExtraBold / 800 <br> ExtraBold / 800</p>
      <p class="font-body w-1/4 text-left">36px <br> 24px</p>
    </div>
    <div class="py-8 border-t border-gray-200 flex justify-between items-center">
      <p class="h4 w-1/4 text-left">H4</p>
      <p class="font-body w-1/4 text-left">Heading Pro Normal <br> Heading Pro Normal</p>
      <p class="font-body w-1/4 text-left">Bold / 700 <br> Bold / 700</p>
      <p class="font-body w-1/4 text-left">28px <br> 22px</p>
    </div>
    <div class="py-8 border-t border-gray-200 flex justify-between items-center">
      <p class="h5 w-1/4 text-left">H5</p>
      <p class="font-body w-1/4 text-left">Heading Pro Double <br> Heading Pro Double</p>
      <p class="font-body w-1/4 text-left">Bold / 700 <br> Bold / 700</p>
      <p class="font-body w-1/4 text-left">16px <br> 16px</p>
    </div>
    <div class="py-8 border-t border-gray-200 flex justify-between items-center">
      <p class="h6 w-1/4 text-left">H6</p>
      <p class="font-body w-1/4 text-left">Heading Pro Normal <br> Heading Pro Normal</p>
      <p class="font-body w-1/4 text-left">Bold / 700 <br> Bold / 700</p>
      <p class="font-body w-1/4 text-left">28px <br> 22px</p>
    </div>
    <div class="py-8 border-t border-gray-200 flex justify-between items-center">
      <p class="body-lg w-1/4 text-left">Body (Large)</p>
      <p class="font-body w-1/4 text-left">Open Sans <br> Open Sans</p>
      <p class="font-body w-1/4 text-left">Book / 400 <br> Book / 400</p>
      <p class="font-body w-1/4 text-left">20px <br> 18px</p>
    </div>
    <div class="py-8 border-t border-gray-200 flex justify-between items-center">
      <p class="body-md w-1/4 text-left">Body (Base)</p>
      <p class="font-body w-1/4 text-left">Open Sans <br> Open Sans</p>
      <p class="font-body w-1/4 text-left">Book / 400 <br> Book / 400</p>
      <p class="font-body w-1/4 text-left">16px <br> 14px</p>
    </div>
    <div class="py-8 border-t border-gray-200 flex justify-between items-center">
      <p class="body-sm w-1/4 text-left">Body (Small)</p>
      <p class="font-body w-1/4 text-left">Open Sans <br> Open Sans</p>
      <p class="font-body w-1/4 text-left">Book / 400 <br> Book / 400</p>
      <p class="font-body w-1/4 text-left">14px <br> 12px</p>
    </div>
    <div class="py-8 border-t border-gray-200 flex justify-between items-center">
      <p class="body-xs w-1/4 text-left">Body (Tiny)</p>
      <p class="font-body w-1/4 text-left">Open Sans</p>
      <p class="font-body w-1/4 text-left">Book / 400</p>
      <p class="font-body w-1/4 text-left">11px</p>
    </div>
    <div class="py-8 border-t border-gray-200 flex justify-between items-center">
      <p class="button w-1/4 text-left">Button</p>
      <p class="font-body w-1/4 text-left">Heading Pro Normal</p>
      <p class="font-body w-1/4 text-left">Bold / 700</p>
      <p class="font-body w-1/4 text-left">16px</p>
    </div>
    <div class="py-8 border-t border-gray-200 flex justify-between items-center">
      <p class="text-cta w-1/4 text-left">Text Link Call-to-Action</p>
      <p class="font-body w-1/4 text-left">Heading Pro Normal</p>
      <p class="font-body w-1/4 text-left">Bold / 700</p>
      <p class="font-body w-1/4 text-left">16px</p>
    </div>
    <div class="py-8 border-t border-gray-200 flex justify-between items-center">
      <p class="text-basic-link w-1/4 text-left">Text Link Body</p>
      <p class="font-body w-1/4 text-left">Heading Pro Normal <br> Heading Pro Normal</p>
      <p class="font-body w-1/4 text-left">Bold / 700 <br> Bold / 700</p>
      <p class="font-body w-1/4 text-left">16px <br> 14px</p>
    </div>
    <div class="py-8 border-t border-gray-200 flex justify-between items-center">
      <p class="preheader w-1/4 text-left">Preheader</p>
      <p class="font-body w-1/4 text-left">Heading Pro Normal <br> Heading Pro Normal</p>
      <p class="font-body w-1/4 text-left">Bold / 700 <br> Bold / 700</p>
      <p class="font-body w-1/4 text-left">16px <br> 12px</p>
    </div>

    <div class="flex items-center justify-between w-full mt-10 mb-6">
      <p class="flex justify-between items-center m-0 mr-8 whitespace-no-wrap float-left w-auto uppercase font-secondary font-bold">06 | Buttons</p>
      <hr class="w-full" />
    </div>
    <div class="flex">
      <div class="w-1/4">
        <p class="font-body mb-2">Primary CTA</p>
        <BtnPrimary class="mb-4">Primary</BtnPrimary>
        <BtnPrimary class="mb-4" disabled>Disabled</BtnPrimary>
        <AsyncButton class='async--primary mb-4'>Async</AsyncButton>
        <AsyncButton class='async--primary button--state-success mb-4' disabled>Async</AsyncButton>
        <AsyncButton class='async--primary button--state-error' disabled>Async</AsyncButton>
      </div>
      <div class="w-1/4">
        <p class="font-body mb-2">Secondary CTA</p>
        <BtnSecondary class="mb-4">Secondary</BtnSecondary>
        <BtnSecondary class="mb-4" disabled>Disabled</BtnSecondary>
        <AsyncButton class='async--secondary mb-4'>Async</AsyncButton>
        <AsyncButton class='async--secondary button--state-success mb-4' disabled>Async</AsyncButton>
        <AsyncButton class='async--secondary button--state-error' disabled>Async</AsyncButton>
      </div>
      <div class="w-1/4">
        <p class="font-body mb-2">Tertiary CTA</p>
        <BtnTertiary class="mb-4">Tertiary</BtnTertiary>
        <BtnTertiary class="mb-4" disabled>Disabled</BtnTertiary>
        <AsyncButton class='async--tertiary hvr-sweep-to-right mb-4'>Async</AsyncButton>
        <AsyncButton class='async--tertiary button--state-success mb-4' disabled>Async</AsyncButton>
        <AsyncButton class='async--tertiary button--state-error' disabled>Async</AsyncButton>
      </div>
      <div class="w-1/4">
        <p class="font-body">Call to Action Interactions</p>
        <p class="font-body">Standard Hover - Fade</p>
        <p class="font-body">Tertiary Hover - Sweep to Right</p>
      </div>
    </div>

    <div class="flex items-center justify-between w-full mt-10 mb-6">
      <p class="flex justify-between items-center m-0 mr-8 whitespace-no-wrap float-left w-auto uppercase font-secondary font-bold">07 | Links</p>
      <hr class="w-full" />
    </div>
    <div class="flex">
      <div class="w-1/4 flex flex-col items-start">
        <p class="font-body mb-2">Primary Link</p>
        <LinkPrimary class="link--primary mb-1" href="/">Link Primary</LinkPrimary>
        <LinkPrimary class="link--primary disabled" href="/">Link Primary</LinkPrimary>
      </div>
      <div class="w-1/4 flex flex-col items-start">
        <p class="font-body mb-2">Secondary Link</p>
        <LinkPrimary class="link--secondary mb-1" href="/">Link Secondary</LinkPrimary>
        <LinkPrimary class="link--secondary disabled" href="/">Link Secondary</LinkPrimary>
      </div>
      <div class="w-1/4 flex flex-col items-start">
        <p class="font-body mb-2">Navigation Link</p>
        <LinkPrimary class="link--nav mb-1" href="/">Link Navigation</LinkPrimary>
        <LinkPrimary class="link--nav disabled" href="/">Link Navigation</LinkPrimary>
      </div>
      <div class="w-1/4 flex flex-col items-start">
        <p class="font-body mb-2">General Link</p>
        <LinkPrimary class="link--general mb-1" href="/">Link General</LinkPrimary>
        <LinkPrimary class="link--general disabled" href="/">Link General</LinkPrimary>
      </div>
    </div>

    <div class="flex items-center justify-between w-full mt-10 mb-6">
      <p class="flex justify-between items-center m-0 mr-8 whitespace-no-wrap float-left w-auto uppercase font-secondary font-bold">08 | Inputs Part 1</p>
      <hr class="w-full" />
    </div>
    <div class="flex">
      <div class="w-1/3 flex flex-col items-start">
        <p class="font-body mb-2 w-full">Checkbox</p>
        <div class="flex items-center">
          <input type="checkbox" name id="1" />
          <label class="body-md" for="1">Active</label>
        </div>
        <div class="flex items-center">
          <input type="checkbox" name id="1" disabled />
          <label class="body-md" for="1">Disabled</label>
        </div>
        <div class="flex items-center">
          <input type="checkbox" checked name id="1" disabled />
          <label class="body-md" for="1">Disabled Checked</label>
        </div>
      </div>
      <div class="w-1/3 flex flex-col items-start">
        <p class="font-body mb-2">Radio Button</p>
        <div class="flex items-center mb-3">
          <input type="radio" name id="2" />
          <label class="body-md" for="2">Radio</label>
        </div>
        <div class="flex items-center mb-3">
          <input type="radio" name id="2" disabled />
          <label class="body-md" for="2">Radio</label>
        </div>
        <div class="flex items-center">
          <input type="radio" name id="2" disabled checked />
          <label class="body-md" for="2">Disabled Selected</label>
        </div>
      </div>
      <div class="w-1/3 flex flex-col items-start">
        <p class="font-body mb-2">Toggles</p>
        <input class="input--toggle" type="checkbox" name id="3" />
        <label class="body-md" for="3">Toggle</label>
        <input class="input--toggle" type="checkbox" name id="3" disabled />
        <label class="body-md" for="3">Toggle</label>
      </div>
    </div>

    <div class="flex items-center justify-between w-full mt-10 mb-6">
      <p class="flex justify-between items-center m-0 mr-8 whitespace-no-wrap float-left w-auto uppercase font-secondary font-bold">09 | Inputs Part 2</p>
      <hr class="w-full" />
    </div>
    <div class="flex">
      <div class="w-1/3 flex flex-col items-start">
        <p class="font-body mb-2">Inputs</p>
        <InputText class="mb-2" label="Label" v-model="input1" />
        <InputText class="mb-2" label="Label" v-model="input2" disabled />
        <InputText class="mb-2" label="Label" v-model="input3" :valid="false" error-message="error message" />
        <InputText class="mb-2" tag="textarea" label="Label" v-model="input4" />
      </div>
      <div class="w-1/3 flex flex-col items-start">
        <p class="font-body mb-2">Variant Elements</p>
        <VariantBtn class="mb-2">19.2Ah</VariantBtn>
        <VariantBtn class="mb-2" :selected="true">19.2Ah</VariantBtn>
        <VariantSwatch class="mb-2" color="red" />
        <VariantSwatch class="mb-2" active color="brushed-aluminum" />
      </div>
      <div class="w-1/3 flex flex-col items-start">
        <p class="font-body mb-2">Dropdowns (default, accent one, accent two)</p>
        <Dropdown class="mb-2" :options="dropdownOptions" :selected="dropdownOptions[0].value" />
        <Dropdown class="mb-2 accent-one" :options="dropdownOptions" :selected="dropdownOptions[0].value" />
        <Dropdown class="mb-2 accent-two" quantity-mode :max="10" :selected="1" />
        <FilterTag class="mb-2">Filter</FilterTag>
        <FilterTag class="mb-2" active>Filter</FilterTag>
      </div>
    </div>

    <div class="flex items-center justify-between w-full mt-10 mb-6">
      <p class="flex justify-between items-center m-0 mr-8 whitespace-no-wrap float-left w-auto uppercase font-secondary font-bold">10 | Pagination Stepper</p>
      <hr class="w-full" />
    </div>
    <div class="w-full flex mb-10">
      <div class="stepper stepper-small stepper-active"></div>
      <div class="stepper stepper-small stepper-active"></div>
      <div class="stepper stepper-small"></div>
      <div class="stepper stepper-small"></div>
    </div>
    <div class="w-full flex">
      <div class="stepper stepper-large stepper-active"></div>
      <div class="stepper stepper-large"></div>
      <div class="stepper stepper-large"></div>
      <div class="stepper stepper-large"></div>
    </div>

    <div class="flex items-center justify-between w-full mt-10 mb-6">
      <p class="flex justify-between items-center m-0 mr-8 whitespace-no-wrap float-left w-auto uppercase font-secondary font-bold">11 | Slider Component</p>
      <hr class="w-full" />
    </div>

  </div>
</template>




<script>
  export default {
    data() {
      return {
        input1: '',
        input2: '',
        input3: 'invalid',
        input4: '',
        dropdownOptions: [
          { label: 'Variant', labelRight: 'XXXX', value: '1' },
          { label: 'Variant', labelRight: 'XXXX', value: '2' },
          { label: 'Variant', labelRight: 'XXXX', value: '3' },
          { label: 'Variant', labelRight: 'XXXX', value: '4' },
          { label: 'Variant', labelRight: 'XXXX', value: '5' },
        ],
      };
    },
  };
</script>

<style lang="scss" scoped>
</style>
