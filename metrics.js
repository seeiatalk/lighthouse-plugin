const fs = require('fs')
const lighthouse = require('lighthouse')
const chromeLauncher = require('chrome-launcher')
const constants = require('./lighthouse-plugin/constants')
const url = 'http://localhost:3000/';
(async () => {
    const chrome = await chromeLauncher.launch({})
    const options = {
        extends: 'lighthouse:default',
        passes: [
            {
                passName: 'defaultPass',
                gatherers: ['./lighthouse-plugin/hero-gatherer'],
            },
        ],
        audits: ['./lighthouse-plugin/hero-audit'],
        categories: {
            mysite: {
                title: 'My Metrics',
                description: '',
                auditRefs: [{ id: 'hero-audit', weight: 1 }],
            },
        },
        settings: {
            output: 'html',
            gatherMode: true,
            auditMode: true,
            formFactor: 'desktop',
            emulatedUserAgent: constants.userAgents.desktop,
            screenEmulation: constants.screenEmulationMetrics.desktop,
            throttlingMethod: 'provided',
            throttling: {
                throughputKbps: 8000,
                downloadThroughputKbps: 8000,
                uploadThroughputKbps: 2000,
            },
        },
    }
    const runnerResult = await lighthouse(
        url,
        {
            port: chrome.port,
            logLevel: 'info',
        },
        options
    )

    //   // `.report` is the HTML report as a string
    const { report } = runnerResult
    fs.writeFileSync('lhreport.html', report)

    //  `.lhr` is the Lighthouse Result as a JS object
    console.log('Report is done for', runnerResult.lhr.finalUrl)
    console.log('Performance score was', runnerResult.lhr.categories.performance.score * 100)

    await chrome.kill()
})()
