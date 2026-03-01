/**
 * SiteAuditService — Google PageSpeed Insights v5 Integration
 *
 * Fetches performance metrics for a given URL using the free PSI API.
 * No API key required for basic usage (25K requests/day limit).
 */

export interface AuditResult {
    url: string
    fetchedAt: string
    scores: {
        performance: number
        accessibility: number
        bestPractices: number
        seo: number
    }
    metrics: {
        fcp: { value: number; display: string; rating: 'good' | 'needs-improvement' | 'poor' }
        lcp: { value: number; display: string; rating: 'good' | 'needs-improvement' | 'poor' }
        cls: { value: number; display: string; rating: 'good' | 'needs-improvement' | 'poor' }
        tti: { value: number; display: string; rating: 'good' | 'needs-improvement' | 'poor' }
        speedIndex: { value: number; display: string; rating: 'good' | 'needs-improvement' | 'poor' }
        tbt: { value: number; display: string; rating: 'good' | 'needs-improvement' | 'poor' }
    }
    loadTime: string
    serverResponseTime: string
    totalSize: string
    requestCount: number
}

// Thresholds per Google Web Vitals
function rateMetric(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
    const thresholds: Record<string, [number, number]> = {
        fcp: [1800, 3000],
        lcp: [2500, 4000],
        cls: [0.1, 0.25],
        tti: [3800, 7300],
        speedIndex: [3400, 5800],
        tbt: [200, 600],
    }
    const [good, poor] = thresholds[name] || [0, 0]
    if (value <= good) return 'good'
    if (value <= poor) return 'needs-improvement'
    return 'poor'
}

function formatMs(ms: number): string {
    if (ms < 1000) return `${Math.round(ms)}ms`
    return `${(ms / 1000).toFixed(1)}s`
}

export async function runSiteAudit(url: string): Promise<AuditResult> {
    // Normalize URL
    let normalizedUrl = url.trim()
    if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
        normalizedUrl = `https://${normalizedUrl}`
    }

    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(normalizedUrl)}&category=performance&category=accessibility&category=best-practices&category=seo&strategy=mobile`

    const response = await fetch(apiUrl, { next: { revalidate: 0 } })

    if (!response.ok) {
        throw new Error(`PSI API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    const lighthouse = data.lighthouseResult

    if (!lighthouse) {
        throw new Error('Invalid PSI response: no lighthouse data')
    }

    const categories = lighthouse.categories || {}
    const audits = lighthouse.audits || {}

    // Extract scores (0-100)
    const scores = {
        performance: Math.round((categories.performance?.score || 0) * 100),
        accessibility: Math.round((categories.accessibility?.score || 0) * 100),
        bestPractices: Math.round((categories['best-practices']?.score || 0) * 100),
        seo: Math.round((categories.seo?.score || 0) * 100),
    }

    // Extract Core Web Vitals + key metrics
    const fcpMs = audits['first-contentful-paint']?.numericValue || 0
    const lcpMs = audits['largest-contentful-paint']?.numericValue || 0
    const clsVal = audits['cumulative-layout-shift']?.numericValue || 0
    const ttiMs = audits['interactive']?.numericValue || 0
    const siMs = audits['speed-index']?.numericValue || 0
    const tbtMs = audits['total-blocking-time']?.numericValue || 0

    const metrics = {
        fcp: { value: fcpMs, display: formatMs(fcpMs), rating: rateMetric('fcp', fcpMs) as 'good' | 'needs-improvement' | 'poor' },
        lcp: { value: lcpMs, display: formatMs(lcpMs), rating: rateMetric('lcp', lcpMs) as 'good' | 'needs-improvement' | 'poor' },
        cls: { value: clsVal, display: clsVal.toFixed(3), rating: rateMetric('cls', clsVal) as 'good' | 'needs-improvement' | 'poor' },
        tti: { value: ttiMs, display: formatMs(ttiMs), rating: rateMetric('tti', ttiMs) as 'good' | 'needs-improvement' | 'poor' },
        speedIndex: { value: siMs, display: formatMs(siMs), rating: rateMetric('speedIndex', siMs) as 'good' | 'needs-improvement' | 'poor' },
        tbt: { value: tbtMs, display: formatMs(tbtMs), rating: rateMetric('tbt', tbtMs) as 'good' | 'needs-improvement' | 'poor' },
    }

    // Server response time
    const serverResponseMs = audits['server-response-time']?.numericValue || 0

    // Total transfer size
    const totalBytes = audits['total-byte-weight']?.numericValue || 0
    const totalSize = totalBytes > 1048576
        ? `${(totalBytes / 1048576).toFixed(1)} MB`
        : `${Math.round(totalBytes / 1024)} KB`

    // Request count
    const requestCount = audits['network-requests']?.details?.items?.length || 0

    return {
        url: normalizedUrl,
        fetchedAt: new Date().toISOString(),
        scores,
        metrics,
        loadTime: formatMs(ttiMs),
        serverResponseTime: formatMs(serverResponseMs),
        totalSize,
        requestCount,
    }
}
