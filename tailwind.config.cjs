/** @type {import('tailwindcss').Config} */
module.exports = {
	purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
	    minWidth: {
		    'xsm': '280px',
	    },
			minHeight: {
				'post-card': '90px',
			},
	    colors: {
	      temper: {
					DEFAULT: '#00ff86',
		      '50': '#edfff6',
		      '100': '#d5ffec',
		      '200': '#aeffd9',
		      '300': '#70ffbd',
		      '400': '#2bfd99',
		      '500': '#00ff86',
		      '600': '#00c060',
		      '700': '#00964f',
		      '800': '#067541',
		      '900': '#076038',
	      },
		    'temper-secondary': {
					DEFAULT: '#123633',
			    '50': '#f1fcf9',
			    '100': '#d0f7ee',
			    '200': '#a1eede',
			    '300': '#6adec9',
			    '400': '#3cc5b2',
			    '500': '#23a999',
			    '600': '#19887c',
			    '700': '#186d65',
			    '800': '#185752',
			    '900': '#123633',
	      },
		    'temper-purple': {
					DEFAULT: '#6357b5'
		    }
	    },
    },
  },
  plugins: [],
}
