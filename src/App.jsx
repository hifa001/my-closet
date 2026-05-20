import {useState, useRef, useEffect} from "react";

const C = {
  bg: "#f0ebe1",
  surface: "#ffffff",
  surface2: "#f7f4ef",
  accent: "#1e3a2f",
  accentMid: "#2d5a3f",
  accentLight: "#e8f0eb",
  text: "#1a1814",
  textMid: "#4a4540",
  textMuted: "#8a8480",
  border: "rgba(26,24,20,0.11)",
  borderMed: "rgba(26,24,20,0.2)",
};

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
  {id: 1, brand: "Free People", name: "Ribbed Tank", category: "Tops", sub: "Tank", size: "S", color: "Black", hex: "#1a1a1a", material: "Cotton", price: 68, wears: 14, secondhand: false, season: "All Season", condition: "Good", note: "", desc: "", origin: "", url: "", photo: null, conditionDetails: ""},
  {id: 2, brand: "Gilli", name: "Floral Midi Dress", category: "One Piece", sub: "Dress", size: "S", color: "Black", hex: "#1a1a1a", material: "Polyester", price: 95, wears: 3, secondhand: false, season: "Summer", condition: "Excellent", note: "", desc: "", origin: "", url: "", photo: null, conditionDetails: ""},
  {id: 3, brand: "Levi's", name: "501 Straight Jeans", category: "Bottoms", sub: "Jeans", size: "27", color: "Blue", hex: "#2a5ba8", material: "Denim", price: 128, wears: 22, secondhand: false, season: "All Season", condition: "Good", note: "", desc: "", origin: "USA", url: "", photo: null, conditionDetails: ""},
  {id: 4, brand: "Levi's", name: "Dark Wash Flare", category: "Bottoms", sub: "Jeans", size: "27", color: "Black", hex: "#1a1a1a", material: "Denim", price: 98, wears: 8, secondhand: false, season: "All Season", condition: "Good", note: "", desc: "", origin: "", url: "", photo: null, conditionDetails: ""},
  {id: 5, brand: "Levi's", name: "Light Wash Straight", category: "Bottoms", sub: "Jeans", size: "28", color: "Blue", hex: "#5b8ed4", material: "Denim", price: 108, wears: 11, secondhand: true, season: "All Season", condition: "Good", note: "", desc: "", origin: "", url: "", photo: null, conditionDetails: ""},
  {id: 6, brand: "ARITZIA", name: "Mini Micro Skirt", category: "Bottoms", sub: "Skirt", size: "S", color: "Brown", hex: "#5a2e10", material: "Cotton", price: 65, wears: 4, secondhand: false, season: "Summer", condition: "Excellent", note: "", desc: "", origin: "", url: "", photo: null, conditionDetails: ""},
  {id: 7, brand: "COS", name: "Muscle Tee", category: "Tops", sub: "T-shirt", size: "S", color: "White", hex: "#f0f0f0", material: "Cotton", price: 45, wears: 18, secondhand: false, season: "All Season", condition: "Good", note: "", desc: "", origin: "", url: "", photo: null, conditionDetails: ""},
  {id: 8, brand: "New Balance", name: "550 Sneakers", category: "Shoes", sub: "Sneakers", size: "7", color: "White", hex: "#f5f5f5", material: "Leather", price: 110, wears: 25, secondhand: false, season: "All Season", condition: "Good", note: "", desc: "", origin: "USA", url: "", photo: null, conditionDetails: ""},
  {id: 9, brand: "Zara", name: "Wide Leg Trousers", category: "Bottoms", sub: "Trousers", size: "S", color: "Beige", hex: "#d4b896", material: "Linen", price: 59, wears: 7, secondhand: false, season: "Summer", condition: "Good", note: "", desc: "", origin: "", url: "", photo: null, conditionDetails: ""},
];

const BOOKMARKS = ["Ganni", "Faithfull The Brand", "Kotn", "Reformation", "Toteme", "Arket"];
const EMPTY = {brand: "", name: "", category: "Tops", sub: "T-shirt", size: "", color: "Black", hex: "#1a1a1a", material: "Cotton", price: "", wears: 0, secondhand: false, season: "All Season", condition: "Good", note: "", desc: "", origin: "", url: "", photo: null, conditionDetails: ""};

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
  const [tab, setTab] = useState("today");
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
  const fileRef = useRef();

  const setF = (k, v) => setForm(p => ({...p, [k]: v}));
  const subCats = CATEGORIES.find(c => c.name === form.category)?.sub || [];

  const handlePhoto = (e) => {
    const f = e.target.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = ev => setF("photo", ev.target.result);
    r.readAsDataURL(f);
  };

  const openAdd = () => {setEditItem(null); setForm(EMPTY); setShowAdd(true);};
  const openEdit = (item) => {setEditItem(item); setForm({...item}); setShowAdd(true); setTab("closet");};
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

  const Row = ({label, sub, val}) => (
    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 0", borderBottom: `0.5px solid ${C.border}`}}>
      <div>
        <div style={{fontSize: 14, color: C.text}}>{label}</div>
        {sub && <div style={{fontSize: 11, color: C.textMuted, marginTop: 2}}>{sub}</div>}
      </div>
      <div style={{display: "flex", alignItems: "center", gap: 8, color: C.textMuted}}>
        {val && <span style={{fontSize: 13, color: C.textMid}}>{val}</span>}
        <span style={{fontSize: 18}}>›</span>
      </div>
    </div>
  );

  const Card = ({style, children}) => (
    <div style={{background: C.surface, borderRadius: 14, border: `0.5px solid ${C.border}`, overflow: "hidden", ...style}}>{children}</div>
  );

  const CardHead = ({icon, title, sub, bg}) => (
    <div style={{padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, background: bg || C.surface2, borderBottom: `0.5px solid ${C.border}`}}>
      {icon && <i className={`ti ti-${icon}`} style={{fontSize: 22, color: C.accent}} aria-hidden="true" />}
      <div>
        <div style={{fontSize: 14, fontWeight: 500}}>{title}</div>
        {sub && <div style={{fontSize: 12, color: C.textMuted}}>{sub}</div>}
      </div>
    </div>
  );

  // ── Screens ─────────────────────────────────────────────────────────────

  const TodayScreen = () => (
    <div style={{padding: "0 0 20px"}}>
      <div style={{padding: "20px 20px 14px"}}>
        <div style={{fontSize: 11, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 3}}>
          {new Date().toLocaleDateString("en-US", {weekday: "long", month: "long", day: "numeric"})}
        </div>
        <div style={{fontSize: 28, fontWeight: 300, lineHeight: 1.2}}>Good morning</div>
      </div>

      <div style={{margin: "0 16px 14px"}}>
        <Card>
          <CardHead icon="shirt" title="Clothing Stats" sub="All about your wardrobe" />
          <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: `0.5px solid ${C.border}`}}>
            <div style={{padding: "14px 16px", borderRight: `0.5px solid ${C.border}`}}>
              <div style={{fontSize: 11, color: C.textMuted, marginBottom: 4}}>Item Count</div>
              <div style={{fontSize: 30, fontWeight: 300}}>{items.length}</div>
            </div>
            <div style={{padding: "14px 16px"}}>
              <div style={{fontSize: 11, color: C.textMuted, marginBottom: 4}}>Closet Value</div>
              <div style={{fontSize: 22, fontWeight: 300}}>${totalValue.toLocaleString()}</div>
            </div>
          </div>
          <div style={{padding: "12px 16px"}}>
            <div style={{fontSize: 11, color: C.textMuted, marginBottom: 6}}>Color</div>
            <ColorBar items={items} />
          </div>
        </Card>
      </div>

      {neverWorn.length > 0 && (
        <div style={{margin: "0 16px 14px"}}>
          <Card>
            <div style={{padding: "12px 16px", display: "flex", justifyContent: "space-between", borderBottom: `0.5px solid ${C.border}`}}>
              <div style={{fontSize: 14, fontWeight: 500}}>Never worn</div>
              <div style={{fontSize: 12, color: C.textMuted}}>{neverWorn.length} items</div>
            </div>
            <div style={{display: "flex", gap: 8, padding: "12px 16px", overflowX: "auto"}}>
              {neverWorn.slice(0, 7).map(item => (
                <div key={item.id} onClick={() => openEdit(item)} style={{flexShrink: 0, width: 68, cursor: "pointer"}}>
                  <div style={{height: 84, background: C.surface2, borderRadius: 8, overflow: "hidden", marginBottom: 4}}>
                    {item.photo ? <img src={item.photo} style={{width: "100%", height: "100%", objectFit: "contain"}} /> : <Placeholder item={item} size={68} />}
                  </div>
                  <div style={{fontSize: 9, color: C.textMuted, textAlign: "center", lineHeight: 1.2}}>{item.brand}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      <div style={{margin: "0 16px 14px"}}>
        <Card>
          <div style={{padding: "12px 16px", borderBottom: `0.5px solid ${C.border}`}}>
            <div style={{fontSize: 14, fontWeight: 500}}>Most worn</div>
          </div>
          {[...items].sort((a, b) => b.wears - a.wears).slice(0, 4).map((item, i, arr) => (
            <div key={item.id} onClick={() => openEdit(item)} style={{display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", borderBottom: i < arr.length - 1 ? `0.5px solid ${C.border}` : "none", cursor: "pointer"}}>
              <div style={{width: 42, height: 52, background: C.surface2, borderRadius: 7, overflow: "hidden", flexShrink: 0}}>
                {item.photo ? <img src={item.photo} style={{width: "100%", height: "100%", objectFit: "contain"}} /> : <Placeholder item={item} size={42} />}
              </div>
              <div style={{flex: 1}}>
                <div style={{fontSize: 11, color: C.textMuted}}>{item.brand}</div>
                <div style={{fontSize: 13, fontWeight: 500}}>{item.name}</div>
              </div>
              <div style={{textAlign: "right"}}>
                <div style={{fontSize: 16, fontWeight: 500, color: C.accent}}>{item.wears}×</div>
                <div style={{fontSize: 10, color: C.textMuted}}>CPW ${item.wears > 0 ? (item.price / item.wears).toFixed(0) : "—"}</div>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );

  const ClosetScreen = () => (
    <div style={{paddingBottom: 20}}>
      <div style={{padding: "0 16px 10px"}}>
        <div style={{display: "flex", alignItems: "center", gap: 8, background: C.surface, borderRadius: 10, border: `0.5px solid ${C.border}`, padding: "8px 12px"}}>
          <i className="ti ti-search" style={{fontSize: 15, color: C.textMuted}} aria-hidden="true" />
          <input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Search brand, category, hashtag…" style={{border: "none", background: "transparent", outline: "none", flex: 1, fontSize: 13, padding: 0}} />
          {searchQ && <button onClick={() => setSearchQ("")} style={{background: "transparent", color: C.textMuted, fontSize: 16, lineHeight: 1}}>×</button>}
        </div>
      </div>

      <div style={{display: "grid", gridTemplateColumns: "repeat(3,1fr)", borderBottom: `0.5px solid ${C.border}`}}>
        {[["items", `Items (${items.length})`], ["outfits", `Outfits (${outfits.length})`], ["collections", `Collections (${collections.length})`]].map(([id, label]) => (
          <button key={id} onClick={() => setClosetTab(id)} style={{padding: "10px 4px", background: "transparent", color: closetTab === id ? C.text : C.textMuted, fontSize: 11, fontWeight: closetTab === id ? 500 : 400, borderBottom: closetTab === id ? `2px solid ${C.accent}` : "2px solid transparent", letterSpacing: "0.03em"}}>
            {label}
          </button>
        ))}
      </div>

      {closetTab === "items" && <>
        <div style={{display: "flex", gap: 6, padding: "10px 16px", overflowX: "auto"}}>
          {["All", ...CATEGORIES.map(c => c.name)].map(cat => (
            <button key={cat} onClick={() => setFilterCat(cat)} style={{flexShrink: 0, padding: "5px 12px", borderRadius: 20, background: filterCat === cat ? C.accent : C.surface, color: filterCat === cat ? "#fff" : C.textMid, fontSize: 11, fontWeight: filterCat === cat ? 500 : 400, border: `0.5px solid ${filterCat === cat ? C.accent : C.border}`}}>
              {cat}
            </button>
          ))}
        </div>
        <div style={{display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, padding: "0 12px"}}>
          {filtered.map(item => (
            <div key={item.id} onClick={() => openEdit(item)} style={{background: C.surface, borderRadius: 12, overflow: "hidden", cursor: "pointer", border: `0.5px solid ${C.border}`}}>
              <div style={{height: 150, background: item.photo ? "#fff" : C.surface2, position: "relative", overflow: "hidden"}}>
                {item.photo ? <img src={item.photo} style={{width: "100%", height: "100%", objectFit: "contain", padding: 4}} /> : <Placeholder item={item} size={80} />}
                {item.secondhand && <div style={{position: "absolute", top: 5, left: 5, background: C.accent, color: "#fff", fontSize: 8, fontWeight: 600, padding: "2px 6px", borderRadius: 5}}>2ND</div>}
              </div>
              <div style={{padding: "7px 9px 10px"}}>
                <div style={{fontSize: 10, color: C.textMuted, marginBottom: 1}}>{item.brand}</div>
                <div style={{fontSize: 11, fontWeight: 500, lineHeight: 1.3}}>{item.name}</div>
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && <div style={{textAlign: "center", padding: "40px 20px", color: C.textMuted, fontSize: 13}}>No items found</div>}
      </>}

      {closetTab === "outfits" && (
        <div style={{padding: "16px"}}>
          <button onClick={() => setShowOutfitBuilder(true)} style={{width: "100%", padding: "12px", background: C.accent, color: "#fff", borderRadius: 12, fontSize: 13, fontWeight: 500, marginBottom: 14}}>+ Build New Outfit</button>
          {outfits.length === 0
            ? <div style={{textAlign: "center", padding: "30px", color: C.textMuted, fontSize: 13}}>No outfits yet — build your first look!</div>
            : outfits.map(o => (
              <div key={o.id} style={{background: C.surface, borderRadius: 12, border: `0.5px solid ${C.border}`, padding: "12px 14px", marginBottom: 10}}>
                <div style={{fontSize: 14, fontWeight: 500, marginBottom: 8}}>{o.name}</div>
                <div style={{display: "flex", gap: 6, marginBottom: 10}}>
                  {o.items.slice(0, 5).map(item => (
                    <div key={item.id} style={{width: 50, height: 62, background: C.surface2, borderRadius: 8, overflow: "hidden", flexShrink: 0}}>
                      {item.photo ? <img src={item.photo} style={{width: "100%", height: "100%", objectFit: "contain"}} /> : <Placeholder item={item} size={50} />}
                    </div>
                  ))}
                </div>
                <div style={{display: "flex", gap: 6}}>
                  <button onClick={() => {setCollageOutfit(o); setShowCollage(true);}} style={{flex: 1, padding: "7px 10px", background: C.accent, color: "#fff", borderRadius: 8, fontSize: 11, fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center", gap: 5}}>
                    <i className="ti ti-layout-grid" style={{fontSize: 13}} aria-hidden="true" />
                    Collage
                  </button>
                  <button onClick={() => {setGhostOutfit(o); setShowGhostModel(true);}} style={{flex: 1, padding: "7px 10px", background: C.surface2, color: C.textMid, border: `0.5px solid ${C.border}`, borderRadius: 8, fontSize: 11, fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center", gap: 5}}>
                    <i className="ti ti-man" style={{fontSize: 13}} aria-hidden="true" />
                    Ghost Model
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      )}

      {closetTab === "collections" && (
        <div style={{padding: "16px"}}>
          <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16}}>
            {[{id: "Packing", icon: "briefcase", bg: C.accent}, {id: "Wishlists", icon: "bookmark", bg: "#7a6040"}, {id: "Inspiration", icon: "bulb", bg: "#4a6a2a"}, {id: "Capsules", icon: "layout-grid", bg: "#9a7820"}].map(c => (
              <button key={c.id} onClick={() => setCollTab(c.id)} style={{padding: "16px 14px", borderRadius: 14, background: c.bg, color: "#fff", textAlign: "left", border: collTab === c.id ? `2px solid ${C.text}` : `2px solid transparent`}}>
                <i className={`ti ti-${c.icon}`} style={{fontSize: 22, display: "block", marginBottom: 8}} aria-hidden="true" />
                <div style={{fontSize: 13, fontWeight: 500, fontStyle: "italic"}}>{c.id}</div>
              </button>
            ))}
          </div>
          {collections.filter(c => c.type === collTab).length === 0
            ? <div style={{textAlign: "center", padding: "20px", color: C.textMuted, fontSize: 13}}>No {collTab.toLowerCase()} yet.</div>
            : collections.filter(c => c.type === collTab).map(c => (
              <div key={c.id} style={{background: C.surface, borderRadius: 12, border: `0.5px solid ${C.border}`, padding: "12px 14px", marginBottom: 10}}>
                <div style={{fontSize: 14, fontWeight: 500}}>{c.name}</div>
                <div style={{fontSize: 12, color: C.textMuted, marginTop: 2}}>{c.items?.length || 0} items</div>
              </div>
            ))
          }
          <button onClick={() => {const n = prompt(`New ${collTab.slice(0, -1)} name:`); if (n) setCollections(p => [...p, {id: Date.now(), name: n, type: collTab, items: []}]);}} style={{width: "100%", marginTop: 8, padding: "11px", borderRadius: 12, background: "transparent", border: `1px dashed ${C.borderMed}`, color: C.textMuted, fontSize: 13}}>
            + New {collTab.slice(0, -1)}
          </button>
        </div>
      )}
    </div>
  );

  const StyleScreen = () => (
    <div style={{padding: "0 0 20px"}}>
      <div style={{padding: "20px 20px 14px"}}>
        <div style={{fontSize: 24, fontWeight: 300}}>Style Stats</div>
      </div>

      <div style={{margin: "0 16px 14px"}}>
        <button style={{width: "100%", background: `linear-gradient(135deg,#d4c0a0,#c4a880)`, borderRadius: 14, padding: "16px", display: "flex", alignItems: "center", gap: 14, textAlign: "left", border: "none"}}>
          <i className="ti ti-ruler-measure" style={{fontSize: 28, color: "#3a200a"}} aria-hidden="true" />
          <div>
            <div style={{fontSize: 14, fontWeight: 500, color: "#2a1408"}}>Size Tracker</div>
            <div style={{fontSize: 12, color: "#5a3020"}}>Your measurements and sizes</div>
          </div>
          <span style={{marginLeft: "auto", color: "#5a3020", fontSize: 20}}>›</span>
        </button>
      </div>

      <div style={{margin: "0 16px 14px"}}>
        <Card>
          <div style={{padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, background: C.surface2, borderBottom: `0.5px solid ${C.border}`}}>
            <i className="ti ti-hanger" style={{fontSize: 22, color: C.accent}} aria-hidden="true" />
            <div>
              <div style={{fontSize: 14, fontWeight: 500}}>Clothing Stats</div>
              <div style={{fontSize: 12, color: C.textMuted}}>All about your wardrobe</div>
            </div>
          </div>
          <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: `0.5px solid ${C.border}`}}>
            <div style={{padding: "14px 16px", borderRight: `0.5px solid ${C.border}`}}>
              <div style={{fontSize: 11, color: C.textMuted, marginBottom: 3}}>Item Count</div>
              <div style={{fontSize: 28, fontWeight: 300}}>{items.length}</div>
            </div>
            <div style={{padding: "14px 16px"}}>
              <div style={{fontSize: 11, color: C.textMuted, marginBottom: 3}}>Total Closet Value</div>
              <div style={{fontSize: 20, fontWeight: 300}}>${totalValue.toLocaleString()}</div>
            </div>
          </div>
          <div style={{padding: "12px 16px", borderBottom: `0.5px solid ${C.border}`}}>
            <div style={{fontSize: 11, color: C.textMuted, marginBottom: 6}}>Color</div>
            <ColorBar items={items} />
          </div>
          <div style={{padding: "0 16px"}}>
            <Row label={`${items.filter(i => i.wears === 0).length} Never Used in an Outfit`} />
            <Row label="Not Logged on Calendar" />
            <Row label="Worn History" sub="Top 100 Most and Least Worn" />
            <Row label="Cost per Wear" sub={`Avg $${avgCPW}`} />
            <Row label="Purchase Price" sub={`Total $${totalSpend.toLocaleString()}`} />
            <Row label="100 Most Packed" />
          </div>
        </Card>
      </div>

      <div style={{margin: "0 16px 14px"}}>
        <Card>
          <div style={{padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, background: C.surface2, borderBottom: `0.5px solid ${C.border}`}}>
            <i className="ti ti-layout-columns" style={{fontSize: 22, color: C.accent}} aria-hidden="true" />
            <div>
              <div style={{fontSize: 14, fontWeight: 500}}>View Closet By…</div>
              <div style={{fontSize: 12, color: C.textMuted}}>Browse the closet by field</div>
            </div>
          </div>
          <div style={{padding: "16px"}}>
            <div style={{display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginBottom: 12}}>
              <DonutChart segs={colorSegs} size={150} />
              <div>
                <div style={{fontSize: 24, fontWeight: 300}}>{topColor.pct}%</div>
                <div style={{fontSize: 16, fontWeight: 500, color: C.text}}>{topColor.name}</div>
                <div style={{fontSize: 11, color: C.textMuted, marginTop: 4}}>Color</div>
              </div>
            </div>
          </div>
          <div style={{padding: "0 16px"}}>
            {["Color", "Status", "Price", "Fabric", "Size", "Season", "Brand"].map(l => <Row key={l} label={l} />)}
          </div>
        </Card>
      </div>

      <div style={{margin: "0 16px 14px"}}>
        <Card>
          <CardHead icon="chart-bar" title="Composition" sub="Breakdown by category" />
          <div style={{padding: "14px 16px"}}>
            {CATEGORIES.map(cat => {
              const count = items.filter(i => i.category === cat.name).length;
              if (count === 0) return null;
              const pct = Math.round(count / items.length * 100);
              return (
                <div key={cat.name} style={{marginBottom: 11}}>
                  <div style={{display: "flex", justifyContent: "space-between", marginBottom: 4}}>
                    <span style={{fontSize: 12, color: C.textMid}}>{cat.name}</span>
                    <span style={{fontSize: 12, color: C.textMuted}}>{count} &nbsp;({pct}%)</span>
                  </div>
                  <div style={{height: 6, background: C.surface2, borderRadius: 3, overflow: "hidden"}}>
                    <div style={{height: "100%", width: `${pct}%`, background: C.accent, borderRadius: 3, transition: "width 0.4s"}} />
                  </div>
                </div>
              );
            })}
            {items.length === 0 && <div style={{fontSize: 12, color: C.textMuted}}>Add items to see composition.</div>}
          </div>
        </Card>
      </div>

      <div style={{margin: "0 16px 14px"}}>
        <Card>
          <CardHead icon="shirt-sport" title="Looks Stats" sub="How you wear your outfits" />
          <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: `0.5px solid ${C.border}`}}>
            <div style={{padding: "14px 16px", borderRight: `0.5px solid ${C.border}`}}>
              <div style={{fontSize: 11, color: C.textMuted, marginBottom: 3}}>Outfit Count</div>
              <div style={{fontSize: 28, fontWeight: 300}}>{outfits.length}</div>
            </div>
            <div style={{padding: "14px 16px"}}>
              <div style={{fontSize: 11, color: C.textMuted, marginBottom: 3}}>Avg. Items per Look</div>
              <div style={{fontSize: 28, fontWeight: 300}}>{outfits.length > 0 ? Math.round(outfits.reduce((s, o) => s + o.items.length, 0) / outfits.length) : 0}</div>
            </div>
          </div>
          <div style={{padding: "0 16px"}}>
            <Row label="Not Logged on Calendar" />
            <Row label="Worn History" sub="100 Most Recently Added" />
            <Row label="100 Most Packed" />
          </div>
        </Card>
      </div>
    </div>
  );

  const ShopScreen = () => (
    <div style={{padding: "0 0 20px"}}>
      <div style={{padding: "20px 20px 14px", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
        <div style={{fontSize: 24, fontWeight: 300}}>Shopping</div>
        <button style={{fontSize: 13, color: C.accentMid, background: "transparent"}}>Edit</button>
      </div>

      <div style={{margin: "0 16px 6px"}}>
        <button onClick={() => setShowClip(true)} style={{width: "100%", background: "#1c1c1c", borderRadius: 14, padding: "18px 20px", display: "flex", alignItems: "center", gap: 16, border: "none", cursor: "pointer"}}>
          <div style={{width: 54, height: 54, border: "2px dashed rgba(255,255,255,0.3)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0}}>
            <i className="ti ti-scissors" style={{fontSize: 24, color: "rgba(255,255,255,0.65)"}} aria-hidden="true" />
          </div>
          <div style={{textAlign: "left"}}>
            <div style={{fontSize: 15, fontWeight: 500, color: "#fff", letterSpacing: "0.05em"}}>CLIP FROM WEB</div>
            <div style={{fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 3}}>Save images from websites with the clipper tool</div>
          </div>
        </button>
      </div>
      <div style={{textAlign: "center", fontSize: 12, color: C.textMuted, padding: "6px 0 14px"}}>Save images from websites with the clipper tool</div>

      <div style={{margin: "0 16px 14px"}}>
        <Card>
          <div style={{padding: "13px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `0.5px solid ${C.border}`}}>
            <div style={{fontSize: 14, fontWeight: 500}}>Wish List</div>
            <div style={{display: "flex", alignItems: "center", gap: 8, color: C.textMuted}}>
              <span style={{fontSize: 13}}>{wishlist.length}</span>
              <span style={{fontSize: 18}}>›</span>
            </div>
          </div>
          <div style={{padding: "10px 16px", fontSize: 12, color: C.textMuted}}>Tap the star while clipping to save a wish list item.</div>
        </Card>
      </div>

      <div style={{padding: "0 16px"}}>
        <div style={{fontSize: 11, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10}}>Bookmarks</div>
        <Card>
          {BOOKMARKS.map((b, i) => (
            <div key={b} style={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: "13px 16px", borderBottom: i < BOOKMARKS.length - 1 ? `0.5px solid ${C.border}` : "none"}}>
              <span style={{fontSize: 14}}>{b}</span>
              <span style={{color: C.textMuted, fontSize: 18}}>›</span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );

  // ── Add/Edit sheet ────────────────────────────────────────────────────
  const AddSheet = () => (
    <div style={{position: "fixed", inset: 0, background: "rgba(10,8,6,0.55)", zIndex: 300, display: "flex", alignItems: "flex-end", justifyContent: "center"}} onClick={closeAdd}>
      <div style={{width: "100%", maxWidth: 430, background: C.surface, borderRadius: "20px 20px 0 0", maxHeight: "94vh", overflowY: "auto", paddingBottom: 48}} onClick={e => e.stopPropagation()}>
        <div style={{padding: "14px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, background: C.surface, zIndex: 10, borderBottom: `0.5px solid ${C.border}`}}>
          <button onClick={closeAdd} style={{background: "transparent", fontSize: 18, color: C.textMuted, lineHeight: 1}}>←</button>
          <div style={{fontSize: 12, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.08em"}}>{editItem ? "Edit Item" : "Add Item"}</div>
          {editItem ? <button onClick={() => deleteItem(editItem.id)} style={{background: "transparent"}}><i className="ti ti-trash" style={{fontSize: 18, color: "#c02020"}} aria-hidden="true" /></button> : <div style={{width: 32}} />}
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
          <div onClick={() => fileRef.current.click()} style={{width: "100%", height: 190, background: C.surface2, borderRadius: 12, border: `1.5px dashed ${C.borderMed}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, cursor: "pointer", marginBottom: 20, overflow: "hidden"}}>
            {form.photo ? <img src={form.photo} style={{width: "100%", height: "100%", objectFit: "cover"}} /> : <>
              <i className="ti ti-camera" style={{fontSize: 28, color: C.textMuted}} aria-hidden="true" />
              <div style={{fontSize: 13, color: C.textMuted}}>Tap to add photo</div>
              <div style={{fontSize: 11, color: C.textMuted, opacity: 0.7}}>Upload from camera roll</div>
            </>}
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
        </div>
      </div>
    </div>
  );

  const ClipSheet = () => (
    <div style={{position: "fixed", inset: 0, background: "rgba(10,8,6,0.55)", zIndex: 300, display: "flex", alignItems: "flex-end", justifyContent: "center"}} onClick={() => {setShowClip(false); setClipUrl(""); setClipStep(0)}}>
      <div style={{width: "100%", maxWidth: 430, background: C.surface, borderRadius: "20px 20px 0 0", padding: "24px 20px 50px"}} onClick={e => e.stopPropagation()}>
        <div style={{display: "flex", alignItems: "center", gap: 10, marginBottom: 4}}>
          <i className="ti ti-scissors" style={{fontSize: 22, color: C.accent}} aria-hidden="true" />
          <div style={{fontSize: 18, fontWeight: 500}}>Clip from Web</div>
        </div>
        <div style={{fontSize: 12, color: C.textMuted, marginBottom: 20}}>Save any clothing item from the internet to your closet</div>

        {clipStep === 0 && <>
          <input value={clipUrl} onChange={e => setClipUrl(e.target.value)} placeholder="Paste product URL here…" style={{marginBottom: 12}} />
          <button onClick={() => {if (clipUrl) {setClipStep(1); setTimeout(() => setClipStep(2), 1600)} }} style={{width: "100%", padding: "13px", background: C.accent, color: "#fff", borderRadius: 12, fontSize: 14, fontWeight: 500}}>
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
          <div style={{background: C.surface2, borderRadius: 10, padding: "12px 14px", marginBottom: 14}}>
            <div style={{fontSize: 11, color: C.accentMid, marginBottom: 3}}>Detected from: {(clipUrl.replace(/https?:\/\//, "").split("/")[0]) || "URL"}</div>
            <div style={{fontSize: 13, fontWeight: 500}}>Item ready to add — review and confirm details</div>
          </div>
          <button onClick={() => {setForm({...EMPTY, url: clipUrl}); setShowClip(false); setClipUrl(""); setClipStep(0); setShowAdd(true)}} style={{width: "100%", padding: "13px", background: C.accent, color: "#fff", borderRadius: 12, fontSize: 14, fontWeight: 500, marginBottom: 8}}>
            Continue Adding Item
          </button>
          <button onClick={() => {setWishlist(p => [...p, {id: Date.now(), url: clipUrl, name: "Clipped item"}]); setShowClip(false); setClipUrl(""); setClipStep(0)}} style={{width: "100%", padding: "13px", background: "transparent", border: `0.5px solid ${C.border}`, borderRadius: 12, fontSize: 14, color: C.textMid}}>
            ⭐  Save to Wish List instead
          </button>
        </>}
      </div>
    </div>
  );

  const OutfitBuilder = () => {
    const [sel, setSel] = useState([]);
    const [name, setName] = useState("");
    const toggle = item => setSel(p => p.find(i => i.id === item.id) ? p.filter(i => i.id !== item.id) : [...p, item]);
    const save = () => {
      if (!name || sel.length === 0) return;
      setOutfits(p => [...p, {id: Date.now(), name, items: sel}]);
      setShowOutfitBuilder(false);
    };
    return (
      <div style={{position: "fixed", inset: 0, background: "rgba(10,8,6,0.55)", zIndex: 300, display: "flex", alignItems: "flex-end"}} onClick={() => setShowOutfitBuilder(false)}>
        <div style={{width: "100%", maxWidth: 430, margin: "0 auto", background: C.surface, borderRadius: "20px 20px 0 0", maxHeight: "86vh", display: "flex", flexDirection: "column"}} onClick={e => e.stopPropagation()}>
          <div style={{padding: "14px 20px", borderBottom: `0.5px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
            <div style={{fontSize: 15, fontWeight: 500}}>Build Outfit</div>
            <button onClick={() => setShowOutfitBuilder(false)} style={{background: "transparent", color: C.textMuted, fontSize: 22, lineHeight: 1}}>×</button>
          </div>
          <div style={{padding: "10px 16px", borderBottom: `0.5px solid ${C.border}`, minHeight: 80}}>
            {sel.length === 0
              ? <div style={{fontSize: 12, color: C.textMuted, padding: "8px 0"}}>Select items below to build your look</div>
              : <div style={{display: "flex", gap: 8, overflowX: "auto"}}>
                {sel.map(item => (
                  <div key={item.id} onClick={() => toggle(item)} style={{flexShrink: 0, width: 56, height: 70, background: C.surface2, borderRadius: 8, overflow: "hidden", border: `2px solid ${C.accent}`}}>
                    {item.photo ? <img src={item.photo} style={{width: "100%", height: "100%", objectFit: "contain"}} /> : <Placeholder item={item} size={56} />}
                  </div>
                ))}
              </div>
            }
          </div>
          <div style={{flex: 1, overflowY: "auto", padding: "10px 16px"}}>
            <div style={{display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8}}>
              {items.map(item => (
                <div key={item.id} onClick={() => toggle(item)} style={{position: "relative", borderRadius: 10, overflow: "hidden", border: `2px solid ${sel.find(i => i.id === item.id) ? C.accent : C.border}`, cursor: "pointer"}}>
                  <div style={{height: 86, background: C.surface2}}>
                    {item.photo ? <img src={item.photo} style={{width: "100%", height: "100%", objectFit: "contain"}} /> : <Placeholder item={item} size={80} />}
                  </div>
                  <div style={{padding: "4px 6px 6px", fontSize: 9, color: C.textMuted}}>{item.brand}</div>
                  {sel.find(i => i.id === item.id) && <div style={{position: "absolute", top: 5, right: 5, width: 18, height: 18, background: C.accent, borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center"}}><i className="ti ti-check" style={{fontSize: 11, color: "#fff"}} aria-hidden="true" /></div>}
                </div>
              ))}
            </div>
          </div>
          <div style={{padding: "12px 16px 34px", borderTop: `0.5px solid ${C.border}`, display: "flex", gap: 8}}>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Name this outfit…" style={{flex: 1}} />
            <button onClick={save} style={{padding: "10px 18px", background: C.accent, color: "#fff", borderRadius: 10, fontSize: 13, fontWeight: 500, whiteSpace: "nowrap"}}>Save Look</button>
          </div>
        </div>
      </div>
    );
  };

  const OutfitCollage = () => {
    const o = collageOutfit;

    // All hooks before any conditional return (Rules of Hooks)
    const [pieces, setPieces] = useState(() =>
      o ? o.items.map((item, i) => ({
        pid: i,
        item,
        x: 24 + (i % 2) * 168,
        y: 24 + Math.floor(i / 2) * 210,
        w: 148,
        h: 182,
        flip: false,
        border: false,
        z: i + 1,
      })) : []
    );
    const [sel, setSel] = useState(null);
    const dragRef = useRef(null);
    const maxZRef = useRef(o ? o.items.length : 0);

    if (!o) return null;

    const startDrag = (e, pid) => {
      e.stopPropagation();
      e.currentTarget.setPointerCapture(e.pointerId);
      setSel(pid);
      maxZRef.current += 1;
      const mz = maxZRef.current;
      setPieces(prev => prev.map(p => p.pid === pid ? {...p, z: mz} : p));
      const piece = pieces.find(p => p.pid === pid);
      dragRef.current = {pid, px: e.clientX, py: e.clientY, ox: piece.x, oy: piece.y};
    };

    const moveDrag = (e) => {
      if (!dragRef.current) return;
      const dx = e.clientX - dragRef.current.px;
      const dy = e.clientY - dragRef.current.py;
      setPieces(prev => prev.map(p =>
        p.pid === dragRef.current.pid ? {...p, x: dragRef.current.ox + dx, y: dragRef.current.oy + dy} : p
      ));
    };

    const endDrag = () => {dragRef.current = null;};

    const act = (fn) => setPieces(prev => prev.map(p => p.pid === sel ? fn(p) : p));

    const TOOLBAR = [
      {icon: "border-style-2", label: "Border", action: () => act(p => ({...p, border: !p.border}))},
      {icon: "flip-horizontal", label: "Flip", action: () => act(p => ({...p, flip: !p.flip}))},
      {
        icon: "copy", label: "Duplicate", action: () => {
          const src = pieces.find(p => p.pid === sel);
          if (!src) return;
          maxZRef.current += 1;
          const newPid = Date.now();
          setPieces(prev => [...prev, {...src, pid: newPid, x: src.x + 20, y: src.y + 20, z: maxZRef.current}]);
          setSel(newPid);
        }
      },
      {icon: "arrow-bar-to-down", label: "Back", action: () => act(p => ({...p, z: 0}))},
      {icon: "trash", label: "Remove", action: () => {setPieces(prev => prev.filter(p => p.pid !== sel)); setSel(null);}},
    ];

    return (
      <div style={{position: "fixed", inset: 0, background: "#fff", zIndex: 500, display: "flex", flexDirection: "column", userSelect: "none"}}>
        <div style={{padding: "14px 20px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: `0.5px solid ${C.border}`, flexShrink: 0, background: "#fff"}}>
          <button onClick={() => setShowCollage(false)} style={{background: "transparent", color: C.textMuted, fontSize: 20, lineHeight: 1}}>×</button>
          <div style={{fontSize: 12, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: C.text}}>{o.name}</div>
          <button onClick={() => setShowCollage(false)} style={{background: "transparent", fontSize: 13, fontWeight: 600, color: C.accent}}>Done</button>
        </div>

        <div
          style={{flex: 1, position: "relative", background: "#f5f2ec", overflow: "hidden", touchAction: "none"}}
          onClick={() => setSel(null)}
        >
          {pieces.map(p => (
            <div
              key={p.pid}
              style={{
                position: "absolute",
                left: p.x, top: p.y,
                width: p.w, height: p.h,
                zIndex: p.z,
                background: "#fff",
                borderRadius: 6,
                overflow: "hidden",
                transform: p.flip ? "scaleX(-1)" : "none",
                border: p.border ? `2.5px solid ${C.accent}` : "2.5px solid transparent",
                boxShadow: p.pid === sel
                  ? `0 0 0 2px ${C.accent}, 0 6px 20px rgba(0,0,0,0.18)`
                  : "0 2px 12px rgba(0,0,0,0.10)",
                cursor: "grab",
                touchAction: "none",
              }}
              onPointerDown={e => startDrag(e, p.pid)}
              onPointerMove={moveDrag}
              onPointerUp={endDrag}
              onClick={e => e.stopPropagation()}
            >
              {p.item.photo
                ? <img src={p.item.photo} style={{width: "100%", height: "100%", objectFit: "contain"}} draggable={false} />
                : <Placeholder item={p.item} size={p.w} />
              }
            </div>
          ))}
        </div>

        {sel !== null ? (
          <div style={{background: "#fff", borderTop: `0.5px solid ${C.border}`, padding: "10px 4px 36px", display: "flex", justifyContent: "space-around", flexShrink: 0}}>
            {TOOLBAR.map(({icon, label, action}) => (
              <button key={label} onClick={action} style={{display: "flex", flexDirection: "column", alignItems: "center", gap: 3, background: "transparent", color: C.textMid, padding: "4px 10px"}}>
                <i className={`ti ti-${icon}`} style={{fontSize: 22}} aria-hidden="true" />
                <span style={{fontSize: 10}}>{label}</span>
              </button>
            ))}
          </div>
        ) : (
          <div style={{padding: "12px 20px 36px", background: "#fff", borderTop: `0.5px solid ${C.border}`, textAlign: "center", fontSize: 11, color: C.textMuted, flexShrink: 0}}>
            Tap an item to select · Drag to reposition
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
          <div style={{padding: "18px 20px 6px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0}}>
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
        <div style={{padding: "20px 20px 14px", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
          <button onClick={prevMonth} style={{background: "transparent", fontSize: 22, color: C.textMuted, lineHeight: 1, padding: "4px 8px"}}>‹</button>
          <div style={{fontSize: 20, fontWeight: 300}}>{MONTHS[month]} {year}</div>
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
        <div style={{width: "100%", maxWidth: 430, background: C.surface, borderRadius: "20px 20px 0 0", padding: "20px 20px 50px"}} onClick={e => e.stopPropagation()}>
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
    {id: "calendar", icon: "ti-calendar", label: "Calendar"},
    {id: "style", icon: "ti-chart-pie-2", label: "Style"},
    {id: "shop", icon: "ti-shopping-bag", label: "Shop"},
  ];

  return (
    <>
      <style>{`*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}body{font-family:system-ui,-apple-system,'Helvetica Neue',sans-serif;background:${C.bg};color:${C.text}}input,select,textarea{font-family:inherit;font-size:14px;color:${C.text};background:${C.surface};border:1px solid ${C.border};border-radius:10px;padding:10px 14px;width:100%;outline:none}input:focus,select:focus,textarea:focus{border-color:${C.accentMid}}textarea{resize:none;line-height:1.5}button{font-family:inherit;cursor:pointer;border:none;outline:none}::-webkit-scrollbar{display:none}`}</style>
      <div style={{maxWidth: 430, margin: "0 auto", background: C.bg, minHeight: "100vh", position: "relative", paddingBottom: 80}}>
        <div style={{paddingTop: 54, minHeight: "100vh"}}>
          {tab === "today" && <TodayScreen />}
          {tab === "closet" && <ClosetScreen />}
          {tab === "calendar" && <CalendarScreen />}
          {tab === "style" && <StyleScreen />}
          {tab === "shop" && <ShopScreen />}
        </div>

        <div style={{position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 430, background: C.surface, borderTop: `0.5px solid ${C.border}`, display: "flex", zIndex: 100}}>
          {NAV.map(n => (
            <button key={n.id} onClick={() => setTab(n.id)} style={{flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", padding: "10px 0 22px", background: "transparent", gap: 4, color: tab === n.id ? C.accent : C.textMuted}}>
              <i className={`ti ${n.icon}`} style={{fontSize: 21}} aria-hidden="true" />
              <span style={{fontSize: 9, fontWeight: tab === n.id ? 500 : 400, letterSpacing: "0.02em"}}>{n.label}</span>
            </button>
          ))}
        </div>

        <button onClick={openAdd} style={{position: "fixed", bottom: 80, right: "calc(50% - 200px)", width: 50, height: 50, background: C.accent, borderRadius: 25, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 99, boxShadow: "0 3px 14px rgba(30,58,47,0.4)"}}>
          <i className="ti ti-plus" style={{fontSize: 24, color: "#fff"}} aria-hidden="true" />
        </button>

        {showAdd && <AddSheet />}
        {showClip && <ClipSheet />}
        {showOutfitBuilder && <OutfitBuilder />}
        {showCollage && <OutfitCollage />}
        {showGhostModel && <GhostModel />}
        {showCalDay && <CalendarDaySheet />}
      </div>
    </>
  );
}