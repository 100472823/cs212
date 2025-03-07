document.addEventListener("DOMContentLoaded", function () {
    let downloadCount = 0;

    $(document).ready(function() {
        let skillsArray = [];
    
        // Función para agregar habilidades a la lista y al array
        function addSkill() {
            const newSkill = $('#newSkillInput').val().trim();
    
           
            if (newSkill === '' || skillsArray.includes(newSkill)) {
                alert('Please enter a valid and unique skill.');
                return;
            }
    
            // Agregar la habilidad al array
            skillsArray.push(newSkill);
    
            // Renderizar la lista de habilidades actualizada
            updateSkillsList();
    
            // Limpiar el campo de entrada
            $('#newSkillInput').val('');
        }
    
        // Función para actualizar la lista de habilidades en la página
        function updateSkillsList() {
            $('#skillsList').empty(); // Limpiar la lista antes de volver a renderizarla
    
            // Iterar sobre el array de habilidades y mostrar cada habilidad en la lista
            for (let i = 0; i < skillsArray.length; i++) {
                const skillItem = $(`
                    <li>${skillsArray[i]} 
                        <button class="btn btn-sm btn-warning editSkill">Edit</button> 
                        <button class="btn btn-sm btn-danger removeSkill">Remove</button>
                    </li>
                `);
    
                // Agregar el elemento de habilidad a la lista
                $('#skillsList').append(skillItem);
    
                // Edit Skill Event
                skillItem.find('.editSkill').click(function() {
                    const newSkillName = prompt('Edit skill:', skillsArray[i]);
                    if (newSkillName && !skillsArray.includes(newSkillName)) {
                        skillsArray[i] = newSkillName;
                        updateSkillsList();
                    } else {
                        alert('Please enter a unique skill.');
                    }
                });
    
                // Remove Skill Event
                skillItem.find('.removeSkill').click(function() {
                    // Eliminar la habilidad del array
                    skillsArray.splice(i, 1);
                    // Eliminar del DOM con animación
                    skillItem.slideUp(function() {
                        $(this).remove();
                    });
                });
            }
        }
    
        // Función para limpiar todos los campos de entrada
        function clearInputs() {
            $('#newSkillInput').val(''); // Limpiar el campo de entrada de habilidades
            $('#skillCategory').val('To-Do'); // Resetear el dropdown de categoría
        }
    
        // Escuchar eventos de teclado en el campo de entrada de habilidades
        $('#newSkillInput').keydown(function(event) {
            if (event.key === "Enter") {
                // Si se presiona "Enter", agregar la habilidad
                event.preventDefault(); // Prevenir el comportamiento predeterminado
                addSkill();
            } else if (event.key === "Escape") {
                // Si se presiona "Escape", limpiar los campos de entrada
                clearInputs();
            }
        });
    
        // Funcionalidades adicionales para el botón "Add Skill"
        $('#addSkillBtn').click(function() {
            addSkill();
        });
    
        // Actualiza la lista al cargar por primera vez
        updateSkillsList();
    });


    $(document).ready(function() {
        // Array to store navigation items and corresponding section IDs
        const navItems = [
            { name: 'Summary', sectionId: '#Summary' },
            { name: 'Projects', sectionId: '#projects' },
            { name: 'Skills', sectionId: '#skills' },
            { name: 'Education', sectionId: '#Education' },
            { name: 'Contact', sectionId: '#Contact' }
        ];
    
        // Dynamically render the navigation menu
        navItems.forEach(function(item) {
            const navItem = $(`<li class="nav-item"><a class="nav-link" href="#">${item.name}</a></li>`);
            
            // Append each navigation item to the navbar
            $('.navbar-nav').append(navItem);
    
            // Add click event for smooth scrolling
            navItem.find('a').click(function(event) {
                event.preventDefault(); // Prevent default anchor click behavior
    
                // Use jQuery's animate function to scroll smoothly to the corresponding section
                $('html, body').animate({
                    scrollTop: $(item.sectionId).offset().top - 50 // Adjust the offset for navbar height
                }, 800); // Duration in milliseconds
            });
        });
    });






    $(document).ready(function() {
        const projects = [
            {
                title: 'Autonomous Car Control System',
                description: 'Created a fully functional robot able to detect and avoid obstacles autonomously using C.',
                deadline: new Date("2023-12-15"),
                imageURL: 'https://raw.githubusercontent.com/100472823/cs212/f92bea0a5ba76c8fdce62da149db5c0f6d53d4e3/1701430522287.jpg'
            },
            {
                title: 'Demon Protocol Tower',
                description: 'Team Leader in the development of an IP protocol tower using various network protocols.',
                deadline: new Date("2022-11-01"),
                imageURL: 'https://raw.githubusercontent.com/100472823/cs212/main/1706565044065.jpg'
            },
            {
                title: 'Safe Female App',
                description: 'Developed an Android app that helps women alert emergency services.',
                deadline: new Date("2021-09-01"),
                imageURL: 'https://raw.githubusercontent.com/100472823/cs212/main/1715089804035.jpg'
            }
        ];
    
        let isAscending = true; // Toggle between ascending and descending order
    
        // Function to render projects dynamically
        function renderProjects() {
            const projectsList = $('#projectsList');
            projectsList.empty(); // Clear the existing list
    
            const currentDate = new Date(); // Get current date to compare deadlines
    
            // Use a standard 'for' loop to iterate over the projects array
            for (let i = 0; i < projects.length; i++) {
                const project = projects[i];
                const status = project.deadline < currentDate ? "Completed" : "Ongoing";
    
                const projectCard = $(`
                    <div class="col-md-4">
                        <div class="card mb-4">
                            <img src="${project.imageURL}" class="card-img-top" alt="Project Image">
                            <div class="card-body">
                                <h5 class="card-title">${project.title}</h5>
                                <p class="card-text">${project.description}</p>
                                <p class="card-text"><strong>Deadline:</strong> ${project.deadline.toDateString()}</p>
                                <p class="card-text"><strong>Status:</strong> ${status}</p>
                            </div>
                        </div>
                    </div>
                `);
    
                // Append each project card to the project list
                projectsList.append(projectCard);
            }
        }
    
        // Function to sort projects by deadline
        function sortProjectsByDeadline() {
            projects.sort(function(a, b) {
                return isAscending ? a.deadline - b.deadline : b.deadline - a.deadline;
            });
    
            isAscending = !isAscending; // Toggle the sorting order for the next click
    
            // Re-render the projects after sorting
            renderProjects();
        }
    
        // Bind the sort button to the sort function
        $('#sortBtn').click(function() {
            sortProjectsByDeadline();
        });
    
        // Initial rendering of projects
        renderProjects();
    });
  
    window.handleDownloadAndGreet = function () {
        trackResumeDownload();
        sendGreeting();
    };

    
    function trackResumeDownload() {
        downloadCount++;
        document.getElementById("downloadCount").textContent = `Resume downloaded ${downloadCount} times`;
    }

    // Function to send a personalized greeting
    function sendGreeting() {
        const nameInput = document.getElementById("nameInput").value;
        const greetingMessage = document.getElementById("greetingMessage");
        if (nameInput.trim() !== "") {
            greetingMessage.textContent = `Hello, ${nameInput}! Thank you for downloading my resume.`;
        } else {
            greetingMessage.textContent = "Please enter your name to receive a greeting!";
        }
    }


    
  
const educationData = [
    { institution: "Carlos III University, Leganés, Madrid", degree: "BS, Telecommunications Engineering", GPA: "3.3", duration: "4 Years" },
    { institution: "Northern Arizona University, Flagstaff, Arizona", degree: "Studied Computer Engineering", GPA: "N/A", duration: "Exchange Year" }
];



// Función para generar dinámicamente la tabla de educación
const educationTableBody = document.querySelector("#educationTable tbody");

educationData.forEach(function (education) {
    const row = document.createElement("tr");  // Crea una nueva fila
    row.innerHTML = `
        <td>${education.institution}</td>
        <td>${education.degree}</td>
        <td>${education.GPA}</td>
        <td>${education.duration}</td>
    `;
    educationTableBody.appendChild(row);  // Añade la fila a la tabla
});

});
