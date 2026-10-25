// ==UserScript==
// @name            douban-info-for-pt
// @name:en         douban-info-for-pt
// @namespace       https://github.com/techmovie/DouBan-Info-for-PT
// @version         1.8.3
// @author          birdplane
// @description     在PT站电影详情页展示部分中文信息
// @description:en  Display some Chinese information on the PT site movie details page
// @license         MIT
// @source          git@github.com:techmovie/DouBan-Info-for-PT.git
// @downloadURL     https://github.com/techmovie/DouBan-Info-for-PT/raw/main/dist/douban-info-for-pt.user.js
// @updateURL       https://github.com/techmovie/DouBan-Info-for-PT/raw/main/dist/douban-info-for-pt.user.js
// @match           *://passthepopcorn.me/torrents.php?id=*
// @match           *://passthepopcorn.me/requests.php?action=view&id=*
// @match           *://anthelion.me/torrents.php?id=*
// @match           *://anthelion.me/requests.php?action=view&id=*
// @match           *://beyond-hd.me/torrents/*
// @match           *://beyond-hd.me/library/title/*
// @match           *://alpharatio.cc/torrents.php*
// @match           *://blutopia.cc/torrents/*
// @match           *://eiga.moi/torrents/*
// @match           *://hdbits.org/details.php?id=*
// @match           *://hdbits.org/requests/show_request?id=*
// @match           *://filelist.io/details.php?id=*
// @match           *://hd-torrents.org/details.php?id=*
// @match           *://hdf.world/torrents.php*
// @match           *://hd-space.org/index.php?page=torrent-details*
// @match           *://karagarga.in/details.php?id=*
// @match           *://privatehd.to/torrent/*
// @match           *://broadcasthe.net/series.php?id=*
// @match           *://iptorrents.com/torrent.php?id=*
// @match           *://www.iptorrents.com/torrent.php?id=*
// @match           *://www.torrentleech.org/torrent/*
// @match           *://avistaz.to/torrent/*
// @match           *://secret-cinema.pw/torrents.php?id=*
// @match           *://aither.cc/torrents/*
// @match           *://shadowthein.net/details.php?id=*
// @match           *://tgx.rs/torrent/*
// @require         https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js
// @connect         movie.douban.com
// @connect         www.douban.com
// @connect         api.douban.com
// @grant           GM_addStyle
// @grant           GM_getValue
// @grant           GM_openInTab
// @grant           GM_setValue
// @grant           GM_xmlhttpRequest
// ==/UserScript==

(g=>{if(typeof GM_addStyle=="function"){GM_addStyle(g);return}const t=document.createElement("style");t.textContent=g,document.head.append(t)})(' .col-container .fix-col,.ll{float:left}#douban-wrapper #content{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAwIAAAFZCAAAAAAOAcd5AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAAAGAAAABgAPBrQs8AAAAHdElNRQfhBQgQIDnKP8rCAAALEUlEQVR42u3cPY8s2V3H8fP/n3OquufuzgxrvJJXWEg8BLCWQUKkIOEMIUJC3gIkvAYHvAAkREYELwAQCFsiJFnwQ7ASa7Cu8AotT8beO11V54GgqvtuuFfyTN2+v+8nbE3wr9H59qnqrmrrAVDmew8A7IsEIC6FEEIPoYf+WetL0GAhmFlwOwshhJcLooXer349WAgW7LPWl9YE+hZA66231nvbGrjyg8bnc14cbu7mbradGfTWe2u9tcuCuN71YOFykOZubm5mIVi3ENJlA2i9tdZqa7311kO/4gPGqzHbCoju7h7MQgi9t7atiLadGlwzCxbML0fZ1wisW0jnHaC11mpttbbaW7v26vH5recH7u4xxhh7COYhhNZbbbXWWtsWwRWvh22n8/UoPUb37h5CsG7pXEBttdZSy3rIVx89XoGZm0dPMabUUugeQgittVpqKbWWVltv174gts5jjCmmFmNfPwuynkLvvfXaai2brYErbh6vxIKbxxhTSrWl3mPoFnqvtZSylKWWtYHrXhDbJhBjSinVlHoMPZiHYCmE3ntttZSyLMuyXBq47iPG52dm69rIOa8nAG6ht1rKsszLsqwr4srPCyxcCsg5b0cTe7CQ1uuAUpcyL/M8v/Xe3SHuPS728k+1ttaSW+itlGWe66/uPdJPVj398L9+PNT1NCdZ8B5S6L3VWpdlmacp/tL93jNiT3WureYaLfRalmWa37S3w/js2Xv/+9HDepJj2+Vwb63VUpZpmg7vp71HxK7GT0oda4reey3LNE3v7j3RI7j/le+eej9/T9ZT7+tZ3zydnALUvfuvpdYhRQ+tlnmaHt7fe6LHkH75g9NWgPeeemut1mWeptNXKUDdu2/9sJYlRw+tLvN0evtN3AVCyL/4z9tnpM0s9d5qLcs8n569s/dk2N2v/fWyDDlZ6GWZT+239p7nkfzUsxe+fRneU2+tlmWZp9PP7j0X9nf7G38/j1sCU//a7d7zPJYvfrh+RxybX3aB6fSFvcfCa+BLv/MP/7mdCP30b97tPc2jeeeUUkqptd5Tb7WVsizTdNh7LLwO7n/3+b/8x4tw86Vf+PLeozyi45RzyiXVuJ4IrZ8I5b3Hwuvhy2/y2t/kaTh/6+19bWBZ5r2nAp7OvCzbfR/eW6+tlLIsew8FPJ1lKaW02s+7QKulkACELKXUtu0Cfb1JqJS9hwKeTim11vW22PMDY63uPRTwdGqrbX0czs+PTda291DA07k8Ex289/W5sU4CEHL5pZTuL38vZu+hgKfzctV7v7yy91DA07ks+O1agE0AYl7+cOLL3xSlAUjiZ3UhjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQgjgQg7mUCtvcowB482GbvSYAnZJd173Z5Ze+hgKdzWfDmgW0Agl6uejcLZuZmXBhDiJu5mQWzFMzM3D36POw9Fl4L//iNb30SvvjVr/363oM8otmju5uZhWTm7u7R44++sPdceA08/+PvJs/hf775d1/5o5/Ze5hH838xRnf3bTMwjzGm9HzvsfAa+NYffu/29vbu7vb29qM/+Pbe0zya5ynGGNfVb+YePaaUP9x7LOzv379ut3d39/f393d3t/b1H+w9z2P5MKcUPa67gFv0lFLOP/i3vefC7v70XMD9/d3dbfiTved5JN//OOeUkkdzS2buMaach/Fvf/+w92jY17e/f3scxxw9tLpM0/D8O1/Ze6TH8PA34zDkFKO7WVoLSHkY5x/9xe8d9x4Ou/rg9ng8DEP00Oo8n4bhgzcxgYe/fHh7HHJaG0jm0VPKeVyW8smf/fbP7z0e9vTx7c3xcNkFxiF/vPdEj+Cjv5rePo7D1oAlM48x5aGW2tqP//y993/unXHvGbGbu+PxMOZkoZdlGnJuew/0Ezb99/e+8/Gzt24OhzHnFN3NbKplWebT6fTixYtPP/304eE0zaXU1nsIfe+B8QQsuHtKwzAejoebw2dPhE4PL04Pp2meS2mtXfF6sBDMPKY0jIfj8dmzZzc3N4fDYcg5xWTmsaXcWushmKc8TstSSUDHlkAexsPhcDwexjFFD62OU84pDcM4zcsbkkDMeRwPx5ub4/GwXQ+bJfPuseXe+5rAsB1w71d8xHgV53PhcRwPh8NhHLJ7aG1JKcWU8zDPS9neFK+WBbMt9PFwPB4P4zjkGN3dkpl57L33Hsw85mFcllJJQMh6e0BeGxjHMa+7QEopxpSHaV6W+mYksH74Px4Oh3H9RMjNLJl57/FcQMrDspRSW6MAGeevhoZhGMdhHFKKFnotMa5vm+smcN0JBAvmHtPawDhsBbivd4p6CP38N3kuS60kIMVt/W4oD8MwDDklt9BbjHEtYyml1tav+8OhdXnHmNOQ16PM601CIVkwDz2dN4plKKXWRgJCzM7fj+Y85PX8IPTmvm4OawGtvwG7gMeYUso555zOm4ClECxY3P4RMeVzASQgw9ZtIKaUUk4pxWgW+noXpac0lNJq69f8gVC4XAx4TJsYPZpZCClYCN7Xv4gxlboVcN3N41WYuXn0FGNKMUV3DyG0bXdIdS3g2hfE+dGwGFNMMW63iZqFZN1CCL5eFHlLtbXLJnDlB43Pxc6rw2Ncl8b6EK2tp8+15vN74vWuBztvA+4eo18elzEL9v/qzESzcjDpUQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNy0wNS0wOFQxNjozMjo1NyswODowMLo34+gAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTctMDUtMDhUMTY6MzI6NTcrMDg6MDDLaltUAAAAAElFTkSuQmCC);background-repeat:no-repeat;height:325px;min-height:auto;padding:10px;width:750px}#douban-wrapper #content h1{font-size:20px}#douban-wrapper #content .grid{border-radius:9px;height:325px;width:750px}#douban-wrapper #content .grid .grid-col1{width:225px}#douban-wrapper #content .grid .grid-col2{height:277px;overflow:hidden;padding:24px 18px;width:254px}#douban-wrapper #content .grid .grid-col3{height:100%;width:18px}#douban-wrapper #content .grid .grid-col4{font-size:14px;padding:27px 14px 0 12px;width:190px}#douban-wrapper #content .picture-douban-wrapper{background-position:50%;background-size:cover;border-bottom-left-radius:9px;border-top-left-radius:9px;height:325px;width:225px}#douban-wrapper #content .main-title h1,#douban-wrapper #content .sub-title h2{display:-webkit-box;-webkit-line-clamp:2;line-height:1.2;max-height:2.5em;overflow:hidden;word-break:break-all;-webkit-box-orient:vertical}#douban-wrapper #content .main-title h1{color:#000;font-size:30px;font-weight:500}#douban-wrapper #content .sub-title{margin-top:9px}#douban-wrapper #content .sub-title h2{color:#adadad;font-size:18px;font-weight:400}#douban-wrapper #content .baseinfo{color:#000;display:-webkit-box;font-size:16px;font-weight:400;letter-spacing:1px;-webkit-line-clamp:5;line-height:25px;margin-top:18px;overflow:hidden;word-break:break-all;-webkit-box-orient:vertical}#douban-wrapper #content .line-wrap{background-image:url(data:image/png;base64,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);background-size:contain;height:100%;position:relative;width:18px}#douban-wrapper #content .douban-icon{font-size:0}#douban-wrapper #content .douban-icon>span{border:1px solid #41be57;display:inline-block;font-size:14px;text-align:center}#douban-wrapper #content .douban-icon .icon-pt1{background-color:#41be57;border-bottom-left-radius:4px;border-top-left-radius:4px;color:#fff;height:24px;line-height:24px;width:24px}#douban-wrapper #content .douban-icon .icon-pt2{background:#fff;border-bottom-right-radius:4px;border-top-right-radius:4px;color:#3ba94d;height:24px;line-height:24px;width:69px}#douban-wrapper #content .score-container .rating_self{clear:none;margin-top:15px;overflow:hidden}#douban-wrapper #content .score-container .rating_self .rating_num{color:#000;font-size:48px;font-weight:400;line-height:1;padding:0}#douban-wrapper #content .score-container .rating_self .rating_right{float:left;padding-left:10px;padding-top:5px}#douban-wrapper #content .score-container .rating_self .rating_right .ll{float:none}#douban-wrapper #content .score-container .rating_self .rating_right .rating_sum{color:#3b3b3b}#douban-wrapper #content .score-container .rating_self .rating_right .rating_sum .rating_people,#douban-wrapper #content .score-container .rating_self .rating_right .rating_sum .rating_people:hover,#douban-wrapper #content .score-container .rating_self .rating_right .rating_sum .rating_people:link,#douban-wrapper #content .score-container .rating_self .rating_right .rating_sum .rating_people:visited{background:none;color:#3b3b3b}#douban-wrapper #content .score-container .ratings-on-weight{margin-top:10px;min-weight:1px}#douban-wrapper #content .score-container .ratings-on-weight .item{line-height:1.5}#douban-wrapper #content .score-container .ratings-on-weight .item .starstop{color:#3b3b3b;float:none;margin-right:0}#douban-wrapper #content .score-container .ratings-on-weight .item>div,#douban-wrapper #content .score-container .ratings-on-weight .item>span{display:inline-block}#douban-wrapper #content .score-container .ratings-on-weight .item .power{background:#faa032;border-radius:3px;height:6px;vertical-align:middle}#douban-wrapper #content .bottom-row{align-items:center;display:flex;justify-content:space-between}#douban-wrapper #content .bottom-row .rating-betterthan{color:#1c1c1c;font-size:14px;line-height:21px;width:117px}#douban-wrapper #content .bottom-row .rating-betterthan .number{color:#41be57;font-size:14px}#douban-wrapper #content .bottom-row .qr-code{height:64px;overflow:hidden;width:64px}#douban-wrapper #content .bottom-row .qr-code img{height:100%;width:100%}.contentlayout.douban-info{display:flex;justify-content:space-around}.contentlayout.douban-info .detail{flex:1}.detail .title{font-size:26px;font-weight:600;margin-bottom:20px}.detail .title a{text-decoration:none}.movie-detail{display:flex;justify-content:space-between}.movie-detail .synopsis{width:60%}.movie-detail .movieinfo{margin-right:20px;max-width:30%}.icon-pt1{font-size:14px;display:inline-block;text-align:center;border:1px solid #41be57;background-color:#41be57;color:#fff;border-top-left-radius:4px;border-bottom-left-radius:4px;width:24px;height:24px;line-height:24px}.ant .icon-pt1{border-radius:4px}.icon-pt2{display:inline-block;text-align:center;border:1px solid #41be57;color:#3ba94d;background:#fff;border-top-right-radius:4px;border-bottom-right-radius:4px;width:69px;height:24px;line-height:24px;font-size:14px}.douban-dom{display:flex;cursor:pointer}.douban-dom{text-align:left}#douban-wrapper *{box-sizing:content-box}#douban-wrapper .clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden}#douban-wrapper .clearfix{zoom:1;display:inline-block;_height:1px}#douban-wrapper .clearfix{height:1%}#douban-wrapper .clearfix{display:block}#douban-wrapper .rating_per{color:#111}#douban-wrapper .grid{overflow:initial}.content-rounded #douban-wrapper div{margin-left:0}#douban-wrapper #content .douban-icon .icon-pt1{background-image:none}#douban-wrapper h2,#douban-wrapper h1{border:none;background-image:none;background-color:transparent;text-shadow:none;padding:0;margin:0;line-height:normal}#douban-wrapper .grid-col5{font-size:14px;padding:27px 14px 0 12px;width:190px;overflow-y:auto;height:277px;width:calc(100% - 795px)}.bigstar50:after{width:100%}.bigstar45:after{width:90%}.bigstar40:after{width:80%}.bigstar35:after{width:70%}.bigstar30:after{width:60%}.bigstar25:after{width:50%}.bigstar20:after{width:40%}.bigstar15:after{width:30%}.bigstar10:after{width:20%}.bigstar05:after{width:10%}.bigstar00:after{width:0}.bigstar00,.bigstar05,.bigstar10,.bigstar15,.bigstar20,.bigstar25,.bigstar30,.bigstar35,.bigstar40,.bigstar45,.bigstar50{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCI+PHBhdGggZmlsbC1vcGFjaXR5PSIuMTIiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0ibTUuNDg2LjU0IDEuMDAzIDIuNTY0YS4zMS4zMSAwIDAgMCAuMjcyLjE5OGwyLjc0OC4xNjJhLjUyMS41MjEgMCAwIDEgLjMuOTI0TDcuNjgxIDYuMTMzYS4zMS4zMSAwIDAgMC0uMTA0LjMyMWwuNjk1IDIuNjY0YS41MjEuNTIxIDAgMCAxLS43ODUuNTdMNS4xNjkgOC4yMDVhLjMxLjMxIDAgMCAwLS4zMzggMEwyLjUxMyA5LjY5YS41MjEuNTIxIDAgMCAxLS43ODUtLjU3bC42OTUtMi42NjVhLjMxLjMxIDAgMCAwLS4xMDQtLjMyTC4xOSA0LjM4N2EuNTIxLjUyMSAwIDAgMSAuMy0uOTI0bDIuNzQ4LS4xNjJhLjMxLjMxIDAgMCAwIC4yNzItLjE5OEw0LjUxNC41NGEuNTIxLjUyMSAwIDAgMSAuOTcyIDAiLz48L3N2Zz4=);background-repeat:repeat-x;background-size:auto 100%;height:15px;margin:1px 0 5px;overflow:hidden;position:relative;width:75px}.bigstar00:after,.bigstar05:after,.bigstar10:after,.bigstar15:after,.bigstar20:after,.bigstar25:after,.bigstar30:after,.bigstar35:after,.bigstar40:after,.bigstar45:after,.bigstar50:after{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCI+PHBhdGggZmlsbD0iI2Y5MCIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJtNS40ODYuNTQgMS4wMDMgMi41NjRhLjMxLjMxIDAgMCAwIC4yNzIuMTk4bDIuNzQ4LjE2MmEuNTIxLjUyMSAwIDAgMSAuMy45MjRMNy42ODEgNi4xMzNhLjMxLjMxIDAgMCAwLS4xMDQuMzIxbC42OTUgMi42NjRhLjUyMS41MjEgMCAwIDEtLjc4NS41N0w1LjE2OSA4LjIwNWEuMzEuMzEgMCAwIDAtLjMzOCAwTDIuNTEzIDkuNjlhLjUyMS41MjEgMCAwIDEtLjc4NS0uNTdsLjY5NS0yLjY2NWEuMzEuMzEgMCAwIDAtLjEwNC0uMzJMLjE5IDQuMzg3YS41MjEuNTIxIDAgMCAxIC4zLS45MjRsMi43NDgtLjE2MmEuMzEuMzEgMCAwIDAgLjI3Mi0uMTk4TDQuNTE0LjU0YS41MjEuNTIxIDAgMCAxIC45NzIgMCIvPjwvc3ZnPg==);background-repeat:repeat-x;background-size:auto 100%;content:"";height:100%;left:0;position:absolute;top:0}.bigstar00+span.rating_num,.bigstar05+span.rating_num,.bigstar10+span.rating_num,.bigstar15+span.rating_num,.bigstar20+span.rating_num,.bigstar25+span.rating_num,.bigstar30+span.rating_num,.bigstar35+span.rating_num,.bigstar40+span.rating_num,.bigstar45+span.rating_num,.bigstar50+span.rating_num{font-size:16px;line-height:1}#douban-wrapper .summary{padding-top:10px;color:#000;line-height:25px;letter-spacing:1px;word-break:break-all;font-weight:400}#douban-wrapper{width:100%!important}.douban-dom>div{width:100%}#douban-wrapper #content{background-image:none!important;background:#fff;padding:0!important;width:calc(100% - 20px)!important}#douban-wrapper #content .grid{width:100%!important}.bhd #douban-wrapper ::-webkit-scrollbar-track{background-color:#fff}.bhd #douban-wrapper ::-webkit-scrollbar-thumb{background-color:#ddd}.btn #douban-wrapper .grid-col1,.hdb #douban-wrapper .grid-col1,.hdt #douban-wrapper .grid-col1,.sc #douban-wrapper .grid-col1,.bb #douban-wrapper .grid-col1{display:none}.btn #douban-wrapper .grid-col5,.hdt #douban-wrapper .grid-col5,.hdb #douban-wrapper .grid-col5,.sc #douban-wrapper .grid-col5,.bb #douban-wrapper .grid-col5{width:calc(100% - 570px)}.douban-title-blu{color:#2196f3;font-size:inherit;font-weight:700;margin-left:8px;white-space:nowrap}.douban-title-hdb{margin-left:6px}.douban-title-line{margin:5px 0;font:700 16px tahoma,helvetica,sans-serif;text-align:center;color:#fff}.douban-title-line .douban-title-link{color:#fff;text-decoration:none}.douban-title-line .douban-title-link:hover{text-decoration:underline}.douban-summary-tab-text{line-height:1.6}.douban-title-bhd{margin-left:5px}.douban-rating-group{float:right;max-width:100%;display:flex;flex-direction:column;align-items:flex-start;row-gap:6px}.cblock-innercontent span:has(img[src*=starbig]){font-size:13px!important;white-space:nowrap}.cblock-innercontent span:has(img[src*="date.png"]){white-space:nowrap} ');

(function ($) {
  'use strict';

  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var _a, _b, _c;
  const PT_SITE = /* @__PURE__ */ JSON.parse(`{"aither.cc":{"url":"https://aither.cc","host":"aither.cc","siteName":"Aither","poster":"#meta-poster","imdb":".badge-user a[href*=\\"imdb.com/title\\"]:nth-child(1)","insertDomSelector":".torrent-buttons","doubanContainerDom":"<div class=\\"movie-wrapper\\"><div class=\\"movie-overlay\\" style=\\"background-color: rgba(81, 51, 40, 0.75);\\"></div><div class=\\"douban-dom\\" style=\\"position: relative;z-index: 2;\\"></div></div>"},"alpharatio.cc":{"url":"https://alpharatio.cc","host":"alpharatio.cc","siteName":"AR","imdb":"a[href*=\\"imdb.com/title\\"]","titleDom":"span.size6","addTitleAfter":"span.size6","addTitleHtml":"<br><a class=\\"douban-title-link douban-title-ar\\" style=\\"color:#008000;\\" href=\\"{link}\\" target=\\"_blank\\" rel=\\"noreferrer\\" title=\\"{title}\\"><span class=\\"size6\\">{title}</span></a>","replaceOverviewLabel":"PLOT","addLinkButtonAfter":"a[href*=\\"themoviedb.org\\"]","addLinkButtonHtml":" <a rel=\\"noreferrer\\" target=\\"_blank\\" href=\\"{link}\\"><img class=\\"scale_image\\" src=\\"data:image/png;base64,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\\" alt=\\"Douban\\" title=\\"Douban\\"></a>"},"anthelion.me":{"url":"https://anthelion.me","host":"anthelion.me","siteName":"ANT","siteType":"gazelle","imdb":{"request":".layout a[href*=\\"imdb.com/title\\"]:first","torrent":".torrent_ratings a[href*=\\"imdb.com/title\\"]:first"}},"avistaz.to":{"url":"https://avistaz.to","host":"avistaz.to","siteName":"AvistaZ","imdb":".movie-details .badge-extra a[href*=\\"imdb.com/title\\"]:first","titleDom":".title .torrent-filename","poster":".movie-poster img","insertDomSelector":".movie-poster","doubanContainerDom":"<div class=\\"douban-dom\\" style=\\"justify-content: flex-start;\\"></div>"},"beyond-hd.me":{"url":"https://beyond-hd.me","host":"beyond-hd.me","siteName":"BHD","imdb":".movie-details a[href*=\\"imdb.com/title\\"]:nth-child(1)","addTitleAfter":"h1.bhd-title-h1 a.beta-link-blend","addTitleHtml":"<a class=\\"douban-title-link douban-title-bhd\\" href=\\"{link}\\" target=\\"_blank\\" rel=\\"noreferrer\\" title=\\"{title}\\">{title}</a>","replaceOverview":".movie-overview","replaceRating":".badge-meta[title=\\"IMDb Rating\\"]","replaceRatingHtml":"<span class=\\"badge-meta\\" title=\\"豆瓣评分\\"><a rel=\\"noreferrer\\" href=\\"{link}\\" target=\\"_blank\\"><span class=\\"movie-rating-stars\\"><span class=\\"douban-badge-icon\\">豆</span></span> {score}</a></span>","addLinkButtonAfter":".badge-meta:has(.fa-tv-retro)","addLinkButtonHtml":"<span class=\\"badge-meta\\"><a rel=\\"noreferrer\\" href=\\"{link}\\" title=\\"Douban\\" target=\\"_blank\\" class=\\"beta-link-blend\\"> DOUBAN</a></span>","addDarkLinkButtonAfter":".badge-meta:has(.fa-tv-retro)","addDarkLinkButtonHtml":"<span class=\\"badge-meta class-base\\"><span class=\\"class-base\\">DOUBAN</span></span>"},"blutopia.cc":{"url":"https://blutopia.cc","host":"blutopia.cc","siteName":"BLU","imdb":".meta__imdb a[href*=\\"imdb.com/title\\"]:nth-child(1)","titleDom":".torrent__name","addTitleInside":"h1.meta__title","addTitleHtml":"<a class=\\"douban-title-link douban-title-blu\\" href=\\"{link}\\" target=\\"_blank\\" rel=\\"noreferrer\\" title=\\"{title}\\">{title}</a>","replaceOverview":"p.meta__description","replaceRating":"li.work__rating","replaceRatingHtml":"<li class=\\"work__rating\\"><a href=\\"{link}\\" target=\\"_blank\\" rel=\\"noreferrer\\" title=\\"豆瓣评分 {votes}人评价\\"><span class=\\"work__rating-text\\">豆瓣 {score}</span></a></li>","addLinkButtonAfter":"ul.meta__ids li.meta__imdb","addLinkButtonHtml":"<li class=\\"meta__douban\\"><a class=\\"meta-id-tag\\" href=\\"{link}\\" title=\\"Douban\\" target=\\"_blank\\" rel=\\"noreferrer\\"><img src=\\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAARCAYAAACilZ5PAAAEHElEQVR42s2Wy29VVRTGf2uffe7j9N5a+uZRCgJpMLUVkdAUhCYycuCMARP/AU30HzBiYkIiE00U49DEGF8JAxONAyOIaGKICgIRMbQX5EJf3F7u+55z9nLQYhwg9Bg17GRnD85e63z723t96xMOHvTGpq4dFl9eUKcdOAQQHqyhGFSM1DTUN86dGDrsjT+fP2zz/kuu6dLovw9a/iadJPuNoAiOtM3bff3rS8ijb020xeDhkCTZjJh7fne6nDB0IdZYjBhEhNjFqCpOHZ7xEARFV8u7YlB1xFYMPpqMZ6eORti4556MnyF0If1BH7eaJWrtGqELyafyWM+SsRmq7Sqhi0gZf3Xgl08pYjB2JWJVsEWEZtRipGcrh0YP0orbyF0iU16Kd396n5mlAs+OH+LS4mUuLf7G/uE9bOvZwpnij6S8NKqOjy8eR1WTvniVsWMTiaKcOjr8gN6gh1bcxv8LWwKELiLrZ5kuzTA5tJs9GyewxuIbn7RN83v5Ohk/TegierLdnCp8y2eXvyCXyuHUrRqHTVps1niUmmWCVMCLE88xW53DMwYFVJXeoIejp1+nHjaYLhXoznZTbpXpC3oZyPVTDWvM1xcpVorkUjkuzv+CNTYx6za5LoGqY21ukFJjiVdPvUZXqhMFamGdI0+9TF/Qy43KLP25PnYMjmGM4cqtaXzj49SRT+fY1bmTjQ9tYLY2x/VKMbFa2X8qc7HGrMsPsn94L93ZNSjK7WaF3qCXWB3WWBbrizTjFqVqCYcSuYjIRRgxLDXL5FIdlJtlrNj/AbhC2maYLhX4ee4Ce4YmmF6aQRC2bxjh7Ox5ipUbZP0M1ys3WagvUKzcJPCzBH6WcrOM7/m0ouX6KJSvISIrd7n6YZLjVkCZrc7y0fnj5NN53jv7AW9+/w5GDF9Nn2S+tkAravNI7wiPr32MXet3smXNZmar8wzk+tnWvZXJod2MDmxnfGCUdtxeAf8fMu7U0ZXpYlPXMPWwjhFhatM+glTAtp4t1MM644OjlFsVzhR/4MLcJF8XTvPEuh3UwxrPjDxNoXyVb65+h2c8vrxykrX5QSIXJevIY8cm3Gp13IihFtY4sHmKJ4f30o5bRC7CMx6BHxC7mEbUpMMP+PTXz0l7KTZ1DeNQZkoFMjbNgYenWKjfInIRxepNPjz/CZ2pTmKNE128jL09oUme1502HroI0JVmBs7FiAhGlqXRikc+naMRNsn4GZpRkzCOcOrI2DRZP4sVj3Lr9n3tw11AYNURJvEqiuIbn5SXuu++etjAiKGxsqZtCkFw6qi1ayiKJ16yAlvxKsaIHrEd1iQxWMqySbrXVNU/mbyz3jFXAJ54yWVQENthjRE94s0Gk6f61i0Z8WUHrBiuB9WPe1J1DXf03ImNr/wBwjPs2VghyRoAAAAASUVORK5CYII=\\" alt=\\"Douban\\" title=\\"Douban\\"></a></li>"},"broadcasthe.net":{"url":"https://broadcasthe.net","host":"broadcasthe.net","siteName":"BTN","imdb":".stats td a[href*=\\"imdb.com/title\\"]","titleDom":"h2:first","addTitleLineAfter":"img#banner","addTitleLineHtml":"<div class=\\"douban-title-line\\"><a class=\\"douban-title-link\\" target=\\"_blank\\" rel=\\"noreferrer\\" href=\\"{link}\\" title=\\"{title}\\">{title} {nativeTitle}</a></div>","addSummaryTab":"#tabs","addSummaryTabIcon":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAACh0lEQVR42o2SvWvUWRSGn3M//CVjSCaChQbNLCqioCgoxhhxkXW3EHYLS/0TVKx2RVAQKzuLmNJOEBEVwRQGxUYk6ILFqohhk4iLC4lhNJmZ/D7uPRYmE+Mg+sLlVuflfc95BGDHpT2btGQuqfIzgXZQ4ZsSxdIQ4aHU46lnp0Zfy87Bvo3By4hNbCXWA4ryPQmCKVlCGiZsrodMFAZtYivFXJ5nIeNHlIaUfC7PXWIrURh0EQ5KI+p8TP25A6cZWL+XqBEjpmVYNSJieDH1kj/vnfWhHjTCQSeCB4ga6e1aR6W8/oeSLJQWEbxsH+pTQSi0oDPppCvpJA85kdgybMTgjWc2naWafsCJQ1EcgKIkdgXvZt+xb90eft98mDaXYI0DFBBCLJgvUu68usuN57dZVeqmiAHgs8lSZ2Xr6i3s7+3n1fRrFEVEUFUEYXfPJsZm/kW5tSzhchOULGTkMefw1SNU04+0uzYaxTzlpJOXJ/4mC1kLBu7r3s44vPEMH7tJEQP1vE7Jl3DG4o3HGde6qy+reOMZr04y+t9TpmrTqEZ2rd2JamSqNs3o2yeMVyfxxqO6lEa2D/XplyRmIcMaS6Xcy4bun7j46wX+uneW8eokk9U3pCElccm3TYwYalmNgd5+rvwx1BL7zP3zXPvnBuW2LsLCZQBk2+W+TAQHyCJ0K32JA5UBvPUIn68TUR69ecz7+gzOuMXlqiqFM/DAlNxvxVyRi8EbMdTyOtef32oysviv9KWmgUZy1+F8rBUPnFGOhzSMuA5bCfXQrNXdVl7ItqQYY/O8rsP6kIYJqxy3/w+/nVnzS8+wGjYg0rNAsSiK6vLXxMlKg6gjphGPPjs5OvYJRYI+gaJ9V4UAAAAASUVORK5CYII=","replaceRating":"tr:has(b:contains(\\"TVDB Rating\\"))","replaceRatingHtml":"<tr><td><b>DouBan Rating:</b></td><td>{score}</td></tr>","replaceRatingPosition":"after","addLinkButtonAfter":"a[href*=\\"thetvdb.com\\"]","addLinkButtonHtml":" <a target=\\"_blank\\" rel=\\"noreferrer\\" href=\\"{link}\\"><img src=\\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACT0lEQVR42oWTv2sUQRzFP9/Z2du93J5GLRJJkAO1sfAHCElnlIhgJSgICpapQkgriGCaWFrE/Aci2AgKQUkTRYSgSGwkqGDQRM4faDTn7d3uzn4tjpy5GPTBNDNvHu99540AHL4xsF+7zA2QIXEUAWFrqHrEoHNSz8cXxuffyJGpwX3Ol1kbeJV4LSbXnH9BxFAsF3FNt+SletLmolM2sJXGWjPtLff4kV9Ct7CwvtdwTT7+qKZBuVBxWTplVcyJZi3RbWHk3z1/m+3hNv6H07fO+u++L2nghSesCL6IkOUZi19fs7O4A6cO2eRBUTzxyPKMOG1gxAiivhycHlQBnOZkuWPP9n4CG6CabwiiiBiaWZMPP5cxYrBiURS7ns8aS+JSJo5fYaD/6JbW55efc+nuCKEf4tQBtATW4dRRDiKerbxg4tEk3WE3AKuNVa4eu0w5iHDqULR9x24edetQEaRNXJ+Htggd6BAwxlBLfjHQd5R7F+78HWHlOcaYzl4cnB7UPzVTess9lIMyjSTm6tBlACbmJgn9kLWkRrX2qeOFOgQ84/Gp9pnrw9c4d+AMRb8IQJzGPH7/lJH7Y+wKu3Eb2mpVSUWwgKgqUaHEqy+LzC09IXEJAvhegYXqS7psuHEEqkomh24OPjAleyqrZamYVqnqSZ3EpYhIm2mNR1SIUBTNSW1k/fxX9tAaZdQ13ayNvIqrO1SVUqFEJJuaqNr+aDbyfNd0S54y6lVnlr/tHu6bUcNeRPpQrKKiqnSslnnFk5hcZ02cX1wYm3/7G0f0F7GPR+eKAAAAAElFTkSuQmCC\\" border=\\"0\\" width=\\"16\\" height=\\"16\\" alt=\\"Douban\\" title=\\"Douban\\"></a>"},"eiga.moi":{"url":"https://eiga.moi","host":"eiga.moi","siteName":"ACM","imdb":".meta__imdb a[href*=\\"imdb.com/title\\"]:nth-child(1)","titleDom":".torrent__name","addTitleInside":"h1.meta__title","addTitleHtml":"<a class=\\"douban-title-link douban-title-acm\\" href=\\"{link}\\" target=\\"_blank\\" rel=\\"noreferrer\\" title=\\"{title}\\">{title}</a>","replaceOverview":"p.meta__description","replaceRating":"li.work__rating","replaceRatingHtml":"<li class=\\"work__rating\\"><a href=\\"{link}\\" target=\\"_blank\\" rel=\\"noreferrer\\" title=\\"豆瓣评分 {votes}人评价\\"><span class=\\"work__rating-text\\">豆瓣 {score}</span></a></li>","addLinkButtonAfter":"ul.meta__ids li.meta__imdb","addLinkButtonHtml":"<li class=\\"meta__douban\\"><a class=\\"meta-id-tag\\" href=\\"{link}\\" title=\\"Douban\\" target=\\"_blank\\" rel=\\"noreferrer\\"><img src=\\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAARCAYAAACilZ5PAAAEHElEQVR42s2Wy29VVRTGf2uffe7j9N5a+uZRCgJpMLUVkdAUhCYycuCMARP/AU30HzBiYkIiE00U49DEGF8JAxONAyOIaGKICgIRMbQX5EJf3F7u+55z9nLQYhwg9Bg17GRnD85e63z723t96xMOHvTGpq4dFl9eUKcdOAQQHqyhGFSM1DTUN86dGDrsjT+fP2zz/kuu6dLovw9a/iadJPuNoAiOtM3bff3rS8ijb020xeDhkCTZjJh7fne6nDB0IdZYjBhEhNjFqCpOHZ7xEARFV8u7YlB1xFYMPpqMZ6eORti4556MnyF0If1BH7eaJWrtGqELyafyWM+SsRmq7Sqhi0gZf3Xgl08pYjB2JWJVsEWEZtRipGcrh0YP0orbyF0iU16Kd396n5mlAs+OH+LS4mUuLf7G/uE9bOvZwpnij6S8NKqOjy8eR1WTvniVsWMTiaKcOjr8gN6gh1bcxv8LWwKELiLrZ5kuzTA5tJs9GyewxuIbn7RN83v5Ohk/TegierLdnCp8y2eXvyCXyuHUrRqHTVps1niUmmWCVMCLE88xW53DMwYFVJXeoIejp1+nHjaYLhXoznZTbpXpC3oZyPVTDWvM1xcpVorkUjkuzv+CNTYx6za5LoGqY21ukFJjiVdPvUZXqhMFamGdI0+9TF/Qy43KLP25PnYMjmGM4cqtaXzj49SRT+fY1bmTjQ9tYLY2x/VKMbFa2X8qc7HGrMsPsn94L93ZNSjK7WaF3qCXWB3WWBbrizTjFqVqCYcSuYjIRRgxLDXL5FIdlJtlrNj/AbhC2maYLhX4ee4Ce4YmmF6aQRC2bxjh7Ox5ipUbZP0M1ys3WagvUKzcJPCzBH6WcrOM7/m0ouX6KJSvISIrd7n6YZLjVkCZrc7y0fnj5NN53jv7AW9+/w5GDF9Nn2S+tkAravNI7wiPr32MXet3smXNZmar8wzk+tnWvZXJod2MDmxnfGCUdtxeAf8fMu7U0ZXpYlPXMPWwjhFhatM+glTAtp4t1MM644OjlFsVzhR/4MLcJF8XTvPEuh3UwxrPjDxNoXyVb65+h2c8vrxykrX5QSIXJevIY8cm3Gp13IihFtY4sHmKJ4f30o5bRC7CMx6BHxC7mEbUpMMP+PTXz0l7KTZ1DeNQZkoFMjbNgYenWKjfInIRxepNPjz/CZ2pTmKNE128jL09oUme1502HroI0JVmBs7FiAhGlqXRikc+naMRNsn4GZpRkzCOcOrI2DRZP4sVj3Lr9n3tw11AYNURJvEqiuIbn5SXuu++etjAiKGxsqZtCkFw6qi1ayiKJ16yAlvxKsaIHrEd1iQxWMqySbrXVNU/mbyz3jFXAJ54yWVQENthjRE94s0Gk6f61i0Z8WUHrBiuB9WPe1J1DXf03ImNr/wBwjPs2VghyRoAAAAASUVORK5CYII=\\"></a></li>"},"filelist.io":{"url":"https://filelist.io","host":"filelist.io","siteName":"FL","imdb":".cblock-innercontent div a[href*=\\"imdb.com/title\\"]:first","titleDom":".cblock-header h4","addTitleBefore":".cblock-innercontent span[style*=\\"padding-left:25px\\"]","addTitleHtml":"<a class=\\"douban-title-link douban-title-fl\\" href=\\"{link}\\" target=\\"_blank\\" rel=\\"noreferrer\\" title=\\"{title}\\">{title}</a>","replaceOverview":".cblock-innercontent span[style*=\\"padding-left:25px\\"]","replaceRating":".cblock-innercontent span:has(img[src*=\\"starbig\\"])","replaceRatingPosition":"before","ratingSourceLabel":"IMDb","replaceRatingHtml":"<span style=\\"font-size:18px;float:right;margin-right:12px;\\"><img src=\\"/styles/images/starbig.png\\" alt=\\"豆瓣评分\\" style=\\"position:relative;bottom:2px;\\"> 豆瓣 {score}</span>","addLinkButtonAfter":".cblock-innercontent a:has(img[src*=\\"imdb.png\\"])","addLinkButtonHtml":" <a href=\\"{link}\\" target=\\"_blank\\" rel=\\"noreferrer\\"><img src=\\"data:image/png;base64,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\\" alt=\\"Douban\\" title=\\"Douban\\"></a>"},"hd-space.org":{"url":"https://hd-space.org","host":"hd-space.org","siteName":"HDS","imdb":"#imdb a[href*=\\"imdb.com/title\\"]","titleDom":"#imdb td.header a","addTitleInside":"#imdb td.header b a","addTitleHtml":"<a class=\\"douban-title-link\\" style=\\"color:inherit; text-decoration: underline;\\" href=\\"{link}\\" target=\\"_blank\\" rel=\\"noreferrer\\" title=\\"{title}\\">{title}</a>","replaceRating":"#imdb tr:has(b:contains(\\"Rating:\\"))","replaceRatingPosition":"after","renameRatingLabel":"IMDB Rating:","starFullHtml":"<span class=\\"star\\" style=\\"background-image: url(https://hd-space.org/imdbphp/imgs/star_boxed_full.png); background-repeat: no-repeat; display: inline-block; width: 8px; height: 16px; background-position: 0px 0px; cursor: default;\\"></span><span class=\\"star\\" style=\\"background-image: url(https://hd-space.org/imdbphp/imgs/star_boxed_full.png); background-repeat: no-repeat; display: inline-block; width: 9px; height: 16px; background-position: -8px 0px; cursor: default;\\"></span>","starEmptyHtml":"<span class=\\"star\\" style=\\"background-image: url(https://hd-space.org/imdbphp/imgs/star_boxed_empty.png); background-repeat: no-repeat; display: inline-block; width: 8px; height: 16px; background-position: 0px 0px; cursor: default;\\"></span><span class=\\"star\\" style=\\"background-image: url(https://hd-space.org/imdbphp/imgs/star_boxed_empty.png); background-repeat: no-repeat; display: inline-block; width: 9px; height: 16px; background-position: -8px 0px; cursor: default;\\"></span>","replaceRatingHtml":"<tr><td class=\\"lista\\"><b>DouBan Rating:</b></td><td class=\\"lista\\"><a href=\\"{link}\\" target=\\"_blank\\" rel=\\"noreferrer\\" title=\\"豆瓣评分 {votes}人评价\\" style=\\"text-decoration:none\\">{stars}<span style=\\"color:#999;font-size:12px;font-weight:bold\\">{score}/10</span></a></td></tr>","replaceOverview":"#imdb tr:has(b:contains(\\"Plot:\\")) > td + td"},"hd-torrents.org":{"url":"https://hd-torrents.org","host":"hd-torrents.org","siteName":"HDT","imdb":".imdbnew2 a[href*=\\"imdb.com/title\\"]:first","addTitleAfter":".imdbnew2 a[href*=\\"imdb.com/title\\"]","addTitleHtml":"<strong><font color=\\"black\\"> <img src=\\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAMCAIAAAD3UuoiAAAB/0lEQVR4nHWTPWhUQRDHZ3b3vUu4u9wlohIT9RA/CitLsRYsxMJKucI2YB2tLRS1UMQijViIiBY2FmKlFioEYhMRMa2gJuTOJN69d+/tzozs3b13H8Fhi2WY/4+Z2f/i2vv5IDAiAkOhFExOKKWGcz6EoZOKcyPFiGitM1oZY4IcRAzlIr79FN182DAGmAcCo9E6uXRhaqFebW6T0ZiDmMA4J0pLDhKBOJb5/WahXi0VEaFf3RVAO+KDB4JWm4XBZRJEcE4MEzB5fT8LEEVwrBb+2eL7j5vOCYtPKuUFF8+VT5+a/L3pAo15r4ieMA4C8OOQg69ryefVzqPbs6kVZpmpmOt3Nz6uxJfPV5iARnb0f5Cwn9wEyAJJ6gd3JGGACpHZ1/NuEJEQDXbUA8Ud3jut9s3oxVvrpaJihtSK1nC8Frb9gmSsI6JdO+pFFMnZM6VqWS/e2Xh2b+7EkfDKtZ/lorpan17fJBD/TGMdqR4oP0QAAo0mr35LQFAr/LASvX7Xevnmb20u/PI9+fHL9qcbPbj84lBYGPjIkeypmAdPGk9fbRdCDAw6knbELDBVUp1ETh4tLN2YjRNRmTEQMU0sLj8/PAwSAIXQiji1vtQbEkH7t0cibwQEqJT1mLPTxJrWjjNB14hZCIDWOKF7tywpYrIfs7NlBzbtkpx1/wDkbTxzYNS8TAAAAABJRU5ErkJggg==\\" border=\\"0\\"> </font></strong><a class=\\"douban-title-link douban-title-hdt\\" href=\\"{link}\\" target=\\"_blank\\" rel=\\"noreferrer\\" title=\\"{title}\\"><font size=\\"3\\"><b>{title}</b></font></a>","replaceOverviewLabel":"Plot:","replaceRating":".imdbnew2 img[src*=\\"ratings/\\"]","ratingRewriteHtml":"<strong><font color=\\"black\\">IMDB：</font></strong>{siteScore}/10<strong><font color=\\"black\\">（Votes: {siteVotesComma}）</font></strong>","removeRatingVotes":".imdbnew2 strong:has(> font:contains(\\"Votes\\"))","replaceRatingHtml":"<br><strong><font color=\\"black\\">豆瓣: </font></strong>{score}/10 <strong><font color=\\"black\\">（Votes: {votesComma}）</font></strong>"},"hdbits.org":{"url":"https://hdbits.org","host":"hdbits.org","siteName":"HDB","imdb":{"movie":".contentlayout h1 a","tv":"#details .showlinks li:nth-child(2) a","tvRequest":".lottery_table2 .showlinks li:nth-child(2) a"},"titleDom":"table.contentlayout h1","addTitleInside":"table.contentlayout h1","addTitleHtml":"<a class=\\"douban-title-link douban-title-hdb\\" href=\\"{link}\\" target=\\"_blank\\" rel=\\"noreferrer\\" title=\\"{title}\\">{title}</a>","replaceOverview":"#plotcell tr:has(th:contains(\\"Plot\\")) + tr > td","replaceRating":"#imdbinfo tr:has(th:contains(\\"Rating\\"))","renameRatingLabel":"IMDB Rating","replaceRatingHtml":"<tr><th>DouBan Rating</th><td>{score} ({votesComma} votes)</td></tr>","replaceRatingPosition":"after"},"hdf.world":{"url":"https://hdf.world","host":"hdf.world","siteName":"HDF","imdb":"a[href*=\\"imdb.com/title\\"]","titleDom":"h2","addTitleAfter":"h2 span[dir=\\"ltr\\"]","addTitleHtml":" <a class=\\"douban-title-link\\" style=\\"color: #36F69F; text-decoration: none;\\" href=\\"{link}\\" target=\\"_blank\\" rel=\\"noreferrer\\" title=\\"{title}\\">{title}</a>","replaceOverview":"#plotcell tr:has(th:contains(\\"Synopsis\\")) + tr > td","replaceOverviewLabel":"Synopsis","replaceRating":".torrent_description a[href*=\\"wikipedia.org\\"]","replaceRatingPosition":"before","replaceRatingHtml":"<a href=\\"{link}\\" target=\\"_blank\\" rel=\\"noreferrer\\" title=\\"豆瓣评分\\"><img class=\\"scale_image\\" src=\\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAgNjAiIHdpZHRoPSIxMjAiIGhlaWdodD0iNjAiPjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iNjAiIHJ4PSIxMiIgZmlsbD0iIzAwNzcyMiIvPjx0ZXh0IHg9IjYwIiB5PSI0MyIgZm9udC1mYW1pbHk9IlBpbmdGYW5nIFNDLEhpcmFnaW5vIFNhbnMgR0IsTWljcm9zb2Z0IFlhSGVpLHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMzIiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjZmZmZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7osYbnk6M8L3RleHQ+PC9zdmc+\\" width=\\"62\\" height=\\"30\\" alt=\\"Douban\\"></a> : <strong>{score}</strong>/10 | ","addLinkButtonAfter":".db-links-container-details a[href*=\\"imdb.com/title\\"]","addLinkButtonHtml":"<a href=\\"{link}\\" target=\\"_blank\\" rel=\\"noreferrer\\" class=\\"tooltip db-link db-link-copy\\" title=\\"Douban\\"><img src=\\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAgNjAiIHdpZHRoPSIxMjAiIGhlaWdodD0iNjAiPjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iNjAiIHJ4PSIxMiIgZmlsbD0iIzAwNzcyMiIvPjx0ZXh0IHg9IjYwIiB5PSI0MyIgZm9udC1mYW1pbHk9IlBpbmdGYW5nIFNDLEhpcmFnaW5vIFNhbnMgR0IsTWljcm9zb2Z0IFlhSGVpLHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMzIiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjZmZmZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7osYbnk6M8L3RleHQ+PC9zdmc+\\" alt=\\"Douban\\"></a>"},"iptorrents.com":{"url":"https://iptorrents.com","host":"iptorrents.com","siteName":"IPT","imdb":".main td a[href*=\\"imdb.com/title\\"]","titleDom":".tt","addTitleInside":".tt","addTitleHtml":"<a class=\\"douban-title-link\\" style=\\"color:inherit\\" href=\\"{link}\\" target=\\"_blank\\" rel=\\"noreferrer\\" title=\\"{title}\\">{title}</a>","replaceRating":".imdb-voters","groupRating":true,"replaceRatingHtml":"<div class=\\"douban-voters rbox\\" title=\\"豆瓣评分 {score} / 10, {votes} votes\\" style=\\"padding-right:25px;font-size:12px\\"><a class=\\"rsrc\\" href=\\"{link}\\" target=\\"_blank\\" rel=\\"noreferrer nofollow\\" style=\\"background:#007722;color:#fff\\">豆瓣</a>{score} / 10<div class=\\"imdb-rating\\" style=\\"width:{scoreWidth}\\"></div><div class=\\"rvotes\\">{votesComma} votes</div></div>","replaceOverview":".main tr:has(td:contains(\\"Plot\\")) > td + td","addLinkButtonAfter":".main td:has(a[href*=\\"imdb.com/title\\"]) a[href*=\\"imdb.com/title\\"]","addLinkButtonHtml":" <a class=\\"douban-ipt-btn\\" href=\\"{link}\\" target=\\"_blank\\" rel=\\"noreferrer nofollow\\" style=\\"display:inline-flex;align-items:center;gap:5px;background:#007722;color:#fff;padding:6px 14px;border-radius:5px;text-decoration:none;font-weight:700;font-size:13px;border:1px solid #005c1b;transition:background .15s,color .15s\\" onmouseover=\\"this.style.background='#005c1b'\\" onmouseout=\\"this.style.background='#007722'\\">豆瓣</a>"},"karagarga.in":{"url":"https://karagarga.in","host":"karagarga.in","siteName":"KG","imdb":"td a[href*=\\"imdb.com/title\\"]:first","insertDomSelector":".outer h1~table:first","doubanContainerDom":"<div class=\\"douban-dom kg\\" style=\\"width:1100px;padding-top:20px;\\"></div>"},"passthepopcorn.me":{"url":"https://passthepopcorn.me","host":"passthepopcorn.me","siteName":"PTP","siteType":"gazelle","imdb":{"request":"#request-table a[href*=\\"imdb.com/title\\"]:first","torrent":"#imdb-title-link"}},"privatehd.to":{"url":"https://privatehd.to","host":"privatehd.to","siteName":"PHD","imdb":".movie-details .badge-extra a[href*=\\"imdb.com/title\\"]:first","titleDom":".title .torrent-filename","poster":".movie-poster img","insertDomSelector":".movie-poster","doubanContainerDom":"<div class=\\"douban-dom\\" style=\\"justify-content: flex-start;\\"></div>"},"secret-cinema.pw":{"url":"https://secret-cinema.pw","host":"secret-cinema.pw","siteName":"SC","imdb":".torrent_row a[href*=\\"imdb.com/title\\"]:first","insertDomSelector":".linkbox:first","doubanContainerDom":"<div class=\\"douban-dom sc\\"></div>"},"shadowthein.net":{"url":"http://shadowthein.net","host":"shadowthein.net","siteName":"iTS","imdb":".IMDBtable a[href*=\\"imdb.com/title\\"]:first","titleDom":"h1:first","addTitleAfter":".IMDBtable tr:has(td:contains(\\"Title:\\")) b","addTitleHtml":" <a class=\\"douban-title-link\\" style=\\"color:inherit;font-weight:bold;\\" href=\\"{link}\\" target=\\"_blank\\" rel=\\"noreferrer\\" title=\\"{title}\\">{title}</a>{year}","addTitleYearFrom":".IMDBtable tr:has(td:contains(\\"Released:\\")) td + td","replaceRating":".IMDBtable tr:has(td:contains(\\"Rating:\\"))","replaceRatingPosition":"after","renameRatingLabel":"IMDB Rating:","replaceRatingHtml":"<tr><td>DouBan Rating:</td><td><a href=\\"{link}\\" target=\\"_blank\\" rel=\\"noreferrer\\" title=\\"豆瓣评分 {votes}人评价\\" style=\\"color:darkorange\\">{score}</a></td></tr>","replaceOverview":".IMDBtable tr:has(td:contains(\\"Plot:\\")) > td + td","addLinkButtonAfter":".IMDBtable tr:has(td:contains(\\"Link:\\")) a","addLinkButtonHtml":" <a href=\\"redir.php?{link}\\" style=\\"color:darkorange\\">{link}</a>"},"tgx.rs":{"url":"https://tgx.rs","host":"tgx.rs","siteName":"TorrentGalaxy","poster":"#covercell img","imdb":"#imdbpage[href*=\\"imdb.com/title\\"]","titleDom":".torrentpagetable.limitwidth:first a.textshadow","insertDomSelector":".buttonbox","doubanContainerDom":"<div class=\\"douban-dom\\" style=\\"display:flex;justify-content: center;\\"></div>"},"www.torrentleech.org":{"url":"https://www.torrentleech.org","host":"torrentleech.org","siteName":"IPT","imdb":".imdb-info a[href*=\\"imdb.com/title\\"]","titleDom":"#torrentnameid","poster":".imdb_cover img","insertDomSelector":".torrent-info .torrent-info-details","doubanContainerDom":"<div class=\\"douban-dom\\"></div>"}}`);
  const host = location.host;
  let siteInfo = (_a = PT_SITE == null ? void 0 : PT_SITE[host]) != null ? _a : "";
  if (host && host.match(/iptorrents/i)) {
    siteInfo = PT_SITE["iptorrents.com"];
  } else {
    siteInfo = (_b = PT_SITE == null ? void 0 : PT_SITE[host]) != null ? _b : "";
  }
  const CURRENT_SITE_INFO = siteInfo;
  const CURRENT_SITE_NAME = (_c = CURRENT_SITE_INFO == null ? void 0 : CURRENT_SITE_INFO.siteName) != null ? _c : "";
  const DOUBAN_SUBJECT_URL = "https://movie.douban.com/subject/{doubanId}";
  const DOUBAN_SEARCH_API = "https://movie.douban.com/j/subject_suggest?q={query}";
  const DOUBAN_SUGGEST_API = "https://www.douban.com/search?cat=1002&q={query}";
  const DOUBAN_API_URL = "https://api.douban.com/v2/movie";
  const DOUBAN_SUGGEST_API_URL = "https://movie.douban.com/j/subject_suggest";
  const isChinese = (title) => {
    return /[\u4e00-\u9fa5]+/.test(title);
  };
  const addToPtpPage = (data) => {
    console.log(data);
    $(".page__title").prepend(`<a target='_blank' href="${data.link}">[${data.chineseTitle}] </a>`);
    if (data.summary) {
      const synopsisDom = `
    <div class="panel" id="douban-synopsis">
    <div class="panel__heading"><span class="panel__heading__title">中文简介</span></div>
    <div class="panel__body">
          <div id="synopsis">${data.summary}</div>
    </div>
    </div>`;
      $("#synopsis-and-trailer,#request-table").after(synopsisDom);
    }
    $("#movieinfo").before(`
    <div class="panel">
    <div class="panel__heading"><span class="panel__heading__title">电影信息</span></div>
    <div class="panel__body">
    <div><strong>导演:</strong> ${data.director}</div>
    <div><strong>类型:</strong> ${data.genre}</div>
    <div><strong>制片国家/地区:</strong> ${data.region}</div>
    <div><strong>语言:</strong> ${data.language}</div>
    <div><strong>时长:</strong> ${data.runtime}</div>
    <div><strong>又名:</strong>  ${data.aka}</div
    </div>`);
    if (data.average) {
      $("#movie-ratings-table tr").prepend(
        `<td colspan="1" style="width: 152px;">
    <center>
    <a target="_blank" class="rating" href="${data.link}" rel="noreferrer">
    <div style="font-size: 0;min-width: 105px;">
        <span class="icon-pt1">豆</span>
        <span class="icon-pt2">豆瓣评分</span>
    </div>
    </a>
    </center>
    </td>
    <td style="width: 153px;">
    <span class="rating">${data.average}</span>
    <span class="mid">/</span>
    <span class="outof"> 10</span>
    <br>(${data.votes} votes)</td>`
      );
    }
    $(".main-column").prepend($("#movie-ratings-table").parent());
  };
  const addToANTPage = (data) => {
    console.log(data);
    $(".header h2").prepend(`<a target='_blank' href="${data.link}">[${data.chineseTitle}] </a>`);
    if (data.summary) {
      const synopsisDom = `
    <div class="box torrent_description">
      <div class="head"><a href="#">↑</a>&nbsp;<strong>中文简介</strong></div>
      <div class="body" style="text-align:justify">${data.summary}</div>
    </div>`;
      $(".torrent_description,.box_request_desc").after(synopsisDom);
    }
    $(".box_details:first").before(`
    <div class="box box_details">
      <div class="head"><strong></strong>电影信息</div>
      <div class="pad">
        <ul class="stats nobullet">
          <li><strong>导演:</strong> ${data.director}</li>
          <li><strong>类型:</strong> ${data.genre}</li>
          <li><strong>制片国家/地区:</strong> ${data.region}</li>
          <li><strong>语言:</strong> ${data.language}</li>
          <li><strong>时长:</strong> ${data.runtime}</li>
          <li><strong>又名:</strong>  ${data.aka}</li
      </ul>
      </div>    
    </div>`);
    if (data.average) {
      $(".box.torrent_ratings .body tr").prepend(
        `<td colspan="1">
      <center>
        <a target="_blank" class="rating ant" href="${data.link}" rel="noreferrer">
          <div style="font-size: 0;">
            <span class="icon-pt1">豆</span>
          </div>
        </a>
      </center>
    </td>
    <td>
      <span class="rating">${data.average}</span>
      <span class="mid">/</span>
      <span class="outof"> 10</span>
      <br>(${data.votes} votes)</td>`
      );
    }
    $(".main_column").prepend($(".box.torrent_ratings"));
  };
  const getImdbId = () => {
    var _a2, _b2;
    let imdbLink = "";
    const imdbConfig = CURRENT_SITE_INFO.imdb;
    if (typeof imdbConfig === "object") {
      try {
        Object.keys(imdbConfig).forEach((key) => {
          if ($(`${imdbConfig[key]}`)[0]) {
            imdbLink = $(imdbConfig[key]).attr("href");
            throw new Error("end loop");
          }
        });
      } catch (error) {
        if (error.message !== "end loop") {
          console.log(error);
        }
      }
    } else {
      imdbLink = $(imdbConfig).attr("href");
    }
    console.log(imdbLink);
    return (_b2 = (_a2 = /tt\d+/.exec(imdbLink)) == null ? void 0 : _a2[0]) != null ? _b2 : "";
  };
  const getDoubanId = async (imdbId) => {
    try {
      const url = DOUBAN_SEARCH_API.replace("{query}", imdbId);
      const res = await fetch(url, {
        responseType: "json"
      });
      if (res && res.length > 0 && res[0].id) {
        const { id, title, episode } = res[0];
        return {
          id,
          season: episode,
          title
        };
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getDoubanIdByIMDB = async (imdbId) => {
    var _a2, _b2, _c2, _d;
    try {
      const url = DOUBAN_SUGGEST_API.replace("{query}", imdbId);
      const options = {
        cookie: "",
        anonymous: false,
        responseType: void 0
      };
      const data = await fetch(url, options);
      const doc = new DOMParser().parseFromString(data, "text/html");
      const linkDom = doc.querySelector(".result-list .result h3 a");
      if (!linkDom) {
        throw new Error("豆瓣ID获取失败");
      } else {
        const { href, textContent } = linkDom;
        const season = (_b2 = (_a2 = textContent == null ? void 0 : textContent.match(/第(.+?)季/)) == null ? void 0 : _a2[1]) != null ? _b2 : "";
        const doubanId = (_d = (_c2 = decodeURIComponent(href).match(/subject\/(\d+)/)) == null ? void 0 : _c2[1]) != null ? _d : "";
        return {
          id: doubanId,
          season,
          title: textContent || ""
        };
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
  const fetchDoubanApi = (path) => {
    return fetch(`${DOUBAN_API_URL}${path}`, {
      data: encodeURI("apikey=0ab215a8b1977939201640fa14c66bab"),
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
  };
  const getLargePoster = (url = "") => {
    return url.replace(/s(_ratio_poster|pic)/g, "l$1").replace(/img\d/, "img9");
  };
  const formatAverage = (average) => {
    return parseFloat(average) ? average : "";
  };
  const numberToChinese = (num) => {
    const digits = ["〇", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
    const value = parseInt(num, 10);
    if (!value || value < 1) {
      return "";
    }
    if (value < 10) {
      return digits[value];
    }
    if (value === 10) {
      return "十";
    }
    if (value < 20) {
      return `十${digits[value - 10]}`;
    }
    const tens = digits[Math.floor(value / 10)];
    const ones = value % 10 ? digits[value % 10] : "";
    return `${tens}十${ones}`;
  };
  const matchSeasonSubject = (subjects, chineseTitle, seasonNumber, strict = true) => {
    const cnSeason = numberToChinese(seasonNumber);
    const seasonMarkers = [
      `第${seasonNumber}季`,
      cnSeason ? `第${cnSeason}季` : "",
      `season ${seasonNumber}`
    ].filter(Boolean);
    const nameHit = (subject) => {
      const title = subject.title || "";
      const originalTitle = subject.original_title || "";
      return title.includes(chineseTitle) || originalTitle.includes(chineseTitle);
    };
    const seasonHit = (subject) => {
      const title = (subject.title || "").toLowerCase();
      return seasonMarkers.some((marker) => title.includes(marker.toLowerCase()));
    };
    const bothMatched = subjects.find((subject) => nameHit(subject) && seasonHit(subject));
    if (bothMatched || strict) {
      return bothMatched;
    }
    return subjects.find((subject) => nameHit(subject));
  };
  const getTvSeasonData = async (data) => {
    var _a2, _b2;
    const torrentTitle = getTorrentTitle();
    const { episodes = "", chineseTitle } = data;
    if (episodes) {
      const seasonNumber = (_b2 = (_a2 = torrentTitle.match(/S(?!eason)\s*?0?(\d+)\.?(EP?\d+)?/i)) == null ? void 0 : _a2[1]) != null ? _b2 : 1;
      if (parseInt(seasonNumber) === 1) {
        return data;
      } else {
        const query = `${chineseTitle} 第${seasonNumber}季`;
        let subjects = [];
        try {
          const searchData = await fetchDoubanApi(`/search?q=${query}`);
          if (searchData.count > 0) {
            subjects = searchData.subjects;
          }
        } catch (error) {
          console.log(error);
        }
        let subject = matchSeasonSubject(subjects, chineseTitle, seasonNumber);
        if (!subject) {
          try {
            const suggestData = await fetch(`${DOUBAN_SUGGEST_API_URL}?q=${encodeURIComponent(query)}`, {
              responseType: "json"
            });
            if (Array.isArray(suggestData) && suggestData.length > 0) {
              subject = matchSeasonSubject(suggestData, chineseTitle, seasonNumber);
            }
          } catch (error) {
            console.log(error);
          }
        }
        if (!subject) {
          subject = matchSeasonSubject(subjects, chineseTitle, seasonNumber, false);
        }
        if (subject) {
          return { id: subject.id };
        }
        if (subjects.length > 0) {
          return { id: subjects[0].id };
        }
      }
    }
  };
  const getDoubanInfo = async (doubanId, imdbId) => {
    try {
      const url = DOUBAN_SUBJECT_URL.replace("{doubanId}", doubanId);
      const data = await fetch(url, {
        responseType: "text"
      });
      if (data) {
        const doubanInfo = await formatDoubanInfo(data);
        const savedIds = GM_getValue("ids_v2") || {};
        savedIds[imdbId] = __spreadValues({
          doubanId,
          updateTime: Date.now()
        }, doubanInfo);
        GM_setValue("ids_v2", savedIds);
        return doubanInfo;
      } else {
        console.log("豆瓣数据获取失败");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getSubjectTitle = async (doubanId) => {
    try {
      const { title = "" } = await fetchDoubanApi(`/subject/${doubanId}`);
      return isChinese(title) ? title.replace(/\s*第.+?季$/, "") : "";
    } catch (error) {
      console.log(error);
      return "";
    }
  };
  const getDoubanInfoByIMDB = async (imdbId) => {
    var _a2, _b2, _c2, _d, _e, _f, _g, _h, _i, _j, _k;
    try {
      const doubanData = await fetchDoubanApi(`/imdb/${imdbId}`);
      const { title = "", attrs = {}, image = "", summary = "", rating = {}, alt_title: altTitle, mobile_link: mobileLink } = doubanData;
      if (!mobileLink) {
        throw new Error("豆瓣API未返回条目");
      }
      const subjectLink = mobileLink.replace("m.douban.com/movie", "movie.douban.com").replace(/\/$/, "");
      const doubanId = (_b2 = (_a2 = subjectLink.match(/subject\/(\d+)/)) == null ? void 0 : _a2[1]) != null ? _b2 : "";
      let chineseTitle = title;
      if (!isChinese(title) && !title.match(/^\d+$/)) {
        chineseTitle = altTitle ? altTitle.split("/")[0].trim() : await getSubjectTitle(doubanId) || title;
      }
      const doubanInfo = {
        director: (_c2 = attrs.director) == null ? void 0 : _c2.join(" / "),
        runtime: (_d = attrs.movie_duration) == null ? void 0 : _d.join(" / "),
        language: (_e = attrs.language) == null ? void 0 : _e.join(" / "),
        genre: (_g = (_f = attrs.movie_type) == null ? void 0 : _f.join(" / ")) != null ? _g : "",
        aka: altTitle || "",
        region: (_h = attrs.country) == null ? void 0 : _h.join(" / "),
        link: subjectLink,
        poster: getLargePoster(image),
        summary,
        chineseTitle,
        votes: (_i = rating.numRaters) != null ? _i : 0,
        average: formatAverage(rating.average),
        id: doubanId,
        episodes: (_k = (_j = attrs.episodes) == null ? void 0 : _j.join(" / ")) != null ? _k : ""
      };
      if (!attrs.episodes) {
        const savedIds = GM_getValue("ids_v2") || {};
        savedIds[imdbId] = __spreadValues({
          doubanId,
          updateTime: Date.now()
        }, doubanInfo);
        GM_setValue("ids_v2", savedIds);
      }
      return doubanInfo;
    } catch (error) {
      console.log(error);
    }
  };
  const getDoubanInfoBySubject = async (doubanId) => {
    try {
      const doubanData = await fetchDoubanApi(`/subject/${doubanId}`);
      if (!(doubanData == null ? void 0 : doubanData.id)) {
        throw new Error("豆瓣API未返回条目");
      }
      const {
        title = "",
        aka = [],
        images = {},
        summary = "",
        rating = {},
        ratings_count: votes,
        genres = [],
        countries = [],
        directors = []
      } = doubanData;
      return {
        director: directors.map((item) => item.name).join(" / "),
        runtime: "",
        language: "",
        genre: genres.join(" / "),
        aka: aka.join(" / "),
        region: countries.join(" / "),
        link: `https://movie.douban.com/subject/${doubanData.id}`,
        poster: getLargePoster(images.large),
        summary,
        chineseTitle: title,
        votes: votes != null ? votes : 0,
        average: formatAverage(rating.average),
        id: doubanData.id
      };
    } catch (error) {
      console.log(error);
    }
  };
  const getDoubanInfoFallback = async (imdbId) => {
    let subject = await getDoubanId(imdbId);
    if (!(subject == null ? void 0 : subject.id)) {
      subject = await getDoubanIdByIMDB(imdbId).catch((error) => console.log(error));
    }
    if (!(subject == null ? void 0 : subject.id)) {
      return;
    }
    const doubanInfo = await getDoubanInfo(subject.id, imdbId);
    return doubanInfo && __spreadProps(__spreadValues({}, doubanInfo), { id: subject.id });
  };
  const formatDoubanInfo = async (domString) => {
    var _a2, _b2;
    const dom = new DOMParser().parseFromString(domString, "text/html");
    const chineseTitle = $("title", dom).text().replace("(豆瓣)", "").trim();
    const ldJson = $('head > script[type="application/ld+json"]', dom).html();
    if (!ldJson) {
      throw new Error("豆瓣条目页面解析失败，可能触发了豆瓣安全验证");
    }
    const jsonData = JSON.parse(ldJson.replace(/(\r\n|\n|\r|\t)/gm, ""));
    const fetchAnchor = function(anchor) {
      var _a3, _b3, _c2, _d;
      return (_d = (_c2 = (_b3 = (_a3 = anchor == null ? void 0 : anchor[0]) == null ? void 0 : _a3.nextSibling) == null ? void 0 : _b3.nodeValue) == null ? void 0 : _c2.trim()) != null ? _d : "";
    };
    const rating = jsonData.aggregateRating ? jsonData.aggregateRating.ratingValue : 0;
    const votes = jsonData.aggregateRating ? jsonData.aggregateRating.ratingCount : 0;
    const director = jsonData.director ? jsonData.director : [];
    const poster = getLargePoster(jsonData.image);
    const link = `https://movie.douban.com${jsonData.url}`;
    const introductionDom = $('#link-report > span.all.hidden,#link-report-intra > [property="v:summary"], #link-report > [property="v:summary"]', dom);
    const summary = (introductionDom.length > 0 ? introductionDom.text() : "暂无相关剧情介绍").split("\n").map((a) => a.trim()).filter((a) => a.length > 0).join("\n");
    const genre = $('#info span[property="v:genre"]', dom).map(function() {
      return $(this).text().trim();
    }).toArray();
    const language = fetchAnchor($('#info span.pl:contains("语言")', dom));
    const region = fetchAnchor($('#info span.pl:contains("制片国家/地区")', dom));
    const runtimeAnchor = $('#info span.pl:contains("单集片长")', dom);
    const runtime = runtimeAnchor[0] ? fetchAnchor(runtimeAnchor) : $('#info span[property="v:runtime"]', dom).text().trim();
    const akaAnchor = $('#info span.pl:contains("又名")', dom);
    let aka = [];
    if (akaAnchor.length > 0) {
      aka = fetchAnchor(akaAnchor).split(" / ").sort(function(a, b) {
        return a.localeCompare(b);
      }).join("/");
      aka = aka.split("/");
    }
    return {
      director: director.map((item) => item.name),
      runtime,
      language,
      genre: (_a2 = genre == null ? void 0 : genre.join(" / ")) != null ? _a2 : "",
      aka: (_b2 = aka == null ? void 0 : aka.join(" / ")) != null ? _b2 : "",
      region,
      link,
      poster,
      summary,
      chineseTitle,
      votes,
      average: rating
    };
  };
  const getTorrentTitle = () => {
    let { titleDom } = CURRENT_SITE_INFO;
    if (!titleDom) {
      if (CURRENT_SITE_NAME === "BHD") {
        titleDom = $(".dotborder").find("td:contains(Name)").next("td");
      } else if (CURRENT_SITE_NAME.match(/ACM|BLU/)) {
        const keyMap = {
          Name: "Name",
          名称: "Name",
          名稱: "Name"
        };
        $("#vue+.panel table tr").each((index, element) => {
          const key = $(element).find("td:first").text().replace(/\s|\n/g, "");
          if (keyMap[key]) {
            titleDom = $(element).find("td:last");
          }
        });
      } else if (CURRENT_SITE_NAME === "HDT") {
        return document.title.replace(/HD-Torrents.org\s*-/ig, "").trim();
      }
    }
    return $(titleDom).text();
  };
  const createDoubanDom = async (doubanId, imdbId, doubanInfo) => {
    const div = document.createElement("div");
    let { doubanContainerDom, insertDomSelector, siteName, poster } = CURRENT_SITE_INFO;
    if (siteName.match(/(HDT)$/)) {
      insertDomSelector = $(insertDomSelector).parent();
    }
    $(insertDomSelector).before(doubanContainerDom);
    const doubanLink = `https://movie.douban.com/subject/${doubanId}`;
    let htmlData = await fetch(`${doubanLink}/output_card`, {
      responseType: "text"
    });
    htmlData = htmlData.replace(/wrapper/g, "douban-wrapper").replace(/<script.+?script>/g, "");
    htmlData = htmlData.replace(/(html,)body,/, "$1");
    let headDom = htmlData.match(/<head>((.|\n)+)<\/head>/)[1];
    headDom = headDom.replace(/<link.+?>/g, "");
    const bodyDom = htmlData.match(/<body>((.|\n)+)<\/body>/)[1];
    div.insertAdjacentHTML("beforeend", headDom);
    div.insertAdjacentHTML("beforeend", bodyDom);
    $(".douban-dom").append(div).attr("douban-link", doubanLink);
    $(".douban-dom .grid-col4").after(`
  <div class="fix-col grid-col3">
  <div class="line-wrap">
  </div>
  </div>
  <div class="fix-col grid-col5"></div>`);
    const doubanData = doubanInfo || await getDoubanInfo(doubanId, imdbId);
    $(".douban-dom .grid-col5").html(`<div class="summary">${(doubanData == null ? void 0 : doubanData.summary) || "暂无简介"}</div>`);
    let posterStyle = $(".picture-douban-wrapper").attr("style");
    const posterImg = $(poster).attr("src") ? $(poster).attr("src") : doubanData == null ? void 0 : doubanData.poster;
    posterStyle = posterStyle == null ? void 0 : posterStyle.replace(/\(.+\)/, `(${posterImg})`);
    $(".picture-douban-wrapper").attr("style", posterStyle);
    $(".douban-dom").click(() => {
      GM_openInTab(doubanLink);
    });
  };
  const addTitleLine = (doubanData, doubanLink) => {
    const { addTitleLineAfter, addTitleLineHtml } = CURRENT_SITE_INFO;
    const chineseTitle = doubanData.chineseTitle;
    if (!addTitleLineAfter || !addTitleLineHtml || !chineseTitle) {
      return false;
    }
    const anchor = document.querySelector(addTitleLineAfter);
    if (!anchor) {
      return false;
    }
    const host2 = (anchor.closest("h2") || anchor).parentNode;
    if (!host2 || !host2.parentNode || document.querySelector(".douban-title-line")) {
      return true;
    }
    const rawTitle = (document.title.split(" :: ")[0] || "").trim();
    const titleYear = rawTitle.match(/\((\d{4})\)\s*$/);
    const nativeTitle = rawTitle.replace(/\s*\(\d{4}\)\s*$/, "");
    const airedRow = Array.prototype.find.call(
      document.querySelectorAll("tr"),
      (row) => /First Aired/i.test(row.textContent)
    );
    const airedYear = airedRow && airedRow.textContent.match(/\b(?:19|20)\d{2}\b/);
    const year = airedYear && airedYear[0] || titleYear && titleYear[1] || "";
    const titleHtml = addTitleLineHtml.replace(/\{link\}/g, doubanLink).replace(/\{title\}/g, chineseTitle).replace(/\{nativeTitle\}/g, year ? `${nativeTitle} (${year})` : nativeTitle).replace(/\s+<\/a>/, "</a>");
    const wrapper = document.createElement("div");
    wrapper.innerHTML = titleHtml;
    host2.parentNode.insertBefore(wrapper.firstChild, host2.nextSibling);
    return true;
  };
  const addDoubanSummaryTab = (doubanData) => {
    const { addSummaryTab, addSummaryTabIcon } = CURRENT_SITE_INFO;
    const summary = doubanData.summary && doubanData.summary !== "暂无相关剧情介绍" && isChinese(doubanData.summary) ? doubanData.summary : "";
    if (!addSummaryTab || !summary) {
      return false;
    }
    const tabs = document.querySelector(addSummaryTab);
    if (!tabs) {
      return false;
    }
    const panelId = "douban-summary-panel";
    if (document.getElementById(panelId)) {
      return true;
    }
    const nav = tabs.querySelector("ul.ui-tabs-nav");
    if (!nav) {
      return false;
    }
    const li = document.createElement("li");
    li.className = "ui-state-default ui-corner-left";
    li.innerHTML = `<a href="#${panelId}" target="_self" title="豆瓣简介"><img src="${addSummaryTabIcon}" width="17" height="17" alt="Douban"></a>`;
    nav.insertBefore(li, nav.firstChild);
    const panel = document.createElement("div");
    panel.id = panelId;
    panel.className = "ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide";
    const text = document.createElement("div");
    text.className = "douban-summary-tab-text";
    text.textContent = summary;
    panel.appendChild(text);
    tabs.appendChild(panel);
    const nativeLis = Array.prototype.filter.call(nav.children, (item) => item !== li);
    const nativePanels = Array.prototype.filter.call(tabs.querySelectorAll(".ui-tabs-panel"), (item) => item !== panel);
    nativeLis.forEach((item) => item.classList.remove("ui-tabs-selected", "ui-state-active"));
    nativePanels.forEach((item) => item.classList.add("ui-tabs-hide"));
    li.classList.add("ui-tabs-selected", "ui-state-active");
    panel.classList.remove("ui-tabs-hide");
    const anchor = li.querySelector("a");
    anchor.addEventListener("click", (event) => {
      event.preventDefault();
      nativeLis.forEach((item) => item.classList.remove("ui-tabs-selected", "ui-state-active"));
      nativePanels.forEach((item) => item.classList.add("ui-tabs-hide"));
      li.classList.add("ui-tabs-selected", "ui-state-active");
      panel.classList.remove("ui-tabs-hide");
    });
    nativeLis.forEach((item) => {
      const nativeAnchor = item.querySelector("a");
      if (nativeAnchor) {
        nativeAnchor.addEventListener("click", () => {
          setTimeout(() => {
            li.classList.remove("ui-tabs-selected", "ui-state-active");
            panel.classList.add("ui-tabs-hide");
          }, 0);
        });
      }
    });
    return true;
  };
  const replaceNativeInfo = (doubanData, doubanLink) => {
    var _a2;
    const {
      addTitleAfter,
      addTitleBefore,
      addTitleInside,
      addTitleHtml,
      addTitleYearFrom,
      replaceOverview,
      replaceOverviewLabel,
      replaceRating,
      replaceRatingHtml,
      replaceRatingPosition,
      renameRatingLabel,
      starFullHtml,
      starEmptyHtml,
      ratingSourceLabel,
      ratingRewriteHtml,
      removeRatingVotes,
      groupRating,
      addLinkButtonAfter,
      addLinkButtonHtml,
      addTitleLineAfter,
      addSummaryTab
    } = CURRENT_SITE_INFO;
    if (!doubanData || !(addTitleAfter || addTitleBefore || addTitleInside || addTitleLineAfter || addSummaryTab || replaceOverview || replaceOverviewLabel)) {
      return false;
    }
    if (document.documentElement.dataset.doubanInserted) {
      return true;
    }
    const score = doubanData.average;
    const votes = (_a2 = doubanData.votes) != null ? _a2 : 0;
    const votesComma = String(votes).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const chineseTitle = doubanData.chineseTitle;
    const summary = doubanData.summary && doubanData.summary !== "暂无相关剧情介绍" && isChinese(doubanData.summary) ? doubanData.summary : "";
    let replaced = false;
    if (addTitleLine(doubanData, doubanLink)) {
      replaced = true;
    }
    if (addTitleHtml && chineseTitle) {
      const yearSource = addTitleYearFrom ? $(addTitleYearFrom).first().text() : "";
      const yearMatched = yearSource.match(/\b(?:19|20)\d{2}\b/);
      const titleHtml = addTitleHtml.replace(/\{link\}/g, doubanLink).replace(/\{title\}/g, chineseTitle).replace(/\{year\}/g, yearMatched ? ` (${yearMatched[0]})` : "");
      if (addTitleInside) {
        const host2 = $(addTitleInside).first()[0];
        if (host2) {
          const link = $(titleHtml)[0];
          const lastText = host2.lastChild && host2.lastChild.nodeType === 3 ? host2.lastChild : Array.prototype.find.call(
            host2.childNodes,
            (node) => node.nodeType === 3 && node.textContent.trim()
          );
          const yearMatched2 = lastText && lastText.nodeType === 3 && lastText.textContent.match(/^([\s\S]*?)(\s*\(\d{4}\)\s*)$/);
          const titleParent = lastText && lastText.nodeType === 3 ? lastText.parentNode : null;
          if (titleParent) {
            if (yearMatched2) {
              lastText.textContent = `${yearMatched2[1].replace(/\s+$/, "")} `;
              titleParent.insertBefore(link, lastText.nextSibling);
              titleParent.insertBefore(document.createTextNode(` ${yearMatched2[2].trim()}`), link.nextSibling);
            } else {
              let after = lastText;
              if (!/\s$/.test(lastText.textContent)) {
                const space = document.createTextNode(" ");
                titleParent.insertBefore(space, lastText.nextSibling);
                after = space;
              }
              titleParent.insertBefore(link, after.nextSibling);
            }
          } else {
            host2.appendChild(link);
          }
          replaced = true;
        }
      } else {
        const $titleAnchor = $(addTitleAfter || addTitleBefore).first();
        if ($titleAnchor.length) {
          if (addTitleAfter) {
            $titleAnchor.after(titleHtml);
          } else {
            $titleAnchor.before(titleHtml);
          }
          replaced = true;
        }
      }
    }
    if (replaceOverview && summary) {
      const $overview = $(replaceOverview).first();
      if ($overview.length) {
        const original = $overview.text().trim();
        $overview.text(summary).attr("title", original);
        replaced = true;
      }
    }
    if (replaceOverviewLabel && summary) {
      const label = Array.prototype.find.call(
        document.querySelectorAll("font,strong,b,span,td"),
        (element) => element.children.length === 0 && element.textContent.trim() === replaceOverviewLabel
      );
      if (label) {
        let node = label.nextSibling;
        while (node && !(node.nodeType === 3 && node.textContent.trim())) {
          node = node.nextSibling;
        }
        if (!node && label.parentNode && label.parentNode !== document.body) {
          node = label.parentNode.nextSibling;
          while (node && !(node.nodeType === 3 && node.textContent.trim())) {
            node = node.nextSibling;
          }
        }
        if (node) {
          node.textContent = ` ${summary} `;
          replaced = true;
        }
      }
    }
    if (replaceRating && score && replaceRatingHtml) {
      let $rating = $(replaceRating).first();
      if ($rating.length) {
        if (ratingRewriteHtml) {
          const ratingNode = $rating[0];
          let siteScore = ratingNode.getAttribute("alt") || "";
          const ratingTrailing = ratingNode.nextSibling;
          if (!siteScore && ratingTrailing && ratingTrailing.nodeType === 3) {
            siteScore = ratingTrailing.textContent.trim();
          }
          siteScore = siteScore.replace(/\/\s*10\s*$/, "").trim();
          let siteVotes = "";
          if (removeRatingVotes) {
            const $votesLabel = $(removeRatingVotes).first();
            const votesLabel = $votesLabel[0];
            const votesText = votesLabel && votesLabel.nextSibling;
            if (votesText && votesText.nodeType === 3 && /\d/.test(votesText.textContent)) {
              const votesParent = votesLabel.parentNode;
              const afterLabel = votesText.nextSibling;
              siteVotes = votesText.textContent.trim().replace(/,/g, "");
              votesParent.removeChild(votesText);
              votesParent.removeChild(votesLabel);
              if (afterLabel && afterLabel.nodeType === 1 && afterLabel.nodeName === "BR") {
                votesParent.removeChild(afterLabel);
              }
            }
          }
          const siteVotesComma = siteVotes ? Number(siteVotes).toLocaleString("en-US") : "";
          const $rewritten = $(ratingRewriteHtml.replace(/\{siteScore\}/g, siteScore).replace(/\{siteVotes\}/g, siteVotes).replace(/\{siteVotesComma\}/g, siteVotesComma));
          $rewritten.insertBefore($rating);
          $rating.remove();
          if (ratingTrailing && ratingTrailing.nodeType === 3 && ratingTrailing.parentNode) {
            ratingTrailing.parentNode.removeChild(ratingTrailing);
          }
          $rating = $rewritten;
        }
        if (renameRatingLabel) {
          const $label = $rating.find("th, td").filter((index, element) => /^\s*Rating\b/i.test(element.textContent)).first();
          if ($label.length) {
            const $bold = $label.find("b, strong").first();
            if ($bold.length) {
              $bold.text(renameRatingLabel);
            } else {
              $label.text(renameRatingLabel);
            }
          }
        }
        if (ratingSourceLabel) {
          const $icon = $rating.find("img").first();
          if ($icon.length) {
            $icon.after(` ${ratingSourceLabel}`);
          }
        }
        const scorePercent = /^\d+(?:\.\d+)?$/.test(String(score)) ? `${Math.round(parseFloat(score) * 10)}%` : "0%";
        const scoreWidth = /^\d+(?:\.\d+)?$/.test(String(score)) ? `${Math.round(parseFloat(score) * 20)}px` : "0px";
        let ratingHtml = replaceRatingHtml.replace(/\{link\}/g, doubanLink).replace(/\{score\}/g, score).replace(/\{scorePercent\}/g, scorePercent).replace(/\{scoreWidth\}/g, scoreWidth).replace(/\{votesComma\}/g, votesComma);
        if (starFullHtml && starEmptyHtml) {
          const fullStars = Math.max(0, Math.min(10, Math.round(parseFloat(score))));
          let stars = "";
          for (let star = 0; star < 10; star++) {
            stars += star < fullStars ? starFullHtml : starEmptyHtml;
          }
          ratingHtml = ratingHtml.replace(/\{stars\}/g, stars);
        }
        ratingHtml = ratingHtml.replace(/\{votes\}/g, votes);
        const $ratingFirst = $rating.first();
        const $ratingLast = $rating.last();
        if (groupRating) {
          const $group = $('<div class="douban-rating-group"></div>');
          $group.insertBefore($ratingFirst);
          $group.append($rating).append(ratingHtml);
        } else if (replaceRatingPosition === "before") {
          $ratingFirst.before(ratingHtml);
        } else {
          $ratingLast.after(ratingHtml);
        }
        replaced = true;
      }
    }
    if (addDoubanSummaryTab(doubanData)) {
      replaced = true;
    }
    if (addLinkButtonAfter && addLinkButtonHtml) {
      const $button = $(addLinkButtonAfter).first();
      if ($button.length) {
        $button.after(addLinkButtonHtml.replace(/\{link\}/g, doubanLink));
        replaced = true;
      }
    }
    if (replaced) {
      document.documentElement.dataset.doubanInserted = "1";
    }
    return replaced;
  };
  const addDarkLinkButton = () => {
    const { addDarkLinkButtonAfter, addDarkLinkButtonHtml } = CURRENT_SITE_INFO;
    if (!addDarkLinkButtonAfter || !addDarkLinkButtonHtml) {
      return;
    }
    const $button = $(addDarkLinkButtonAfter).first();
    if ($button.length) {
      $button.after(addDarkLinkButtonHtml);
    }
  };
  const renderDoubanInfo = async (doubanInfo, doubanId, imdbId) => {
    const nativeReplaceFields = [
      "addTitleAfter",
      "addTitleBefore",
      "addTitleInside",
      "addTitleLineAfter",
      "addSummaryTab",
      "replaceOverview",
      "replaceOverviewLabel"
    ];
    if (nativeReplaceFields.some((field) => CURRENT_SITE_INFO[field])) {
      const doubanData = doubanInfo || await getDoubanInfo(doubanId, imdbId);
      if (doubanData) {
        replaceNativeInfo(doubanData, `https://movie.douban.com/subject/${doubanId}`);
      }
    } else {
      await createDoubanDom(doubanId, imdbId, doubanInfo);
    }
  };
  function fetch(url, options = {}) {
    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest(__spreadProps(__spreadValues({
        method: "GET",
        url,
        responseType: "json"
      }, options), {
        onload: (res) => {
          const { statusText, status, response } = res;
          if (status !== 200) {
            reject(new Error(statusText || status));
          } else {
            resolve(response);
          }
        },
        ontimeout: () => {
          reject(new Error("timeout"));
        },
        onerror: (error) => {
          reject(error);
        }
      }));
    });
  }
  const CACHE_EXPIRE_TIME = 30 * 24 * 60 * 60 * 1e3;
  const getCachedInfo = (imdbId) => {
    const cached = (GM_getValue("ids_v2") || {})[imdbId];
    if (cached && isChinese(cached.chineseTitle) && !(cached.updateTime && Date.now() - cached.updateTime >= CACHE_EXPIRE_TIME)) {
      return cached;
    }
  };
  const loadDoubanData = async (imdbId) => {
    const doubanData = getCachedInfo(imdbId) || await getDoubanInfoByIMDB(imdbId) || await getDoubanInfoFallback(imdbId);
    if (!doubanData) {
      throw new Error("没有找到豆瓣条目");
    }
    return doubanData;
  };
  const resolveSeason = async (doubanData, imdbId) => {
    var _a2;
    const doubanId = doubanData.doubanId || doubanData.id;
    if (doubanData.episodes) {
      const seasonId = (_a2 = await getTvSeasonData(doubanData)) == null ? void 0 : _a2.id;
      if (seasonId && seasonId !== doubanId) {
        const seasonData = await getDoubanInfoBySubject(seasonId) || await getDoubanInfo(seasonId, imdbId);
        if (seasonData) {
          return { doubanId: seasonId, doubanData: seasonData };
        }
      }
    }
    return { doubanId, doubanData };
  };
  const waitForImdbId = async (timeout = 15e3) => {
    const deadline = Date.now() + timeout;
    let imdbId = getImdbId();
    while (!imdbId && Date.now() < deadline) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      imdbId = getImdbId();
    }
    return imdbId;
  };
  (async () => {
    const imdbId = CURRENT_SITE_INFO ? await waitForImdbId() : "";
    if (!imdbId) {
      return;
    }
    try {
      const doubanData = await loadDoubanData(imdbId);
      if (CURRENT_SITE_NAME.match(/PTP/)) {
        addToPtpPage(doubanData);
      } else if (CURRENT_SITE_NAME.match(/ANT/)) {
        addToANTPage(doubanData);
      } else {
        const season = await resolveSeason(doubanData, imdbId);
        renderDoubanInfo(season.doubanData, season.doubanId, imdbId);
      }
    } catch (error) {
      console.log(error);
      addDarkLinkButton();
    }
  })();

})(jQuery);