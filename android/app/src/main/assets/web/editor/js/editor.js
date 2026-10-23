const app={
state:{zoom:1,activePage:'login',multiSelect:[],history:[],historyIdx:-1,
pages:{
login:{bg:{type:'color',value:'#0f172a'},elements:[]},
inquiry:{bg:{type:'color',value:'#0f172a'},elements:[]},
card:{bg:{type:'color',value:'#0f172a'},elements:[],shape:'rect'}}},
cur(){return this.state.pages[this.state.activePage];},
save(){localStorage.setItem('hs_ed_v4',JSON.stringify(this.state));},
load(){const s=localStorage.getItem('hs_ed_v4');if(s){try{const p=JSON.parse(s);p.zoom=1;this.state=p;}catch(e){}}},

init(){this.load();this.renderBg();this.renderEl();this.renderIco();this.renderFeat();
this.setupTabs();this.setupPages();this.setupMobile();this.setupCanvas();this.render();this.setZoom(1);},

snapshot(){this.state.history=this.state.history.slice(0,this.state.historyIdx+1);
this.state.history.push(JSON.stringify(this.cur()));
this.state.historyIdx=this.state.history.length-1;this.updBtns();},
updBtns(){document.getElementById('btnUndo').disabled=this.state.historyIdx<=0;
document.getElementById('btnRedo').disabled=this.state.historyIdx>=this.state.history.length-1;},
undo(){if(this.state.historyIdx<=0)return;this.state.historyIdx--;
this.state.pages[this.state.activePage]=JSON.parse(this.state.history[this.state.historyIdx]);
this.state.multiSelect=[];this.render();this.updBtns();},
redo(){if(this.state.historyIdx>=this.state.history.length-1)return;this.state.historyIdx++;
this.state.pages[this.state.activePage]=JSON.parse(this.state.history[this.state.historyIdx]);
this.state.multiSelect=[];this.render();this.updBtns();},

setZoom(z){this.state.zoom=Math.max(.4,Math.min(2,z));
const cv=document.getElementById('canvas'),cw=document.getElementById('cw');
const w=cv.offsetWidth||375,h=cv.offsetHeight||667;
cv.style.transform=`scale(${this.state.zoom})`;
cw.style.width=(w*this.state.zoom)+'px';cw.style.height=(h*this.state.zoom)+'px';
document.getElementById('zoomLbl').textContent=Math.round(this.state.zoom*100)+'%';},

setupTabs(){document.querySelectorAll('.stab').forEach(t=>{t.onclick=()=>{
document.querySelectorAll('.stab').forEach(x=>x.classList.remove('on'));t.classList.add('on');
document.querySelectorAll('.tb').forEach(x=>x.classList.remove('on'));
const c=document.querySelector(`[data-tb="${t.dataset.tab}"]`);if(c)c.classList.add('on');};});},
setupPages(){document.querySelectorAll('.ptab').forEach(t=>{t.onclick=()=>{
document.querySelectorAll('.ptab').forEach(x=>x.classList.remove('on'));t.classList.add('on');
this.state.activePage=t.dataset.page;this.state.multiSelect=[];this.render();};});},
setupMobile(){document.querySelectorAll('.mn button').forEach(b=>{b.onclick=()=>{
const m=b.dataset.m;document.querySelectorAll('.mn button').forEach(x=>x.classList.remove('on'));
b.classList.add('on');
if(m==='props'){document.getElementById('rightPanel').classList.toggle('on');
document.getElementById('leftPanel').classList.remove('on');}
else{document.getElementById('leftPanel').classList.add('on');
document.getElementById('rightPanel').classList.remove('on');
document.querySelectorAll('.stab').forEach(x=>{if(x.dataset.tab===m)x.click();});}};});},

renderBg(){const p=document.getElementById('bgPanel');let h='';
h+='<div class="sec"><h4>خلفيات متحركة</h4><div class="gg">';
ANIM_BG.forEach((a,i)=>{h+=`<div class="gs anim ${a.cls}" onclick="app.setBgAnim(${i})" title="${a.name}"></div>`;});
h+='</div></div>';
h+='<div class="sec"><h4>ألوان صلبة</h4><div class="cg">';
SOLID.forEach(c=>h+=`<div class="cs" style="background:${c}" onclick="app.setBgColor('${c}')"></div>`);
h+='</div></div><div class="sec"><h4>تدرجات</h4><div class="gg">';
GRADS.forEach((g,i)=>h+=`<div class="gs" style="background:${g}" onclick="app.setBgGrad(${i})"></div>`);
h+='</div></div><div class="sec"><h4>صورة من الجهاز</h4><input type="file" accept="image/*" id="bgFile" style="width:100%;padding:8px;background:#1e293b;border:1px solid #334155;border-radius:5px;color:#fff;font-size:10px"></div>';
p.innerHTML=h;
document.getElementById('bgFile').onchange=e=>{const f=e.target.files[0];if(!f)return;
const r=new FileReader();r.onload=()=>{this.cur().bg={type:'image',value:r.result};this.save();this.render();};r.readAsDataURL(f);};},
setBgColor(c){this.cur().bg={type:'color',value:c};this.save();this.snapshot();this.render();},
setBgGrad(i){this.cur().bg={type:'gradient',value:GRADS[i]};this.save();this.snapshot();this.render();},
setBgAnim(i){this.cur().bg={type:'anim',value:ANIM_BG[i].cls,name:ANIM_BG[i].name};this.save();this.snapshot();this.render();},

renderEl(){const p=document.getElementById('elPanel');let h='<div class="sec"><h4>عناصر أساسية</h4><div class="el-grid">';
ELEMENTS.forEach((e,i)=>h+=`<div class="el-it" onclick="app.addEl(${i})">${e.label}</div>`);
h+='</div></div><div class="sec"><h4>خطوط عربية</h4>';
FONTS.forEach(f=>h+=`<div class="font-item" style="font-family:'${f.family}'" onclick="app.setFontForSel('${f.family}')">أبجد ${f.name}<div class="nm">${f.family}</div></div>`);
h+='</div>';p.innerHTML=h;},
addEl(i){const el=ELEMENTS[i].make();el.id=uid();el.tf=el.tf||{rx:0,ry:0,rz:0,sx:1,sy:1,p:600};
this.cur().elements.push(el);this.state.multiSelect=[el.id];this.save();this.snapshot();this.render();},
setFontForSel(f){if(!this.state.multiSelect.length)return alert('اختر عنصراً أولاً');
this.state.multiSelect.forEach(id=>{const el=this.cur().elements.find(e=>e.id===id);if(el)el.font=f;});
this.save();this.render();},

renderIco(){const p=document.getElementById('icoPanel');let h='';
h+='<div class="sec"><h4>الشعارات</h4><div class="icon-grid">';
Object.keys(SVG_ICONS).forEach(k=>h+=`<div class="ic" onclick="app.addSVG('${k}')" title="${k}">${SVG_ICONS[k]}</div>`);
h+='</div></div>';
Object.keys(EMOJI_GROUPS).forEach(cat=>{
h+=`<div class="sec"><h4>${cat}</h4><div class="icon-grid">`;
EMOJI_GROUPS[cat].forEach(em=>h+=`<div class="ic" onclick="app.addEmoji('${em}')">${em}</div>`);
h+='</div></div>';});
h+='<div class="sec"><h4>رموز إضافية</h4><div class="icon-grid">';
genAllUnicode().slice(0,300).forEach(sym=>h+=`<div class="ic" onclick="app.addEmoji('${sym}')">${sym}</div>`);
h+='</div></div>';p.innerHTML=h;},
addSVG(k){const el={id:uid(),type:'svg',svgKey:k,x:20,y:200,w:60,h:60,color:'#22d3ee',bg:'transparent',borderRadius:8,font:'Cairo',tf:{rx:0,ry:0,rz:0,sx:1,sy:1,p:600},glass:false};
this.cur().elements.push(el);this.state.multiSelect=[el.id];this.save();this.snapshot();this.render();},
addEmoji(em){const el={id:uid(),type:'text',text:em,x:20,y:200,w:60,h:60,fontSize:36,color:'#ffffff',bg:'transparent',borderRadius:8,font:'Cairo',align:'center',tf:{rx:0,ry:0,rz:0,sx:1,sy:1,p:600},glass:false};
this.cur().elements.push(el);this.state.multiSelect=[el.id];this.save();this.snapshot();this.render();},

renderFeat(){const p=document.getElementById('featPanel');let h='';
FEATURES.forEach(cat=>{h+=`<div class="feat-cat"><h5>${cat.cat}</h5>`;
cat.items.forEach((it,i)=>h+=`<div class="feat-item" onclick="app.addFeat('${cat.cat}',${i})">${it.label}</div>`);
h+='</div>';});p.innerHTML=h;},
addFeat(cat,i){const c=FEATURES.find(x=>x.cat===cat);if(!c)return;
const made=c.items[i].mk();made.forEach(el=>{el.id=uid();el.tf=el.tf||{rx:0,ry:0,rz:0,sx:1,sy:1,p:600};this.cur().elements.push(el);});
if(made.length)this.state.multiSelect=[made[0].id];this.save();this.snapshot();this.render();},

render(){const cv=document.getElementById('canvas');const cur=this.cur();
cv.className='cv'+(this.state.activePage==='card'?' card-mode':'');
cv.style.background='';cv.style.clipPath='';cv.style.borderRadius='';
cv.classList.remove('bg-space','bg-underwater','bg-aurora','bg-twinkle','bg-planets');
const bg=cur.bg;
if(bg.type==='color'||bg.type==='gradient')cv.style.background=bg.value;
else if(bg.type==='image')cv.style.background=`url(${bg.value}) center/cover`;
else if(bg.type==='anim')cv.classList.add(bg.value);
if(this.state.activePage==='card'&&cur.shape)this.applyShape(cv,cur.shape);
cv.innerHTML='';cur.elements.forEach(el=>cv.appendChild(this.makeEl(el)));
this.renderProps();this.save();},

applyShape(n,s){n.style.clipPath='';n.style.borderRadius='8px';
if(s==='round')n.style.borderRadius='20px';
else if(s==='circle')n.style.borderRadius='50%';
else if(s==='ticket')n.style.clipPath='polygon(0 15%,5% 15%,5% 50%,0 50%,0 85%,5% 85%,5% 100%,95% 100%,95% 85%,100% 85%,100% 50%,95% 50%,95% 15%,100% 15%,100% 0,0 0)';
else if(s==='hex')n.style.clipPath='polygon(25% 0,75% 0,100% 50%,75% 100%,25% 100%,0 50%)';
else if(s==='diamond')n.style.clipPath='polygon(50% 0,100% 50%,50% 100%,0 50%)';},

makeEl(el){const d=document.createElement('div');
d.className='ce'+(this.state.multiSelect.includes(el.id)?' sel':'');
d.dataset.id=el.id;
d.style.left=el.x+'px';d.style.top=el.y+'px';d.style.width=el.w+'px';d.style.height=el.h+'px';
d.style.borderRadius=(el.borderRadius||0)+'px';d.style.border=el.border||'none';
d.style.background=el.bg||'transparent';d.style.color=el.color||'#fff';
d.style.fontSize=(el.fontSize||14)+'px';d.style.fontWeight=el.fontWeight||'normal';
d.style.padding=(el.padding||0)+'px';d.style.textAlign=el.align||'center';
d.style.fontFamily="'"+((el.font)||'Cairo')+"',sans-serif";
d.style.display='flex';d.style.alignItems='center';d.style.justifyContent='center';
d.style.flexDirection='column';d.style.overflow='hidden';d.style.boxSizing='border-box';
if(el.glass){d.style.backdropFilter='blur(20px)';d.style.webkitBackdropFilter='blur(20px)';}
if(el.tf)d.style.transform=`perspective(${el.tf.p||600}px) rotateX(${el.tf.rx||0}deg) rotateY(${el.tf.ry||0}deg) rotateZ(${el.tf.rz||0}deg) scale(${el.tf.sx||1},${el.tf.sy||1})`;

if(el.type==='input'){d.style.padding='0';const inp=document.createElement('input');
inp.type=el.password?'password':'text';inp.placeholder=el.placeholder||'';
inp.style.cssText=`width:100%;height:100%;background:transparent;border:none;color:${el.color};font-size:${el.fontSize}px;font-family:inherit;text-align:right;outline:none;padding:0 10px;box-sizing:border-box`;
d.appendChild(inp);}
else if(el.type==='button'){d.textContent=el.text||'زر';d.style.cursor='pointer';}
else if(el.type==='image'){if(el.src){const img=document.createElement('img');img.src=el.src;
img.style.cssText='width:100%;height:100%;object-fit:cover';d.appendChild(img);}
else d.innerHTML='<span style="color:#94a3b8;font-size:11px">اضغط لصورة</span>';}
else if(el.type==='qr'){d.innerHTML='<div style="width:100%;height:100%;background:#fff;color:#000;display:flex;align-items:center;justify-content:center;font-size:10px;border-radius:6px">QR</div>';}
else if(el.type==='clock'){const t=document.createElement('span');t.className='clk';
t.textContent=new Date().toLocaleTimeString('ar-EG');d.appendChild(t);}
else if(el.type==='svg'){d.innerHTML=SVG_ICONS[el.svgKey]||'';
d.querySelectorAll('svg').forEach(s=>{s.style.width='100%';s.style.height='100%';s.style.fill=el.color;});}
else{d.textContent=el.text||'';}

['nw','n','ne','e','se','s','sw','w'].forEach(pos=>{
const h=document.createElement('div');h.className='rh '+pos;h.dataset.pos=pos;d.appendChild(h);});
return d;},

setupCanvas(){const cv=document.getElementById('canvas');
cv.addEventListener('pointerdown',e=>{
const handle=e.target.classList.contains('rh')?e.target:null;
const node=e.target.closest('.ce');
if(!node){this.state.multiSelect=[];this.render();return;}
const el=this.cur().elements.find(x=>x.id===node.dataset.id);
if(!el)return;
if(!this.state.multiSelect.includes(el.id)){
if(e.shiftKey||e.ctrlKey||e.metaKey)this.state.multiSelect.push(el.id);
else this.state.multiSelect=[el.id];
this.render();return;}
if(handle)this.startResize(el,handle.dataset.pos,e);
else this.startDrag(el,node,e);
e.preventDefault();});
document.addEventListener('pointermove',e=>{
if(this._drag)this._drag.move(e);
else if(this._resize)this._resize.move(e);});
document.addEventListener('pointerup',()=>{
if(this._drag){this._drag.end();this._drag=null;}
if(this._resize){this._resize.end();this._resize=null;}});},

startDrag(el,node,e){const sx=e.clientX,sy=e.clientY,x0=el.x,y0=el.y;let moved=false;
this._drag={move:ev=>{const dx=ev.clientX-sx,dy=ev.clientY-sy;
if(Math.abs(dx)>2||Math.abs(dy)>2)moved=true;
el.x=Math.max(0,x0+dx);el.y=Math.max(0,y0+dy);
node.style.left=el.x+'px';node.style.top=el.y+'px';},
end:()=>{if(moved){this.save();this.snapshot();}this.renderProps();}};},

startResize(el,pos,e){const sx=e.clientX,sy=e.clientY,x0=el.x,y0=el.y,w0=el.w,h0=el.h;
this._resize={move:ev=>{const dx=ev.clientX-sx,dy=ev.clientY-sy;
if(pos.includes('e'))el.w=Math.max(20,w0+dx);
if(pos.includes('s'))el.h=Math.max(20,h0+dy);
if(pos.includes('w')){el.w=Math.max(20,w0-dx);el.x=x0+dx;}
if(pos.includes('n')){el.h=Math.max(20,h0-dy);el.y=y0+dy;}
const n=document.querySelector(`[data-id="${el.id}"]`);
if(n){n.style.width=el.w+'px';n.style.height=el.h+'px';
n.style.left=el.x+'px';n.style.top=el.y+'px';}},
end:()=>{this.save();this.snapshot();this.render();}};},

renderProps(){const p=document.getElementById('props');
if(!this.state.multiSelect.length){
let h='<div class="empty">اختر عنصراً للتعديل';
if(this.state.activePage==='card'){h+='<br><br><b>أشكال الكرت:</b><br>';
['rect','round','circle','ticket','hex','diamond'].forEach(s=>
h+=`<button class="sw-btn" onclick="app.setCardShape('${s}')">${s}</button>`);}
h+='</div>';p.innerHTML=h;return;}
const el=this.cur().elements.find(e=>e.id===this.state.multiSelect[0]);
if(!el){p.innerHTML='<div class="empty">اختر عنصراً</div>';return;}
let h='';
if(this.state.multiSelect.length>1)h+=`<div class="pr"><label>محدد: ${this.state.multiSelect.length}</label></div>`;
h+=`<div class="pr"><div class="row"><div><label>X</label><input type="number" value="${el.x}" oninput="app.up('x',+this.value)"></div><div><label>Y</label><input type="number" value="${el.y}" oninput="app.up('y',+this.value)"></div></div></div>`;
h+=`<div class="pr"><div class="row"><div><label>W</label><input type="number" value="${el.w}" oninput="app.up('w',+this.value)"></div><div><label>H</label><input type="number" value="${el.h}" oninput="app.up('h',+this.value)"></div></div></div>`;
if(['text','button','shape'].includes(el.type))h+=`<div class="pr"><label>النص</label><textarea oninput="app.up('text',this.value)" style="min-height:40px">${el.text||''}</textarea></div>`;
if(el.type==='input'){h+=`<div class="pr"><label>Placeholder</label><input value="${el.placeholder||''}" oninput="app.up('placeholder',this.value)"></div>`;
h+=`<div class="pr"><label>نوع</label><select onchange="app.up('password',this.value==='1')"><option value="0"${!el.password?' selected':''}>نص</option><option value="1"${el.password?' selected':''}>كلمة مرور</option></select></div>`;}
if(el.type==='image')h+=`<div class="pr"><label>صورة</label><input type="file" accept="image/*" onchange="app.setImg(event)"></div>`;
h+=`<div class="pr"><div class="row"><div><label>لون النص</label><input type="color" value="${el.color||'#ffffff'}" oninput="app.up('color',this.value)"></div><div><label>الخلفية</label><input type="color" value="${el.bg && el.bg.startsWith('#')?el.bg:'#000000'}" oninput="app.up('bg',this.value)"></div></div></div>`;
h+=`<div class="pr"><label>حجم الخط: ${el.fontSize}</label><input type="range" min="8" max="60" value="${el.fontSize||14}" oninput="app.up('fontSize',+this.value)"></div>`;
h+=`<div class="pr"><label>استدارة: ${el.borderRadius}px</label><input type="range" min="0" max="100" value="${el.borderRadius||0}" oninput="app.up('borderRadius',+this.value)"></div>`;
h+=`<div class="pr"><label>الحدود</label><input value="${el.border||'none'}" oninput="app.up('border',this.value)" placeholder="1px solid #22d3ee"></div>`;
h+=`<div class="pr"><label>السماكة</label><select onchange="app.up('fontWeight',this.value)"><option value="normal"${el.fontWeight==='normal'?' selected':''}>عادي</option><option value="bold"${el.fontWeight==='bold'?' selected':''}>عريض</option></select></div>`;
let fo='';FONTS.forEach(f=>fo+=`<option value="${f.family}"${(el.font||'Cairo')===f.family?' selected':''}>${f.name}</option>`);
h+=`<div class="pr"><label>الخط</label><select onchange="app.up('font',this.value)">${fo}</select></div>`;
h+=`<div class="pr"><label>المحاذاة</label><select onchange="app.up('align',this.value)"><option value="right"${el.align==='right'?' selected':''}>يمين</option><option value="center"${el.align==='center'?' selected':''}>وسط</option><option value="left"${el.align==='left'?' selected':''}>يسار</option></select></div>`;
h+=`<div class="pr"><label>تأثير زجاجي</label><select onchange="app.up('glass',this.value==='1')"><option value="0"${!el.glass?' selected':''}>عادي</option><option value="1"${el.glass?' selected':''}>زجاجي</option></select></div>`;
const tf=el.tf||{rx:0,ry:0,rz:0,sx:1,sy:1,p:600};
h+=`<div class="pr"><label style="color:#22d3ee;font-weight:900">🌀 تحويلات 3D</label></div>`;
h+=`<div class="pr"><label>دوران X: ${tf.rx}°</label><input type="range" min="-60" max="60" value="${tf.rx}" oninput="app.upTf('rx',+this.value)"></div>`;
h+=`<div class="pr"><label>دوران Y: ${tf.ry}°</label><input type="range" min="-60" max="60" value="${tf.ry}" oninput="app.upTf('ry',+this.value)"></div>`;
h+=`<div class="pr"><label>دوران Z: ${tf.rz}°</label><input type="range" min="-180" max="180" value="${tf.rz}" oninput="app.upTf('rz',+this.value)"></div>`;
h+=`<div class="pr"><label>تكبير: ${tf.sx}</label><input type="range" min="0.5" max="2" step="0.1" value="${tf.sx}" oninput="app.upTf('sx',+this.value);app.upTf('sy',+this.value)"></div>`;
h+=`<div class="pr"><label>المنظور: ${tf.p}px</label><input type="range" min="100" max="2000" step="100" value="${tf.p}" oninput="app.upTf('p',+this.value)"></div>`;
h+=`<div class="pr" style="display:flex;gap:4px"><button class="btn" style="flex:1;background:#f59e0b;color:#000" onclick="app.duplicate()">تكرار</button><button class="btn dan" style="flex:1" onclick="app.del()">حذف</button></div>`;
p.innerHTML=h;},

up(k,v){this.state.multiSelect.forEach(id=>{const el=this.cur().elements.find(e=>e.id===id);if(el)el[k]=v;});
this.save();this.render();},
upTf(k,v){this.state.multiSelect.forEach(id=>{const el=this.cur().elements.find(e=>e.id===id);
if(!el)return;if(!el.tf)el.tf={rx:0,ry:0,rz:0,sx:1,sy:1,p:600};el.tf[k]=v;});
this.save();this.render();},
setImg(ev){const f=ev.target.files[0];if(!f)return;const r=new FileReader();
r.onload=()=>{this.state.multiSelect.forEach(id=>{const el=this.cur().elements.find(e=>e.id===id);if(el)el.src=r.result;});
this.save();this.render();};r.readAsDataURL(f);},
del(){if(!this.state.multiSelect.length)return;
this.cur().elements=this.cur().elements.filter(e=>!this.state.multiSelect.includes(e.id));
this.state.multiSelect=[];this.save();this.snapshot();this.render();},
duplicate(){if(!this.state.multiSelect.length)return;const newIds=[];
this.state.multiSelect.forEach(id=>{const el=this.cur().elements.find(e=>e.id===id);if(!el)return;
const c=JSON.parse(JSON.stringify(el));c.id=uid();c.x+=20;c.y+=20;
this.cur().elements.push(c);newIds.push(c.id);});
this.state.multiSelect=newIds;this.save();this.snapshot();this.render();},
setCardShape(s){if(this.state.activePage!=='card')return;
this.cur().shape=s;this.save();this.render();},

elToHTML(el){const s=[`position:absolute`,`left:${el.x}px`,`top:${el.y}px`,`width:${el.w}px`,`height:${el.h}px`,
`border-radius:${el.borderRadius||0}px`,`border:${el.border||'none'}`,`background:${el.bg||'transparent'}`,
`color:${el.color||'#fff'}`,`font-size:${el.fontSize||14}px`,`font-weight:${el.fontWeight||'normal'}`,
`padding:${el.padding||0}px`,`text-align:${el.align||'center'}`,`font-family:'${el.font||'Cairo'}',sans-serif`,
`display:flex`,`align-items:center`,`justify-content:center`,`flex-direction:column`,`overflow:hidden`,`box-sizing:border-box`];
if(el.glass)s.push('backdrop-filter:blur(20px)','-webkit-backdrop-filter:blur(20px)');
if(el.tf)s.push(`transform:perspective(${el.tf.p||600}px) rotateX(${el.tf.rx||0}deg) rotateY(${el.tf.ry||0}deg) rotateZ(${el.tf.rz||0}deg) scale(${el.tf.sx||1},${el.tf.sy||1})`);
const st=s.join(';');
if(el.type==='input')return `<div style="${st};padding:0"><input type="${el.password?'password':'text'}" placeholder="${el.placeholder||''}" style="width:100%;height:100%;background:transparent;border:none;color:${el.color};font-size:${el.fontSize}px;font-family:inherit;text-align:right;outline:none;padding:0 10px;box-sizing:border-box"></div>`;
if(el.type==='button')return `<button style="${st};cursor:pointer">${el.text||''}</button>`;
if(el.type==='image')return el.src?`<img src="${el.src}" style="${st};object-fit:cover">`:`<div style="${st}">صورة</div>`;
if(el.type==='qr')return `<div style="${st};background:#fff;color:#000;font-size:10px">QR</div>`;
if(el.type==='clock')return `<div style="${st}"><span class="clk"></span></div>`;
if(el.type==='svg')return `<div style="${st}">${SVG_ICONS[el.svgKey]||''}</div>`;
return `<div style="${st}">${el.text||''}</div>`;},

buildPage(pageKey){const page=this.state.pages[pageKey];let bgSt='',bgCl='';
if(page.bg.type==='color'||page.bg.type==='gradient')bgSt=`background:${page.bg.value};`;
else if(page.bg.type==='image')bgSt=`background:url('${page.bg.value}') center/cover;`;
else if(page.bg.type==='anim')bgCl=page.bg.value;
let clip='';
if(pageKey==='card'&&page.shape){
if(page.shape==='round')clip='border-radius:20px;';
else if(page.shape==='circle')clip='border-radius:50%;';
else if(page.shape==='ticket')clip='clip-path:polygon(0 15%,5% 15%,5% 50%,0 50%,0 85%,5% 85%,5% 100%,95% 100%,95% 85%,100% 85%,100% 50%,95% 50%,95% 15%,100% 15%,100% 0,0 0);';
else if(page.shape==='hex')clip='clip-path:polygon(25% 0,75% 0,100% 50%,75% 100%,25% 100%,0 50%);';
else if(page.shape==='diamond')clip='clip-path:polygon(50% 0,100% 50%,50% 100%,0 50%);';}
const els=page.elements.map(el=>this.elToHTML(el)).join('\n');
const anim=`@keyframes stars{0%{background-position:0 0}100%{background-position:600px 600px}}
@keyframes meteor{0%{transform:translate(600px,-300px) rotate(-45deg);opacity:1}70%{transform:translate(-200px,500px) rotate(-45deg);opacity:1}100%{transform:translate(-400px,700px) rotate(-45deg);opacity:0}}
@keyframes bubble{0%{background-position:0 100vh}100%{background-position:0 -200px}}
@keyframes aurora{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
@keyframes twinkle{0%,100%{opacity:.3}50%{opacity:1}}
@keyframes planets{0%{transform:translateX(0)}100%{transform:translateX(500px) translateY(100px)}}
.bg-space{background:radial-gradient(ellipse at bottom,#1B2735,#090A0F);position:relative;overflow:hidden}
.bg-space::before{content:'';position:absolute;inset:0;background-image:radial-gradient(2px 2px at 20px 30px,#fff,transparent),radial-gradient(2px 2px at 40px 70px,#fff,transparent),radial-gradient(1px 1px at 90px 40px,#fff,transparent);background-size:200px 200px;animation:stars 60s linear infinite;pointer-events:none}
.bg-space::after{content:'';position:absolute;top:0;left:0;width:2px;height:100px;background:linear-gradient(to bottom,#fff,transparent);animation:meteor 4s linear infinite;pointer-events:none}
.bg-underwater{background:linear-gradient(180deg,#0c4a6e,#082f49);position:relative;overflow:hidden}
.bg-underwater::before{content:'';position:absolute;inset:0;background-image:radial-gradient(circle at 20% 80%,rgba(255,255,255,.15) 4px,transparent 5px),radial-gradient(circle at 60% 50%,rgba(255,255,255,.1) 6px,transparent 7px);background-size:100% 200px;animation:bubble 8s linear infinite;pointer-events:none}
.bg-aurora{background:#0f172a;position:relative;overflow:hidden}
.bg-aurora::before{content:'';position:absolute;inset:0;background:linear-gradient(120deg,#7c3aed,#22d3ee,#10b981,#7c3aed);background-size:400% 400%;opacity:.5;animation:aurora 12s ease infinite;pointer-events:none}
.bg-twinkle{background:#000;position:relative;overflow:hidden}
.bg-twinkle::before{content:'';position:absolute;inset:0;background-image:radial-gradient(1px 1px at 10% 20%,#fff,transparent),radial-gradient(1px 1px at 30% 40%,#fff,transparent),radial-gradient(2px 2px at 60% 10%,#fff,transparent);background-size:100% 100%;animation:twinkle 3s ease infinite;pointer-events:none}
.bg-planets{background:radial-gradient(ellipse at center,#1e1b4b,#000);position:relative;overflow:hidden}
.bg-planets::before{content:'';position:absolute;width:120px;height:120px;border-radius:50%;background:radial-gradient(circle at 30% 30%,#fbbf24,#7c2d12);top:80px;left:-40px;opacity:.7;box-shadow:0 0 40px rgba(251,191,36,.4);animation:planets 30s linear infinite}`;
return `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>${pageKey}</title>
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&family=Tajawal&family=Almarai&family=Amiri&family=Reem+Kufi&family=Lateef&family=Changa&family=El+Messiri&family=Aref+Ruqaa&family=Scheherazade&display=swap" rel="stylesheet">
<style>*{margin:0;padding:0;box-sizing:border-box}body{min-height:100vh;font-family:'Cairo',sans-serif;color:#fff;${bgSt}}
.page{position:relative;width:100%;max-width:${pageKey==='card'?'340px':'375px'};min-height:${pageKey==='card'?'200px':'667px'};margin:0 auto;${clip}overflow:hidden}
${anim}</style></head><body class="${bgCl}"><div class="page">${els}</div>
<script>setInterval(function(){document.querySelectorAll('.clk').forEach(function(t){t.textContent=new Date().toLocaleTimeString('ar-EG')})},1000);</script>
</body></html>`;},

preview(){document.getElementById('prevFrm').srcdoc=this.buildPage(this.state.activePage);
document.getElementById('modal').classList.add('on');},
copyHTML(){navigator.clipboard.writeText(this.buildPage(this.state.activePage))
.then(()=>alert('تم النسخ!'));},
exportAll(){const pages=[['login','index.html'],['inquiry','inquiry.html'],['card','card.html']];
pages.forEach((p,i)=>{const html=this.buildPage(p[0]);
const blob=new Blob([html],{type:'text/html;charset=utf-8'});
const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=p[1];
setTimeout(()=>{a.click();URL.revokeObjectURL(a.href);},i*400);});}
};
window.addEventListener('DOMContentLoaded',()=>app.init());
