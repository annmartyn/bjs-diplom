'use strict';
let callback = method => response => (response.success) && method(response.data);
let logoutButton = new LogoutButton;
let ratesBoard = new RatesBoard;
let moneyManager = new MoneyManager;


logoutButton.action = () => ApiConnector.logout(callback(window.location.reload()));
ApiConnector.current(callback(ProfileWidget.showProfile));

function updateTable(data) {
    ratesBoard.clearTable();
    ratesBoard.fillTable(data);
};

let updateStocks = () => ApiConnector.getStocks(callback(updateTable));

setInterval(updateStocks, 60000);

moneyManager.addMoneyCallback = 