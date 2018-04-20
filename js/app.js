let strings = 
    [
        `1: To use ESLint please install eslint by running 'npm install eslint' in the workspace folder RSS_Private or globally using 'npm install -g eslint'. You need to reopen the workspace after installing eslint.`, 
        `2: If you are using yarn instead of npm set the setting`, 
        `3: Alternatively you can disable ESLint for the workspace folder RSS_Private by executing the 'Disable ESLint' command.`,
        `4: To use ESLint please install eslint by running 'npm install eslint' in the workspace folder RSS_Private or globally using 'npm install -g eslint'. You need to reopen the workspace after installing eslint.`, 
        `5: If you are using yarn instead of npm set the setting`, 
        `6: Alternatively you can disable ESLint for the workspace folder RSS_Private by executing the 'Disable ESLint' command.`
    ];

let news = strings.map((str, index) => new News(index + 1, `News ${index + 1}`, str));
let notification = new Notification(news);
if(!notification.disabled){
    setTimeout(() => {
        document.body.appendChild(notification.element);
    }, 5000);
}

