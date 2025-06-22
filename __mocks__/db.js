module.exports = {
  query: jest.fn((sql, values, callback) => {
    if (sql.includes('SELECT')) {
      callback(null, [{ id: 1, name: 'MockUser', email: 'mock@example.com' }]);
    } else if (sql.includes('INSERT')) {
      callback(null, { insertId: 2 });
    } else if (sql.includes('UPDATE')) {
      callback(null, { affectedRows: 1 });
    } else if (sql.includes('DELETE')) {
      callback(null, { affectedRows: 1 });
    }
  })
};
