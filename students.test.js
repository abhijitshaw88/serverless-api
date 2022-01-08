let studentData ={
    body : JSON.stringify({
        name:"S.Kant",
        class:"111",
        roll_no:22
    })
}
const students = require('./students');
// students.createStudents(studentData);
async function test(){
    try {
        let data=await students.createStudents(studentData);
        console.log(data);   
    } catch (error) {
        console.log(error);
    }
}
test();