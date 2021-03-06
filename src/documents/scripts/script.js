$(function () {
	if (window.innerWidth > 600) {
		refreshPositions();

		setTimeout(function () {
			$('#header').addClass('disable-transition');
		}, 400);

		$(window).on('scroll', refreshPositions);
	}

	$('a').on('click', function (e) {
		var target = $(this),
			href = target.attr('href'),
			position = 0;

		if (href[1] !== '#' || location.pathname !== '/') {
			return;
		}

		e.preventDefault();

		if (href[1] === '#' && href.length > 1) {
			position = $(href.slice(1)).offset().top;
		}

		$(document.body).animate({scrollTop: position}, function () {
			document.location.hash = href.replace(/#|\//,'');
		});
	});

	function refreshPositions () {
		var scroll = document.body.scrollTop / 120;

		$('.triangle').each(function (i, e) {
			e = $(e);

			var data = {},
				transform = '';

			if (scroll > 1) {
				scroll = 1;
			}

			$.each(e.data(), function (prop, value) {
				var matches = prop.match(/(pr[1-9])(.*)/),
					propName, propData;

				if (matches && matches.length > 1) {
					propName = matches[1];
					propData = matches[2].toLowerCase();
				}

				if (!data[propName]) {
					data[propName] = {};
				}

				data[propName][propData] = value;
			});

			$.each(data, function (i, e) {
				var diff = e.to - e.from,
					val;

				transform += e.prop + '(';

				val = e.from + (diff * scroll);

				transform += val;

				if (/translate/.test(e.prop)) {
					transform += 'px';
				}

				if (/rotate/.test(e.prop)) {
					transform += 'deg';
				}

				transform += ')';
			});

			transform += ' translateZ(0) ';

			e.css({
				transform: transform
			});
		});
	}
});