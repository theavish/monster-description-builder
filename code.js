$(document).ready(function() {
    $('button:not(.submit)').click(addField);
    $('.submit').click(submit);
    $('.input').on('keyup', 'input', function(e) {
        e.which == 13 ? $('.submit').click() : ''; //enter, submit
        e.which == 27 ? $(this).closest('.block').find('button').click() : ''; //esc, add field
    });
    $('body').on('error', function(e) {
        alert('An error prevented the output. Please check the JS console.');
    });
    new Clipboard('.submit');
});
    
    
function addField(e) {
    var section = $(e.target.parentElement);
    var type = section[0].classList[0];
    var fields = "<div><div class='title-block'><span class='title-label'>Title:</span><input class='title-input " + type + "' type='text' name='title'></div><div class='desc-block'><span class='label-desc'>Description:</span><input type='text' class='desc-input " + type + "' name='description'></div></div>";
    
    section.append(fields);
}

function parseInput() {
    var target = $('#target');
    var titles = $('.title-input');
    var descriptions = $('.desc-input');

    var mapping = {
        'special-traits': [],
        'actions': [],
        'legendary-actions': [],
        'reactions': []
    };

    for (var i = 0; i < titles.length; i++) {
        var title = titles[i].value || null;
        var description = descriptions[i].value;
        var category = titles[i].classList[1];

        mapping[category].push({title: title, description: description});
    }

    return mapping;
}

function buildOutput(map) {
    var builtSpecialTraits = buildSpecialTraits(map['special-traits']);
    var builtActions = buildActions(map['actions']);
    var builtLegendaryActions = buildLegendaryActions(map['legendary-actions']);
    var builtReactions = buildReactions(map['reactions']);

    if (!builtSpecialTraits && !builtActions && !builtLegendaryActions && !builtReactions) { return ''; }

    return '<div class="more">' + builtSpecialTraits + builtActions + builtLegendaryActions + builtReactions + '</div>';
}

function buildSpecialTraits(items) {
    if (!items[0]) { return ''; }

    if (items[0].title || items[0].description) {
        var parsedItems = '';

        for (var i = 0; i < items.length; i++) {
            if (items[i].title && items[i].description) {
                parsedItems += '<li><span class="title">' + items[i].title + '</span><span class="detail">' + items[i].description + '</span></li>';
            } else {
                console.error('Error parsing Special Trait', items[i]);
                $('body').trigger('error');
                return '';
            }
        }

        return '<div class="special-traits"><h3>Special Traits</h3><ul>' + parsedItems + '</ul></div>';
    } else {
        return '';
    }
}

function buildActions(items) {
    if (!items[0]) { return ''; }

    if (items[0].title || items[0].description) {
        var parsedItems = '';

        for (var i = 0; i < items.length; i++) {
            if (items[i].title && items[i].description) {
                parsedItems += '<li><span class="title">' + items[i].title + '</span><span class="detail">' + items[i].description + '</span></li>';
            } else {
                console.error('Error parsing Action', items[i]);
                $('body').trigger('error');
                return '';
            }
        }

        return '<div class="actions"><h3>Actions</h3><ul>' + parsedItems + '</ul></div>';
    } else {
        return '';
    }
}

function buildLegendaryActions(items) {
    if (!items[0]) { return ''; }

    if (items[0].title || items[0].description) {
        var parsedItems = '';

        for (var i = 0; i < items.length; i++) {
            if (items[i].description) {
                parsedItems += '<li><span class="detail">' + items[i].description + '</span></li>';
            } else {
                console.error('Error parsing Legendary Action', items[i]);
                $('body').trigger('error');
                return '';
            }
        }

        return '<div class="legendary-actions"><h3>Legendary Actions</h3><ul>' + parsedItems + '</ul></div>';   
    } else {
        return '';
    }
}

function buildReactions(items) {
    if (!items[0]) { return ''; }

    if (items[0].title || items[0].description) {
        var parsedItems = '';

        for (var i = 0; i < items.length; i++) {
            if (items[i].title && items[i].description) {
                parsedItems += '<li><span class="title">' + items[i].title + '</span><span class="detail">' + items[i].description + '</span></li>';
            } else {
                console.error('Error parsing Special Trait', items[i]);
                $('body').trigger('error');
                return '';
            }
        }

        return '<div class="reactions"><h3>Reactions</h3><ul>' + parsedItems + '</ul></div>';
    } else {
        return '';
    }
}

function submit() {
    var output = buildOutput(parseInput());
    $('#target').text(output);
    $('.preview').html(output)
}