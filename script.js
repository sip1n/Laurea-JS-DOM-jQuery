const addForm = document.querySelector('#addForm');
const formInput = document.querySelector('#formInput');

const itemBoard = document.querySelector('#itemBoard');
const items = document.querySelectorAll('.taskItem');

window.addEventListener('load', () => {
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
addForm.addEventListener('submit', event => {
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
formInput.addEventListener('focus', () => {
    formInput.placeholder = 'Type here to add new..';
    formInput.classList.remove('text-bg-warning');
})


itemBoard.addEventListener('click', event => {
    const target = event.target;
    const targetNode = target.parentNode.parentNode;

    // Remove button functionality
    if (target.parentNode.classList.contains('removeBtn') === true) {
        //remove object from itemlist by filtering it and save it to localstorage 
        const filtereditemList = itemList.filter((item) => item.id !== parseInt(targetNode.id));
        itemList = filtereditemList;
        window.localStorage.setItem('item-list', JSON.stringify(itemList));
        targetNode.remove();
    }
    // done button functionality
    if (target.parentNode.classList.contains('doneBtn') === true) {
        //variable for selected node
        const selected = itemList.find(item => item.id === parseInt(targetNode.id));
        // check if task is done
        selected.isDone === true
            // if true set isDone to false and remove line through from text 
            ? (selected.isDone = false, target.parentNode.parentNode.classList.remove('text-decoration-line-through','text-success'))
            // if fales set is done to true and add line through to text
            : (selected.isDone = true, target.parentNode.parentNode.classList.add('text-decoration-line-through','text-success'));
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

    // first div that holds item
    const newDiv = document.createElement('div');
    newDiv.id = element.id;
    newDiv.classList.add('taskItem', 'd-flex');
    if (element.isDone === true) { newDiv.classList.add('text-decoration-line-through','text-success') }

    // done button => <button> <icon /> </button>
    const doneBtn = document.createElement('button');
    doneBtn.classList.add('doneBtn', 't-dark', 'button', 'border-0', 'ms-2', 'me-auto', 'mt-auto', 'mb-auto')
    doneBtn.type = 'button';
    doneBtn.title = 'Mark as Done';
    const checkIcon = document.createElement('i');
    checkIcon.classList.add('fa-regular', 'fa-check-circle', 'fa-xl');
    doneBtn.appendChild(checkIcon);

    // display task text from stored object => <h5> {item.text}
    const newTask = document.createElement('h5');
    newTask.classList.add('taskText', 'mt-auto', 'mb-auto', 'text-center', 'fs-5');
    newTask.innerText = element.text;

    // remove button => <button> <icon /> </button>
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('removeBtn', 't-dark', 'button', 'border-0', 'ms-auto', 'me-2', 'mt-auto', 'mb-auto')
    removeBtn.type = 'button';
    removeBtn.title = 'Remove';
    const xmarkIcon = document.createElement('i');
    xmarkIcon.classList.add('fa-regular', 'fa-circle-xmark', 'fa-xl');
    removeBtn.appendChild(xmarkIcon);

    // append buttons and task text inside of newDiv
    newDiv.appendChild(doneBtn);
    newDiv.appendChild(newTask);
    newDiv.appendChild(removeBtn);
    // append newDiv inside itemBoard
    document.querySelector('#itemBoard').appendChild(newDiv);

}

// Clear localStorage button
document.getElementById('removeAllButton').addEventListener("click", function () {
    localStorage.clear();
    console.log(`localstorage cleared! ${localStorage.length}`);
    itemBoard.innerHTML = '';
})