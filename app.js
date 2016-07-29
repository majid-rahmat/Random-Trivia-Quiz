$("#start").click(start);


var currentQuestion = 0;
var score = 0;

function generate() {
    $('#next').hide();
    $('body').append('<img>');
    $('img').attr('src', questions[currentQuestion].imageUrl);
    $('#question').text(questions[currentQuestion].question);

    for (var i = 0; i < questions[currentQuestion].choices.length; i++) {
        $('#questions_ul').append('<li>' + '<input type="radio">' + questions[currentQuestion].choices[i]);
    }
}

function correctAnswer() {
    score += 1;
    $('#score').text('Your score: ' + score);
    $('#answer_view').text("Correct!" + questions[currentQuestion].answer);
    $('#next_question').html('<button id="next">Next Question</button>');
    $('#question').empty();
    $('#questions_ul').empty();
    $('img').remove();
    $('body').append('<img>');
    $('img').attr('src', questions[currentQuestion].correctUrl);
}

$('#next_question').click(function() {
    currentQuestion += 1;
    $('#answer_view').empty();
    $('img').remove();
    generate();

});

function incorrectAnswer() {


    $('#answer_view').text("Incorrect!");
    $('#score').text('Your score: ' + score);
    $('#next_question').html('<button id="next">Next Question</button>');
    $('#question').empty();
    $('#questions_ul').empty();     
}

function validate(input) {
    console.log(currentQuestion + " > " + (questions.length - 1));
    if (currentQuestion === (questions.length - 1)) {
        if(questions[currentQuestion].correctAnswer === input) {
        $('#score_view').text('Game Over');
        correctAnswer();
        $('#next').hide();
        return;
    } else {
        incorrectAnswer();
        $('#score_view').text('Game Over');
        $('#next').hide();
        return;
    }
}

    questions[currentQuestion].correctAnswer === input ? (correctAnswer()) : (incorrectAnswer());

}

function start() {

    $('#welcome').hide();
    $('#start').hide();
    $('#opening_pic').hide();
    $('#score').text("your score:" + score);
    generate();

    $('#questions_ul').on('click', 'li', function() {
        validate($(this).text());

    });
}