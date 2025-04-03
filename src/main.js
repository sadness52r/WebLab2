let lastSearchedMovie = "";
document.getElementById('searchBtn').addEventListener('click', fetchMovie);

async function fetchMovie() {
    const title = document.getElementById('searchInput').value.trim();
    if (!title) return alert('Enter movie title!');
    
    const apiKey = 'b4088261';
    const url = `http://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${apiKey}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.Response === 'False') {
            document.getElementById('movieDetails').innerHTML = `<p>Movie hasn't been found!</p>`;
            return;
        }

        lastSearchedMovie = data.Title;
        
        document.getElementById('movieDetails').innerHTML = `
            <div class="movie-content">
                <div>
                    <h2>${data.Title} (${data.Year})</h2>
                    <p><strong>Genre:</strong> ${data.Genre}</p>
                    <p><strong>Director:</strong> ${data.Director}</p>
                    <p><strong>Actors:</strong> ${data.Actors}</p>
                    <p><strong>Rating IMDb:</strong> ${data.imdbRating}</p>
                    <img src="${data.Poster}" alt="Movie poster">
                </div>
                <div class="plot-content">
                    <button id="plotBtn" class="plot-btn" type="button">Show plot</button>
                    <div id="plotDetails" class="plot-details"></div>
                </div>
            </div>
        `;
        document.getElementById('plotBtn').addEventListener('click', fetchPlot);
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('movieDetails').innerHTML = `<p>Data error</p>`;
    }
}

async function fetchPlot() {
    const title = lastSearchedMovie.trim();
    
    const apiKey = 'b4088261';
    const url = `http://www.omdbapi.com/?t=${encodeURIComponent(title)}&plot=full&apikey=${apiKey}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        document.getElementById('plotDetails').innerHTML = `
            <p>${data.Plot}</p>
        `;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('plotDetails').innerHTML = `<p>Plot error</p>`;
    }
}