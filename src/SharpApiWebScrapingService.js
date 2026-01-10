const { SharpApiCoreService } = require('@sharpapi/sharpapi-node-core');

/**
 * Service for accessing Web Scraping API using SharpAPI.com
 *
 * Fetches and extracts content from publicly accessible URLs, providing structured data
 * including page metadata, content, links, and more in a machine-readable JSON format.
 */
class SharpApiWebScrapingService extends SharpApiCoreService {
  /**
   * Creates a new SharpApiWebScrapingService instance
   * @param {string} apiKey - Your SharpAPI API key
   * @param {string} [apiBaseUrl='https://sharpapi.com/api/v1'] - API base URL
   */
  constructor(apiKey, apiBaseUrl = 'https://sharpapi.com/api/v1') {
    super(apiKey, apiBaseUrl, '@sharpapi/sharpapi-node-web-scraping/1.0.2');
  }

  /**
   * Scrape a webpage URL and extract its content (synchronous endpoint)
   *
   * Fetches and extracts structured data from any publicly accessible URL, including:
   * - Page title and metadata (description, keywords, author)
   * - Open Graph and Twitter card details
   * - Headers and meta tags (content type, viewport, canonical URL, charset)
   * - Structured content extraction (headings, paragraphs, key text elements)
   * - Internal and external links for site structure analysis
   * - Language detection for localization
   * - Timestamped results for tracking
   *
   * @param {string} url - The URL of the webpage to scrape (e.g., 'https://example.com' or 'example.com')
   * @returns {Promise<object>} - The scraped content with metadata, structured data, and links
   *
   * @example
   * // Scrape a webpage
   * const data = await service.scrapeUrl('https://sharpapi.com');
   * console.log(data.title); // Page title
   * console.log(data.description); // Meta description
   * console.log(data.content); // Main content
   * console.log(data.links); // Array of links found
   */
  async scrapeUrl(url) {
    const response = await this.makeRequest('GET', '/utilities/scrape_url', { url });
    return response;
  }
}

module.exports = { SharpApiWebScrapingService };
