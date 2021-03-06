var data = {
    "legal_ss": ['MA', 'CA', 'CT', 'IA', 'VT', 'NH', 'DC', 'NY', 'WA', 'ME', 'MD', 'RI',
                 'DE', 'MN', 'NJ', 'HI', 'IL', 'NM', 'OR', 'PA', 'UT', 'OK', 'VA', 'WI',
                 'IN', 'CO', 'NV', 'ID', 'WV', 'NC', 'AK', 'AZ', 'MT', 'FL', 'SC', 'WY',
                 'MO', 'TX', 'AR', 'MS', 'AL', 'KS', 'NE', 'TN', 'KY', 'SD', 'ND', 'LA',
                 'GA', 'OH', 'MI-', 'SP-'], // Michigan is weird.
    "legal_some": [],
    "banned_const": [],
    "banned_both": []
};

var defaultColor = '#777';
var states = 50;

var controls = $('#controls');
$('#map').load('map.svg', function() {
    document.body.style.backgroundColor = '#DBF3FF';

    // Set the data attributes for each of the elements.
    for(var type in data) {
        var button = $('menu a[data-layer=' + type + ']');
        button.text(button.text() + ' (' + Math.round(data[type].length / states * 100) + '%)');
        data[type] = $('#' + data[type].join(', #'));

        var key = $('<b>');
        key.css('background-color', button.data('color'));
        button.prepend(key);
    }

    controls.show();
    controls.find('a').each(function() {
        var $this = $(this);
        $this.on('click', function(e) {
            e.preventDefault();
            var active = $this.hasClass('active');
            $this.toggleClass('active', !active);
            data[$this.data('layer')].css('fill', !active ? $this.data('color') : defaultColor);
        });
    });
    controls.children('[data-legal=yes]').click();
});
