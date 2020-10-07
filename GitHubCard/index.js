/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
const getUsers = async (users)=>{
  for(let i = 0 ; i < users.length ; i++){
    try{
      const requestResult = await axios.get(`https://api.github.com/users/${users[i]}`);
      console.log('getting users operation resolved');
      createCard(requestResult);
    }
    catch(err){
      console.log(`${users[i]} : getting users operation rejected : `+err);
    }
    finally{
      console.log(`${users[i]} : getting users operation has been finished`);
    }
  }
};



/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 
   Skip to Step 3.
*/
getUsers(['hasanmhsh']);
/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [];

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/


const createCard = response => {
  const cardDivElement = document.createElement('div');
  const userImageElement = document.createElement('img');
  const cardInfoDivElement = document.createElement('div');
  const userNameHeadingElement = document.createElement('h3');
  const userNamePElement = document.createElement('p');
  const userLocationPElement = document.createElement('p');
  const userProfilePElement = document.createElement('p');
  const userUrlAElement = document.createElement('a');
  const userFollowersPElement = document.createElement('p');
  const userFollowingPElement = document.createElement('p');
  const userBioPElement = document.createElement('p');

  cardDivElement.classList.add('card');
  cardInfoDivElement.classList.add('card-info');
  userNameHeadingElement.classList.add('name');
  userNamePElement.classList.add('username');

  cardDivElement.appendChild(userImageElement);
  cardDivElement.appendChild(cardInfoDivElement);
  cardInfoDivElement.appendChild(userNameHeadingElement);
  cardInfoDivElement.appendChild(userNamePElement);
  cardInfoDivElement.appendChild(userLocationPElement);
  cardInfoDivElement.appendChild(userProfilePElement);
  cardInfoDivElement.appendChild(userFollowersPElement);
  cardInfoDivElement.appendChild(userFollowingPElement);
  cardInfoDivElement.appendChild(userBioPElement);
  userProfilePElement.appendChild(userUrlAElement);


  const sampleResponse=
  {
    "login": "hasanmhsh",
    "id": 47121336,
    "node_id": "MDQ6VXNlcjQ3MTIxMzM2",
    "avatar_url": "https://avatars1.githubusercontent.com/u/47121336?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/hasanmhsh",
    "html_url": "https://github.com/hasanmhsh",
    "followers_url": "https://api.github.com/users/hasanmhsh/followers",
    "following_url": "https://api.github.com/users/hasanmhsh/following{/other_user}",
    "gists_url": "https://api.github.com/users/hasanmhsh/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/hasanmhsh/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/hasanmhsh/subscriptions",
    "organizations_url": "https://api.github.com/users/hasanmhsh/orgs",
    "repos_url": "https://api.github.com/users/hasanmhsh/repos",
    "events_url": "https://api.github.com/users/hasanmhsh/events{/privacy}",
    "received_events_url": "https://api.github.com/users/hasanmhsh/received_events",
    "type": "User",
    "site_admin": false,
    "name": null,
    "company": null,
    "blog": "",
    "location": null,
    "email": null,
    "hireable": null,
    "bio": null,
    "public_repos": 46,
    "public_gists": 0,
    "followers": 0,
    "following": 0,
    "created_at": "2019-01-28T19:30:08Z",
    "updated_at": "2020-01-23T12:40:49Z"
  }

  userImageElement.setAttribute('src',response.data['avatar_url']);
  userNameHeadingElement.textContent = response.data['name'];
  userNamePElement.textContent = response.data['login'];
  userLocationPElement.textContent = response.data['location'];
  userProfilePElement.textContent = 'Profile: ';
  userUrlAElement.textContent = response.data['html_url'];
  userUrlAElement.href = response.data['html_url'];
  userFollowersPElement.textContent = response.data['followers'];
  userFollowingPElement.textContent = response.data['following'];
  userBioPElement.textContent = response.data['bio'];

  cards.appendChild(cardDivElement);
};

const getUserCard = userName => {
  axios.get(`https://api.github.com/users/${userName}`).then(response=>{
    createCard(response);
  }).catch(response => {
    console.log(`${userName} : Error while abtaining user card information! \n${response}`);
  });

};


const instructors = [
  'tetondan',
  'dustinmyers',
  'justsml',
  'luishrd',
  'bigknell'
];
const cards = document.querySelector('.cards');
//instructors.forEach(instructor=>getUserCard(instructor)); //parallel requests
getUsers(instructors);  // serial requests