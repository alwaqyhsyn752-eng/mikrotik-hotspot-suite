function uid(){return 'e_'+Math.random().toString(36).substr(2,9);}
function E(o){return Object.assign({
  id:uid(),type:'text',x:20,y:20,w:200,h:40,text:'نص',
  fontSize:16,color:'#ffffff',bg:'transparent',borderRadius:8,border:'none',
  padding:8,fontWeight:'normal',align:'center',src:'',inputType:'text',placeholder:''
},o||{});}

const ELEMENTS=[
  {label:'نص',make:()=>E({text:'نص جديد',y:100})},
  {label:'زر',make:()=>E({type:'button',text:'زر',bg:'#22d3ee',color:'#000000',y:150,fontWeight:'bold'})},
  {label:'حقل إدخال',make:()=>E({type:'input',placeholder:'أدخل نصاً',bg:'#1e293b',border:'1px solid #334155',y:200})},
  {label:'صورة',make:()=>E({type:'image',src:'',bg:'#1e293b',y:250,h:150})},
  {label:'أيقونة',make:()=>E({type:'icon',text:'★',fontSize:48,y:300,w:60,h:60})},
  {label:'دائرة',make:()=>E({type:'shape',bg:'#22d3ee',borderRadius:999,y:350,w:80,h:80})},
  {label:'مستطيل',make:()=>E({type:'shape',bg:'#0f172a',border:'1px solid #334155',borderRadius:12,y:400,w:200,h:80})},
  {label:'QR',make:()=>E({type:'qr',text:'https://example.com',bg:'#ffffff',color:'#000000',y:450,w:120,h:120})},
  {label:'ساعة',make:()=>E({type:'clock',y:50,w:200,h:30,fontSize:14,color:'#22d3ee'})},
  {label:'فاصل',make:()=>E({type:'shape',bg:'#334155',borderRadius:2,y:500,w:300,h:2})},
  {label:'إطار',make:()=>E({type:'shape',bg:'transparent',border:'2px solid #22d3ee',borderRadius:16,y:520,w:300,h:100})}
];

const FEATURES=[
  {cat:'تسجيل الدخول',items:[
    {label:'نموذج دخول بسيط',make:()=>[
      E({type:'input',placeholder:'رقم الكرت',x:20,y:260,w:335,h:48,bg:'#1e293b',border:'1px solid #334155'}),
      E({type:'input',placeholder:'كلمة المرور',inputType:'password',x:20,y:318,w:335,h:48,bg:'#1e293b',border:'1px solid #334155'}),
      E({type:'button',text:'دخول',x:20,y:376,w:335,h:48,bg:'#22d3ee',color:'#000',fontWeight:'bold',fontSize:16})
    ]},
    {label:'نموذج فاخر',make:()=>[
      E({type:'shape',bg:'rgba(15,23,42,.7)',border:'1px solid #22d3ee',borderRadius:20,x:20,y:240,w:335,h:220}),
      E({type:'text',text:'تسجيل الدخول',x:20,y:255,w:335,h:30,fontSize:18,color:'#22d3ee',fontWeight:'bold'}),
      E({type:'input',placeholder:'رقم الكرت',x:35,y:300,w:305,h:42,bg:'#020617',border:'1px solid #334155'}),
      E({type:'input',placeholder:'كلمة المرور',inputType:'password',x:35,y:352,w:305,h:42,bg:'#020617',border:'1px solid #334155'}),
      E({type:'button',text:'دخول',x:35,y:404,w:305,h:42,bg:'#22d3ee',color:'#000',fontWeight:'bold'})
    ]}
  ]},
  {cat:'الأسعار والكروت',items:[
    {label:'عرض سعر 5GB',make:()=>[
      E({type:'shape',bg:'#0f172a',border:'2px solid #22d3ee',borderRadius:14,x:20,y:300,w:160,h:120}),
      E({type:'text',text:'5 جيجا',x:20,y:310,w:160,h:30,fontSize:20,color:'#22d3ee',fontWeight:'bold'}),
      E({type:'text',text:'500 ريال / 7 أيام',x:20,y:345,w:160,h:25,fontSize:12,color:'#94a3b8'}),
      E({type:'button',text:'اشترِ',x:30,y:380,w:140,h:32,bg:'#22d3ee',color:'#000',fontWeight:'bold',fontSize:13})
    ]},
    {label:'زر استعلام كرت',make:()=>[
      E({type:'button',text:'استعلام عن الكرت',x:20,y:450,w:335,h:42,bg:'transparent',color:'#22d3ee',border:'1px solid #22d3ee'})
    ]},
    {label:'جدول أسعار',make:()=>[
      E({type:'text',text:'الأسعار',x:20,y:200,w:335,h:30,fontSize:18,color:'#22d3ee',fontWeight:'bold'}),
      E({type:'shape',bg:'#0f172a',border:'1px solid #334155',borderRadius:10,x:20,y:240,w:160,h:80}),
      E({type:'text',text:'5GB - 500',x:20,y:250,w:160,h:20,fontSize:13,color:'#fff'}),
      E({type:'shape',bg:'#0f172a',border:'1px solid #334155',borderRadius:10,x:195,y:240,w:160,h:80}),
      E({type:'text',text:'10GB - 900',x:195,y:250,w:160,h:20,fontSize:13,color:'#fff'})
    ]}
  ]},
  {cat:'الترفيه',items:[
    {label:'زر القرآن',make:()=>[E({type:'button',text:'القرآن الكريم',x:20,y:500,w:160,h:42,bg:'#0f172a',color:'#22d3ee',border:'1px solid #22d3ee'})]},
    {label:'زر الألعاب',make:()=>[E({type:'button',text:'ألعاب',x:195,y:500,w:160,h:42,bg:'#0f172a',color:'#22d3ee',border:'1px solid #22d3ee'})]},
    {label:'مشغل قرآن',make:()=>[
      E({type:'shape',bg:'#0f172a',border:'1px solid #22d3ee',borderRadius:12,x:20,y:400,w:335,h:70}),
      E({type:'text',text:'قارئ: مشاري العفاسي',x:35,y:410,w:305,h:20,fontSize:12,color:'#22d3ee'}),
      E({type:'button',text:'▶ تشغيل',x:35,y:435,w:305,h:28,bg:'#22d3ee',color:'#000',fontSize:12,fontWeight:'bold'})
    ]}
  ]},
  {cat:'تفاعل',items:[
    {label:'عجلة الحظ',make:()=>[E({type:'button',text:'🎡 عجلة الحظ',x:20,y:470,w:160,h:42,bg:'#0f172a',color:'#22d3ee',border:'1px solid #22d3ee'})]},
    {label:'محفظة الكروت',make:()=>[E({type:'button',text:'محفظة',x:195,y:470,w:160,h:42,bg:'#0f172a',color:'#22d3ee',border:'1px solid #22d3ee'})]},
    {label:'زر مسابقة',make:()=>[E({type:'button',text:'مسابقة اليوم',x:20,y:530,w:335,h:40,bg:'#0f172a',color:'#22d3ee',border:'1px dashed #22d3ee'})]}
  ]},
  {cat:'أدوات',items:[
    {label:'اختبار سرعة',make:()=>[E({type:'button',text:'اختبار السرعة',x:20,y:550,w:160,h:38,bg:'#0f172a',color:'#22d3ee',border:'1px solid #22d3ee'})]},
    {label:'حالة الاستهلاك',make:()=>[E({type:'button',text:'الاستهلاك',x:195,y:550,w:160,h:38,bg:'#0f172a',color:'#22d3ee',border:'1px solid #22d3ee'})]}
  ]},
  {cat:'معلومات',items:[
    {label:'ساعة وتاريخ',make:()=>[E({type:'clock',x:20,y:40,w:335,h:30,fontSize:14,color:'#22d3ee'})]},
    {label:'بيانات الاتصال',make:()=>[
      E({type:'text',text:'📞 738660998',x:20,y:600,w:335,h:20,fontSize:12,color:'#94a3b8'}),
      E({type:'text',text:'✉ alwaqyhsyn752-eng@github.com',x:20,y:625,w:335,h:20,fontSize:11,color:'#94a3b8'})
    ]},
    {label:'روابط تواصل',make:()=>[
      E({type:'button',text:'واتساب',x:20,y:560,w:100,h:32,bg:'#0f172a',color:'#22d3ee',border:'1px solid #22d3ee',fontSize:11}),
      E({type:'button',text:'تلغرام',x:135,y:560,w:100,h:32,bg:'#0f172a',color:'#22d3ee',border:'1px solid #22d3ee',fontSize:11}),
      E({type:'button',text:'فيسبوك',x:250,y:560,w:100,h:32,bg:'#0f172a',color:'#22d3ee',border:'1px solid #22d3ee',fontSize:11})
    ]}
  ]},
  {cat:'إعلانات',items:[
    {label:'بانر إعلاني',make:()=>[
      E({type:'shape',bg:'linear-gradient(135deg,#22d3ee,#0891b2)',borderRadius:10,x:20,y:180,w:335,h:60}),
      E({type:'text',text:'إعلانك هنا',x:20,y:195,w:335,h:30,fontSize:16,color:'#000',fontWeight:'bold'})
    ]},
    {label:'مساحة إعلانية كبيرة',make:()=>[
      E({type:'shape',bg:'#0f172a',border:'1px dashed #334155',borderRadius:10,x:20,y:150,w:335,h:120}),
      E({type:'text',text:'مساحة إعلانية',x:20,y:200,w:335,h:30,fontSize:14,color:'#94a3b8'})
    ]}
  ]},
  {cat:'ديكور',items:[
    {label:'شعار مكان',make:()=>[
      E({type:'shape',bg:'#22d3ee',borderRadius:999,x:157,y:80,w:60,h:60}),
      E({type:'text',text:'N',x:157,y:95,w:60,h:30,fontSize:28,color:'#000',fontWeight:'bold'})
    ]},
    {label:'آية قرآنية',make:()=>[E({type:'text',text:'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ',x:20,y:20,w:335,h:25,fontSize:13,color:'#22d3ee'})]},
    {label:'عنوان رئيسي',make:()=>[E({type:'text',text:'شبكة المستقبل',x:20,y:60,w:335,h:40,fontSize:24,color:'#22d3ee',fontWeight:'bold'})]}
  ]}
];

const BG_COLORS=['#020617','#0f172a','#1e1b4b','#1a2e05','#450a0a','#1c1917','#0c4a6e','#14532d','#3b0764','#7c2d12','#083344','#365314','#581c87','#7f1d1d','#171717','#000000','#ffffff','#f8fafc'];
const BG_GRADIENTS=[
  'linear-gradient(135deg,#020617,#1e1b4b)',
  'linear-gradient(135deg,#0f172a,#22d3ee)',
  'linear-gradient(135deg,#4c1d95,#c084fc)',
  'linear-gradient(135deg,#064e3b,#34d399)',
  'linear-gradient(135deg,#7c2d12,#fbbf24)',
  'linear-gradient(135deg,#581c87,#e879f9)',
  'linear-gradient(45deg,#0f172a,#22d3ee,#0f172a)',
  'linear-gradient(180deg,#020617,#0891b2)',
  'radial-gradient(circle,#0f172a,#020617)',
  'linear-gradient(135deg,#000000,#333333)',
  'linear-gradient(135deg,#1e293b,#64748b)',
  'linear-gradient(135deg,#450a0a,#fb7185)'
];
