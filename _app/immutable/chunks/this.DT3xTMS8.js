import{h,a as I,b as N,E as R,H as g,r as q,c as L,d,f as T,g as E,p as A,i as o,U as v,j as x,k as D,u as F,q as H,S as O}from"./index-client.BRZDiws4.js";function Y(a,f,e=!1){h&&I();var i=a,r=null,s=null,c=v,b=e?R:0,l=!1;const k=(n,t=!0)=>{l=!0,u(t,n)},u=(n,t)=>{if(c===(c=n))return;let _=!1;if(h){const y=i.data===g;!!c===y&&(i=q(),L(i),d(!1),_=!0)}c?(r?T(r):t&&(r=E(()=>t(i))),s&&A(s,()=>{s=null})):(s?T(s):t&&(s=E(()=>t(i))),r&&A(r,()=>{r=null})),_&&d(!0)};N(()=>{l=!1,f(k),l||u(null,null)},b),h&&(i=o)}function S(a,f){return a===f||(a==null?void 0:a[O])===f}function j(a={},f,e,i){return x(()=>{var r,s;return D(()=>{r=s,s=[],F(()=>{a!==e(...s)&&(f(a,...s),r&&S(e(...r),a)&&f(null,...r))})}),()=>{H(()=>{s&&S(e(...s),a)&&f(null,...s)})}}),a}export{j as b,Y as i};
