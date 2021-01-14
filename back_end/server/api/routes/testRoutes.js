const calendars = require('../controllers/testController');
module.exports = app => {
    app
        .route('/calendar')
        .get(calendars.list_all_tests)
        .post(calendars.create_a_test);
    app
        .route('/calendar/:id')
        .get(calendars.read_a_test)
        .put(calendars.update_a_test)
        .delete(calendars.delete_a_test);
};