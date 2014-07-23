var data = {
    "legal_ss": ['WA', 'IA', 'NY', 'VT', 'NH', 'CT', 'MA', 'MD', 'ME', 'RI', 'DE', 'MN', 'CA', 'NJ', 'HI', 'IL',
                 'NM', 'OR', 'PA', 'DC'],
    "legal_cu": ['NV', 'CO'],
    "legal_some": ['TX', 'OK', 'AR', 'VA', 'ID', 'UT', 'IN', 'KY', 'KS', 'AK', 'OH', 'WI', 'WY', 'MI-', 'SP-'],  // Michigan is weird.
    "banned_const": ['AZ', 'NE', 'MS', 'TN', 'MT', 'MO'],
    "banned_leg": ['WV'],
    "banned_both": ['NC', 'SD', 'ND', 'LA', 'AL', 'FL', 'GA', 'SC']
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
