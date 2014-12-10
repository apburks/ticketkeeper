var jiraListHost = 'dunandb';
var jiraListName = 'jiraList';
var jiraListUrls = JSON.parse(localStorage.getItem(jiraListName));
var haha =(jiraListUrls);
var baseUrl ="https://" + jiraListHost + ".jira.com/browse/";

function createList(List) {

    if(List != null) {
        List.forEach(function(e){

            var jiraLink = "<a href='"+ baseUrl + e + "' class='ticketLink'>" + e +"</a>";
            $('.jiraListContainer tr:last').after("<tr data-tix='" + e + "'><td class='col1'>"+ jiraLink +"</td><td class='col2'></td><td class='col3'>x</td></tr>");
        });
    }
}

function openNewTab(element){

    var newTabUrl = element.attr('href');
    chrome.tabs.create({url: newTabUrl});
}

function removeEntry(element){

    var parent = element.parent('tr');
    var tixNum = parent.data('tix');
    var find = jiraListUrls.indexOf(tixNum);
    parent.remove();

    if (find > -1) {
        jiraListUrls.splice(find, 1);
        localStorage.setItem(jiraListName,JSON.stringify(jiraListUrls));

    }
}

document.addEventListener('DOMContentLoaded', function () {

    createList(jiraListUrls);

    $('.ticketLink').click(function(){
        openNewTab($(this));
    });

    $('.col3').click(function(){
        removeEntry($(this));
    });


    $("#inputNewUrl").keypress(function(e) {
        var newUrl = "//" + jiraListHost + ".jira.com/browse/" + $("#inputNewUrl").val();

        if (e.which == 13) {
            var tixNum = $("#inputNewUrl").val();
            var jiraLink = "<a href='"+ baseUrl + tixNum + "' class='ticketLink'>" + tixNum +"</a>";

            $('.jiraListContainer tr:last').after("<tr data-tix='" + tixNum + "'><td class='col1'>"+ jiraLink +"</td><td class='col2'></td><td class='col3'>x</td></tr>");

            $("a.ticketLink").bind("click",function(){
                openNewTab($(this));
            });

            $('.col3').bind( "click", function(){
                removeEntry($(this));
            });


            if(jiraListUrls == null) {
                jiraListUrls = [tixNum];
            } else {
                jiraListUrls.push(tixNum);
            }

            $("#inputNewUrl").val('');
            localStorage.setItem(jiraListName,JSON.stringify(jiraListUrls));
        }
    });
});