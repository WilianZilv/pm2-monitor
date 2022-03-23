(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{48:function(e,t,c){},52:function(e,t,c){},55:function(e,t,c){},87:function(e,t,c){},88:function(e,t,c){},89:function(e,t,c){},90:function(e,t,c){"use strict";c.r(t);var n=c(1),r=c.n(n),s=c(40),a=c.n(s),i=(c(48),c(41)),o=c(2),u=c(8),l=c(7),j=c(42),b=(c(52),c(0));function d(e){var t=e.columns,c=e.data,n=Object(j.useTable)({columns:t,data:c}),r=n.getTableProps,s=n.getTableBodyProps,a=n.headerGroups,i=n.rows,u=n.prepareRow;return t&&c?Object(b.jsx)("div",{className:"table-wrapper",children:Object(b.jsxs)("table",Object(o.a)(Object(o.a)({},r()),{},{children:[Object(b.jsx)("thead",{children:a.map((function(e){return Object(b.jsx)("tr",Object(o.a)(Object(o.a)({},e.getHeaderGroupProps()),{},{children:e.headers.map((function(e){return Object(b.jsx)("th",Object(o.a)(Object(o.a)({},e.getHeaderProps({style:e.style})),{},{children:e.render("Header")}))}))}))}))}),Object(b.jsx)("tbody",Object(o.a)(Object(o.a)({},s()),{},{children:i.map((function(e){return u(e),Object(b.jsx)("tr",Object(o.a)(Object(o.a)({},e.getRowProps()),{},{children:e.cells.map((function(e){return Object(b.jsx)("td",Object(o.a)(Object(o.a)({},e.getCellProps()),{},{children:e.render("Cell")}))}))}))}))}))]}))}):Object(b.jsx)(b.Fragment,{})}c(54),c(55);var O=c(43),f=c.n(O)()();function h(e){var t=e.data,c=e.ids,r=e.onFilter,s=Object(n.useMemo)((function(){return function(e){var t=e.ids,c=e.onFilter;return[{Header:"ID",accessor:"pm_id"},{Header:"NAME",accessor:"name"},{Header:"RAM",accessor:"monit.memory",Cell:function(e){return(e.value/1e6).toFixed(1)+"MB"},style:{width:84}},{Header:"CPU",accessor:"monit.cpu",Cell:function(e){var t=e.value;return String(t)+" %"},style:{width:64}},{Header:"STATUS",accessor:"pm2_env.status",Cell:function(e){var t=e.value;return Object(b.jsx)("div",{className:"status-col",children:Object(b.jsx)("span",{className:"dot ".concat("online"===t?t:"")})})}},{Header:"LOGS",Cell:function(e){var n=e.row;return Object(b.jsx)("input",{className:"checkbox",type:"checkbox",checked:t.includes(n.values.pm_id),onChange:function(){return c(n.values.pm_id)}})}},{Header:"",accessor:"stop",Cell:function(e){var t=e.row;return Object(b.jsx)("button",{onClick:function(){return f.emit("stop",t.values.pm_id)},children:"Parar"})}},{Header:"",accessor:"restart",Cell:function(e){var t=e.row;return Object(b.jsx)("button",{onClick:function(){return f.emit("restart",t.values.pm_id)},children:"Reiniciar"})}}]}({ids:c,onFilter:r})}),[c]);return Object(b.jsxs)("div",{className:"processes-table-container",children:[Object(b.jsx)("h3",{children:"Processos"}),Object(b.jsx)(d,{columns:s,data:t})]})}c(87);function m(e){var t=e.data,c=e.isLast,r=e.autoScroll,s=Object(n.useRef)();return Object(n.useEffect)((function(){c&&r&&s.current.scrollIntoView({behaviour:"smooth"})}),[s,t,c,r]),Object(b.jsx)(b.Fragment,{children:Object(b.jsx)("div",{ref:s,className:"process-logs-item",children:Object(b.jsxs)("code",{children:[Object(b.jsxs)("code",{className:"process-logs-item-info "+t.channel,children:["[",t.time," - ",t.pname,"]:"," "]}),t.data]})})})}function p(e){var t=e.data,c=Object(n.useState)(!0),r=Object(l.a)(c,2),s=r[0],a=r[1],i=Object(n.useMemo)((function(){return{out:t.filter((function(e){return"out"===e.channel})),err:t.filter((function(e){return"err"===e.channel}))}}),[t]),o=i.out,u=i.err;return Object(b.jsxs)("div",{className:"process-logs-container",children:[Object(b.jsx)("h3",{children:"Logs"}),Object(b.jsxs)("div",{className:"process-logs-lists-container",children:[Object(b.jsx)("div",{className:"process-logs-list",children:o.map((function(e,t){return Object(b.jsx)(m,{isLast:t===o.length-1,autoScroll:s,data:e},t)}))}),Object(b.jsx)("div",{className:"process-logs-list",children:u.map((function(e,t){return Object(b.jsx)(m,{isLast:t===u.length-1,autoScroll:s,data:e},t)}))})]}),Object(b.jsx)("div",{className:"process-logs-footer",children:Object(b.jsxs)("label",{children:[Object(b.jsx)("input",{id:"autoScroll",type:"checkbox",checked:s,onChange:function(){return a((function(e){return!e}))}}),"\t","Scroll Autom\xe1tico"]})})]})}c(88);function v(){var e=Object(n.useState)([]),t=Object(l.a)(e,2),c=t[0],r=t[1],s=Object(n.useState)([]),a=Object(l.a)(s,2),i=(a[0],a[1]),o=Object(n.useRef)(),j=Object(n.useRef)();return Object(n.useEffect)((function(){f.on("terminalData",(function(e){var t;t=e,r((function(e){return t.length&&["clear","cls"].includes(t[0])?[]:[].concat(Object(u.a)(e),Object(u.a)(t))}))}))}),[]),Object(n.useEffect)((function(){o.current.scrollTo(0,o.current.scrollHeight)}),[c]),Object(b.jsxs)("div",{className:"terminal-container",children:[Object(b.jsx)("h3",{children:"Terminal"}),Object(b.jsx)("div",{className:"terminal-body",ref:o,children:c.map((function(e,t){return Object(b.jsx)("p",{children:Object(b.jsx)("span",{children:e})},t)}))}),Object(b.jsx)("input",{className:"terminal-input",onKeyDown:function(e){switch(e.keyCode){case 13:var t=j.current.value;j.current.value="",f.emit("cmd",t),i((function(e){return[].concat(Object(u.a)(e),[t])}));break;case 67:if(e.ctrlKey){if(j.current.value){j.current.value="";break}f.emit("cmd","SIGTERM")}break;default:return}},ref:j})]})}c(89);var x=function(){var e=Object(n.useState)([]),t=Object(l.a)(e,2),c=t[0],r=t[1],s=Object(n.useState)({}),a=Object(l.a)(s,2),j=a[0],d=a[1],O=Object(n.useState)([]),m=Object(l.a)(O,2),x=m[0],g=m[1];Object(n.useEffect)((function(){f.on("processes",r),f.on("log",(function(e){return d((function(t){var c=e.pname+e.channel;return t[c]||(t[c]=[]),t[c]=[].concat(Object(u.a)(t[c]),[e]).reverse().slice(0,200).reverse(),Object(o.a)({},t)}))}))}),[]);var S=Object(n.useMemo)((function(){var e=Object.values(j);if(!e.length)return[];e=e.reduce((function(e,t){return[].concat(Object(u.a)(e),Object(u.a)(t))})),x.length&&(e=e.filter((function(e){return x.includes(e.pid)})));var t,c={},n=[],r=Object(i.a)(e.slice().reverse());try{for(r.s();!(t=r.n()).done;){var s=t.value,a=s.pname+s.channel;c[a]||(c[a]=1),c[a]>200||(n.push(s),c[a]+=1)}}catch(o){r.e(o)}finally{r.f()}return n.sort((function(e,t){return e.timestamp-t.timestamp}))}),[j,x]);return Object(b.jsxs)(b.Fragment,{children:[Object(b.jsxs)("main",{children:[Object(b.jsxs)("div",{children:[Object(b.jsx)(v,{}),Object(b.jsx)(h,{data:c,ids:x,onFilter:function(e){g((function(t){return t=t.includes(e)?t.filter((function(t){return t!==e})):[e].concat(Object(u.a)(t))}))}})]}),Object(b.jsx)(p,{data:S,ids:x})]}),Object(b.jsx)("footer",{})]})},g=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,91)).then((function(t){var c=t.getCLS,n=t.getFID,r=t.getFCP,s=t.getLCP,a=t.getTTFB;c(e),n(e),r(e),s(e),a(e)}))};a.a.render(Object(b.jsx)(r.a.StrictMode,{children:Object(b.jsx)(x,{})}),document.getElementById("root")),g()}},[[90,1,2]]]);
//# sourceMappingURL=main.5aa53b23.chunk.js.map