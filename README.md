# n-abler.org

## Built With

- [TypeScript](https://reactjs.org/docs/getting-started.html) - JavaScript Framework
- [React](https://reactjs.org/docs/getting-started.html) - JavaScript Framework
- [Bootstrap](https://getbootstrap.com/) - CSS Framework
- [SCSS](https://sass-lang.com/) - CSS Preprocesser
- [Webpack](https://webpack.js.org/) - JavaScript Module Bundler
- [PHP](https://www.php.net/) - Hypertext Preprocessor
- [WordPress](https://wordpress.org/) - CMS

# Scripts and Styles

## Webpack Bundles

If you need to add a JavaScript file that will run on every page, import it into `/src/ts/index` or write it there

If it is page specific, add a property to the `entry` object in `webpack.config.js`. For example, `search: './src/ts/search/index.tsx'` will build `dist/search.bundle.js`

## SCSS to CSS

If you need to add a CSS file that will run on every page, you can use `/src/scss/layout/layout.scss` or create a new file with an underline prefix and import it to `/src/scss/style.scss`

If it is page specific, add a new file that will match the new page you are working with. For example, `/src/scss/pages/test.scss` for a page with the page_name test

## Enqueue Scripts

If there is a JavaScript or CSS file that matches a Page's slug, it will enqueued to the page. This logic can be found in `functions.php` at `page_scripts()`

## New Enqueue Scripts / Styles

For JavaScript use `wp_enqueue_script`

For CSS use `wp_enqueue_style`
