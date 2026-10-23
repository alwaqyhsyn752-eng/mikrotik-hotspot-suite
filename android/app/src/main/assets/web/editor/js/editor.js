const app = {
  state:{background:{type:'color',value:'#0f172a'},elements:[],selected:null},
  drag:null,resize:null,
  init(){
    this.load();
    this.renderBgPanel();
    this.renderElPanel();
    this.renderFeatPanel();
    this.setupCanvas();
    this.setupTabs();
    this.setupMobile();
    this.render();
  },
  save(){localStorage.setItem('hs_editor',JSON.stringify(this.state));},
  load(){
    const s=localStorage.getItem('hs_editor');
    if(s){try{this.state=JSON.parse(s);}catch(e){}}
  },
  clear(){
    if(!confirm('مسح كل شيء؟'))return;
    this.state={background:{type:'color',value:'#0f172a'},elements:[],selected:null};
    this.save();this.render();this.renderProps();
  },
  renderBgPanel(){
    const p=document.getElementById('bgPanel');
    let h='<div class="sec"><h4>ألوان صلبة</h4><div class="cg">';
    BG_COLORS.forEach(c=>h+=`<div class="cs" style="background:${c}" onclick="app.setBgColor('${c}')"></div>`);
    h+='</div></div><div class="sec"><h4>تدرجات</h4><div class="gg">';
    BG_GRADIENTS.forEach(g=>h+=`<div class="gs" style="background:${g}" onclick="app.setBgGradient('${g}')"></div>`);
    h+='</div></div><div class="sec"><h4>صورة من الجهاز</h4>';
    h+='<input type="file" accept="image/*" id="bgFile" style="width:100%;padding:8px;background:#1e293b;border:1px solid #334155;border-radius:6px;color:#fff;font-size:11px">';
    h+='</div>';
    p.innerHTML=h;
    document.getElementById('bgFile').onchange=(e)=>{
      const f=e.target.files[0];if(!f)return;
      const r=new FileReader();
      r.onload=()=>{this.state.background={type:'image',value:r.result};this.save();this.render();};
      r.readAsDataURL(f);
    };
  },
  setBgColor(c){this.state.background={type:'color',value:c};this.save();this.render();},
  setBgGradient(g){this.state.background={type:'gradient',value:g};this.save();this.render();},
  renderElPanel(){
    const p=document.getElementById('elPanel');
    let h='<div class="sec"><h4>عناصر أساسية</h4><div class="el-grid">';
    ELEMENTS.forEach((e,i)=>{h+=`<div class="el-it" onclick="app.addElement(${i})">${e.label}</div>`;});
    h+='</div></div>';
    p.innerHTML=h;
  },
  renderFeatPanel(){
    const p=document.getElementById('featPanel');
    let h='';
    FEATURES.forEach(cat=>{
      h+=`<div class="fc"><h5>${cat.cat}</h5>`;
      cat.items.forEach((item,idx)=>{
        h+=`<div class="fi" onclick="app.addFeature('${cat.cat}',${idx})">${item.label}</div>`;
      });
      h+='</div>';
    });
    p.innerHTML=h;
  },
  addElement(i){
    const el=ELEMENTS[i].make();
    this.state.elements.push(el);
    this.state.selected=el.id;
    this.save();this.render();
  },
  addFeature(cat,i){
    const f=FEATURES.find(x=>x.cat===cat);
    if(!f)return;
    const made=f.items[i].make();
    made.forEach(el=>this.state.elements.push(el));
    if(made.length)this.state.selected=made[0].id;
    this.save();this.render();
  },
  render(){
    const cv=document.getElementById('canvas');
    const bg=this.state.background;
    if(bg.type==='image'){cv.style.background=`url(${bg.value}) center/cover`;}
    else{cv.style.background=bg.value;}
    cv.innerHTML='';
    this.state.elements.forEach(el=>{
      const d=document.createElement('div');
      d.className='ce'+(el.id===this.state.selected?' sel':'');
      d.dataset.id=el.id;
      d.style.left=el.x+'px';d.style.top=el.y+'px';
      d.style.width=el.w+'px';d.style.height=el.h+'px';
      d.style.background=el.bg||'transparent';
      d.style.borderRadius=el.borderRadius+'px';
      d.style.border=el.border||'none';
      d.style.color=el.color||'#fff';
      d.style.fontSize=el.fontSize+'px';
      d.style.fontWeight=el.fontWeight||'normal';
      d.style.padding=el.padding+'px';
      d.style.textAlign=el.align||'center';
      d.style.display='flex';d.style.alignItems='center';d.style.justifyContent='center';
      d.style.flexDirection='column';
      d.style.overflow='hidden';
      if(el.type==='input'){
        const inp=document.createElement('input');
        inp.type=el.inputType||'text';
        inp.placeholder=el.placeholder||'';
        inp.style.cssText='width:100%;height:100%;background:transparent;border:none;color:'+el.color+';font-family:inherit;font-size:'+el.fontSize+'px;text-align:right;outline:none;padding:0 6px';
        d.appendChild(inp);
        d.style.padding='0';
      } else if(el.type==='button'){
        d.textContent=el.text||'زر';
        d.style.cursor='pointer';
      } else if(el.type==='image'){
        if(el.src){const img=document.createElement('img');img.src=el.src;img.style.cssText='width:100%;height:100%;object-fit:cover';d.appendChild(img);}
        else d.innerHTML='<span style="color:#94a3b8;font-size:12px">اضغط لاختيار صورة</span>';
      } else if(el.type==='qr'){
        d.innerHTML='<div style="width:100%;height:100%;background:#fff;color:#000;display:flex;align-items:center;justify-content:center;font-size:10px;border-radius:4px">QR</div>';
      } else if(el.type==='clock'){
        const t=document.createElement('span');
        t.className='clk';t.textContent=new Date().toLocaleTimeString('ar-EG');
        d.appendChild(t);
      } else if(el.type==='icon'||el.type==='shape'){
        if(el.text)d.textContent=el.text;
      } else {
        d.textContent=el.text||'';
      }
      const rh=document.createElement('div');rh.className='rh';
      d.appendChild(rh);
      cv.appendChild(d);
    });
    if(!this._interval){
      this._interval=setInterval(()=>{
        document.querySelectorAll('.clk').forEach(t=>{t.textContent=new Date().toLocaleTimeString('ar-EG');});
      },1000);
    }
    this.renderProps();
  },
  renderProps(){
    const p=document.getElementById('props');
    if(!this.state.selected){
      p.innerHTML='<div class="empty">اختر عنصراً من اللوحة<br>أو اختر خلفية من اليسار</div>';
      return;
    }
    const el=this.state.elements.find(e=>e.id===this.state.selected);
    if(!el){p.innerHTML='<div class="empty">لا يوجد عنصر</div>';return;}
    let h=`<div class="pr"><label>النوع: ${el.type}</label></div>`;
    h+=`<div class="pr"><label>X</label><input type="number" value="${el.x}" oninput="app.upd('x',+this.value)"></div>`;
    h+=`<div class="pr"><label>Y</label><input type="number" value="${el.y}" oninput="app.upd('y',+this.value)"></div>`;
    h+=`<div class="pr"><div class="row"><div><label>W</label><input type="number" value="${el.w}" oninput="app.upd('w',+this.value)"></div><div><label>H</label><input type="number" value="${el.h}" oninput="app.upd('h',+this.value)"></div></div></div>`;
    if(['text','button','icon','shape'].includes(el.type)||el.text){
      h+=`<div class="pr"><label>النص</label><input value="${el.text||''}" oninput="app.upd('text',this.value)"></div>`;
    }
    if(el.type==='input'){
      h+=`<div class="pr"><label>Placeholder</label><input value="${el.placeholder||''}" oninput="app.upd('placeholder',this.value)"></div>`;
      h+=`<div class="pr"><label>النوع</label><select onchange="app.upd('inputType',this.value)"><option value="text"${el.inputType==='text'?' selected':''}>نص</option><option value="password"${el.inputType==='password'?' selected':''}>كلمة مرور</option></select></div>`;
    }
    if(el.type==='image'){
      h+=`<div class="pr"><label>صورة</label><input type="file" accept="image/*" onchange="app.setImg(event)"></div>`;
    }
    h+=`<div class="pr"><label>لون النص</label><input type="color" value="${el.color||'#ffffff'}" oninput="app.upd('color',this.value)"></div>`;
    h+=`<div class="pr"><label>لون الخلفية</label><input type="color" value="${el.bg && el.bg.startsWith('#')?el.bg:'#000000'}" oninput="app.upd('bg',this.value)"></div>`;
    h+=`<div class="pr"><label>حجم الخط</label><input type="range" min="8" max="48" value="${el.fontSize}" oninput="app.upd('fontSize',+this.value)"></div>`;
    h+=`<div class="pr"><label>استدارة</label><input type="range" min="0" max="50" value="${el.borderRadius}" oninput="app.upd('borderRadius',+this.value)"></div>`;
    h+=`<div class="pr"><label>الحدود</label><input value="${el.border||'none'}" oninput="app.upd('border',this.value)" placeholder="مثال: 1px solid #22d3ee"></div>`;
    h+=`<div class="pr"><label>سماكة الخط</label><select onchange="app.upd('fontWeight',this.value)"><option value="normal"${el.fontWeight==='normal'?' selected':''}>عادي</option><option value="bold"${el.fontWeight==='bold'?' selected':''}>عريض</option></select></div>`;
    h+=`<div class="pr"><button class="btn" style="width:100%;background:#dc2626;color:#fff" onclick="app.del()">حذف العنصر</button></div>`;
    p.innerHTML=h;
  },
  upd(k,v){
    const el=this.state.elements.find(e=>e.id===this.state.selected);
    if(!el)return;
    el[k]=v;this.save();this.render();
  },
  setImg(ev){
    const f=ev.target.files[0];if(!f)return;
    const r=new FileReader();
    r.onload=()=>{this.upd('src',r.result);};
    r.readAsDataURL(f);
  },
  del(){
    this.state.elements=this.state.elements.filter(e=>e.id!==this.state.selected);
    this.state.selected=null;
    this.save();this.render();
  },
  setupCanvas(){
    const cv=document.getElementById('canvas');
    cv.addEventListener('pointerdown',e=>{
      const el=e.target.closest('.ce');
      if(!el)return;
      this.state.selected=el.dataset.id;
      this.render();
      const elem=this.state.elements.find(x=>x.id===this.state.selected);
      if(!elem)return;
      if(e.target.classList.contains('rh')){
        this.resize={id:elem.id,startX:e.clientX,startY:e.clientY,w0:elem.w,h0:elem.h};
      } else {
        this.drag={id:elem.id,startX:e.clientX,startY:e.clientY,x0:elem.x,y0:elem.y,moved:false};
      }
      e.preventDefault();
    });
    document.addEventListener('pointermove',e=>{
      if(this.drag){
        const el=this.state.elements.find(x=>x.id===this.drag.id);
        if(!el)return;
        const dx=e.clientX-this.drag.startX,dy=e.clientY-this.drag.startY;
        if(Math.abs(dx)>3||Math.abs(dy)>3)this.drag.moved=true;
        el.x=Math.max(0,this.drag.x0+dx);el.y=Math.max(0,this.drag.y0+dy);
        const node=document.querySelector(`[data-id="${el.id}"]`);
        if(node){node.style.left=el.x+'px';node.style.top=el.y+'px';}
      } else if(this.resize){
        const el=this.state.elements.find(x=>x.id===this.resize.id);
        if(!el)return;
        const dx=e.clientX-this.resize.startX,dy=e.clientY-this.resize.startY;
        el.w=Math.max(20,this.resize.w0+dx);el.h=Math.max(20,this.resize.h0+dy);
        const node=document.querySelector(`[data-id="${el.id}"]`);
        if(node){node.style.width=el.w+'px';node.style.height=el.h+'px';}
      }
    });
    document.addEventListener('pointerup',()=>{
      if(this.drag||this.resize){this.save();this.render();}
      this.drag=null;this.resize=null;
    });
  },
  setupTabs(){
    document.querySelectorAll('.tab').forEach(t=>{
      t.onclick=()=>{
        document.querySelectorAll('.tab').forEach(x=>x.classList.remove('on'));
        t.classList.add('on');
        document.querySelectorAll('.tb').forEach(x=>x.classList.remove('on'));
        const c=document.querySelector(`[data-tb="${t.dataset.tab}"]`);
        if(c)c.classList.add('on');
      };
    });
  },
  setupMobile(){
    document.querySelectorAll('.mn button').forEach(b=>{
      b.onclick=()=>{
        const m=b.dataset.m;
        document.querySelectorAll('.mn button').forEach(x=>x.classList.remove('on'));
        b.classList.add('on');
        if(m==='props'){
          document.getElementById('rightPanel').classList.toggle('on');
          document.getElementById('leftPanel').classList.remove('on');
        } else {
          document.getElementById('leftPanel').classList.add('on');
          document.getElementById('rightPanel').classList.remove('on');
          document.querySelectorAll('.tab').forEach(x=>{if(x.dataset.tab===m)x.click();});
        }
      };
    });
  },
  renderElHTML(el){
    let style=`position:absolute;left:${el.x}px;top:${el.y}px;width:${el.w}px;height:${el.h}px;background:${el.bg||'transparent'};border-radius:${el.borderRadius}px;border:${el.border||'none'};color:${el.color};font-size:${el.fontSize}px;font-weight:${el.fontWeight};text-align:${el.align||'center'};display:flex;align-items:center;justify-content:center;flex-direction:column;overflow:hidden;padding:${el.padding}px;box-sizing:border-box;`;
    if(el.type==='input'){
      return `<div style="${style}padding:0"><input type="${el.inputType}" placeholder="${el.placeholder}" style="width:100%;height:100%;background:transparent;border:none;color:${el.color};font-family:inherit;font-size:${el.fontSize}px;text-align:right;outline:none;padding:0 6px"></div>`;
    }
    if(el.type==='button') return `<button style="${style}cursor:pointer;">${el.text}</button>`;
    if(el.type==='image') return el.src?`<img src="${el.src}" style="${style}object-fit:cover">`:`<div style="${style}">صورة</div>`;
    if(el.type==='qr') return `<div style="${style}background:#fff;color:#000;font-size:10px">QR</div>`;
    if(el.type==='clock') return `<div style="${style}"><span class="clk"></span></div>`;
    return `<div style="${style}">${el.text||''}</div>`;
  },
  buildHTML(){
    const bg=this.state.background;
    const bgCss=bg.type==='image'?`background:url('${bg.value}') center/cover;`:`background:${bg.value};`;
    const els=this.state.elements.map(e=>this.renderElHTML(e)).join('\n');
    return `<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>صفحة الهوت سبوت</title><style>*{margin:0;padding:0;box-sizing:border-box}body{${bgCss}min-height:100vh;font-family:'Segoe UI',Tahoma,sans-serif;color:#fff}.page{position:relative;width:100%;max-width:375px;min-height:667px;margin:0 auto}</style></head><body><div class="page">${els}</div><script>setInterval(()=>{document.querySelectorAll('.clk').forEach(t=>{t.textContent=new Date().toLocaleTimeString('ar-EG')})},1000);</script></body></html>`;
  },
  preview(){
    document.getElementById('prevFrm').srcdoc=this.buildHTML();
    document.getElementById('modal').classList.add('on');
  },
  exportHTML(){
    const html=this.buildHTML();
    const blob=new Blob([html],{type:'text/html;charset=utf-8'});
    const a=document.createElement('a');
    a.href=URL.createObjectURL(blob);
    a.download='hotspot-'+Date.now()+'.html';
    a.click();
    alert('تم التصدير! ارفع الملف إلى سيرفر الميكروتيك');
  }
};
window.addEventListener('DOMContentLoaded',()=>app.init());
