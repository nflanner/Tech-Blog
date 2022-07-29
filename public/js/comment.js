const commentFormHandler = async (event) => {
    event.preventDefault();

    console.log(event.target);
    
    const contentId = event.target.getAttribute('data-commentId');
    console.log(contentId);

    if (contentId) {
        document.location.replace(`/comment/${contentId}`);
    }

};

document
    .querySelector('#all-content')
    .addEventListener('click', commentFormHandler);