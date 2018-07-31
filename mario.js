
var mario = new Vue({
    el: 'main',
    template: `
        <h1>Mario 4</h1>

        <p>When you say</p>
        <p><strong>Draw a pyramid</strong></p>
        <p>I say:</p>
        <br>

        <form id="draw-form">
            <label>
                How high?
                <!--
                    TODO 3 add a v-model directive to the input,
                    so that Vue will store it for us as 'heightStr'.
                -->
                <input type="text" id="height" :class="error ? 'invalid-field': null" />
                <label class="error-message">
                    <!--
                    TODO 2
                    Render the error message from data right here
                    -->
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
            <!--
            TODO 6: Add some Vue.js code right here.
            You'll want to use v-for="row in rows"
            and make a <p> for each one.
            -->
        </div>`,
    data: function() {
        return {
            heightStr: '5',
            height: 5,
            error: null, // Delete this line when you finish TODO 4
        };
    },
    computed: {
        rows: function() {
            // TODO 5
            // Fill out this computed property by calling
            // pyramidRows on this.height.
        },
        // TODO 4 (and two other places: search for "TODO 4")
        // Make a new computed property 'error'.
        // It should be the result of calling checkForErrors on this.heightStr.
        // (Delete the error key from data once this is done)

    },
    methods: {
        clearAndRedraw(evt) {
            // Stop the form from causing a page refresh.
            evt.preventDefault();

            // TODO 4
            // Delete the next line. It now happens for us automatically via computed properties
            this.error = checkForErrors(this.heightStr);

            if (this.error) {
                // Stop drawing, we've got errors.
                return;
            }

            this.height = parseInt(this.heightStr);

            var pyramid = document.querySelector('#pyramid');
            pyramid.innerHTML = '';

            // Again, isn't Vue supposed to help with this...
            var rows = pyramidRows(this.height); // TODO 5: Use this.rows instead (the computed property you just made)
            for (var ix = 0; ix < rows.length; ix++) {
                var row = document.createElement('p');
                row.innerHTML = rows[ix];
                pyramid.appendChild(row);
            }
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
    // TODO 1
    // Fill out this function.
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
