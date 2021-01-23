const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const art = require("ascii-art");


const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let teamMembers = [];

var arr = [];

//validation functions
function idValidate(num) {
    var found = false;
    for (var i = 0; i < arr.length; i++) {
       
        if (num == arr[i]) {
            found = true;
            return `Id already in use`
        }
    }
    return true;
}

function appMenu() {
    //ART ATTEMPT
    //art.font("Team Generator", "bold"[ "close"]);
    function createManager() {
        console.log("Please build your team");
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "What is your manager's name?",
                validate: function (managerName) {
                    if (/^[a-zA-Z]+$/.test(managerName)) {
                        return true;
                    } else {
                        return `Please enter a valid name`
                    }
                }
            },
            {
                type: "input",
                name: "managerId",
                message: "What is your manager's id?",
                validate: managerId => idValidate(managerId)
                
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is your manager's email?",
                validate: function (managerEmail) {
                    if (/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(managerEmail)) {
                        return true;
                    } else {
                        return `Please enter a valid email`
                    }
                }
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: "What is your manager's office number?",
                validate: managerOfficeNumber => isNaN(managerOfficeNumber) ? `Please enter a number` : true
            },
        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            arr.push(answers.managerId)
            console.log(manager);
            teamMembers.push(manager);
            chooseType();
        });
    }
    createManager();

    function chooseType() {
        inquirer.prompt([
            {
                type: "list",
                name: "employeeType",
                message: "Which type of team member would you like to add?",
                choices: [
                    'Engineer',
                    'Intern',
                    'I dont want to add anymore employees.'
                ]
                //validate user input here
            },
        ]).then(answers => {
            //const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            if (answers.employeeType == "Engineer") {
                console.log("Create Engineer");
                createEngineer();
            }
            else if (answers.employeeType == "Intern") {
                console.log("Create intern");
                createIntern();
            }
            else {
                console.log("Create file");
                console.log(render(teamMembers));
                var html = render(teamMembers);
                fs.writeFile("myTeam.html", html, function (err) {

                });
            }
        });
    }

    function createEngineer() {
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "What is your engineer's name?",
                validate: function (engineerName) {
                    if (/^[a-zA-Z]+$/.test(engineerName)) {
                        return true;
                    } else {
                        return `Please enter a valid name`
                    }
                }
            },
            {
                type: "input",
                name: "engineerId",
                message: "What is your engineer's id?",
                validate: engineerId => idValidate(engineerId)
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "What is your engineer's email?",
                validate: function (engineerEmail) {
                    if (/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(engineerEmail)) {
                        return true;
                    } else {
                        return `Please enter a valid email`
                    }
                }
            },
            {
                type: "input",
                name: "engineerOfficeNumber",
                message: "What is your github username?",
            },
        ]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerOfficeNumber);
            arr.push(answers.engineerId)
            console.log(engineer);
            teamMembers.push(engineer);
            chooseType();
        });
    }

    function createIntern() {
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "What is your intern's name?",
                validate: function (internName) {
                    if (/^[a-zA-Z]+$/.test(internName)) {
                        return true;
                    } else {
                        return `Please enter a valid name`
                    }
                }
            },
            {
                type: "input",
                name: "internId",
                message: "What is your intern's id?",
                validate: internId => idValidate(internId)
            },
            {
                type: "input",
                name: "internEmail",
                message: "What is your intern's email?",
                validate: function (internEmail) {
                    if (/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(engineerEmail)) {
                        return true;
                    } else {
                        return `Please enter a valid email`
                    }
                }
            },
            {
                type: "input",
                name: "internOfficeNumber",
                message: "What is your school name?",
                validate: function (internOfficeNumber) {
                    if (/^[a-zA-Z]+$/.test(internOfficeNumber)) {
                        return true;
                    } else {
                        return `Please enter a valid name`
                    }
                }
            },
        ]).then(answers => {
            const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internOfficeNumber);
            arr.push(answers.internId)
            console.log(intern);
            teamMembers.push(intern);
            chooseType();
        });
    }
}
appMenu();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
