
var mario = new Vue({
    el: 'main',
    data: function() {
        return {
            heightStr: '5',
            // height: 5,
            //error: null
        };
    },
    computed: {
        height: function () {
            return parseInt(this.heightStr);
        },
        rows: function() {
            return pyramidRows(this.height);
            // TODO 5
            // Fill out this computed property by calling
            // pyramidRows on this.height.
        },
        error: function() {
            return checkForErrors(this.heightStr);
        },
        // TODO 4 (and two other places: search for "TODO 4")
        // Make a new computed property 'error'.
        // It should be the result of calling checkForErrors on this.heightStr.
        // (Delete the error key from data once this is done)

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
    var heightNum = parseInt(heightStr);

    if (heightStr == '') {
        return 'Please enter a value';
    }
    if (isNaN(heightNum)) {
        return 'Please enter a number';
    }
    if (heightNum < 1 || heightNum > 100) {
        return 'Please enter a number between 1 and 100';
    }
    // no errors, so return null
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
