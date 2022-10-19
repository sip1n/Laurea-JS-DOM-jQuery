const addForm = document.querySelector('#addForm');
const formInput = document.querySelector('#formInput');

const itemBoard = document.querySelector('#itemBoard');
const items = document.querySelectorAll('.taskItem');

window.addEventListener('load', e =>{
    
    // local storage check
    
    displayList(itemBoard);
})

addForm.addEventListener('submit', event => {
    //prevent form submit
    event.preventDefault();
    if (formInput.value.length >= 3) {addTask();};
    formInput.value = '';
})

window.addEventListener('click', e => {
    console.log(e.target.parentNode);
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
};

function buildItem(element) {
    // item layout in order || tone button - task text - remove button ||
        
        // first div that holds item
        const newDiv = document.createElement('div');
        newDiv.id = element.id;
        newDiv.classList.add('taskItem','d-flex'); 
        
        // done button => <button> <icon /> </button>
        const doneBtn = document.createElement('button');
        doneBtn.classList.add('t-dark','button','border-0','ms-2','me-auto','mt-auto','mb-auto')
        doneBtn.type = 'button';
        doneBtn.title = 'Mark as Done';
        const checkIcon = document.createElement('i');
        checkIcon.classList.add('fa-regular','fa-check-circle','fa-xl');
        doneBtn.appendChild(checkIcon);
        
        // display task text from stored object => <h5> {item.text}
        const newTask = document.createElement('h5');
        newTask.classList.add('taskText','mt-auto','mb-auto','text-center','fs-5');
        newTask.innerText = element.text;
        
        // remove button => <button> <icon /> </button>
        const removeBtn = document.createElement('button');
        removeBtn.classList.add('t-dark','button','border-0','ms-auto','me-2','mt-auto','mb-auto')
        removeBtn.type = 'submit';
        removeBtn.title = 'Remove';
        const xmarkIcon = document.createElement('i');
        xmarkIcon.classList.add('fa-regular','fa-circle-xmark','fa-xl');
        removeBtn.appendChild(xmarkIcon);
        
        newDiv.appendChild(doneBtn);
        newDiv.appendChild(newTask);
        newDiv.appendChild(removeBtn);
        
        document.querySelector('#itemBoard').appendChild(newDiv);
    
}

//function to build HTML to show all items on list
function displayList(i) {

    if (localStorage.getItem('item-list') === null) {
        itemList = [];
        i.innerHTML = '';
    } else {
        itemList = JSON.parse(localStorage.getItem('item-list'));
    };
    
    itemList.forEach(element => {
        buildItem(element);
    });

};

// Clear localStorage button
document.getElementById('removeAllButton').addEventListener("click", function () {
    localStorage.clear();
    console.log(`localstorage cleared! ${localStorage.length}`);
    displayList(itemBoard);
});