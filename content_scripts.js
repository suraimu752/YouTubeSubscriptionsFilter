scrollHeight = 0;
let subscFilter = null;
margin = 75;
if($(window).width() < 792){
    margin = 5;
}
else if($(window).width() < 1313){
    margin = 75;
}
else{
    margin = 245;
}

function hideLive(){
    $("ytd-grid-video-renderer").each(function(i, o){
        if(!($(o).find("#video-badges").attr("hidden"))){
            $(o).attr("hidden", "true");
        }
    });
}
function showLive(){
    $("ytd-grid-video-renderer").each(function(i, o){
        if(!($(o).find("#video-badges").attr("hidden"))){
            $(o).removeAttr("hidden");
        }
    });
}

function hideScheduled(){
    $("ytd-grid-video-renderer").each(function(i, o){
        if($(o).find("ytd-toggle-button-renderer").length){
            $(o).attr("hidden", "true");
        }
    });
}
function showScheduled(){
    $("ytd-grid-video-renderer").each(function(i, o){
        if($(o).find("ytd-toggle-button-renderer").length){
            $(o).removeAttr("hidden");
        }
    });
}

function hideArchives(){
    $("ytd-grid-video-renderer").each(function(i, o){
        if($(o).find("#video-badges").attr("hidden")){
            if(!($(o).find("ytd-toggle-button-renderer").length)){
                $(o).attr("hidden", "true");
            }
        }
    });
}
function showArchives(){
    $("ytd-grid-video-renderer").each(function(i, o){
        if($(o).find("#video-badges").attr("hidden")){
            if(!($(o).find("ytd-toggle-button-renderer").length)){
                $(o).removeAttr("hidden");
            }
        }
    });
}

function change(){
    let live = document.getElementById("cbLive").checked;
    let sche = document.getElementById("cbSche").checked;
    let arch = document.getElementById("cbArch").checked;

    if(live) showLive();
    else hideLive();
    if(sche) showScheduled();
    else hideScheduled();
    if(arch) showArchives();
    else hideArchives();

    scrollHeight = document.documentElement.scrollHeight;
    window.scrollBy(0,1);
    window.scrollBy(0,-1);
}

function subscLoaded(){
    let insTxt = '<div id="subscFilter" style="color: var(--yt-spec-text-primary); font-size: 1.6rem; margin-left: ' + margin + 'px;">'
        + 'フィルタ: '
        + 'ライブ<input id="cbLive" type="checkbox" checked> '
        + '予定<input id="cbSche" type="checkbox" checked> '
        + '動画<input id="cbArch" type="checkbox" checked> ';
    $("ytd-masthead").append(insTxt);
    
    scrollHeight = document.documentElement.scrollHeight;

    let pm = $("#page-manager");
    let mt = pm.css("margin-top").slice(0, 2);
    pm.css("margin-top", (parseInt(mt, 10) + 20).toString(10) + "px");
    $("#cbLive").on("click", () => {
        change();
    });
    $("#cbSche").on("click", () => {
        change();
    });
    $("#cbArch").on("click", () => {
        change();
    });

    let observer = new MutationObserver(function(){
        if(scrollHeight < document.documentElement.scrollHeight && subscFilter.getAttribute("hidden") == null){
            scrollHeight = document.documentElement.scrollHeight;
            change();
        }
    });
    
    const elem = document.getElementById("page-manager");
    const config = { 
        childList: true, 
        characterData: true,
        subtree: true
    };
    
    observer.observe(elem, config);
}

const jsInitCheckTimer = setInterval(jsLoaded, 300);
function jsLoaded() {
    if (document.getElementsByTagName("yt-page-navigation-progress")[0] != null) {
        clearInterval(jsInitCheckTimer);
        
        var pageNavigation = document.getElementsByTagName("yt-page-navigation-progress")[0];
        if(location.href.endsWith("subscriptions")){
            subscLoaded();
            subscFilter = document.getElementById("subscFilter");
        }
        let observer1 = new MutationObserver(function(){
            if(pageNavigation.getAttribute("hidden") == ""){
                if(location.href.endsWith("subscriptions")){
                    if(subscFilter == null){
                        subscLoaded();
                        subscFilter = document.getElementById("subscFilter");
                    }
                    else{
                        subscFilter.removeAttribute("hidden");
                    }
                }
                else{
                    if(subscFilter.getAttribute("hidden") == null){
                        subscFilter.setAttribute("hidden", "true")
                    }
                }
            }
        });
        const config1 = {attributes: true};
        observer1.observe(pageNavigation, config1);
    }
}

$(window).resize(function(){
    if(subscFilter != null){ // 792px 75px, < 807px 45+x px
        if($(window).width() < 792){
            subscFilter.style.marginLeft = "5px";
        }
        else if($(window).width() < 1313){
            subscFilter.style.marginLeft = "75px";
        }
        else{
            subscFilter.style.marginLeft = "245px";
        }
    }
    else{
        if($(window).width() < 792){
            margin = 5;
        }
        else if($(window).width() < 1313){
            margin = 75;
        }
        else{
            margin = 245;
        }
    }
})
