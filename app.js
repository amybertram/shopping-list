// Single state object
var state = {
    items: [{name: 'eggs', checked: true}, {name: 'carrots', checked: false}]
};


// State modification functions
function addItem (state, itemName) {
    state.items.push({
        name: itemName, 
        checked: false
    });
}


function deleteItems (state, itemIndex) {
    state.items.splice(itemIndex, 1);
}

function checkItem (state, itemIndex) {
    state.items[itemIndex].checked = !state.items[itemIndex].checked; 
}


// Render functions
function renderList (state, element) {
    var itemsHTML = state.items.map(function(item, index) {
        var className = "";
        if(item.checked) {
            className = "shopping-item__checked"
        }    
        return '<li data-index=' + index + '>' + 
            '<span class="shopping-item ' + className + '">' + 
            item.name + 
            '</span>' +
            '<div class="shopping-item-controls">' +
                '<button class="shopping-item-toggle">' +
                    '<span class="button-label">check</span>' +
                '</button>' +
                '<button class="shopping-item-delete">' +
                    '<span class="button-label">delete</span>' +
                '</button>' +
            '</div>' +
            '</li>';
    });
    element.html(itemsHTML);
}

// Event listeners

//Add Item
function doAddItem(){
    $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    var input = $(this).find('input[name=shopping-list-entry]').val();
    addItem(state, input);
    renderList(state, $('.shopping-list'));
    this.reset();
    });
}

//Check and Uncheck
function doCheckItem(){
    $('.shopping-list').on('click', '.shopping-item-toggle', function(event) {
    var itemIndex = $(this).closest("li").attr("data-index");
    checkItem(state, itemIndex)
    renderList(state, $('.shopping-list'));
    });

}

//Remove Items
function doRemoveItem(){
    $('.shopping-list').on('click', '.shopping-item-delete', function(event) {
    //$(this).closest("li").remove();
    var itemIndex = $(this).closest("li").attr("data-index");
    deleteItems(state, itemIndex);
    renderList(state, $('.shopping-list'));
    });
}

//Call Functions
$(function(){
    renderList(state, $('.shopping-list'));
    doAddItem();
    doCheckItem();
    doRemoveItem();
});
