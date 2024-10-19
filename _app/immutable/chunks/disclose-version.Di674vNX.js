import{a6 as P,a8 as B,Q as W,F as H,ab as L,ac as b,ad as j,ae as q,w as v,B as f,z as S,N as M,x as D,af as A,ag as F,ah as U,ai as N,A as T,aj as Y,ak as z,al as G,am as $,an as x,ao as Q,q as J,p as K,i as X,c as Z}from"./runtime.bfXELTqq.js";const V=new Set,R=new Set;function ee(e,t,r,u){function n(a){if(u.capture||g.call(t,a),!a.cancelBubble)return r.call(this,a)}return e.startsWith("pointer")||e.startsWith("touch")||e==="wheel"?H(()=>{t.addEventListener(e,n,u)}):t.addEventListener(e,n,u),n}function de(e,t,r,u,n){var a={capture:u,passive:n},o=ee(e,t,r,a);(t===document.body||t===window||t===document)&&P(()=>{t.removeEventListener(e,o,a)})}function fe(e){for(var t=0;t<e.length;t++)V.add(e[t]);for(var r of R)r(e)}function g(e){var O;var t=this,r=t.ownerDocument,u=e.type,n=((O=e.composedPath)==null?void 0:O.call(e))||[],a=n[0]||e.target,o=0,l=e.__root;if(l){var c=n.indexOf(l);if(c!==-1&&(t===document||t===window)){e.__root=t;return}var p=n.indexOf(t);if(p===-1)return;c<=p&&(o=c)}if(a=n[o]||e.target,a!==t){B(e,"currentTarget",{configurable:!0,get(){return a||r}});try{for(var m,d=[];a!==null;){var s=a.assignedSlot||a.parentNode||a.host||null;try{var i=a["__"+u];if(i!==void 0&&!a.disabled)if(W(i)){var[h,...w]=i;h.apply(a,[e,...w])}else i.call(a,e)}catch(E){m?d.push(E):m=E}if(e.cancelBubble||s===t||s===null)break;a=s}if(m){for(let E of d)queueMicrotask(()=>{throw E});throw m}}finally{e.__root=t,delete e.currentTarget}}}function te(e){var t=document.createElement("template");return t.innerHTML=e,t.content}function _(e,t){var r=M;r.nodes_start===null&&(r.nodes_start=e,r.nodes_end=t)}function ce(e,t){var r=(t&j)!==0,u=(t&q)!==0,n,a=!e.startsWith("<!>");return()=>{if(v)return _(f,null),f;n===void 0&&(n=te(a?e:"<!>"+e),r||(n=L(n)));var o=u?document.importNode(n,!0):n.cloneNode(!0);if(r){var l=L(o),c=o.lastChild;_(l,c)}else _(o,o);return o}}function le(e=""){if(!v){var t=b(e+"");return _(t,t),t}var r=f;return r.nodeType!==3&&(r.before(r=b()),S(r)),_(r,r),r}function _e(){if(v)return _(f,null),f;var e=document.createDocumentFragment(),t=document.createComment(""),r=b();return e.append(t,r),_(t,r),e}function pe(e,t){if(v){M.nodes_end=f,D();return}e!==null&&e.before(t)}function he(e){return e.endsWith("capture")&&e!=="gotpointercapture"&&e!=="lostpointercapture"}const re=["beforeinput","click","change","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"];function ve(e){return re.includes(e)}const ae={formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly"};function me(e){return e=e.toLowerCase(),ae[e]??e}const ne=["touchstart","touchmove"];function oe(e){return ne.includes(e)}let k=!0;function ye(e,t){var r=t==null?"":typeof t=="object"?t+"":t;r!==(e.__t??(e.__t=e.nodeValue))&&(e.__t=r,e.nodeValue=r==null?"":r+"")}function ie(e,t){return C(e,t)}function ge(e,t){A(),t.intro=t.intro??!1;const r=t.target,u=v,n=f;try{for(var a=L(r);a&&(a.nodeType!==8||a.data!==F);)a=U(a);if(!a)throw N;T(!0),S(a),D();const o=C(e,{...t,anchor:a});if(f===null||f.nodeType!==8||f.data!==Y)throw z(),N;return T(!1),o}catch(o){if(o===N)return t.recover===!1&&G(),A(),$(r),T(!1),ie(e,t);throw o}finally{T(u),S(n)}}const y=new Map;function C(e,{target:t,anchor:r,props:u={},events:n,context:a,intro:o=!0}){A();var l=new Set,c=d=>{for(var s=0;s<d.length;s++){var i=d[s];if(!l.has(i)){l.add(i);var h=oe(i);t.addEventListener(i,g,{passive:h});var w=y.get(i);w===void 0?(document.addEventListener(i,g,{passive:h}),y.set(i,1)):y.set(i,w+1)}}};c(x(V)),R.add(c);var p=void 0,m=Q(()=>{var d=r??t.appendChild(b());return J(()=>{if(a){K({});var s=Z;s.c=a}n&&(u.$$events=n),v&&_(d,null),k=o,p=e(d,u)||{},k=!0,v&&(M.nodes_end=f),a&&X()}),()=>{var h;for(var s of l){t.removeEventListener(s,g);var i=y.get(s);--i===0?(document.removeEventListener(s,g),y.delete(s)):y.set(s,i)}R.delete(c),I.delete(p),d!==r&&((h=d.parentNode)==null||h.removeChild(d))}});return I.set(p,m),p}let I=new WeakMap;function we(e){const t=I.get(e);t&&t()}const se="5";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(se);export{pe as a,le as b,_e as c,fe as d,ee as e,ve as f,k as g,ge as h,he as i,de as j,ie as m,me as n,ye as s,ce as t,we as u};
