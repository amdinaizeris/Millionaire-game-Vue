"use strict";

let mlnApp = new Vue({
    el: "#mln-app",
    data: {
        title: "Who wants to be a millionaire",
        currentView: "intro",
        currentLevel: 0,
        currentQuestion: "",
        currentChoice: null,
        correctInLevel: 0,
        correctTotal: 0,
        rand: 0,
        fiftyUsed: false,
        callUsed: false,
        winnings: [0, 100, 200, 300, 500, "1,000", "2,000", "4,000", "8,000", "16,000", "32,000", "64,000", "125,000", "250,000", "500,000", "1,000,000"]
    },
    methods: {
        callFriend: function () {
            if ((Math.floor(Math.random() * 2) + 1) === 1) {
                this.currentChoice = this.currentQuestion.correct;
                document.getElementById("output").innerHTML = `Friend: I am 100% certain that the answer is <b>${this.currentQuestion.content[this.currentChoice]}</b>`
            } else {
                this.currentChoice = (Math.floor(Math.random() * 4) + 1);
                document.getElementById("output").innerHTML = `Friend: I think the answer might be <b>${this.currentQuestion.content[this.currentChoice]}</b> `
            }
            this.callUsed = true;
        }
        ,
        fiftyFifty: function () {
            if (this.currentQuestion.correct == 0) {
                document.getElementById(1).style.display = 'none';
                document.getElementById(3).style.display = 'none';
            } else if (this.currentQuestion.correct == 1) {
                document.getElementById(0).style.display = 'none';
                document.getElementById(3).style.display = 'none';
            } else if (this.currentQuestion.correct == 2) {
                document.getElementById(1).style.display = 'none';
                document.getElementById(3).style.display = 'none';
            } else if (this.currentQuestion.correct == 3) {
                document.getElementById(0).style.display = 'none';
                document.getElementById(1).style.display = 'none';
            }
            this.fiftyUsed = true;
        },
        reset: function () {
            this.currentLevel = 0;
            this.correctInLevel = 0;
            this.correctTotal = 0;
            this.fiftyUsed = false;
            this.callUsed = false;
        },
        goHome: function () {
            if (confirm(`Do you really want to go home with $${this.takeHome}?`)) {
                this.currentView = "goHome";
            }
        },
        generateQuestion: function () {
            this.currentChoice = null;
            this.rand = Math.floor(Math.random() * 14) + 1;
            let newRand;
            do {
                newRand = Math.floor(Math.random() * 14) + 1;
            } while (newRand != this.rand)
            this.currentQuestion = ALL_QUESTIONS[this.currentLevel].questions[this.rand];
        },
        checkAnswer: function () {

            if (this.currentChoice === null) {
                document.getElementById("output").innerHTML = "Please make a selection";
                // alert("Please make a selection");
            } else {
                if (this.currentChoice == this.currentQuestion.correct) {
                    this.currentView = "correct";
                    this.correctInLevel++;
                    this.correctTotal++;
                    if (this.correctTotal == 15) {
                        this.currentView = "won";
                    }
                    if (this.currentLevel > 4) {
                        if (this.correctInLevel > 0) {
                            this.correctInLevel = 0;
                            return this.currentLevel++;
                        }
                    }
                    if (this.correctInLevel > 1) {
                        this.correctInLevel = 0;
                        return this.currentLevel++;
                    }
                } else {
                    this.currentView = "lost"
                }
            }
        },

    },
    computed: {
        takeHome: function () {
            let sum;
            if (this.correctTotal < 5) {
                sum = 0;
            } else if (this.correctTotal < 10) {
                sum = "1,000";
            } else if (this.correctTotal < 15) {
                sum = "32,000";
            }
            return sum;
        }

    }
});
