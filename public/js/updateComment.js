const commentHandler = async (event) => {
    event.preventDefault();

    const comment = document.querySelector('#comment-text').value.trim();
    const contentId = document.querySelector('#comment-text').getAttribute('data-id');
    const username = document.querySelector('#comment-text').getAttribute('data-name');
    console.log(username);

    if (comment && contentId) {
        console.log(comment, contentId);
        const response = await fetch('/api/comment/', {
        method: 'POST',
        body: JSON.stringify({ 
            comment: comment, 
            username: username,
            content_id: contentId}),
        headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
};

document
.querySelector('#submit')
.addEventListener('click', commentHandler);