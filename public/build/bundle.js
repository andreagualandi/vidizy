var app=function(){"use strict";function t(){}function n(t){return t()}function e(){return Object.create(null)}function o(t){t.forEach(n)}function r(t){return"function"==typeof t}function c(t,n){return t!=t?n==n:t!==n||t&&"object"==typeof t||"function"==typeof t}function a(t,n){t.appendChild(n)}function i(t){t.parentNode.removeChild(t)}function s(t){return document.createElement(t)}function u(){return t=" ",document.createTextNode(t);var t}function l(t,n,e){null==e?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}let f;function d(t){f=t}const p=[],$=[],h=[],m=[],g=Promise.resolve();let y=!1;function b(t){h.push(t)}let _=!1;const x=new Set;function v(){if(!_){_=!0;do{for(let t=0;t<p.length;t+=1){const n=p[t];d(n),k(n.$$)}for(d(null),p.length=0;$.length;)$.pop()();for(let t=0;t<h.length;t+=1){const n=h[t];x.has(n)||(x.add(n),n())}h.length=0}while(p.length);for(;m.length;)m.pop()();y=!1,_=!1,x.clear()}}function k(t){if(null!==t.fragment){t.update(),o(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(b)}}const w=new Set;function E(t,n){-1===t.$$.dirty[0]&&(p.push(t),y||(y=!0,g.then(v)),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function A(c,a,s,u,l,p,$,h=[-1]){const m=f;d(c);const g=c.$$={fragment:null,ctx:null,props:p,update:t,not_equal:l,bound:e(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(a.context||(m?m.$$.context:[])),callbacks:e(),dirty:h,skip_bound:!1,root:a.target||m.$$.root};$&&$(g.root);let y=!1;if(g.ctx=s?s(c,a.props||{},((t,n,...e)=>{const o=e.length?e[0]:n;return g.ctx&&l(g.ctx[t],g.ctx[t]=o)&&(!g.skip_bound&&g.bound[t]&&g.bound[t](o),y&&E(c,t)),n})):[],g.update(),y=!0,o(g.before_update),g.fragment=!!u&&u(g.ctx),a.target){if(a.hydrate){const t=function(t){return Array.from(t.childNodes)}(a.target);g.fragment&&g.fragment.l(t),t.forEach(i)}else g.fragment&&g.fragment.c();a.intro&&((_=c.$$.fragment)&&_.i&&(w.delete(_),_.i(x))),function(t,e,c,a){const{fragment:i,on_mount:s,on_destroy:u,after_update:l}=t.$$;i&&i.m(e,c),a||b((()=>{const e=s.map(n).filter(r);u?u.push(...e):o(e),t.$$.on_mount=[]})),l.forEach(b)}(c,a.target,a.anchor,a.customElement),v()}var _,x;d(m)}const{api:C}=window;const N=t=>async function(t,n,e={}){try{const o=await C.invoke(t,{action:n,data:e});return console.log("risposta",o),o}catch(t){return console.error("Api call failed",t),null}}("api-app","getDownloadPath",{fileName:t});function j(n){let e,o,r,c,f,d;return{c(){e=s("main"),o=s("h1"),o.textContent=`test ${O}`,r=u(),c=s("button"),c.textContent="click",l(c,"class","svelte-1xklnl"),l(e,"class","svelte-1xklnl")},m(t,i){var s,u,l,p;!function(t,n,e){t.insertBefore(n,e||null)}(t,e,i),a(e,o),a(e,r),a(e,c),f||(s=c,u="click",l=n[0],s.addEventListener(u,l,p),d=()=>s.removeEventListener(u,l,p),f=!0)},p:t,i:t,o:t,d(t){t&&i(e),f=!1,d()}}}let O="";function L(t){return[async function(){const t=await N("pippo");console.log("risultato",t)}]}return new class extends class{$destroy(){!function(t,n){const e=t.$$;null!==e.fragment&&(o(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}(this,1),this.$destroy=t}$on(t,n){const e=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return e.push(n),()=>{const t=e.indexOf(n);-1!==t&&e.splice(t,1)}}$set(t){var n;this.$$set&&(n=t,0!==Object.keys(n).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}{constructor(t){super(),A(this,t,L,j,c,{})}}({target:document.body,props:{name:"world"}})}();
//# sourceMappingURL=bundle.js.map
