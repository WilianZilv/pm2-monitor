(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{48:function(e,t,c){},52:function(e,t,c){},55:function(e,t,c){},87:function(e,t,c){},88:function(e,t,c){},89:function(e,t,c){},90:function(e,t,c){"use strict";c.r(t);var n=c(1),r=c.n(n),s=c(40),a=c.n(s),o=(c(48),c(41)),i=c(2),l=c(8),u=c(3),j=c(42),d=(c(52),c(0));function b(e){var t=e.columns,c=e.data,n=Object(j.useTable)({columns:t,data:c}),r=n.getTableProps,s=n.getTableBodyProps,a=n.headerGroups,o=n.rows,l=n.prepareRow;return t&&c?Object(d.jsx)("div",{className:"table-wrapper",children:Object(d.jsxs)("table",Object(i.a)(Object(i.a)({},r()),{},{children:[Object(d.jsx)("thead",{children:a.map((function(e){return Object(d.jsx)("tr",Object(i.a)(Object(i.a)({},e.getHeaderGroupProps()),{},{children:e.headers.map((function(e){return Object(d.jsx)("th",Object(i.a)(Object(i.a)({},e.getHeaderProps({style:e.style})),{},{children:e.render("Header")}))}))}))}))}),Object(d.jsx)("tbody",Object(i.a)(Object(i.a)({},s()),{},{children:o.map((function(e){return l(e),Object(d.jsx)("tr",Object(i.a)(Object(i.a)({},e.getRowProps()),{},{children:e.cells.map((function(e){return Object(d.jsx)("td",Object(i.a)(Object(i.a)({},e.getCellProps()),{},{children:e.render("Cell")}))}))}))}))}))]}))}):Object(d.jsx)(d.Fragment,{})}c(54),c(55);var O=c(43),h=c.n(O)()();function f(e){var t=e.data,c=e.ids,r=e.onFilter,s=Object(n.useMemo)((function(){return function(e){var t=e.ids,c=e.onFilter;return[{Header:"ID",accessor:"pm_id"},{Header:"RAM",accessor:"monit.memory",Cell:function(e){return(e.value/1e6).toFixed(1)+"MB"},style:{width:70}},{Header:"CPU",accessor:"monit.cpu",Cell:function(e){var t=e.value;return String(t.toFixed(0))+"%"},style:{width:32}},{Header:"",accessor:"stop",Cell:function(e){var t=e.row;return Object(d.jsx)("button",{className:"process-table-button",onClick:function(){return h.emit("stop",t.values.pm_id)},children:"Parar"})}},{Header:"",accessor:"restart",Cell:function(e){var t=e.row;return Object(d.jsx)("button",{className:"process-table-button",onClick:function(){return h.emit("restart",t.values.pm_id)},children:"Reiniciar"})}},{Header:"STATUS",accessor:"pm2_env.status",Cell:function(e){var t=e.value;return Object(d.jsx)("div",{className:"status-col",children:Object(d.jsx)("span",{className:"dot dot-".concat(t)})})}},{Header:"NAME",accessor:"name"},{Header:"LOGS",Cell:function(e){var n=e.row;return Object(d.jsx)("input",{className:"checkbox",type:"checkbox",checked:t.includes(n.values.pm_id),onChange:function(){return c(n.values.pm_id)}})}}]}({ids:c,onFilter:r})}),[c]);return Object(d.jsxs)("div",{className:"processes-table-container",children:[Object(d.jsx)("h3",{children:"Processos"}),Object(d.jsx)(b,{columns:s,data:t})]})}c(87);function m(e){var t=e.data,c=e.isLast,r=e.autoScroll,s=Object(n.useRef)();return Object(n.useEffect)((function(){c&&r&&s.current.scrollIntoView({behaviour:"smooth"})}),[s,t,c,r]),Object(d.jsx)(d.Fragment,{children:Object(d.jsxs)("div",{ref:s,className:"process-logs-item",children:[!t.hideInfo&&Object(d.jsx)(d.Fragment,{children:Object(d.jsxs)("center",{className:"process-logs-item-divider process-logs-item-divider-".concat(t.channel),children:[Object(d.jsxs)("code",{className:"process-logs-item-info "+t.channel,children:["[",t.pname,"]"]}),Object(d.jsxs)("code",{className:"process-logs-item-info "+t.channel,children:["[",t.time,"]"]})]})}),Object(d.jsx)("code",{className:"log-".concat(t.channel),children:t.data}),t.showInfoBelow&&Object(d.jsxs)("center",{className:"process-logs-item-divider",children:[Object(d.jsxs)("code",{className:"process-logs-item-info "+t.channel,children:["[",t.pname,"]"]}),Object(d.jsxs)("code",{className:"process-logs-item-info "+t.channel,children:["[",t.time,"]"]})]})]})})}function p(e){e=e.reverse();for(var t=0;t<e.length-1&&!(t>e.length-1);t++){var c=e[t+1],n=Object(i.a)({},e[t]);n.pname==c.pname&&n.channel===c.channel&&(n.hideInfo=!0),0===t&&(n.showInfoBelow=!0),e[t]=n}return e.reverse()}function v(e){var t=e.data,c=Object(n.useState)(!0),r=Object(u.a)(c,2),s=r[0],a=r[1],o=Object(n.useState)(!1),i=Object(u.a)(o,2),l=i[0],j=i[1],b=Object(n.useState)([]),O=Object(u.a)(b,2),h=O[0],f=O[1],v=Object(n.useState)([]),x=Object(u.a)(v,2),g=x[0],N=x[1];return Object(n.useEffect)((function(){if(!l){var e=t.filter((function(e){return"out"===e.channel})),c=t.filter((function(e){return"err"===e.channel}));e=p(e),c=p(c),f(e),N(c)}}),[t,l]),Object(d.jsxs)("div",{className:"process-logs-container",children:[Object(d.jsx)("h3",{children:"Logs"}),Object(d.jsxs)("div",{className:"process-logs-lists-container",children:[Object(d.jsx)("div",{className:"process-logs-list",children:h.map((function(e,t){return Object(d.jsx)(m,{isLast:t===h.length-1,autoScroll:s,data:e},t)}))}),Object(d.jsx)("div",{className:"process-logs-list err",children:g.map((function(e,t){return Object(d.jsx)(m,{isLast:t===g.length-1,autoScroll:s,data:e},t)}))})]}),Object(d.jsxs)("div",{className:"process-logs-footer",children:[Object(d.jsxs)("label",{children:[Object(d.jsx)("input",{id:"autoScroll",type:"checkbox",checked:s,onChange:function(){return a((function(e){return!e}))}}),"\t","Scroll Autom\xe1tico"]}),Object(d.jsxs)("label",{children:[Object(d.jsx)("input",{id:"autoScroll",type:"checkbox",checked:l,onChange:function(){return j((function(e){return!e}))}}),"\t","Pausar"]})]})]})}c(88);c(89);var x=function(){var e=Object(n.useState)([]),t=Object(u.a)(e,2),c=t[0],r=t[1],s=Object(n.useState)({}),a=Object(u.a)(s,2),j=a[0],b=a[1],O=Object(n.useState)([]),m=Object(u.a)(O,2),p=m[0],x=m[1],g=Object(n.useState)([]),N=Object(u.a)(g,2),S=N[0],C=N[1];return Object(n.useEffect)((function(){h.on("processes",r),h.on("log",(function(e){return b((function(t){var c=e.pname+e.channel;return t[c]||(t[c]=[]),t[c]=[].concat(Object(l.a)(t[c]),[e]).reverse().slice(0,200).reverse(),Object(i.a)({},t)}))}))}),[]),Object(n.useEffect)((function(){var e=Object.values(j);if(!e.length)return C([]);e=e.reduce((function(e,t){return[].concat(Object(l.a)(e),Object(l.a)(t))})),p.length&&(e=e.filter((function(e){return p.includes(e.pid)})));var t,c={},n=[],r=Object(o.a)(e.slice().reverse());try{for(r.s();!(t=r.n()).done;){var s=t.value,a=s.pname+s.channel;c[a]||(c[a]=1),c[a]>150||(n.push(s),c[a]+=1)}}catch(i){r.e(i)}finally{r.f()}e=n.sort((function(e,t){return e.timestamp-t.timestamp})),C(e)}),[j,p]),Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)(f,{data:c,ids:p,onFilter:function(e){x((function(t){return t=t.includes(e)?t.filter((function(t){return t!==e})):[e].concat(Object(l.a)(t))}))}}),Object(d.jsx)(v,{data:S,ids:p})]})},g=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,91)).then((function(t){var c=t.getCLS,n=t.getFID,r=t.getFCP,s=t.getLCP,a=t.getTTFB;c(e),n(e),r(e),s(e),a(e)}))};a.a.render(Object(d.jsx)(r.a.StrictMode,{children:Object(d.jsx)(x,{})}),document.getElementById("root")),g()}},[[90,1,2]]]);
//# sourceMappingURL=main.6002fe89.chunk.js.map