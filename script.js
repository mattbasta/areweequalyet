var data = {
    "legal_ss": ['WA', 'IA', 'NY', 'VT', 'NH', 'CT', 'MA', 'MD', 'ME', 'RI', 'DE', 'MN', 'CA', 'NJ', 'HI', 'IL'],
    "legal_cu": ['OR', 'NV'],
    "legal_some": ['CO', 'WI'],
    "banned_const": ['NE'],
    "banned_leg": ['PA', 'IN', 'WV', 'NC', 'WY'],
    "banned_both": ['AK', 'MO', 'ID', 'NM', 'AZ', 'UT', 'KS', 'SD', 'ND', 'TX', 'LA', 'OK', 'AR', 'MT', 'AL', 'FL', 'GA', 'SC', 'VA', 'KY', 'TN', 'MS', 'OH',
                    'MI-', 'SP-'],  // Michigan is weird.
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
