try {
    document.querySelector('button.quizlet').addEventListener('click', () => {
        window.location.replace('./latest.html');
    });

    document.querySelector('button.labeled.upgrade').addEventListener('click', () => {
        window.location.replace('./upgrade.html');
    });
}

catch (err) {
    console.error(err);
}