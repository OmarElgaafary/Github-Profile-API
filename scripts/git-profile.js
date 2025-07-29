const gitSearch = document.querySelector('.search-bar');
const gitFetch = document.querySelector('.search-button');
const gitName = document.querySelector('.git-name');
const gitUsername = document.querySelector('.git-username');
const gitBio = document.querySelector('.git-bio');
const gitProfilePic = document.querySelector('.git-profile-picture');
const gitDateJoined = document.querySelector('.git-date-joined');
const gitRepos = document.querySelector('.js-repos');
const gitFollowers = document.querySelector('.js-followers');
const gitFollowing = document.querySelector('.js-following');

gitFetch.addEventListener('click', () => {
    const gitUsername = gitSearch.value;
    const gitFetched = gitAPI(gitUsername);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const gitUsername = gitSearch.value;
        const gitFetched = gitAPI(gitUsername);
    }

});

function formatDate(string) {
    let formatedString = '';
    const availableChars = '1234567890-';
    for (let i = 0; i < string.length; i++) {
        if (!availableChars.includes(string[i]))
            return formatedString

        formatedString += string[i];
    }
}


async function gitAPI(username) {
    try {
        const gitRequest = await fetch(`https://api.github.com/users/${username}`,
            {
                username: `${username}`,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            }
        ).then(response => response.json())
            .then((data) => {
                console.log(data)
                gitName.innerHTML = data.name;
                gitUsername.innerHTML = `@${data.login}`;
                gitBio.innerHTML = data.bio || 'no bio.'
                gitProfilePic.src = data.avatar_url;
                gitRepos.innerHTML = data.public_repos;
                gitFollowers.innerHTML = data.followers;
                gitFollowing.innerHTML = data.following;
                gitDateJoined.innerHTML = `Joined ${formatDate(data.created_at)}`;
            })

    } catch (error) {
        console.log(error);
    }

}
