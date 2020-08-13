(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-040fbbf3"],{3542:function(e,t,o){"use strict";o.r(t);var n=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"app-container"},[o("el-card",{staticClass:"box-card"},[o("h3",[e._v("商品介绍")]),e._v(" "),o("el-form",{ref:"goods",attrs:{rules:e.rules,model:e.goods,"label-width":"150px"}},[o("el-form-item",{staticStyle:{width:"500px"},attrs:{label:"商品名称",prop:"goodsName"}},[o("el-input",{model:{value:e.goods.goodsName,callback:function(t){e.$set(e.goods,"goodsName",t)},expression:"goods.goodsName"}})],1),e._v(" "),o("el-form-item",{staticStyle:{width:"500px"},attrs:{label:"商品价格",prop:"price"}},[o("el-input",{model:{value:e.goods.price,callback:function(t){e.$set(e.goods,"price",t)},expression:"goods.price"}})],1),e._v(" "),o("el-form-item",{staticStyle:{width:"500px"},attrs:{label:"商品排序",prop:"sort"}},[o("el-input",{model:{value:e.goods.sort,callback:function(t){e.$set(e.goods,"sort",t)},expression:"goods.sort"}})],1),e._v(" "),o("el-form-item",{staticStyle:{width:"500px"},attrs:{label:"已售数量",prop:"sales"}},[o("el-input",{model:{value:e.goods.sales,callback:function(t){e.$set(e.goods,"sales",t)},expression:"goods.sales"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"厂商分类",prop:"factoryId"}},[o("el-select",{attrs:{placeholder:"选择厂商"},model:{value:e.goods.factoryId,callback:function(t){e.$set(e.goods,"factoryId",t)},expression:"goods.factoryId"}},e._l(e.factoryList,(function(e){return o("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),e._v(" "),o("el-form-item",{attrs:{label:"商品分类",prop:"secondTypeId"}},[o("el-select",{attrs:{clearable:""},on:{change:e.changeFirstType},model:{value:e.goods.firstTypeId,callback:function(t){e.$set(e.goods,"firstTypeId",t)},expression:"goods.firstTypeId"}},e._l(e.goodsFirstTypeAll,(function(e){return o("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1),e._v(" "),o("el-select",{attrs:{clearable:""},model:{value:e.goods.secondTypeId,callback:function(t){e.$set(e.goods,"secondTypeId",t)},expression:"goods.secondTypeId"}},e._l(e.goodsSecondTypeAll,(function(e){return o("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1),e._v(" "),o("el-form-item",{attrs:{label:"商品详情",prop:"goodsDetails"}},[o("el-upload",{attrs:{action:e.uploadPath,headers:e.headers,"on-exceed":e.uploadOverrun,"on-success":e.handleGalleryUrl,"on-remove":e.handleRemove,multiple:"",accept:".jpg,.jpeg,.png,.gif","list-type":"picture-card","file-list":e.goods.goodsDetails}},[o("i",{staticClass:"el-icon-plus"})])],1),e._v(" "),o("el-form-item",{attrs:{label:"轮播图",prop:"goodsBanners"}},[o("el-upload",{attrs:{action:e.uploadPath,headers:e.headers,"on-exceed":e.uploadOverrun1,"on-success":e.handleGalleryUrl1,"on-remove":e.handleRemove1,multiple:"",accept:".jpg,.jpeg,.png,.gif","list-type":"picture-card","file-list":e.goods.goodsBanners}},[o("i",{staticClass:"el-icon-plus"})])],1),e._v(" "),o("el-form-item",{staticStyle:{width:"500px"},attrs:{label:"内容",prop:"content"}},[o("el-input",{attrs:{type:"textarea"},model:{value:e.goods.content,callback:function(t){e.$set(e.goods,"content",t)},expression:"goods.content"}})],1)],1)],1),e._v(" "),o("el-card",{staticClass:"box-card"},[o("h3",[e._v("商品规格")]),e._v(" "),o("el-row",{attrs:{gutter:20,type:"flex",align:"middle"}},[o("el-col",{staticStyle:{width:"150px","text-align":"right"},attrs:{span:4}},[o("el-button",{attrs:{type:"text"}},[e._v("多规格支持")])],1),e._v(" "),o("el-col",{attrs:{span:4}},[o("el-button",{attrs:{plain:!0,type:"primary"},on:{click:e.handleSpecificationShow}},[e._v("添加")])],1)],1),e._v(" "),o("el-table",{staticStyle:{width:"800px",margin:"30px 0 0 150px"},attrs:{data:e.specifications}},[o("el-table-column",{attrs:{property:"name",label:"规格名称",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[o("span",[e._v(e._s(n.name))])]}}])}),e._v(" "),o("el-table-column",{attrs:{property:"specSale",label:"商品售价",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[o("span",[e._v(e._s(n.price)+"元")])]}}])}),e._v(" "),o("el-table-column",{attrs:{property:"stock",label:"库存数量",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[o("span",[e._v(e._s(n.stock)+"件")])]}}])}),e._v(" "),o("el-table-column",{attrs:{align:"center",label:"操作",width:"250","class-name":"small-padding fixed-width"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[o("el-button",{attrs:{type:"danger",size:"mini"},on:{click:function(t){return e.handleSpecificationDelete(n)}}},[e._v("删除")])]}}])})],1),e._v(" "),o("el-dialog",{attrs:{visible:e.specVisiable,title:"设置规格"},on:{"update:visible":function(t){e.specVisiable=t}}},[o("el-form",{ref:"specForm",staticStyle:{width:"400px","margin-left":"50px"},attrs:{rules:e.rules,model:e.specForm,"status-icon":"","label-position":"left","label-width":"100px"}},[o("el-form-item",{attrs:{label:"规格名称",prop:"name"}},[o("el-input",{attrs:{maxlength:"15"},model:{value:e.specForm.name,callback:function(t){e.$set(e.specForm,"name",t)},expression:"specForm.name"}})],1),e._v(" "),o("el-form-item",{attrs:{label:"商品进价",prop:"purchase"}},[o("el-input",{attrs:{placeholder:"0.00"},model:{value:e.specForm.purchase,callback:function(t){e.$set(e.specForm,"purchase",t)},expression:"specForm.purchase"}},[o("template",{slot:"append"},[e._v("元")])],2)],1),e._v(" "),o("el-form-item",{attrs:{label:"商品售价",prop:"price"}},[o("el-input",{attrs:{placeholder:"0.00"},model:{value:e.specForm.price,callback:function(t){e.$set(e.specForm,"price",t)},expression:"specForm.price"}},[o("template",{slot:"append"},[e._v("元")])],2)],1),e._v(" "),o("el-form-item",{attrs:{label:"库存数量",prop:"stock"}},[o("el-input",{attrs:{tye:"number"},model:{value:e.specForm.stock,callback:function(t){e.$set(e.specForm,"stock",t)},expression:"specForm.stock"}})],1)],1),e._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(t){e.specVisiable=!1}}},[e._v("取消")]),e._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:e.handleSpecificationAdd}},[e._v("确定")])],1)],1)],1),e._v(" "),o("el-card",{staticClass:"box-card"},[o("h3",[e._v("首页显示")]),e._v(" "),o("el-form",{ref:"indexForm",attrs:{rules:e.rules,model:e.indexData,"label-width":"150px"}},[o("el-form-item",{attrs:{label:"是否显示在首页",prop:"home"}},[o("el-radio-group",{model:{value:e.indexData.home,callback:function(t){e.$set(e.indexData,"home",t)},expression:"indexData.home"}},[o("el-radio",{attrs:{label:!1,value:!1}},[e._v("不显示")]),e._v(" "),o("el-radio",{attrs:{label:!0,value:!0}},[e._v("显示")])],1)],1),e._v(" "),o("el-form-item",{attrs:{label:"首页专区",prop:"type"}},[o("el-select",{attrs:{placeholder:"选择专区"},model:{value:e.indexData.type,callback:function(t){e.$set(e.indexData,"type",t)},expression:"indexData.type"}},[o("el-option",{attrs:{label:"体验品专区",value:0}}),e._v(" "),o("el-option",{attrs:{label:"消费商专区",value:1}}),e._v(" "),o("el-option",{attrs:{label:"平价专区",value:2}})],1)],1)],1)],1),e._v(" "),o("div",{staticClass:"op-container"},[o("el-button",{on:{click:e.handleCancel}},[e._v("取消")]),e._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:e.handlePublish}},[e._v("提交")])],1)],1)},r=[],a=o("0b46"),s=(o("c904"),o("cc57"),o("9a33"),o("6d57"),o("4ec3")),i=o("5f87"),c={name:"GoodsCreate",data:function(){return{uploadPath:s["V"],goodsFirstTypeAll:[],goodsSecondTypeAll:[],factoryList:[],goods:{goodsName:"",price:"",sort:"",factoryId:"",firstTypeId:"",secondTypeId:"",goodsDetails:[],goodsBanners:[],content:""},specVisiable:!1,specForm:{name:"",price:"",stock:""},specifications:[],indexData:{home:!1,type:""},rules:{goodsName:[{required:!0,message:"请输入商品名称",trigger:"blur"}],price:[{required:!0,message:"请输入商品价格",trigger:"blur"}],sort:[{required:!0,message:"请输入商品排序",trigger:"blur"}],factoryId:[{required:!0,message:"请选择所属厂家",trigger:"blur"}],secondTypeId:[{required:!0,message:"请选择商品二级分类",trigger:"blur"}],goodsDetails:[{required:!0,message:"请上传商品详情图片",trigger:"blur"}],goodsBanners:[{required:!0,message:"请上传商品轮播图",trigger:"blur"}],name:[{required:!0,message:"请输入规格名称",trigger:"blur"}],sales:[{required:!0,message:"请输入售卖数量",trigger:"blur"}],stock:[{required:!0,message:"请输入库存数量",trigger:"blur"}],home:[{required:!0,message:"请选择是否在首页展示",trigger:"blur"}],type:[{required:!0,message:"请选择首页专区",trigger:"blur"}],content:[{required:!0,message:"请输入商品内容",trigger:"blur"}],purchase:[{required:!0,message:"请输入商品进价",trigger:"blur"}]}}},computed:{headers:function(){return{token:Object(i["a"])()}}},created:function(){this.init(),this.$route.query.id?this.getGoodsDetailById():(this.goods={goodsName:"",price:"",sort:"",sales:"",factoryId:"",firstTypeId:"",secondTypeId:"",goodsDetails:[],goodsBanners:[],content:""},this.specifications=[],this.indexData={home:!1,type:""})},methods:{getGoodsDetailById:function(){var e=this,t={id:this.$route.query.id};Object(s["p"])(t).then((function(t){var o=t.data.data,n=[];o.info.split(",").forEach((function(e){var t={name:e,url:e};n.push(t)}));var r=[];o.photo.split(",").forEach((function(e){var t={name:e,url:e};r.push(t)})),e.getGoodsTypeAll(o.classification.parentId,"second"),e.goods={goodsName:o.name,price:o.price,sort:o.sort,sales:o.sales,factoryId:o.supplierId.id,firstTypeId:o.classification.parentId,secondTypeId:o.classification.id,goodsDetails:n,goodsBanners:r,content:o.content},e.specifications=o.specifications,e.indexData={home:o.home,type:o.type}})).catch((function(){e.goods={goodsName:"",price:"",sort:"",sales:"",factoryId:"",firstTypeId:"",secondTypeId:"",goodsDetails:[],goodsBanners:[],content:""},e.specifications=[],e.indexData={home:!1,type:""}}))},init:function(){this.getGoodsTypeAll(0,"first"),this.getFactoryList()},getFactoryList:function(){var e=this;Object(s["j"])().then((function(t){e.factoryList=t.data.data})).catch((function(){e.factoryList=[]}))},changeFirstType:function(){this.goods.secondTypeId="",this.getGoodsTypeAll(this.goods.firstTypeId,"second")},getGoodsTypeAll:function(e,t){var o=this,n={parentId:e};Object(s["v"])(n).then((function(e){"first"===t?o.goodsFirstTypeAll=e.data.data:o.goodsSecondTypeAll=e.data.data})).catch((function(){o.goodsFirstTypeAll=[],o.goodsSecondTypeAll=[]}))},handleCancel:function(){this.$router.push({path:"/goods/list"})},handlePublish:function(){var e=this;if(this.specifications.length){var t=[];this.goods.goodsDetails.forEach((function(e){t.push(e.url)}));var o=[];this.goods.goodsBanners.forEach((function(e){o.push(e.url)}));var n="object"===Object(a["a"])(this.goods.factoryId)?this.goods.factoryId.id:this.goods.factoryId,r={name:this.goods.goodsName,price:this.goods.price,sort:this.goods.sort,sales:this.goods.sales,supplierId:{id:n},classification:{id:this.goods.secondTypeId},photo:o.join(","),info:t.join(","),specifications:this.specifications,home:this.indexData.home,type:this.indexData.type,content:this.goods.content};this.$route.query.id?(r.id=this.$route.query.id,Object(s["x"])(r).then((function(t){e.$notify.success({title:"成功",message:"商品修改成功"}),e.$router.push({path:"/goods/list"})})).catch((function(t){e.$notify.error({title:"失败",message:t.data.message})}))):Object(s["n"])(r).then((function(t){e.$notify.success({title:"成功",message:"商品添加成功"}),e.$router.push({path:"/goods/list"})})).catch((function(t){e.$notify.error({title:"失败",message:t.data.message})}))}else this.$notify.error({title:"失败",message:"请添加规格"})},uploadOverrun:function(){this.$message({type:"error",message:"上传文件个数超出限制!最多上传5张图片!"})},handleGalleryUrl:function(e,t,o){0===e.code&&this.goods.goodsDetails.push({name:e.data,url:e.data})},handleRemove:function(e,t){for(var o=0;o<this.goods.goodsDetails.length;o++){var n;n=void 0===e.response?e.url:e.response.data.url,this.goods.goodsDetails[o].url===n&&this.goods.goodsDetails.splice(o,1)}},uploadOverrun1:function(){this.$message({type:"error",message:"上传文件个数超出限制!最多上传5张图片!"})},handleGalleryUrl1:function(e,t,o){0===e.code&&this.goods.goodsBanners.push({name:e.data,url:e.data})},handleRemove1:function(e,t){for(var o=0;o<this.goods.goodsBanners.length;o++){var n;n=void 0===e.response?e.url:e.response.data.url,this.goods.goodsBanners[o].url===n&&this.goods.goodsBanners.splice(o,1)}},handleSpecificationShow:function(){this.specForm={name:"",price:"",stock:""},this.specVisiable=!0},handleSpecificationAdd:function(){for(var e=this.specifications.length-1,t=0;t<this.specifications.length;t++){var o=this.specifications[t];if(o.name===this.specForm.name){if(o.price===this.specForm.price)return this.$message({type:"warning",message:"已经存在规格值:"+o.name}),this.specForm={},void(this.specVisiable=!1);e=t}}this.specifications.splice(e+1,0,this.specForm),this.specVisiable=!1},handleSpecificationDelete:function(e){var t=this;if(e.id){var o={id:e.id};Object(s["r"])(o).then((function(o){var n=t.specifications.indexOf(e);t.specifications.splice(n,1)})).catch((function(){t.$notify.error({title:"失败",message:"删除失败"})}))}else{var n=this.specifications.indexOf(e);this.specifications.splice(n,1)}}}},l=c,u=(o("3c5a"),o("9ca4")),d=Object(u["a"])(l,n,r,!1,null,null,null);t["default"]=d.exports},"3c5a":function(e,t,o){"use strict";var n=o("f7a2"),r=o.n(n);r.a},"4ec3":function(e,t,o){"use strict";o.d(t,"V",(function(){return r})),o.d(t,"c",(function(){return a})),o.d(t,"a",(function(){return s})),o.d(t,"d",(function(){return i})),o.d(t,"b",(function(){return c})),o.d(t,"A",(function(){return l})),o.d(t,"y",(function(){return u})),o.d(t,"B",(function(){return d})),o.d(t,"z",(function(){return p})),o.d(t,"W",(function(){return f})),o.d(t,"P",(function(){return m})),o.d(t,"N",(function(){return g})),o.d(t,"Q",(function(){return h})),o.d(t,"O",(function(){return b})),o.d(t,"L",(function(){return v})),o.d(t,"J",(function(){return y})),o.d(t,"M",(function(){return j})),o.d(t,"K",(function(){return O})),o.d(t,"T",(function(){return _})),o.d(t,"R",(function(){return x})),o.d(t,"U",(function(){return k})),o.d(t,"S",(function(){return I})),o.d(t,"j",(function(){return T})),o.d(t,"l",(function(){return w})),o.d(t,"i",(function(){return F})),o.d(t,"m",(function(){return $})),o.d(t,"k",(function(){return D})),o.d(t,"I",(function(){return S})),o.d(t,"H",(function(){return q})),o.d(t,"v",(function(){return B})),o.d(t,"u",(function(){return P})),o.d(t,"s",(function(){return A})),o.d(t,"w",(function(){return G})),o.d(t,"t",(function(){return C})),o.d(t,"q",(function(){return N})),o.d(t,"p",(function(){return V})),o.d(t,"n",(function(){return z})),o.d(t,"x",(function(){return L})),o.d(t,"o",(function(){return E})),o.d(t,"r",(function(){return R})),o.d(t,"E",(function(){return U})),o.d(t,"D",(function(){return J})),o.d(t,"C",(function(){return H})),o.d(t,"h",(function(){return K})),o.d(t,"g",(function(){return M})),o.d(t,"f",(function(){return Q})),o.d(t,"e",(function(){return W})),o.d(t,"X",(function(){return X})),o.d(t,"Y",(function(){return Y})),o.d(t,"G",(function(){return Z})),o.d(t,"F",(function(){return ee}));var n=o("b775"),r="http://api.yyfsdjk.com/upload";function a(e){return Object(n["a"])({url:"banner",method:"get",params:e})}function s(e){return Object(n["a"])({url:"banner",method:"post",data:e})}function i(e){return Object(n["a"])({url:"banner",method:"put",data:e})}function c(e){return Object(n["a"])({url:"banner",method:"delete",params:e})}function l(e){return Object(n["a"])({url:"notice/getPaging/".concat(e.page,"/").concat(e.limit),method:"get"})}function u(e){return Object(n["a"])({url:"notice",method:"post",data:e})}function d(e){return Object(n["a"])({url:"notice",method:"put",data:e})}function p(e){return Object(n["a"])({url:"notice",method:"delete",params:e})}function f(e){return Object(n["a"])({url:"user",method:"delete",params:e})}function m(e){return Object(n["a"])({url:"class_room/getPaging/".concat(e.page,"/").concat(e.limit),method:"get"})}function g(e){return Object(n["a"])({url:"class_room",method:"post",data:e})}function h(e){return Object(n["a"])({url:"class_room",method:"put",data:e})}function b(e){return Object(n["a"])({url:"class_room",method:"delete",params:e})}function v(e){return Object(n["a"])({url:"store/getPaging/".concat(e.page,"/").concat(e.limit),method:"get"})}function y(e){return Object(n["a"])({url:"store",method:"post",data:e})}function j(e){return Object(n["a"])({url:"store",method:"put",data:e})}function O(e){return Object(n["a"])({url:"store",method:"delete",params:e})}function _(e,t){return Object(n["a"])({url:"community/getPaging/".concat(e.page,"/").concat(e.limit),method:"get",params:t})}function x(e){return Object(n["a"])({url:"community",method:"post",data:e})}function k(e){return Object(n["a"])({url:"community",method:"put",data:e})}function I(e){return Object(n["a"])({url:"community",method:"delete",params:e})}function T(){return Object(n["a"])({url:"supplier",method:"get"})}function w(e){return Object(n["a"])({url:"supplier/getPaging/".concat(e.page,"/").concat(e.limit),method:"get"})}function F(e){return Object(n["a"])({url:"supplier",method:"post",data:e})}function $(e){return Object(n["a"])({url:"supplier",method:"put",data:e})}function D(e){return Object(n["a"])({url:"supplier",method:"delete",params:e})}function S(e){return Object(n["a"])({url:"order/salesVolumeByGoodsId",method:"get",params:e})}function q(e){return Object(n["a"])({url:"order/salesVolumeBySupplierId",method:"get",params:e})}function B(e){return Object(n["a"])({url:"classification",method:"get",params:e})}function P(e){return Object(n["a"])({url:"classification",method:"get",params:e})}function A(e){return Object(n["a"])({url:"classification",method:"post",data:e})}function G(e){return Object(n["a"])({url:"classification",method:"put",data:e})}function C(e){return Object(n["a"])({url:"classification",method:"delete",params:e})}function N(e,t){return Object(n["a"])({url:"goods/getPaging/".concat(e.page,"/").concat(e.size),method:"get",params:t})}function V(e){return Object(n["a"])({url:"goods/getById",method:"get",params:e})}function z(e){return Object(n["a"])({url:"goods",method:"post",data:e})}function L(e){return Object(n["a"])({url:"goods",method:"put",data:e})}function E(e){return Object(n["a"])({url:"goods",method:"delete",params:e})}function R(e){return Object(n["a"])({url:"specification",method:"delete",params:e})}function U(e,t){return Object(n["a"])({url:"order/getPaging/".concat(e.page,"/").concat(e.size),method:"get",params:t})}function J(e){return Object(n["a"])({url:"order/expressNumber",method:"post",params:e})}function H(e){return Object(n["a"])({url:"order",method:"delete",params:e})}function K(e){return Object(n["a"])({url:"withdrawal/getPaging/".concat(e.page,"/").concat(e.size),method:"get"})}function M(e){return Object(n["a"])({url:"withdrawal",method:"put",data:e})}function Q(e){return Object(n["a"])({url:"bv",method:"post",data:e})}function W(){return Object(n["a"])({url:"bv",method:"get"})}function X(e){return Object(n["a"])({url:"user/getPaging/".concat(e.page,"/").concat(e.size),method:"get"})}function Y(e){return Object(n["a"])({url:"user",method:"put",data:e})}function Z(e){return Object(n["a"])({url:"poor/getPaging/".concat(e.page,"/").concat(e.size),method:"get"})}function ee(e){return Object(n["a"])({url:"poor",method:"put",data:e})}},a2cd:function(e,t,o){"use strict";var n=o("238a");e.exports=function(e,t){return!!e&&n((function(){t?e.call(null,(function(){}),1):e.call(null)}))}},c904:function(e,t,o){"use strict";var n=o("e46b"),r=o("5daa"),a=o("008a"),s=o("238a"),i=[].sort,c=[1,2,3];n(n.P+n.F*(s((function(){c.sort(void 0)}))||!s((function(){c.sort(null)}))||!o("a2cd")(i)),"Array",{sort:function(e){return void 0===e?i.call(a(this)):i.call(a(this),r(e))}})},f7a2:function(e,t,o){}}]);