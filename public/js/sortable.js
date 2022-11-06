$( function() {
    $( ".droptrue" ).sortable({
        connectWith: ".droptrue",
        change: function(event, ui) {
            console.log(event.target.id);
        }
    });

    $( "#wishlist, #applied", "#interview", "#offer" ).disableSelection();
} );