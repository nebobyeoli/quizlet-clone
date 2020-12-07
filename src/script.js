try
{
    // redirect

    document.querySelector('button.quizlet').addEventListener('click', () => {
        window.location.replace('./latest.html');
    });

    document.querySelector('button.labeled.upgrade').addEventListener('click', () => {
        window.location.replace('./upgrade.html');
    });
    
    document.querySelector('span#privacy-policy').parentElement.addEventListener('click', () => {
        window.location.replace('./privacy.html');
    });
}
catch (err) {
    console.error(err);
}
