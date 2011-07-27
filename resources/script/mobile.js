if(window.innerWidth && window.innerWidth <= 480)
{
	$(document).ready(function () {
		/* Remove *really* hidden elements */
		$("#masthead > #authorBlurb, ul.bottomnav, ul.nav > li > a > span, ul.nav > li.archives, .middle_links > p").remove();

		$("ul.topnav").addClass("hide");
		$("ul.topnav").removeClass("fix");
		$("#masthead").append('<div class="leftButton" onClick="toggleMenu()">Menu</div>');

		var articleTitle = $("div#article > h2 > a#blogtitle").html();
		if(articleTitle)
		{
			$("#masthead h1 a").html(articleTitle);
			$("div#article > h2").remove();
		}

		$("#reddit-button > iframe").attr("height", "16");

		scrollTo(0, 0);
	});
	function toggleMenu()
	{
		$("ul.topnav").toggleClass("hide");
		$("ul.topnav").toggleClass("fix");
		$("#masthead .leftButton").toggleClass("pressed");
	}
}
