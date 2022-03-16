const { colors, minHeight } = require('tailwindcss/defaultTheme');

const config = {
  theme: {
    placeholderColor: theme => theme('colors'),
    opacity: {
      '0': '0',
      '25': '.25',
      '50': '.5',
      '75': '.75',
      '10': '.1',
      '20': '.2',
      '30': '.3',
      '40': '.4',
      '50': '.5',
      '60': '.6',
      '70': '.7',
      '80': '.8',
      '90': '.9',
      '100': '1',
    },
    fontSize: {
      0: '0',
      xxs: ['11px', '16px'],
      xs: ['12px', '18px'],
      sm: ['15px', '20px'],
      md: ['16px', '24px'],
      menu: ['18px', '22px'],
      lg: ['20px', '24px'],
      xl: ['24px', '32px'],
      mobile_sub: ['22px', '30px'],
      megamenu_top: ['18px', '22px'],
      megamenu_sub: ['14px', '22px'],
      modal: ['14px', '20px'],
      button: ['16px', '24px'],
      link: ['16px', '24px'],
      hero: ['44px', '54px'],
      hero_price: ['26px', '36px'],
      28: ['28px'],
      e10: '10px',
      e11: '11px',
      e12: '12px',
      e13: '13px',
      e14: '14px',
      e15: '15px',
      e16: '16px',
      e18: '18px',
      e20: '20px',
      e22: '22px',
      e24: '24px',
      e28: '28px',
      e32: '32px',
      e34: '34px',
      e36: '36px',
      e40: '40px',
      e42: '42px',
      e44: '42px',
      e48: '48px',
      e56: '56px',
      e72: '72px',
    },
    lineHeight: {
      none: 1,
      0: 0,
      1: 1.12,
      3: 1.15,
      4: 1.22,
      5: 1.25,
      6: 1.28,
      7: 1.3,
      8: 1.34,
      9: 1.57,
      10: 1.71,
    },
    fontFamily: {
      'primary': ['Heading Pro', 'Helvetica', 'sans-serif'],
      'secondary': ['Heading Pro Double', 'Helvetica', 'sans-serif'],
      'body': ['Open Sans', 'Arial', 'sans-serif'],
    },
    letterSpacing: {
      none: '0',
      tighter: '.2px',
      tight: '.4px',
      normal: '.5px',
      wide: '.8px',
      wider: '1px',
      widest: '1.1px',
      header: '2px',
      huge: '4px',
    },
    zIndex: {
      0: 0,
      1: 1,
      2: 2,
      5: 5,
      10: 10,
      20: 20,
      30: 30,
      40: 40,
      50: 50,
      60: 60,
      70: 70,
      80: 80,
      90: 90,
      100: 100,
    },
    spacing: {
      0: 0,
      px: "1px",
      1: '4px',
      2: '8px',
      3: '12px',
      4: '16px',
      5: '20px',
      6: '24px',
      7: '28px',
      8: '32px',
      9: '36px',
      10: '40px',
      11: '44px',
      12: '48px',
      13: '52px',
      14: '56px',
      15: '60px',
      16: '64px',
      e1: '1px',
      e2: '2px',
      e3: '3px',
      e4: '4px',
      e5: '5px',
      e6: '6px',
      e7: '7px',
      e8: '8px',
      e9: '9px',
      e10: '10px',
      e11: '11px',
      e12: '12px',
      e13: '13px',
      e14: '14px',
      e15: '15px',
      e16: '16px',
      e18: '18px',
      e20: '20px',
      e22: '22px',
      e24: '24px',
      e26: '26px',
      e25: '25px',
      e27: '27px',
      e28: '28px',
      e30: '30px',
      e32: '32px',
      e35: '35px',
      e36: '36px',
      e40: '40px',
      e42: '42px',
      e44: '44px',
      e46: '46px',
      e48: '48px',
      e50: '50px',
      e56: '56px',
      e57: '57px',
      e60: '60px',
      e62: '62px',
      e64: '64px',
      e68: '68px',
      e70: '70px',
      e72: '72px',
      e74: '74px',
      e75: '75px',
      e78: '78px',
      e80: '80px',
      e84: '84px',
      e87: '87px',
      e90: '90px',
      e95: '95px', 
      e96: '96px',
      e100: '100px',
      e120: '120px',
      e125: '125px',
      e144: '144px',
      e150: '150px',
      e156: '156px',
      e130: '130px',
      e160: '160px',
      e180: '180px',
      e184: '184px',
      e190: '190px',
      e200: '200px',
      e216: '216px',
      e220: '220px',
      e240: '240px',
      e250: '250px',
      e256: '256px',
      e260: '260px',
      e300: '300px',
      e312: '312px',
      e320: '320px',
      e334: '334px',
      e350: '350px',
      e360: '360px',
      e375: '375px',
      e400: '400px',
      e420: '420px',
      e423: '423px',
      e440: '440px',
      e450: '450px',
      e460: '460px',
      e496: '496px',
      e500: '500px',
      e510: '510px',
      e530: '530px',
      e540: '540px',
      e560: '560px',
      e576: '576px',
      e600: '600px',
      n600: '-600px',
      e640: '640px',
      e660: '660px',
      e760: '760px',
      e820: '820px',
      e840: '840px',
      e874: '874px',
      e960: '960px',
      p5: '5%',
      p10: '10%',
      p15: '15%',
      p28: '28%',
      p30: '30%',
      p38: '38%',
      p48: '48%',
      p55: '55%',
      p62: '62%',
      p70: '70%',
      p100: '100%',
      p105: '105%',
      pModal: 'calc(100% - 32px)',
      cs: 'calc(33.3% - 10px)',
      '1/8': '12.5%',
      '45vh': '45vh',
      '100vh': '100vh',
    },
    screens: {
      sm: '650px',
      'md-down': {
        max: '991px',
      },
      md: '992px',
      lg: '1360px',
      xl: '2560px',
    },
    minWidth: {
      0: '0',
      '1/4': '25%',
      '1/3': '33%',
      '1/2': '50%',
      '3/4': '75%',
      full: '100%',
      e24: '24px',
      e40: '40px',
      e45: '45px',
      e60: '60px',
      e70: '70px',
      e78: '78px',
      e90: '90px',
      e100: '100px',
      e120: '120px',
      e130: '130px',
      e150: '150px',
      e156: '156px',
      e180: '180px',
      e200: '200px',
      e220: '220px',
      e250: '250px',
      e306: '306px',
      e480: '480px',
      e560: '560px',
      e750: '750px',
    },
    minHeight: {
      ...minHeight,
      e96: '96px',
      e120: '120px',
      e156: '156px',
      e250: '250px',
    },
    maxWidth: {
      0: '0',
      '1/4': '25%',
      '1/3': '33%',
      '1/2': '50%',
      '3/4': '75%',
      md: '992px',
      lg: '1360px',
      full: '100%',
      p49: '49%',
      e78: '78px',
      e45: '45px',
      e100: '100px',
      e120: '120px',
      e130: '130px',
      e200: '200px',
      e220: '220px',
      e256: '256px',
      e250: '250px',
      e306: '306px',
      e410: '410px',
      e560: '560px',
      e650: '650px',
    },
    minHeight: {
      0: '0',
      full: '100%',
      e96: '96px',
      e320: '320px',
      e750: '750px',
    },
    boxShadow: {
      sm: 'var(--box-shadow-light)',
      md: 'var(--box-shadow-standard)',
      lg: 'var(--box-shadow-heavy)',
      outline: 'var(--box-shadow-outline)',
      card: '0 8px 12px 0 rgba(0,0,0,0.08)',
      chart: '3px 7px 9px 3px rgba(0,0,0,0.2)',
      'desktop-dropdown': 'var(--box-shadow-desktop-dropdown)',
    },
    colors: {
      gray: {
        ...colors.gray,
        100: 'var(--color-gray-100)',
        200: 'var(--color-gray-200)',
        300: 'var(--color-gray-300)',
        400: 'var(--color-gray-400)',
        500: 'var(--color-gray-500)',
        600: 'var(--color-gray-600)',
        700: 'var(--color-gray-700)',
        900: 'var(--color-gray-900)',
        misc: 'var(--color-gray-misc)',
        breadcrumbs: '#e5e5e5',
        superstar_bg: '#111111',
        discount: 'var(--color-gray-discount)',
        review_btn: '#292929',
        review_btn_hover: '#3D3D3D',
      },
      primary: {
        ...colors.primary,
        200: 'var(--color-primary-200)',
        400: 'var(--color-primary-400)',
        500: 'var(--color-primary-500)',
        700: 'var(--color-primary-700)',
      },
      red: {
        ...colors.red,
        200: 'var(--color-red-200)',
        500: 'var(--color-red-500)',
        700: 'var(--color-red-700)',
      },
      blue: {
        ...colors.blue,
        200: 'var(--color-blue-200)',
        500: 'var(--color-blue-500)',
        700: 'var(--color-blue-700)',
        900: 'var(--color-blue-900)',
      },
      yellow: {
        ...colors.yellow,
        200: 'var(--color-yellow-200)',
        500: 'var(--color-yellow-500)',
        700: 'var(--color-yellow-700)',
      },
      teal: {
        ...colors.teal,
        500: 'var(--color-teal-500)',
      },
      lightblue: {
        ...colors.lightblue,
        500: 'var(--color-lightblue-500)',
      },
      white: {
        default: '#ffffff',
        100: '#f1f1f1',
        200: '#f2f2f2',
      },
      util: {
        ...colors.util,
        error: 'var(--color-util-error)',
        success: 'var(--color-util-success)',
        notification: 'var(--color-util-notification)',
        focus: 'var(--color-util-focus)',
        sale: 'var(--color-util-sale)',
        upsell: 'var(--color-util-upsell)',
      },
      text: {
        ...colors.text,
        dark1: 'var(--color-text-dark1)',
        dark2: 'var(--color-text-dark2)',
        accent1: 'var(--color-text-accent1)',
        accent2: 'var(--color-text-accent2)',
      },
      btn: {
        ...colors.btn,
        disabled: 'var(--color-btn-disabled)',
        primary_main: 'var(--color-btn-primary-main)',
        primary_hover: 'var(--color-btn-primary-hover)',
        primary_pressed: 'var(--color-btn-primary-pressed)',
        primary_focus: 'var(--color-btn-primary-focus)',
        secondary_main: 'var(--color-btn-secondary-main)',
        secondary_hover: 'var(--color-btn-secondary-hover)',
        secondary_pressed: 'var(--color-btn-secondary-pressed)',
        secondary_focus: 'var(--color-btn-secondary-focus)',
        tertiary_main: 'var(--color-btn-tertiary-main)',
        tertiary_hover: 'var(--color-btn-tertiary-hover)',
        tertiary_pressed: 'var(--color-btn-tertiary-pressed)',
        tertiary_focus: 'var(--color-btn-tertiary-focus)',
      },
      brands: {
        ...colors.brands,
        raw: 'var(--color-brand-raw)',
        smackdown: 'var(--color-brand-smackdown)',
        nxt: 'var(--color-brand-nxt)',
        nxt_old: 'var(--color-brand-nxt-old)',
        legends: 'var(--color-brand-legends)',
      },
      divider: {
        ...colors.divider,
        dark: 'var(--color-divider-dark)',
        light: 'var(--color-divider-light)',
      },      
      misc: {
        ...colors.misc,
        price_std: '#0E1111',
        price_sale: '#777777',
        color_multi: '#434343'
      },      
      black: '#000000',
      transparent: 'transparent',
      current: 'inherit',
    },
    extend: {
      borderWidth: {
        2: '2px',
      },
      borderRadius: {
        0: "0",
        e2: '2px',
        e4: '4px',
        e20: '20px',
        e24: '24px',
        e40: '40px',
      },
      inset: {
        1: '1px',
        2: '2px',
        3: '3px',
        4: '4px',
        '-4': '-4px',
        '-10': '-10px',
        8: '8px',
        10: '10px',
        12: '12px',
        15: '15px',
        16: '16px',
        18: '18px',
        20: '20px',
        24: '24px',
        25: '25px',
        30: '30px',
        40: '40px',
        50: '50px',
        56: '56px',
        60: '60px',
        73: '73px',
        76: '76px',
        80: '80px',
        100: '100px',
        120: '120px',
        125: '125px',
        150: '150px',
        155: '-155px',
        285: '-285px',
        320: '320px',
        '5p': '5%',
        '50p': '50%',
        '100p': '100%',
      },
      maxWidth: {
        e100: '100px',
        e150: '150px',
        e180: '180px',
        e200: '200px',
        e280: '280px',
        e312: '312px',
        e350: '350px',
        e500: '500px',
        e560: '560px',
        e600: '600px',
        e680: '680px',
        e850: '850px',
        e1100: '1100px',
        e1200: '1200px',
        e1360: '1360px',
        '2/5': '40%',
        '3/5': '60%',
        p50: '50%',
        p70: '70%',
        none: 'none',
      },
      maxHeight: {
        0: '0',
        e100: '100px',
        e150: '150px',
        e200: '200px',
        e320: '320px',
        e400: '400px',
        e440: '440px',
        e500: '500px',
        e750: '750px',
        e1000: '1000px',
      },
      animation: {
        fade: 'ripple .3s ease-in',
      },
      height: {
        e44: '44px',
        e64: '64px',
        '-screen-nav': 'calc(100vh - 100px)',
      },
      keyframes: {
        fade: {
          '0%': {
            width: '100%',
            height: '100%',
            opacity: 0,
          },
          '100%': {
            width: '100%',
            height: '100%',
            opacity: 1,
          },
        },
      },
    },
  },
  variants: {
  },
  plugins: [
    require('tailwindcss-blend-mode')(),
  ],
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./src/**/*.liquid', './src/**/*.vue', './src/**/*.ts', './src/**/*.js', './src/**/*.(j|t)sx'],
    options: {
      whitelist: [
        'w-e26',
        'h-e26',
        'w-e24',
        'h-e24',
        'md:justify-start',
        'min-w-0',
        'text-white',
        'md:text-white',
        'text-brands-raw',
        'text-brands-smackdown',
        'text-brands-nxt',
        'text-brands-legends',
        'bg-brands-raw',
        'bg-brands-smackdown',
        'bg-brands-nxt',
        'bg-brands-legends',
        'hover:text-brands-raw',
        'hover:text-brands-smackdown',
        'hover:text-brands-nxt',
        'hover:text-brands-legends',
        'border-brands-raw',
        'border-brands-smackdown',
        'border-brands-nxt',
        'border-brands-legends'
      ],
    },
  },
};

module.exports = config;