'use strict'

const { Audit } = require('lighthouse')

const GOOD_LOAD_TIME = 1000

class MetricsToHero extends Audit {
    static get meta () {
        return {
            id: 'hero-audit',
            title: 'hero is loaded',
            failureTitle: 'Table is slow to load. More than 3000ms',
            description: 'Used to measure time from navigationStart to when the hero is loaded',
            requiredArtifacts: ['MetricsToHero'],
        }
    }

    static audit (artifacts) {
        const loadMetrics = artifacts.MetricsToHero
        console.log('🚀 ~ file: hero-audit.js ~ line 20 ~ MetricsToHero ~ audit ~ loadMetrics', loadMetrics)

        const belowThreshold = loadMetrics <= GOOD_LOAD_TIME ? 1 : 0.5
        console.log('🚀 ~ file: hero-audit.js ~ line 23 ~ MetricsToHero ~ audit ~ belowThreshold', belowThreshold)

        return {
            rawValue: loadMetrics,
            score: Number(belowThreshold),
        }
    }
}
module.exports = MetricsToHero
