export default async function handler(req, res) {
    const {url} = req.query;
    if (!url) return res.status(400).json({error: 'No URL provided'});

    try {
        const response = await fetch(url, {
            headers: {'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1)'}
        });
        const html = await response.text();

        const getMeta = (property) => {
            const match = html.match(new RegExp(`<meta[^>]*(?:property|name)=["']${property}["'][^>]*content=["']([^"']+)["']`, 'i'))
                || html.match(new RegExp(`<meta[^>]*content=["']([^"']+)["'][^>]*(?:property|name)=["']${property}["']`, 'i'));
            return match ? match[1] : null;
        };

        const image = getMeta('og:image') || getMeta('twitter:image');
        const title = getMeta('og:title') || getMeta('twitter:title')
            || (html.match(/<title[^>]*>([^<]+)<\/title>/i) || [])[1] || '';
        const price = getMeta('product:price:amount') || getMeta('og:price:amount');
        const brand = getMeta('og:brand') || getMeta('product:brand');

        res.json({image, title: title.trim(), price, brand});
    } catch (e) {
        res.status(500).json({error: 'Failed to fetch URL'});
    }
}