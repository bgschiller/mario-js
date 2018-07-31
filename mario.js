
var mario = new Vue({
    el: 'main',
    template: `
    <div>
        <h1>Mario 4</h1>

        <p>When you say</p>
        <p><strong>Draw a pyramid</strong></p>
        <p>I say:</p>
        <br>

        <form id="draw-form">
            <label>
                How high?
                <input
                    type="text"
                    id="height"
                    :class="error ? 'invalid-field': null"
                    v-model="heightStr"
                />
                <label class="error-message">
                    {{ error }}
                </label>
            </label>
            <br><br>
            <input
                type="submit"
                value="Draw a pyramid"
                @click="clearAndRedraw"
            />
        </form>

        <br><br>

        <div id="pyramid">
            <p v-for="row in rows" v-html="row" />
        </div>
    </div>`,
    data: function() {
        return {
            heightStr: '5',
            height: 5,
        };
    },
    computed: {
        rows: function() {
            return pyramidRows(this.height);
        },
        error: function() {
            return checkForErrors(this.heightStr);
        },
    },
    methods: {
        clearAndRedraw(evt) {
            // Stop the form from causing a page refresh.
            evt.preventDefault();

            if (this.error) return;

            this.height = parseInt(this.heightStr);
        },
    },
});


/**
 * checkForErrors
 *
 * Check the row input for the following cases, and return an
 * appropriate error (as a string):
 *
 * 1. No height provided (empty string)
 * 2. Height is not a number, or is less than 1
 * 3. Height is more than 100.
 *
 * If there is no error, return null
 */
function checkForErrors(heightStr) {
    if (heightStr === "") return "No height provided";

    var height = parseInt(heightStr);

    if (isNaN(height) || height < 1) return "Invalid choice of height";

    if (height > 100) return "You must be craaazy if you think I'm gonna draw a pyramid that big!";

    return null;
}


/**
 * drawPyramid
 *
 * Renders, as a list of html strings, a Mario pyramid of the specified height
 */
function pyramidRows(height) {

    var rowStrings = [];
    // for each row....
    for (var row = 0; row < height; row++) {

        // figure out number of bricks and spaces
        var numBricks = row + 2;
        var numSpaces = height - row - 1;

        // build up a string for this row
        var rowStr = "";
        for (var i = 0; i < numSpaces; i++) {
            var spaceChar = "&nbsp";
            rowStr += spaceChar;
        }
        for (var i = 0; i < numBricks; i++) {
            rowStr += "#";
        }

        rowStrings.push(rowStr);
    }
    return rowStrings;
}
