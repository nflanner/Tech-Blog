const cardHandler = async (event) => {
    event.preventDefault();

    const contentEditId = event.target.getAttribute('data-editId');
    const contentDeleteId = event.target.getAttribute('data-deleteId');
    const newPost = event.target.getAttribute('data-newPost');

    if (contentDeleteId) {
        console.log('delete btn clicked');
        const response = await fetch(`/api/content/${contentDeleteId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }

    if (newPost) {
        document.location.replace('/add-content');
    }

    if ( contentEditId) {
        console.log('edit btn pushed');
        document.location.replace(`/edit-content/${contentEditId}`);
    }
};

document
  .querySelector('#all-content')
  .addEventListener('click', cardHandler);