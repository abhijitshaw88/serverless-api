var mySql = require('promise-mysql');

//Add configuration
const config ={
    host: "",
    user: "",
    password: "",
    database: ""
}      

exports.createStudents = async (event) =>{
    let body=JSON.parse(event.body);
    
    console.log(event,body)
    let conn;
    try{
        conn = await mySql.createConnection(config);
        let sql=`Insert into abhijit_students (student_fullname, student_class,student_rollno) values ("${body.name}",${body.class},${body.roll_no})`;
        let result=await conn.query(sql);
        return {
            statusCode: 200,
            body: JSON.stringify("Record added successfully"),
        }
    }catch{
     return {
            statusCode: 400,
            body: JSON.stringify("Pass valid values"),
        }   
    }finally{
        if(conn){
           await conn.end();
        }
    }
}

exports.getStudents = async () => {
    let res=null;
    // res=await mySql.createConnection(config)
    // .then(conn => {
    //     let sql=`select * from abhijit_students`;
    //     let result = conn.query(sql)
    //     .then(function(data) {
    //         return data;
    //     })
    //     conn.end();
    //     return result;
    // })
    // .catch(err => {
    // console.log("not connected " + err);
    // });
    let result;
    console.log(config);
    let conn;
    try{
         conn=await mySql.createConnection(config);
        let sql=`select * from abhijit_students`;
        result = await conn.query(sql);
        const response = {
            statusCode: 200,
            body: JSON.stringify(result),
        };
        return response;
    }catch(err){
        // console.log(err);
        return  {
            statusCode: 400,
            body: JSON.stringify(err),
        };
    }finally{
        if(conn){ 
            await conn.end();
        }
    }
}

exports.getStudentById = async (event) =>{
    let conn,result;
    try{
        conn=await mySql.createConnection(config);
        let sql=`select * from abhijit_students where student_id=${event.pathParameters.student_id}`;
        result = await conn.query(sql);
        return  {
        statusCode: 200,
        body: JSON.stringify(result),
        };
    } catch (error) {
        console.log(error);
         return {
            statusCode: 400,
            body: JSON.stringify(error),
        };
    }finally{
        if(conn){ 
            await conn.end();
        }
    }   
}


exports.updateStudentById = async (event) => {
    console.log(event);
    let body=JSON.parse(event.body);
    let conn;
    try {
        conn = await mySql.createConnection(config);
        let sql=`update abhijit_students set student_fullname="${body.name}",student_class=${body.class},student_rollno=${body.roll_no} where  student_id=${event.pathParameters.student_id}`;
        let response = await conn.query(sql);
        return {
            statusCode: 200,
            body: JSON.stringify(response),
        } 
    } catch (error) {
        console.log(error);
        return {
            statusCode: 400,
            body: JSON.stringify(error),
        } 
    }finally{
        if(conn){
            await conn.end();
        }
    }
}

exports.deleteStudentById = async (event) => {
    let result;
    let conn;
    console.log('event', event)
    try{
        conn=await mySql.createConnection(config);
        let sql=`DELETE FROM abhijit_students WHERE student_id = ${event.pathParameters.student_id}`;
        result = await conn.query(sql);
        const response = {
            statusCode: 200,
            body: JSON.stringify("Deleted Successfully"),
        };
        return response;
    }catch(err){
        console.log(err);
        return  {
            statusCode: 400,
            body: JSON.stringify(err),
        };
    }finally{
        if(conn){ 
            await conn.end();
        }
    }
}