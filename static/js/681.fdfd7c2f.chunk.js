"use strict";(self.webpackChunktrendcrm=self.webpackChunktrendcrm||[]).push([[681],{92681:function(t,e,r){r.r(e);var o=r(4942),n=r(70885),a=r(72791),l=r(96015),s=r(69361),i=r(60142),u=r(90166),d=r(40286),c=r(54330),x=r(59434),f=r(87026),b=r(86708),g=r(57689),m=r(11087),p=r(80184);e.default=function(){var t,e=(0,g.s0)(),r=(0,m.lr)(),k=(0,n.Z)(r,2),h=k[0],C=k[1],v=(0,x.v9)((function(t){return t.ordersAll.tHeadColumnFiltered})),H=(0,x.v9)((function(t){return t.ordersAll.getStatuses})),M=(0,x.I0)(),Z=(h.get("status"),(0,x.v9)((function(t){return t.ordersAll.statusName}))),w=Z?H.findIndex((function(t){return t.id===Z})):0,B=(0,a.useState)(Number(w)),N=(0,n.Z)(B,2),S=N[0],T=N[1],j=(t={backgroundColor:d.k.tabBgColor},(0,o.Z)(t,"& .".concat(s.Z.scrollButtons),{"&.Mui-disabled":{opacity:.3},maxHeight:"32px"}),(0,o.Z)(t,"& .MuiTabs-indicator",{backgroundColor:"#fff",width:0}),t),A=function(t){M((0,f.Me)({id:"start",str:0})),M((0,f.Me)({id:"page",str:0}));var r=t.target.id;"0"===t.target.id||0===t.target.id?(M((0,f.Me)({id:"statusName",str:null})),e("/trendcrm/orders")):Number(r)&&(M((0,f.Me)({id:"statusName",str:r})),C((0,m.fW)({status:r}))),I()},I=function(){sessionStorage.setItem("selected",""),(null===v||void 0===v?void 0:v.length)>0?M((0,b.lY)()):M((0,b.zk)())};return(0,p.jsx)(l.Z,{sx:{flexGrow:1,maxWidth:"100%",backgroundColor:"#fff",maxHeight:"32px"},children:(0,p.jsxs)(i.Z,{value:S,onChange:function(t,e){T(e)},variant:"scrollable",scrollButtons:!0,allowScrollButtonsMobile:!0,"aria-label":"visible arrows tabs example",sx:j,children:[H.map((function(t,e){return(0,p.jsx)(u.Z,{onClick:A,id:t.id,sx:{borderTop:"6px solid ".concat(t.style),padding:"0px 10px",fontSize:"12px",color:d.k.tabHeaderTextColor,minWidth:"min-content",minHeight:"32px",maxHeight:"32px",margin:"0px 1px 0px 1px",textTransform:"none",backgroundColor:d.k.tableHeaderBgColor,"&.Mui-selected":{color:d.k.tabHeaderTextColor,backgroundColor:"#fff"}},label:"".concat(t.name,": ").concat(t.count)},e)})),(0,p.jsx)(c.t,{isbutton:!0})]})})}}}]);
//# sourceMappingURL=681.fdfd7c2f.chunk.js.map