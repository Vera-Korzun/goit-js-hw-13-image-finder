const fetchImg = (query, page, API_KEY) => {

    const baseURL = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&page=${page}&per_page=12`;

    return fetch(baseURL)
        .then(response => {
            if (response.status === 200) {
                return response.json()
            }
        })
        .then(data => {
            console.log(data.hits)
            return data.hits;
        })
};

export default fetchImg;