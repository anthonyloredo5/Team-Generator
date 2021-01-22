// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require('./Employee');

class Engineer extends Employee {
    //new constructor
    constructor(name, id, email, github){
        //brings in employee parameters
        super(name, id, email);
            this.github = github;
        
    }

    getRole(){
        return "Engineer";
    }

    getGithub(){
        return this.github;
    }
}
module.exports = Engineer;