import{l as Se,G as B,d as je,e as pe,b as Z,a as ne,t as fe,g as $e,c as be,W as De,E as qe,f as Re,N as He}from"../chunks/themeOptions.svelte.L3gI9O9D.js";import{i as Le,a as Q}from"../chunks/props.BKMiv4-i.js";import{c as a,s as e,a as y,t as C,r as t,o as se,f as We,b as ie,n as Oe,p as ze}from"../chunks/disclose-version.nVD1GsKE.js";import{l as he,p as ge,a as we,t as F,f as ke,N as g,B as re,g as I,z as ue,u as Ge,n as ae,I as me}from"../chunks/runtime.DkqSkKrO.js";import{i as Ie}from"../chunks/this.CejIyEeZ.js";import{r as H,a as oe,d as Ve,e as Ne,s as _e}from"../chunks/index.C6iX3467.js";import{s as Ee,a as Pe}from"../chunks/store.DvkKOton.js";import{g as Be}from"../chunks/entry.CqJLIjjn.js";import{b as Fe}from"../chunks/paths.DHGntW90.js";import{p as Me}from"../chunks/stores.eZgNM1yc.js";function xe(r,i,u){if(r.multiple)return Je(r,i);for(var d of r.options){var c=K(d);if(Le(c,i)){d.selected=!0;return}}(!u||i!==void 0)&&(r.selectedIndex=-1)}function Ue(r,i){he(()=>{var u=new MutationObserver(()=>{var d=r.__value;xe(r,d)});return u.observe(r,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["value"]}),()=>{u.disconnect()}})}function Ae(r,i,u){var d=!0;Se(r,"change",()=>{var c;if(r.multiple)c=[].map.call(r.querySelectorAll(":checked"),K);else{var _=r.querySelector(":checked");c=_&&K(_)}u(c)}),he(()=>{var c=i();if(xe(r,c,d),d&&c===void 0){var _=r.querySelector(":checked");_!==null&&(c=K(_),u(c))}r.__value=c,d=!1}),Ue(r)}function Je(r,i){for(var u of r.options)u.selected=~i.indexOf(K(u))}function K(r){return"__value"in r?r.__value:r.value}const s=Q({striped:!0,rowTracking:!0,rowSelectionHighlight:!0,records:200,grid_lines:[],get gridLines(){return this.grid_lines.reduce((r,i)=>r|i,B.None)},showControlColumn:!0});async function Ye(r){const i=+(r.url.searchParams.get("records")??"200");console.log("Loading page data for records = %d...",i),s.records=i;const d=await(await r.fetch(`https://my.api.mockaroo.com/people.json?key=a53dac10&records=${i}`)).json();return{total:i,data:je(d)}}const kt=Object.freeze(Object.defineProperty({__proto__:null,load:Ye},Symbol.toStringTag,{value:"Module"}));var Qe=C(`<div class="offcanvas offcanvas-end bg-info bg-glass svelte-1i880sp" id="helpCanvas" data-bs-backdrop="false"><div class="offcanvas-header"><h3 class="offcanvas-title">WjDataView</h3></div> <div class="offcanvas-body"><p>The data view component shows data in tabular format.</p> <p>The following is the list of features.  Some of these may not be evident if the browser's width is 
            enough to show all data at once, such as the pinnable columns.  To overcome this, either make the 
            browser window smaller, or resize some columns until the data goes off view.</p> <h4>List of Features</h4> <ul><li>Scrollable viewport</li> <li>Striped rows</li> <li>Row tracking on mouse hover</li> <li>Row highlighting on selection</li> <li>Expansible rows</li> <li>Hideable columns</li> <li>Pinnable columns</li> <li>Resizable columns</li> <li>Column alignment</li> <li>Text wrap control</li> <li>Grid lines for columns and rows</li> <li>Customizable header content</li> <li>Customizable data cell content</li> <li>Control column (an always-pinned special column for per-row controls/actions)</li> <li>Customizable appearance via CSS variables (theme component available)</li></ul> <h4>Can it be used to edit data?</h4> <p>The short answer is <strong>Yes!</strong> The cell contents are rendered by providing a custom 
            snippet named <span class="code svelte-1i880sp">dataCell</span>.  However, note that <span class="code svelte-1i880sp">WjDataView</span> will not provide any form of keyboard navigation of any kind.</p> <p>Having said this, use <span class="code svelte-1i880sp">dataCell</span> to provide cell content with controls such as 
            textboxes, checkboxes, radio buttons, selects, etc.</p></div></div>`);function Xe(r){var i=Qe(),u=a(i);a(u),t(u);var d=e(e(u,!0)),c=a(d),_=e(e(c,!0)),T=e(e(_,!0)),S=e(e(T,!0)),X=a(S),j=e(e(X,!0)),$=e(e(j,!0)),D=e(e($,!0)),M=e(e(D,!0)),L=e(e(M,!0)),U=e(e(L,!0)),V=e(e(U,!0)),N=e(e(V,!0)),W=e(e(N,!0)),E=e(e(W,!0)),A=e(e(E,!0)),O=e(e(A,!0)),z=e(e(O,!0));e(e(z,!0)),t(S);var P=e(e(S,!0)),q=e(e(P,!0)),p=e(a(q)),w=e(e(p,!0));e(e(w,!0)),se(),t(q);var k=e(e(q,!0));e(a(k)),se(),t(k),t(d),t(i),y(r,i)}var Ze=C('<input type="radio" class="btn-check"> <label class="btn btn-outline-primary"> </label>',1),Ke=C("<option> </option>"),et=C('<div class="btn-toolbar my-2 py-1 px-1 gap-2 border border-1 rounded"><span class="toolbar-name fw-bold px-2 py-1 rounded-start svelte-1umxg75">Features</span> <button class="btn btn-sm btn-info" title="Click to show additional information" data-bs-toggle="offcanvas" data-bs-target="#helpCanvas"><i class="bi bi-info-circle"></i></button> <div class="input-group input-group-sm"><span class="input-group-text" title="Row Options:"><i class="bi bi-list-check"></i></span> <div class="btn-group btn-group-sm"><input type="checkbox" id="striped" class="btn-check"> <label for="striped" class="btn btn-outline-primary rounded-0">Striped</label> <input type="checkbox" id="rowTracking" class="btn-check"> <label for="rowTracking" class="btn btn-outline-primary">Row Tracking</label> <input type="checkbox" id="rowSelectionHighlight" class="btn-check"> <label for="rowSelectionHighlight" class="btn btn-outline-primary">Selection Highlight</label></div></div> <input type="checkbox" id="controlColumn" class="btn-check"> <label for="controlColumn" class="btn btn-sm btn-outline-primary">Control Column</label> <div class="input-group input-group-sm"><span class="input-group-text" title="Row Count:"><i class="bi bi-person-lines-fill"></i></span> <div class="btn-group btn-group-sm"></div></div> <div class="input-group input-group-sm"><div class="input-group-text"><span title="Theme:"><i class="bi bi-palette"></i></span></div> <select class="form-control"><option> </option><!></select></div> <div class="input-group input-group-sm"><span title="Borders:" class="input-group-text"><i class="bi bi-border-all"></i></span> <div class="btn-group btn-group-sm"><input type="checkbox" id="rowGridLine" class="btn-check"> <label for="rowGridLine" class="btn btn-outline-primary rounded-0" title="Row borders"><i class="bi bi-border-bottom"></i></label> <input type="checkbox" id="colGridLine" class="btn-check"> <label for="colGridLine" class="btn btn-outline-primary" title="Column borders"><i class="bi bi-border-right"></i></label></div></div></div>');function tt(r,i){ge(i,!0);const u=[],d=[],c=[100,200,300,400],_="Stock";let T=ue("Bootstrap");we(()=>{fe.currentTheme=I(T)===_?$e():be[I(T)]});var S=et(),X=a(S),j=e(e(X,!0));a(j),t(j);var $=e(e(j,!0)),D=a($);a(D),t(D);var M=e(e(D,!0)),L=a(M);H(L);var U=e(e(L,!0)),V=e(e(U,!0));H(V);var N=e(e(V,!0)),W=e(e(N,!0));H(W),e(e(W,!0)),t(M),t($);var E=e(e($,!0));H(E);var A=e(e(E,!0)),O=e(e(A,!0)),z=a(O);a(z),t(z);var P=e(e(z,!0));pe(P,78,()=>c,(n,h)=>g(n),(n,h,ve)=>{var G=Ze(),R=We(G);H(R);var ee,te=e(e(R,!0)),Ce=a(te);t(te),F(()=>{oe(R,"id",`numRecords_${g(h)??""}`),ee!==(ee=g(h))&&(R.value=(R.__value=g(h))==null?"":g(h)),oe(te,"for",`numRecords_${g(h)??""}`),Ve(te,"rounded-0",g(ve)===0),ie(Ce,g(h))}),ne(u,[],R,()=>(g(h),s.records),Te=>s.records=Te),y(n,G)}),t(P),t(O);var q=e(e(O,!0)),p=a(q),w=a(p);a(w),t(w),t(p);var k=e(e(p,!0)),J=a(k);J.value=(J.__value=_)==null?"":_;var de=a(J);de.nodeValue=_,t(J);var ce=e(J);pe(ce,68,()=>Object.keys(be),(n,h)=>g(n),(n,h,ve)=>{var G=Ke(),R={},ee=a(G);t(G),F(()=>{R!==(R=g(h))&&(G.value=(G.__value=g(h))==null?"":g(h)),ie(ee,g(h))}),y(n,G)}),t(k),t(q);var le=e(e(q,!0)),v=a(le);a(v),t(v);var l=e(e(v,!0)),o=a(l);H(o);var f,b=e(e(o,!0));a(b),t(b);var m=e(e(b,!0));H(m);var x,Y=e(e(m,!0));a(Y),t(Y),t(l),t(le),t(S),F(()=>{f!==(f=B.Row)&&(o.value=(o.__value=B.Row)==null?"":B.Row),x!==(x=B.Column)&&(m.value=(m.__value=B.Column)==null?"":B.Column)}),Z(L,()=>s.striped,n=>s.striped=n),Z(V,()=>s.rowTracking,n=>s.rowTracking=n),Z(W,()=>s.rowSelectionHighlight,n=>s.rowSelectionHighlight=n),Z(E,()=>s.showControlColumn,n=>s.showControlColumn=n),Ae(k,()=>I(T),n=>re(T,n)),ne(d,[],o,()=>s.grid_lines,n=>s.grid_lines=n),ne(d,[],m,()=>s.grid_lines,n=>s.grid_lines=n),y(r,S),ke()}var at=(r,i)=>i(r.currentTarget.checked),rt=C('<div class="ps-2"><input type="checkbox" class="form-check-input"></div>'),it=(r,i)=>i().row.wjdv.expanded=!i().row.wjdv.expanded,ot=C('<div class="px-2 d-flex flex-row gap-1"><input type="checkbox" class="form-check-input"> <button type="button" class="btn btn-sm btn-neutral"><i></i></button></div>'),lt=(r,i)=>i().col.pinned=!i().col.pinned,nt=C('<div class="d-flex flex-row ps-2"><span class="fw-semibold text-nowrap text-truncate"> </span> <button class="btn btn-sm ms-auto"><span><i></i></span></button></div>'),st=C('<div class="data px-2 text-truncate"><!></div>'),ut=C('<div class="card mx-3 my-2"><h4 class="card-header">Data Drilldown</h4> <div class="card-body"><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur vero voluptatibus libero laboriosam nisi explicabo quia ab nam mollitia, rem beatae soluta inventore doloribus. Iure omnis saepe blanditiis, fugit voluptates, sit eaque perferendis minima doloremque ea quia dolores hic ipsam! Odit esse voluptatibus minus corrupti harum, mollitia, temporibus corporis quam enim velit vitae eaque? Dolor sunt laudantium possimus ea iusto quam suscipit exercitationem dicta? Id reiciendis iusto magni vitae animi corrupti illum quaerat nisi repudiandae enim, saepe officiis ab cupiditate in, aliquid totam incidunt dolores nam recusandae at sequi ipsa? Ipsa, placeat! Debitis maiores quos eum nihil ducimus eligendi eaque.</p> <p>To see an actual data drill-down scenario, visit the <a>sales demo page</a>.</p></div></div>'),dt=C(`<div class="d-flex flex-column overflow-auto h-100 theme-def"><div><hgroup><h1>WjDataView</h1> <h4>Tabular Data Visualization</h4></hgroup> <div class="container"><div class="row"><div class="col-lg-3 col-md-2"></div> <div class="col-lg-6 col-md-8"><div class="alert alert-info mb-0 d-flex flex-row flex-nowrap gap-3"><i class="bi bi-lightbulb-fill"></i> <pre class="mb-0">npm i @wjfe/dataview

import &#123; WjDataView &#125; from '@wjfe/dataview';</pre></div></div> <div class="col-lg-3 col-md-2"></div></div></div></div> <!> <!> <div class="flex-fill position-relative"><!> <!></div></div>`);function xt(r,i){ge(i,!0);const u=Ee(),d=()=>Pe(Me,"$page",u);let c=ue(Q([]));Ge(()=>{re(c,Q(i.data.data))});let _=ue(Q([{key:"id",text:"ID",width:5,resizable:!1,pinned:!0},{key:"first_name",text:"First Name",minWidth:5,hidden:!1},{key:"last_name",text:"Last Name"},{key:"email",text:"E-Mail",pinned:!0},{key:"gender",text:"Gender",alignment:"center"},{key:"birth_date",text:"Birth Date",noTextWrap:!0},{key:"country_code",text:"Country Code"},{key:"credit_score",text:"Credit Score",alignment:"end"},{key:"net_worth",text:"Net Worth",alignment:"end"}]));const T=me(()=>{let p=null,w=null;for(let k of i.data.data)if(k.wjdv.selected&&(p=!0),k.wjdv.selected||(w=!0),p!==null&&w!==null)return null;return p===!0});we(()=>S(s.records));function S(p){if((d().url.searchParams.get("records")??200)==p)return;const w=new URL(d().url);w.searchParams.set("records",p.toString()),Be(w)}function X(p){for(let w of i.data.data)w.wjdv.selected=p}var j=dt(),$=a(j),D=a($),M=a(D);e(e(M,!0)),t(D);var L=e(e(D,!0)),U=a(L),V=a(U),N=e(e(V,!0)),W=a(N),E=a(W);e(e(E,!0)),t(W),t(N),e(e(N,!0)),t(U),t(L),t($);var A=e(e($,!0));Xe(A);var O=e(e(A,!0));tt(O,{});var z=e(e(O,!0)),P=a(z);De(P,{get theme(){return fe.currentTheme},children:(p,w)=>{var k=me(()=>({width:4,minWidth:4,hidden:!s.showControlColumn}));Re(p,{get columns(){return I(_)},set columns(v){re(_,Q(v))},get data(){return I(c)},set data(v){re(c,Q(v))},get striped(){return s.striped},get rowTracking(){return s.rowTracking},get rowSelectionHighlight(){return s.rowSelectionHighlight},get gridLines(){return s.gridLines},defaultWidth:15,class:"position-absolute top-0 bottom-0",get controlColumn(){return I(k)},controlHeaderCell:v=>{var l=rt(),o=a(l);H(o),o.__input=[at,X],t(l),F(()=>{o.indeterminate=I(T)===null,Ne(o,!!I(T))}),y(v,l)},controlDataCell:(v,l=ae)=>{var o=ot(),f=a(o);H(f);var b=e(e(f,!0));b.__click=[it,l];var m=a(b);t(b),t(o),F(()=>_e(m,`bi bi-chevron-bar-${(l().row.wjdv.expanded?"contract":"expand")??""}`)),Z(f,()=>l().row.wjdv.selected,x=>l().row.wjdv.selected=x),y(v,o)},headerCell:(v,l=ae)=>{var o=nt(),f=a(o),b=a(f);t(f);var m=e(e(f,!0));m.__click=[lt,l];var x=a(m),Y=a(x);t(x),t(m),t(o),F(()=>{ie(b,l().col.text),oe(x,"title",`Click to ${(l().col.pinned?"un":"")??""}pin`),_e(Y,`bi bi-pin-${(l().col.pinned?"fill":"angle")??""}`)}),y(v,o)},dataCell:(v,l=ae)=>{var o=st(),f=a(o);Ie(f,()=>l().col.key==="credit_score"||l().col.key==="net_worth",b=>{He(b,{get value(){return l().row[l().col.key]}})},b=>{var m=ze();F(()=>ie(m,l().row[l().col.key])),y(b,m)}),t(o),y(v,o)},rowExpansion:(v,l=ae)=>{var o=ut(),f=a(o),b=e(e(f,!0)),m=a(b),x=e(e(m,!0)),Y=e(a(x));oe(Y,"href",`${Fe??""}/sales`),se(),t(x),t(b),t(o),y(v,o)}})},$$slots:{default:!0}});var q=e(e(P,!0));qe(q,{editUrl:"https://github.com/WJSoftware/wjfe-dataview/blob/main/src/routes/%2Bpage.svelte"}),t(z),t(j),y(r,j),ke()}Oe(["input","click"]);export{xt as component,kt as universal};
