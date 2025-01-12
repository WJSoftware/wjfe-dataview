var Ve=a=>{throw TypeError(a)};var We=(a,e,n)=>e.has(a)||Ve("Cannot "+n);var V=(a,e,n)=>(We(a,e,"read from private field"),n?n.call(a):e.get(a)),ee=(a,e,n)=>e.has(a)?Ve("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(a):e.set(a,n);var te=(a,e,n)=>(We(a,e,"access private method"),n);import{a as m,t as T,c as le,s as ce,b as ke,d as Ee}from"../chunks/disclose-version.DOORnJoV.js";import{ac as z,w as l,M as P,z as B,F as w,G as _,C as U,l as Ge,D as u,n as D,B as E,A as N,aF as Te,y as Fe}from"../chunks/index-client.BRZDiws4.js";import{i as de}from"../chunks/this.DT3xTMS8.js";import{b as xe,r as $,a as f,n as qe,s as Ae}from"../chunks/index.DS6b5l_X.js";import{b as ye,a as ie,G as W,d as De,f as Se,H as Pe,A as Le,N as ze,W as Me,E as Je,t as Qe,s as Be}from"../chunks/themeOptions.svelte.BCdIHQ-c.js";import{a as h,p as Ie}from"../chunks/props.Bli8FXwb.js";import"../chunks/legacy.C9u0XQK2.js";const Ue=async({fetch:a})=>{const t=await(await a("https://my.api.mockaroo.com/geosales.json?key=a53dac10")).json();return Ye(t)};function Ye(a){const e={},n=[];for(let t of a){const r=e[t.country_code]=e[t.country_code]??{country_name:t.country_name,country_code:t.country_code,quantity_sold:0,sales_amount:0,total_costs:0,total_sales:0};r.quantity_sold+=t.quantity_sold,r.sales_amount+=t.sales_amount,r.total_costs+=t.total_costs,r.total_sales+=t.total_sales;let s=n.find(o=>o.country_code===t.country_code&&o.city===t.city);s||(s={country_code:t.country_code,country_name:t.country_name,city:t.city,quantity_sold:0,sales_amount:0,total_costs:0,total_sales:0},n.push(s)),s.quantity_sold+=t.quantity_sold,s.sales_amount+=t.sales_amount,s.total_costs+=t.total_costs,s.total_sales+=t.total_sales}return{detail:a,byCity:n,byCountry:Object.keys(e).map(t=>e[t])}}const zt=Object.freeze(Object.defineProperty({__proto__:null,load:Ue},Symbol.toStringTag,{value:"Module"}));var ue;class Ke{constructor(){ee(this,ue,z(!0))}get noViewportInChildren(){return l(V(this,ue))}set noViewportInChildren(e){P(V(this,ue),h(e))}}ue=new WeakMap;const fe=new Ke;var Xe=T('<div class="px-1"><!></div>');function He(a,e){B(e,!0);var n=Xe(),t=w(n);xe(t,()=>e.children),_(n),m(a,n),U()}var pe,he;class Ze{constructor(){ee(this,pe,z(0));ee(this,he,z(h({})))}get expectedLeft(){return l(V(this,pe))}set expectedLeft(e){P(V(this,pe),h(e))}get value(){return l(V(this,he))}set value(e){P(V(this,he),h(e))}}pe=new WeakMap,he=new WeakMap;const be=["hidden","minWidth","pinned","useMinWidthAsWidth","width"];var ne,I,Oe,Ce,Re,$e;class et{constructor(){ee(this,I);ee(this,ne,[])}invalidateLayout(){te(this,I,Ce).call(this)}createProperty(e,...n){const t=Array.isArray(e)?e:[e];for(let r of t)for(let s of n)te(this,I,Re).call(this,r,s);return e}syncColumns(e,n){if(e.sync&&n.sync)throw new Error("Both columns are already synchronized.  To re-synchronize, de-syncronize one of them.");if(e.sync)n.sync=e.sync;else if(n.sync)e.sync=n.sync;else{const t=te(this,I,Oe).call(this);e.sync=t,n.sync=t}te(this,I,$e).call(this,e,n)}}ne=new WeakMap,I=new WeakSet,Oe=function(){const e=new Ze;return V(this,ne).push(e),e},Ce=function(){console.debug("Resetting expectedLeft on %d synchronizers...",V(this,ne).length);for(let e of V(this,ne))e.expectedLeft=0},Re=function(e,n){let t=z(h(e[n]));delete e[n];const r=be.includes(n)?()=>te(this,I,Ce).call(this):void 0;Object.defineProperty(e,n,{get(){var s;return((s=this.sync)==null?void 0:s.value[n])??l(t)},set(s){const o=s!==this[n];this.sync&&(this.sync.value[n]=s),P(t,h(s)),o&&(r==null||r())},enumerable:!0,configurable:!0}),e.syncProps??(e.syncProps=[]),e.syncProps.push(n)},$e=function(e,n){var t;if(!((t=e.syncProps)!=null&&t.length))throw new Error("The column has no synchronizable properties.");for(let r of e.syncProps)n[r]=e[r]};const ae=new Intl.NumberFormat(navigator==null?void 0:navigator.language,{style:"currency",currency:"USD",currencyDisplay:"narrowSymbol"});function re(a){return new Intl.NumberFormat(navigator==null?void 0:navigator.language,{style:"decimal",minimumFractionDigits:a,maximumFractionDigits:a})}const tt=new Intl.NumberFormat(navigator==null?void 0:navigator.language,{style:"percent",minimumFractionDigits:0,maximumFractionDigits:2}),J=new et,ve=h(J.createProperty([{key:"country",text:"Country",alignment:"start",get:nt,pinnedFunctions:{}},{key:"sales_amount",text:"Total Amount",alignment:"end",dataType:"real-amount",numberFormatter:re(2),pinnedFunctions:{},width:11},{key:"quantity_sold",text:"Total Quantity",alignment:"end",dataType:"int-amount",numberFormatter:re(0),pinnedFunctions:{}},{key:"total_sales",text:"Total Sales",alignment:"end",dataType:"currency",numberFormatter:ae,pinnedFunctions:{},width:10},{key:"total_costs",text:"Total Costs",alignment:"end",dataType:"currency",numberFormatter:ae,pinnedFunctions:{}}],...be,"pinnedFunctions")),we=h(J.createProperty([{key:"city",text:"City",alignment:"start",dataType:"string",pinnedFunctions:{}},{key:"sales_amount",text:"Total Amount",alignment:"end",dataType:"real-amount",numberFormatter:re(2),pinnedFunctions:{}},{key:"quantity_sold",text:"Total Quantity",alignment:"end",dataType:"int-amount",numberFormatter:re(0),pinnedFunctions:{}},{key:"total_sales",text:"Total Sales",alignment:"end",dataType:"currency",numberFormatter:ae,pinnedFunctions:{}},{key:"total_costs",text:"Total Costs",alignment:"end",dataType:"currency",numberFormatter:ae,pinnedFunctions:{}}],...be,"pinnedFunctions")),_e=h(J.createProperty([{key:"id",text:"ID",alignment:"start",pinnedFunctions:{}},{key:"country_code",text:"Country Code",alignment:"start",pinnedFunctions:{}},{key:"country_name",text:"Country",alignment:"start",pinnedFunctions:{}},{key:"city",text:"City",alignment:"start",pinnedFunctions:{}},{key:"month",text:"Month",alignment:"start",pinnedFunctions:{}},{key:"year",text:"Year",alignment:"start",pinnedFunctions:{}},{key:"sales_amount",text:"Sales Amount",dataType:"real-amount",numberFormatter:re(2),alignment:"end",pinnedFunctions:{}},{key:"product_category",text:"Product Category",width:12,alignment:"start",pinnedFunctions:{}},{key:"quantity_sold",text:"Quantity Sold",dataType:"int-amount",numberFormatter:re(0),alignment:"end",pinnedFunctions:{}},{key:"total_sales",text:"Total Sales",dataType:"currency",numberFormatter:ae,alignment:"end",pinnedFunctions:{}},{key:"total_costs",text:"Total Costs",dataType:"currency",numberFormatter:ae,alignment:"end",pinnedFunctions:{}},{key:"top_client",text:"Top Client",alignment:"start",pinnedFunctions:{}},{key:"top_client_fraction",text:"Top Client Fraction",width:13,dataType:"real-amount",numberFormatter:tt,alignment:"center",pinnedFunctions:{}}],...be,"pinnedFunctions")),S={master:ve,byCity:we,detailed:_e};J.syncColumns(ve[1],we[1]);J.syncColumns(ve[3],we[3]);J.syncColumns(ve[1],_e[6]);J.syncColumns(ve[3],_e[9]);J.syncColumns(we[0],_e[3]);function nt(a){return`${a.country_name} (${a.country_code})`}var at=T('<button type="button" class="btn btn-sm btn-info" title="Click to show additional information" aria-label="Click to show additional information" data-bs-toggle="offcanvas"><i class="bi bi-info-circle"></i></button>'),rt=T('<div class="btn-toolbar my-2 py-1 px-1 gap-2 border border-1 rounded"><!> <div class="input-group input-group-sm"><span class="input-group-text" title="Row Options:"><i class="bi bi-list-check"></i></span> <div class="btn-group btn-group-sm"><input type="checkbox" class="btn-check"> <label class="btn btn-outline-primary rounded-0">Striped</label> <input type="checkbox" class="btn-check"> <label class="btn btn-outline-primary">Row Tracking</label> <input type="checkbox" class="btn-check"> <label class="btn btn-outline-primary">Selection Highlight</label></div></div> <div class="input-group input-group-sm"><span title="Borders:" class="input-group-text"><i class="bi bi-border-all"></i></span> <div class="btn-group btn-group-sm"><input type="checkbox" class="btn-check"> <label class="btn btn-outline-primary rounded-0" title="Row borders"><i class="bi bi-border-bottom"></i></label> <input type="checkbox" class="btn-check"> <label class="btn btn-outline-primary" title="Column borders"><i class="bi bi-border-right"></i></label></div></div> <div class="input-group input-group-sm"><span title="Filler Pattern:" class="input-group-text"><i class="bi bi-sign-dead-end-fill"></i></span> <div class="btn-group btn-group-sm"><input type="radio" class="btn-check"> <label class="btn btn-outline-primary rounded-0" title="Checkered">Checkered</label> <input type="radio" class="btn-check"> <label class="btn btn-outline-primary" title="Triangles">Triangles</label> <input type="radio" class="btn-check"> <label class="btn btn-outline-primary" title="Diagonals">Diagonals</label></div></div> <!></div>');function ot(a,e){B(e,!0);const n=[],t=[];let r=Ie(e,"options",15),s=z(h([]));const o=qe();Ge(()=>{r(r().gridLines=l(s).reduce((g,me)=>g|me,W.None),!0)});var F=rt(),Q=w(F);{var O=g=>{var me=at();E(()=>f(me,"data-bs-target",`#${e.moreInfoTarget??""}`)),m(g,me)};de(Q,g=>{e.moreInfoTarget&&g(O)})}var v=u(Q,2),y=u(w(v),2),d=w(y);$(d),f(d,"id",`${o??""}_striped`);var p=u(d,2);f(p,"for",`${o??""}_striped`);var b=u(p,2);$(b),f(b,"id",`${o??""}_rowTracking`);var Y=u(b,2);f(Y,"for",`${o??""}_rowTracking`);var H=u(Y,2);$(H),f(H,"id",`${o??""}_rowSelectionHighlight`);var K=u(H,2);f(K,"for",`${o??""}_rowSelectionHighlight`),_(y),_(v);var C=u(v,2),j=u(w(C),2),c=w(j);$(c),f(c,"id",`${o??""}_rowGridLine`);var i,R=u(c,2);f(R,"for",`${o??""}_rowGridLine`);var L=u(R,2);$(L),f(L,"id",`${o??""}_colGridLine`);var G,oe=u(L,2);f(oe,"for",`${o??""}_colGridLine`),_(j),_(C);var se=u(C,2),ge=u(w(se),2),k=w(ge);$(k),f(k,"id",`${o??""}_fillerPatternCheckered`),k.value=(k.__value="checkered")==null?"":"checkered";var q=u(k,2);f(q,"for",`${o??""}_fillerPatternCheckered`);var x=u(q,2);$(x),f(x,"id",`${o??""}_fillerPatternTriangles`),x.value=(x.__value="triangles")==null?"":"triangles";var X=u(x,2);f(X,"for",`${o??""}_fillerPatternTriangles`);var A=u(X,2);$(A),f(A,"id",`${o??""}_fillerPatternDiagonals`),A.value=(A.__value="diagstriped")==null?"":"diagstriped";var M=u(A,2);f(M,"for",`${o??""}_fillerPatternDiagonals`),_(ge),_(se);var Z=u(se,2);xe(Z,()=>e.children??D),_(F),E(()=>{i!==(i=W.Row)&&(c.value=(c.__value=W.Row)==null?"":W.Row),G!==(G=W.Column)&&(L.value=(L.__value=W.Column)==null?"":W.Column)}),ye(d,()=>r().striping,g=>r(r().striping=g,!0)),ye(b,()=>r().rowTracking,g=>r(r().rowTracking=g,!0)),ye(H,()=>r().rowSelectionHighlight,g=>r(r().rowSelectionHighlight=g,!0)),ie(n,[],c,()=>l(s),g=>P(s,g)),ie(n,[],L,()=>l(s),g=>P(s,g)),ie(t,[],k,()=>r().fillerPattern,g=>r(r().fillerPattern=g,!0)),ie(t,[],x,()=>r().fillerPattern,g=>r(r().fillerPattern=g,!0)),ie(t,[],A,()=>r().fillerPattern,g=>r(r().fillerPattern=g,!0)),m(a,F),U()}var st=T('<div class="d-flex flex-column flex-nowrap"><!> <div class="title fw-bold px-2 py-1 rounded-start svelte-pyu8kv"> </div></div>');function je(a,e){B(e,!0);let n=Ie(e,"dvOptions",15);var t=st(),r=w(t);ot(r,{get moreInfoTarget(){return e.moreInfoTarget},get options(){return n()},set options(F){n(F)},children:(F,Q)=>{var O=le(),v=N(O);xe(v,()=>e.children??D),m(F,O)},$$slots:{default:!0}});var s=u(r,2),o=w(s,!0);_(s),_(t),E(()=>ce(o,e.title)),m(a,t),U()}var it=T('<!> <hr class="border-3">',1);function lt(a,e){B(e,!0);let n=z(h(De(e.sourceData.detail.filter(o=>o.country_code===e.countryCode&&o.city===e.city)))),t=z(h({gridLines:W.None,rowSelectionHighlight:!0,rowTracking:!0,striping:!0,fillerPattern:"diagstriped"}));var r=it(),s=N(r);Se(s,{get noViewport(){return fe.noViewportInChildren},get rowTracking(){return l(t).rowTracking},get rowSelectionHighlight(){return l(t).rowSelectionHighlight},get striped(){return l(t).striping},get gridLines(){return l(t).gridLines},get fillerPattern(){return l(t).fillerPattern},defaultWidth:12,controlColumn:{pinnedFunctions:{},alignment:"start",width:3,resizable:!1},class:"mb-5",get columns(){return S.detailed},set columns(v){S.detailed=v},get data(){return l(n)},set data(v){P(n,h(v))},caption:v=>{je(v,{get title(){return`Raw Data: ${e.city??""}`},moreInfoTarget:"thirdLevelCanvas",get dvOptions(){return l(t)},set dvOptions(y){P(t,h(y))}})},headerCell:(v,y=D)=>{Pe(v,{get col(){return y().col},set col(d){y().col=d}})},controlHeaderCell:v=>{Le(v,{get columns(){return S.detailed},set columns(y){S.detailed=y}})},dataCell:(v,y=D)=>{He(v,{children:(d,p)=>{var b=le(),Y=N(b);{var H=C=>{var j=Fe(()=>y().getFn(y().row));ze(C,{get value(){return l(j)},get formatter(){return y().col.numberFormatter}})},K=C=>{var j=ke();E(()=>ce(j,y().getFn(y().row))),m(C,j)};de(Y,C=>{y().col.numberFormatter?C(H):C(K,!1)})}m(d,b)},$$slots:{default:!0}})},$$slots:{caption:!0,headerCell:!0,controlHeaderCell:!0,dataCell:!0}}),Te(2),m(a,r),U()}var ct=(a,e)=>e(e().wjdv.expanded=!e().wjdv.expanded,!0),dt=T('<button type="button" class="btn btn-neutral btn-sm"><i></i></button>');function Ne(a,e){B(e,!0);let n=Ie(e,"row",15);var t=dt();t.__click=[ct,n];var r=w(t);_(t),E(()=>{f(t,"aria-label",n().wjdv.expanded?"contract":"expand"),Ae(r,`bi bi-chevron-bar-${(n().wjdv.expanded?"contract":"expand")??""}`)}),m(a,t),U()}Ee(["click"]);var ut=T('<!> <hr class="border-3">',1);function pt(a,e){B(e,!0);let n=z(h(De(e.sourceData.byCity.filter(o=>o.country_code===e.countryCode),o=>`${o.country_code}_${o.city}`))),t=z(h({gridLines:W.None,rowSelectionHighlight:!0,rowTracking:!0,striping:!0,fillerPattern:"diagstriped"}));var r=ut(),s=N(r);Se(s,{get noViewport(){return fe.noViewportInChildren},get rowTracking(){return l(t).rowTracking},get rowSelectionHighlight(){return l(t).rowSelectionHighlight},get striped(){return l(t).striping},get gridLines(){return l(t).gridLines},get fillerPattern(){return l(t).fillerPattern},defaultWidth:12,controlColumn:{width:3,alignment:"center",resizable:!1,pinnedFunctions:{}},class:"mb-5",style:"z-index: 5",get columns(){return S.byCity},set columns(d){S.byCity=d},get data(){return l(n)},set data(d){P(n,h(d))},caption:d=>{je(d,{get title(){return`Per-City Summary: ${e.countryName??""}`},moreInfoTarget:"secondLevelCanvas",get dvOptions(){return l(t)},set dvOptions(p){P(t,h(p))}})},headerCell:(d,p=D)=>{Pe(d,{get col(){return p().col},set col(b){p().col=b}})},dataCell:(d,p=D)=>{He(d,{children:(b,Y)=>{var H=le(),K=N(H);{var C=c=>{var i=Fe(()=>p().getFn(p().row));ze(c,{get value(){return l(i)},get formatter(){return p().col.numberFormatter}})},j=c=>{var i=ke();E(()=>ce(i,p().getFn(p().row))),m(c,i)};de(K,c=>{p().col.dataType!=="string"?c(C):c(j,!1)})}m(b,H)},$$slots:{default:!0}})},controlHeaderCell:d=>{Le(d,{get columns(){return S.byCity},set columns(p){S.byCity=p}})},controlDataCell:(d,p=D)=>{Ne(d,{get row(){return p().row},set row(b){p().row=b}})},rowExpansion:(d,p=D)=>{lt(d,{get sourceData(){return e.sourceData},get countryCode(){return e.countryCode},get city(){return p().row.city}})},$$slots:{caption:!0,headerCell:!0,dataCell:!0,controlHeaderCell:!0,controlDataCell:!0,rowExpansion:!0}}),Te(2),m(a,r),U()}function ht(){const a={};return a.gridLines=W.None,a.rowSelectionHighlight=!0,a.rowTracking=!0,a.striping=!0,a.fillerPattern="diagstriped",a}var vt=T(`<div class="offcanvas offcanvas-end bg-info bg-glass svelte-1i880sp" id="firstLevelCanvas" data-bs-backdrop="false"><div class="offcanvas-header"><h3 class="offcanvas-title">Worldwide Sales Rollup Demo</h3></div> <div class="offcanvas-body"><p>This table shows the rolled-up summary of (ficticious) sales data.  The record feed is random and courtesy 
            of <a href="https://www.mockaroo.com" target="_blank">Mockaroo</a>.  The original records can be seen at 
            the third level.</p> <p>The toolbar above the table can be used to turn <span class="code svelte-1i880sp">WjDataView</span>'s features on and 
            off.  As data is drilled down, more toolbars will appear for the additional <span class="code svelte-1i880sp">WjDataView</span> components that show the more detailed data.</p> <h4>Drilldown Features</h4> <p>Currently there is one significant feature that effects how users experience data drilldown using <span class="code svelte-1i880sp">WjDataView</span>:  The <span class="code svelte-1i880sp">noViewport</span> property.</p> <p>Instances of <span class="code svelte-1i880sp">WjDataView</span> provide their own viewport.  The viewport is the 
            container in charge of providing horizontal and vertical scrollbars to the component so all data can be 
            examined.  Furthermore, the header row is configured to be sticky.  This means that the header row will 
            "stick" to the viewport when said viewport is scrolled vertically.</p> <p>But what happens when the viewport disappears?  The header row will now stick to the next available 
            viewport, and that's the viewport of the parent <span class="code svelte-1i880sp">WjDataView</span> component.  The net 
            result is that the header row of child <span class="code svelte-1i880sp">WjDataView</span> components are now in the 
            position of overlapping the parent's header row.</p> <h5>How To Experience the effect of <span class="code svelte-1i880sp">noViewport</span>?</h5> <p>Simply expand a row or rows until the vertical scrollbar has enough room to make the the header row of a 
            child <span class="code svelte-1i880sp">WjDataView</span> component reach the top of the parent's viewport.</p> <p>In order to experience the difference, the "no viewport" setting can be turned off by using the top 
            toolbar.  The option is the button with the <i class="bi bi-eye-slash"></i> icon.</p></div></div>`);function gt(a){var e=vt();m(a,e)}var mt=T(`<div class="offcanvas offcanvas-end bg-info bg-glass svelte-1i880sp" id="secondLevelCanvas" data-bs-backdrop="false"><div class="offcanvas-header"><h3 class="offcanvas-title">Worldwide Sales Rollup Demo</h3></div> <div class="offcanvas-body"><p>This is a second-level <span class="code svelte-1i880sp">WjDataView</span> component.  It shows the same information as 
            the first level, but rolled up to city, not country.</p> <p>Feel free to scroll up and down and turn table features on and off.  Do you have an idea or suggestion to 
            make things better?  Stop by the <a href="https://github.com/WJSoftware/wjfe-dataview/issues" target="_blank">project's issues page</a> and open a new issue.</p></div></div>`);function yt(a){var e=mt();m(a,e)}var ft=T(`<div class="offcanvas offcanvas-end bg-info bg-glass svelte-1i880sp" id="thirdLevelCanvas" data-bs-backdrop="false"><div class="offcanvas-header"><h3 class="offcanvas-title">Worldwide Sales Rollup Demo</h3></div> <div class="offcanvas-body"><p>This is the third and last level of data.  It shows the raw records obtained from the mocking service, <a href="https://www.mockaroo.com" target="_blank">Mockaroo</a>.</p> <p>This demo queries for this raw data in Sveltekit's <span class="code svelte-1i880sp">+page.ts</span> code file, and then 
            calculates the rollups.</p> <p>Would you like to experiment a bit?  Simply for the project, then run <span class="code svelte-1i880sp">npm ci</span>, 
            and then run <span class="code svelte-1i880sp">npm run dev</span>.  The sales demo page is at <span class="code svelte-1i880sp">/routes/sales</span>.  For example, you could try rolling the data up differently, say, 
            by customer or by product category.  You could also create an alternative data feed, either from real data 
            or faked data.</p> <p class="display-6 text-center mt-5">Don't forget to give the project a star on <a href="https://github.com/WJSoftware/wjfe-dataview" target="_blank">GitHub&nbsp;<i class="bi bi-github"></i></a>!</p></div></div>`);function bt(a){var e=ft();m(a,e)}var wt=T('<div class="input-group input-group-sm"><span class="input-group-text" title="Drilldown:"><i class="bi bi-bar-chart-steps"></i></span> <input type="checkbox" id="noViewportInChildren" class="btn-check"> <label for="noViewportInChildren" class="btn btn-outline-primary btn-sm" title="No viewports in children"><i class="bi bi-eye-slash"></i></label></div>'),_t=T(`<img alt="Country's flag"> `,1),Ct=T(`<hgroup class="mb-3"><h1>WjDataView Demo</h1> <h4>Worldwide Sales Data Rollup</h4></hgroup> <div class="row gy-3"><div class="col-md-3"><div class="card h-100"><div class="card-header">Data Drilldown</div> <div class="card-body"><p>This demo shows a drilldown from a global overview of sales data to a detailed view by city. Click
                    on the <i class="bi bi-chevron-bar-expand"></i> icon in the first column to drill down to the next level.</p></div></div></div> <div class="col-md-9"><div class="card h-100"><div class="card-header">Cross Column Synchronization</div> <div class="card-body"><h5 class="text-success"><i class="bi bi-star-fill"></i> New!!</h5> <p>This demo showcases the new <span class="border border-info px-2 rounded fw-semibold">Cross Column Synchronization</span> feature, available since <span class="fw-bold">v0.13.0</span>.</p> <details><summary><span class="text-primary fw-bold">Learn more...</span></summary> <p>The columns whose header has a red underline are synchronized with at least one other column.
                        When you resize one of these columns, the other columns will resize as well. Pinning and hiding
                        is also synchronized.</p> <p>However, the most interesting part of synchroinization is the ability of the columns to keep
                        their horizontal position synchronized across all levels of the drilldown. Try it out!</p> <ol><li>Drill down to the next level.</li> <li>Resize any column, synchronized or not.</li> <li>Pin, hide or show any columns.</li> <li>Repeat for the next level.</li></ol> <p>The columns <span class="fw-semibold">Total Amount</span> and <span class="fw-semibold">Total Sales</span> are synchronized to the same columns in the other 2 levels; the columns <span class="fw-semibold">City</span> in the second level and third level are synchronized with each other.</p></details></div></div></div></div> <div class="d-flex flex-column flex-fill"><div class="flex-fill position-relative"><!> <!></div></div> <!> <!> <!>`,1);function It(a,e){B(e,!0);let n=z(h(ht())),t=z(h(De(e.data.byCountry,d=>d.country_code)));var r=Ct(),s=u(N(r),4),o=w(s),F=w(o);Me(F,{get theme(){return Qe.currentTheme},children:(d,p)=>{Se(d,{get striped(){return l(n).striping},get rowTracking(){return l(n).rowTracking},get rowSelectionHighlight(){return l(n).rowSelectionHighlight},get gridLines(){return l(n).gridLines},get fillerPattern(){return l(n).fillerPattern},defaultWidth:15,class:"position-absolute top-0 bottom-0",controlColumn:{width:3,resizable:!1,alignment:"center",pinnedFunctions:{}},style:"z-index: 5",get columns(){return S.master},set columns(c){S.master=c},get data(){return l(t)},set data(c){P(t,h(c))},caption:c=>{je(c,{title:"Global Overview",moreInfoTarget:"firstLevelCanvas",get dvOptions(){return l(n)},set dvOptions(i){P(n,h(i))},children:(i,R)=>{var L=wt(),G=u(w(L),2);$(G),Te(2),_(L),ye(G,()=>fe.noViewportInChildren,oe=>fe.noViewportInChildren=oe),m(i,L)},$$slots:{default:!0}})},controlHeaderCell:c=>{Le(c,{get columns(){return S.master},set columns(i){S.master=i}})},controlDataCell:(c,i=D)=>{Ne(c,{get row(){return i().row},set row(R){i().row=R}})},rowExpansion:(c,i=D)=>{pt(c,{get sourceData(){return e.data},get countryCode(){return i().row.country_code},get countryName(){return i().row.country_name}})},headerCell:(c,i=D)=>{Pe(c,{get col(){return i().col},set col(R){i().col=R}})},dataCell:(c,i=D)=>{He(c,{children:(R,L)=>{var G=le(),oe=N(G);{var se=k=>{var q=_t(),x=N(q),X=u(x);E(()=>ce(X,` ${i().getFn(i().row)??""}`)),E(()=>{f(x,"src",`https://countryflagsapi.netlify.app/flag/${i().row.country_code??""}.svg`),Be(x,"height","1em")}),m(k,q)},ge=k=>{var q=le(),x=N(q);{var X=M=>{var Z=Fe(()=>i().getFn(i().row));ze(M,{get value(){return l(Z)},get formatter(){return i().col.numberFormatter}})},A=M=>{var Z=ke();E(()=>ce(Z,i().getFn(i().row))),m(M,Z)};de(x,M=>{i().col.dataType!=="string"?M(X):M(A,!1)},!0)}m(k,q)};de(oe,k=>{i().col.key==="country"?k(se):k(ge,!1)})}m(R,G)},$$slots:{default:!0}})},$$slots:{caption:!0,controlHeaderCell:!0,controlDataCell:!0,rowExpansion:!0,headerCell:!0,dataCell:!0}})},$$slots:{default:!0}});var Q=u(F,2);Je(Q,{editUrl:"https://github.com/WJSoftware/wjfe-dataview/blob/main/src/routes/sales/%2Bpage.svelte"}),_(o),_(s);var O=u(s,2);gt(O);var v=u(O,2);yt(v);var y=u(v,2);bt(y),m(a,r),U()}export{It as component,zt as universal};
