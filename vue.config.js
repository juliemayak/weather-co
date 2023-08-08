const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
	transpileDependencies: true,
	css: {
		loaderOptions: {
			scss: {
				additionalData: `@import "~@/sass/styles.scss";`,
			},
		},
	},
	pwa: {
		name: "Weather Co.",
		short_name: "Weather Co.",
		display: "standalone",
		themeColor: "#fffff",
		msTileColor: "#fffff",
		appleMobileWebAppCapable: "yes",
		manifestOptions: {
			name: "Weather Co.",
			short_name: "Weather Co.",
			start_url: "./",
			display: "standalone",
			theme_color: "#fffff",
			icons: [
				{
					src: "./icon-192.png",
					sizes: "192x192",
					type: "image/png",
					purpose: "any maskable",
				},
				{
					src: "./icon-512.png",
					sizes: "512x512",
					type: "image/png",
					purpose: "any maskable",
				},
			]
		},
		iconPaths: {
			maskicon: null,
			favicon32: "./icon-32.png",
			favicon16: "./icon-16.png",
			appleTouchIcon: "./apple-touch-icon.png",
			msTileImage: null,
		},

		workboxOptions: {
			skipWaiting: true,
		},
	},
});
