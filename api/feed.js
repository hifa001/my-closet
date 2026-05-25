export default async function handler(req, res) {
    const {url, limit = 20} = req.query;
    if (!url) return res.status(400).json({error: 'No URL'});

    try {
        // try Shopify products.json endpoint first
        const feedUrl = `${url}/products.json?limit=${limit}`;
        const response = await fetch(feedUrl, {
            headers: {'User-Agent': 'Mozilla/5.0'}
        });

        if (!response.ok) throw new Error('Feed not available');

        const data = await response.json();

        const products = (data.products || []).map(p => ({
            id: p.id,
            title: p.title,
            brand: p.vendor,
            image: p.images?.[0]?.src || null,
            price: p.variants?.[0]?.price || null,
            url: `${url}/products/${p.handle}`,
            available: p.variants?.some(v => v.available),
        })).filter(p => p.image);

        res.json({products});
    } catch (e) {
        res.json({products: []});
    }
}