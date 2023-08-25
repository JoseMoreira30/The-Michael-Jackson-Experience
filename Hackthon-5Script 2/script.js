document.addEventListener("DOMContentLoaded", () => {
    const appContainer = document.getElementById("app");
    const loginContainer = document.getElementById("login-container");
    const logoutContainer = document.getElementById("logout-container"); 
    const createPostButton = document.getElementById("create-post-button");
    const logoutButton = document.getElementById("logout-button");
    const cachedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));


    appContainer.addEventListener("click", (event) => {
        const target = event.target;
        if (target.classList.contains("post-title")) {
            const postId = target.dataset.postId;
            renderPostView(postId);
        }
        
    });


function renderLoginForm() {
    loginContainer.innerHTML = `
        <h2>Login</h2>
        <form id="login-form">
            <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" id="username" class="form-control" required>
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
        </form>
    `;

    const loginForm = loginContainer.querySelector("#login-form");
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const username = document.getElementById("username").value;
        if (username) {
            currentUser = username;
            localStorage.setItem("currentUser", JSON.stringify(currentUser));
            renderNavigationBar();
            renderPosts(cachedPosts);
            loginForm.style.display = "none"; 
            loginContainer.innerHTML = "";
        }
    });
    createPostButton.style.display = "none";
    logoutButton.style.display = "none";

}

function renderPostsAndUsernameDisplay() {
    renderNavigationBar();
        renderUsernameDisplay(currentUser);
    renderPosts(cachedPosts);
}

function renderNavigationBar() {
    createPostButton.style.display = "block";
    logoutButton.style.display = "block";
}
createPostButton.addEventListener("click", () => {
    renderCreatePostView();
});

logoutButton.addEventListener("click", () => {
    localStorage.removeItem("currentUser");
    location.reload(); 
});



function renderUsernameDisplay(username) {
    const usernameDisplay = document.createElement("p");
    usernameDisplay.textContent = `User: ${username}`;
    usernameDisplay.classList.add("logged-in-user");
    appContainer.insertBefore(usernameDisplay, appContainer.firstChild);
}

function renderCreatePostView() {
  
    const username = currentUser;
    
    const appContainer = document.getElementById("app");
    appContainer.innerHTML = "";

    const createPostForm = document.createElement("div");
    createPostForm.innerHTML = `
        <h2>Create a New Post</h2>
        <form id="post-form">
            <div class="form-group">
                <label for="name">Topic:</label>
                <input type="text" id="name" class="form-control" required>
            </div>
            <div class="form-group">
                <label for="content">Content:</label>
                <textarea id="content" class="form-control" required></textarea>
            </div>
            <button type="submit" class="btn btn-success">Submit</button>
        </form>
    `;

    const postForm = createPostForm.querySelector("#post-form");
    postForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const topic = document.getElementById("name").value;
        const content = document.getElementById("content").value;
        const date = new Date().toLocaleString();

        if (topic && content) {
            const post = { topic, username, content, date, comments: [] };
            savePostToCache(post);
            window.location.href = "forum.html"; // Redirect to main page
        }
        
    });

    appContainer.appendChild(createPostForm);
}

function renderLogoutButton() {
    // Create the logout button
    const logoutButton = document.createElement("button");
    logoutButton.id = "logout-button";
    logoutButton.className = "btn btn-danger";
    logoutButton.textContent = "Logout";

    // Attach the logout event listener
    logoutButton.addEventListener("click", () => {
        // Clear current user data from local storage
        localStorage.removeItem("currentUser");
        // Reload the page to return to the login screen
        location.reload();
    });

    // Append the logout button to the appContainer
    appContainer.appendChild(logoutButton);
}

function savePostToCache(post) {
    const cachedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    cachedPosts.push(post);
    localStorage.setItem("posts", JSON.stringify(cachedPosts));
}

function renderPosts(posts) {
    const appContainer = document.getElementById("app");
    appContainer.innerHTML = "";

    const createPostButton = document.createElement("button");
    //createPostButton.classList.add("btn", "btn-primary", "mb-4");
    //createPostButton.textContent = "Create New Post";
    //createPostButton.addEventListener("click", () => {
      //  renderCreatePostView();
  //  });
    //appContainer.appendChild(createPostButton);

    // Iterate through posts in reverse order
    for (let index = posts.length - 1; index >= 0; index--) {
        const post = posts[index];
        const postElement = document.createElement("div");
        postElement.classList.add("post", "card", "mb-3");
        postElement.innerHTML = `
            <div class="card-body">
                <div class="post-title-info">
                    <h4 class="post-title card-title" data-post-id="${index}">
                        ${post.topic}
                    </h4>
                </div>
                <p class="post-username card-text">${post.username}</p>
                <p class="post-content card-text">${post.content}</p>
                <span class="post-date card-text">${post.date}</span>
                
            </div>
        `;
        appContainer.appendChild(postElement);
    }
}



function renderLogoutButton() {
        const logoutButton = document.createElement("button");
        logoutButton.id = "logout-button";
        logoutButton.className = "btn btn-danger";
        logoutButton.textContent = "Logout";
        logoutButton.addEventListener("click", () => {
            localStorage.removeItem("currentUser");
            location.reload(); 
        });
        logoutContainer.appendChild(logoutButton); 
    }


    function renderPostView(postId) {
        const appContainer = document.getElementById("app");
        appContainer.innerHTML = "";
    
        const cachedPosts = JSON.parse(localStorage.getItem("posts")) || [];
        const post = cachedPosts[postId];
    
        const postElement = document.createElement("div");
        postElement.classList.add("post", "card", "mb-3");
        postElement.innerHTML = `
            <div class="card-body">
                <h4 class="post-title card-title">${post.topic}</h4>
                <p class="post-content card-text">${post.content}</p>
            </div>
        `;
    
        // Render comments section
        const commentsSection = document.createElement("div");
        commentsSection.classList.add("comments-section");
    
        for (let commentIndex = 0; commentIndex < post.comments.length; commentIndex++) {
            const comment = post.comments[commentIndex];
            const commentElement = document.createElement("div");
            commentElement.classList.add("comment", "card", "mb-2");
            commentElement.innerHTML = `
                <div class="card-body">
                    <p class="card-text">${comment.text}</p>
                    <button class="btn btn-link reply-button" data-comment-index="${commentIndex}">Reply</button>
                    <div class="reply-section"></div>
                </div>
            `;
    
            const replyButton = commentElement.querySelector(".reply-button");
            replyButton.addEventListener("click", () => {
                const replySection = commentElement.querySelector(".reply-section");
                renderReplyForm(postId, commentIndex, replySection);
            });
    
            commentsSection.appendChild(commentElement);
    
            // Render replies if they exist
            if (comment.replies && comment.replies.length > 0) {
                const replySection = commentElement.querySelector(".reply-section");
                comment.replies.forEach((replyText) => {
                    const replyElement = document.createElement("div");
                    replyElement.classList.add("reply", "card", "mb-2");
                    replyElement.innerHTML = `
                        <div class="card-body">
                            <p class="card-text">${replyText}</p>
                        </div>
                    `;
                    replySection.appendChild(replyElement);
                });
            }
        }
    
        postElement.appendChild(commentsSection);
    
        postElement.appendChild(commentsSection);
    
        // Render comment form
        const commentForm = document.createElement("form");
        commentForm.innerHTML = `
            <div class="form-group">
                <textarea class="form-control" id="commentText" placeholder="Add a comment" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary btn-sm">Add Comment</button>
        `;
    
        commentForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const commentInput = commentForm.querySelector("#commentText");
    
            const comment = commentInput.value;
    
            if (comment) {
                addCommentToPost(postId, comment);
                commentInput.value = "";
                renderPostView(postId);
            }
        });
    
        postElement.appendChild(commentForm);
        appContainer.appendChild(postElement);
    
        const backButton = document.createElement("button");
        backButton.classList.add("btn", "btn-secondary", "mt-3");
        backButton.textContent = "Back to Posts";
        backButton.addEventListener("click", () => {
            renderPosts(cachedPosts);
        });
        appContainer.appendChild(backButton);
    }
    
    


    function renderReplyForm(postId, commentIndex, replySection) {
        const replyForm = document.createElement("form");
        replyForm.innerHTML = `
            <div class="form-group">
                <textarea class="form-control" id="replyText" placeholder="Reply to this comment" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary btn-sm">Add Reply</button>
        `;
    
        replyForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const replyInput = replyForm.querySelector("#replyText");
    
            const reply = replyInput.value;
    
            if (reply) {
                addReplyToComment(postId, commentIndex, reply);
                replyInput.value = "";
                renderPostView(postId);
            }
        });
    
        replySection.innerHTML = "";
        replySection.appendChild(replyForm);
    }
    function addCommentToPost(postId, commentText) {
        const username = currentUser;
        const cachedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    
        const newComment = {
            text: `${username}: ${commentText}`,
            replies: []
        };
    
        cachedPosts[postId].comments.push(newComment);
        localStorage.setItem("posts", JSON.stringify(cachedPosts));
    }
    
    function addReplyToComment(postId, commentIndex, replyText) {
        const username = currentUser;
        const cachedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    
        const newReply = `${username}: ${replyText}`;
    
        cachedPosts[postId].comments[commentIndex].replies.push(newReply);
        localStorage.setItem("posts", JSON.stringify(cachedPosts));
    }
    

    if (currentUser) {
        // Render the navigation bar when the user is logged in
        renderNavigationBar();
        renderPosts(cachedPosts);
    
        // Display the current user's name
        //const usernameDisplay = document.createElement("p");
       // usernameDisplay.textContent = `User: ${currentUser}`;
        usernameDisplay.classList.add("logged-in-user");
        appContainer.insertBefore(usernameDisplay, appContainer.firstChild);

    } else {
        // Render the login form when the user is not logged in
        renderLoginForm();
    }
}); 