
$(document).ready(function () {
    var topics = ['cat', 'dog', 'bunny', 'mouse', 'panda', 'monkey', 'capybara', 'quokka'];

    //create initial array buttons
    function renderButtons() { 
        $('#buttons').empty();

        for (var i = 0; i < topics.length; i++) {
            var newButton = $("<button>");
            newButton.addClass('animal');
            newButton.attr('animal-name', topics[i]);
            newButton.text(topics[i]);
            $('#buttons').append(newButton);
            // console.log(newButton.attr('animal-name'));
        }
    }
    renderButtons();

    //search new button function
    $('#add-animal').on('click', function(event) {
        event.preventDefault();
        var newAnimal = $('#new-animal').val().trim();
        //prevent empty buttons from being created
        if (newAnimal === ''){
            return false;
        }
        topics.push(newAnimal);
        renderButtons();
    });

    //onclick animal button to display GIFS
    $(document).on('click', '.animal', displayGIFS);

    //get gifs when animal button clicked
    function displayGIFS() { 
        var animal = $(this).attr('animal-name');
        var queryURL = 'https://api.giphy.com/v1/gifs/search?q='+animal+'&api_key=ThktZwuWSHsyOfIB9Z8MbuPG6vcNlNS4&limit=10';
        
        $.ajax({
            url : queryURL,
            method: 'GET'
        }).then(function(input){
            var results = input.data;
            //uncomment below if I want to replace existing 10gifs with new 10gifs
            // $('#show-gifs').empty(); 
            for (var i =0; i < results.length; i++) {
                var newDiv = $('<div class = "col-md-4">');
                var downloadLink = $('<a>').text('Download GIF');
                downloadLink.attr('href', results[i].images.fixed_height.url).attr('download', results[i].images.fixed_height.url);
                var p = $('<p>').html('Title: ' + results[i].title  + '</br>Rating : '+ results[i].rating  );
                var newGif = $('<img>').attr('src', results[i].images.fixed_height_still.url);
                newGif.attr('data-still', results[i].images.fixed_height_still.url).attr('data-animated', results[i].images.fixed_height.url).attr('data-state', 'still').addClass('gif');
                newDiv.append(newGif, p, downloadLink);
                $('#show-gifs').prepend(newDiv);
            }
            renderButtons();
        });
    };

    //change still GIFS to animated
    $(document).on('click', '.gif', function() {
        var state = $(this).attr('data-state');
        if (state === 'still') {
            $(this).attr('src', $(this).attr('data-animated'));
            $(this).attr('data-state', 'animate');
        } else if (state ==='animate') {
            $(this).attr('src', $(this).attr('data-still'));
            $(this).attr('data-state', 'still');
        }
    });
  



   

});


       
   


