'use strict'

const { Gatherer } = require('lighthouse')

class MetricsToHero extends Gatherer {
    afterPass (options) {
        const { driver } = options
        return driver.evaluateAsync('window.myTableMetric').then(loadMetrics => {
            console.log(
                '🚀 ~ file: hero-gatherer.js ~ line 10 ~ MetricsToHero ~ returndriver.evaluateAsync ~ loadMetrics',
                loadMetrics
            )
            if (!loadMetrics) {
                throw new Error('Unable to find load metrics in page')
            }
            return loadMetrics
        })
    }
}

module.exports = MetricsToHero
