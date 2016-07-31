# PostCSS Responsive With Coefficients [![Build Status][ci-img]][ci]

[PostCSS] plugin You specify only one value for a given media query, then plugin multiplyies these values for each media query..

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/wwju/postcss-responsive-with-coefficients.svg
[ci]:      https://travis-ci.org/wwju/postcss-responsive-with-coefficients

```css
.foo {
    /* Input example */
}
```

```css
.foo {
  /* Output example */
}
```

## Usage

```js
postcss([ require('postcss-responsive-with-coefficients') ])
```

See [PostCSS] docs for examples for your environment.
