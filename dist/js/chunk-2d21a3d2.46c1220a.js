(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21a3d2"],{bb51:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-container",[r("v-row",{attrs:{justify:"center"}},[r("v-col",{attrs:{cols:"12",md:"10",lg:"9"}},[r("v-carousel",t._l(t.meetups,(function(e){return r("v-carousel-item",{key:e.id,staticStyle:{cursor:"pointer"},attrs:{src:e.imgUrl},on:{click:function(r){return t.onLoadMeetup(e.id)}}},[r("v-row",{staticClass:"fill-height pb-4",attrs:{justify:"center",align:"end"}},[r("v-sheet",{staticClass:"title mb-9 px-4 py-2",attrs:{color:"rgba(0, 0, 0, 0.4)"}},[t._v(t._s(e.title))])],1)],1)})),1),t.loading?r("v-progress-linear",{attrs:{indeterminate:"",color:"primary darken-1"}}):t._e()],1)],1)],1)},s=[],o={components:{},computed:{meetups:function(){return this.$store.getters.featureMeetups},loading:function(){return this.$store.getters.loading}},methods:{onLoadMeetup:function(t){this.$router.push("/meetups/".concat(t))}},mounted:function(){this.$store.dispatch("fetchMeetups")}},i=o,c=r("2877"),u=Object(c["a"])(i,n,s,!1,null,null,null);e["default"]=u.exports}}]);
//# sourceMappingURL=chunk-2d21a3d2.46c1220a.js.map