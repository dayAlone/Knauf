var postcss = require('postcss');

module.exports = postcss.plugin('postcss-responsive-with-coefficients', function (opts) {
    opts = opts || {};

    var COEFFS = {
        'only screen and (max-width: 319px)': 6.4,
        'only screen and (min-width: 320px) and (max-width: 479px)': 6.4,
        'only screen and (min-width: 480px) and (max-width: 719px)': 8.2,
        'only screen and (min-width: 720px) and (max-width: 959px)': 10,
        'only screen and (min-width: 960px) and (max-width: 1024px)': 14,
        'only screen and (min-width: 1025px) and (max-width: 1365px)': 13.6,
        'only screen and (min-width: 1366px) and (max-width: 1599px)': 14,
        'only screen and (min-width: 1600px)': 1
    }

    return function (css, result) {
        css.walkRules(function (rule) {
            rule.walkDecls(function (decl) {
                var cssValue = decl.value

                if (cssValue.indexOf('pxvw') === -1) return

                var coeff = COEFFS[rule.parent.params]
                if (!coeff) {
                    rule.warn(result, 'You may need to specify more coefficients');
                    return
                }

                var oldValue, newValue, match

                while (match = /pxvw\((\d+)\)/g.exec(cssValue)) {

                    oldValue = parseInt(match[1])

                    if (rule.parent.params !== 'only screen and (min-width: 1600px)') {
                        newValue = (Math.round(oldValue / coeff * 100) / 100) + 'vw'
                    } else {
                        newValue = (oldValue * coeff) + 'px'
                    }

                    cssValue = cssValue.replace(match[0], newValue)
                }

                decl.cloneBefore({ prop: decl.prop, value: cssValue })
                decl.remove()
            })
        })
    }
})
