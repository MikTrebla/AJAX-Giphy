var topics = ['cat', 'dog', 'bunny', 'mouse', 'panda', 'monkey', 'capybara', 'quokka'];

$(document).ready(function () {

    function renderButtons() {
        $('#buttons').empty();

        for (var i = 0; i < topics.length; i++) {
            var newButton = $("<button>");
            newButton.addClass('animal');
            newButton.attr('animal-name', topics[i]);
            newButton.text(topics[i]);
            $('#buttons').append(newButton);
            console.log(newButton.attr('animal-name'));
        }
    }
    renderButtons();


    $('#add-animal').on('click', function(event) {
        event.preventDefault();
        var newAnimal = $('#new-animal').val().trim();
        topics.push(newAnimal);

        renderButtons();
    });

});


       
   


