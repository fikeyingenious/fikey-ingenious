const products = [
  {name:"Kad Kahwin",cat:"Kahwin",type:"Cetakan",price:"RM99",icon:"💌"},
  {name:"Banner & Bunting",cat:"Kahwin",type:"Cetakan",price:"RM50",icon:"🎏"},
  {name:"Welcome Board",cat:"Kahwin",type:"Cetakan",price:"RM100",icon:"🪧"},
  {name:"Fotografi",cat:"Kahwin",type:"Digital",price:"Quotation",icon:"📷"},
  {name:"Business Card",cat:"Perniagaan",type:"Cetakan",price:"RM50",icon:"🪪"},
  {name:"Design Logo",cat:"Digital",type:"Digital",price:"RM150",icon:"✳️"},
  {name:"Baju Printing",cat:"Perniagaan",type:"Merchandise",price:"RM180",icon:"👕"},
  {name:"Sticker Produk",cat:"Perniagaan",type:"Cetakan",price:"RM40",icon:"🏷️"},
  {name:"Calendar Custom",cat:"Hadiah",type:"Hadiah",price:"RM60",icon:"🗓️"},
  {name:"Buku Nota",cat:"Hadiah",type:"Hadiah",price:"RM80",icon:"📒"},
  {name:"Pen Berlogo",cat:"Hadiah",type:"Merchandise",price:"RM50",icon:"🖊️"},
  {name:"Kipas Custom",cat:"Hadiah",type:"Merchandise",price:"RM50",icon:"🪭"},
  {name:"Tumbler Custom",cat:"Hadiah",type:"Merchandise",price:"RM120",icon:"🥤"},
  {name:"Mug & Botol",cat:"Hadiah",type:"Merchandise",price:"RM100",icon:"☕"},
  {name:"Sampul Duit Raya",cat:"Perayaan",type:"Cetakan",price:"RM49",icon:"✉️"},
  {name:"Gift Set",cat:"Perayaan",type:"Hadiah",price:"RM129",icon:"🎁"},
  {name:"Portfolio Website",cat:"Digital",type:"Digital",price:"RM600",icon:"💻"},
  {name:"Lanyard & Nametag",cat:"Perniagaan",type:"Merchandise",price:"RM50",icon:"🪪"}
];

const names=['Wedding Invitations','Banner & Bunting','Welcome Board','Photography','Business Cards','Logo Design','Custom Printed Apparel','Product Stickers','Custom Calendars','Notebooks','Branded Pens','Custom Fans','Custom Tumblers','Mugs & Bottles','Raya Money Envelopes','Gift Sets','Portfolio Website','Lanyards & Name Tags'];
products.forEach((p,i)=>{p.name=names[i];delete p.icon;});
const categories={Semua:'All Projects',Kahwin:'Weddings & Events',Perniagaan:'Business',Perayaan:'Festive',Hadiah:'Corporate Gifts',Digital:'Digital & Design'};
const types={Semua:'All services',Cetakan:'Print',Merchandise:'Merchandise',Hadiah:'Gifts',Digital:'Digital'};
let currentCategory='Semua',currentType='Semua';
const icons={print:'<rect x="5" y="3" width="14" height="6"/><path d="M5 17H3V9h18v8h-2M7 14h10v7H7zM17 11h1"/>',rings:'<circle cx="9" cy="14" r="6"/><circle cx="16" cy="14" r="6"/><path d="m7 4 2-2 2 2-2 3zM14 4l2-2 2 2-2 3z"/>',camera:'<path d="M3 7h4l2-3h6l2 3h4v14H3z"/><circle cx="12" cy="13" r="4"/>',video:'<rect x="2" y="5" width="13" height="15"/><path d="m15 10 7-4v13l-7-4zM6 9l5 4-5 3z"/>',studio:'<path d="m6 4 10 2v9L6 17zM6 7 2 5v11l4-2M16 9l5-3v9l-5-3M12 16v7m-5 0 5-5 5 5"/>',design:'<path d="m12 2 8 11-8 9-8-9zM12 2v9"/><circle cx="12" cy="13" r="2"/>',web:'<rect x="2" y="3" width="20" height="14"/><path d="M12 17v5M7 22h10M8 12l7-6"/>'};
function icon(k){return '<svg viewBox="0 0 24 24" aria-hidden="true">'+icons[k]+'</svg>'}
const services=[['print','Printing &<br>Merchandise'],['rings','Weddings<br>& Events'],['camera','Photography'],['video','Videography<br>& Editing'],['studio','Studio<br>Rental'],['design','Creative Design<br>& Branding'],['web','Digital Solutions<br>& Web']];
document.querySelector('.service-strip').innerHTML=services.map(([k,v])=>'<a href="#products">'+icon(k)+'<span>'+v+'</span></a>').join('');
function renderControls(){if(document.querySelector('.categories').children.length){document.querySelectorAll('[data-category]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.category===currentCategory));document.querySelectorAll('[data-type]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.type===currentType));return;}document.querySelector('.categories').innerHTML=Object.entries(categories).map(([k,v])=>`<button data-category="${k}" aria-pressed="${k===currentCategory}">${v}</button>`).join('');document.querySelector('.filters').innerHTML=Object.entries(types).map(([k,v])=>`<button data-type="${k}" aria-pressed="${k===currentType}">${v}</button>`).join('');}
function renderProducts(){const query=document.querySelector('#search').value.toLowerCase();const list=products.filter(p=>(currentCategory==='Semua'||p.cat===currentCategory)&&(currentType==='Semua'||p.type===currentType)&&p.name.toLowerCase().includes(query));document.querySelector('.product-summary').textContent=list.length+' creative possibilities';document.querySelector('#productList').innerHTML=list.map(p=>`<article class="product-card"><div class="product-symbol">${icon(p.type==='Digital'?'web':p.type==='Cetakan'?'print':'design')}<span>${types[p.type]}</span></div><h3>${p.name}</h3><div class="product-bottom"><span>${p.price==='Quotation'?'On enquiry':p.price}</span><button data-product="${p.name}">Select <span>↗</span></button></div></article>`).join('')||'<div class="empty"><h3>No products found.</h3><p>Try a different search, or clear the filters.</p><button id="reset">Clear search & filters</button></div>';}
function selectProduct(name){document.querySelector('#product').value=name;const p=products.find(p=>p.name===name);if(p){document.querySelector('#category').selectedIndex={Kahwin:0,Perniagaan:1,Perayaan:2,Hadiah:3,Digital:4}[p.cat];}document.querySelector('#formResult').hidden=true;document.querySelector('#quotation').scrollIntoView({behavior:'smooth'});setTimeout(()=>document.querySelector('#product').focus({preventScroll:true}),500);}
document.addEventListener('click',e=>{const c=e.target.closest('[data-category]'),t=e.target.closest('[data-type]'),p=e.target.closest('[data-product]'),pack=e.target.closest('[data-package]');if(c){currentCategory=c.dataset.category;renderControls();renderProducts();}if(t){currentType=t.dataset.type;renderControls();renderProducts();}if(p)selectProduct(p.dataset.product);if(pack)selectProduct(pack.dataset.package);if(e.target.id==='reset'){currentCategory=currentType='Semua';document.querySelector('#search').value='';renderControls();renderProducts();}});
document.querySelector('#search').addEventListener('input',renderProducts);
document.querySelector('.menu').addEventListener('click',e=>{const open=e.currentTarget.getAttribute('aria-expanded')!=='true';e.currentTarget.setAttribute('aria-expanded',open);document.querySelector('.header').classList.toggle('nav-open',open);});
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>{document.querySelector('.header').classList.remove('nav-open');document.querySelector('.menu').setAttribute('aria-expanded','false');}));
document.querySelector('#quoteForm').addEventListener('submit',e=>{e.preventDefault();const result=document.querySelector('#formResult');result.hidden=false;result.textContent='Thanks, '+document.querySelector('#customer').value+'. Your demo enquiry for '+document.querySelector('#product').value+' ('+document.querySelector('#category').value+', '+document.querySelector('#budget').value+') is ready to review. This preview has not been sent or saved.';});
renderControls();renderProducts();
