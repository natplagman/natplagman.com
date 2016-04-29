var main = function () {

    $('form').submit(function (event) {
        var $input = $(event.target).find('input');
        var comment = $input.val();
        
        if (comment !== "") {
            var html = $('<li>').addClass('row');
            $('<span>').text(comment).addClass('col-xs-11 col-md-11').prependTo(html);
            $('<button>').text('x').addClass('delete').addClass('col-xs-1 col-md-1').appendTo(html);
            html.find('button').attr('type', 'button');
            html.prependTo('#comments');
            $input.val("");
        }
      
        return false;
    });
    
    $('#comments').on('click', 'li button.delete', function () {
        var $parent = $(this).parent();
        $parent.animate({height: 'toggle'}, 500, function () {
            $parent.remove();
        });
    });
    
    $('#comments').on('mouseenter', 'li', function () {
        $(this).find('button').css('display', 'inline');
    });
    
    $('#comments').on('mouseleave', 'li', function () {
        $(this).find('button').css('display', 'none');
    });
};

$(document).ready(main);