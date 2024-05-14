const { configureStore } = require('@reduxjs/toolkit');
const calculateReducer = require('./calculate').default;

const store = configureStore({
  reducer: {
    calculate: calculateReducer
  }
});

module.exports = store;

module.exports.increment = require('./calculate').increment;
