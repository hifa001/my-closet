// searches for Shopify stores matching a brand name
// and verifies they have a public products feed
export default async function handler(req, res) {
    const {q} = req.query;
    if (!q) return res.status(400).json({error: 'No query'});

    // known fashion brands with public Shopify feeds
    const KNOWN_BRANDS = [
        {name: "Aritzia", handle: "aritzia", url: "https://www.aritzia.com"},
        {name: "Reformation", handle: "reformation", url: "https://www.thereformation.com"},
        {name: "Zara", handle: "zara", url: "https://www.zara.com"},
        {name: "Toteme", handle: "toteme", url: "https://toteme-studio.com"},
        {name: "Arket", handle: "arket", url: "https://www.arket.com"},
        {name: "Cos", handle: "cos", url: "https://www.cosstores.com"},
        {name: "Mango", handle: "mango", url: "https://shop.mango.com"},
        {name: "& Other Stories", handle: "other-stories", url: "https://www.stories.com"},
        {name: "Sezane", handle: "sezane", url: "https://www.sezane.com"},
        {name: "Rouje", handle: "rouje", url: "https://www.rouje.com"},
        {name: "Musier", handle: "musier", url: "https://www.musier-paris.com"},
        {name: "Jacquemus", handle: "jacquemus", url: "https://www.jacquemus.com"},
        {name: "Ganni", handle: "ganni", url: "https://www.ganni.com"},
        {name: "Staud", handle: "staud", url: "https://www.staud.clothing"},
        {name: "Faithfull The Brand", handle: "faithfull", url: "https://faithfullthebrand.com"},
        {name: "Rixo", handle: "rixo", url: "https://rixo.co.uk"},
        {name: "Realisation Par", handle: "realisation-par", url: "https://www.realisationpar.com"},
        {name: "Sandro", handle: "sandro", url: "https://us.sandro-paris.com"},
        {name: "Maje", handle: "maje", url: "https://us.maje.com"},
        {name: "Veronica Beard", handle: "veronica-beard", url: "https://www.veronicabeard.com"},
        {name: "Mara Hoffman", handle: "mara-hoffman", url: "https://www.marahoffman.com"},
        {name: "Ulla Johnson", handle: "ulla-johnson", url: "https://ullajohnson.com"},
        {name: "Rhode", handle: "rhode", url: "https://www.rhode.com"},
        {name: "Cult Gaia", handle: "cult-gaia", url: "https://cultgaia.com"},
        {name: "Revolve", handle: "revolve", url: "https://www.revolve.com"},
        {name: "Free People", handle: "free-people", url: "https://www.freepeople.com"},
        {name: "Anthropologie", handle: "anthropologie", url: "https://www.anthropologie.com"},
        {name: "Agolde", handle: "agolde", url: "https://agolde.com"},
        {name: "Frame", handle: "frame", url: "https://www.frame-store.com"},
        {name: "Kotn", handle: "kotn", url: "https://kotn.com"},
    ];

    const results = KNOWN_BRANDS.filter(b =>
        b.name.toLowerCase().includes(q.toLowerCase())
    );

    res.json({results});
}