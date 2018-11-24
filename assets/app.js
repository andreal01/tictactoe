// Author : Andri Kurnia Putra <andri.24434@gmail.com>
// since 2018-11-24

$(document).ready(function() {
    var x = "x";
    var o = "o";
    var turns = 0;

    // columns stored in variables 
    var column1 = $("#column1");
    var column2 = $("#column2");
    var column3 = $("#column3");
    var column4 = $("#column4");
    var column5 = $("#column5");
    var column6 = $("#column6");
    var column7 = $("#column7");
    var column8 = $("#column8");
    var column9 = $("#column9");

    //Checking for Player or Computer Wins
    function playerWins() {
        if (column1.hasClass(x) && column2.hasClass(x) && column3.hasClass(x) ||
            column1.hasClass(x) && column4.hasClass(x) && column7.hasClass(x) ||
            column1.hasClass(x) && column5.hasClass(x) && column9.hasClass(x) ||
            column2.hasClass(x) && column5.hasClass(x) && column8.hasClass(x) ||
            column3.hasClass(x) && column5.hasClass(x) && column7.hasClass(x) ||
            column3.hasClass(x) && column6.hasClass(x) && column9.hasClass(x) ||
            column4.hasClass(x) && column5.hasClass(x) && column6.hasClass(x) ||
            column7.hasClass(x) && column8.hasClass(x) && column9.hasClass(x)
        ) {
            alert("Winner is X");
            clearAll();
        }
    }

    function computerWins() {
        if (column1.hasClass(o) && column2.hasClass(o) && column3.hasClass(o) ||
            column1.hasClass(o) && column4.hasClass(o) && column7.hasClass(o) ||
            column1.hasClass(o) && column5.hasClass(o) && column9.hasClass(o) ||
            column2.hasClass(o) && column5.hasClass(o) && column8.hasClass(o) ||
            column3.hasClass(o) && column5.hasClass(o) && column7.hasClass(o) ||
            column3.hasClass(o) && column6.hasClass(o) && column9.hasClass(o) ||
            column4.hasClass(o) && column5.hasClass(o) && column6.hasClass(o) ||
            column7.hasClass(o) && column8.hasClass(o) && column9.hasClass(o)
        ) {
            alert("Winner is O");
            clearAll();
        }
    }

    // Board click 
    $("#board li").on("click", function() {
        console.log(turns);
        $(this).text(x);
        $(this).addClass('disable x');
        playerWins();
        computerAIMove();
        computerWins();
        turns++;
        draw();
    });

    //Checks for Draw 
    function draw() {
        while (turns == 9) {
            alert("It's a Draw !");
            clearAll();
        }
    };

    //Reset button function
    $("#reset").on("click", function() {
        clearAll();
    });



    // function for resetting the board
    function clearAll() {
        $("#board li").text("");
        $("#board li").removeClass("disable");
        $("#board li").removeClass("o");
        $("#board li").removeClass("x");
        turns = 0;
    }

    // Computer AI MOVES 

    function computerAIMove() {
        if (column1.text() == "" && ((column3.text() == "x" && column2 == "x") || (column9 == "x" && column5 == "x") || (column7 == "x" && column4 == "x"))) {
            column1.text(o);
            column1.addClass('disable o');
            turns++;
        } else {
            if (column1.text() == "" && ((column1.text() == "x" && column3.text() == "x") || (column8.text() == "x" && column5.text() == "x"))) {
                column2.text(o);
                column2.addClass('disable o');
                turns++;
            } else {
                if (column3.text() == "" && ((column1.text() == "x" && column2.text() == "x") || (column7.text() == "x" && column5.text() == "x") || (column9.text() == "x" && column6.text() == "x"))) {
                    column3.text(o);
                    column3.addClass('disable o');
                    turns++;
                } else {
                    if (column9.text() == "" && ((column7.text() == "x" && column8.text() == "x") || (column1.text() == "x" && column5.text() == "x") || (column3.text() == "x" && column6.text() == "x"))) {
                        column9.text(o);
                        column9.addClass('disable o');
                        turns++;
                    } else {
                        if (column7.text() == "" && ((column9.text() == "x" && column8.text() == "x") || (column3.text() == "x" && column2.text() == "x") || (column1.text() == "x" && column4.text() == "x"))) {
                            column7.text(o);
                            column7.addClass('disable o');
                            turns++;
                        } else {
                            if (column8.text() == "" && ((column9.text() == "x" && column7 == "x") || (column2.text() == "x" && column5.text() == "x"))) {
                                column8.text(o);
                                column8.addClass('disable o');
                                turns++;
                            } else {
                                if (column4.text() == "" && ((column6.text() == "x" && column5.text() == "x") || (column1.text() == "x" && column7.text() == "x"))) {
                                    column4.text(o);
                                    column4.addClass('disable o');
                                    turns++;
                                } else {
                                    if (column6.text() == "" && ((column3.text() == "x" && column9.text() == "x") || (column5.text() == "x" && column4.text() == "x"))) {
                                        column4.text(o);
                                        column4.addClass('disable o');
                                        turns++;
                                    } else {
                                        if (column5.text() == "" && ((column3.text() == "x" && column7.text() == "x") || (column9.text() == "x" && column1.text() == "x") || (column6.text() == "x" && column4.text() == "x") || (column8.text() == "x" && column2.text() == "x"))) {
                                            column4.text(o);
                                            column4.addClass('disable o');
                                            turns++;
                                        } else { // if no column to block then play these columns....
                                            if (column5.text() == "") {
                                                column5.text(o);
                                                column5.addClass('disable o');
                                                turns++;

                                            } else {
                                                if (column1.text() == "") {
                                                    column1.text(o);
                                                    column1.addClass('disable o');
                                                    turns++;

                                                } else {
                                                    if (column9.text() == "") {
                                                        column9.text(o);
                                                        column9.addClass('disable o');
                                                        turns++;

                                                    } else {
                                                        if (column8.text() == "") {
                                                            column8.text(o);
                                                            column8.addClass('disable o');
                                                            turns++;

                                                        } else {
                                                            if (column4.text() == "") {
                                                                column4.text(o);
                                                                column4.addClass('disable o');
                                                                turns++;

                                                            }
                                                        }
                                                    }
                                                }


                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
});