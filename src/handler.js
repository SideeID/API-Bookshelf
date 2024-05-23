const { nanoid } = require('nanoid');
const book = require('./book');

// handlerTambahBuku
const handlerTambahBuku = (request, h) => {
  const {
    name,
    author,
    year,
    publisher,
    summary,
    readPage,
    reading,
    pageCount,
  } = request.payload;

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message:
        'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const newBook = {
    id,
    name,
    author,
    year,
    summary,
    publisher,
    readPage,
    pageCount,
    reading,
    finished,
    insertedAt,
    updatedAt,
  };

  book.push(newBook);

  const isSuccess = book.filter((b) => b.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
    data: {
      bookId: id,
    },
  });
  response.code(500);
  return response;
};

// handler menampilkan semua buku
const getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;

  let filteredBooks = [...book];

  if (name) {
    filteredBooks = filteredBooks.filter((b) => b.name.toLowerCase().includes(name.toLowerCase()));
  }

  if (reading !== undefined) {
    filteredBooks = filteredBooks.filter(
      (b) => b.reading === (reading === '1'),
    );
  }

  if (finished !== undefined) {
    filteredBooks = filteredBooks.filter(
      (b) => b.finished === (finished === '1'),
    );
  }

  const response = h.response({
    status: 'success',
    data: {
      books: filteredBooks.map((b) => ({
        id: b.id,
        name: b.name,
        publisher: b.publisher,
      })),
    },
  });
  response.code(200);
  return response;
};

// handler menampilkan detail buku
const getBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const b = book.filter((n) => n.id === bookId)[0];

  if (b !== undefined) {
    return {
      status: 'success',
      data: {
        book: b,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

// handler edit buku
const editBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const {
    name,
    author,
    year,
    publisher,
    summary,
    readPage,
    reading,
    pageCount,
  } = request.payload;

  const updatedAt = new Date().toISOString();
  const index = book.findIndex((b) => b.id === bookId);

  if (index !== -1) {
    if (!name) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      });
      response.code(400);
      return response;
    }

    if (readPage > pageCount) {
      const response = h.response({
        status: 'fail',
        message:
          'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      });
      response.code(400);
      return response;
    }

    book[index] = {
      ...book[index],
      name,
      author,
      year,
      publisher,
      summary,
      readPage,
      pageCount,
      reading,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

// handler hapus buku
const deleteBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const index = book.findIndex((b) => b.id === bookId);

  if (index !== -1) {
    book.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  handlerTambahBuku,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};
