import{h as x,E as P,j as U,O as z,q as I,P as G,Q as J,D as R,R as K,J as L,T as Q,U as V,l as Y,b as H,C as W,V as X}from"./runtime.CZHgF7la.js";import{h as E,p as Z,q as S,k,A as m,D as ss,v as ts,T as rs,w as es,x as is}from"./disclose-version.DFgEgxEJ.js";function Ns(s,t,...r){var e,i;x(()=>{e!==(e=t())&&(i&&(z(i),i=null),e&&(i=U(()=>e(s,...r))))},P)}function as(s,t){if(t){const r=document.body;s.autofocus=!0,I(()=>{document.activeElement===r&&s.focus()})}}let q=!1;function ns(){q||(q=!0,document.addEventListener("reset",s=>{Promise.resolve().then(()=>{var t;if(!s.defaultPrevented)for(const r of s.target.elements)(t=r.__on_r)==null||t.call(r)})},{capture:!0}))}function Ts(s){if(E){var t=!1,r=()=>{if(!t){if(t=!0,s.hasAttribute("value")){var e=s.value;O(s,"value",null),s.value=e}if(s.hasAttribute("checked")){var i=s.checked;O(s,"checked",null),s.checked=i}}};s.__on_r=r,G(r),ns()}}function ws(s,t){var r=s.__attributes??(s.__attributes={});r.checked!==(r.checked=t)&&(s.checked=t)}function O(s,t,r){r=r==null?null:r+"";var e=s.__attributes??(s.__attributes={});E&&(e[t]=s.getAttribute(t),t==="src"||t==="href"||t==="srcset")||e[t]!==(e[t]=r)&&(t==="loading"&&(s[J]=r),r===null?s.removeAttribute(t):s.setAttribute(t,r))}function Es(s,t,r,e,i){var _=i.length!==0,u=t||{};for(var d in t)d in r||(r[d]=null);_&&!r.class&&(r.class="");var p=M.get(s.nodeName);p||M.set(s.nodeName,p=fs(s));var v=s.__attributes??(s.__attributes={}),l=[];for(const a in r){let n=r[a];var o=u[a];if(n!==o){u[a]=n;var h=a[0]+a[1];if(h!=="$$")if(h==="on"){const f={},T="$$"+a;let y=a.slice(2);var g=ss.includes(y);if(Z(y)&&(y=y.slice(0,-7),f.capture=!0),!g&&o){if(n!=null)continue;s.removeEventListener(y,u[T],f),u[T]=null}if(n!=null)if(g)s[`__${y}`]=n,k([y]);else{let w=function(b){u[a].call(this,b)};t?u[T]=S(y,s,w,f):l.push([a,n,()=>u[T]=S(y,s,w,f)])}}else if(n==null)v[a]=null,s.removeAttribute(a);else if(a==="style")s.style.cssText=n+"";else if(a==="autofocus")as(s,!!n);else if(a==="__value"||a==="value")s.value=s[a]=s.__value=n;else{var c=a;c=c.toLowerCase(),c=m[c]||c,p.includes(c)?E&&(c==="src"||c==="href"||c==="srcset")||(s[c]=n):typeof n!="function"&&(_&&c==="class"&&(n&&(n+=" "),n+=i),O(s,c,n))}}}return t||I(()=>{if(s.isConnected)for(const[a,n,f]of l)u[a]===n&&f()}),u}var os=["width","height"],M=new Map;function fs(s){for(var t=[],r,e=R(s);e.constructor.name!=="Element";){r=K(e);for(var i in r)r[i].set&&!os.includes(i)&&t.push(i);e=R(e)}return t}function $s(s,t){var r=s.__className,e=us(t);E&&s.className===e?s.__className=e:(r!==e||E&&s.className!==e)&&(t==null?s.removeAttribute("class"):s.className=e,s.__className=e)}function us(s){return s??""}function Cs(s,t,r){r?s.classList.add(t):s.classList.remove(t)}const B=typeof window<"u",cs=B?requestAnimationFrame:L,_s=B?()=>performance.now():()=>Date.now(),N={tick:s=>cs(s),now:()=>_s(),tasks:new Set};function j(s){N.tasks.forEach(t=>{t.c(s)||(N.tasks.delete(t),t.f())}),N.tasks.size!==0&&N.tick(j)}function vs(s){let t;return N.tasks.size===0&&N.tick(j),{promise:new Promise(r=>{N.tasks.add(t={c:s,f:r})}),abort(){N.tasks.delete(t)}}}function C(s,t){s.dispatchEvent(new CustomEvent(t))}function ds(s){const t=s.split("-");return t.length===1?t[0]:t[0]+t.slice(1).map(r=>r[0].toUpperCase()+r.slice(1)).join("")}function ls(s){const t={},r=s.split(";");for(const e of r){const[i,_]=e.split(":");if(!i||_===void 0)break;const u=ds(i.trim());t[u]=_.trim()}return t}const hs=s=>s;function Ls(s,t,r,e){var i=(s&rs)!==0,_=(s&es)!==0,u=(s&is)!==0,d=i&&_?"both":i?"in":"out",p,v=t.inert,l,o,h;function g(){return p??(p=r()(t,e==null?void 0:e(),{direction:d}))}var c={is_global:u,in(){t.inert=v,i?(C(t,"introstart"),l=F(t,g(),o,1,()=>{C(t,"introend"),l=p=void 0})):(o==null||o.abort(),h==null||h())},out(f){_?(t.inert=!0,C(t,"outrostart"),o=F(t,g(),l,0,()=>{C(t,"outroend"),o=p=void 0,f==null||f()}),h=o.reset):f==null||f()},stop:()=>{l==null||l.abort(),o==null||o.abort()}},a=W;if((a.transitions??(a.transitions=[])).push(c),i&&ts){let f=u;if(!f){for(var n=a.parent;n&&n.f&P;)for(;(n=n.parent)&&!(n.f&Q););f=!n||(n.f&V)!==0}f&&Y(()=>{H(()=>c.in())})}}function F(s,t,r,e,i){if(X(t)){var _;return I(()=>{var A=t({direction:e===1?"in":"out"});_=F(s,A,r,e,i)}),{abort:()=>_.abort(),deactivate:()=>_.deactivate(),reset:()=>_.reset(),t:A=>_.t(A)}}if(r==null||r.deactivate(),!(t!=null&&t.duration))return i==null||i(),{abort:L,deactivate:L,reset:L,t:()=>e};var{delay:u=0,duration:d,css:p,tick:v,easing:l=hs}=t,o=N.now()+u,h=(r==null?void 0:r.t(o))??1-e,g=e-h;d*=Math.abs(g);var c=o+d,a,n;if(p){for(var f=[],T=Math.ceil(d/16.666666666666668),y=0;y<=T;y+=1){var w=h+g*l(y/T),b=p(w,1-w);f.push(ls(b))}a=s.animate(f,{delay:u,duration:d,easing:"linear",fill:"forwards"}),a.finished.then(()=>{i==null||i(),e===1&&a.cancel()}).catch(A=>{if(a.startTime!==null&&a.currentTime!==null)throw A})}else h===0&&(v==null||v(0,1)),n=vs(A=>{if(A>=c)return v==null||v(e,1-e),i==null||i(),!1;if(A>=o){var $=h+g*l((A-o)/d);v==null||v($,1-$)}return!0});return{abort:()=>{a==null||a.cancel(),n==null||n.abort()},deactivate:()=>{i=void 0},reset:()=>{e===0&&(v==null||v(1,0))},t:A=>{var $=h+g*l((A-o)/d);return Math.min(1,Math.max(0,$))}}}function bs(...s){const t=[];for(let r of s)if(r)if(typeof r=="string"){const e=r.trim();if(!e)continue;t.push(e)}else for(let e in r)r[e]&&t.push(e);return t.join(" ")}function Os(){}const ps=s=>s;function ys(s){const t=s-1;return t*t*t+1}function D(s){const t=typeof s=="string"&&s.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);return t?[parseFloat(t[1]),t[2]||"px"]:[s,"px"]}function Fs(s,{delay:t=0,duration:r=400,easing:e=ps}={}){const i=+getComputedStyle(s).opacity;return{delay:t,duration:r,easing:e,css:_=>`opacity: ${_*i}`}}function Is(s,{delay:t=0,duration:r=400,easing:e=ys,x:i=0,y:_=0,opacity:u=0}={}){const d=getComputedStyle(s),p=+d.opacity,v=d.transform==="none"?"":d.transform,l=p*(1-u),[o,h]=D(i),[g,c]=D(_);return{delay:t,duration:r,easing:e,css:(a,n)=>`
			transform: ${v} translate(${(1-a)*o}${h}, ${(1-a)*g}${c});
			opacity: ${p-l*n}`}}export{O as a,Ns as b,bs as c,ns as d,Fs as e,Is as f,Es as g,Cs as h,ws as i,Os as n,Ts as r,$s as s,Ls as t};
