let apiUrl = "https://staging.job-lion.et.tc/api"

// load page after html has been rendered by browser
function init()
{
  // check login status
  checkLoginStatus().then(() => {

    // show current page
    if (window.location.hash)
      getPage(window.location.hash.substr(1), true);
    else
      getPage('start', true);
    
    initLinks();
  });
}
init();

// handle browser back/forward buttons
window.onpopstate = event => {
  getPage(event.state, true);
};

// add all event listeners (mouse click action) on links
function initLinks() {
  let links = document.querySelectorAll('[data-role=ajax]');
  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", (e) => {
      e.preventDefault();
      let page = links[i].getAttribute('href');
      getPage(page);
    });
  }
}

// load html template and display given page
function getPage(page, replace) {
  console.log(`Get page ${page}`)
  let content = document.getElementById('content');
  content.innerHTML = "LÃ¤d...";

  // update browser url bar
  if (replace) {
      history.replaceState(page, "", `#${page}`);
  }
  else {
      history.pushState(page, "", `#${page}`);
  }

  // handle page start
  if (page == "start") {
    fetch(`templates/start.html`)
      .then(response => response.text())
      .then(html => {
        content.innerHTML = html;
      });
  }
  // handle category page
  else if (page == "categories") {
    fetch(`templates/categories.html`)
      .then(response => response.text())
      .then(html => {
        content.innerHTML = html;
      })
      // add category click
      .then(() => {
        document.getElementById('categoryForm').addEventListener("submit", e => addCategory(e));
      })
      .then(() => {
        showCategories();
      });
  }
  // handle report page
  else if (page == "reports") {
    fetch(`templates/reports.html`)
      .then(response => response.text())
      .then(html => {
        content.innerHTML = html;
      })
      // add report click
      .then(() => {
        document.getElementById('reportForm').addEventListener("submit", e => addReport(e));
      })
      .then(() => {
        showReports();
      });
  }
  // page login
  else if (page == "login")
  {
    fetch(`templates/login.html`)
      .then(response => response.text())
      .then(html => {
        content.innerHTML = html;
      })
      // handle login click
      .then(() => {
        document.getElementById('loginForm').addEventListener("submit", e => login(e));
      });
  }
  // page logout
  else if (page == "logout") {
    logout();
  }
  else if (page == "register") {
    fetch(`templates/register.html`)
      .then(response => response.text())
      .then(html => {
        content.innerHTML = html;
      })
      // handle register click
      .then(() => {
        document.getElementById('registerForm').addEventListener("submit", e => register(e));
      });
  }
  else {
    alert('404');
  }
}

function showCategories() {
  fetchApi('v1/jobCategories/', 'GET')
  .then(response => {
    // a error was transmitted
    if (response.error) {
      alert(response.error);
    }
    // categories were transmitted
    else {
      // show categories
      let categoriesHtml = document.getElementById('categories');
      categoriesHtml.innerHTML = "";
      
      let categories = response;
      for (let i in categories) {
        let category = categories[i];
        let html = document.createElement("li");
        
        html.innerHTML = `
        <h2>${category.name}</h2>
        <p>
          ${category.toSource()}
        </p>
        `;
        
        categoriesHtml.appendChild(html);
      }
    }
  });
}

function showReports() {
  fetchApi('v1/experienceReports/', 'GET')
  .then(response => {
    // a error was transmitted
    if (response.error) {
      alert(response.error);
    }
    // reports were transmitted
    else {
      // show reports
      let reportsHtml = document.getElementById('reports');
      reportsHtml.innerHTML = "";
      
      let reports = response;
      for (let i in reports) {
        let report = reports[i];
        let html = document.createElement("li");
        
        html.innerHTML = `
        <h2>${report.title}</h2>
        <p>
          ${report.toSource()}
        </p>
        `;
        
        reportsHtml.appendChild(html);
      }
    }
  });
  
  fetchApi('v1/jobCategories/', 'GET')
  .then(response => {
    // a error was transmitted
    if (response.error) {
      alert(response.error);
    }
    // categories were transmitted
    else {
      // show categories
      let categoriesHtml = document.getElementById('categories');
      categoriesHtml.innerHTML = "";
      
      let categories = response;
      for (let i in categories) {
        let category = categories[i];
        let html = document.createElement("li");
        
        html.innerHTML = `
        <input type='checkbox' name='categoryIds' value='${category.id}'>${category.name}
        `;
        
        categoriesHtml.appendChild(html);
      }
    }
  });
}

function addCategory(e) {
  e.preventDefault();

  let form = document.getElementById('categoryForm');
  let name = form.name.value;

  // send add category request
  fetchApi('v1/jobCategories/', 'POST', {
    name: name,
  }).then(response => {
    // a error was transmitted
    if (response.error) {
      alert(response.error);
    }
    // category was added successfully
    else {
        // refresh
        getPage('categories');
    }
  });
}

function addReport(e) {
  e.preventDefault();

  let form = document.getElementById('reportForm');
  let title = form.title.value;
  let text = form.text.value;
  
  let categoryIds = [];
  for (let i in form.categoryIds) {
    if (form.categoryIds[i].checked)
      categoryIds[categoryIds.length] = form.categoryIds[i].value;
  }
  
  // send add category request
  fetchApi('v1/experienceReports/', 'POST', {
    title: title,
    text: text,
    jobCategoryIds: categoryIds
  }).then(response => {
    // a error was transmitted
    if (response.error) {
      alert(response.error);
    }
    // category was added successfully
    else {
        // refresh
        getPage('reports');
    }
  });
}

function login(e) {
  e.preventDefault();

  let form = document.getElementById('loginForm');
  let email = form.email.value;
  let password = form.password.value;

  // send login request
  fetchApi('v1/auth/login', 'POST', {
    email: email,
    password: password
  }).then(response => {
    // a error was transmitted
    if (response.error) {
      alert(response.error);
    }
    // login was successfull
    else {
      // save login token
      sessionStorage.loginToken = response.token;
      // update login status, redirect to start
      checkLoginStatus().then(() => {
        getPage('start');
      });
    }
  });
}

function logout() {
  // remove login token
  sessionStorage.removeItem('loginToken');
  // update login status, redirect to start
  checkLoginStatus().then(() => {
    getPage('start');
  });
}

function register(e) {
  e.preventDefault();

  let form = document.getElementById('registerForm');
  let firstName = form.firstName.value;
  let lastName = form.lastName.value;
  let email = form.email.value;
  let password = form.password.value;
  let password2 = form.password2.value;

  if (password != password2) {
    alert('PasswÃ¶rter stimmen nicht Ã¼berein');
    return;
  }

  // send create request
  fetchApi('v1/auth/register', 'POST', {
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName
  }).then(response => {
    // a error was transmitted
    if (response.error) {
      alert(response.error);
    }
    // create was successfull
    else {
      checkLoginStatus().then(() => {
        getPage('login');
      });
    }
  });
}

function checkLoginStatus() {
  return fetchApi('v1/auth/info', 'GET')
    .then(response => {
      // error "NotLoggedIn" transmitted, so you are not logged in
      if (response.error && response.error == "NotLoggedIn") {
        loggedIn = false;
        document.getElementById("loginBtn").innerHTML = `
          <li><a href='register' data-role='ajax'>Registrieren</a></li>
          <li><a href='login' data-role='ajax'>Login</a></li>
        `;
      }
      // no error was transmitted, so you are logged in
      else {
        loggedIn = true;
        let firstName = response.user.firstName;
        document.getElementById("loginBtn").innerHTML = `
          <a href='logout' data-role='ajax'>Logout ${firstName}</a>
        `;
      }
    });
}

function fetchApi(url, method, params=[]) {
  // add login token parameter
  params['jwt'] = sessionStorage.loginToken;

  // parse params
  let data = new URLSearchParams();
  for (let name in params) {
    data.append(name, params[name]);
  }

  // generate parameters
  let options;
  if (method.toLowerCase() === 'get') {
    url += `?${data.toString()}`;
    options = {};
  }
  else {
    options = {
      method: method,
      body: data
    };
  }

  // send request
  return fetch(`${apiUrl}/${url}`, options)
    .then(response => {
      if (response.status == '404') {
        throw new Error(`Got 404 while getting ${apiUrl}/${url}`);
      }
      return response.json();
    })
    .catch(err => {
      console.error(err);
      alert(err);
    });
}