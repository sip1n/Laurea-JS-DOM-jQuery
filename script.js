const addForm = document.querySelector('#addForm');
const formInput = document.querySelector('#formInput');

const itemBoard = document.querySelector('#itemBoard');
const items = document.querySelectorAll('.taskItem');

window.addEventListener('load', e => {
    listInit(itemBoard);
})

//function to check localStorage and create new global variable if localStorage == null
//if there is key in localstorage => parse it to array of objects
//then generate html with buildItem() function for each object in that array
function listInit(i) {

    if (localStorage.getItem('item-list') === null) {
        itemList = [];
        i.innerHTML = '';
    } else {
        itemList = JSON.parse(localStorage.getItem('item-list'));
    };

    itemList.forEach(element => {
        buildItem(element);
    });

}

addForm.addEventListener('submit', event => {
    //prevent form from submitting 
    event.preventDefault();
    if (formInput.value.length >= 3) { addTask(); };
    formInput.value = '';
})

itemBoard.addEventListener('click', e => {
    const target = e.target;
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
        ? (selected.isDone = false, target.parentNode.parentNode.classList.remove('text-decoration-line-through')) 
        // if fales set is done to true and add line through to text
        : (selected.isDone = true, target.parentNode.parentNode.classList.add('text-decoration-line-through'));
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


//this funktion generates html elements  object it gets as input
function buildItem(element) {
    // item layout in order || tone button - task text - remove button ||

    // first div that holds item
    const newDiv = document.createElement('div');
    newDiv.id = element.id;
    newDiv.classList.add('taskItem', 'd-flex');
    if(element.isDone === true){newDiv.classList.add('text-decoration-line-through')}

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

    newDiv.appendChild(doneBtn);
    newDiv.appendChild(newTask);
    newDiv.appendChild(removeBtn);

    document.querySelector('#itemBoard').appendChild(newDiv);

}

// Clear localStorage button
document.getElementById('removeAllButton').addEventListener("click", function () {
    localStorage.clear();
    console.log(`localstorage cleared! ${localStorage.length}`);
    itemBoard.innerHTML = '';
})