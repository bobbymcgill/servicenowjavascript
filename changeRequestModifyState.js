var changeRequestModifyState = Class.create();
changeRequestModifyState.prototype = {
    initialize: function() {},

    // Update parameter from 'chgList' to 'changeNumbers', this helps clarify what the parameter represents
    modifyChanges: function (changeNumbers, state) {
        var validStates = ['-5', '-4', '-3', '-2', '-1', '0', '3', '4'];
        try {
            // Abort early if the state is not valid, avoid nesting further logic
            if (!validStates.includes(state.toString())) {
                throw new Error('Invalid State: ' + state);
            }

            var regex = /[\n,\t]+/; // Split on newlines, commas, or tabs
            var changeNumberList = changeNumbers.split(regex).join(',');

            var changeRequestGr = new GlideRecord('change_request');
            changeRequestGr.addQuery('number', 'IN', changeNumberList);
            changeRequestGr.query();

            // Store the result of .getRowCount(), we're going to use it more than once
            var rowCount = changeRequestGr.getRowCount();
            // If there are no results, throw an error and let the user know
            if (rowCount === 0) {
                // An error is an Object and requires initialization
                throw new Error('No change records found for the provided numbers: ' + changeNumbers);
            // Negate the condition to avoid nesting
            } else if (rowCount !== changeNumberList.split(',').length) {
                throw new Error('Mismatch in number of change records found. Expected: ' + changeNumberList.split(',').length + ', Found: ' + rowCount);
            }

            // If we've made it this far, we've passed all preconditions and can continue with the update
            while (changeRequestGr.next()) {
                changeRequestGr.state = state;
                changeRequestGr.setWorkflow(false);
                changeRequestGr.update();
            }

            return rowCount + ' records updated successfully';
        } catch (error) {
            // NOTE: 'error' is an object with properties like 'message', 'name', etc.
            return 'Error: ' + error.message;
        }
    },


    type: 'changeRequestModifyState'
};