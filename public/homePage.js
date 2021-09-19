'use strict';
let callback = method => response => (response.success) && method(response.data);
let logoutButton = new LogoutButton;
let ratesBoard = new RatesBoard;
let moneyManager = new MoneyManager;
let favoritesWidget = new FavoritesWidget;


logoutButton.action = () => ApiConnector.logout(callback(window.location.reload()));
ApiConnector.current(callback(ProfileWidget.showProfile));
ApiConnector.getFavorites(callback(updateFavorites));

function updateTable(data) {
    ratesBoard.clearTable();
    ratesBoard.fillTable(data);
};

function updateFavorites(data) {
    favoritesWidget.clearTable(data);
    favoritesWidget.fillTable(data);
    moneyManager.updateUsersList(data);
}

let updateStocks = () => ApiConnector.getStocks(callback(updateTable));

setInterval(updateStocks, 60000);

moneyManager.addMoneyCallback = data => ApiConnector.addMoney(data, response => {
    if (response.success) {
        moneyManager.setMessage(response.success, 'Balance was replenished successfully');
    } else {
        moneyManager.setMessage(!response.success, 'Произошла ошибка: ' + '${response.error}');
    }
});

moneyManager.conversionMoneyCallback = data => ApiConnector.convertMoney(data, response => {
    if (response.success) {
        moneyManager.setMessage(response.success, 'Money were converted successfully');
    } else {
        moneyManager.setMessage(!response.success, 'Произошла ошибка: ' + '${response.error}');
    }
});

moneyManager.sendMoneyCallback = data => ApiConnector.transferMoney(data, response => {
    if (response.success) {
        moneyManager.setMessage(response.success, 'Money were sent successfully');
    } else {
        moneyManager.setMessage(!response.success, 'Произошла ошибка: ' + '${response.error}');
    }
});

favoritesWidget.addUserCallback = data => ApiConnector.addUserToFavorites(data, response => {
    if (response.success) {
        favoritesWidget.setMessage(response.success, 'User was added successfully');
        ApiConnector.getFavorites(callback(updateFavorites));
    } else {
        favoritesWidget.setMessage(!response.success, 'Произошла ошибка: ' + '${response.error}');
    }
});

favoritesWidget.removeUserCallback = data => ApiConnector.removeUserFromFavorites(data, response => {
    if (response.success) {
        favoritesWidget.setMessage(response.success, 'User was removed successfully');
        ApiConnector.getFavorites(callback(updateFavorites));
    } else {
        favoritesWidget.setMessage(!response.success, 'Произошла ошибка: ' + '${response.error}');
    }
});