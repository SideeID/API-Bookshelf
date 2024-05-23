const {
  handlerTambahBuku,
  deleteBookByIdHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
} = require('./handler');

const route = [
  {
    method: 'GET',
    path: '/',
    handler: () => 'Hello World!',
  },
  {
    method: 'POST',
    path: '/books',
    handler: handlerTambahBuku,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookByIdHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookByIdHandler,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: editBookByIdHandler,
  },
];

module.exports = route;
