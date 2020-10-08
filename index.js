var mysql = require('mysql2');
const connection = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: 'Shubham@23',
    database: 'nodeSQL',
    


});



connection.connect(function(error) {
    if(error) throw error;
    console.log('You are now Connected...');
});


//to insert record into mysql
connection.query('INSERT INTO `employee` (`employee_name`, `employee_salary`, `employee_age`) VALUES ("Adam", 2000 , 30)', function (error, results, fields) {
    if (error) throw error;
    console.log('The response is: ', results);
  });

//to update record into mysql
connection.query('UPDATE `employee` SET `employee_name`="William",`employee_salary`=2500,`employee_age`=32 where `id`=1', function (error, results, fields) {
    if (error) throw error;
    console.log('The response is: ', results);
  });


  //to update record into mysql
connection.query('UPDATE `employee` SET `employee_name`="William",`employee_salary`=2500,`employee_age`=32 where `id`=1', function (error, results, fields) {
    if (error) throw error;
    console.log('The response is: ', results);
  });

//delete record from mysql database
connection.query('delete from employee where id=1', function (error, results, fields) {
    if (error) throw error;
    console.log('The response is: ', results);
  });

connection.end();