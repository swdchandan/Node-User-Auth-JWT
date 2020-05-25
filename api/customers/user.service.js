const conn = require('../../config/database');


module.exports = {
    create: (data, callback) => {
        conn.query(
            `insert into registration(firstName, lastName, gender, email, password, mobileNo) 
            values(?,?,?,?,?,?)`,
            [
                data.firstName,
                data.lastName,
                data.gender,
                data.email,
                data.password,
                data.mobileNo
            ],
            (err, results, fields) =>{
                if(err){
                   return callback(err)
                }

                return callback(null, results)
            }
        )
    },

    getCustomers: callback =>{
        conn.query(
            `select id, firstName, lastName, gender, email, password, mobileNo from registration`,
            [],
            (err, results, fields) =>{
                if(err){
                   return callback(err);
                }

                return callback(null, results);
            }
        )
    },
    getCustomerById: (id, callback) =>{
        conn.query(
            `select id, firstName, lastName, gender, email, password, mobileNo from registration where id =?`,
            [id],
            (err, results, fields) =>{
                if(err){
                    return callback(err);
                }

                return callback(null, results[0])
            }
        )
    },

    updateCustomer : (data, callback) =>{
        conn.query(
            `update registration set firstName=?, lastName=?, gender=?, email=?, password=?, mobileNo=? where id=?`,
            [
                data.firstName,
                data.lastName,
                data.gender,
                data.email,
                data.password,
                data.mobileNo,
                data.id
            ],
            (err, results, fields) =>{
                if(err){
                    return callback(err);
                }

                return callback(null, results);
            }
        )
    },

    deleteCustomer : (data, callback) =>{
        conn.query(
            `delete from registration where id =?`,
            [data.id],
            (err, results, fields) =>{
                if(err) {
                    return callback(err);
                }

                return callback(results[0]);
            }
        );
    },

    getCustomerByEmail: (email, callback) =>{
        conn.query(
            `select * from registration where email = ?`,
            [email],
            (err, results, fields) =>{
                if(err){
                    return callback(err);
                }
                return callback(null, results[0]);
            }
        );
    }
};