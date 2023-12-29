

    document.addEventListener("DOMContentLoaded", async function () {
        try {
            // Отримання даних про користувачів
            const response = await fetch("https://jsonplaceholder.typicode.com/users");
            const users = await response.json();

            // Відображення користувачів у списку
            displayUsers(users);
        } catch (error) {
            console.error("Error fetching users:", error);
        }

        function displayUsers(users) {
            const userList = document.getElementById("userList");

            users.forEach(user => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `${user.id} - ${user.name} <a href="user-details.html?id=${user.id}">Details</a>`;
                userList.appendChild(listItem);

                // Додатковий запит для отримання повної інформації про користувача при кліку на посилання
                listItem.querySelector("a").addEventListener("click", async function (event) {
                    event.preventDefault();
                    try {
                        const userId = new URLSearchParams(window.location.search).get("id");
                        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
                        const userDetails = await response.json();
                        displayUserDetails(userDetails);
                    } catch (error) {
                        console.error("Error fetching user details:", error);
                    }
                });
            });
        }


        function displayUserDetails(userDetails) {
            const userDetailsContainer = document.getElementById("userDetails");

            // Ваш код для відображення повної інформації про користувача
            // Наприклад, можна використовувати document.createElement(), innerHTML, тощо
            if (!userDetails) {
                console.error("User details are missing or invalid");
                return;
            }

            // Добавление Geo, если это необходимо
            const geoInfo = userDetails.address && userDetails.address.geo ? userDetails.address.geo : 'N/A';
            userDetailsContainer.innerHTML = `
                  <p><strong>Name:</strong> ${userDetails.name}</p>
        <p><strong>Geo:</strong> ${geoInfo}</p>
        <p><strong>Email:</strong> ${userDetails.email}</p>`
        }
    })


