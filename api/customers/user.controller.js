const {create, getCustomers, getCustomerById,updateCustomer, deleteCustomer,getCustomerByEmail} = require("./user.service");
const {genSaltSync, hashSync, compareSync} = require('bcrypt');
const {sign} = require('jsonwebtoken');

module.exports ={
    createCustomer : (req, res) =>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, results) =>{
            if(err){
                return res.status(500).json({
                    success : 0,
                    message : "Database connection error!"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    getCustomers : (req, res) =>{
        getCustomers((err, results) =>{
            if(err) {
                return console.log(err);
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getCustomerById :(req, res) =>{
        const id = req.params.id;
        getCustomerById(id,(err, results) =>{
            if(err) {
                return console.log(err)
            }
            if(!results) {
                return res.json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },

    updateCustomer : (req, res) =>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateCustomer(body, (err, results) =>{
            if(err){
                return console.log(err);
            }
            if(!results){
                return res.json({
                    success : 0,
                    message : "Failed to updated customer"
                }); 
            }
            return res.json({
                success : 1,
                message : "updated successfully"
            });
        });
    },

    deleteCustomer : (req,res) =>{
        const data = req.body;
        deleteCustomer(data, (err, results) =>{
            if(err){
                return console.log(err);
            }
            return res.json({
                success : 1,
                message: "Customer deleted successfully!"
            })
        })
    },
    login: (req, res) =>{
        const body = req.body;
        getCustomerByEmail(body.email, (err, results) =>{
            if(err){
               return console.log(err)
            }
            if(!results){
                return res.json({
                    success: 0,
                    message : "Invalid email or password!"
                })
            }
            const result = compareSync(body.password, results.password);
            if(result){
                results.password = undefined;
                const jsontoken = sign({result: results}, "chk123", {
                    expiresIn : '1h'
                });
                return res.json({
                    success : 1,
                    message: "Login successfully",
                    token : jsontoken
                });
            }else{
                return res.json({
                    success :0,
                    message : "Invalid email or password!"
                });
            }
        });
    }

}