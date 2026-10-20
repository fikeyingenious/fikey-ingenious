(() => {
  'use strict';
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const products = {
    wash: {name:'Wash Studio',image:'wash',format:'Landscape'},
    nazra: {name:'Nazra Furniture',image:'nazra',format:'Portrait'},
    pasti: {name:'PASTI — Melaka',image:'pasti',format:'Portrait'},
    omd: {name:'OMD Worldwide',image:'omd',format:'Landscape'}
  };
  const money = n => new Intl.NumberFormat('ms-MY',{style:'currency',currency:'MYR'}).format(n);
  const cart = new Map();
  const dialog = document.querySelector('#cart-dialog');
  const toast = document.querySelector('.toast');
  let toastTimer;
  const notify = text => {toast.textContent=text;toast.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('visible'),3000);};
  const menu = document.querySelector('.menu');
  const navigation = document.querySelector('#navigation');
  menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Tutup menu':'Buka menu');navigation.classList.toggle('open',open);});
  navigation.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{navigation.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Buka menu');}));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&navigation.classList.contains('open')){navigation.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.focus();}});
  let filter='all';
  const search=document.querySelector('#search');
  const filterProducts=()=>{let count=0;document.querySelectorAll('.product').forEach(card=>{const show=(filter==='all'||card.dataset.category.split(' ').includes(filter))&&card.dataset.name.toLowerCase().includes(search.value.trim().toLowerCase());card.hidden=!show;if(show)count++;});document.querySelector('#no-results').hidden=count>0;};
  document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{filter=button.dataset.filter;document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});filterProducts();}));
  search.addEventListener('input',filterProducts);
  let slide=0;
  const keys=Object.keys(products);
  const featured=document.querySelector('.featured');
  const featuredLink=document.querySelector('#featured-original');
  featuredLink.classList.add('featured-visual');
  const featuredImage=document.querySelector('#featured-image');
  let slideRequest=0,slideAnimations=[],outgoing=null,autoTimer=null,autoPaused=false,featuredVisible=false,focused=false;
  function clearSlideMotion(){slideAnimations.forEach(a=>a.cancel());slideAnimations=[];outgoing?.remove();outgoing=null;}
  function armAutoplay(){clearTimeout(autoTimer);autoTimer=null;if(reduced.matches||autoPaused||!featuredVisible||document.hidden||focused)return;autoTimer=setTimeout(()=>{if(!dialog.open)showSlide(1,false);armAutoplay();},5000);}
  const showSlide=async(direction,manual=true)=>{
    const request=++slideRequest;slide=(slide+direction+keys.length)%keys.length;const selected=slide,product=products[keys[selected]];
    const preload=new Image();preload.src=`./assets/${product.image}.webp`;
    try{await preload.decode();}catch{if(request===slideRequest)notify('Imej belum tersedia. Cuba sekali lagi.');return;}
    if(request!==slideRequest)return;
    clearSlideMotion();
    if(!reduced.matches&&featuredImage.animate){outgoing=featuredImage.cloneNode();outgoing.removeAttribute('id');outgoing.alt='';outgoing.setAttribute('aria-hidden','true');outgoing.className='featured-outgoing';featuredLink.append(outgoing);const previous=outgoing;const exit=previous.animate([{opacity:1,transform:'translateX(0) rotate(0deg)'},{opacity:0,transform:`translateX(${-direction*55}px) rotate(${-direction*3}deg)`}],{duration:380,easing:'cubic-bezier(.4,0,1,1)'});exit.onfinish=()=>{previous.remove();if(outgoing===previous)outgoing=null;};slideAnimations.push(exit);}
    featuredImage.src=preload.src;featuredImage.alt=`Sampul Raya ${product.name}, hadapan dan belakang`;
    featuredLink.href=`./assets/${product.image}-original.jpeg`;featuredLink.setAttribute('aria-label',`Lihat foto asal ${product.name} (tab baharu)`);
    const label=document.querySelector('#slide-label');label.setAttribute('aria-live',manual?'polite':'off');label.textContent=`${product.name} · ${selected+1} / 4`;
    if(!reduced.matches&&featuredImage.animate)slideAnimations.push(featuredImage.animate([{opacity:0,transform:`translateX(${direction*75}px) rotate(${direction*3}deg) scale(.94)`,clipPath:'inset(0 0 12% 0)'},{opacity:1,transform:'translateX(0) rotate(0deg) scale(1)',clipPath:'inset(0 0 0 0)'}],{duration:700,easing:'cubic-bezier(.16,1,.3,1)'}));
    if(manual)armAutoplay();
  };
  featured.addEventListener('click',()=>{autoPaused=true;armAutoplay();});
  featured.addEventListener('focusin',()=>{focused=true;armAutoplay();});
  featured.addEventListener('focusout',e=>{focused=featured.contains(e.relatedTarget);armAutoplay();});
  if('IntersectionObserver' in window)new IntersectionObserver(entries=>{featuredVisible=entries[0].isIntersecting;armAutoplay();},{threshold:.3}).observe(featuredImage);
  document.querySelector('#previous').addEventListener('click',()=>showSlide(-1));
  document.querySelector('#next').addEventListener('click',()=>showSlide(1));
  function renderCart(){
    const holder=document.querySelector('#cart-items');holder.replaceChildren();
    let count=0,total=0;
    for(const [id,quantity] of cart){
      const product=products[id];count+=quantity;total+=quantity*1.2;
      const item=document.createElement('div');item.className='cart-item';
      const image=document.createElement('img');image.src=`./assets/${id}.webp`;image.alt=product.name;
      const content=document.createElement('div');const title=document.createElement('h3');title.textContent=product.name;
      const label=document.createElement('label');label.textContent='Kuantiti';const input=document.createElement('input');input.type='number';input.min='50';input.step='1';input.value=quantity;input.setAttribute('aria-label',`Kuantiti ${product.name}`);
      input.max='100000';
      input.addEventListener('input',()=>{const value=Number(input.value);if(!Number.isInteger(value)||value<50||value>100000)return;cart.set(id,value);const count=Array.from(cart.values()).reduce((sum,n)=>sum+n,0);document.querySelector('#cart-count').textContent=count;document.querySelector('#cart-open').setAttribute('aria-label',`Buka troli, ${count} keping`);document.querySelector('#cart-total').textContent=money(count*1.2);});
      input.addEventListener('change',()=>{const value=Number(input.value);if(!Number.isInteger(value)||value<50||value>100000){input.value=cart.get(id)||quantity;notify('Masukkan kuantiti antara 50 dan 100,000 keping.');}});label.append(input);
      const remove=document.createElement('button');remove.className='remove';remove.textContent='Buang';remove.setAttribute('aria-label',`Buang ${product.name}`);remove.addEventListener('click',()=>{cart.delete(id);renderCart();document.querySelector('#cart-close').focus();});
      content.append(title,label,remove);item.append(image,content);holder.append(item);
    }
    if(!cart.size){const empty=document.createElement('p');empty.textContent='Troli masih kosong. Pilih rekaan yang anda suka.';holder.append(empty);}
    document.querySelector('#cart-summary').hidden=!cart.size;document.querySelector('#cart-count').textContent=count;document.querySelector('#cart-open').setAttribute('aria-label',`Buka troli, ${count} keping`);document.querySelector('#cart-total').textContent=money(total);
  }
  document.querySelectorAll('.add').forEach(button=>button.addEventListener('click',()=>{const id=button.dataset.product;cart.set(id,(cart.get(id)||0)+50);renderCart();notify(`${products[id].name}: 50 keping ditambah.`);}));
  document.querySelector('#cart-open').addEventListener('click',()=>{renderCart();dialog.showModal();});
  document.querySelector('#cart-close').addEventListener('click',()=>dialog.close());
  document.querySelector('#continue-shopping').addEventListener('click',()=>dialog.close());
  async function copy(text,button){try{await navigator.clipboard.writeText(text);button.textContent='Ringkasan Disalin';setTimeout(()=>button.textContent=button.id==='copy-cart'?'Salin Ringkasan Pilihan':'Salin Ringkasan',2500);}catch{notify('Salinan automatik tidak tersedia. Pilih dan salin teks ringkasan.');let field=document.querySelector('#copy-fallback');if(!field){field=document.createElement('textarea');field.id='copy-fallback';field.readOnly=true;field.setAttribute('aria-label','Ringkasan pilihan untuk disalin');button.after(field);}field.value=text;field.focus();field.select();}}
  document.querySelector('#copy-cart').addEventListener('click',e=>{const lines=['Pilihan sampul Raya — Trinaf Creative',...Array.from(cart,([id,q])=>`${products[id].name}: ${q} keping × RM1.20 = ${money(q*1.2)}`),`Anggaran jumlah: ${money(Array.from(cart.values()).reduce((a,q)=>a+q*1.2,0))}`,'Ringkasan sahaja. Belum dihantar / disahkan.'];copy(lines.join('\n'),e.currentTarget);});
  const brief=document.querySelector('#brief-form');document.querySelector('#custom-start').addEventListener('click',()=>{brief.hidden=false;brief.querySelector('input').focus({preventScroll:true});brief.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'center'});});
  brief.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(brief);document.querySelector('#brief-output').value=`Tempahan khas — Trinaf Creative\nNama / syarikat: ${data.get('name')}\nKuantiti: ${data.get('quantity')} keping\nIdea: ${data.get('idea')}\nRekaan, harga dan kemasan tertakluk kepada pengesahan.\nRingkasan sahaja. Belum dihantar.`;document.querySelector('#brief-result').hidden=false;document.querySelector('#brief-output').focus();});
  document.querySelector('#copy-brief').addEventListener('click',e=>copy(document.querySelector('#brief-output').value,e.currentTarget));
  document.querySelector('#year').textContent=new Date().getFullYear();
  const wide=matchMedia('(min-width: 761px)');
  const layers=[
    {element:document.querySelector('.hero>.scenery'),hero:true,desktopOnly:true},
    {element:document.querySelector('.mobile-signature-art'),mobileOnly:true,desktop:0,mobile:14},
    {element:featuredLink,desktop:56,mobile:20},
    {element:document.querySelector('.signature-art'),desktop:24,mobile:12},
    {element:document.querySelector('.closing-products'),desktop:32,mobile:16}
  ];let pending=false;
  const updateMotion=()=>{pending=false;for(const layer of layers){const element=layer.element,section=element.closest('section'),r=section.getBoundingClientRect();const active=!reduced.matches&&!document.hidden&&r.bottom>0&&r.top<innerHeight&&!(layer.desktopOnly&&!wide.matches)&&!(layer.mobileOnly&&wide.matches);if(!active){element.style.transform='none';element.style.willChange='auto';continue;}const progress=Math.max(-1,Math.min(1,(innerHeight/2-r.top-r.height/2)/((innerHeight+r.height)/2)));const y=layer.hero?Math.max(0,Math.min(110,-r.top*.19)):progress*(wide.matches?layer.desktop:layer.mobile);element.style.transform=`translate3d(0,${y.toFixed(2)}px,0)`;element.style.willChange='transform';}};
  const schedule=()=>{if(!pending){pending=true;requestAnimationFrame(updateMotion);}};
  addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule,{passive:true});document.addEventListener('visibilitychange',()=>{schedule();armAutoplay();if(document.hidden)clearSlideMotion();});reduced.addEventListener('change',()=>{clearSlideMotion();armAutoplay();schedule();});schedule();renderCart();
})();
