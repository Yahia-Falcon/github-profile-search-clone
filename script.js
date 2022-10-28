const APIURL = "https://api.github.com/users/";

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

async function getUser(username) {
 try {
  const profile = await axios(APIURL + username); 
  const repos = await axios(APIURL + username + "/repos"); 

  const reposArray = randomSelect(repos.data);

  main.innerHTML = `
   <div class="card">
    <div><img src="${profile.data.avatar_url}" class="avatar"></div>
    <div class="user-info">
     <h2>${profile.data.name}</h2>
     <p>${profile.data.bio}</p>
     <ul>
      <li>${profile.data.followers} <strong>Followers</strong></li>
      <li>${profile.data.following} <strong>Following</strong></li>
      <li>${profile.data.public_repos} <strong>Repos</strong></li>
     </ul>
     <div id="repos">
      ${reposArray.map(repo => `<a href="${repo.html_url}" target="_blank" class="repo">${repo.name}</a>`).join("")}
     </div>
    </div>
   </div>
  `;
 } catch (error) {
  main.innerHTML = "<div class='card'><h1>No profile with that username was found.</h1></div>";
 }   
}

function randomSelect(arr) {
 const ret = [];

 while (ret.length < 10) {
  let ri = Math.floor(Math.random() * arr.length);
  
  if (ret.indexOf(arr[ri]) === -1) ret.push(arr[ri]);
 }

 return ret;
}

form.addEventListener("submit", e => {
 e.preventDefault();

 const user = search.value;

 if (user) getUser(user);

 search.value = "";
})

getUser("Yahia-Falcon");