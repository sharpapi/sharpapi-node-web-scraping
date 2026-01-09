const { SharpApiCoreService } = require('@sharpapi/sharpapi-node-core');

/**
 * Service for accessing Web Scraping API using SharpAPI.com
 */
class SharpApiWebScrapingService extends SharpApiCoreService {
  /**
   * Scrape a webpage URL and extract its content (synchronous endpoint)
   *
   * @param {string} url - The URL of the webpage to scrape
   * @returns {Promise<object>} - The scraped content
   */
  async scrapeUrl(url) {
    const response = await this.makeRequest('GET', '/utilities/scrape_url', { url });
    return response.data;
  }

  /**
   * Scrape a webpage and extract its HTML content
   *
   * @param {string} url - The URL of the webpage to scrape
   * @param {object} [options] - Additional options for scraping
   * @param {boolean} [options.javascript=false] - Whether to execute JavaScript on the page
   * @param {number} [options.timeout=30000] - Timeout in milliseconds
   * @param {string} [options.userAgent] - Custom User-Agent string
   * @param {object} [options.headers] - Custom headers to send with the request
   * @param {string} [options.proxy] - Proxy to use for the request
   * @returns {Promise<object>} - The scraped HTML content and metadata
   */
  async scrapeHtml(url, options = {}) {
    const data = { url, ...options };
    const response = await this.makeRequest('POST', '/utility/web-scraping/html', data);
    return response.data;
  }

  /**
   * Extract structured data from a webpage
   *
   * @param {string} url - The URL of the webpage to scrape
   * @param {object} [options] - Additional options for scraping
   * @param {boolean} [options.javascript=false] - Whether to execute JavaScript on the page
   * @param {number} [options.timeout=30000] - Timeout in milliseconds
   * @param {string} [options.userAgent] - Custom User-Agent string
   * @param {object} [options.headers] - Custom headers to send with the request
   * @param {string} [options.proxy] - Proxy to use for the request
   * @returns {Promise<object>} - The extracted structured data
   */
  async extractStructuredData(url, options = {}) {
    const data = { url, ...options };
    const response = await this.makeRequest('POST', '/utility/web-scraping/structured-data', data);
    return response.data;
  }

  /**
   * Take a screenshot of a webpage
   *
   * @param {string} url - The URL of the webpage to screenshot
   * @param {object} [options] - Additional options for screenshot
   * @param {boolean} [options.fullPage=false] - Whether to capture the full page or just the viewport
   * @param {number} [options.width=1280] - Viewport width
   * @param {number} [options.height=800] - Viewport height
   * @param {boolean} [options.javascript=true] - Whether to execute JavaScript on the page
   * @param {number} [options.timeout=30000] - Timeout in milliseconds
   * @param {string} [options.userAgent] - Custom User-Agent string
   * @param {object} [options.headers] - Custom headers to send with the request
   * @param {string} [options.proxy] - Proxy to use for the request
   * @returns {Promise<object>} - The screenshot data (base64 encoded)
   */
  async takeScreenshot(url, options = {}) {
    const data = { url, ...options };
    const response = await this.makeRequest('POST', '/utility/web-scraping/screenshot', data);
    return response.data;
  }

  /**
   * Extract text content from a webpage
   *
   * @param {string} url - The URL of the webpage to scrape
   * @param {object} [options] - Additional options for scraping
   * @param {boolean} [options.javascript=false] - Whether to execute JavaScript on the page
   * @param {number} [options.timeout=30000] - Timeout in milliseconds
   * @param {string} [options.userAgent] - Custom User-Agent string
   * @param {object} [options.headers] - Custom headers to send with the request
   * @param {string} [options.proxy] - Proxy to use for the request
   * @returns {Promise<object>} - The extracted text content
   */
  async extractText(url, options = {}) {
    const data = { url, ...options };
    const response = await this.makeRequest('POST', '/utility/web-scraping/text', data);
    return response.data;
  }

  /**
   * Extract links from a webpage
   *
   * @param {string} url - The URL of the webpage to scrape
   * @param {object} [options] - Additional options for scraping
   * @param {boolean} [options.javascript=false] - Whether to execute JavaScript on the page
   * @param {number} [options.timeout=30000] - Timeout in milliseconds
   * @param {string} [options.userAgent] - Custom User-Agent string
   * @param {object} [options.headers] - Custom headers to send with the request
   * @param {string} [options.proxy] - Proxy to use for the request
   * @returns {Promise<object>} - The extracted links
   */
  async extractLinks(url, options = {}) {
    const data = { url, ...options };
    const response = await this.makeRequest('POST', '/utility/web-scraping/links', data);
    return response.data;
  }
}

module.exports = { SharpApiWebScrapingService };