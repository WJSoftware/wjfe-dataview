import{h as G,E as P,j as K,Q,q as C,R as V,T as W,F as S,U as X,n as $,V as Y,W as H,l as J,b as Z,D as m,X as tt}from"./runtime.DkqSkKrO.js";import{h as w,j as st,x as rt,y as M,n as et,A as at,D as it,z as nt,T as ct,B as ft,C as ot}from"./disclose-version.CqyMsf3s.js";function Et(t,s,...r){var e=t,a,o;G(()=>{a!==(a=s())&&(o&&(Q(o),o=null),a&&(o=K(()=>a(e,...r))))},P),w&&(e=st)}function ut(t,s){if(s){const r=document.body;t.autofocus=!0,C(()=>{document.activeElement===r&&t.focus()})}}let q=!1;function lt(){q||(q=!0,document.addEventListener("reset",t=>{Promise.resolve().then(()=>{var s;if(!t.defaultPrevented)for(const r of t.target.elements)(s=r.__on_r)==null||s.call(r)})},{capture:!0}))}function $t(t){if(w){var s=!1,r=()=>{if(!s){if(s=!0,t.hasAttribute("value")){var e=t.value;O(t,"value",null),t.value=e}if(t.hasAttribute("checked")){var a=t.checked;O(t,"checked",null),t.checked=a}}};t.__on_r=r,W(r),lt()}}function Ct(t,s){var r=t.__attributes??(t.__attributes={});r.checked!==(r.checked=s)&&(t.checked=s)}function O(t,s,r,e){r=r==null?null:r+"";var a=t.__attributes??(t.__attributes={});w&&(a[s]=t.getAttribute(s),s==="src"||s==="href"||s==="srcset")||a[s]!==(a[s]=r)&&(s==="loading"&&(t[V]=r),r===null?t.removeAttribute(s):t.setAttribute(s,r))}function Lt(t,s,r,e,a,o){var _=a.length!==0,f=s||{},b=t.tagName==="OPTION";for(var p in s)p in r||(r[p]=null);_&&!r.class&&(r.class="");var l=x.get(t.nodeName);l||x.set(t.nodeName,l=vt(t));var v=t.__attributes??(t.__attributes={}),c=[];for(const i in r){let n=r[i];if(b&&i==="value"&&n==null){t.value=t.__value="",f[i]=n;continue}var h=f[i];if(n!==h){f[i]=n;var N=i[0]+i[1];if(N!=="$$")if(N==="on"){const d={},A="$$"+i;let g=i.slice(2);var y=it.includes(g);if(rt(g)&&(g=g.slice(0,-7),d.capture=!0),!y&&h){if(n!=null)continue;t.removeEventListener(g,f[A],d),f[A]=null}if(n!=null)if(y)t[`__${g}`]=n,et([g]);else{let k=function(L){f[i].call(this,L)};s?f[A]=M(g,t,k,d):c.push([i,n,()=>f[A]=M(g,t,k,d)])}}else if(n==null)v[i]=null,t.removeAttribute(i);else if(i==="style")t.style.cssText=n+"";else if(i==="autofocus")ut(t,!!n);else if(i==="__value"||i==="value")t.value=t[i]=t.__value=n;else{var u=i;u=u.toLowerCase(),u=at[u]||u,l.includes(u)?w&&(u==="src"||u==="href"||u==="srcset")||(t[u]=n):typeof n!="function"&&(_&&u==="class"&&(n&&(n+=" "),n+=a),O(t,u,n))}}}return s||C(()=>{if(t.isConnected)for(const[i,n,d]of c)f[i]===n&&d()}),f}var dt=["width","height","draggable"],x=new Map;function vt(t){for(var s=[],r,e=S(t);e.constructor.name!=="Element";){r=X(e);for(var a in r)r[a].set&&!dt.includes(a)&&s.push(a);e=S(e)}return s}function It(t,s){var r=t.__className,e=_t(s);w&&t.className===e?t.__className=e:(r!==e||w&&t.className!==e)&&(s==null?t.removeAttribute("class"):t.className=e,t.__className=e)}function _t(t){return t??""}function Ot(t,s,r){if(r){if(t.classList.contains(s))return;t.classList.add(s)}else{if(!t.classList.contains(s))return;t.classList.remove(s)}}const j=typeof window<"u",ht=j?requestAnimationFrame:$,pt=j?()=>performance.now():()=>Date.now(),T={tick:t=>ht(t),now:()=>pt(),tasks:new Set};function z(t){T.tasks.forEach(s=>{s.c(t)||(T.tasks.delete(s),s.f())}),T.tasks.size!==0&&T.tick(z)}function yt(t){let s;return T.tasks.size===0&&T.tick(z),{promise:new Promise(r=>{T.tasks.add(s={c:t,f:r})}),abort(){T.tasks.delete(s)}}}function E(t,s){t.dispatchEvent(new CustomEvent(s))}function gt(t){const s=t.split("-");return s.length===1?s[0]:s[0]+s.slice(1).map(r=>r[0].toUpperCase()+r.slice(1)).join("")}function B(t){const s={},r=t.split(";");for(const e of r){const[a,o]=e.split(":");if(!a||o===void 0)break;const _=gt(a.trim());s[_]=o.trim()}return s}const bt=t=>t;function Ft(t,s,r,e){var a=(t&ct)!==0,o=(t&ft)!==0,_=a&&o,f=(t&ot)!==0,b=_?"both":a?"in":"out",p,l=s.inert,v,c,h;function N(){return p??(p=r()(s,e==null?void 0:e(),{direction:b}))}var y={is_global:f,in(){s.inert=l,c==null||c.abort(),v==null||v.abort(),a?(E(s,"introstart"),v=F(s,N(),c,1,()=>{E(s,"introend"),v=p=void 0},_?void 0:()=>{v=p=void 0})):h==null||h()},out(n){c==null||c.abort(),o?(s.inert=!0,E(s,"outrostart"),c=F(s,N(),v,0,()=>{E(s,"outroend"),c=p=void 0,n==null||n()},_?void 0:()=>{c=p=void 0}),h=c.reset):n==null||n()},stop:()=>{v==null||v.abort(),c==null||c.abort()}},u=m;if((u.transitions??(u.transitions=[])).push(y),a&&nt){let n=f;if(!n){for(var i=u.parent;i&&i.f&P;)for(;(i=i.parent)&&!(i.f&Y););n=!i||(i.f&H)!==0}n&&J(()=>{Z(()=>y.in())})}}function F(t,s,r,e,a,o){var _=e===1;if(tt(s)){var f;return C(()=>{var d=s({direction:_?"in":"out"});f=F(t,d,r,e,a,o)}),{abort:()=>f.abort(),deactivate:()=>f.deactivate(),reset:()=>f.reset(),t:d=>f.t(d)}}if(r==null||r.deactivate(),!(s!=null&&s.duration))return a==null||a(),{abort:$,deactivate:$,reset:$,t:()=>e};const{delay:b=0,css:p,tick:l,easing:v=bt}=s;var c=T.now()+b,h=(r==null?void 0:r.t(c))??1-e,N=e-h,y=s.duration*Math.abs(N),u=c+y,i,n;return p?C(()=>{var d=[],A=Math.ceil(y/16.666666666666668);if(_&&b>0){let I=Math.ceil(b/16.666666666666668),U=B(p(0,1));for(let R=0;R<I;R+=1)d.push(U)}for(var g=0;g<=A;g+=1){var k=h+N*v(g/A),L=p(k,1-k);d.push(B(L))}i=t.animate(d,{delay:_?0:b,duration:y+(_?b:0),easing:"linear",fill:"forwards"}),i.finished.then(()=>{a==null||a(),e===1&&i.cancel()}).catch(I=>{if(i.startTime!==null&&i.currentTime!==null)throw I})}):(h===0&&(l==null||l(0,1)),n=yt(d=>{if(d>=u)return l==null||l(e,1-e),a==null||a(),!1;if(d>=c){var A=h+N*v((d-c)/y);l==null||l(A,1-A)}return!0})),{abort:()=>{i==null||i.cancel(),n==null||n.abort(),o==null||o()},deactivate:()=>{a=void 0,o=void 0},reset:()=>{e===0&&(l==null||l(1,0))},t:d=>{var A=h+N*v((d-c)/y);return Math.min(1,Math.max(0,A))}}}function Rt(...t){const s=[];for(let r of t)if(r)if(typeof r=="string"){const e=r.trim();if(!e)continue;s.push(e)}else for(let e in r)r[e]&&s.push(e);return s.join(" ")}let Nt=0;function St(t){return`${t??"control"}${++Nt}`}const At=t=>t;function Tt(t){const s=t-1;return s*s*s+1}function D(t){const s=typeof t=="string"&&t.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);return s?[parseFloat(s[1]),s[2]||"px"]:[t,"px"]}function Mt(t,{delay:s=0,duration:r=400,easing:e=At}={}){const a=+getComputedStyle(t).opacity;return{delay:s,duration:r,easing:e,css:o=>`opacity: ${o*a}`}}function qt(t,{delay:s=0,duration:r=400,easing:e=Tt,x:a=0,y:o=0,opacity:_=0}={}){const f=getComputedStyle(t),b=+f.opacity,p=f.transform==="none"?"":f.transform,l=b*(1-_),[v,c]=D(a),[h,N]=D(o);return{delay:s,duration:r,easing:e,css:(y,u)=>`
			transform: ${p} translate(${(1-y)*v}${c}, ${(1-y)*h}${N});
			opacity: ${b-l*u}`}}export{O as a,Et as b,Rt as c,Ot as d,Ct as e,qt as f,lt as g,Mt as h,Lt as i,St as n,$t as r,It as s,Ft as t};
