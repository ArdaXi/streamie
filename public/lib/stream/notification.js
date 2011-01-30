function openLink(url)
{
	chrome.tabs.getAllInWindow(null, function(tabs){
	    for(var i in tabs)
		{
			if(tabs[i].url == url || tabs[i].url == url + "#")
			{
				chrome.tabs.update(tabs[i].id, {'url': url, 'selected': true});
				return;
			}
		}
		chrome.tabs.create({'url': url});
	});
}

function openOptions()
{
	openLink(chrome.extension.getURL("options.html"));
}

function tweetToHTML(tweet)
{
	var img = document.getElementById('avatar'), span = document.getElementById('msg'), user = document.getElementById('user'), entities = tweet.entities, retweeted = false;
	img.src = tweet.user.profile_image_url;
	img.onclick = function() { openLink("http://twitter.com/"+tweet.user.screen_name); };
	user.onclick = function() { openLink("http://twitter.com/"+tweet.user.screen_name); };
	user.innerHTML = tweet.user.screen_name;
	if(tweet.RTby != null)
	{
		console.log(tweet);
		$('#rtby').text(tweet.RTby.screen_name).click(function() { openLink("http://twitter.com/"+tweet.RTby.screen_name); });
		$('#rt').show();
	}
	span.innerHTML = linkify_entities(tweet);
	var tweetDate = new Date(tweet.created_at);
	$('#timestamp').attr({
		'title': iso8601(tweetDate),
		'href': "http://twitter.com/"+tweet.user.screen_name+"/status/"+tweet.id_str
	}).text(tweetDate.format("H:i M jS")).timeago();
	$('#via').html("via "+tweet.source);
	
	$('a').filter(function(index){ return this.href != "#" }).each(function(index){
		$(this).click(function(){
			openLink(this.href);
		});
	});
}

function messageToHTML(message)
{
	var img = document.getElementById('avatar'), span = document.getElementById('msg'), icon = document.getElementById('tlogo');
	$("#bottom").hide();
	img.src = chrome.extension.getURL("images/icon48.png");
	icon.src = chrome.extension.getURL("images/icon16.png");
	span.innerHTML = message;
}

$().ready(function() {
	var msg = chrome.extension.getBackgroundPage().dequeueMsg();
	if(!msg){ window.close(); }
	if(msg.type == "tweet") { tweetToHTML(msg.content); }
	if(msg.type == "message") { messageToHTML(msg.content); }
	if(!localStorage['delay']) { var delay = 20; }
	else { var delay = parseFloat(localStorage['delay']); }
	setTimeout("window.close()", delay * 1000);
	if($("#main").height() > 48)
	{
		$("#top").height($("#main").height());
	}
});