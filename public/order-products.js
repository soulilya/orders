/**
 * Функции для обработки динамического поведения формы заказов
 */

function addRow() {
    let inputRow = document.querySelector('.inputRow');
    let cloned = inputRow.cloneNode(true);

    let productsTable = document.querySelector('#products');
    productsTable.appendChild(cloned);
}

function removeRow(elem) {
    let productsTable = document.querySelector('#products');
    let inputRow = document.querySelectorAll('.inputRow');

    if(inputRow.length > 1)
    {
        productsTable.deleteRow(elem.parentNode.parentNode.rowIndex);
    }
}
