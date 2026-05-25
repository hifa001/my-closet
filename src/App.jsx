import {useState, useRef, useEffect} from "react";
import {removeBackground} from "@imgly/background-removal";

const C = {
  bg: "#ffffff",
  surface: "#ffffff",
  surface2: "#f8f8f8",
  accent: "#111111",
  accentMid: "#333333",
  accentLight: "#f0f0f0",
  text: "#111111",
  textMid: "#555555",
  textMuted: "#a0a0a0",
  border: "rgba(0,0,0,0.08)",
  borderMed: "rgba(0,0,0,0.14)",
};
const PF = "'Playfair Display', Georgia, serif";

const COLORS = [
  {name: "Black", hex: "#1a1a1a"}, {name: "Brown", hex: "#6b3f1f"}, {name: "Blue", hex: "#2a5ba8"},
  {name: "Purple", hex: "#7030a0"}, {name: "Pink", hex: "#e87090"}, {name: "Orange", hex: "#e07020"},
  {name: "Green", hex: "#2a7a30"}, {name: "Yellow", hex: "#ddb800"}, {name: "Red", hex: "#c02020"},
  {name: "Grey", hex: "#7a7a7a"}, {name: "Beige", hex: "#d4b896"}, {name: "White", hex: "#f0f0f0", border: true},
  {name: "Silver", hex: "#b0b0b8"}, {name: "Gold", hex: "#c9a84c"},
];

const CATEGORIES = [
  {name: "Tops", sub: ["T-shirt", "Blouse", "Shirt", "Sweater", "Hoodie", "Tank", "Cardigan"]},
  {name: "Bottoms", sub: ["Jeans", "Trousers", "Shorts", "Skirt", "Leggings"]},
  {name: "One Piece", sub: ["Dress", "Jumpsuit", "Romper", "Co-ord"]},
  {name: "Outerwear", sub: ["Coat", "Jacket", "Blazer", "Vest", "Puffer"]},
  {name: "Shoes", sub: ["Sneakers", "Heels", "Boots", "Loafers", "Sandals", "Flats"]},
  {name: "Accessories", sub: ["Bag", "Belt", "Hat", "Scarf", "Jewelry", "Sunglasses", "Watch"]},
  {name: "Activewear", sub: ["Sports Bra", "Leggings", "Shorts", "Jacket"]},
  {name: "Swimwear", sub: ["One-piece", "Bikini", "Cover-up"]},
];

const MATERIALS = ["Cotton", "Linen", "Silk", "Wool", "Cashmere", "Polyester", "Nylon", "Denim", "Leather", "Faux Leather", "Knit", "Jersey", "Chiffon", "Satin", "Velvet", "Suede", "Rayon", "Bamboo", "Tencel"];
const CONDITIONS = ["New with tags", "New without tags", "Excellent", "Good", "Fair", "Poor"];
const SEASONS = ["Spring", "Summer", "Fall", "Winter", "All Season"];

const SAMPLE = [
  {id: 1, brand: "Free People", name: "Ribbed Tank", category: "Tops", sub: "Tank", size: "S", color: "Black", hex: "#1a1a1a", material: "Cotton", price: 68, wears: 14, secondhand: false, season: "All Season", condition: "Good", note: "", desc: "", origin: "", url: "", photo: null, conditionDetails: "", iconBg: "transparent"},
  {id: 2, brand: "Gilli", name: "Floral Midi Dress", category: "One Piece", sub: "Dress", size: "S", color: "Black", hex: "#1a1a1a", material: "Polyester", price: 95, wears: 3, secondhand: false, season: "Summer", condition: "Excellent", note: "", desc: "", origin: "", url: "", photo: null, conditionDetails: "", iconBg: "transparent"},
  {id: 3, brand: "Levi's", name: "501 Straight Jeans", category: "Bottoms", sub: "Jeans", size: "27", color: "Blue", hex: "#2a5ba8", material: "Denim", price: 128, wears: 22, secondhand: false, season: "All Season", condition: "Good", note: "", desc: "", origin: "USA", url: "", photo: null, conditionDetails: "", iconBg: "transparent"},
  {id: 4, brand: "Levi's", name: "Dark Wash Flare", category: "Bottoms", sub: "Jeans", size: "27", color: "Black", hex: "#1a1a1a", material: "Denim", price: 98, wears: 8, secondhand: false, season: "All Season", condition: "Good", note: "", desc: "", origin: "", url: "", photo: null, conditionDetails: "", iconBg: "transparent"},
  {id: 5, brand: "Levi's", name: "Light Wash Straight", category: "Bottoms", sub: "Jeans", size: "28", color: "Blue", hex: "#5b8ed4", material: "Denim", price: 108, wears: 11, secondhand: true, season: "All Season", condition: "Good", note: "", desc: "", origin: "", url: "", photo: null, conditionDetails: "", iconBg: "transparent"},
  {id: 6, brand: "ARITZIA", name: "Mini Micro Skirt", category: "Bottoms", sub: "Skirt", size: "S", color: "Brown", hex: "#5a2e10", material: "Cotton", price: 65, wears: 4, secondhand: false, season: "Summer", condition: "Excellent", note: "", desc: "", origin: "", url: "", photo: null, conditionDetails: "", iconBg: "transparent"},
  {id: 7, brand: "COS", name: "Muscle Tee", category: "Tops", sub: "T-shirt", size: "S", color: "White", hex: "#f0f0f0", material: "Cotton", price: 45, wears: 18, secondhand: false, season: "All Season", condition: "Good", note: "", desc: "", origin: "", url: "", photo: null, conditionDetails: "", iconBg: "transparent"},
  {id: 8, brand: "New Balance", name: "550 Sneakers", category: "Shoes", sub: "Sneakers", size: "7", color: "White", hex: "#f5f5f5", material: "Leather", price: 110, wears: 25, secondhand: false, season: "All Season", condition: "Good", note: "", desc: "", origin: "USA", url: "", photo: null, conditionDetails: "", iconBg: "transparent"},
  {id: 9, brand: "Zara", name: "Wide Leg Trousers", category: "Bottoms", sub: "Trousers", size: "S", color: "Beige", hex: "#d4b896", material: "Linen", price: 59, wears: 7, secondhand: false, season: "Summer", condition: "Good", note: "", desc: "", origin: "", url: "", photo: null, conditionDetails: "", iconBg: "transparent"},
];

const BOOKMARKS = ["Ganni", "Faithfull The Brand", "Kotn", "Reformation", "Toteme", "Arket"];

const BRAND_CATALOG = [
  {handle: "ganni", name: "Ganni", url: "https://www.ganni.com"},
  {handle: "reformation", name: "Reformation", url: "https://www.thereformation.com"},
  {handle: "toteme", name: "Toteme", url: "https://toteme-studio.com"},
  {handle: "arket", name: "Arket", url: "https://www.arket.com"},
  {handle: "kotn", name: "Kotn", url: "https://kotn.com"},
  {handle: "cos", name: "COS", url: "https://www.cos.com"},
  {handle: "sezane", name: "Sézane", url: "https://www.sezane.com"},
  {handle: "andotherstories", name: "& Other Stories", url: "https://www.stories.com"},
  {handle: "aritzia", name: "Aritzia", url: "https://www.aritzia.com"},
  {handle: "zara", name: "Zara", url: "https://www.zara.com"},
  {handle: "mango", name: "Mango", url: "https://www.mango.com"},
  {handle: "acnestudios", name: "Acne Studios", url: "https://www.acnestudios.com"},
  {handle: "isabelmarant", name: "Isabel Marant", url: "https://www.isabelmarant.com"},
  {handle: "stellamccartney", name: "Stella McCartney", url: "https://www.stellamccartney.com"},
  {handle: "amiparis", name: "AMI Paris", url: "https://www.amiparis.com"},
  {handle: "jcrew", name: "J.Crew", url: "https://www.jcrew.com"},
  {handle: "madewell", name: "Madewell", url: "https://www.madewell.com"},
  {handle: "everlane", name: "Everlane", url: "https://www.everlane.com"},
  {handle: "ragbone", name: "Rag & Bone", url: "https://www.rag-bone.com"},
  {handle: "vince", name: "Vince", url: "https://www.vince.com"},
  {handle: "faithfull", name: "Faithfull The Brand", url: "https://faithfullthebrand.com"},
  {handle: "freeople", name: "Free People", url: "https://www.freepeople.com"},
  {handle: "anthropologie", name: "Anthropologie", url: "https://www.anthropologie.com"},
  {handle: "revolve", name: "Revolve", url: "https://www.revolve.com"},
  {handle: "mmlafleur", name: "M.M. LaFleur", url: "https://mmlafleur.com"},
];
const EMPTY = {brand: "", name: "", category: "Tops", sub: "T-shirt", size: "", color: "Black", hex: "#1a1a1a", material: "Cotton", price: "", wears: 0, secondhand: false, season: "All Season", condition: "Good", note: "", desc: "", origin: "", url: "", photo: null, conditionDetails: "", iconBg: "transparent"};

const CHECKER_BG = "repeating-conic-gradient(#d8d8d8 0% 25%,#ffffff 0% 50%) 0 0/14px 14px";
const ICON_BG_PRESETS = [
  {label: "None", value: "transparent"},
  {label: "Checker", value: "checker"},
  {label: "White", value: "#ffffff"},
  {label: "Cream", value: "#f7f4ef"},
  {label: "Sage", value: "#e8f0eb"},
];
const photoBg = (iconBg) => iconBg === "checker" ? CHECKER_BG : (iconBg || "transparent");

function Placeholder({item, size = 80}) {
  const bg = item.hex === "#f0f0f0" ? "#ddd" : item.hex + "30";
  return (
    <div style={{width: "100%", height: "100%", background: bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4}}>
      <div style={{width: size * 0.32, height: size * 0.32, borderRadius: "50%", background: item.hex, border: item.color === "White" ? `1px solid ${C.border}` : "none"}} />
      <div style={{fontSize: Math.max(8, size * 0.1), color: C.textMuted, textAlign: "center"}}>{item.sub || item.category}</div>
    </div>
  );
}

function ColorBar({items}) {
  const counts = {};
  items.forEach(i => {counts[i.hex] = (counts[i.hex] || 0) + 1;});
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  const total = items.length || 1;
  return (
    <div style={{display: "flex", borderRadius: 5, overflow: "hidden", height: 18}}>
      {sorted.map(([hex, n]) => <div key={hex} style={{flex: n, background: hex, minWidth: 2}} />)}
    </div>
  );
}

function DonutChart({segs, size = 140}) {
  let angle = -90;
  const total = segs.reduce((s, g) => s + g.v, 0) || 1;
  const paths = segs.map((seg, i) => {
    const pct = seg.v / total;
    if (pct === 0) return null;
    const s = angle * Math.PI / 180;
    angle += pct * 360;
    const e = angle * Math.PI / 180;
    const r = size / 2 - 12, cx = size / 2, cy = size / 2;
    const x1 = cx + r * Math.cos(s), y1 = cy + r * Math.sin(s), x2 = cx + r * Math.cos(e), y2 = cy + r * Math.sin(e);
    return <path key={i} d={`M${cx},${cy} L${x1.toFixed(1)},${y1.toFixed(1)} A${r},${r} 0 ${pct > 0.5 ? 1 : 0},1 ${x2.toFixed(1)},${y2.toFixed(1)} Z`} fill={seg.c} />;
  });
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {paths}
      <circle cx={size / 2} cy={size / 2} r={size / 2 - 26} fill={C.surface} />
    </svg>
  );
}

export default function App() {
  const [items, setItems] = useState(() => {
    try {const s = localStorage.getItem('closet-items'); return s ? JSON.parse(s) : SAMPLE;} catch {return SAMPLE;}
  });
  const [tab, setTab] = useState("closet");
  const [closetTab, setClosetTab] = useState("items");
  const [filterCat, setFilterCat] = useState("All");
  const [searchQ, setSearchQ] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [showClip, setShowClip] = useState(false);
  const [clipUrl, setClipUrl] = useState("");
  const [clipStep, setClipStep] = useState(0);
  const [outfits, setOutfits] = useState(() => {
    try {const s = localStorage.getItem('closet-outfits'); return s ? JSON.parse(s) : [];} catch {return [];}
  });
  const [collections, setCollections] = useState(() => {
    try {const s = localStorage.getItem('closet-collections'); return s ? JSON.parse(s) : [];} catch {return [];}
  });
  const [wishlist, setWishlist] = useState(() => {
    try {const s = localStorage.getItem('closet-wishlist'); return s ? JSON.parse(s) : [];} catch {return [];}
  });
  const [collTab, setCollTab] = useState("Packing");
  const [showOutfitBuilder, setShowOutfitBuilder] = useState(false);
  const [outfitName, setOutfitName] = useState("");
  const [statView, setStatView] = useState("clothing");
  const [showCollage, setShowCollage] = useState(false);
  const [collageOutfit, setCollageOutfit] = useState(null);
  const [showGhostModel, setShowGhostModel] = useState(false);
  const [ghostOutfit, setGhostOutfit] = useState(null);
  const [calOutfits, setCalOutfits] = useState(() => {
    try {const s = localStorage.getItem('closet-caloutfits'); return s ? JSON.parse(s) : {};} catch {return {};}
  });
  const [showCalDay, setShowCalDay] = useState(false);
  const [calDay, setCalDay] = useState(null);
  const [calMonth, setCalMonth] = useState(() => ({year: new Date().getFullYear(), month: new Date().getMonth()}));
  const fileRef = useRef();
  const [clipMeta, setClipMeta] = useState(null);
  const [boards, setBoards] = useState(() => {
    try {const s = localStorage.getItem('closet-boards'); return s ? JSON.parse(s) : [{id: 1, name: "Summer", cover: null}, {id: 2, name: "Workwear", cover: null}, {id: 3, name: "Wishlist", cover: null}, {id: 4, name: "Inspo", cover: null}];} catch {return [{id: 1, name: "Summer", cover: null}, {id: 2, name: "Workwear", cover: null}, {id: 3, name: "Wishlist", cover: null}, {id: 4, name: "Inspo", cover: null}];}
  });
  const [savedItems, setSavedItems] = useState(() => {
    try {const s = localStorage.getItem('closet-saved'); return s ? JSON.parse(s) : [];} catch {return [];}
  });
  const [discoverTab, setDiscoverTab] = useState("feed");
  const [viewBoard, setViewBoard] = useState(null);
  const [savedFilter, setSavedFilter] = useState(null);
  const [discoverSearch, setDiscoverSearch] = useState("");
  const [processingBg, setProcessingBg] = useState(false);
  const [browseProducts, setBrowseProducts] = useState([]);
  const [browseLoading, setBrowseLoading] = useState(false);
  const [browseCursor, setBrowseCursor] = useState(null);
  const [browseHasMore, setBrowseHasMore] = useState(true);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [photoUrlInput, setPhotoUrlInput] = useState("");
  const [showPinPicker, setShowPinPicker] = useState(false);
  const [pinItem, setPinItem] = useState(null);
  const [followedBrands, setFollowedBrands] = useState(() => {
    try {const s = localStorage.getItem('closet-brands'); return s ? JSON.parse(s) : [];} catch {return [];}
  });
  const [brandSearch, setBrandSearch] = useState("");
  const [brandResults, setBrandResults] = useState([]);
  const [feedProducts, setFeedProducts] = useState([]);
  const [feedLoading, setFeedLoading] = useState(false);
  useEffect(() => {
    if (tab === "discover" && discoverTab === "feed" && followedBrands.length > 0) {
      loadFeed(followedBrands);
    }
  }, [tab]);

  useEffect(() => {
    localStorage.setItem('closet-items', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('closet-outfits', JSON.stringify(outfits));
  }, [outfits]);

  useEffect(() => {
    localStorage.setItem('closet-collections', JSON.stringify(collections));
  }, [collections]);

  useEffect(() => {
    localStorage.setItem('closet-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('closet-caloutfits', JSON.stringify(calOutfits));
  }, [calOutfits]);

  useEffect(() => {
    localStorage.setItem('closet-boards', JSON.stringify(boards));
  }, [boards]);

  useEffect(() => {
    localStorage.setItem('closet-saved', JSON.stringify(savedItems));
  }, [savedItems]);

  useEffect(() => {
    localStorage.setItem('closet-brands', JSON.stringify(followedBrands));
  }, [followedBrands]);

  const setF = (k, v) => setForm(p => ({...p, [k]: v}));
  const subCats = CATEGORIES.find(c => c.name === form.category)?.sub || [];

  const handlePhoto = async (e) => {
    const f = e.target.files[0]; if (!f) return;
    setProcessingBg(true);
    try {
      const blob = await removeBackground(f, {
        output: {format: "image/png", quality: 1},
        progress: () => {},
      });
      const reader = new FileReader();
      reader.onload = ev => {setF("photo", ev.target.result); setProcessingBg(false);};
      reader.readAsDataURL(blob);
    } catch {
      const r = new FileReader();
      r.onload = ev => {setF("photo", ev.target.result); setProcessingBg(false);};
      r.readAsDataURL(f);
    }
  };

  const handlePhotoUrl = async (url) => {
    const src = url.trim(); if (!src) return;
    setProcessingBg(true);
    setShowUrlInput(false);
    setPhotoUrlInput("");
    try {
      const resp = await fetch(src);
      const blob = await resp.blob();
      try {
        const bgBlob = await removeBackground(blob, {output: {format: "image/png", quality: 1}, progress: () => {}});
        const reader = new FileReader();
        reader.onload = ev => {setF("photo", ev.target.result); setProcessingBg(false);};
        reader.readAsDataURL(bgBlob);
      } catch {
        const reader = new FileReader();
        reader.onload = ev => {setF("photo", ev.target.result); setProcessingBg(false);};
        reader.readAsDataURL(blob);
      }
    } catch {
      setF("photo", src);
      setProcessingBg(false);
    }
  };

  const fetchBrowse = async (cursor = null) => {
    if (browseLoading) return;
    setBrowseLoading(true);
    try {
      const after = cursor ? `, after: "${cursor}"` : "";
      const q = `{ products(first: 16${after}) { pageInfo { hasNextPage endCursor } edges { node { id title vendor priceRange { minVariantPrice { amount currencyCode } } images(first: 1) { edges { node { url } } } } } } }`;
      const res = await fetch("https://mock.shop/api", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({query: q}),
      });
      const {data} = await res.json();
      const prods = data.products.edges.map(e => e.node);
      setBrowseProducts(p => cursor ? [...p, ...prods] : prods);
      setBrowseCursor(data.products.pageInfo.endCursor);
      setBrowseHasMore(data.products.pageInfo.hasNextPage);
    } catch { /* fail silently */}
    setBrowseLoading(false);
  };

  useEffect(() => {
    if (tab === "discover" && discoverTab === "shop" && browseProducts.length === 0 && !browseLoading) {
      fetchBrowse();
    }
  }, [tab, discoverTab]);

  const openAdd = () => {setEditItem(null); setForm(EMPTY); setShowUrlInput(false); setPhotoUrlInput(""); setShowAdd(true);};
  const openEdit = (item) => {setEditItem(item); setForm({...item}); setShowAdd(true);};
  const closeAdd = () => {setShowAdd(false); setEditItem(null); setForm(EMPTY);};
  const saveItem = () => {
    if (!form.brand && !form.name) return;
    if (editItem) setItems(p => p.map(i => i.id === editItem.id ? {...form, id: editItem.id, price: +form.price || 0} : i));
    else setItems(p => [...p, {...form, id: Date.now(), price: +form.price || 0, wears: 0}]);
    closeAdd();
  };
  const deleteItem = (id) => {setItems(p => p.filter(i => i.id !== id)); closeAdd();};

  const filtered = items.filter(i => {
    const mc = filterCat === "All" || i.category === filterCat;
    const q = searchQ.toLowerCase();
    const mq = !q || [i.name, i.brand, i.color, i.material, i.sub].some(s => (s || "").toLowerCase().includes(q));
    return mc && mq;
  });

  const totalSpend = items.reduce((s, i) => s + i.price, 0);
  const totalValue = items.reduce((s, i) => s + Math.round(i.price * (i.secondhand ? 1.35 : 0.65)), 0);
  const totalWears = items.reduce((s, i) => s + i.wears, 0);
  const avgCPW = totalWears > 0 ? (totalSpend / totalWears).toFixed(2) : "—";
  const neverWorn = items.filter(i => i.wears === 0);
  const secondhandPct = Math.round(items.filter(i => i.secondhand).length / Math.max(items.length, 1) * 100);
  const colorSegs = (() => {const cc = {}; items.forEach(i => {cc[i.hex] = (cc[i.hex] || 0) + 1}); return Object.entries(cc).map(([c, v]) => ({c, v}));})();
  const catSegs = CATEGORIES.map((c, i) => ({v: items.filter(x => x.category === c.name).length, c: ["#1a1a1a", "#2a5ba8", "#c4b49a", "#6b7c4e", "#c9a84c", "#c17070", "#7030a0", "#2a7a30"][i]}));
  const topColor = (() => {const cc = {}; items.forEach(i => {cc[i.color] = (cc[i.color] || 0) + 1}); const t = Object.entries(cc).sort((a, b) => b[1] - a[1])[0]; return t ? {name: t[0], pct: Math.round(t[1] / items.length * 100)} : {name: "—", pct: 0};})();

  const Row = ({label, sub, val, onClick}) => (
    <div onClick={onClick} style={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 0", borderBottom: `0.5px solid ${C.border}`, cursor: onClick ? "pointer" : "default"}}>
      <div>
        <div style={{fontSize: 14, color: C.text}}>{label}</div>
        {sub && <div style={{fontSize: 11, color: C.textMuted, marginTop: 2}}>{sub}</div>}
      </div>
      <div style={{display: "flex", alignItems: "center", gap: 8, color: C.textMuted}}>
        {val && <span style={{fontSize: 13, color: C.textMid}}>{val}</span>}
        {onClick && <span style={{fontSize: 18}}>›</span>}
      </div>
    </div>
  );

  const Card = ({style, children}) => (
    <div style={{background: C.surface, overflow: "hidden", ...style}}>{children}</div>
  );

  const CardHead = ({icon, title, sub}) => (
    <div style={{padding: "4px 0 12px", display: "flex", alignItems: "center", gap: 10}}>
      {icon && <i className={`ti ti-${icon}`} style={{fontSize: 18, color: C.textMuted}} aria-hidden="true" />}
      <div>
        <div style={{fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: C.textMuted}}>{title}</div>
        {sub && <div style={{fontSize: 11, color: C.textMuted, marginTop: 1}}>{sub}</div>}
      </div>
    </div>
  );

  // ── Screens ─────────────────────────────────────────────────────────────

  const TodayScreen = () => (
    <div style={{padding: "0 0 20px"}}>
      <div style={{padding: "36px 20px 28px"}}>
        <div style={{fontSize: 11, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6}}>
          {new Date().toLocaleDateString("en-US", {weekday: "long", month: "long", day: "numeric"})}
        </div>
        <div style={{fontSize: 34, fontFamily: PF, fontWeight: 400, lineHeight: 1.15}}>Good morning</div>
      </div>

      <div style={{padding: "0 20px 24px", borderBottom: `0.5px solid ${C.border}`}}>
        <div style={{display: "flex", gap: 0, marginBottom: 16}}>
          <div style={{flex: 1}}>
            <div style={{fontSize: 11, color: C.textMuted, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em"}}>Items</div>
            <div style={{fontSize: 36, fontWeight: 300, lineHeight: 1}}>{items.length}</div>
          </div>
          <div style={{flex: 1}}>
            <div style={{fontSize: 11, color: C.textMuted, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em"}}>Closet Value</div>
            <div style={{fontSize: 28, fontWeight: 300, lineHeight: 1}}>${totalValue.toLocaleString()}</div>
          </div>
        </div>
        <div style={{fontSize: 10, color: C.textMuted, marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.06em"}}>Color palette</div>
        <ColorBar items={items} />
      </div>

      {neverWorn.length > 0 && (
        <div style={{padding: "20px 0 20px", borderBottom: `0.5px solid ${C.border}`}}>
          <div style={{padding: "0 20px", display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12}}>
            <div style={{fontSize: 15, fontWeight: 400}}>Never worn</div>
            <div style={{fontSize: 11, color: C.textMuted}}>{neverWorn.length} items</div>
          </div>
          <div style={{display: "flex", gap: 8, padding: "0 0 0 20px", overflowX: "auto"}}>
            {neverWorn.slice(0, 7).map(item => (
              <div key={item.id} onClick={() => openEdit(item)} style={{flexShrink: 0, width: 70, cursor: "pointer"}}>
                <div style={{height: 88, background: item.photo ? photoBg(item.iconBg) : C.surface2, borderRadius: 8, overflow: "hidden", marginBottom: 4}}>
                  {item.photo ? <img src={item.photo} style={{width: "100%", height: "100%", objectFit: "contain"}} /> : <Placeholder item={item} size={68} />}
                </div>
                <div style={{fontSize: 9, color: C.textMuted, textAlign: "center", lineHeight: 1.2}}>{item.brand}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{padding: "20px 20px 0"}}>
        <div style={{fontSize: 15, fontWeight: 400, marginBottom: 16}}>Most worn</div>
        {[...items].sort((a, b) => b.wears - a.wears).slice(0, 4).map((item, i, arr) => (
          <div key={item.id} onClick={() => openEdit(item)} style={{display: "flex", alignItems: "center", gap: 12, paddingBottom: 14, marginBottom: 14, borderBottom: i < arr.length - 1 ? `0.5px solid ${C.border}` : "none", cursor: "pointer"}}>
            <div style={{width: 44, height: 54, background: item.photo ? photoBg(item.iconBg) : C.surface2, borderRadius: 6, overflow: "hidden", flexShrink: 0}}>
              {item.photo ? <img src={item.photo} style={{width: "100%", height: "100%", objectFit: "contain"}} /> : <Placeholder item={item} size={44} />}
            </div>
            <div style={{flex: 1}}>
              <div style={{fontSize: 11, color: C.textMuted}}>{item.brand}</div>
              <div style={{fontSize: 13, fontWeight: 500}}>{item.name}</div>
            </div>
            <div style={{textAlign: "right"}}>
              <div style={{fontSize: 16, fontWeight: 400, color: C.accent}}>{item.wears}×</div>
              <div style={{fontSize: 10, color: C.textMuted}}>CPW ${item.wears > 0 ? (item.price / item.wears).toFixed(0) : "—"}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ClosetScreen = () => (
    <div style={{paddingBottom: 20}}>
      <div style={{padding: "0 16px 10px"}}>
        <div style={{display: "flex", alignItems: "center", gap: 8, background: C.surface2, borderRadius: 22, padding: "9px 14px"}}>
          <i className="ti ti-search" style={{fontSize: 14, color: C.textMuted}} aria-hidden="true" />
          <input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Search brand, category, hashtag…" style={{border: "none", background: "transparent", outline: "none", flex: 1, fontSize: 13, padding: 0}} />
          {searchQ && <button onClick={() => setSearchQ("")} style={{background: "transparent", color: C.textMuted, fontSize: 16, lineHeight: 1}}>×</button>}
        </div>
      </div>

      <div style={{display: "flex", borderBottom: `0.5px solid ${C.border}`, padding: "0 16px"}}>
        {[["items", `Items`, items.length], ["outfits", `Outfits`, outfits.length], ["collections", `Collections`, collections.length]].map(([id, label, count]) => (
          <button key={id} onClick={() => setClosetTab(id)} style={{marginRight: 24, paddingBottom: 8, background: "transparent", color: closetTab === id ? C.text : C.textMuted, fontSize: 13, fontWeight: closetTab === id ? 500 : 400, borderBottom: closetTab === id ? `1.5px solid ${C.accent}` : "1.5px solid transparent", whiteSpace: "nowrap"}}>
            {label} <span style={{fontSize: 11, color: closetTab === id ? C.textMid : C.textMuted}}>{count}</span>
          </button>
        ))}
      </div>

      {closetTab === "items" && <>
        <div style={{display: "flex", gap: 4, padding: "10px 16px 8px", overflowX: "auto"}}>
          {["All", ...CATEGORIES.map(c => c.name)].map(cat => (
            <button key={cat} onClick={() => setFilterCat(cat)} style={{flexShrink: 0, padding: "4px 12px", borderRadius: 20, background: filterCat === cat ? C.accent : "transparent", color: filterCat === cat ? "#fff" : C.textMuted, fontSize: 11, fontWeight: filterCat === cat ? 500 : 400, border: "none"}}>
              {cat}
            </button>
          ))}
        </div>
        <div style={{display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2, padding: "0 2px"}}>
          {filtered.map(item => (
            <div key={item.id} style={{background: "transparent", overflow: "hidden", cursor: "pointer", position: "relative"}} onClick={() => openEdit(item)}>
              <div style={{aspectRatio: "3/4", background: item.photo ? photoBg(item.iconBg) : C.surface2, position: "relative", overflow: "hidden"}}>
                {item.photo ? <img src={item.photo} style={{width: "100%", height: "100%", objectFit: "contain"}} /> : <Placeholder item={item} size={80} />}
                {item.secondhand && <div style={{position: "absolute", top: 5, left: 5, background: C.accent, color: "#fff", fontSize: 8, fontWeight: 600, padding: "2px 5px", borderRadius: 3}}>2ND</div>}
                <button onClick={e => {e.stopPropagation(); setPinItem(item); setShowPinPicker(true);}} style={{position: "absolute", top: 5, right: 5, width: 26, height: 26, background: "rgba(255,255,255,0.9)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "none", boxShadow: "0 1px 4px rgba(0,0,0,0.10)"}}>
                  <i className="ti ti-bookmark" style={{fontSize: 11, color: C.textMid}} aria-hidden="true" />
                </button>
              </div>
              <div style={{padding: "5px 4px 8px"}}>
                <div style={{fontSize: 9, color: C.textMuted, marginBottom: 1}}>{item.brand}</div>
                <div style={{fontSize: 10, fontWeight: 500, lineHeight: 1.3}}>{item.name}</div>
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && <div style={{textAlign: "center", padding: "40px 20px", color: C.textMuted, fontSize: 13}}>No items found</div>}
      </>}

      {closetTab === "outfits" && (
        <div style={{padding: "16px 16px 0"}}>
          <div style={{display: "flex", gap: 8, marginBottom: 20}}>
            <button onClick={() => setShowOutfitBuilder(true)} style={{flex: 1, padding: "11px", background: C.accent, color: "#fff", borderRadius: 22, fontSize: 13, fontWeight: 500}}>+ Build New Outfit</button>
            <button onClick={() => {setCollageOutfit({name: "New Board", items: []}); setShowCollage(true);}} style={{padding: "11px 16px", background: C.surface2, color: C.textMid, borderRadius: 22, fontSize: 13, fontWeight: 400, display: "flex", alignItems: "center", gap: 5}}>
              <i className="ti ti-layout-collage" style={{fontSize: 14}} aria-hidden="true" />
              Board
            </button>
          </div>
          {outfits.length === 0
            ? <div style={{textAlign: "center", padding: "30px", color: C.textMuted, fontSize: 13}}>No outfits yet — build your first look!</div>
            : outfits.map((o, oi, arr) => (
              <div key={o.id} style={{paddingBottom: 18, marginBottom: 18, borderBottom: oi < arr.length - 1 ? `0.5px solid ${C.border}` : "none"}}>
                <div style={{fontSize: 15, fontWeight: 400, marginBottom: 10, fontFamily: PF}}>{o.name}</div>
                <div style={{display: "flex", gap: 4, marginBottom: 12, overflowX: "auto"}}>
                  {o.items.slice(0, 6).map(item => (
                    <div key={item.id} style={{width: 54, height: 68, background: item.photo ? photoBg(item.iconBg) : C.surface2, borderRadius: 6, overflow: "hidden", flexShrink: 0}}>
                      {item.photo ? <img src={item.photo} style={{width: "100%", height: "100%", objectFit: "contain"}} /> : <Placeholder item={item} size={54} />}
                    </div>
                  ))}
                </div>
                <div style={{display: "flex", alignItems: "center", gap: 8}}>
                  <button onClick={() => {setCollageOutfit(o); setShowCollage(true);}} style={{padding: "6px 14px", background: C.accent, color: "#fff", borderRadius: 20, fontSize: 11, fontWeight: 500, display: "flex", alignItems: "center", gap: 4}}>
                    <i className="ti ti-layout-grid" style={{fontSize: 12}} aria-hidden="true" />
                    Collage
                  </button>
                  <button onClick={() => {setGhostOutfit(o); setShowGhostModel(true);}} style={{padding: "6px 14px", background: "transparent", color: C.textMid, borderRadius: 20, fontSize: 11, fontWeight: 400, display: "flex", alignItems: "center", gap: 4, border: `0.5px solid ${C.border}`}}>
                    <i className="ti ti-man" style={{fontSize: 12}} aria-hidden="true" />
                    Model
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete "${o.name}"?`)) {
                        setOutfits(p => p.filter(x => x.id !== o.id));
                      }
                    }}
                    style={{marginLeft: "auto", width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", color: C.textMuted, borderRadius: "50%", flexShrink: 0}}
                  >
                    <i className="ti ti-trash" style={{fontSize: 15}} aria-hidden="true" />
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      )}

      {closetTab === "collections" && (
        <div style={{padding: "16px"}}>
          <div style={{display: "flex", gap: 0, borderBottom: `0.5px solid ${C.border}`, marginBottom: 18}}>
            {[{id: "Packing", icon: "briefcase"}, {id: "Wishlists", icon: "bookmark"}, {id: "Inspiration", icon: "bulb"}, {id: "Capsules", icon: "layout-grid"}].map(c => (
              <button key={c.id} onClick={() => setCollTab(c.id)} style={{flex: 1, padding: "8px 4px", background: "transparent", color: collTab === c.id ? C.text : C.textMuted, fontSize: 11, fontWeight: collTab === c.id ? 500 : 400, borderBottom: collTab === c.id ? `1.5px solid ${C.accent}` : "1.5px solid transparent"}}>
                {c.id}
              </button>
            ))}
          </div>
          {collections.filter(c => c.type === collTab).length === 0
            ? <div style={{textAlign: "center", padding: "20px", color: C.textMuted, fontSize: 13}}>No {collTab.toLowerCase()} yet.</div>
            : collections.filter(c => c.type === collTab).map((c, ci, arr) => (
              <div key={c.id} style={{padding: "12px 0", borderBottom: ci < arr.length - 1 ? `0.5px solid ${C.border}` : "none"}}>
                <div style={{fontSize: 14, fontWeight: 500}}>{c.name}</div>
                <div style={{fontSize: 12, color: C.textMuted, marginTop: 2}}>{c.items?.length || 0} items</div>
              </div>
            ))
          }
          <button onClick={() => {const n = prompt(`New ${collTab.slice(0, -1)} name:`); if (n) setCollections(p => [...p, {id: Date.now(), name: n, type: collTab, items: []}]);}} style={{marginTop: 14, padding: "10px 0", color: C.textMuted, fontSize: 13, background: "transparent", display: "flex", alignItems: "center", gap: 6}}>
            <i className="ti ti-plus" style={{fontSize: 14}} aria-hidden="true" />
            New {collTab.slice(0, -1)}
          </button>
        </div>
      )}
    </div>
  );

  const StyleScreen = () => (
    <div style={{padding: "0 0 40px"}}>
      <div style={{padding: "36px 20px 28px"}}>
        <div style={{fontSize: 30, fontFamily: PF, fontWeight: 400}}>Style Stats</div>
      </div>

      <div style={{padding: "0 20px 20px", borderBottom: `0.5px solid ${C.border}`}}>
        <button style={{width: "100%", background: C.surface2, borderRadius: 22, padding: "14px 16px", display: "flex", alignItems: "center", gap: 14, textAlign: "left"}}>
          <i className="ti ti-ruler-measure" style={{fontSize: 22, color: C.textMuted}} aria-hidden="true" />
          <div>
            <div style={{fontSize: 13, fontWeight: 500, color: C.text}}>Size Tracker</div>
            <div style={{fontSize: 11, color: C.textMuted}}>Your measurements and sizes</div>
          </div>
          <span style={{marginLeft: "auto", color: C.textMuted, fontSize: 18}}>›</span>
        </button>
      </div>

      <div style={{padding: "24px 20px", borderBottom: `0.5px solid ${C.border}`}}>
        <div style={{fontSize: 11, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 16}}>Wardrobe</div>
        <div style={{display: "flex", gap: 0, marginBottom: 16}}>
          <div style={{flex: 1}}>
            <div style={{fontSize: 36, fontWeight: 300, lineHeight: 1}}>{items.length}</div>
            <div style={{fontSize: 11, color: C.textMuted, marginTop: 4}}>items</div>
          </div>
          <div style={{flex: 1}}>
            <div style={{fontSize: 28, fontWeight: 300, lineHeight: 1}}>${totalValue.toLocaleString()}</div>
            <div style={{fontSize: 11, color: C.textMuted, marginTop: 4}}>closet value</div>
          </div>
        </div>
        <div style={{fontSize: 10, color: C.textMuted, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em"}}>Color palette</div>
        <ColorBar items={items} />
        <div style={{marginTop: 16}}>
          <Row label={`${items.filter(i => i.wears === 0).length} items never worn`} />
          <Row label="Cost per Wear" sub={`Avg $${avgCPW}`} />
          <Row label="Purchase Price" sub={`Total $${totalSpend.toLocaleString()}`} />
          <Row label="Worn History" sub="Top 100 Most and Least Worn" />
        </div>
      </div>

      <div style={{padding: "24px 20px", borderBottom: `0.5px solid ${C.border}`}}>
        <div style={{fontSize: 11, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 16}}>Browse By</div>
        <div style={{display: "flex", alignItems: "center", gap: 24, marginBottom: 20}}>
          <DonutChart segs={colorSegs} size={130} />
          <div>
            <div style={{fontSize: 32, fontWeight: 300, lineHeight: 1}}>{topColor.pct}%</div>
            <div style={{fontSize: 15, fontWeight: 400, color: C.text, marginTop: 4}}>{topColor.name}</div>
            <div style={{fontSize: 11, color: C.textMuted, marginTop: 2}}>top color</div>
          </div>
        </div>
        {["Color", "Status", "Price", "Fabric", "Size", "Season", "Brand"].map(l => <Row key={l} label={l} />)}
      </div>

      <div style={{padding: "24px 20px", borderBottom: `0.5px solid ${C.border}`}}>
        <div style={{fontSize: 11, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 16}}>Composition</div>
        {CATEGORIES.map(cat => {
          const count = items.filter(i => i.category === cat.name).length;
          if (count === 0) return null;
          const pct = Math.round(count / items.length * 100);
          return (
            <div key={cat.name} style={{marginBottom: 12}}>
              <div style={{display: "flex", justifyContent: "space-between", marginBottom: 5}}>
                <span style={{fontSize: 12, color: C.textMid}}>{cat.name}</span>
                <span style={{fontSize: 12, color: C.textMuted}}>{count} · {pct}%</span>
              </div>
              <div style={{height: 3, background: C.surface2, borderRadius: 2, overflow: "hidden"}}>
                <div style={{height: "100%", width: `${pct}%`, background: C.accent, borderRadius: 2, transition: "width 0.4s"}} />
              </div>
            </div>
          );
        })}
        {items.length === 0 && <div style={{fontSize: 12, color: C.textMuted}}>Add items to see composition.</div>}
      </div>

      <div style={{padding: "24px 20px"}}>
        <div style={{fontSize: 11, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 16}}>Looks</div>
        <div style={{display: "flex", gap: 0, marginBottom: 12}}>
          <div style={{flex: 1}}>
            <div style={{fontSize: 36, fontWeight: 300, lineHeight: 1}}>{outfits.length}</div>
            <div style={{fontSize: 11, color: C.textMuted, marginTop: 4}}>outfits</div>
          </div>
          <div style={{flex: 1}}>
            <div style={{fontSize: 28, fontWeight: 300, lineHeight: 1}}>{outfits.length > 0 ? Math.round(outfits.reduce((s, o) => s + o.items.length, 0) / outfits.length) : 0}</div>
            <div style={{fontSize: 11, color: C.textMuted, marginTop: 4}}>avg items per look</div>
          </div>
        </div>
        <Row label="Worn History" sub="100 Most Recently Added" />
        <Row label="100 Most Packed" />
      </div>
    </div>
  );

  const SavedCard = ({s, onOwn, onRemove}) => (
    <div style={{background: "transparent", overflow: "hidden", marginBottom: 12}}>
      <div style={{position: "relative"}}>
        {s.image
          ? <img src={s.image} style={{width: "100%", aspectRatio: "3/4", objectFit: "cover", borderRadius: 10, display: "block"}} />
          : <div style={{width: "100%", aspectRatio: "3/4", background: C.surface2, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center"}}><i className="ti ti-photo" style={{fontSize: 28, color: C.border}} aria-hidden="true" /></div>
        }
        <button onClick={onRemove} style={{position: "absolute", top: 6, right: 6, width: 24, height: 24, background: "rgba(255,255,255,0.88)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.10)"}}>
          <i className="ti ti-x" style={{fontSize: 10, color: C.textMuted}} aria-hidden="true" />
        </button>
      </div>
      <div style={{padding: "6px 2px 0"}}>
        {s.brand && <div style={{fontSize: 9, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.06em"}}>{s.brand}</div>}
        {s.name && <div style={{fontSize: 11, fontWeight: 500, marginTop: 1, lineHeight: 1.3}}>{s.name}</div>}
        {s.price && <div style={{fontSize: 11, color: C.textMid, marginTop: 1}}>${s.price}</div>}
        <button onClick={onOwn} style={{marginTop: 5, fontSize: 10, color: C.textMuted, background: "transparent", padding: 0, textDecoration: "underline", textUnderlineOffset: 2}}>I own this</button>
      </div>
    </div>
  );

  const ownThis = (s) => {
    setForm({...EMPTY, photo: s.image || null, brand: s.brand || "", name: s.name || "", price: s.price || "", url: s.url || ""});
    setEditItem(null);
    setShowAdd(true);
  };

  const MasonryGrid = ({items: list}) => {
    const col0 = list.filter((_, i) => i % 2 === 0);
    const col1 = list.filter((_, i) => i % 2 === 1);
    return (
      <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, alignItems: "start"}}>
        <div>{col0.map(s => <SavedCard key={s.id} s={s} onOwn={() => ownThis(s)} onRemove={() => setSavedItems(p => p.filter(x => x.id !== s.id))} />)}</div>
        <div>{col1.map(s => <SavedCard key={s.id} s={s} onOwn={() => ownThis(s)} onRemove={() => setSavedItems(p => p.filter(x => x.id !== s.id))} />)}</div>
      </div>
    );
  };

  const searchBrands = (q) => {
    if (!q.trim()) {setBrandResults([]); return;}
    const lower = q.toLowerCase();
    setBrandResults(BRAND_CATALOG.filter(b => b.name.toLowerCase().includes(lower)).slice(0, 10));
  };

  const loadFeed = async (brands) => {
    if (brands.length === 0) {setFeedProducts([]); return;}
    setFeedLoading(true);
    try {
      const count = Math.min(brands.length * 8, 48);
      const q = `{ products(first: ${count}) { edges { node { id title priceRange { minVariantPrice { amount currencyCode } } images(first: 1) { edges { node { url } } } } } } }`;
      const res = await fetch("https://mock.shop/api", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({query: q}),
      });
      const {data} = await res.json();
      const prods = data.products.edges.map((e, i) => {
        const brand = brands[i % brands.length];
        const {amount} = e.node.priceRange.minVariantPrice;
        return {
          id: e.node.id,
          title: e.node.title,
          image: e.node.images.edges[0]?.node.url || null,
          price: parseFloat(amount).toFixed(0),
          url: brand.url,
          brandName: brand.name,
          brandHandle: brand.handle,
        };
      });
      // shuffle so brands are interleaved
      setFeedProducts(prods.sort(() => Math.random() - 0.5));
    } catch {
      setFeedProducts([]);
    } finally {
      setFeedLoading(false);
    }
  };

  const DiscoverScreen = () => {
    const displayed = savedFilter ? savedItems.filter(s => s.boardId === savedFilter) : savedItems;
    return (
      <div style={{paddingBottom: 20}}>
        <div style={{padding: "20px 20px 14px"}}>
          <div style={{fontSize: 24, fontWeight: 300, fontFamily: "'Cormorant Garamond', serif"}}>Discover</div>
        </div>

        {/* sub tabs */}
        <div style={{display: "flex", borderBottom: `1px solid ${C.border}`, marginBottom: 0}}>
          {[["feed", "My Feed"], ["brands", "Brands"], ["boards", "Boards"], ["saved", "Saved"]].map(([id, label]) => (
            <button key={id} onClick={() => {
              setDiscoverTab(id);
              if (id === "feed") loadFeed(followedBrands);
            }} style={{padding: "10px 20px", background: "transparent", color: discoverTab === id ? C.text : C.textMuted, fontSize: 12, fontWeight: discoverTab === id ? 500 : 400, letterSpacing: "0.03em", borderBottom: discoverTab === id ? `2px solid ${C.text}` : "2px solid transparent"}}>
              {label}
            </button>
          ))}
        </div>

        {/* FEED TAB */}
        {discoverTab === "feed" && (
          <div>
            {followedBrands.length === 0 ? (
              <div style={{textAlign: "center", padding: "60px 30px"}}>
                <div style={{fontSize: 32, marginBottom: 12}}>✦</div>
                <div style={{fontSize: 15, fontWeight: 500, marginBottom: 8}}>Your feed is empty</div>
                <div style={{fontSize: 13, color: C.textMuted, marginBottom: 20}}>Follow brands to see their latest products here</div>
                <button onClick={() => setDiscoverTab("brands")} style={{padding: "10px 24px", background: C.accent, color: "#fff", borderRadius: 6, fontSize: 13, fontWeight: 500}}>Browse Brands</button>
              </div>
            ) : feedLoading ? (
              <div style={{textAlign: "center", padding: "60px 20px"}}>
                <div style={{width: 32, height: 32, border: `2px solid ${C.accent}`, borderTopColor: "transparent", borderRadius: 16, margin: "0 auto 12px", animation: "spin 0.8s linear infinite"}} />
                <div style={{fontSize: 13, color: C.textMuted}}>Loading your feed…</div>
              </div>
            ) : (
              <>
                {/* followed brands pills */}
                <div style={{display: "flex", gap: 8, padding: "12px 16px", overflowX: "auto", borderBottom: `0.5px solid ${C.border}`}}>
                  {followedBrands.map(b => (
                    <div key={b.handle} style={{flexShrink: 0, padding: "5px 12px", borderRadius: 20, background: C.surface2, fontSize: 11, color: C.textMid, whiteSpace: "nowrap"}}>
                      {b.name}
                    </div>
                  ))}
                  <button onClick={() => setDiscoverTab("brands")} style={{flexShrink: 0, padding: "5px 12px", borderRadius: 20, background: "transparent", border: `1px dashed ${C.borderMed}`, fontSize: 11, color: C.textMuted, whiteSpace: "nowrap"}}>+ Add brand</button>
                </div>

                {/* product grid */}
                <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: C.border}}>
                  {feedProducts.map((product, i) => (
                    <div key={`${product.id}-${i}`} style={{background: "#fff", position: "relative"}}>
                      <a href={product.url} target="_blank" rel="noreferrer" style={{textDecoration: "none", color: "inherit"}}>
                        <div style={{aspectRatio: "3/4", background: C.surface2, overflow: "hidden"}}>
                          <img src={product.image} alt={product.title} style={{width: "100%", height: "100%", objectFit: "cover"}} loading="lazy" />
                        </div>
                        <div style={{padding: "8px 10px 12px"}}>
                          <div style={{fontSize: 10, color: C.textMuted, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 2}}>{product.brandName}</div>
                          <div style={{fontSize: 12, color: C.text, lineHeight: 1.3, marginBottom: 4}}>{product.title}</div>
                          {product.price && <div style={{fontSize: 12, color: C.textMuted}}>${product.price}</div>}
                        </div>
                      </a>
                      {/* save to closet button */}
                      <button onClick={() => {
                        setForm({...EMPTY, name: product.title, brand: product.brandName, price: product.price || "", url: product.url, photo: product.image});
                        setShowAdd(true);
                      }} style={{position: "absolute", top: 8, right: 8, width: 30, height: 30, borderRadius: 15, background: "rgba(255,255,255,0.92)", border: "none", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.15)", cursor: "pointer"}}>+</button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* BRANDS TAB */}
        {discoverTab === "brands" && (
          <div style={{padding: "16px"}}>
            {/* search */}
            <div style={{display: "flex", alignItems: "center", gap: 8, background: C.surface2, borderRadius: 10, border: `0.5px solid ${C.border}`, padding: "8px 12px", marginBottom: 16}}>
              <i className="ti ti-search" style={{fontSize: 15, color: C.textMuted}} aria-hidden="true" />
              <input
                value={brandSearch}
                onChange={e => {setBrandSearch(e.target.value); searchBrands(e.target.value);}}
                placeholder="Search brands…"
                style={{border: "none", background: "transparent", outline: "none", flex: 1, fontSize: 13, padding: 0}}
              />
            </div>

            {/* search results */}
            {brandResults.length > 0 && (
              <div style={{marginBottom: 24}}>
                <div style={{fontSize: 11, color: C.textMuted, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10}}>Results</div>
                {brandResults.map(b => {
                  const following = followedBrands.find(f => f.handle === b.handle);
                  return (
                    <div key={b.handle} style={{display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: `0.5px solid ${C.border}`}}>
                      <div>
                        <div style={{fontSize: 14, fontWeight: 500}}>{b.name}</div>
                        <div style={{fontSize: 11, color: C.textMuted, marginTop: 2}}>{b.url.replace("https://", "")}</div>
                      </div>
                      <button onClick={() => {
                        if (following) {
                          setFollowedBrands(p => p.filter(f => f.handle !== b.handle));
                        } else {
                          setFollowedBrands(p => [...p, b]);
                        }
                      }} style={{padding: "6px 16px", borderRadius: 20, background: following ? C.surface2 : C.accent, color: following ? C.textMid : "#fff", fontSize: 12, fontWeight: 500, border: `0.5px solid ${following ? C.border : C.accent}`}}>
                        {following ? "Following" : "Follow"}
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {/* followed brands */}
            {followedBrands.length > 0 && (
              <div>
                <div style={{fontSize: 11, color: C.textMuted, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10}}>Following</div>
                {followedBrands.map(b => (
                  <div key={b.handle} style={{display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: `0.5px solid ${C.border}`}}>
                    <div>
                      <div style={{fontSize: 14, fontWeight: 500}}>{b.name}</div>
                      <div style={{fontSize: 11, color: C.textMuted, marginTop: 2}}>{b.url.replace("https://", "")}</div>
                    </div>
                    <button onClick={() => setFollowedBrands(p => p.filter(f => f.handle !== b.handle))} style={{padding: "6px 16px", borderRadius: 20, background: C.surface2, color: C.textMid, fontSize: 12, border: `0.5px solid ${C.border}`}}>
                      Unfollow
                    </button>
                  </div>
                ))}
              </div>
            )}

            {followedBrands.length === 0 && brandResults.length === 0 && (
              <div style={{textAlign: "center", padding: "40px 20px", color: C.textMuted, fontSize: 13}}>
                Search for a brand above to get started
              </div>
            )}
          </div>
        )}

        {/* BOARDS TAB */}
        {discoverTab === "boards" && (
          <div style={{padding: "16px"}}>
            <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8}}>
              {boards.map(b => {
                const bItems = savedItems.filter(s => s.boardId === b.id);
                const cover = bItems.find(s => s.image)?.image || b.cover;
                return (
                  <div key={b.id} onClick={() => setViewBoard(b)} style={{borderRadius: 10, overflow: "hidden", cursor: "pointer", position: "relative", aspectRatio: "4/5", background: C.surface2}}>
                    {cover
                      ? <img src={cover} style={{width: "100%", height: "100%", objectFit: "cover"}} />
                      : <div style={{width: "100%", height: "100%", background: C.surface2, display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <i className="ti ti-layout-masonry" style={{fontSize: 28, color: C.border}} aria-hidden="true" />
                      </div>
                    }
                    <div style={{position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px 10px 10px", background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)"}}>
                      <div style={{fontSize: 13, fontWeight: 500, color: "#fff"}}>{b.name}</div>
                      <div style={{fontSize: 10, color: "rgba(255,255,255,0.55)"}}>{bItems.length} items</div>
                    </div>
                  </div>
                );
              })}
              <div onClick={() => {const n = prompt("Board name:"); if (n) setBoards(p => [...p, {id: Date.now(), name: n, cover: null}]);}} style={{borderRadius: 10, aspectRatio: "4/5", background: C.surface2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, cursor: "pointer"}}>
                <i className="ti ti-plus" style={{fontSize: 22, color: C.textMuted}} aria-hidden="true" />
                <div style={{fontSize: 11, color: C.textMuted}}>New Board</div>
              </div>
            </div>
          </div>
        )}

        {/* SAVED TAB */}
        {discoverTab === "saved" && (
          <div style={{padding: "0 16px"}}>
            <div style={{display: "flex", gap: 4, overflowX: "auto", paddingBottom: 10, marginBottom: 6}}>
              <button onClick={() => setSavedFilter(null)} style={{flexShrink: 0, padding: "4px 12px", borderRadius: 20, background: savedFilter === null ? C.accent : "transparent", color: savedFilter === null ? "#fff" : C.textMuted, fontSize: 11, border: "none"}}>All</button>
              {boards.map(b => (
                <button key={b.id} onClick={() => setSavedFilter(b.id)} style={{flexShrink: 0, padding: "4px 12px", borderRadius: 20, background: savedFilter === b.id ? C.accent : "transparent", color: savedFilter === b.id ? "#fff" : C.textMuted, fontSize: 11, border: "none"}}>
                  {b.name}
                </button>
              ))}
            </div>
            {displayed.length === 0
              ? <div style={{textAlign: "center", padding: "40px 20px", color: C.textMuted}}>
                <i className="ti ti-bookmark" style={{fontSize: 36, display: "block", marginBottom: 10, opacity: 0.3}} aria-hidden="true" />
                <div style={{fontSize: 13}}>No saved items yet</div>
                <div style={{fontSize: 12, marginTop: 6, opacity: 0.7}}>Clip items from the web to save them here</div>
              </div>
              : <MasonryGrid items={displayed} />
            }
          </div>
        )}
      </div>
    );
  };

  const BoardDetailView = () => {
    if (!viewBoard) return null;
    const bItems = savedItems.filter(s => s.boardId === viewBoard.id);
    return (
      <div style={{position: "fixed", inset: 0, background: C.bg, zIndex: 400, display: "flex", flexDirection: "column"}}>
        <div style={{padding: "calc(env(safe-area-inset-top, 0px) + 14px) 16px 14px", display: "flex", alignItems: "center", gap: 10, background: C.surface, borderBottom: `0.5px solid ${C.border}`, flexShrink: 0}}>
          <button onClick={() => setViewBoard(null)} style={{background: "transparent", color: C.textMid, fontSize: 22, lineHeight: 1}}>←</button>
          <div style={{flex: 1, fontSize: 18, fontWeight: 400}}>{viewBoard.name}</div>
          <span style={{fontSize: 12, color: C.textMuted}}>{bItems.length} items</span>
          <button onClick={() => {setViewBoard(null); setShowClip(true);}} style={{padding: "7px 12px", background: C.accent, color: "#fff", borderRadius: 8, fontSize: 12, fontWeight: 500}}>+ Add</button>
        </div>
        <div style={{flex: 1, overflowY: "auto", padding: "12px 12px 80px"}}>
          {bItems.length === 0
            ? <div style={{textAlign: "center", padding: "60px 20px", color: C.textMuted}}>
              <i className="ti ti-photo-off" style={{fontSize: 36, display: "block", marginBottom: 10, opacity: 0.3}} aria-hidden="true" />
              <div style={{fontSize: 13}}>This board is empty</div>
              <div style={{fontSize: 12, marginTop: 6, opacity: 0.7}}>Clip items from the web to fill it</div>
            </div>
            : <MasonryGrid items={bItems} />
          }
        </div>
      </div>
    );
  };

  const BrowseCard = ({p}) => {
    const img = p.images.edges[0]?.node.url;
    const {amount, currencyCode} = p.priceRange.minVariantPrice;
    const price = parseFloat(amount);
    const symbol = currencyCode === "USD" ? "$" : currencyCode + " ";
    const alreadySaved = savedItems.some(s => s.browseId === p.id);
    const save = () => {setPinItem({id: p.id, brand: p.vendor, name: p.title, price: price.toFixed(0), photo: img || null, url: "", browseId: p.id}); setShowPinPicker(true);};
    return (
      <div style={{background: "transparent", overflow: "hidden", marginBottom: 10}}>
        <div style={{position: "relative"}}>
          {img
            ? <img src={img} style={{width: "100%", aspectRatio: "3/4", objectFit: "cover", display: "block", borderRadius: 10}} />
            : <div style={{width: "100%", aspectRatio: "3/4", background: C.surface2, borderRadius: 10}} />
          }
          <button onClick={save} style={{position: "absolute", top: 8, right: 8, width: 30, height: 30, background: "rgba(255,255,255,0.9)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.10)"}}>
            <i className={`ti ti-heart${alreadySaved ? "-filled" : ""}`} style={{fontSize: 13, color: alreadySaved ? "#e05070" : C.textMid}} aria-hidden="true" />
          </button>
        </div>
        <div style={{padding: "6px 2px 8px"}}>
          <div style={{fontSize: 9, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 1}}>{p.vendor}</div>
          <div style={{fontSize: 11, fontWeight: 500, lineHeight: 1.35, marginBottom: 4}}>{p.title}</div>
          <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
            <div style={{fontSize: 12, fontWeight: 400}}>{symbol}{price % 1 === 0 ? price : price.toFixed(2)}</div>
            <button onClick={() => ownThis({image: img, brand: p.vendor, name: p.title, price: price.toFixed(0), url: ""})} style={{fontSize: 10, color: C.textMuted, background: "transparent", padding: 0, textDecoration: "underline", textUnderlineOffset: 2}}>own it</button>
          </div>
        </div>
      </div>
    );
  };

  // ── Pin to Board sheet ─────────────────────────────────────────────────
  const PinPickerSheet = () => {
    if (!pinItem) return null;
    const close = () => {setShowPinPicker(false); setPinItem(null);};
    return (
      <div style={{position: "fixed", inset: 0, background: "rgba(10,8,6,0.55)", zIndex: 350, display: "flex", alignItems: "flex-end", justifyContent: "center"}} onClick={close}>
        <div style={{width: "100%", maxWidth: 430, background: C.surface, borderRadius: "20px 20px 0 0", padding: "20px 20px", paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 48px)"}} onClick={e => e.stopPropagation()}>
          <div style={{display: "flex", alignItems: "center", gap: 12, marginBottom: 16}}>
            {pinItem.photo && <img src={pinItem.photo} style={{width: 44, height: 44, objectFit: "contain", borderRadius: 8, background: C.surface2}} />}
            <div>
              <div style={{fontSize: 13, fontWeight: 500}}>{pinItem.brand} {pinItem.name}</div>
              <div style={{fontSize: 11, color: C.textMuted}}>Save to board</div>
            </div>
          </div>
          {boards.map(b => {
            const count = savedItems.filter(s => s.boardId === b.id).length;
            const alreadySaved = savedItems.some(s => s.boardId === b.id && s.fromCloset && s.itemId === pinItem.id);
            return (
              <button key={b.id} onClick={() => {
                if (!alreadySaved) {
                  setSavedItems(p => [...p, {id: Date.now(), image: pinItem.photo || null, url: "", brand: pinItem.brand, name: pinItem.name, price: pinItem.price || "", boardId: b.id, fromCloset: true, itemId: pinItem.id, dateAdded: Date.now()}]);
                  if (pinItem.photo) setBoards(prev => prev.map(bd => bd.id === b.id && !bd.cover ? {...bd, cover: pinItem.photo} : bd));
                }
                close();
                setTab("discover");
                setDiscoverTab("boards");
                setViewBoard(b);
              }} style={{width: "100%", padding: "12px 16px", background: alreadySaved ? C.accentLight : C.surface2, border: `0.5px solid ${alreadySaved ? C.accent : C.border}`, borderRadius: 12, fontSize: 14, textAlign: "left", marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <span style={{color: alreadySaved ? C.accent : C.text}}>{b.name}{alreadySaved ? " ✓" : ""}</span>
                <span style={{fontSize: 12, color: C.textMuted}}>{count} items</span>
              </button>
            );
          })}
          <button onClick={() => {
            const n = prompt("New board name:");
            if (!n) return;
            const bid = Date.now();
            setBoards(p => [...p, {id: bid, name: n, cover: pinItem.photo || null}]);
            setSavedItems(p => [...p, {id: Date.now() + 1, image: pinItem.photo || null, url: "", brand: pinItem.brand, name: pinItem.name, price: pinItem.price || "", boardId: bid, fromCloset: true, itemId: pinItem.id, dateAdded: Date.now()}]);
            close();
            setTab("discover");
            setDiscoverTab("boards");
          }} style={{width: "100%", padding: "12px", background: "transparent", border: `1px dashed ${C.borderMed}`, borderRadius: 12, color: C.textMuted, fontSize: 13}}>
            + New Board
          </button>
        </div>
      </div>
    );
  };

  // ── Add/Edit sheet ────────────────────────────────────────────────────
  const AddSheet = () => (
    <div style={{position: "fixed", inset: 0, background: "rgba(10,8,6,0.55)", zIndex: 300, display: "flex", alignItems: "flex-end", justifyContent: "center"}} onClick={closeAdd}>
      <div style={{width: "100%", maxWidth: 430, background: C.surface, borderRadius: "20px 20px 0 0", maxHeight: "94dvh", overflowY: "auto", paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 48px)"}} onClick={e => e.stopPropagation()}>
        <div style={{padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, background: C.surface, zIndex: 10, borderBottom: `0.5px solid ${C.border}`}}>
          <button onClick={closeAdd} style={{background: "transparent", fontSize: 18, color: C.textMuted, lineHeight: 1}}>←</button>
          <div style={{fontSize: 12, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em"}}>{editItem ? "Edit Item" : "Add Item"}</div>
          <div style={{width: 32}} />
        </div>

        {editItem && (
          <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: `0.5px solid ${C.border}`}}>
            {["ITEM", "OUTFITS"].map((t, i) => (
              <button key={t} style={{padding: "10px", fontSize: 11, fontWeight: 500, letterSpacing: "0.05em", background: i === 0 ? "#d4c0a0" : "transparent", color: i === 0 ? C.text : C.textMuted, borderRight: i === 0 ? `0.5px solid ${C.border}` : "none"}}>{t}</button>
            ))}
          </div>
        )}

        <div style={{padding: "20px"}}>
          <input ref={fileRef} type="file" accept="image/*" style={{display: "none"}} onChange={handlePhoto} />
          <div style={{marginBottom: 14}}>
            <div onClick={() => !processingBg && fileRef.current.click()} style={{width: "100%", height: 190, background: form.photo ? photoBg(form.iconBg) : C.surface2, borderRadius: 12, border: form.photo ? "none" : `1.5px dashed ${C.borderMed}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, cursor: processingBg ? "default" : "pointer", overflow: "hidden", position: "relative"}}>
              {processingBg ? <>
                <div style={{width: 36, height: 36, border: `3px solid ${C.accent}`, borderTopColor: "transparent", borderRadius: 18, animation: "spin 0.8s linear infinite"}} />
                <div style={{fontSize: 12, color: C.textMuted}}>Removing background…</div>
                <div style={{fontSize: 11, color: C.textMuted, opacity: 0.6}}>This takes a few seconds</div>
              </> : form.photo ? <>
                <img src={form.photo} style={{width: "100%", height: "100%", objectFit: "contain"}} />
                <div style={{position: "absolute", bottom: 8, right: 8, background: "rgba(0,0,0,0.5)", color: "#fff", fontSize: 10, padding: "3px 8px", borderRadius: 6}}>tap to change</div>
              </> : <>
                <i className="ti ti-camera" style={{fontSize: 28, color: C.textMuted}} aria-hidden="true" />
                <div style={{fontSize: 13, color: C.textMuted}}>Tap to add photo</div>
                <div style={{fontSize: 11, color: C.textMuted, opacity: 0.7}}>Background will be removed automatically</div>
              </>}
            </div>
            {form.photo && (
              <div style={{marginTop: 8, padding: "10px 12px", background: C.surface2, borderRadius: 10, border: `0.5px solid ${C.border}`}}>
                <div style={{fontSize: 10, fontWeight: 500, letterSpacing: "0.08em", color: C.textMuted, marginBottom: 7}}>CARD BACKGROUND</div>
                <div style={{display: "flex", gap: 7, flexWrap: "wrap"}}>
                  {ICON_BG_PRESETS.map(preset => (
                    <button key={preset.value} onClick={() => setF("iconBg", preset.value)} style={{display: "flex", alignItems: "center", gap: 5, padding: "5px 10px", borderRadius: 8, border: (form.iconBg || "transparent") === preset.value ? `2px solid ${C.accent}` : `1px solid ${C.border}`, background: C.surface, cursor: "pointer"}}>
                      <div style={{width: 14, height: 14, borderRadius: 3, flexShrink: 0, border: `1px solid ${C.border}`, background: preset.value === "transparent" ? C.surface : (preset.value === "checker" ? CHECKER_BG : preset.value)}} />
                      <span style={{fontSize: 11, color: (form.iconBg || "transparent") === preset.value ? C.accent : C.textMid, fontWeight: (form.iconBg || "transparent") === preset.value ? 600 : 400}}>{preset.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div style={{marginBottom: 16}}>
            {!showUrlInput
              ? <button onClick={() => setShowUrlInput(true)} style={{background: "transparent", color: C.textMuted, fontSize: 12, padding: 0, textDecoration: "underline", textUnderlineOffset: 2}}>Load from URL instead</button>
              : <div style={{display: "flex", gap: 8, alignItems: "center"}}>
                <input value={photoUrlInput} onChange={e => setPhotoUrlInput(e.target.value)} placeholder="Paste image URL…" onKeyDown={e => e.key === "Enter" && handlePhotoUrl(photoUrlInput)} style={{flex: 1}} />
                <button onClick={() => handlePhotoUrl(photoUrlInput)} style={{padding: "10px 14px", background: C.accent, color: "#fff", borderRadius: 10, fontSize: 13, fontWeight: 500, flexShrink: 0}}>Load</button>
                <button onClick={() => {setShowUrlInput(false); setPhotoUrlInput("");}} style={{background: "transparent", color: C.textMuted, fontSize: 20, lineHeight: 1, flexShrink: 0}}>×</button>
              </div>
            }
          </div>

          {[["BRAND *", <input value={form.brand} onChange={e => setF("brand", e.target.value)} placeholder="e.g. Gilli, Levi's, Zara" />],
          ["NAME", <input value={form.name} onChange={e => setF("name", e.target.value)} placeholder="Enter 2-3 word description" />]].map(([lbl, el]) => (
            <div key={lbl} style={{marginBottom: 14}}>
              <div style={{fontSize: 10, fontWeight: 500, letterSpacing: "0.08em", color: C.textMuted, marginBottom: 6}}>{lbl}</div>
              {el}
            </div>
          ))}

          <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14}}>
            <div>
              <div style={{fontSize: 10, fontWeight: 500, letterSpacing: "0.08em", color: C.textMuted, marginBottom: 6}}>CATEGORY *</div>
              <select value={form.category} onChange={e => {setF("category", e.target.value); setF("sub", CATEGORIES.find(c => c.name === e.target.value)?.sub[0] || "")}}>
                {CATEGORIES.map(c => <option key={c.name}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <div style={{fontSize: 10, fontWeight: 500, letterSpacing: "0.08em", color: C.textMuted, marginBottom: 6}}>SUB-CATEGORY *</div>
              <select value={form.sub} onChange={e => setF("sub", e.target.value)}>
                {subCats.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14}}>
            <div>
              <div style={{fontSize: 10, fontWeight: 500, letterSpacing: "0.08em", color: C.textMuted, marginBottom: 6}}>SIZE *</div>
              <input value={form.size} onChange={e => setF("size", e.target.value)} placeholder="S, M, 27, 8…" />
            </div>
            <div>
              <div style={{fontSize: 10, fontWeight: 500, letterSpacing: "0.08em", color: C.textMuted, marginBottom: 6}}>PRICE ($)</div>
              <input type="number" value={form.price} onChange={e => setF("price", e.target.value)} placeholder="0" />
            </div>
          </div>

          <div style={{marginBottom: 14}}>
            <div style={{fontSize: 10, fontWeight: 500, letterSpacing: "0.08em", color: C.textMuted, marginBottom: 8}}>COLOR</div>
            <div style={{display: "flex", flexWrap: "wrap", gap: 7}}>
              {COLORS.map(c => (
                <button key={c.name} onClick={() => {setF("color", c.name); setF("hex", c.hex)}} style={{width: 40, height: 40, borderRadius: 8, background: c.hex, border: form.color === c.name ? `3px solid ${C.accent}` : c.border ? `1px solid ${C.border}` : "2px solid transparent", cursor: "pointer"}} title={c.name} />
              ))}
            </div>
          </div>

          <div style={{marginBottom: 14}}>
            <div style={{fontSize: 10, fontWeight: 500, letterSpacing: "0.08em", color: C.textMuted, marginBottom: 6}}>MAIN MATERIAL</div>
            <select value={form.material} onChange={e => setF("material", e.target.value)}>
              {MATERIALS.map(m => <option key={m}>{m}</option>)}
            </select>
          </div>

          <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14}}>
            <div>
              <div style={{fontSize: 10, fontWeight: 500, letterSpacing: "0.08em", color: C.textMuted, marginBottom: 6}}>SEASON</div>
              <select value={form.season} onChange={e => setF("season", e.target.value)}>
                {SEASONS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <div style={{fontSize: 10, fontWeight: 500, letterSpacing: "0.08em", color: C.textMuted, marginBottom: 6}}>CONDITION</div>
              <select value={form.condition} onChange={e => setF("condition", e.target.value)}>
                {CONDITIONS.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div style={{marginBottom: 14}}>
            <div style={{fontSize: 10, fontWeight: 500, letterSpacing: "0.08em", color: C.textMuted, marginBottom: 6}}>PERSONAL NOTE</div>
            <textarea value={form.note} onChange={e => setF("note", e.target.value)} placeholder="Enter a personal note about this item" rows={3} />
          </div>

          <div style={{marginBottom: 14}}>
            <div style={{fontSize: 10, fontWeight: 500, letterSpacing: "0.08em", color: C.textMuted, marginBottom: 6}}>DESCRIPTION</div>
            <textarea value={form.desc} onChange={e => setF("desc", e.target.value)} placeholder="Enter Item Description" rows={3} />
          </div>

          <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14}}>
            <div>
              <div style={{fontSize: 10, fontWeight: 500, letterSpacing: "0.08em", color: C.textMuted, marginBottom: 6}}>CONDITION DETAILS</div>
              <input value={form.conditionDetails} onChange={e => setF("conditionDetails", e.target.value)} placeholder="Condition details" />
            </div>
            <div>
              <div style={{fontSize: 10, fontWeight: 500, letterSpacing: "0.08em", color: C.textMuted, marginBottom: 6}}>ORIGIN</div>
              <input value={form.origin} onChange={e => setF("origin", e.target.value)} placeholder="E.g China, Turkey, Italy" />
            </div>
          </div>

          <div style={{marginBottom: 14}}>
            <div style={{fontSize: 10, fontWeight: 500, letterSpacing: "0.08em", color: C.textMuted, marginBottom: 6}}>SHOPPING URL</div>
            <input value={form.url} onChange={e => setF("url", e.target.value)} placeholder="Enter shopping URL" />
          </div>

          <label style={{display: "flex", alignItems: "center", gap: 10, marginBottom: 20, cursor: "pointer"}}>
            <input type="checkbox" checked={form.secondhand} onChange={e => setF("secondhand", e.target.checked)} style={{width: "auto", margin: 0, accentColor: C.accent}} />
            <span style={{fontSize: 13, color: C.textMid}}>Secondhand / Thrifted</span>
          </label>

          {editItem && (
            <div style={{marginBottom: 20}}>
              <div style={{fontSize: 10, fontWeight: 500, letterSpacing: "0.08em", color: C.textMuted, marginBottom: 8}}>WEARS LOGGED</div>
              <div style={{display: "flex", alignItems: "center", gap: 12}}>
                <button onClick={() => setF("wears", Math.max(0, form.wears - 1))} style={{width: 36, height: 36, borderRadius: 8, background: C.surface2, border: `0.5px solid ${C.border}`, fontSize: 20, color: C.textMid}}>−</button>
                <span style={{fontSize: 22, fontWeight: 300, minWidth: 32, textAlign: "center"}}>{form.wears}</span>
                <button onClick={() => setF("wears", form.wears + 1)} style={{width: 36, height: 36, borderRadius: 8, background: C.surface2, border: `0.5px solid ${C.border}`, fontSize: 20, color: C.textMid}}>+</button>
                <span style={{fontSize: 12, color: C.textMuted}}>CPW: ${form.price > 0 && form.wears > 0 ? (form.price / form.wears).toFixed(0) : "—"}</span>
              </div>
            </div>
          )}

          <button onClick={saveItem} style={{width: "100%", padding: "14px", background: C.accent, color: "#fff", borderRadius: 12, fontSize: 14, fontWeight: 500}}>
            {editItem ? "Save Changes" : "Add to Closet"}
          </button>

          {editItem && (
            <button
              onClick={() => {
                if (window.confirm(`Remove "${editItem.name}" from your closet?`)) {
                  deleteItem(editItem.id);
                }
              }}
              style={{width: "100%", padding: "14px", background: "transparent", color: "#c02020", fontSize: 14, fontWeight: 400, marginTop: 10}}
            >
              Delete Item
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const closeClip = () => {setShowClip(false); setClipUrl(""); setClipStep(0); setClipMeta(null);};

  const ClipSheet = () => (
    <div style={{position: "fixed", inset: 0, background: "rgba(10,8,6,0.55)", zIndex: 300, display: "flex", alignItems: "flex-end", justifyContent: "center"}} onClick={closeClip}>
      <div style={{width: "100%", maxWidth: 430, background: C.surface, borderRadius: "20px 20px 0 0", padding: "24px 20px", paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 50px)", maxHeight: "85dvh", overflowY: "auto"}} onClick={e => e.stopPropagation()}>
        {clipStep !== 3 && (
          <>
            <div style={{display: "flex", alignItems: "center", gap: 10, marginBottom: 4}}>
              <i className="ti ti-scissors" style={{fontSize: 22, color: C.accent}} aria-hidden="true" />
              <div style={{fontSize: 18, fontWeight: 500}}>Clip from Web</div>
            </div>
            <div style={{fontSize: 12, color: C.textMuted, marginBottom: 20}}>Save any item from the internet to a board or your closet</div>
          </>
        )}

        {clipStep === 0 && <>
          <input value={clipUrl} onChange={e => setClipUrl(e.target.value)} placeholder="Paste product URL here…" style={{marginBottom: 12}} />
          <button onClick={async () => {
            if (!clipUrl) return;
            setClipStep(1);
            try {
              const res = await fetch(`/api/clip?url=${encodeURIComponent(clipUrl)}`);
              const data = await res.json();
              setClipMeta(data);
            } catch {}
            setClipStep(2);
          }} style={{width: "100%", padding: "13px", background: C.accent, color: "#fff", borderRadius: 12, fontSize: 14, fontWeight: 500}}>
            Fetch Item
          </button>
        </>}

        {clipStep === 1 && (
          <div style={{textAlign: "center", padding: "28px 0"}}>
            <div style={{width: 44, height: 44, margin: "0 auto 12px", border: `3px solid ${C.accent}`, borderTopColor: "transparent", borderRadius: 22, animation: "spin 0.8s linear infinite"}} />
            <div style={{fontSize: 13, color: C.textMuted}}>Fetching item details…</div>
            <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
          </div>
        )}

        {clipStep === 2 && <>
          <div style={{background: C.surface2, borderRadius: 10, padding: "12px 14px", marginBottom: 16}}>
            <div style={{fontSize: 11, color: C.accentMid, marginBottom: 6}}>{clipUrl.replace(/https?:\/\//, "").split("/")[0]}</div>
            {clipMeta?.image && <img src={clipMeta.image} style={{width: "100%", height: 160, objectFit: "contain", borderRadius: 8, marginBottom: 8, background: "#fff"}} />}
            <div style={{fontSize: 13, fontWeight: 500}}>{clipMeta?.title || "Item detected"}</div>
            {clipMeta?.price && <div style={{fontSize: 12, color: C.textMuted, marginTop: 3}}>${clipMeta.price}</div>}
          </div>
          <button onClick={() => setClipStep(3)} style={{width: "100%", padding: "13px", background: C.accent, color: "#fff", borderRadius: 12, fontSize: 14, fontWeight: 500, marginBottom: 8}}>
            Save to Board →
          </button>
          <button onClick={() => {
            setForm({...EMPTY, photo: clipMeta?.image || null, name: clipMeta?.title || "", price: clipMeta?.price || "", url: clipUrl});
            setEditItem(null);
            setShowAdd(true);
            closeClip();
          }} style={{width: "100%", padding: "13px", background: C.surface2, color: C.text, border: `0.5px solid ${C.border}`, borderRadius: 12, fontSize: 14, fontWeight: 500}}>
            Add to Closet
          </button>
        </>}

        {clipStep === 3 && <>
          <div style={{display: "flex", alignItems: "center", gap: 10, marginBottom: 4}}>
            <button onClick={() => setClipStep(2)} style={{background: "transparent", color: C.textMid, fontSize: 20, lineHeight: 1}}>←</button>
            <div style={{fontSize: 18, fontWeight: 500}}>Save to Board</div>
          </div>
          <div style={{fontSize: 12, color: C.textMuted, marginBottom: 16}}>Choose where to save this item</div>
          {boards.map(b => (
            <button key={b.id} onClick={() => {
              const img = clipMeta?.image || null;
              const newSaved = {id: Date.now(), image: img, url: clipUrl, brand: "", name: clipMeta?.title || "", price: clipMeta?.price || "", boardId: b.id, dateAdded: Date.now()};
              setSavedItems(p => [...p, newSaved]);
              if (img) setBoards(prev => prev.map(bd => bd.id === b.id && !bd.cover ? {...bd, cover: img} : bd));
              closeClip();
              setTab("discover");
              setDiscoverTab("boards");
            }} style={{width: "100%", padding: "13px 16px", background: C.surface2, border: `0.5px solid ${C.border}`, borderRadius: 12, fontSize: 14, textAlign: "left", marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center"}}>
              <span>{b.name}</span>
              <span style={{fontSize: 12, color: C.textMuted}}>{savedItems.filter(s => s.boardId === b.id).length} items</span>
            </button>
          ))}
          <button onClick={() => {
            const n = prompt("New board name:");
            if (!n) return;
            const bid = Date.now();
            const img = clipMeta?.image || null;
            setBoards(p => [...p, {id: bid, name: n, cover: img}]);
            setSavedItems(p => [...p, {id: Date.now() + 1, image: img, url: clipUrl, brand: "", name: clipMeta?.title || "", price: clipMeta?.price || "", boardId: bid, dateAdded: Date.now()}]);
            closeClip();
            setTab("discover");
            setDiscoverTab("boards");
          }} style={{width: "100%", padding: "12px", background: "transparent", border: `1px dashed ${C.borderMed}`, borderRadius: 12, color: C.textMuted, fontSize: 13}}>
            + Create New Board
          </button>
        </>}
      </div>
    </div>
  );

  const OutfitBuilder = () => {
    const [pieces, setPieces] = useState([]);
    const [sel, setSel] = useState(null);
    const [name, setName] = useState("");
    const [bgColor, setBgColor] = useState("#ffffff");
    const [trayTab, setTrayTab] = useState("All");
    const dragRef = useRef(null);
    const resizeRef = useRef(null);
    const maxZRef = useRef(0);

    const BG_COLORS = ["#ffffff", "#f5f2ec", "#f0ede8", "#dde4ec", "#1a1814", "#2d3a2d"];
    const trayItems = trayTab === "All" ? items : items.filter(i => i.category === trayTab);

    const addItem = (item) => {
      maxZRef.current += 1;
      const pid = Date.now();
      const count = pieces.length;
      const col = count % 3;
      const row = Math.floor(count / 3);
      setPieces(prev => [...prev, {
        pid, item,
        x: 18 + col * 110 + (row % 2 === 1 ? 22 : 0),
        y: 14 + row * 74,
        w: 128, h: 158,
        flip: false, z: maxZRef.current,
      }]);
      setSel(pid);
    };

    const bringFront = (pid) => {
      maxZRef.current += 1;
      const mz = maxZRef.current;
      setPieces(prev => prev.map(p => p.pid === pid ? {...p, z: mz} : p));
    };

    const startDrag = (e, pid) => {
      if (resizeRef.current) return;
      e.stopPropagation();
      e.currentTarget.setPointerCapture(e.pointerId);
      setSel(pid);
      bringFront(pid);
      const piece = pieces.find(p => p.pid === pid);
      dragRef.current = {pid, px: e.clientX, py: e.clientY, ox: piece.x, oy: piece.y};
    };

    const startResize = (e, pid) => {
      e.stopPropagation();
      e.currentTarget.setPointerCapture(e.pointerId);
      const piece = pieces.find(p => p.pid === pid);
      resizeRef.current = {pid, px: e.clientX, py: e.clientY, ow: piece.w, oh: piece.h};
    };

    const onMove = (e) => {
      if (resizeRef.current) {
        const dx = e.clientX - resizeRef.current.px;
        const dy = e.clientY - resizeRef.current.py;
        setPieces(prev => prev.map(p =>
          p.pid === resizeRef.current.pid
            ? {...p, w: Math.max(60, resizeRef.current.ow + dx), h: Math.max(60, resizeRef.current.oh + dy)}
            : p
        ));
      } else if (dragRef.current) {
        const dx = e.clientX - dragRef.current.px;
        const dy = e.clientY - dragRef.current.py;
        setPieces(prev => prev.map(p =>
          p.pid === dragRef.current.pid ? {...p, x: dragRef.current.ox + dx, y: dragRef.current.oy + dy} : p
        ));
      }
    };

    const onEnd = () => {dragRef.current = null; resizeRef.current = null;};

    const act = (fn) => setPieces(prev => prev.map(p => p.pid === sel ? fn(p) : p));

    const save = () => {
      if (pieces.length === 0) return;
      const seen = new Set();
      const usedItems = pieces.map(p => p.item).filter(item => {
        if (seen.has(item.id)) return false;
        seen.add(item.id);
        return true;
      });
      setOutfits(p => [...p, {id: Date.now(), name: name.trim() || "Untitled Look", items: usedItems}]);
      setShowOutfitBuilder(false);
    };

    const TOOLBAR = [
      {icon: "flip-horizontal", label: "Flip", action: () => act(p => ({...p, flip: !p.flip}))},
      {
        icon: "copy", label: "Duplicate", action: () => {
          const src = pieces.find(p => p.pid === sel); if (!src) return;
          maxZRef.current += 1;
          const np = Date.now();
          setPieces(prev => [...prev, {...src, pid: np, x: src.x + 20, y: src.y + 20, z: maxZRef.current}]);
          setSel(np);
        }
      },
      {icon: "arrow-bar-to-down", label: "Back", action: () => act(p => ({...p, z: 0}))},
      {icon: "trash", label: "Remove", action: () => {setPieces(prev => prev.filter(p => p.pid !== sel)); setSel(null);}},
    ];

    return (
      <div style={{position: "fixed", inset: 0, background: "#fff", zIndex: 300, display: "flex", flexDirection: "column", userSelect: "none"}}>
        {/* Header */}
        <div style={{padding: "calc(env(safe-area-inset-top, 0px) + 12px) 12px 10px", display: "flex", alignItems: "center", gap: 8, borderBottom: `0.5px solid ${C.border}`, flexShrink: 0, background: "#fff"}}>
          <button onClick={() => setShowOutfitBuilder(false)} style={{background: "transparent", color: C.textMuted, fontSize: 22, lineHeight: 1, flexShrink: 0}}>×</button>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Name this look…"
            style={{flex: 1, fontSize: 13, padding: "6px 10px", borderRadius: 8}}
          />
          <div style={{display: "flex", gap: 4, alignItems: "center", flexShrink: 0}}>
            {BG_COLORS.map(col => (
              <div key={col} onClick={() => setBgColor(col)} style={{width: 15, height: 15, borderRadius: "50%", background: col, border: bgColor === col ? `2.5px solid ${C.accent}` : `1.5px solid rgba(0,0,0,0.18)`, cursor: "pointer", flexShrink: 0}} />
            ))}
          </div>
          <button onClick={save} disabled={pieces.length === 0} style={{background: pieces.length === 0 ? C.accentLight : C.accent, color: pieces.length === 0 ? C.textMuted : "#fff", fontSize: 12, fontWeight: 600, padding: "7px 13px", borderRadius: 9, flexShrink: 0}}>Save</button>
        </div>

        {/* Canvas */}
        <div
          style={{flex: 1, position: "relative", background: bgColor, overflow: "hidden", touchAction: "none"}}
          onPointerMove={onMove}
          onPointerUp={onEnd}
          onPointerLeave={onEnd}
          onClick={() => setSel(null)}
        >
          {pieces.length === 0 && (
            <div style={{position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, pointerEvents: "none"}}>
              <i className="ti ti-sparkles" style={{fontSize: 38, color: "rgba(0,0,0,0.10)"}} aria-hidden="true" />
              <div style={{fontSize: 13, color: "rgba(0,0,0,0.25)", textAlign: "center", lineHeight: 1.6}}>Tap items below<br />to build your look</div>
            </div>
          )}
          {pieces.map(p => (
            <div
              key={p.pid}
              style={{position: "absolute", left: p.x, top: p.y, width: p.w, height: p.h, zIndex: p.z, touchAction: "none", cursor: "grab"}}
              onPointerDown={e => startDrag(e, p.pid)}
              onClick={e => e.stopPropagation()}
            >
              <div style={{
                width: "100%", height: "100%",
                background: p.item.photo ? "transparent" : (p.item.hex === "#f0f0f0" ? "#e8e8e8" : p.item.hex + "28"),
                borderRadius: p.item.photo ? 0 : 8,
                overflow: "hidden",
                transform: p.flip ? "scaleX(-1)" : "none",
                outline: p.pid === sel ? `2px solid ${C.accent}` : "none",
                filter: p.item.photo
                  ? (p.pid === sel ? `drop-shadow(0 0 6px ${C.accent}) drop-shadow(0 4px 16px rgba(0,0,0,0.3))` : "drop-shadow(0 4px 18px rgba(0,0,0,0.22))")
                  : (p.pid === sel ? `drop-shadow(0 0 6px ${C.accent})` : "drop-shadow(0 2px 8px rgba(0,0,0,0.15))"),
              }}>
                {p.item.photo
                  ? <img src={p.item.photo} style={{width: "100%", height: "100%", objectFit: "contain"}} draggable={false} />
                  : <Placeholder item={p.item} size={p.w} />
                }
              </div>
              {p.pid === sel && (
                <div
                  style={{position: "absolute", bottom: -6, right: -6, width: 16, height: 16, background: "#fff", border: `2.5px solid ${C.accent}`, borderRadius: 4, cursor: "se-resize", zIndex: 20, touchAction: "none", boxShadow: "0 1px 4px rgba(0,0,0,0.2)"}}
                  onPointerDown={e => startResize(e, p.pid)}
                  onClick={e => e.stopPropagation()}
                />
              )}
            </div>
          ))}
        </div>

        {/* Toolbar (shown when piece selected) */}
        {sel !== null && (
          <div style={{background: "#fff", borderTop: `0.5px solid ${C.border}`, padding: "8px 4px 0", display: "flex", justifyContent: "space-around", flexShrink: 0}}>
            {TOOLBAR.map(({icon, label, action}) => (
              <button key={label} onClick={action} style={{display: "flex", flexDirection: "column", alignItems: "center", gap: 2, background: "transparent", color: C.textMid, padding: "4px 10px"}}>
                <i className={`ti ti-${icon}`} style={{fontSize: 19}} aria-hidden="true" />
                <span style={{fontSize: 10}}>{label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Bottom item tray */}
        <div style={{background: "#fff", borderTop: sel !== null ? "none" : `0.5px solid ${C.border}`, flexShrink: 0}}>
          {/* Category chips */}
          <div style={{display: "flex", gap: 5, padding: "7px 12px 5px", overflowX: "auto"}}>
            {["All", ...CATEGORIES.map(c => c.name)].map(cat => (
              <button key={cat} onClick={() => setTrayTab(cat)} style={{flexShrink: 0, padding: "3px 10px", borderRadius: 14, background: trayTab === cat ? C.accent : C.accentLight, color: trayTab === cat ? "#fff" : C.textMid, fontSize: 10, fontWeight: trayTab === cat ? 500 : 400, border: "none"}}>
                {cat}
              </button>
            ))}
          </div>
          {/* Item thumbnails */}
          <div style={{display: "flex", gap: 8, padding: "4px 12px", paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 16px)", overflowX: "auto"}}>
            {trayItems.map(item => (
              <div key={item.id} onClick={() => addItem(item)} style={{flexShrink: 0, cursor: "pointer", textAlign: "center", width: 58}}>
                <div style={{width: 58, height: 72, background: item.photo ? photoBg(item.iconBg) : C.surface2, borderRadius: 8, overflow: "hidden", border: `0.5px solid ${C.border}`, marginBottom: 3}}>
                  {item.photo
                    ? <img src={item.photo} style={{width: "100%", height: "100%", objectFit: "contain"}} draggable={false} />
                    : <Placeholder item={item} size={58} />
                  }
                </div>
                <div style={{fontSize: 8, color: C.textMuted, lineHeight: 1.2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"}}>{item.name}</div>
              </div>
            ))}
            {trayItems.length === 0 && <div style={{fontSize: 12, color: C.textMuted, padding: "20px 8px"}}>No items</div>}
          </div>
        </div>
      </div>
    );
  };

  const OutfitCollage = () => {
    const o = collageOutfit;

    // Pinterest-style staggered initial placement
    const initPieces = (its) => its.map((item, i) => {
      const WIDTHS = [148, 160, 138, 155, 145, 152];
      const HEIGHTS = [190, 165, 205, 175, 195, 158];
      const w = WIDTHS[i % WIDTHS.length];
      const h = HEIGHTS[i % HEIGHTS.length];
      const col = i % 2;
      const row = Math.floor(i / 2);
      return {
        pid: i, item,
        x: 14 + col * 176 + (row % 2 === 1 ? 10 : 0),
        y: 14 + row * (h * 0.55) - (col === 1 ? 28 : 0),
        w, h,
        flip: false, border: false, z: i + 1,
      };
    });

    const [pieces, setPieces] = useState(() => o ? initPieces(o.items) : []);
    const [sel, setSel] = useState(null);
    const [bgColor, setBgColor] = useState("#f5f2ec");
    const [showPicker, setShowPicker] = useState(false);
    const dragRef = useRef(null);
    const resizeRef = useRef(null);
    const maxZRef = useRef(o ? o.items.length : 0);

    if (!o) return null;

    const bringFront = (pid) => {
      maxZRef.current += 1;
      const mz = maxZRef.current;
      setPieces(prev => prev.map(p => p.pid === pid ? {...p, z: mz} : p));
    };

    const startDrag = (e, pid) => {
      if (resizeRef.current) return;
      e.stopPropagation();
      e.currentTarget.setPointerCapture(e.pointerId);
      setSel(pid);
      bringFront(pid);
      const piece = pieces.find(p => p.pid === pid);
      dragRef.current = {pid, px: e.clientX, py: e.clientY, ox: piece.x, oy: piece.y};
    };

    const startResize = (e, pid) => {
      e.stopPropagation();
      e.currentTarget.setPointerCapture(e.pointerId);
      const piece = pieces.find(p => p.pid === pid);
      resizeRef.current = {pid, px: e.clientX, py: e.clientY, ow: piece.w, oh: piece.h};
    };

    const onMove = (e) => {
      if (resizeRef.current) {
        const dx = e.clientX - resizeRef.current.px;
        const dy = e.clientY - resizeRef.current.py;
        setPieces(prev => prev.map(p =>
          p.pid === resizeRef.current.pid
            ? {...p, w: Math.max(70, resizeRef.current.ow + dx), h: Math.max(70, resizeRef.current.oh + dy)}
            : p
        ));
      } else if (dragRef.current) {
        const dx = e.clientX - dragRef.current.px;
        const dy = e.clientY - dragRef.current.py;
        setPieces(prev => prev.map(p =>
          p.pid === dragRef.current.pid ? {...p, x: dragRef.current.ox + dx, y: dragRef.current.oy + dy} : p
        ));
      }
    };

    const onEnd = () => {dragRef.current = null; resizeRef.current = null;};

    const act = (fn) => setPieces(prev => prev.map(p => p.pid === sel ? fn(p) : p));

    const addItem = (item) => {
      maxZRef.current += 1;
      const newPid = Date.now();
      setPieces(prev => [...prev, {
        pid: newPid, item,
        x: 30 + Math.random() * 120, y: 30 + Math.random() * 80,
        w: 148, h: 182, flip: false, border: false, z: maxZRef.current,
      }]);
      setSel(newPid);
      setShowPicker(false);
    };

    const TOOLBAR = [
      {icon: "border-style-2", label: "Border", action: () => act(p => ({...p, border: !p.border}))},
      {icon: "flip-horizontal", label: "Flip", action: () => act(p => ({...p, flip: !p.flip}))},
      {
        icon: "copy", label: "Duplicate", action: () => {
          const src = pieces.find(p => p.pid === sel); if (!src) return;
          maxZRef.current += 1;
          const np = Date.now();
          setPieces(prev => [...prev, {...src, pid: np, x: src.x + 22, y: src.y + 22, z: maxZRef.current}]);
          setSel(np);
        }
      },
      {icon: "arrow-bar-to-down", label: "Back", action: () => act(p => ({...p, z: 0}))},
      {icon: "trash", label: "Remove", action: () => {setPieces(prev => prev.filter(p => p.pid !== sel)); setSel(null);}},
    ];

    const BG_COLORS = ["#f5f2ec", "#ffffff", "#1a1814", "#e4dfd6", "#2d3a2d", "#1c2b4a"];

    return (
      <div style={{position: "fixed", inset: 0, background: "#fff", zIndex: 500, display: "flex", flexDirection: "column", userSelect: "none"}}>
        {/* Header */}
        <div style={{padding: "calc(env(safe-area-inset-top, 0px) + 12px) 14px 10px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `0.5px solid ${C.border}`, flexShrink: 0, background: "#fff", gap: 8}}>
          <button onClick={() => setShowCollage(false)} style={{background: "transparent", color: C.textMuted, fontSize: 20, lineHeight: 1, flexShrink: 0}}>×</button>
          <div style={{display: "flex", alignItems: "center", gap: 5, flex: 1, justifyContent: "center"}}>
            {BG_COLORS.map(col => (
              <div key={col} onClick={() => setBgColor(col)} style={{width: 17, height: 17, borderRadius: "50%", background: col, border: bgColor === col ? `2.5px solid ${C.accent}` : `1.5px solid rgba(0,0,0,0.15)`, cursor: "pointer", flexShrink: 0}} />
            ))}
          </div>
          <div style={{display: "flex", alignItems: "center", gap: 10, flexShrink: 0}}>
            <button onClick={() => setShowPicker(true)} style={{background: "transparent", color: C.accent, fontSize: 13, fontWeight: 600}}>+ Add</button>
            <button onClick={() => setShowCollage(false)} style={{background: C.accent, color: "#fff", fontSize: 12, fontWeight: 600, padding: "5px 12px", borderRadius: 8}}>Done</button>
          </div>
        </div>

        {/* Canvas */}
        <div
          style={{flex: 1, position: "relative", background: bgColor, overflow: "hidden", touchAction: "none"}}
          onPointerMove={onMove}
          onPointerUp={onEnd}
          onPointerLeave={onEnd}
          onClick={() => setSel(null)}
        >
          {pieces.length === 0 && (
            <div style={{position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, pointerEvents: "none"}}>
              <i className="ti ti-layout-collage" style={{fontSize: 40, color: "rgba(0,0,0,0.15)"}} aria-hidden="true" />
              <div style={{fontSize: 13, color: "rgba(0,0,0,0.3)"}}>Tap "+ Add" to add items from your closet</div>
            </div>
          )}
          {pieces.map(p => (
            <div
              key={p.pid}
              style={{
                position: "absolute", left: p.x, top: p.y, width: p.w, height: p.h, zIndex: p.z,
                touchAction: "none", cursor: "grab",
              }}
              onPointerDown={e => startDrag(e, p.pid)}
              onClick={e => e.stopPropagation()}
            >
              <div style={{
                width: "100%", height: "100%",
                background: p.item.photo ? "transparent" : (p.item.hex === "#f0f0f0" ? "#e8e8e8" : p.item.hex + "28"),
                borderRadius: p.item.photo ? 0 : 8,
                overflow: "hidden",
                transform: p.flip ? "scaleX(-1)" : "none",
                outline: p.border ? `2.5px solid ${C.accent}` : p.pid === sel ? `2px solid ${C.accent}` : "none",
                filter: p.item.photo
                  ? (p.pid === sel ? `drop-shadow(0 0 6px ${C.accent}) drop-shadow(0 4px 16px rgba(0,0,0,0.3))` : "drop-shadow(0 4px 18px rgba(0,0,0,0.22))")
                  : (p.pid === sel ? `drop-shadow(0 0 6px ${C.accent})` : "drop-shadow(0 2px 8px rgba(0,0,0,0.15))"),
              }}>
                {p.item.photo
                  ? <img src={p.item.photo} style={{width: "100%", height: "100%", objectFit: "contain"}} draggable={false} />
                  : <Placeholder item={p.item} size={p.w} />
                }
              </div>
              {/* Label below card */}
              <div style={{textAlign: "center", marginTop: 4, opacity: p.pid === sel ? 1 : 0, transition: "opacity 0.15s"}}>
                <div style={{fontSize: 9, color: bgColor === "#1a1814" || bgColor === "#2d3a2d" || bgColor === "#1c2b4a" ? "rgba(255,255,255,0.7)" : C.textMuted, lineHeight: 1.2}}>{p.item.brand}</div>
              </div>
              {/* Resize handle — SE corner */}
              {p.pid === sel && (
                <div
                  style={{position: "absolute", bottom: -6, right: -6, width: 16, height: 16, background: "#fff", border: `2.5px solid ${C.accent}`, borderRadius: 4, cursor: "se-resize", zIndex: 20, touchAction: "none", boxShadow: "0 1px 4px rgba(0,0,0,0.2)"}}
                  onPointerDown={e => startResize(e, p.pid)}
                  onClick={e => e.stopPropagation()}
                />
              )}
            </div>
          ))}
        </div>

        {/* Toolbar */}
        {sel !== null ? (
          <div style={{background: "#fff", borderTop: `0.5px solid ${C.border}`, padding: "9px 4px 0", display: "flex", justifyContent: "space-around", paddingBottom: "max(env(safe-area-inset-bottom, 0px), 16px)", flexShrink: 0}}>
            {TOOLBAR.map(({icon, label, action}) => (
              <button key={label} onClick={action} style={{display: "flex", flexDirection: "column", alignItems: "center", gap: 3, background: "transparent", color: C.textMid, padding: "4px 8px"}}>
                <i className={`ti ti-${icon}`} style={{fontSize: 21}} aria-hidden="true" />
                <span style={{fontSize: 10}}>{label}</span>
              </button>
            ))}
          </div>
        ) : (
          <div style={{padding: "10px 20px", paddingBottom: "max(env(safe-area-inset-bottom, 0px), 20px)", background: "#fff", borderTop: `0.5px solid ${C.border}`, textAlign: "center", fontSize: 11, color: C.textMuted, flexShrink: 0}}>
            Tap to select · Drag to move · Corner handle to resize
          </div>
        )}

        {/* Add from closet sheet */}
        {showPicker && (
          <div style={{position: "absolute", inset: 0, background: "rgba(10,8,6,0.55)", zIndex: 600, display: "flex", alignItems: "flex-end"}} onClick={() => setShowPicker(false)}>
            <div style={{width: "100%", background: C.surface, borderRadius: "20px 20px 0 0", maxHeight: "72dvh", display: "flex", flexDirection: "column"}} onClick={e => e.stopPropagation()}>
              <div style={{padding: "14px 20px 10px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `0.5px solid ${C.border}`, flexShrink: 0}}>
                <div style={{fontSize: 14, fontWeight: 500}}>Add from Closet</div>
                <button onClick={() => setShowPicker(false)} style={{background: "transparent", color: C.textMuted, fontSize: 20, lineHeight: 1}}>×</button>
              </div>
              <div style={{overflowY: "auto", padding: "10px 12px", paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 30px)"}}>
                <div style={{display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8}}>
                  {items.map(item => (
                    <div key={item.id} onClick={() => addItem(item)} style={{background: item.photo ? photoBg(item.iconBg) : C.surface2, borderRadius: 10, overflow: "hidden", border: `0.5px solid ${C.border}`, cursor: "pointer", transition: "transform 0.1s", active: {transform: "scale(0.97)"}}}>
                      <div style={{height: 100, overflow: "hidden"}}>
                        {item.photo ? <img src={item.photo} style={{width: "100%", height: "100%", objectFit: "contain"}} /> : <Placeholder item={item} size={80} />}
                      </div>
                      <div style={{padding: "5px 7px 7px"}}>
                        <div style={{fontSize: 9, color: C.textMuted, lineHeight: 1.3}}>{item.brand}</div>
                        <div style={{fontSize: 10, fontWeight: 500, lineHeight: 1.3}}>{item.name}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const GhostModel = () => {
    const o = ghostOutfit;
    if (!o) return null;
    const its = o.items;
    const zoneOf = item => {
      if (item.category === "Shoes") return "feet";
      if (item.category === "Bottoms") return "lower";
      if (item.category === "Tops" || item.category === "Outerwear" || item.category === "Activewear") return "torso";
      if (item.category === "One Piece") return "full";
      if (item.sub === "Hat" || item.sub === "Scarf" || item.sub === "Sunglasses") return "head";
      if (item.sub === "Belt") return "waist";
      return "side";
    };
    const zones = {head: [], torso: [], full: [], waist: [], lower: [], feet: [], side: []};
    its.forEach(item => zones[zoneOf(item)].push(item));
    const torsoItems = [...zones.full, ...zones.torso];

    const Thumb = ({item, w = 62}) => (
      <div style={{width: w, height: Math.round(w * 1.22), background: C.surface2, borderRadius: 7, overflow: "hidden", flexShrink: 0, border: `1px solid ${C.border}`}}>
        {item.photo ? <img src={item.photo} style={{width: "100%", height: "100%", objectFit: "contain"}} /> : <Placeholder item={item} size={w} />}
      </div>
    );

    return (
      <div style={{position: "fixed", inset: 0, background: "rgba(10,8,6,0.94)", zIndex: 400, display: "flex", flexDirection: "column"}} onClick={() => setShowGhostModel(false)}>
        <div style={{width: "100%", maxWidth: 430, margin: "0 auto", height: "100%", display: "flex", flexDirection: "column"}} onClick={e => e.stopPropagation()}>
          <div style={{padding: "calc(env(safe-area-inset-top, 0px) + 18px) 20px 6px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0}}>
            <button onClick={() => setShowGhostModel(false)} style={{background: "transparent", color: "rgba(255,255,255,0.55)", fontSize: 22, lineHeight: 1}}>×</button>
            <div style={{fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.9)", letterSpacing: "0.14em", textTransform: "uppercase"}}>{o.name}</div>
            <div style={{width: 30}} />
          </div>
          <div style={{flex: 1, position: "relative", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden"}}>
            <svg width="120" height="340" viewBox="0 0 120 340" style={{position: "absolute", opacity: 0.15, pointerEvents: "none"}}>
              <ellipse cx="60" cy="30" rx="18" ry="21" fill="none" stroke="#fff" strokeWidth="1.5" />
              <rect x="54" y="50" width="12" height="10" fill="none" stroke="#fff" strokeWidth="1.5" />
              <path d="M22 62 Q6 70 10 126 L34 126 L34 186 L86 186 L86 126 L110 126 Q114 70 98 62 Q80 56 60 56 Q40 56 22 62Z" fill="none" stroke="#fff" strokeWidth="1.5" />
              <path d="M22 70 Q8 88 10 136 L22 136 Q24 92 34 78" fill="none" stroke="#fff" strokeWidth="1.5" />
              <path d="M98 70 Q112 88 110 136 L98 136 Q96 92 86 78" fill="none" stroke="#fff" strokeWidth="1.5" />
              <path d="M34 186 Q28 206 30 246 L58 246 L58 186" fill="none" stroke="#fff" strokeWidth="1.5" />
              <path d="M86 186 Q92 206 90 246 L62 246 L62 186" fill="none" stroke="#fff" strokeWidth="1.5" />
              <path d="M30 246 Q28 284 30 318 L50 318 L52 246" fill="none" stroke="#fff" strokeWidth="1.5" />
              <path d="M90 246 Q92 284 90 318 L70 318 L68 246" fill="none" stroke="#fff" strokeWidth="1.5" />
              <path d="M30 316 Q22 322 20 328 L52 328 L52 316" fill="none" stroke="#fff" strokeWidth="1.5" />
              <path d="M90 316 Q98 322 100 328 L68 328 L68 316" fill="none" stroke="#fff" strokeWidth="1.5" />
            </svg>
            <div style={{position: "relative", width: 340, height: 410, flexShrink: 0}}>
              {zones.head.length > 0 && (
                <div style={{position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 5}}>
                  {zones.head.map(item => <Thumb key={item.id} item={item} w={46} />)}
                </div>
              )}
              {torsoItems.length > 0 && (
                <div style={{position: "absolute", top: 62, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6}}>
                  {torsoItems.map(item => <Thumb key={item.id} item={item} w={torsoItems.length > 2 ? 60 : 74} />)}
                </div>
              )}
              {zones.waist.length > 0 && (
                <div style={{position: "absolute", top: 178, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 4}}>
                  {zones.waist.map(item => <Thumb key={item.id} item={item} w={38} />)}
                </div>
              )}
              {zones.lower.length > 0 && (
                <div style={{position: "absolute", top: 192, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6}}>
                  {zones.lower.map(item => <Thumb key={item.id} item={item} w={68} />)}
                </div>
              )}
              {zones.feet.length > 0 && (
                <div style={{position: "absolute", top: 324, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 5}}>
                  {zones.feet.map(item => <Thumb key={item.id} item={item} w={54} />)}
                </div>
              )}
              {zones.side.length > 0 && (
                <div style={{position: "absolute", top: 110, right: 0, display: "flex", flexDirection: "column", gap: 6}}>
                  {zones.side.map(item => <Thumb key={item.id} item={item} w={52} />)}
                </div>
              )}
            </div>
          </div>
          <div style={{padding: "8px 20px 44px", textAlign: "center"}}>
            <div style={{fontSize: 10, color: "rgba(255,255,255,0.28)", letterSpacing: "0.12em"}}>{its.length} PIECES</div>
          </div>
        </div>
      </div>
    );
  };

  const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const CalendarScreen = () => {
    const today = new Date();
    const {year, month} = calMonth;
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(d);
    const isToday = d => d && today.getFullYear() === year && today.getMonth() === month && today.getDate() === d;
    const dateKey = d => `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    const outfitForDay = d => d && calOutfits[dateKey(d)] ? outfits.find(o => o.id === calOutfits[dateKey(d)]) : null;

    const prevMonth = () => setCalMonth(p => {const d = new Date(p.year, p.month - 1); return {year: d.getFullYear(), month: d.getMonth()};});
    const nextMonth = () => setCalMonth(p => {const d = new Date(p.year, p.month + 1); return {year: d.getFullYear(), month: d.getMonth()};});

    return (
      <div style={{paddingBottom: 20}}>
        <div style={{padding: "36px 20px 20px", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
          <button onClick={prevMonth} style={{background: "transparent", fontSize: 22, color: C.textMuted, lineHeight: 1, padding: "4px 8px"}}>‹</button>
          <div style={{fontSize: 24, fontFamily: PF, fontWeight: 400}}>{MONTHS[month]} {year}</div>
          <button onClick={nextMonth} style={{background: "transparent", fontSize: 22, color: C.textMuted, lineHeight: 1, padding: "4px 8px"}}>›</button>
        </div>

        <div style={{margin: "0 14px 16px"}}>
          <div style={{display: "grid", gridTemplateColumns: "repeat(7,1fr)", marginBottom: 6}}>
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
              <div key={d} style={{textAlign: "center", fontSize: 10, color: C.textMuted, padding: "3px 0", letterSpacing: "0.04em"}}>{d}</div>
            ))}
          </div>
          <div style={{display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 3}}>
            {days.map((d, i) => {
              const o = outfitForDay(d);
              const today_ = isToday(d);
              return (
                <div key={i} onClick={() => {if (!d) return; setCalDay(dateKey(d)); setShowCalDay(true);}}
                  style={{
                    aspectRatio: "1", borderRadius: 9, background: today_ ? C.accent : d ? C.surface : "transparent",
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    cursor: d ? "pointer" : "default", border: d && !today_ ? `0.5px solid ${C.border}` : "none",
                    gap: 2, overflow: "hidden", position: "relative"
                  }}>
                  {d && <>
                    {o?.items[0]?.photo && <img src={o.items[0].photo} style={{position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.35}} />}
                    <span style={{fontSize: 13, color: today_ ? "#fff" : C.text, fontWeight: today_ ? 600 : 400, position: "relative", zIndex: 1}}>{d}</span>
                    {o && <div style={{width: 5, height: 5, borderRadius: "50%", background: today_ ? "rgba(255,255,255,0.9)" : C.accent, position: "relative", zIndex: 1}} />}
                  </>}
                </div>
              );
            })}
          </div>
        </div>

        <div style={{margin: "0 14px"}}>
          <Card>
            <div style={{padding: "12px 16px", borderBottom: `0.5px solid ${C.border}`}}>
              <div style={{fontSize: 13, fontWeight: 500}}>This Month</div>
            </div>
            <div style={{padding: "12px 16px"}}>
              <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10}}>
                <div style={{background: C.surface2, borderRadius: 10, padding: "12px 14px"}}>
                  <div style={{fontSize: 11, color: C.textMuted, marginBottom: 3}}>Outfits Logged</div>
                  <div style={{fontSize: 24, fontWeight: 300}}>{Object.keys(calOutfits).filter(k => k.startsWith(`${year}-${String(month + 1).padStart(2, "0")}`)).length}</div>
                </div>
                <div style={{background: C.surface2, borderRadius: 10, padding: "12px 14px"}}>
                  <div style={{fontSize: 11, color: C.textMuted, marginBottom: 3}}>Total Outfits</div>
                  <div style={{fontSize: 24, fontWeight: 300}}>{outfits.length}</div>
                </div>
              </div>
            </div>
            {outfits.length === 0 && <div style={{padding: "0 16px 14px", fontSize: 12, color: C.textMuted}}>Build outfits in the Closet tab, then tap a day to log them here.</div>}
          </Card>
        </div>
      </div>
    );
  };

  const CalendarDaySheet = () => {
    const o = calDay && calOutfits[calDay] ? outfits.find(x => x.id === calOutfits[calDay]) : null;
    const dateStr = calDay ? new Date(calDay + "T12:00:00").toLocaleDateString("en-US", {weekday: "long", month: "long", day: "numeric"}) : "";
    return (
      <div style={{position: "fixed", inset: 0, background: "rgba(10,8,6,0.55)", zIndex: 300, display: "flex", alignItems: "flex-end", justifyContent: "center"}} onClick={() => setShowCalDay(false)}>
        <div style={{width: "100%", maxWidth: 430, background: C.surface, borderRadius: "20px 20px 0 0", padding: "20px 20px", paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 50px)"}} onClick={e => e.stopPropagation()}>
          <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14}}>
            <div>
              <div style={{fontSize: 15, fontWeight: 500}}>{dateStr}</div>
              {o && <div style={{fontSize: 11, color: C.accentMid, marginTop: 2}}>{o.name}</div>}
            </div>
            <button onClick={() => setShowCalDay(false)} style={{background: "transparent", color: C.textMuted, fontSize: 20}}>×</button>
          </div>
          {o ? (
            <>
              <div style={{display: "flex", gap: 6, marginBottom: 16}}>
                {o.items.slice(0, 6).map(item => (
                  <div key={item.id} style={{width: 54, height: 66, background: "#fff", borderRadius: 8, overflow: "hidden", border: `0.5px solid ${C.border}`, flexShrink: 0}}>
                    {item.photo ? <img src={item.photo} style={{width: "100%", height: "100%", objectFit: "contain"}} /> : <Placeholder item={item} size={54} />}
                  </div>
                ))}
              </div>
              <button onClick={() => {const n = {...calOutfits}; delete n[calDay]; setCalOutfits(n); setShowCalDay(false);}} style={{width: "100%", padding: "11px", background: "transparent", border: `0.5px solid #e08080`, borderRadius: 10, fontSize: 13, color: "#c02020"}}>Remove outfit log</button>
            </>
          ) : (
            <>
              <div style={{fontSize: 12, color: C.textMuted, marginBottom: outfits.length > 0 ? 14 : 0}}>No outfit logged for this day.</div>
              {outfits.length > 0 && <>
                <div style={{fontSize: 10, fontWeight: 500, letterSpacing: "0.08em", color: C.textMuted, marginBottom: 8}}>LOG AN OUTFIT</div>
                {outfits.map((oo, i) => (
                  <div key={oo.id} onClick={() => {setCalOutfits(p => ({...p, [calDay]: oo.id})); setShowCalDay(false);}}
                    style={{display: "flex", gap: 10, alignItems: "center", padding: "10px 0", borderBottom: i < outfits.length - 1 ? `0.5px solid ${C.border}` : "none", cursor: "pointer"}}>
                    <div style={{display: "flex", gap: 4}}>
                      {oo.items.slice(0, 3).map(item => (
                        <div key={item.id} style={{width: 38, height: 46, background: "#fff", borderRadius: 6, overflow: "hidden", border: `0.5px solid ${C.border}`}}>
                          {item.photo ? <img src={item.photo} style={{width: "100%", height: "100%", objectFit: "contain"}} /> : <Placeholder item={item} size={38} />}
                        </div>
                      ))}
                    </div>
                    <div style={{flex: 1}}>
                      <div style={{fontSize: 13, fontWeight: 500}}>{oo.name}</div>
                      <div style={{fontSize: 11, color: C.textMuted}}>{oo.items.length} items</div>
                    </div>
                    <span style={{color: C.textMuted, fontSize: 18}}>›</span>
                  </div>
                ))}
              </>}
              {outfits.length === 0 && <div style={{fontSize: 12, color: C.textMuted, marginTop: 4}}>Build outfits in the Closet tab first.</div>}
            </>
          )}
        </div>
      </div>
    );
  };

  const NAV = [
    {id: "today", icon: "ti-home", label: "Today"},
    {id: "closet", icon: "ti-hanger", label: "Closet"},
    {id: "_add", center: true},
    {id: "discover", icon: "ti-compass", label: "Discover"},
    {id: "style", icon: "ti-chart-pie-2", label: "Style"},
  ];
  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&display=swap');*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent;-webkit-font-smoothing:antialiased}html{height:-webkit-fill-available}body{font-family:-apple-system,'Helvetica Neue',sans-serif;background:${C.bg};color:${C.text};min-height:100dvh;min-height:-webkit-fill-available;overscroll-behavior:none}input,select,textarea{font-family:inherit;font-size:16px;color:${C.text};background:${C.surface};border:1px solid ${C.border};border-radius:10px;padding:10px 14px;width:100%;outline:none}input:focus,select:focus,textarea:focus{border-color:${C.accentMid}}textarea{resize:none;line-height:1.5}button{font-family:inherit;cursor:pointer;border:none;outline:none}::-webkit-scrollbar{display:none}@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{maxWidth: 430, margin: "0 auto", background: C.bg, minHeight: "100dvh", paddingTop: "calc(54px + env(safe-area-inset-top, 0px))", paddingBottom: "calc(72px + env(safe-area-inset-bottom, 0px))"}}>
        {tab === "today" && <TodayScreen />}
        {tab === "closet" && <ClosetScreen />}
        {tab === "calendar" && <CalendarScreen />}
        {tab === "style" && <StyleScreen />}
        {tab === "discover" && <DiscoverScreen />}
      </div>

      <div style={{position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430, background: "rgba(255,255,255,0.94)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderTop: `0.5px solid rgba(0,0,0,0.06)`, display: "flex", flexDirection: "column", zIndex: 100}}>
        <div style={{display: "flex"}}>
          {NAV.map(n => (
            <button key={n.id} onClick={() => setTab(n.id)} style={{flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "10px 0 8px", background: "transparent", gap: 3, color: tab === n.id ? C.accent : C.textMuted}}>
              <i className={`ti ${n.icon}`} style={{fontSize: 20}} aria-hidden="true" />
              <span style={{fontSize: 9, fontWeight: tab === n.id ? 500 : 400, letterSpacing: "0.03em"}}>{n.label}</span>
            </button>
          ))}
        </div>
        <div style={{height: "env(safe-area-inset-bottom, 0px)"}} />
      </div>

      {showAdd && <AddSheet />}
      {showClip && <ClipSheet />}
      {showPinPicker && <PinPickerSheet />}
      {showOutfitBuilder && <OutfitBuilder />}
      {showCollage && <OutfitCollage />}
      {showGhostModel && <GhostModel />}
      {showCalDay && <CalendarDaySheet />}
      {viewBoard && <BoardDetailView />}
    </>
  );
}