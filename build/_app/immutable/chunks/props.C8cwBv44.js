import{w as D,H as g,x as L,y as R,z as m,A,E as N,B as q,C as y,u as x,D as w,F as M,S as Y,g as B,G as C,L as F,P as K,I as U,e as o,c as z,J as G,K as H,M as b,N as J,m as V,O as Z}from"./runtime.DY4OY7UB.js";import{h as j,d as O,e as Q}from"./disclose-version.BZzG25tp.js";function k(e,r,u,n=null,i=!1){var a=null,f=null,t=null,l=i?N:0;D(()=>{if(t===(t=!!r()))return;let _=!1;if(j){const c=e.data===g;t===c&&(L(Q),O(!1),_=!0)}t?(a?R(a):a=m(()=>u(e)),f&&A(f,()=>{f=null})):(f?R(f):n&&(f=m(()=>n(e))),a&&A(a,()=>{a=null})),_&&O(!0)},l)}function T(e,r){var n;var u=e&&((n=e[Y])==null?void 0:n.t);return e===r||u===r}function ee(e,r,u,n){q(()=>{var i,a;return y(()=>{i=a,a=[],x(()=>{e!==u(...a)&&w(()=>{r(e,...a),i&&T(u(...i),e)&&r(null,...i)})})}),()=>{M(()=>{a&&T(u(...a),e)&&r(null,...a)})}})}const W={get(e,r){if(!e.exclude.includes(r))return e.props[r]},set(e,r){return!1},getOwnPropertyDescriptor(e,r){if(!e.exclude.includes(r)&&r in e.props)return{enumerable:!0,configurable:!0,value:e.props[r]}},has(e,r){return e.exclude.includes(r)?!1:r in e.props},ownKeys(e){return Reflect.ownKeys(e.props).filter(r=>!e.exclude.includes(r))}};function re(e,r,u){return new Proxy({props:e,exclude:r},W)}function ae(e,r,u,n){var I;var i=(u&G)!==0,a=(u&H)!==0,f=(u&Z)!==0,t=e[r],l=(I=B(e,r))==null?void 0:I.set,_=n,c=!0,S=()=>(f&&c&&(c=!1,_=x(n)),_);t===void 0&&n!==void 0&&(l&&a&&C(),t=S(),l&&l(t));var d;if(a)d=()=>{var s=e[r];return s===void 0?S():(c=!0,s)};else{var h=(i?b:J)(()=>e[r]);h.f|=F,d=()=>{var s=o(h);return s!==void 0&&(_=void 0),s===void 0?_:s}}if(!(u&K))return d;if(l)return function(s){return arguments.length===1?(l(s),s):d()};var p=!1,P=V(t),v=b(()=>{var s=d(),E=o(P);return p?(p=!1,E):P.v=s});return i||(v.equals=U),function(s){var E=o(v);return arguments.length>0?(v.equals(s)||(p=!0,z(P,s),o(v),v.version++),s):E}}export{ee as b,k as i,ae as p,re as r};
