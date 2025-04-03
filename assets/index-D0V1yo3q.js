(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();let c="";document.getElementById("searchBtn").addEventListener("click",l);async function l(){const r=document.getElementById("searchInput").value.trim();if(!r)return alert("Enter movie title!");const i=`http://www.omdbapi.com/?t=${encodeURIComponent(r)}&apikey=b4088261`;try{const e=await(await fetch(i)).json();if(e.Response==="False"){document.getElementById("movieDetails").innerHTML="<p>Movie hasn't been found!</p>";return}c=e.Title,document.getElementById("movieDetails").innerHTML=`
            <div class="movie-content">
                <div>
                    <h2>${e.Title} (${e.Year})</h2>
                    <p><strong>Genre:</strong> ${e.Genre}</p>
                    <p><strong>Director:</strong> ${e.Director}</p>
                    <p><strong>Actors:</strong> ${e.Actors}</p>
                    <p><strong>Rating IMDb:</strong> ${e.imdbRating}</p>
                    <img src="${e.Poster}" alt="Movie poster">
                </div>
                <div class="plot-content">
                    <button id="plotBtn" class="plot-btn" type="button">Show plot</button>
                    <div id="plotDetails" class="plot-details"></div>
                </div>
            </div>
        `,document.getElementById("plotBtn").addEventListener("click",a)}catch(o){console.error("Error:",o),document.getElementById("movieDetails").innerHTML="<p>Data error</p>"}}async function a(){const r=c.trim(),i=`http://www.omdbapi.com/?t=${encodeURIComponent(r)}&plot=full&apikey=b4088261`;try{const e=await(await fetch(i)).json();document.getElementById("plotDetails").innerHTML=`
            <p>${e.Plot}</p>
        `}catch(o){console.error("Error:",o),document.getElementById("plotDetails").innerHTML="<p>Plot error</p>"}}
