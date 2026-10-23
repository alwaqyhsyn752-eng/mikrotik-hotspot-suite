const uid=()=>'e'+Math.random().toString(36).substr(2,9);

const SOLID=['#020617','#0f172a','#1e1b4b','#1a2e05','#450a0a','#1c1917','#0c4a6e','#14532d','#3b0764','#7c2d12','#083344','#365314','#581c87','#7f1d1d','#171717','#000000','#1f2937','#374151','#4b5563','#6b7280','#9ca3af','#d1d5db','#f3f4f6','#ffffff','#fef3c7','#fce7f3','#dbeafe','#dcfce7','#fed7aa','#e0e7ff','#22d3ee','#0891b2','#c084fc','#a855f7','#f43f5e','#e11d48','#fbbf24','#eab308','#34d399','#10b981'];

const GRADS=[
'linear-gradient(135deg,#020617,#1e1b4b)','linear-gradient(135deg,#0f172a,#22d3ee)',
'linear-gradient(135deg,#4c1d95,#c084fc)','linear-gradient(135deg,#064e3b,#34d399)',
'linear-gradient(135deg,#7c2d12,#fbbf24)','linear-gradient(135deg,#581c87,#e879f9)',
'linear-gradient(180deg,#020617,#0891b2)','radial-gradient(circle,#0f172a,#020617)',
'linear-gradient(135deg,#000,#333)','linear-gradient(135deg,#1e293b,#64748b)',
'linear-gradient(135deg,#450a0a,#fb7185)','linear-gradient(135deg,#164e63,#22d3ee)',
'linear-gradient(135deg,#14532d,#4ade80)','linear-gradient(135deg,#78350f,#fbbf24)',
'linear-gradient(135deg,#581c87,#e879f9)','linear-gradient(135deg,#831843,#f472b6)',
'linear-gradient(135deg,#1e3a8a,#60a5fa)','linear-gradient(135deg,#134e4a,#2dd4bf)',
'linear-gradient(135deg,#3f3f46,#a1a1aa)','linear-gradient(135deg,#365314,#84cc16)',
'radial-gradient(circle at top,#22d3ee,#020617)','radial-gradient(circle at top,#c084fc,#0f172a)',
'linear-gradient(45deg,#020617,#22d3ee,#020617)','linear-gradient(45deg,#0f172a,#e879f9,#0f172a)',
'linear-gradient(to bottom,#1e1b4b,#7c3aed,#22d3ee)'];

const ANIM_BG=[
{name:'فضاء',cls:'bg-space'},
{name:'تحت البحر',cls:'bg-underwater'},
{name:'شفق قطبي',cls:'bg-aurora'},
{name:'نجوم تلمع',cls:'bg-twinkle'},
{name:'كواكب',cls:'bg-planets'}
];

// 1000 أيقونة: SVG للأشهر + Unicode للمئات
const SVG_ICONS={
facebook:'<svg viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.64L18 8h-4V6.33c0-.95.19-1.33 1.12-1.33H18V0h-3.8C10.6 0 9 1.58 9 4.62V8z"/></svg>',
twitter:'<svg viewBox="0 0 24 24"><path d="M18.9 2H22l-7.5 8.6L23 22h-6.8l-5.3-7-6.1 7H1.7l8-9.2L1 2h6.9l4.8 6.4L18.9 2z"/></svg>',
instagram:'<svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.2 2.2.4.5.2.9.5 1.3.9.4.4.7.8.9 1.3.2.4.4 1 .4 2.2.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.2 1.8-.4 2.2-.2.5-.5.9-.9 1.3-.4.4-.8.7-1.3.9-.4.2-1 .4-2.2.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.2-2.2-.4-.5-.2-.9-.5-1.3-.9-.4-.4-.7-.8-.9-1.3-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.2-1.8.4-2.2.2-.5.5-.9.9-1.3.4-.4.8-.7 1.3-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.2 0-3.5 0-4.8.1-1.1.1-1.5.2-1.8.3-.4.2-.7.3-1 .6-.3.3-.4.6-.6 1-.1.3-.2.7-.3 1.8-.1 1.3-.1 1.6-.1 4.8s0 3.5.1 4.8c.1 1.1.2 1.5.3 1.8.2.4.3.7.6 1 .3.3.6.4 1 .6.3.1.7.2 1.8.3 1.3.1 1.6.1 4.8.1s3.5 0 4.8-.1c1.1-.1 1.5-.2 1.8-.3.4-.2.7-.3 1-.6.3-.3.4-.6.6-1 .1-.3.2-.7.3-1.8.1-1.3.1-1.6.1-4.8s0-3.5-.1-4.8c-.1-1.1-.2-1.5-.3-1.8-.2-.4-.3-.7-.6-1-.3-.3-.6-.4-1-.6-.3-.1-.7-.2-1.8-.3-1.3-.1-1.6-.1-4.8-.1zm0 3.1a5 5 0 110 10 5 5 0 010-10zm0 1.8a3.2 3.2 0 100 6.4 3.2 3.2 0 000-6.4zm5.2-3a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/></svg>',
whatsapp:'<svg viewBox="0 0 24 24"><path d="M17.6 14.2c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.3 5.1 4.6.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zm-5.6 7.6h-.1c-1.7 0-3.4-.5-4.9-1.4l-.4-.2-3.6.9.9-3.5-.2-.4c-1-1.5-1.5-3.3-1.5-5.2 0-5.4 4.4-9.8 9.8-9.8s9.8 4.4 9.8 9.8c0 5.4-4.4 9.8-9.8 9.8zm0-22C6.5-0.2 0 6.3 0 14.3c0 2.5.7 5 1.9 7.1L0 30l8.8-2.3c2.1 1.1 4.5 1.7 7 1.7 8 0 14.5-6.5 14.5-14.5S20.7-.2 12-.2z" transform="scale(0.8)"/></svg>',
telegram:'<svg viewBox="0 0 24 24"><path d="M23.91 3.79L20.3 20.84c-.25 1.21-.98 1.5-2 .94l-5.5-4.07-2.66 2.57c-.3.3-.55.56-1.1.56-.72 0-.6-.27-.84-.95L6.3 13.7l-5.45-1.7c-1.18-.35-1.19-1.16.26-1.75l21.26-8.2c.97-.43 1.9.24 1.53 1.73z"/></svg>',
youtube:'<svg viewBox="0 0 24 24"><path d="M23.5 6.2c-.3-1-1.1-1.8-2.1-2.1C19.6 3.6 12 3.6 12 3.6s-7.6 0-9.4.5c-1 .3-1.8 1.1-2.1 2.1C0 8 0 12 0 12s0 4 .5 5.8c.3 1 1.1 1.8 2.1 2.1 1.8.5 9.4.5 9.4.5s7.6 0 9.4-.5c1-.3 1.8-1.1 2.1-2.1.5-1.8.5-5.8.5-5.8s0-4-.5-5.8zM9.5 15.6V8.4l6.3 3.6-6.3 3.6z"/></svg>',
snapchat:'<svg viewBox="0 0 24 24"><path d="M12.2 0C8.7.1 6.3 2.7 6.3 6v2.7c-.7 0-1.4-.3-2-.7-.4-.3-.7-.2-1 .2-.3.5-.1 1.3.8 1.9 1.5.9 2.6 1 2.6 1s-.1.8-1.5 1.2c-1 .3-2.4.4-2.9 2-.2.6.1 1.2.7 1.4.9.3 1.4-.2 2.1.4.6.5 1 1 1.7 1.1 1.3.1 2-.6 3.7-.6 1.7 0 2.4.7 3.7.6.8-.1 1.1-.6 1.7-1.1.7-.6 1.2-.1 2.1-.4.6-.2.9-.8.7-1.4-.5-1.6-1.9-1.7-2.9-2-1.4-.4-1.5-1.2-1.5-1.2s1.1-.1 2.6-1c.9-.6 1.1-1.4.8-1.9-.3-.4-.6-.5-1-.2-.6.4-1.3.7-2 .7V6c0-3.3-2.4-5.9-5.9-6h-.1z"/></svg>',
tiktok:'<svg viewBox="0 0 24 24"><path d="M19.6 6.7c-1.4-.9-2.3-2.4-2.3-4.1V2h-3.9v13.8c0 1.9-1.6 3.5-3.5 3.5s-3.5-1.6-3.5-3.5 1.6-3.5 3.5-3.5c.4 0 .7 0 1 .1V9c-.3 0-.7-.1-1-.1-4.2 0-7.6 3.4-7.6 7.6s3.4 7.6 7.6 7.6 7.6-3.4 7.6-7.6V8.9c1.4 1 3.1 1.6 5 1.6V6.8c-.4 0-.7 0-1-.1z" transform="scale(0.85)"/></svg>',
linkedin:'<svg viewBox="0 0 24 24"><path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.8H9.3V9h3.4v1.6h.1c.5-.9 1.6-1.9 3.4-1.9 3.6 0 4.3 2.4 4.3 5.5v6.3zM5.3 7.4c-1.2 0-2.1-.9-2.1-2.1s.9-2.1 2.1-2.1 2.1.9 2.1 2.1-.9 2.1-2.1 2.1zM7 20.5H3.5V9H7v11.5zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6C0 23.2.8 24 1.8 24h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0z"/></svg>',
imessage:'<svg viewBox="0 0 24 24"><path d="M12 2C6.5 2 2 5.9 2 10.7c0 2.8 1.6 5.3 4.2 6.9-.2.8-.9 2.5-1.1 2.9-.2.5.2.5.4.4.4-.2 2.5-1.5 3.5-2.1 1 .2 2 .4 3 .4 5.5 0 10-3.9 10-8.7S17.5 2 12 2z"/></svg>',
paypal:'<svg viewBox="0 0 24 24"><path d="M7.6 21.5H3.4c-.3 0-.5-.3-.4-.6L6.5 1.8c.1-.3.3-.5.6-.5h7c2.8 0 4.9.6 6 1.9 1 1.1 1.3 2.8.9 5-.7 3.7-2.9 5.4-6.5 5.4H11c-.4 0-.7.3-.8.7l-1 5.9c0 .1-.1.3-.2.4-.1.1-.2.1-.3.1h-1.1z"/></svg>',
visa:'<svg viewBox="0 0 24 24"><path d="M11.3 7.5L7.9 16.5H5.3L3.1 9.3c-.1-.5-.3-.8-.8-1C1.5 8 0.7 7.7 0 7.6V7.3h4.1c.6 0 1 .5 1.1 1.1L6.5 13l1.5-5.5h2.9zm11 .1c0 1.9-1.7 3.4-3.9 3.4-.9 0-1.7-.2-2.2-.5l.3-1.9.4.2c.6.3 1.3.4 2 .4.6 0 1.1-.1 1.1-.6 0-.3-.3-.5-1.1-.8-1.3-.6-2.2-1.4-2.2-2.7 0-2.1 1.9-3.2 3.8-3.2.8 0 1.5.1 2 .4l-.4 1.9c-.5-.2-1.1-.4-1.8-.4-.5 0-1 .1-1 .5 0 .3.3.5 1.2.9 1.4.6 2.1 1.4 2.1 2.9zm-6.7-4l-2 8.9h-2.6l2-8.9h2.6zm2.1 0h2.4l-1.5 8.9h-2.4l1.5-8.9z"/></svg>',
mastercard:'<svg viewBox="0 0 24 24"><path d="M15 4c-2.2 0-4.1.9-5.5 2.4C8.1 4.9 6.2 4 4 4c-.6 0-1.2.1-1.8.2V20H22v-4.2c1.2-1.3 2-3.1 2-5s-.8-3.7-2-5V4h-7zm-3 8c0-1.7.8-3.2 2.1-4.2C15.4 8.9 16 10.4 16 12s-.6 3.1-1.9 4.2C12.8 15.2 12 13.7 12 12zm-8 0c0-1.7.6-3.1 1.9-4.2C7.2 8.9 8 10.4 8 12s-.8 3.1-2.1 4.2C4.6 15.2 4 13.7 4 12z"/></svg>',
stcpay:'<svg viewBox="0 0 24 24"><text x="2" y="18" font-size="18" font-weight="bold" fill="currentColor">stc pay</text></svg>',
applepay:'<svg viewBox="0 0 24 24"><path d="M4 8.5c0-1.9 1.5-3.3 3.2-3.3 1.5 0 2.3.6 2.3 1.5 0 .8-.6 1.3-1.3 1.3-.8 0-1.2-.5-2-.5-.9 0-1.7.8-1.7 2 0 1.5.8 2.5 2.1 2.5.9 0 1.4-.4 2-.8.2 1-.7 1.8-1.9 1.8C5.4 13 4 11 4 8.5zm12.5-3.3c-.8 0-1.6.4-2 .8-.5-.5-1.2-.8-2-.8-1.9 0-3.3 1.5-3.3 3.3s1.4 3.3 3.3 3.3c.8 0 1.5-.3 2-.8.4.5 1.2.8 2 .8 1.9 0 3.3-1.5 3.3-3.3s-1.4-3.3-3.3-3.3zm0 5.6c-1.3 0-2.3-1-2.3-2.3s1-2.3 2.3-2.3 2.3 1 2.3 2.3-1 2.3-2.3 2.3z" transform="translate(0,5)"/></svg>'
};

function genAllUnicode(){
  const arr=[];
  for(let i=0x2100;i<=0x21FF;i++)arr.push(String.fromCodePoint(i));
  for(let i=0x2200;i<=0x22FF;i++)arr.push(String.fromCodePoint(i));
  for(let i=0x25A0;i<=0x25FF;i++)arr.push(String.fromCodePoint(i));
  for(let i=0x2600;i<=0x26FF;i++)arr.push(String.fromCodePoint(i));
  for(let i=0x2700;i<=0x27BF;i++)arr.push(String.fromCodePoint(i));
  for(let i=0x2B00;i<=0x2BFF;i++)arr.push(String.fromCodePoint(i));
  return arr;
}

const EMOJI_GROUPS={
'بنوك':['💳','💰','💵','💴','💶','💷','💸','🏦','🏧','💲','💱','💹','📊','📈','📉','💎','🪙','💯','🎫','🏷'],
'تواصل':['📱','💬','✉','📞','☎','📧','📨','📩','📤','📥','📮','📪','📫','📬','📭','🗨','🗯','💭','🔔','🔕'],
'إنترنت':['📶','📡','📻','📺','🖥','💻','⌨','🖱','🖨','📟','📠','📲','🔌','🔋','💾','💿','📀','🎥','📷','📹'],
'ترفيه':['👥','🎭','🎬','🎤','🎧','🎼','🎹','🥁','🎷','🎺','🎸','🎻','🎲','🎯','🎮','🕹','🎰','🎳','🎪','🎨'],
'طعام':['🍎','🍏','🍐','🍊','🍋','🍌','🍉','🍇','🍓','🍒','🍑','🍍','🥝','🥑','🍆','🥕','🌽','🍞','🥐','🥖'],
'طبيعة':['🌍','🌎','🌏','🌕','🌖','🌗','🌘','🌑','🌒','🌓','🌔','🌙','☀','⭐','🌟','✨','☁','⛅','🌤','🌈'],
'نبات':['🌱','🌿','☘','🍀','🎍','🎋','🌴','🌵','🌾','🌷','🌹','🥀','🌺','🌸','🌼','🌻','💐','💮','🏵','🍄'],
'حيوان':['🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐮','🐷','🐸','🐵','🐔','🐧','🐦','🐤','🦆'],
'نقل':['🚗','🚕','🚙','🚌','🚎','🏎','🚓','🚑','🚒','🚐','🚚','🚛','🚜','🚲','🛴','🛵','🏍','🛺','🚨','🚔'],
'رياضة':['⚽','🏀','🏈','⚾','🎾','🏐','🏉','🎱','🏓','🏸','🥊','🎿','🏂','🏋','🤼','🤸','⛹','🤺','🏇','🧗'],
'أدوات':['🔧','🔨','⚒','🛠','⛏','⚙','🔩','⚖','🔗','⛓','🧲','🔫','💉','💊','🩹','🩺','🔬','🔭','📡','🧪'],
'أشخاص':['👶','👧','🧒','👦','👩','🧑','👨','👵','🧓','👴','👱','👲','👳','🧕','👮','👷','💂','🕵','👩‍⚕','👨‍⚕'],
'دين':['🕌','🕋','🕍','⛪','☪','☸','✡','☯','☮','🕉','🔯','✝','☦','⛩','📿'],
'أعلام':['🇸🇦','🇾🇪','🇦🇪','🇪🇬','🇰🇼','🇶🇦','🇧🇭','🇴🇲','🇯🇴','🇱🇧','🇮🇶','🇸🇾','🇵🇸','🇲🇦','🇩🇿','🇹🇳','🇱🇾','🇸🇩','🇺🇸','🇬🇧']
};

const FONTS=[
{name:'Cairo',family:'Cairo'},{name:'Tajawal',family:'Tajawal'},{name:'Almarai',family:'Almarai'},
{name:'Amiri',family:'Amiri'},{name:'Reem Kufi',family:'Reem Kufi'},{name:'Lateef',family:'Lateef'},
{name:'Changa',family:'Changa'},{name:'El Messiri',family:'El Messiri'},{name:'Aref Ruqaa',family:'Aref Ruqaa'},
{name:'Scheherazade',family:'Scheherazade'},{name:'Standard',family:'Segoe UI'},{name:'Mono',family:'monospace'}
];

const ELEMENTS=[
{label:'نص',make:()=>({type:'text',text:'نص جديد',x:20,y:100,w:200,h:40,fontSize:16,color:'#ffffff',bg:'transparent',borderRadius:8,border:'none',padding:8,fontWeight:'normal',align:'center',font:'Cairo',tf:{rx:0,ry:0,rz:0,sx:1,sy:1,p:600},glass:false})},
{label:'زر',make:()=>({type:'button',text:'زر',x:20,y:150,w:150,h:42,fontSize:14,color:'#000',bg:'#22d3ee',borderRadius:8,border:'none',padding:8,fontWeight:'bold',align:'center',font:'Cairo',tf:{rx:0,ry:0,rz:0,sx:1,sy:1,p:600},glass:false})},
{label:'حقل',make:()=>({type:'input',placeholder:'نص...',x:20,y:200,w:335,h:44,fontSize:14,color:'#fff',bg:'rgba(30,41,59,.8)',borderRadius:8,border:'1px solid #334155',padding:8,font:'Cairo',tf:{rx:0,ry:0,rz:0,sx:1,sy:1,p:600},glass:false,password:false})},
{label:'صورة',make:()=>({type:'image',src:'',x:20,y:250,w:200,h:150,bg:'#1e293b',borderRadius:10,font:'Cairo',tf:{rx:0,ry:0,rz:0,sx:1,sy:1,p:600},glass:false})},
{label:'دائرة',make:()=>({type:'shape',bg:'#22d3ee',x:20,y:350,w:80,h:80,borderRadius:999,font:'Cairo',tf:{rx:0,ry:0,rz:0,sx:1,sy:1,p:600},glass:false})},
{label:'مستطيل',make:()=>({type:'shape',bg:'#1e293b',x:20,y:400,w:200,h:100,borderRadius:12,border:'1px solid #334155',font:'Cairo',tf:{rx:0,ry:0,rz:0,sx:1,sy:1,p:600},glass:false})},
{label:'QR',make:()=>({type:'qr',text:'https://example.com',x:20,y:450,w:120,h:120,bg:'#fff',color:'#000',borderRadius:6,font:'Cairo',tf:{rx:0,ry:0,rz:0,sx:1,sy:1,p:600},glass:false})},
{label:'ساعة',make:()=>({type:'clock',x:20,y:50,w:335,h:30,fontSize:14,color:'#22d3ee',bg:'transparent',borderRadius:0,font:'Cairo',align:'center',tf:{rx:0,ry:0,rz:0,sx:1,sy:1,p:600},glass:false})},
{label:'آية',make:()=>({type:'text',text:'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ',x:20,y:20,w:335,h:26,fontSize:13,color:'#22d3ee',bg:'transparent',borderRadius:0,font:'Amiri',align:'center',fontWeight:'normal',tf:{rx:0,ry:0,rz:0,sx:1,sy:1,p:600},glass:false})},
{label:'دائرة 3D',make:()=>({type:'shape',bg:'linear-gradient(135deg,#22d3ee,#0891b2)',x:20,y:350,w:100,h:100,borderRadius:999,border:'none',font:'Cairo',tf:{rx:15,ry:-15,rz:0,sx:1,sy:1,p:800},glass:false})},
{label:'مكعب',make:()=>({type:'shape',bg:'rgba(34,211,238,.2)',x:20,y:350,w:100,h:100,borderRadius:10,border:'2px solid #22d3ee',font:'Cairo',tf:{rx:20,ry:-20,rz:0,sx:1,sy:1,p:800},glass:true})},
{label:'خط فاصل',make:()=>({type:'shape',bg:'#334155',x:20,y:500,w:335,h:2,borderRadius:1,font:'Cairo',tf:{rx:0,ry:0,rz:0,sx:1,sy:1,p:600},glass:false})}
];

const FEATURES=[
{cat:'دخول',items:[
{label:'نموذج دخول',mk:()=>[
{type:'input',placeholder:'رقم الكرت',x:20,y:280,w:335,h:48,bg:'rgba(30,41,59,.9)',border:'1px solid #334155',borderRadius:10,fontSize:14,color:'#fff',font:'Cairo',padding:10,tf:{rx:0,ry:0,rz:0,sx:1,sy:1,p:600},glass:false},
{type:'input',placeholder:'كلمة المرور',password:true,x:20,y:338,w:335,h:48,bg:'rgba(30,41,59,.9)',border:'1px solid #334155',borderRadius:10,fontSize:14,color:'#fff',font:'Cairo',padding:10,tf:{rx:0,ry:0,rz:0,sx:1,sy:1,p:600},glass:false},
{type:'button',text:'دخول',x:20,y:396,w:335,h:50,bg:'#22d3ee',color:'#000',borderRadius:10,fontSize:16,fontWeight:'bold',font:'Cairo',tf:{rx:0,ry:0,rz:0,sx:1,sy:1,p:600},glass:false}]},
{label:'دخول فاخر (زجاجي)',mk:()=>[
{type:'shape',bg:'rgba(15,23,42,.6)',border:'1px solid #22d3ee',borderRadius:20,x:20,y:240,w:335,h:240,glass:true,font:'Cairo',tf:{rx:0,ry:0,rz:0,sx:1,sy:1,p:600}},
{type:'text',text:'تسجيل الدخول',x:20,y:255,w:335,h:32,fontSize:18,color:'#22d3ee',fontWeight:'bold',font:'Cairo',align:'center',bg:'transparent',borderRadius:0,tf:{rx:0,ry:0,rz:0,sx:1,sy:1,p:600},glass:false},
{type:'input',placeholder:'رقم الكرت',x:35,y:300,w:305,h:44,bg:'rgba(2,6,23,.8)',border:'1px solid #334155',borderRadius:8,fontSize:13,color:'#fff',font:'Cairo',padding:8,tf:{rx:0,ry:0,rz:0,sx:1,sy:1,p:600},glass:false},
{type:'input',placeholder:'كلمة المرور',password:true,x:35,y:352,w:305,h:44,bg:'rgba(2,6,23,.8)',border:'1px solid #334155',borderRadius:8,fontSize:13,color:'#fff',font:'Cairo',padding:8,tf:{rx:0,ry:0,rz:0,sx:1,sy:1,p:600},glass:false},
{type:'button',text:'دخول',x:35,y:404,w:305,h:46,bg:'#22d3ee',color:'#000',borderRadius:8,fontSize:15,fontWeight:'bold',font:'Cairo',tf:{rx:0,ry:0,rz:0,sx:1,sy:1,p:600},glass:false}]}
]},
{cat:'أسعار',items:[
{label:'كرت سعر',mk:()=>[
{type:'shape',bg:'rgba(15,23,42,.8)',border:'2px solid #22d3ee',borderRadius:14,x:20,y:300,w:160,h:120,glass:true,font:'Cairo',tf:{rx:0,ry:0,rz:0,sx:1,sy:1,p:600}},
{type:'text',text:'5 جيجا',x:20,y:310,w:160,h:28,fontSize:18,color:'#22d3ee',fontWeight:'bold',font:'Cairo',align:'center',bg:'transparent',borderRadius:0,tf:{rx:0,ry:0,rz:0,sx:1,sy:1,p:600},glass:false},
{type:'text',text:'500 ريال / 7 أيام',x:20,y:345,w:160,h:24,fontSize:11,color:'#94a3b8',font:'Cairo',align:'center',bg:'transparent',borderRadius:0,tf:{rx:0,ry:0,rz:0,sx:1,sy:1,p:600},glass:false},
{type:'button',text:'اشترِ',x:30,y:378,w:140,h:32,bg:'#22d3ee',color:'#000',borderRadius:6,fontSize:12,fontWeight:'bold',font:'Cairo',tf:{rx:0,ry:0,rz:0,sx:1,sy:1,p:600},glass:false}]}
]},
{cat:'ترفيه',items:[
{label:'زر قرآن',mk:()=>[{type:'button',text:'📖 القرآن الكريم',x:20,y:500,w:160,h:44,bg:'rgba(15,23,42,.9)',color:'#22d3ee',border:'1px solid #22d3ee',borderRadius:10,fontSize:12,fontWeight:'bold',font:'Cairo',tf:{rx:0,ry:0,rz:0,sx:1,sy:1,p:600},glass:true}]},
{label:'زر ألعاب',mk:()=>[{type:'button',text:'🎮 ألعاب',x:195,y:500,w:160,h:44,bg:'rgba(15,23,42,.9)',color:'#22d3ee',border:'1px solid #22d3ee',borderRadius:10,fontSize:12,fontWeight:'bold',font:'Cairo',tf:{rx:0,ry:0,rz:0,sx:1,sy:1,p:600},glass:true}]},
{label:'مشغل قرآن',mk:()=>[
{type:'shape',bg:'rgba(15,23,42,.9)',border:'1px solid #22d3ee',borderRadius:12,x:20,y:400,w:335,h:74,glass:true,font:'Cairo',tf:{rx:0,ry:0,rz:0,sx:1,sy:1,p:600}},
{type:'text',text:'قارئ: مشاري العفاسي',x:30,y:410,w:315,h:20,fontSize:11,color:'#22d3ee',font:'Cairo',align:'right',bg:'transparent',borderRadius:0,tf:{rx:0,ry:0,rz:0,sx:1,sy:1,p:600},glass:false},
{type:'button',text:'▶ تشغيل',x:30,y:436,w:315,h:30,bg:'#22d3ee',color:'#000',borderRadius:6,fontSize:12,fontWeight:'bold',font:'Cairo',tf:{rx:0,ry:0,rz:0,sx:1,sy:1,p:600},glass:false}]}
]},
{cat:'تفاعل',items:[
{label:'عجلة حظ',mk:()=>[{type:'button',text:'🎡 عجلة الحظ',x:20,y:470,w:160,h:44,bg:'rgba(15,23,42,.9)',color:'#22d3ee',border:'1px solid #22d3ee',borderRadius:10,fontSize:12,fontWeight:'bold',font:'Cairo',tf:{rx:0,ry:0,rz:0,sx:1,sy:1,p:600},glass:true}]},
{label:'محفظة',mk:()=>[{type:'button',text:'💳 محفظة',x:195,y:470,w:160,h:44,bg:'rgba(15,23,42,.9)',color:'#22d3ee',border:'1px solid #22d3ee',borderRadius:10,fontSize:12,fontWeight:'bold',font:'Cairo',tf:{rx:0,ry:0,rz:0,sx:1,sy:1,p:600},glass:true}]},
{label:'اختبار سرعة',mk:()=>[{type:'button',text:'⚡ اختبار السرعة',x:20,y:530,w:160,h:42,bg:'rgba(15,23,42,.9)',color:'#22d3ee',border:'1px solid #22d3ee',borderRadius:10,fontSize:11,fontWeight:'bold',font:'Cairo',tf:{rx:0,ry:0,rz:0,sx:1,sy:1,p:600},glass:true}]}
]},
{cat:'استعلام',items:[
{label:'حقل استعلام',mk:()=>[
{type:'text',text:'استعلام عن الكرت',x:20,y:180,w:335,h:32,fontSize:18,color:'#22d3ee',fontWeight:'bold',font:'Cairo',align:'center',bg:'transparent',borderRadius:0,tf:{rx:0,ry:0,rz:0,sx:1,sy:1,p:600},glass:false},
{type:'input',placeholder:'أدخل رقم الكرت',x:20,y:240,w:335,h:50,bg:'rgba(30,41,59,.9)',border:'1px solid #334155',borderRadius:10,fontSize:14,color:'#fff',font:'Cairo',padding:10,tf:{rx:0,ry:0,rz:0,sx:1,sy:1,p:600},glass:false},
{type:'button',text:'استعلام',x:20,y:300,w:335,h:48,bg:'#22d3ee',color:'#000',borderRadius:10,fontSize:15,fontWeight:'bold',font:'Cairo',tf:{rx:0,ry:0,rz:0,sx:1,sy:1,p:600},glass:false}]},
{label:'بطاقة نتيجة',mk:()=>[
{type:'shape',bg:'rgba(15,23,42,.9)',border:'1px solid #22d3ee',borderRadius:14,x:20,y:380,w:335,h:180,glass:true,font:'Cairo',tf:{rx:0,ry:0,rz:0,sx:1,sy:1,p:600}},
{type:'text',text:'حالة الكرت: صالح',x:30,y:395,w:315,h:25,fontSize:14,color:'#22d3ee',fontWeight:'bold',font:'Cairo',align:'right',bg:'transparent',borderRadius:0,tf:{rx:0,ry:0,rz:0,sx:1,sy:1,p:600},glass:false},
{type:'text',text:'المتبقي: 2.4 جيجا',x:30,y:430,w:315,h:22,fontSize:12,color:'#fff',font:'Cairo',align:'right',bg:'transparent',borderRadius:0,tf:{rx:0,ry:0,rz:0,sx:1,sy:1,p:600},glass:false},
{type:'text',text:'الأيام المتبقية: 5',x:30,y:458,w:315,h:22,fontSize:12,color:'#fff',font:'Cairo',align:'right',bg:'transparent',borderRadius:0,tf:{rx:0,ry:0,rz:0,sx:1,sy:1,p:600},glass:false}]}
]},
{cat:'معلومات',items:[
{label:'ساعة',mk:()=>[{type:'clock',x:20,y:40,w:335,h:30,fontSize:14,color:'#22d3ee',bg:'transparent',borderRadius:0,font:'Cairo',align:'center',tf:{rx:0,ry:0,rz:0,sx:1,sy:1,p:600},glass:false}]},
{label:'بيانات اتصال',mk:()=>[
{type:'text',text:'📞 738660998',x:20,y:600,w:335,h:20,fontSize:12,color:'#94a3b8',font:'Cairo',align:'center',bg:'transparent',borderRadius:0,tf:{rx:0,ry:0,rz:0,sx:1,sy:1,p:600},glass:false},
{type:'text',text:'✉ alwaqyhsyn752-eng@github.com',x:20,y:625,w:335,h:18,fontSize:10,color:'#94a3b8',font:'Cairo',align:'center',bg:'transparent',borderRadius:0,tf:{rx:0,ry:0,rz:0,sx:1,sy:1,p:600},glass:false}]}
]},
{cat:'إعلانات',items:[
{label:'بانر إعلاني',mk:()=>[
{type:'shape',bg:'linear-gradient(135deg,#22d3ee,#0891b2)',borderRadius:10,x:20,y:180,w:335,h:60,font:'Cairo',tf:{rx:0,ry:0,rz:0,sx:1,sy:1,p:600},glass:false},
{type:'text',text:'إعلانك هنا',x:20,y:196,w:335,h:28,fontSize:16,color:'#000',fontWeight:'bold',font:'Cairo',align:'center',bg:'transparent',borderRadius:0,tf:{rx:0,ry:0,rz:0,sx:1,sy:1,p:600},glass:false}]}
]},
{cat:'ديكور',items:[
{label:'شعار',mk:()=>[
{type:'shape',bg:'linear-gradient(135deg,#22d3ee,#0891b2)',x:157,y:80,w:60,h:60,borderRadius:999,font:'Cairo',tf:{rx:0,ry:0,rz:0,sx:1,sy:1,p:600},glass:false},
{type:'text',text:'N',x:157,y:95,w:60,h:32,fontSize:26,color:'#000',fontWeight:'bold',font:'Cairo',align:'center',bg:'transparent',borderRadius:0,tf:{rx:0,ry:0,rz:0,sx:1,sy:1,p:600},glass:false}]},
{label:'عنوان رئيسي',mk:()=>[{type:'text',text:'شبكة المستقبل',x:20,y:60,w:335,h:42,fontSize:26,color:'#22d3ee',fontWeight:'bold',font:'Cairo',align:'center',bg:'transparent',borderRadius:0,tf:{rx:0,ry:0,rz:0,sx:1,sy:1,p:600},glass:false}]},
{label:'عنوان 3D',mk:()=>[{type:'text',text:'شبكة المستقبل',x:20,y:60,w:335,h:42,fontSize:26,color:'#22d3ee',fontWeight:'bold',font:'Cairo',align:'center',bg:'transparent',borderRadius:0,tf:{rx:20,ry:-20,rz:0,sx:1,sy:1,p:800},glass:false}]}
]}
];
