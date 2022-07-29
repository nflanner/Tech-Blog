const postHandler = async (event) => {
    event.preventDefault();
    console.log('submit btn clicked');

    const name = document.querySelector('#content-name').value.trim();
    const content = document.querySelector('#content-input').value.trim();
    const contentId = document.querySelector('#content-name').getAttribute('data-contentId');
    console.log(name, content, contentId);

    if (name && content && contentId) {
        console.log('entering fetch')
        const response = await fetch(`/api/content/${contentId}`, {
        method: 'PUT',
        body: JSON.stringify({
            name: name, 
            content: content}),
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