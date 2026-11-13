/* ==========================================================================
   NOOLAM — main script
   --------------------------------------------------------------------------
   Vanilla JS, no dependencies. Responsibilities, in order:
     1. Catalogue data (moods, try-the-look bundle, silks, the rack, reels)
     2. Rendering of data-driven sections
     3. Shopping bag state + toast feedback
     4. Product detail view (size / front-back) and fullscreen viewer
     5. Motion: reveal-on-scroll, carousels, 3D tilt, film columns
   Image paths point to assets/images/ — update the data arrays, not markup,
   when catalogue photography changes.
   ========================================================================== */

const tickerText=`TRY THE LOOK <span style="opacity:.6">Eight Kanjivaram looks, styled head to toe</span> ◆ PURE ZARI <span style="opacity:.6">Silver-core zari woven into every temple border</span> ◆ THE RACK <span style="opacity:.6">Browse the full rail of silks</span> ◆ BRIDAL <span style="opacity:.6">Heirloom bridal silks for the day that matters</span> ◆ THE LOOMS <span style="opacity:.6">Handwoven in Kanchipuram, one saree at a time</span> ◆ `;
document.querySelectorAll('.ticker-track').forEach(t=>{t.innerHTML=`<div style="display:inline-flex">${tickerText.repeat(2)}</div><div style="display:inline-flex">${tickerText.repeat(2)}</div>`});
// Bag model: line items with quantities; the drawer renders from this.
let bagItems=[];
function bagQty(){return bagItems.reduce((a,i)=>a+i.qty,0)}
function renderBag(){document.getElementById('bagCount').textContent=bagQty();const list=document.getElementById('bagItems');list.innerHTML=bagItems.length?bagItems.map((i,x)=>`<div class="bag-row"><div><b>${i.name}</b><small>${i.price} each</small></div><span>× ${i.qty}</span><button onclick="removeBag(${x})" aria-label="Remove ${i.name}">×</button></div>`).join(''):'<p class="bag-empty">Your bag is empty — the rail is full, though.</p>';document.getElementById('bagTotal').textContent='₹'+bagItems.reduce((a,i)=>a+i.v*i.qty,0).toLocaleString('en-IN')}
function addToBag(name,price){const v=parseInt(String(price).replace(/[^0-9]/g,''))||0;const ex=bagItems.find(i=>i.name==name);if(ex)ex.qty++;else bagItems.push({name,price,v,qty:1});renderBag();toast(name+' added · Bag ('+bagQty()+')')}
function removeBag(x){bagItems.splice(x,1);renderBag()}
function openBag(){renderBag();document.getElementById('bagDrawer').classList.add('open');document.getElementById('overlay').classList.add('open')}
function closeBag(){document.getElementById('bagDrawer').classList.remove('open');document.getElementById('overlay').classList.remove('open')}
// Wishlist: a Set of piece names; hearts toggle and the nav badge counts.
let wish=new Set();
function toggleWish(name,el){const on=wish.has(name);if(on){wish.delete(name)}else{wish.add(name);toast(name+' saved to wishlist')}if(el){el.classList.toggle('on',!on);el.textContent=on?'♡':'♥'}const wc=document.getElementById('wishCount');wc.textContent=wish.size;wc.style.display=wish.size?'grid':'none'}
function showWish(){toast(wish.size?('Wishlist · '+wish.size+(wish.size>1?' pieces':' piece')+' saved'):'Your wishlist is empty — tap a ♡ on any piece')}
function toast(m){const t=document.getElementById('toast');t.textContent=m;t.classList.add('show');clearTimeout(t._x);t._x=setTimeout(()=>t.classList.remove('show'),2200)}
// Reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
// Six moods
const moods=[['WEDDING EDIT','assets/images/mood-wedding-edit.webp'],['KANCHIPURAM ICONS','assets/images/mood-kanchipuram-icons.webp'],['BANARASI HEIRLOOMS','assets/images/mood-banarasi-heirlooms.webp'],['FESTIVE RADIANCE','assets/images/mood-festive-radiance.webp'],['ZARI SIGNATURES','assets/images/mood-zari-signatures.webp'],['BRIDAL ÉLAN','assets/images/mood-bridal-elan.webp']];
document.getElementById('archGrid').innerHTML=moods.map(m=>`<div class="arch"><div class="arch-frame"><img src="${m[1]}" alt="${m[0]} saree look"></div><label>${m[0]}</label></div>`).join('');
// Try look
const looks=[['Ivory Elephant','assets/images/look-ivory-elephant.webp'],['Magenta Muse','assets/images/mood-festive-radiance.webp'],['Pachai Pattu','assets/images/mood-bridal-elan.webp'],['Bengal Garden','assets/images/mood-banarasi-heirlooms.webp'],['Palace Check','assets/images/mood-kanchipuram-icons.webp'],['Bridal Élan','assets/images/mood-wedding-edit.webp'],['Temple Drape','assets/images/mood-zari-signatures.webp'],['Ivory Elephant','assets/images/look-ivory-elephant.webp']];
const ls=document.getElementById('lookScroll');ls.innerHTML=looks.map((l,i)=>`<div class="look-card ${i==6?'center':''}" data-i="${i}" onclick="selectLook(${i})"><img src="${l[1]}" alt="Model in ${l[0]} look"></div>`).join('');
let curLook=6;function selectLook(i){curLook=i;document.querySelectorAll('.look-card').forEach((c,j)=>c.classList.toggle('center',j==i));document.getElementById('lookCounter').textContent=(i+1)+' of 8 · '+looks[i][0]}
function scrollLook(d){let n=Math.min(7,Math.max(0,curLook+d));selectLook(n);ls.scrollTo({left:n*258-200,behavior:'smooth'})}
let drag=false,sx,sl;ls.addEventListener('pointerdown',e=>{drag=true;sx=e.clientX;sl=ls.scrollLeft;ls.setPointerCapture(e.pointerId)});ls.addEventListener('pointermove',e=>{if(drag)ls.scrollLeft=sl-(e.clientX-sx)});ls.addEventListener('pointerup',()=>drag=false);
ls.addEventListener('scroll',()=>{let idx=Math.round(ls.scrollLeft/258);if(idx>=0&&idx<8&&idx!=curLook)selectLook(idx)},{passive:true});
const items=[[1,'SAREE','Ivory Kanjivaram with Elephant Border','₹32,000','assets/images/look-ivory-elephant.webp'],[2,'BLOUSE','Dusty Rose Silk Blouse','₹4,200','assets/images/mood-festive-radiance.webp'],[3,'CHOKER','Pink Stone Temple Choker','₹9,400','assets/images/mood-wedding-edit.webp'],[4,'JHUMKAS','Jhumkas with Pearl Drops','₹4,600','assets/images/mood-banarasi-heirlooms.webp'],[5,'OTTIYANAM','Elephant Motif Ottiyanam','₹15,000','assets/images/mood-kanchipuram-icons.webp'],[6,'BANGLES','Gold and Dusty Rose Bangle Stack','₹3,800','assets/images/mood-bridal-elan.webp']];
document.getElementById('lookItems').innerHTML=items.map(it=>`<div class="item"><span style="font-size:11px;color:#aaa;font-weight:700">${it[0]}</span><img src="${it[4]}" alt="${it[2]}"><div><small>NOOLAM · ${it[1]}</small><b>${it[2]}</b></div><span class="price">${it[3]}</span><button class="mini" onclick="toggleWish('${it[2]}',this)">♡</button><button class="mini" style="background:#111;color:#fff" onclick="addToBag('${it[2]}','${it[3]}')">+</button></div>`).join('');
// Pick silk
const silks=[['#e65100','ORANGE WEAVE','assets/images/mood-zari-signatures.webp','₹22,400'],['#8e24aa','MAGENTA SHOT SILK','assets/images/silk-magenta-shot.webp','₹29,800'],['#7a1420','PALACE CHECK','assets/images/silk-palace-check.webp','₹19,900'],['#ef6c00','BENGAL GARDEN','assets/images/mood-banarasi-heirlooms.webp','₹24,600'],['#c21807','KANCHI RANI','assets/images/mood-wedding-edit.webp','₹32,400'],['#f9a825','BENARES GOLD','assets/images/silk-benares-gold.webp','₹41,800'],['#2e7d32','KORVAI CHECKS','assets/images/silk-korvai-checks.webp','₹18,600']];
document.getElementById('fan').innerHTML=silks.map(s=>`<div class="silk-card" style="background:${s[0]}"><div class="big">${s[1]}</div><button class="mini heart" onclick="event.stopPropagation();toggleWish('${s[1]}',this)">♡</button><img src="${s[2]}" alt="Model in ${s[1]} saree"><span class="price">${s[3]}</span><button class="plus" onclick="event.stopPropagation();addToBag('${s[1]}','${s[3]}')">+</button></div>`).join('');
document.querySelectorAll('.silk-card').forEach(card=>{card.addEventListener('mousemove',e=>{const r=card.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform=`rotateY(${x*18}deg) rotateX(${-y*14}deg) translateY(-8px) scale(1.03)`;card.style.zIndex=10});card.addEventListener('mouseleave',()=>{card.style.transform='';card.style.zIndex=''})});
// Rack
const rackData=[
{name:'TEMPLE GOLD BROCADE',price:'₹32,000.00',v:32000,cat:'saree zari',cls:'f-gold',img:'assets/images/silk-benares-gold.webp'},
{name:'SAFFRON RAW SILK BLOUSE',price:'₹3,600.00',v:3600,cat:'full-blouse',cls:'f-saffron',img:'assets/images/silk-korvai-checks.webp'},
{name:'INDIGO ZARI SAREE',price:'₹21,400.00',v:21400,cat:'saree zari',cls:'f-blue',img:'assets/images/mood-zari-signatures.webp'},
{name:'MAGENTA KORVAI',price:'₹24,800.00',v:24800,cat:'saree checked',cls:'f-magenta',img:'assets/images/silk-magenta-shot.webp'},
{name:'EMERALD CHECKS',price:'₹18,600.00',v:18600,cat:'checked saree',cls:'f-green',img:'assets/images/silk-palace-check.webp'},
{name:'PALACE CHECK SAREE',price:'₹19,900.00',v:19900,cat:'checked saree',cls:'f-check',img:'assets/images/mood-kanchipuram-icons.webp'},
{name:'PURPLE BROCADE BLOUSE',price:'₹4,900.00',v:4900,cat:'half-blouse zari',cls:'f-purple',img:'assets/images/mood-festive-radiance.webp'},
{name:'MUSTARD HALF SAREE',price:'₹16,200.00',v:16200,cat:'half',cls:'f-saffron',img:'assets/images/silk-korvai-checks.webp'},
{name:'ROSE HALF-SLEEVE BLOUSE',price:'₹3,200.00',v:3200,cat:'half-blouse',cls:'f-magenta',img:'assets/images/look-ivory-elephant.webp'},
];
// Rack state + rendering: category chip, text search and sort compose.
const rackState={f:'all',q:'',sort:'feat'};
function applyRack(){
  let list=rackData.filter(r=>(rackState.f=='all'||r.cat.includes(rackState.f))&&r.name.toLowerCase().includes(rackState.q.toLowerCase()));
  if(rackState.sort=='lo')list=[...list].sort((a,b)=>a.v-b.v);
  if(rackState.sort=='hi')list=[...list].sort((a,b)=>b.v-a.v);
  if(rackState.sort=='az')list=[...list].sort((a,b)=>a.name.localeCompare(b.name));
  document.getElementById('rackRail').innerHTML=list.length?list.map(r=>{const i=rackData.indexOf(r);return `<div class="hanger-item" onclick="openDetail(${i})" onmouseenter="document.getElementById('rackCap').textContent='NOOLAM ${r.name} · ${r.price}'"><div class="hanger"></div><img class="thumb" src="${r.img}" alt="${r.name} — photograph"><div style="font-size:11px;margin-top:8px;font-weight:700">${r.name}<br><span style="color:#888">${r.price}</span></div></div>`}).join(''):'<p style="color:#888;padding:30px 6px">Nothing on the rail matches — try a shorter search.</p>';
  document.getElementById('rackCount').textContent=list.length+(list.length==1?' piece':' pieces')+' on the rail';
}
const chipsData=[['all','All pieces',9],['saree','Silk Sarees',5],['half','Half Sarees',3],['full-blouse','Full-Sleeve Blouses',1],['half-blouse','Half-Sleeve Blouses',2],['checked','Checked Sarees',3],['zari','Zari & Brocade',3]];
document.getElementById('chips').innerHTML=chipsData.map(c=>`<button class="chip ${c[0]=='all'?'active':''}" data-f="${c[0]}" onclick="setChip(this)">${c[1]} <span>${c[2]}</span></button>`).join('');
function setChip(el){document.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));el.classList.add('active');rackState.f=el.dataset.f;applyRack()}
applyRack();
// Detail
let detailIdx=0,selectedSize=null;
function openDetail(i){detailIdx=i;selectedSize=null;document.querySelectorAll('#sizes button').forEach(b=>b.classList.remove('sel'));updateDetail();document.getElementById('detail').classList.add('open');document.getElementById('detail').scrollIntoView({behavior:'smooth',block:'center'})}
function updateDetail(){const r=rackData[detailIdx];document.getElementById('detailName').textContent=r.name;document.getElementById('detailPrice').textContent=r.price;document.getElementById('detailFab').className='fabric bigfab '+r.cls;document.getElementById('detailFab').style.backgroundImage="url('"+r.img+"')";document.getElementById('rackCap').textContent='NOOLAM '+r.name+' · '+r.price;const b=document.getElementById('sizeBtn');b.innerHTML=selectedSize?'ADD TO BAG <span class="arr">→</span>':'SELECT A SIZE <span class="arr">→</span>'}
function closeDetail(){document.getElementById('detail').classList.remove('open')}
function stepDetail(d){detailIdx=(detailIdx+d+rackData.length)%rackData.length;updateDetail()}
function toggleView(el,v){el.parentElement.querySelectorAll('button').forEach(b=>b.classList.remove('on'));el.classList.add('on');document.getElementById('viewLabel').textContent=v+' view';document.getElementById('detailFab').style.filter=v=='BACK'?'hue-rotate(18deg) brightness(.92)':'none'}
document.querySelectorAll('#sizes button').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('#sizes button').forEach(x=>x.classList.remove('sel'));b.classList.add('sel');selectedSize=b.textContent;updateDetail()}));
function detailAction(){if(!selectedSize){toast('Please select a size first');return}addToBag(rackData[detailIdx].name+' · Size '+selectedSize,rackData[detailIdx].price)}
// Film columns
const colImgs=['assets/images/look-ivory-elephant.webp','assets/images/mood-festive-radiance.webp','assets/images/mood-bridal-elan.webp','assets/images/mood-wedding-edit.webp','assets/images/mood-banarasi-heirlooms.webp','assets/images/mood-kanchipuram-icons.webp'];
const colHTML=colImgs.map(s=>`<img src="${s}" alt="Saree lifestyle photo">`).join('');document.getElementById('vleft').innerHTML=colHTML+colHTML;document.getElementById('vright').innerHTML=colHTML+colHTML;
function toggleSound(){const b=document.getElementById('soundBtn');b.textContent=b.textContent.includes('OFF')?'···· SOUND ON':'···· SOUND OFF';toast(b.textContent.trim())}
// Reels
const reels=[
{n:'01',d:'0:16',fab:'TISSUE KANJIVARAM',t:'Ponni Kanjivaram',loc:'Lamp room, Kanchipuram',img:'assets/images/mood-banarasi-heirlooms.webp'},
{n:'02',d:'0:31',fab:'HAND-BLOCK COTTON',t:'Marina Morning',loc:'Mylapore to the sea',img:'assets/images/look-ivory-elephant.webp'},
{n:'03',d:'0:17',fab:'BANARASI KATAN',t:'Kaali Banarasi',loc:'Studio, Varanasi red',img:'assets/images/mood-kanchipuram-icons.webp'},
{n:'04',d:'0:15',fab:'KANJIVARAM SILK',t:'Pachai Pattu',loc:"The bride's chamber",img:'assets/images/mood-bridal-elan.webp'},
{n:'05',d:'0:38',fab:'GEORGETTE SILK',t:'Galli Sindoor',loc:'Old-city lanes',img:'assets/images/mood-wedding-edit.webp'}];
let centerReel=3,paused=false;
function renderReels(){const st=document.getElementById('reelsStage');st.innerHTML=reels.map((r,i)=>{let off=i-centerReel;let tx=off*175,rz=off*22,sc=off==0?1:.78-Math.abs(off)*.06,op=Math.abs(off)>2?.25:1;return `<div class="reel" style="transform:translateX(${tx}px) rotateY(${-off*28}deg) scale(${sc});z-index:${10-Math.abs(off)};opacity:${op}" onclick="reelClick(${i})"><img src="${r.img}" alt="${r.t} reel"><span class="pill">● REEL ${r.n}</span><span class="dur">${r.d}</span>${off==0?'<span class="playbtn">▶</span><span class="progress"></span>':''}<div class="meta"><div class="fab">${r.fab}</div><div style="font-weight:800;font-size:18px;margin:4px 0">${r.t}</div><div style="font-size:12px;opacity:.85">${r.loc}</div></div></div>`}).join('')}
function moveReel(d){centerReel=Math.min(4,Math.max(0,centerReel+d));renderReels()}
function reelClick(i){if(i!=centerReel){centerReel=i;renderReels();return}document.getElementById('fsImg').src=reels[i].img;document.getElementById('fsCap').textContent=reels[i].t+' — '+reels[i].loc+' · with sound';document.getElementById('fs').classList.add('open')}
function togglePause(){paused=!paused;document.getElementById('pauseBtn').textContent=paused?'▶':'❚❚';toast(paused?'Reels paused':'Reels playing')}
renderReels();
// Bridal
const bridalData=[
{name:'Sindoor Muhurtham',note:'Pattu · Sindoor red, temple border',price:'₹31,200',tag:'-10%',img:'assets/images/mood-kanchipuram-icons.webp'},
{name:'Kumkum Zari Pattu',note:'Pattu · Kumkum & gold checks',price:'₹28,900',tag:'',img:'assets/images/mood-festive-radiance.webp'},
{name:'Manjal Kalyanam Pattu',note:'Pattu · Red-gold pallu',price:'₹27,300',tag:'',img:'assets/images/mood-wedding-edit.webp'},
{name:'Temple Dawn Silk',note:'Pattu · Dawn gold tissue',price:'₹35,400',tag:'-12%',img:'assets/images/mood-banarasi-heirlooms.webp'},
{name:'Ponni Bridal Silk',note:'Pattu · River-gold brocade',price:'₹38,500',tag:'',img:'assets/images/mood-zari-signatures.webp'},
{name:'Roja Kalyanam',note:'Pattu · Rose & maroon shot silk',price:'₹26,800',tag:'-10%',img:'assets/images/mood-bridal-elan.webp'}];
let bCenter=2;
function renderBridal(){const st=document.getElementById('bridalStage');st.innerHTML=bridalData.map((b,i)=>{let off=i-bCenter;return `<div class="bcard ${off==0?'center':''}" style="transform:translateX(${off*185}px) rotateY(${-off*24}deg) rotateZ(${off*4}deg) scale(${off==0?1:.82});z-index:${10-Math.abs(off)};opacity:${Math.abs(off)>2?.3:1}" onclick="bCenter=${i};renderBridal()">${b.tag?`<span class="tag">${b.tag}</span>`:''}<img src="${b.img}" alt="${b.name} bridal saree"></div>`}).join('');const c=bridalData[bCenter];document.getElementById('bridalName').textContent=c.name;document.getElementById('bridalNote').textContent=c.note;document.getElementById('bridalPrice').textContent=c.price}
function moveBridal(d){bCenter=(bCenter+d+bridalData.length)%bridalData.length;renderBridal()}
renderBridal();

// FAQ accordion
function toggleFaq(btn){btn.parentElement.classList.toggle('open');btn.querySelector('span').textContent=btn.parentElement.classList.contains('open')?'−':'+'}
// Loom Letters newsletter (front-end only demo: validates and confirms)
function subscribe(e){e.preventDefault();const v=document.getElementById('newsEmail').value.trim();if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)){toast('Please enter a valid email address');return}toast('Welcome to Loom Letters — first letter arrives with the new moon');e.target.reset()}
// Back-to-top visibility
window.addEventListener('scroll',()=>{document.getElementById('toTop').classList.toggle('show',window.scrollY>700)},{passive:true});
// Initial bag render (empty state + zero badge)
renderBag();
