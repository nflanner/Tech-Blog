const postHandler = async (event) => {
    event.preventDefault();
    console.log('submit btn clicked');

    const name = document.querySelector('#content-name').value.trim();
    const content = document.querySelector('#content-input').value.trim();
    const userId = document.querySelector('#content-name').getAttribute('data-id');
    console.log(name, content, userId);

    if (name && content && userId) {
        const response = await fetch('/api/content', {
        method: 'POST',
        body: JSON.stringify({
            name: name, 
            content: content, 
            user_id: userId}),
        headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector('#newPost')
    .addEventListener('click', postHandler);