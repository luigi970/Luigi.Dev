// init Glightbox
const lightbox = GLightbox({
    'href': 'https://www.youtube.com/watch?v=sD72LbIk02M',
    'type': 'video',
    'source': 'youtube', //vimeo, youtube or local
    'width': 900,
    'autoplayVideos': true,
});

// *************************************************************

//setTimeout(function(){$grid.isotope('layout')}, 300);

// init Isotope
var initial_items = 6;
var next_items = 3;
var $grid = $('#grid').isotope({
    itemSelector: '.element-item',
    layoutMode: 'masonry',
    stamp: '.element-item--static'
});

// imagesLoaded is a library js - detect when images are loaded
$grid.imagesLoaded().progress( function() {
    $grid.isotope('layout');
});


// bind filter button click
$('.button-group-home').on('click', 'button', function () {
    var filterValue = $(this).attr('data-filter');
    // use filterFn if matches value
    $grid.isotope({filter: filterValue});
    updateFilterCounts();
});
function updateFilterCounts() {
    // get filtered item elements
    var itemElems = $grid.isotope('getFilteredItemElements');
    var count_items = $(itemElems).length;
   
    if (count_items > initial_items) {
        $('#showMore').show();
    }
    else {
        $('#showMore').hide();
    }
    if ($('.element-item').hasClass('visible_item')) {
        $('.element-item').removeClass('visible_item');
    }
    var index = 0;

    $(itemElems).each(function () {
        if (index >= initial_items) {
            $(this).addClass('visible_item');
        }
        index++;
    });
    $grid.isotope('layout');
}
// change is-checked class on buttons
$('.button-group-home').each(function (i, buttonGroup) {
    var $buttonGroup = $(buttonGroup);
    $buttonGroup.on('click', 'button', function () {
        $buttonGroup.find('.is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');
    });
});

function showNextItems(pagination) {
    var itemsMax = $('.visible_item').length;
    var itemsCount = 0;
    $('.visible_item').each(function () {
        if (itemsCount < pagination) {
            $(this).removeClass('visible_item');
            itemsCount++;
        }
    });
    if (itemsCount >= itemsMax) {
        $('#showMore').hide();
    }
    $grid.isotope('layout');
}
// function that hides items when page is loaded
function hideItems(pagination) {
    var itemsMax = $('.element-item').length;
    var itemsCount = 0;
    $('.element-item').each(function () {
        if (itemsCount >= pagination) {
            $(this).addClass('visible_item');
        }
        itemsCount++;
    });
    if (itemsCount < itemsMax || initial_items >= itemsMax) {
        $('#showMore').hide();
    }
    $grid.isotope('layout');
}
$('#showMore').on('click', function (e) {
    e.preventDefault();
    showNextItems(next_items);
});
hideItems(initial_items);

// *************************************************************

// Images animated js

var count = 0;
function framesByTime() {
    setTimeout(renameFrame,200);
}
function renameFrame() {
    count++;
    if(count > 4) {
        count = 1; // se vuelve a uno para reiniciar
    }
    document.getElementById("rocket").setAttribute('class', "img-fluid rocket rocket-"+count);
    document.getElementById("rocket").src="images/arts/rocket/rocket-" + count + ".svg";
    framesByTime();
};
setTimeout(renameFrame, 1000);

// **************************************

