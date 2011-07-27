---
layout: nil
---
/**
 The MIT License

 Copyright (c) 2010 Joel Goguen

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to
 deal in the Software without restriction, including without limitation
 the rights to use, copy, modify, merge, publish, distribute, sublicense,
 and/or sell copies of the Software, and to permit persons to whom the
 Software is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 DEALINGS IN THE SOFTWARE.
**/

gablog = {};

/* If the browser doesn't have a console object, fake one */
if (typeof(console) === "undefined")
{
	console = {
		log: function () {},
		debug: function () {},
		info: function () {},
		warn: function () {},
		error: function () {},
		assert: function () {
			return true;
		}
	};
}

/* IE8 doesn't have a console.debug() method:
 * http://msdn.microsoft.com/en-us/library/dd565625%28VS.85%29.aspx */
if (!console.debug)
{
	console.debug = console.log;
}

/*
 * Add the curry() function, to allow for partial function applications.
 *
 * From: http://www.webreference.com/programming/javascript/rg17/
 */
Function.prototype.curry = function ()
{
	var method = this;
	var args = Array.prototype.slice.call(arguments);
	return function ()
	{
		return method.apply(this, args.concat(Array.prototype.slice.call(arguments)));
	};
};

String.prototype.strip = function() {
	/* lstrip() */
	var str = this.replace(/^\s+/, "");

	var whitespace = /\s/;
	var len = str.length;

	/* rstrip() */
	while(whitespace.test(str.charAt(--len)));
	return str.slice(0, len + 1);
};

/* Allow testing if a value is in an array */
Array.prototype.hasElem = function (val, strictTypeCheck) {
	var strict = strictTypeCheck || false;
	for(var idx = 0; idx < this.length; idx++)
	{
		if(strict && this[idx] === val)
		{
			return true;
		}
		else if(this[idx] == val)
		{
			return true;
		}
	}
	return false;
};

function loadFortune()
{
	$.ajax({
		type: "GET",
		url: "/ajax/fortune",
		success: function (data, stat, xhr) {
			$("#fortune").html(data);
		}
	});
}

function setLocation(loc)
{
	window.location.href = loc;
}

function relative_time(time_value)
{
	/* This function shamelessly copied and modified from https://twitter.com/javascripts/blogger.js */
	var values = time_value.split(" ");
	time_value = values[1] + " " + values[2] + ", " + values[5] + " " + values[3];
	var parsed_date = Date.parse(time_value);
	var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
	var delta = parseInt((relative_to.getTime() - parsed_date) / 1000, 10);
	delta = delta + (relative_to.getTimezoneOffset() * 60);

	if(delta < 60)
	{
		return 'less than a minute ago';
	}
	else if(delta < 120)
	{
		return 'about a minute ago';
	}
	else if(delta < (60 * 60))
	{
		return (parseInt(delta / 60, 10)).toString() + ' minutes ago';
	}
	else if(delta < (120 * 60))
	{
		return 'about an hour ago';
	}
	else if(delta < (24 * 60 * 60))
	{
		return 'about ' + (parseInt(delta / 3600, 10)).toString() + ' hours ago';
	}
	else if(delta < (48 * 60 * 60))
	{
		return '1 day ago';
	}
	else
	{
		return(parseInt(delta / 86400, 10)).toString() + ' days ago';
	}
}

function populateTwitterList(twitters, listID)
{
	var statusHTML = [];
	for(var i = 0; i < twitters.length; i++)
	{
		var username = twitters[i].user.screen_name;
		var status = twitters[i].text.replace(/((https?|s?ftp|ssh)\:\/\/[^"\s<>]*[^.,;'">\:\s<>\)\]\!])/g,
			function (url) {
				return '<a href="' + url + '">' + url + '</a>';
			}).replace(/\B@([_a-z0-9]+)/ig,
			function (reply) {
				return reply.charAt(0) + '<a href="http://twitter.com/' + reply.substring(1) + '">' + reply.substring(1) + '</a>';
			});
		statusHTML.push('<li><span class="rounded">' + status + '</span> <a style="font-size:85%" href="http://twitter.com/' + username + '/statuses/' + twitters[i].id + '">' + relative_time(twitters[i].created_at) + '</a></li>');
	}
	$("#" + listID).html(statusHTML.join(""));
}

function localTwitterCallback(twitters)
{
	return populateTwitterList(twitters, "twitter_user_list");
}

function sidebarTwitterCallback(twitters)
{
	return populateTwitterList(twitters, "twitter_update_list");
}

$(document).ready(function () {
	$('#archiveLink').click(function (e) {
		e.preventDefault();
		$('#archives').toggleClass("hide");
	});

	$.ajax({
		url: "https://api.twitter.com/1/statuses/user_timeline.json",
		type: "GET",
		data: "count={{ site.twitter_count }}&screen_name={{ site.twitter_name }}",
		dataType: "jsonp",
		success: function (data) {
			sidebarTwitterCallback(data);
		}
	});
});
