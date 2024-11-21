import{I as W,an as L,$ as N,ao as q,P as m,aq as H,a8 as F,T as G,ar as I,as as J,at as K,au as S,y as b,D as c,B as R,z as j,av as M,aw as Q,ax as X,ay as D,C as w,az as Z,aA as ee,aB as te,aC as re,aD as ne,aE as ae,w as oe,p as se,j as ue,c as ie,n as O,a as ce,a6 as fe,g as de,N as le}from"./runtime.vz7-y3A5.js";function Le(e,t){if(t){const r=document.body;e.autofocus=!0,W(()=>{document.activeElement===r&&e.focus()})}}let V=!1;function _e(){V||(V=!0,document.addEventListener("reset",e=>{Promise.resolve().then(()=>{var t;if(!e.defaultPrevented)for(const r of e.target.elements)(t=r.__on_r)==null||t.call(r)})},{capture:!0}))}function z(e){var t=q,r=m;L(null),N(null);try{return e()}finally{L(t),N(r)}}function Ne(e,t,r,a=r){e.addEventListener(t,()=>z(r));const o=e.__on_r;o?e.__on_r=()=>{o(),a()}:e.__on_r=a,_e()}const U=new Set,k=new Set;function ve(e,t,r,a){function o(n){if(a.capture||g.call(t,n),!n.cancelBubble)return z(()=>r.call(this,n))}return e.startsWith("pointer")||e.startsWith("touch")||e==="wheel"?W(()=>{t.addEventListener(e,o,a)}):t.addEventListener(e,o,a),o}function Se(e,t,r,a,o){var n={capture:a,passive:o},s=ve(e,t,r,n);(t===document.body||t===window||t===document)&&H(()=>{t.removeEventListener(e,s,n)})}function Ae(e){for(var t=0;t<e.length;t++)U.add(e[t]);for(var r of k)r(e)}function g(e){var C;var t=this,r=t.ownerDocument,a=e.type,o=((C=e.composedPath)==null?void 0:C.call(e))||[],n=o[0]||e.target,s=0,_=e.__root;if(_){var d=o.indexOf(_);if(d!==-1&&(t===document||t===window)){e.__root=t;return}var p=o.indexOf(t);if(p===-1)return;d<=p&&(s=d)}if(n=o[s]||e.target,n!==t){F(e,"currentTarget",{configurable:!0,get(){return n||r}});var A=q,f=m;L(null),N(null);try{for(var u,i=[];n!==null;){var l=n.assignedSlot||n.parentNode||n.host||null;try{var h=n["__"+a];if(h!==void 0&&!n.disabled)if(G(h)){var[$,...x]=h;$.apply(n,[e,...x])}else h.call(n,e)}catch(E){u?i.push(E):u=E}if(e.cancelBubble||l===t||l===null)break;n=l}if(u){for(let E of i)queueMicrotask(()=>{throw E});throw u}}finally{e.__root=t,delete e.currentTarget,L(A),N(f)}}}function pe(e){var t=document.createElement("template");return t.innerHTML=e,t.content}function v(e,t){var r=m;r.nodes_start===null&&(r.nodes_start=e,r.nodes_end=t)}function De(e,t){var r=(t&J)!==0,a=(t&K)!==0,o,n=!e.startsWith("<!>");return()=>{if(b)return v(c,null),c;o===void 0&&(o=pe(n?e:"<!>"+e),r||(o=I(o)));var s=a?document.importNode(o,!0):o.cloneNode(!0);if(r){var _=I(s),d=s.lastChild;v(_,d)}else v(s,s);return s}}function Ie(e=""){if(!b){var t=S(e+"");return v(t,t),t}var r=c;return r.nodeType!==3&&(r.before(r=S()),R(r)),v(r,r),r}function Re(){if(b)return v(c,null),c;var e=document.createDocumentFragment(),t=document.createComment(""),r=S();return e.append(t,r),v(t,r),e}function Me(e,t){if(b){m.nodes_end=c,j();return}e!==null&&e.before(t)}function Oe(e){return e.endsWith("capture")&&e!=="gotpointercapture"&&e!=="lostpointercapture"}const he=["beforeinput","click","change","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"];function ke(e){return he.includes(e)}const be={formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly"};function Pe(e){return e=e.toLowerCase(),be[e]??e}const ye=["touchstart","touchmove"];function ge(e){return ye.includes(e)}let B=!0;function Ce(e,t){var r=t==null?"":typeof t=="object"?t+"":t;r!==(e.__t??(e.__t=e.nodeValue))&&(e.__t=r,e.nodeValue=r==null?"":r+"")}function me(e,t){return Y(e,t)}function Ve(e,t){M(),t.intro=t.intro??!1;const r=t.target,a=b,o=c;try{for(var n=I(r);n&&(n.nodeType!==8||n.data!==Q);)n=X(n);if(!n)throw D;w(!0),R(n),j();const s=Y(e,{...t,anchor:n});if(c===null||c.nodeType!==8||c.data!==Z)throw ee(),D;return w(!1),s}catch(s){if(s===D)return t.recover===!1&&te(),M(),re(r),w(!1),me(e,t);throw s}finally{w(a),R(o)}}const y=new Map;function Y(e,{target:t,anchor:r,props:a={},events:o,context:n,intro:s=!0}){M();var _=new Set,d=f=>{for(var u=0;u<f.length;u++){var i=f[u];if(!_.has(i)){_.add(i);var l=ge(i);t.addEventListener(i,g,{passive:l});var h=y.get(i);h===void 0?(document.addEventListener(i,g,{passive:l}),y.set(i,1)):y.set(i,h+1)}}};d(ne(U)),k.add(d);var p=void 0,A=ae(()=>{var f=r??t.appendChild(S());return oe(()=>{if(n){se({});var u=ie;u.c=n}o&&(a.$$events=o),b&&v(f,null),B=s,p=e(f,a)||{},B=!0,b&&(m.nodes_end=c),n&&ue()}),()=>{var l;for(var u of _){t.removeEventListener(u,g);var i=y.get(u);--i===0?(document.removeEventListener(u,g),y.delete(u)):y.set(u,i)}k.delete(d),P.delete(p),f!==r&&((l=f.parentNode)==null||l.removeChild(f))}});return P.set(p,A),p}let P=new WeakMap;function Be(e){const t=P.get(e);t&&t()}function Ee(e,t,r){if(e==null)return t(void 0),O;const a=ce(()=>e.subscribe(t,r));return a.unsubscribe?()=>a.unsubscribe():a}let T=!1;function We(e,t,r){const a=r[t]??(r[t]={store:null,source:fe(void 0),unsubscribe:O});if(a.store!==e)if(a.unsubscribe(),a.store=e??null,e==null)a.source.v=void 0,a.unsubscribe=O;else{var o=!0;a.unsubscribe=Ee(e,n=>{o?a.source.v=n:le(a.source,n)}),o=!1}return de(a.source)}function qe(){const e={};return H(()=>{for(var t in e)e[t].unsubscribe()}),e}function He(e){var t=T;try{return T=!1,[e(),T]}finally{T=t}}const we="5";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(we);export{Me as a,Ce as b,We as c,He as d,Re as e,Ie as f,Ae as g,Ve as h,_e as i,Oe as j,ve as k,Le as l,me as m,Pe as n,ke as o,B as p,Ne as q,Se as r,qe as s,De as t,Be as u};
