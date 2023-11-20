/*!
   Copyright 2009-2018 SpryMedia Ltd.

 This source file is free software, available under the following license:
   MIT license - http://datatables.net/license/mit

 This source file is distributed in the hope that it will be useful, but
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.

 For details please refer to: http://www.datatables.net
 KeyTable 2.5.0
 ©2009-2018 SpryMedia Ltd - datatables.net/license
*/
var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(b,g,e){b!=Array.prototype&&b!=Object.prototype&&(b[g]=e.value)};$jscomp.getGlobal=function(b){return"undefined"!=typeof window&&window===b?b:"undefined"!=typeof global&&null!=global?global:b};$jscomp.global=$jscomp.getGlobal(this);$jscomp.SYMBOL_PREFIX="jscomp_symbol_";
$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.Symbol=function(){var b=0;return function(g){return $jscomp.SYMBOL_PREFIX+(g||"")+b++}}();
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var b=$jscomp.global.Symbol.iterator;b||(b=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[b]&&$jscomp.defineProperty(Array.prototype,b,{configurable:!0,writable:!0,value:function(){return $jscomp.arrayIterator(this)}});$jscomp.initSymbolIterator=function(){}};
$jscomp.initSymbolAsyncIterator=function(){$jscomp.initSymbol();var b=$jscomp.global.Symbol.asyncIterator;b||(b=$jscomp.global.Symbol.asyncIterator=$jscomp.global.Symbol("asyncIterator"));$jscomp.initSymbolAsyncIterator=function(){}};$jscomp.arrayIterator=function(b){var g=0;return $jscomp.iteratorPrototype(function(){return g<b.length?{done:!1,value:b[g++]}:{done:!0}})};
$jscomp.iteratorPrototype=function(b){$jscomp.initSymbolIterator();b={next:b};b[$jscomp.global.Symbol.iterator]=function(){return this};return b};$jscomp.iteratorFromArray=function(b,g){$jscomp.initSymbolIterator();b instanceof String&&(b+="");var e=0,n={next:function(){if(e<b.length){var l=e++;return{value:g(l,b[l]),done:!1}}n.next=function(){return{done:!0,value:void 0}};return n.next()}};n[Symbol.iterator]=function(){return n};return n};
$jscomp.polyfill=function(b,g,e,n){if(g){e=$jscomp.global;b=b.split(".");for(n=0;n<b.length-1;n++){var l=b[n];l in e||(e[l]={});e=e[l]}b=b[b.length-1];n=e[b];g=g(n);g!=n&&null!=g&&$jscomp.defineProperty(e,b,{configurable:!0,writable:!0,value:g})}};$jscomp.polyfill("Array.prototype.keys",function(b){return b?b:function(){return $jscomp.iteratorFromArray(this,function(b){return b})}},"es6","es3");
(function(b){"function"===typeof define&&define.amd?define(["jquery","datatables.net"],function(g){return b(g,window,document)}):"object"===typeof exports?module.exports=function(g,e){g||(g=window);e&&e.fn.dataTable||(e=require("datatables.net")(g,e).$);return b(e,g,g.document)}:b(jQuery,window,document)})(function(b,g,e,n){var l=b.fn.dataTable,p=function(a,c){if(!l.versionCheck||!l.versionCheck("1.10.8"))throw"KeyTable requires DataTables 1.10.8 or newer";this.c=b.extend(!0,{},l.defaults.keyTable,
    p.defaults,c);this.s={dt:new l.Api(a),enable:!0,focusDraw:!1,waitingForDraw:!1,lastFocus:null};this.dom={};a=this.s.dt.settings()[0];if(c=a.keytable)return c;a.keytable=this;this._constructor()};b.extend(p.prototype,{blur:function(){this._blur()},enable:function(a){this.s.enable=a},focus:function(a,c){this._focus(this.s.dt.cell(a,c))},focused:function(a){if(!this.s.lastFocus)return!1;var c=this.s.lastFocus.cell.index();return a.row===c.row&&a.column===c.column},_constructor:function(){this._tabInput();
        var a=this,c=this.s.dt,d=b(c.table().node());"static"===d.css("position")&&d.css("position","relative");b(c.table().body()).on("click.keyTable","th, td",function(b){if(!1!==a.s.enable){var d=c.cell(this);d.any()&&a._focus(d,null,!1,b)}});b(e).on("keydown.keyTable",function(b){a._key(b)});if(this.c.blurable)b(e).on("mousedown.keyTable",function(d){b(d.target).parents(".dataTables_filter").length&&a._blur();b(d.target).parents().filter(c.table().container()).length||b(d.target).parents("div.DTE").length||
        b(d.target).parents("div.editor-datetime").length||b(d.target).parents().filter(".DTFC_Cloned").length||a._blur()});if(this.c.editor){var k=this.c.editor;k.on("open.keyTableMain",function(b,c,d){"inline"!==c&&a.s.enable&&(a.enable(!1),k.one("close.keyTable",function(){a.enable(!0)}))});if(this.c.editOnFocus)c.on("key-focus.keyTable key-refocus.keyTable",function(b,c,d,f){a._editor(null,f,!0)});c.on("key.keyTable",function(b,c,d,f,k){a._editor(d,k,!1)});b(c.table().body()).on("dblclick.keyTable","th, td",
            function(b){!1!==a.s.enable&&c.cell(this).any()&&a._editor(null,b,!0)})}if(c.settings()[0].oFeatures.bStateSave)c.on("stateSaveParams.keyTable",function(b,c,d){d.keyTable=a.s.lastFocus?a.s.lastFocus.cell.index():null});c.on("draw.keyTable",function(d){if(!a.s.focusDraw){var f=a.s.lastFocus;if(f&&f.node&&b(f.node).closest("body")===e.body){f=a.s.lastFocus.relative;var k=c.page.info(),m=f.row+k.start;0!==k.recordsDisplay&&(m>=k.recordsDisplay&&(m=k.recordsDisplay-1),a._focus(m,f.column,!0,d))}}});this.c.clipboard&&
        this._clipboard();c.on("destroy.keyTable",function(){c.off(".keyTable");b(c.table().body()).off("click.keyTable","th, td");b(e).off("keydown.keyTable").off("click.keyTable").off("copy.keyTable").off("paste.keyTable")});var f=c.state.loaded();if(f&&f.keyTable)c.one("init",function(){var a=c.cell(f.keyTable);a.any()&&a.focus()});else this.c.focus&&c.cell(this.c.focus).focus()},_blur:function(){if(this.s.enable&&this.s.lastFocus){var a=this.s.lastFocus.cell;b(a.node()).removeClass(this.c.className);
        this.s.lastFocus=null;this._updateFixedColumns(a.index().column);this._emitEvent("key-blur",[this.s.dt,a])}},_clipboard:function(){var a=this.s.dt,c=this;g.getSelection&&(b(e).on("copy.keyTable",function(a){a=a.originalEvent;var b=g.getSelection().toString(),d=c.s.lastFocus;!b&&d&&(a.clipboardData.setData("text/plain",d.cell.render(c.c.clipboardOrthogonal)),a.preventDefault())}),b(e).on("paste.keyTable",function(b){b=b.originalEvent;var d=c.s.lastFocus,f=e.activeElement,m=c.c.editor,h;!d||f&&"body"!==
    f.nodeName.toLowerCase()||(b.preventDefault(),g.clipboardData&&g.clipboardData.getData?h=g.clipboardData.getData("Text"):b.clipboardData&&b.clipboardData.getData&&(h=b.clipboardData.getData("text/plain")),m?m.inline(d.cell.index()).set(m.displayed()[0],h).submit():(d.cell.data(h),a.draw(!1)))}))},_columns:function(){var a=this.s.dt,b=a.columns(this.c.columns).indexes(),d=[];a.columns(":visible").every(function(a){-1!==b.indexOf(a)&&d.push(a)});return d},_editor:function(a,c,d){var k=this,f=this.s.dt,
        m=this.c.editor,h=this.s.lastFocus.cell;if(!(b("div.DTE",h.node()).length||null!==a&&(0<=a&&9>=a||11===a||12===a||14<=a&&31>=a||112<=a&&123>=a||127<=a&&159>=a))){c.stopPropagation();13===a&&c.preventDefault();var g=function(){m.one("open.keyTable",function(){m.off("cancelOpen.keyTable");d||b("div.DTE_Field_InputControl input, div.DTE_Field_InputControl textarea").select();f.keys.enable(d?"tab-only":"navigation-only");f.on("key-blur.editor",function(){m.displayed()&&m.submit()});d&&b(f.table().container()).addClass("dtk-focus-alt");
        m.on("submitUnsuccessful.keyTable",function(){k._focus(h,null,!1)});m.one("close",function(){f.keys.enable(!0);f.off("key-blur.editor");m.off(".keyTable");b(f.table().container()).removeClass("dtk-focus-alt")})}).one("cancelOpen.keyTable",function(){m.off(".keyTable")}).inline(h.index())};13===a?(d=!0,b(e).one("keyup",function(){g()})):g()}},_emitEvent:function(a,c){this.s.dt.iterator("table",function(d,k){b(d.nTable).triggerHandler(a,c)})},_focus:function(a,c,d,k){var f=this,m=this.s.dt,h=m.page.info(),
        q=this.s.lastFocus;k||(k=null);if(this.s.enable){if("number"!==typeof a){if(!a.any())return;var l=a.index();c=l.column;a=m.rows({filter:"applied",order:"applied"}).indexes().indexOf(l.row);if(0>a)return;h.serverSide&&(a+=h.start)}if(-1!==h.length&&(a<h.start||a>=h.start+h.length))this.s.focusDraw=!0,this.s.waitingForDraw=!0,m.one("draw",function(){f.s.focusDraw=!1;f.s.waitingForDraw=!1;f._focus(a,c,n,k)}).page(Math.floor(a/h.length)).draw(!1);else if(-1!==b.inArray(c,this._columns())){h.serverSide&&
    (a-=h.start);h=m.cells(null,c,{search:"applied",order:"applied"}).flatten();h=m.cell(h[a]);if(q){if(q.node===h.node()){this._emitEvent("key-refocus",[this.s.dt,h,k||null]);return}this._blur()}q=b(h.node());q.addClass(this.c.className);this._updateFixedColumns(c);if(d===n||!0===d)this._scroll(b(g),b(e.body),q,"offset"),d=m.table().body().parentNode,d!==m.table().header().parentNode&&(d=b(d.parentNode),this._scroll(d,d,q,"position"));this.s.lastFocus={cell:h,node:h.node(),relative:{row:m.rows({page:"current"}).indexes().indexOf(h.index().row),
            column:h.index().column}};this._emitEvent("key-focus",[this.s.dt,h,k||null]);m.state.save()}}},_key:function(a){if(this.s.waitingForDraw)a.preventDefault();else{var c=this.s.enable,d=!0===c||"navigation-only"===c;if(c&&(!(0===a.keyCode||a.ctrlKey||a.metaKey||a.altKey)||a.ctrlKey&&a.altKey)&&this.s.lastFocus){var k=this.s.dt,f=this.s.dt.settings()[0].oScroll.sY?!0:!1;if(!this.c.keys||-1!==b.inArray(a.keyCode,this.c.keys))switch(a.keyCode){case 9:this._shift(a,a.shiftKey?"left":"right",!0);break;case 27:this.s.blurable&&
    !0===c&&this._blur();break;case 33:case 34:d&&!f&&(a.preventDefault(),k.page(33===a.keyCode?"previous":"next").draw(!1));break;case 35:case 36:d&&(a.preventDefault(),c=k.cells({page:"current"}).indexes(),d=this._columns(),this._focus(k.cell(c[35===a.keyCode?c.length-1:d[0]]),null,!0,a));break;case 37:d&&this._shift(a,"left");break;case 38:d&&this._shift(a,"up");break;case 39:d&&this._shift(a,"right");break;case 40:d&&this._shift(a,"down");break;default:!0===c&&this._emitEvent("key",[k,a.keyCode,this.s.lastFocus.cell,
        a])}}}},_scroll:function(a,b,d,k){var c=d[k](),m=d.outerHeight(),h=d.outerWidth(),g=b.scrollTop(),e=b.scrollLeft(),l=a.height();a=a.width();"position"===k&&(c.top+=parseInt(d.closest("table").css("top"),10));c.top<g&&b.scrollTop(c.top);c.left<e&&b.scrollLeft(c.left);c.top+m>g+l&&m<l&&b.scrollTop(c.top+m-l);c.left+h>e+a&&h<a&&b.scrollLeft(c.left+h-a)},_shift:function(a,c,d){var k=this.s.dt,f=k.page.info(),g=f.recordsDisplay,h=this.s.lastFocus.cell,e=this._columns();if(h){var l=k.rows({filter:"applied",
        order:"applied"}).indexes().indexOf(h.index().row);f.serverSide&&(l+=f.start);k=k.columns(e).indexes().indexOf(h.index().column);f=e[k];"right"===c?k>=e.length-1?(l++,f=e[0]):f=e[k+1]:"left"===c?0===k?(l--,f=e[e.length-1]):f=e[k-1]:"up"===c?l--:"down"===c&&l++;0<=l&&l<g&&-1!==b.inArray(f,e)?(a.preventDefault(),this._focus(l,f,!0,a)):d&&this.c.blurable?this._blur():a.preventDefault()}},_tabInput:function(){var a=this,c=this.s.dt,d=null!==this.c.tabIndex?this.c.tabIndex:c.settings()[0].iTabIndex;if(-1!=
        d)b('<div><input type="text" tabindex="'+d+'"/></div>').css({position:"absolute",height:1,width:0,overflow:"hidden"}).insertBefore(c.table().node()).children().on("focus",function(b){c.cell(":eq(0)",{page:"current"}).any()&&a._focus(c.cell(":eq(0)","0:visible",{page:"current"}),null,!0,b)})},_updateFixedColumns:function(a){var b=this.s.dt,d=b.settings()[0];if(d._oFixedColumns){var e=d.aoColumns.length-d._oFixedColumns.s.iRightColumns;(a<d._oFixedColumns.s.iLeftColumns||a>=e)&&b.fixedColumns().update()}}});
    p.defaults={blurable:!0,className:"focus",clipboard:!0,clipboardOrthogonal:"display",columns:"",editor:null,editOnFocus:!1,focus:null,keys:null,tabIndex:null};p.version="2.5.0";b.fn.dataTable.KeyTable=p;b.fn.DataTable.KeyTable=p;l.Api.register("cell.blur()",function(){return this.iterator("table",function(a){a.keytable&&a.keytable.blur()})});l.Api.register("cell().focus()",function(){return this.iterator("cell",function(a,b,d){a.keytable&&a.keytable.focus(b,d)})});l.Api.register("keys.disable()",
        function(){return this.iterator("table",function(a){a.keytable&&a.keytable.enable(!1)})});l.Api.register("keys.enable()",function(a){return this.iterator("table",function(b){b.keytable&&b.keytable.enable(a===n?!0:a)})});l.ext.selector.cell.push(function(a,b,d){b=b.focused;a=a.keytable;var c=[];if(!a||b===n)return d;for(var f=0,e=d.length;f<e;f++)(!0===b&&a.focused(d[f])||!1===b&&!a.focused(d[f]))&&c.push(d[f]);return c});b(e).on("preInit.dt.dtk",function(a,c,d){"dt"===a.namespace&&(a=c.oInit.keys,
        d=l.defaults.keys,a||d)&&(d=b.extend({},d,a),!1!==a&&new p(c,d))});return p});