const addForm = $('#addForm')[0];
const formInput = $('#formInput')[0];
const itemBoard = $('#itemBoard')[0];
const items = $('.taskItem');

$(window).on('load', () => {
    listInit(itemBoard);
})

function listInit(i) {
    //function to check localStorage

    if (localStorage.getItem('item-list') === null) {
        // create new global variable if localStorage == null
        itemList = [];
        i.innerHTML = '';
    } else {
        //if there is key in localstorage => parse it to array of objects
        itemList = JSON.parse(localStorage.getItem('item-list'));
    };
    //then generate html with buildItem() function for each object in that array
    itemList.forEach(element => {
        buildItem(element);
    });

}


// listen for submit event on addForm
$('#addForm').submit(event => {
    //prevent form from submitting 
    event.preventDefault();

    // check if input has as over 3 and under 20 characters
    if (formInput.value.length >= 3 && formInput.value.length <= 20) {
        // if true then add new task and clear inputfield 
        addTask();
        formInput.value = '';
    } else {
        // if false then clear inputfield
        formInput.value = '';
        // change placeholder to inform that it must have 3-20 characters and change backgroundcolor to warning(yellow)
        formInput.placeholder = 'Must have 3-20 letters';
        formInput.classList.add('text-bg-warning');
        // timeout for 3 sec and then change placeholder back to "Type here to add new.." and remove warning background color
        setTimeout(() => {
            formInput.placeholder = 'Type here to add new..';
            formInput.classList.remove('text-bg-warning');
        }, 3000);
    }
})

// revert inputfield back to normal if user clicks it faster than 3 sec timeout
$('#formInput').focus(() => {
    $('#formInput').attr('placeholder', 'Type here to add new..');
    $('#formInput').removeClass('text-bg-warning');
})


$('#itemBoard').click(event => {
    const target = event.target;
    const targetNode = target.parentNode.parentNode;

    // Remove button functionality
    if (target.parentNode.classList.contains('removeBtn') === true) {
        //remove object from itemlist by filtering it and save it to localstorage 
        const filtereditemList = itemList.filter((item) => item.id !== parseInt(targetNode.id));
        itemList = filtereditemList;
        window.localStorage.setItem('item-list', JSON.stringify(itemList));
        // fade element out in 500 ms and then remove it
        $(targetNode).fadeOut(500, () => {$(targetNode).remove();});
        
    }
    // done button functionality
    if (target.parentNode.classList.contains('doneBtn') === true) {
        //variable for selected node
        const selected = itemList.find(item => item.id === parseInt(targetNode.id));
        // check if task is done
        selected.isDone === true
            // if true set isDone to false and remove line through from text 
            ? (selected.isDone = false, target.parentNode.parentNode.classList.remove('text-decoration-line-through', 'text-success'))
            // if fales set is done to true and add line through to text
            : (selected.isDone = true, target.parentNode.parentNode.classList.add('text-decoration-line-through', 'text-success'));
        window.localStorage.setItem('item-list', JSON.stringify(itemList));

    }

})

//function to add new object to array and save it to localstorage
addTask = function () {
    const item = {
        id: Date.now(),
        text: formInput.value,
        isDone: false
    };
    itemList.push(item);
    buildItem(item);
    window.localStorage.setItem('item-list', JSON.stringify(itemList));
}

//this function generates html elements  object it gets as input
function buildItem(element) {
    // item layout in order || done button - task text - remove button ||

    // create div element with id and classes and add it to FIRST item on itemBoard
    $('<div id="' + element.id + '"></div>').prependTo($('#itemBoard')[0])
        .addClass('taskItem d-flex')

    // add buttons and text to div element
    const doneBtn = $('<button></button>').appendTo('#' + element.id)
        .addClass('doneBtn t-dark button border-0 ms-2 me-auto mt-auto mb-auto')
        .attr('type', 'button')
        .attr('title', 'Done')

    $('<i></i>').appendTo(doneBtn)
        .addClass('fa-regular fa-check-circle fa-xl')

    $('<h5>' + element.text + '</h5>').appendTo('#' + element.id)
        .addClass('taskText mt-auto mb-auto text-center fs-5')

    const removeBtn = $('<button></button>').appendTo('#' + element.id)
        .addClass('removeBtn t-dark button border-0 ms-auto me-2 mt-auto mb-auto')
        .attr('type', 'button')
        .attr('title', 'Remove')

    $('<i></i>').appendTo(removeBtn)
        .addClass('fa-regular fa-circle-xmark fa-xl')


}

// Clear localStorage button
document.getElementById('removeAllButton').addEventListener("click", function () {
    localStorage.clear();
    console.log(`localstorage cleared! ${localStorage.length}`);
    itemBoard.innerHTML = '';
})