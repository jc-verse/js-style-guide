"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[918],{5318:function(e,t,a){a.d(t,{Zo:function(){return m},kt:function(){return p}});var n=a(7378);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function c(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},l=Object.keys(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)a=l[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var o=n.createContext({}),s=function(e){var t=n.useContext(o),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},m=function(e){var t=s(e.components);return n.createElement(o.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,l=e.originalType,o=e.parentName,m=c(e,["components","mdxType","originalType","parentName"]),u=s(a),p=r,v=u["".concat(o,".").concat(p)]||u[p]||d[p]||l;return a?n.createElement(v,i(i({ref:t},m),{},{components:a})):n.createElement(v,i({ref:t},m))}));function p(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var l=a.length,i=new Array(l);i[0]=u;var c={};for(var o in t)hasOwnProperty.call(t,o)&&(c[o]=t[o]);c.originalType=e,c.mdxType="string"==typeof e?e:r,i[1]=c;for(var s=2;s<l;s++)i[s]=a[s];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}u.displayName="MDXCreateElement"},5691:function(e,t,a){a.r(t),a.d(t,{default:function(){return _e}});var n=a(7378),r=a(8944),l=a(5773),i=a(9213),c=a(1884);function o(e){var t=e.permalink,a=e.title,r=e.subLabel;return n.createElement(c.Z,{className:"pagination-nav__link",to:t},r&&n.createElement("div",{className:"pagination-nav__sublabel"},r),n.createElement("div",{className:"pagination-nav__label"},a))}function s(e){var t=e.previous,a=e.next;return n.createElement("nav",{className:"pagination-nav docusaurus-mt-lg","aria-label":(0,i.I)({id:"theme.docs.paginator.navAriaLabel",message:"Docs pages navigation",description:"The ARIA label for the docs pagination"})},n.createElement("div",{className:"pagination-nav__item"},t&&n.createElement(o,(0,l.Z)({},t,{subLabel:n.createElement(i.Z,{id:"theme.docs.paginator.previous",description:"The label used to navigate to the previous doc"},"Previous")}))),n.createElement("div",{className:"pagination-nav__item pagination-nav__item--next"},a&&n.createElement(o,(0,l.Z)({},a,{subLabel:n.createElement(i.Z,{id:"theme.docs.paginator.next",description:"The label used to navigate to the next doc"},"Next")}))))}var m=a(353),d=a(8696),u=a(1592);var p={unreleased:function(e){var t=e.siteTitle,a=e.versionMetadata;return n.createElement(i.Z,{id:"theme.docs.versions.unreleasedVersionLabel",description:"The label used to tell the user that he's browsing an unreleased doc version",values:{siteTitle:t,versionLabel:n.createElement("b",null,a.label)}},"This is unreleased documentation for {siteTitle} {versionLabel} version.")},unmaintained:function(e){var t=e.siteTitle,a=e.versionMetadata;return n.createElement(i.Z,{id:"theme.docs.versions.unmaintainedVersionLabel",description:"The label used to tell the user that he's browsing an unmaintained doc version",values:{siteTitle:t,versionLabel:n.createElement("b",null,a.label)}},"This is documentation for {siteTitle} {versionLabel}, which is no longer actively maintained.")}};function v(e){var t=p[e.versionMetadata.banner];return n.createElement(t,e)}function b(e){var t=e.versionLabel,a=e.to,r=e.onClick;return n.createElement(i.Z,{id:"theme.docs.versions.latestVersionSuggestionLabel",description:"The label used to tell the user to check the latest version",values:{versionLabel:t,latestVersionLink:n.createElement("b",null,n.createElement(c.Z,{to:a,onClick:r},n.createElement(i.Z,{id:"theme.docs.versions.latestVersionLinkLabel",description:"The label used for the latest version suggestion link label"},"latest version")))}},"For up-to-date documentation, see the {latestVersionLink} ({versionLabel}).")}function f(e){var t,a=e.className,l=e.versionMetadata,i=(0,m.Z)().siteConfig.title,c=(0,d.gA)({failfast:!0}).pluginId,o=(0,u.J)(c).savePreferredVersionName,s=(0,d.Jo)(c),p=s.latestDocSuggestion,f=s.latestVersionSuggestion,h=null!=p?p:(t=f).docs.find((function(e){return e.id===t.mainDocId}));return n.createElement("div",{className:(0,r.Z)(a,u.kM.docs.docVersionBanner,"alert alert--warning margin-bottom--md"),role:"alert"},n.createElement("div",null,n.createElement(v,{siteTitle:i,versionMetadata:l})),n.createElement("div",{className:"margin-top--md"},n.createElement(b,{versionLabel:f.label,to:h.path,onClick:function(){return o(f.name)}})))}function h(e){var t=e.className,a=(0,u.E6)();return a.banner?n.createElement(f,{className:t,versionMetadata:a}):null}function g(e){var t=e.className,a=(0,u.E6)();return a.badge?n.createElement("span",{className:(0,r.Z)(t,u.kM.docs.docVersionBadge,"badge badge--secondary")},n.createElement(i.Z,{id:"theme.docs.versionBadge.label",values:{versionLabel:a.label}},"Version: {versionLabel}")):null}function E(e){var t=e.lastUpdatedAt,a=e.formattedLastUpdatedAt;return n.createElement(i.Z,{id:"theme.lastUpdated.atDate",description:"The words used to describe on which date a page has been last updated",values:{date:n.createElement("b",null,n.createElement("time",{dateTime:new Date(1e3*t).toISOString()},a))}}," on {date}")}function y(e){var t=e.lastUpdatedBy;return n.createElement(i.Z,{id:"theme.lastUpdated.byUser",description:"The words used to describe by who the page has been last updated",values:{user:n.createElement("b",null,t)}}," by {user}")}function N(e){var t=e.lastUpdatedAt,a=e.formattedLastUpdatedAt,r=e.lastUpdatedBy;return n.createElement("span",{className:u.kM.common.lastUpdated},n.createElement(i.Z,{id:"theme.lastUpdated.lastUpdatedAtBy",description:"The sentence used to display when a page has been last updated, and by who",values:{atDate:t&&a?n.createElement(E,{lastUpdatedAt:t,formattedLastUpdatedAt:a}):"",byUser:r?n.createElement(y,{lastUpdatedBy:r}):""}},"Last updated{atDate}{byUser}"),!1)}var k=a(808),Z="iconEdit_OMbO",_=["className"];function L(e){var t=e.className,a=(0,k.Z)(e,_);return n.createElement("svg",(0,l.Z)({fill:"currentColor",height:"20",width:"20",viewBox:"0 0 40 40",className:(0,r.Z)(Z,t),"aria-hidden":"true"},a),n.createElement("g",null,n.createElement("path",{d:"m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"})))}function T(e){var t=e.editUrl;return n.createElement("a",{href:t,target:"_blank",rel:"noreferrer noopener",className:u.kM.common.editThisPage},n.createElement(L,null),n.createElement(i.Z,{id:"theme.common.editThisPage",description:"The link label to edit the current page"},"Edit this page"))}var C="tag_VWGF",O="tagRegular_sIPu",w="tagWithCount_YgKf";function x(e){var t=e.permalink,a=e.name,l=e.count;return n.createElement(c.Z,{href:t,className:(0,r.Z)(C,l?w:O)},a,l&&n.createElement("span",null,l))}var A="tags_WPdo",U="tag_XHyC";function M(e){var t=e.tags;return n.createElement(n.Fragment,null,n.createElement("b",null,n.createElement(i.Z,{id:"theme.tags.tagsListLabel",description:"The label alongside a tag list"},"Tags:")),n.createElement("ul",{className:(0,r.Z)(A,"padding--none","margin-left--sm")},t.map((function(e){var t=e.label,a=e.permalink;return n.createElement("li",{key:a,className:U},n.createElement(x,{name:t,permalink:a}))}))))}var P="lastUpdated_vA0S";function S(e){return n.createElement("div",{className:(0,r.Z)(u.kM.docs.docFooterTagsRow,"row margin-bottom--sm")},n.createElement("div",{className:"col"},n.createElement(M,e)))}function j(e){var t=e.editUrl,a=e.lastUpdatedAt,l=e.lastUpdatedBy,i=e.formattedLastUpdatedAt;return n.createElement("div",{className:(0,r.Z)(u.kM.docs.docFooterEditMetaRow,"row")},n.createElement("div",{className:"col"},t&&n.createElement(T,{editUrl:t})),n.createElement("div",{className:(0,r.Z)("col",P)},(a||l)&&n.createElement(N,{lastUpdatedAt:a,formattedLastUpdatedAt:i,lastUpdatedBy:l})))}function B(e){var t=e.content.metadata,a=t.editUrl,l=t.lastUpdatedAt,i=t.formattedLastUpdatedAt,c=t.lastUpdatedBy,o=t.tags,s=o.length>0,m=!!(a||l||c);return s||m?n.createElement("footer",{className:(0,r.Z)(u.kM.docs.docFooter,"docusaurus-mt-lg")},s&&n.createElement(S,{tags:o}),m&&n.createElement(j,{editUrl:a,lastUpdatedAt:l,lastUpdatedBy:c,formattedLastUpdatedAt:i})):null}var H=["toc","className","linkClassName","linkActiveClassName","minHeadingLevel","maxHeadingLevel"];function I(e){var t=e.toc,a=e.className,r=e.linkClassName,l=e.isChild;return t.length?n.createElement("ul",{className:l?void 0:a},t.map((function(e){return n.createElement("li",{key:e.id},n.createElement("a",{href:"#"+e.id,className:null!=r?r:void 0,dangerouslySetInnerHTML:{__html:e.value}}),n.createElement(I,{isChild:!0,toc:e.children,className:a,linkClassName:r}))}))):null}function D(e){var t=e.toc,a=e.className,r=void 0===a?"table-of-contents table-of-contents__left-border":a,i=e.linkClassName,c=void 0===i?"table-of-contents__link":i,o=e.linkActiveClassName,s=void 0===o?void 0:o,m=e.minHeadingLevel,d=e.maxHeadingLevel,p=(0,k.Z)(e,H),v=(0,u.LU)(),b=null!=m?m:v.tableOfContents.minHeadingLevel,f=null!=d?d:v.tableOfContents.maxHeadingLevel,h=(0,u.b9)({toc:t,minHeadingLevel:b,maxHeadingLevel:f}),g=(0,n.useMemo)((function(){if(c&&s)return{linkClassName:c,linkActiveClassName:s,minHeadingLevel:b,maxHeadingLevel:f}}),[c,s,b,f]);return(0,u.Si)(g),n.createElement(I,(0,l.Z)({toc:h,className:r,linkClassName:c},p))}var V="tableOfContents_jWtb",F=["className"];function R(e){var t=e.className,a=(0,k.Z)(e,F);return n.createElement("div",{className:(0,r.Z)(V,"thin-scrollbar",t)},n.createElement(D,(0,l.Z)({},a,{linkClassName:"table-of-contents__link toc-highlight",linkActiveClassName:"table-of-contents__link--active"})))}var z="tocCollapsible_aX8Q",W="tocCollapsibleButton_Va7b",q="tocCollapsibleContent_EOAA",G="tocCollapsibleExpanded_mrpG";function J(e){var t=e.toc,a=e.className,l=e.minHeadingLevel,c=e.maxHeadingLevel,o=(0,u.uR)({initialState:!0}),s=o.collapsed,m=o.toggleCollapsed;return n.createElement("div",{className:(0,r.Z)(z,!s&&G,a)},n.createElement("button",{type:"button",className:(0,r.Z)("clean-btn",W),onClick:m},n.createElement(i.Z,{id:"theme.TOCCollapsible.toggleButtonLabel",description:"The label used by the button on the collapsible TOC component"},"On this page")),n.createElement(u.zF,{lazy:!0,className:q,collapsed:s},n.createElement(D,{toc:t,minHeadingLevel:l,maxHeadingLevel:c})))}var X="anchorWithStickyNavbar_YDjN",Y="anchorWithHideOnScrollNavbar_c5FC",K=["as","id"],Q=["as"];function $(e){var t=e.as,a=e.id,c=(0,k.Z)(e,K),o=(0,u.LU)().navbar.hideOnScroll;return a?n.createElement(t,(0,l.Z)({},c,{className:(0,r.Z)("anchor",o?Y:X),id:a}),c.children,n.createElement("a",{className:"hash-link",href:"#"+a,title:(0,i.I)({id:"theme.common.headingLinkTitle",message:"Direct link to heading",description:"Title for link to heading"})},"\u200b")):n.createElement(t,c)}function ee(e){var t=e.as,a=(0,k.Z)(e,Q);return"h1"===t?n.createElement("h1",(0,l.Z)({},a,{id:void 0}),a.children):n.createElement($,(0,l.Z)({as:t},a))}var te="docItemContainer_yJzi",ae="docItemCol_ygLL",ne="tocMobile_By44",re={breadcrumbsContainer:"breadcrumbsContainer_nmcO"},le=a(8948);function ie(e){var t=e.children,a=e.href,r="breadcrumbs__link";return a?n.createElement(c.Z,{className:r,href:a,itemProp:"item"},n.createElement("span",{itemProp:"name"},t)):n.createElement("span",{className:r,itemProp:"item name"},t)}function ce(e){var t=e.children,a=e.active,l=e.index;return n.createElement("li",{itemScope:!0,itemProp:"itemListElement",itemType:"https://schema.org/ListItem",className:(0,r.Z)("breadcrumbs__item",{"breadcrumbs__item--active":a})},t,n.createElement("meta",{itemProp:"position",content:String(l+1)}))}function oe(){var e=(0,le.Z)("/");return n.createElement("li",{className:"breadcrumbs__item"},n.createElement(c.Z,{className:(0,r.Z)("breadcrumbs__link",re.breadcrumbsItemLink),href:e},"\ud83c\udfe0"))}function se(){var e=(0,u.s1)(),t=(0,u.Ns)();return e?n.createElement("nav",{className:(0,r.Z)(u.kM.docs.docBreadcrumbs,re.breadcrumbsContainer),"aria-label":"breadcrumbs"},n.createElement("ul",{className:"breadcrumbs",itemScope:!0,itemType:"https://schema.org/BreadcrumbList"},t&&n.createElement(oe,null),e.map((function(t,a){return n.createElement(ce,{key:a,active:a===e.length-1,index:a},n.createElement(ie,{href:a<e.length-1?t.href:void 0},t.label))})))):null}var me=a(5318);var de=["children"],ue=function(e){var t=e.children,a=(0,k.Z)(e,de),r=(0,n.useRef)(null),c=(0,n.useState)(!1),o=c[0],s=c[1];return n.createElement("pre",(0,l.Z)({},a,{ref:r}),t,n.createElement("button",{type:"button","aria-label":(0,i.I)({id:"theme.CodeBlock.copyButtonAriaLabel",message:"Copy code to clipboard",description:"The ARIA label for copy code blocks button"}),className:"copy-button",onClick:function(){r.current&&function(e,t){var a=(void 0===t?{}:t).target,n=void 0===a?document.body:a,r=document.createElement("textarea"),l=document.activeElement;r.value=e,r.setAttribute("readonly",""),r.style.contain="strict",r.style.position="absolute",r.style.left="-9999px",r.style.fontSize="12pt";var i=document.getSelection(),c=!1;i.rangeCount>0&&(c=i.getRangeAt(0)),n.append(r),r.select(),r.selectionStart=0,r.selectionEnd=e.length;var o=!1;try{o=document.execCommand("copy")}catch(s){}r.remove(),c&&(i.removeAllRanges(),i.addRange(c)),l&&l.focus()}(Array.from(r.current.querySelectorAll("code div.line")).map((function(e){return e.textContent})).join("\n")),s(!0),setTimeout((function(){return s(!1)}),2e3)}},o?n.createElement(i.Z,{id:"theme.CodeBlock.copied",description:"The copied button label on code blocks"},"Copied"):n.createElement(i.Z,{id:"theme.CodeBlock.copy",description:"The copy button label on code blocks"},"Copy")))},pe=a(7092),ve=["mdxType","originalType"];var be="details_TBmf";function fe(e){var t=Object.assign({},e);return n.createElement(u.PO,(0,l.Z)({},t,{className:(0,r.Z)("alert alert--info",be,t.className)}))}function he(e){return n.createElement(ee,e)}var ge="img_PFMr";var Ee={head:function(e){var t=n.Children.map(e.children,(function(e){return function(e){var t,a;if(null!=e&&null!=(t=e.props)&&t.mdxType&&null!=e&&null!=(a=e.props)&&a.originalType){var r=e.props,l=(r.mdxType,r.originalType,(0,k.Z)(r,ve));return n.createElement(e.props.originalType,l)}return e}(e)}));return n.createElement(pe.Z,e,t)},code:function(e){var t=["a","b","big","i","span","em","strong","sup","sub","small"];return n.Children.toArray(e.children).every((function(e){return"string"==typeof e&&!e.includes("\n")||(0,n.isValidElement)(e)&&t.includes(e.props.mdxType)}))?n.createElement("code",e):n.createElement(ue,e)},a:function(e){return n.createElement(c.Z,e)},pre:function(e){var t;return n.createElement(ue,(0,n.isValidElement)(e.children)&&"code"===e.children.props.originalType?null==(t=e.children)?void 0:t.props:Object.assign({},e))},details:function(e){var t=n.Children.toArray(e.children),a=t.find((function(e){var t;return"summary"===(null==e||null==(t=e.props)?void 0:t.mdxType)})),r=n.createElement(n.Fragment,null,t.filter((function(e){return e!==a})));return n.createElement(fe,(0,l.Z)({},e,{summary:a}),r)},ul:function(e){return n.createElement("ul",(0,l.Z)({},e,{className:(t=e.className,(0,r.Z)(t,(null==t?void 0:t.includes("contains-task-list"))&&"contains-task-list_O40l"))}));var t},img:function(e){return n.createElement("img",(0,l.Z)({loading:"lazy"},e,{className:(t=e.className,(0,r.Z)(t,ge))}));var t},h1:function(e){return n.createElement(he,(0,l.Z)({as:"h1"},e))},h2:function(e){return n.createElement(he,(0,l.Z)({as:"h2"},e))},h3:function(e){return n.createElement(he,(0,l.Z)({as:"h3"},e))},h4:function(e){return n.createElement(he,(0,l.Z)({as:"h4"},e))},h5:function(e){return n.createElement(he,(0,l.Z)({as:"h5"},e))},h6:function(e){return n.createElement(he,(0,l.Z)({as:"h6"},e))}},ye=Object.assign({},Ee,{div:function(e){return"shiki-twoslash-fragment"===e.className?n.createElement(n.Fragment,null,e.children):n.createElement("div",e)},pre:function(e){return n.createElement(ue,e)},code:function(e){return n.createElement("code",e)}});function Ne(e){var t=e.children;return n.createElement(me.Zo,{components:ye},t)}function ke(e){var t,a=e.content,r=a.metadata,l=a.frontMatter,i=a.assets,c=l.keywords,o=r.description,s=r.title,m=null!=(t=i.image)?t:l.image;return n.createElement(u.d,{title:s,description:o,keywords:c,image:m})}function Ze(e){var t=e.content,a=t.metadata,l=t.frontMatter,i=l.hide_title,c=l.hide_table_of_contents,o=l.toc_min_heading_level,m=l.toc_max_heading_level,d=a.title,p=!i&&void 0===t.contentTitle,v=(0,u.iP)(),b=!c&&t.toc&&t.toc.length>0,f=b&&("desktop"===v||"ssr"===v);return n.createElement("div",{className:"row"},n.createElement("div",{className:(0,r.Z)("col",!c&&ae)},n.createElement(h,null),n.createElement("div",{className:te},n.createElement("article",null,n.createElement(se,null),n.createElement(g,null),b&&n.createElement(J,{toc:t.toc,minHeadingLevel:o,maxHeadingLevel:m,className:(0,r.Z)(u.kM.docs.docTocMobile,ne)}),n.createElement("div",{className:(0,r.Z)(u.kM.docs.docMarkdown,"markdown")},p&&n.createElement("header",null,n.createElement(ee,{as:"h1"},d)),n.createElement(Ne,null,n.createElement(t,null))),n.createElement(B,e)),n.createElement(s,{previous:a.previous,next:a.next}))),f&&n.createElement("div",{className:"col col--3"},n.createElement(R,{toc:t.toc,minHeadingLevel:o,maxHeadingLevel:m,className:u.kM.docs.docTocDesktop})))}function _e(e){var t="docs-doc-id-"+e.content.metadata.unversionedId;return n.createElement(u.FG,{className:t},n.createElement(ke,e),n.createElement(Ze,e))}}}]);