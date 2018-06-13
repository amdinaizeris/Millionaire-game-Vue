Vue.component('score', {
    data: function() {
        return {
            scoreList: [0, 100, 200, 300, 500, "1,000", "2,000", "4,000", "8,000", "16,000", "32,000", "64,000", "125,000", "250,000", "500,000", "1,000,000"]
        }
    },
    props: ['correctTotal', 'fiftyUsed', 'fiftyFifty', 'callUsed', 'callFriend'],
    template: `<div><p>Prize money:</p>
    <ul class="money">
        <li v-for="(w, i) in scoreList" v-bind:class="{bolder: correctTotal === i, fire: i === 5 || i === 10 || i === 15}">$ {{ w }}</li>
    </ul>
    <button type="button" class="gameButtons btn btn-outline-primary" v-on:click="fiftyFifty" v-bind:disabled="fiftyUsed">50/50 help</button>
    <button type="button" class="gameButtons btn btn-outline-primary" v-on:click="callFriend" v-bind:disabled="callUsed">Call a friend</button></div>`
  })