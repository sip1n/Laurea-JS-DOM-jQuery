
//--- Variables here ---//

var newItem;
const listItem = new Array();



//--- Functions here ---//

// Created a function to clear value by id to make things easier to read
function clearValueById(a) {
    document.getElementById(a).value = '';
}



//--- Program here ---//

// Listen for browser window to load all DOM content and execute javascript
window.addEventListener('DOMContentLoaded', () => {


    // Log to console that DOM content has loaded
    console.log('DOMContentLoaded and parsed');


    // Listen if inputfield gets focus and clears "New.."-text for user input
    document.getElementById('addTodo').addEventListener("focus", clearValueById('addTodo'));



    document.getElementById('addForm').addEventListener('submit', function(event) {

        event.preventDefault();
        
        

        localStorage.setItem(listItem.length++, document.getElementById('addTodo').value);
        

        console.log(localStorage);
        console.log('Add Button');


        clearValueById('addTodo');
    });


    // Mark task as done button        
    //                          --debugging ATM as log localstorage to console
    document.getElementById('doneButton').addEventListener("click", function() {

        console.log(localStorage);
        console.log('Done Button');

    });


    // Remove task button
    document.getElementById('removeButton').addEventListener("click", function() {
        
        console.log('Remove Button');

    });


    // Clear localStorage button
    document.getElementById('removeAllButton').addEventListener("click", function() {
        localStorage.clear();
        console.log(localStorage);
        console.log('localStorage cleared');

    });



});