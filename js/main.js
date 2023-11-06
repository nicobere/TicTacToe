$(document).ready(function () {
    var turn = true;
    var hasWinner = false;

    var scorePlayer = 0;
    var scoreNpc = 0;

    // Start Round
    setTurn();

    // Player Turn
    $(".gameboard-card").on('click', function () {
        if (turn && !hasWinner) {
            if ($(this).find('p').text() == '') {
                $(this).find('p').text("X");
                switchTurn();
            }
        }
    });

    // NPC Turn
    function npcTurn() {
        let rand = Math.floor((Math.random() * 9) + 1);

        let item = $(".gameboard-card:nth-child(" + rand + ")");

        if (item.children().text() == '') {
            item.children().text("0");
            switchTurn();
        } else {
            npcTurn();
        }
    }

    function switchTurn() {
        checkWinner();

        if (!hasWinner) {
            turn = !turn;
            setTurn();

            if (!turn) {
                setTimeout(function () {
                    npcTurn();
                }, 700);
            }
        }
    }

    function setTurn() {
        if (turn) {
            $("#score-npc").removeClass("activeTurn");
            $("#score-player").addClass("activeTurn");
        } else if (!turn) {
            $("#score-player").removeClass("activeTurn");
            $("#score-npc").addClass("activeTurn");
        }
    }

    function checkWinner() {
        let currentUserTag = turn ? "X" : "0";

        const winningConditionCards = [{
                card: [1, 2, 3]
            },
            {
                card: [4, 5, 6]
            },
            {
                card: [7, 8, 9]
            },
            {
                card: [1, 4, 7]
            },
            {
                card: [2, 5, 8]
            },
            {
                card: [3, 6, 9]
            },
            {
                card: [1, 5, 9]
            },
            {
                card: [3, 5, 7]
            }
        ];

        $.each(winningConditionCards, function (index, obj) {
            if ($(".gameboard-card:nth-child(" + obj.card[0] + ")").children().text() == currentUserTag &&
                $(".gameboard-card:nth-child(" + obj.card[1] + ")").children().text() == currentUserTag &&
                $(".gameboard-card:nth-child(" + obj.card[2] + ")").children().text() == currentUserTag) {
                hasWinner = true;
                $(".gameboard-card:nth-child(" + obj.card[0] + ")").css("background", "rgb(92, 248, 53)")
                $(".gameboard-card:nth-child(" + obj.card[1] + ")").css("background", "rgb(92, 248, 53)")
                $(".gameboard-card:nth-child(" + obj.card[2] + ")").css("background", "rgb(92, 248, 53)")
            }
        });

        if (hasWinner && currentUserTag == "X") {
            scorePlayer++;
            $("#score-player").text("Player: " + scorePlayer);
            $("#winnerText").text("Player has Won!")
        } else if (hasWinner && currentUserTag == "0") {
            scoreNpc++;
            $("#score-npc").text("NPC: " + scoreNpc);
            $("#winnerText").text("NPC has Won!")
        }
    }

    // Reset / Again
    $("#resetGame").on('click', function () {
        $(".gameboard-card").each(function () {
            $(this).children().text("")
            $(this).css("background", "white")
        });

        hasWinner = false;
        $("#winnerText").text("");
        turn = true;
        setTurn();
    });
});