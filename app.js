// Single state object
var state = {
    items: ['eggs', 'apple', 'juice']
};


// State modification functions
function addItem (state, item) {
    state.items.push(item);
}


function deleteItems (state, itemIndex) {
    state.items.splice(itemIndex, 1);
}


// Render functions
function renderList (state, element) {
    var itemsHTML = state.items.map(function(item, index) {
        return '<li data-index=' + index + '>' +
            '<span class="shopping-item">' + 
            item + 
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
    console.log(itemsHTML);
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
    });
}

//Check and Uncheck
function doCheckItem(){
    $('.shopping-list').on('click', '.shopping-item-toggle', function(event) {
    $(this).closest("li").toggleClass("shopping-item__checked");
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
