const fs = require("fs");
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

function listContacts() {
  // асинхронное чтение
  fs.readFile(contactsPath, "utf8", function (error, data) {
    if (error) throw error; // если возникла ошибка
    console.table(JSON.parse(data)); // выводим считанные данные
  });
}

function getContactById(contactId) {
  // асинхронное чтение
  fs.readFile(contactsPath, "utf8", function (error, data) {
    if (error) throw error; // если возникла ошибка
    console.table(JSON.parse(data).find(({ id }) => id === contactId)); // выводим считанные данные
  });
}

function removeContact(contactId) {
  // асинхронное чтение
  fs.readFile(contactsPath, "utf8", function (error, data) {
    if (error) throw error; // если возникла ошибка
    newContent = JSON.parse(data).filter(({ id }) => id !== contactId);
    fs.writeFile(contactsPath, JSON.stringify(newContent), function (error) {
      if (error) throw error; // если возникла ошибка
      console.log(`Успешное удаление контакта ${contactId}`);
    });
  });
}

function addContact(name, email, phone) {
  // асинхронное чтение
  fs.readFile(contactsPath, "utf8", function (error, data) {
    if (error) throw error; // если возникла ошибка
    //поиск ид с наибольшим номером
    let max = JSON.parse(data).reduce((acc, curr) =>
      acc.id > curr.id ? acc : curr
    );
    //добавление контакта
    newContent = JSON.parse(data);
    newContent.push({ id: max.id + 1, name, email, phone });
    fs.writeFile(contactsPath, JSON.stringify(newContent), function (error) {
      if (error) throw error; // если возникла ошибка
      console.log(`Успешное добавление контакта ${max.id + 1}`);
    });
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
