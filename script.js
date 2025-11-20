
let travelData = {};

fetch("travel_recommendation_api.json")
    .then(response => response.json())
    .then(data => {
        travelData = data;
        console.log("JSON Loaded:", data); 
    })
    .catch(err => console.log("Error loading JSON:", err));

function showPopup(contentHtml) {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("popup").style.display = "block";
    document.getElementById("popupContent").innerHTML = contentHtml;
}

function closePopup() {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("popup").style.display = "none";
}


function getLocalTime(timeZone){
    try{
        return new Date().toLocaleTimeString("en-US",{
            timeZone: timeZone,
            hour12: true,
            hour: "numeric",
            minute: "numeric",
            second: "numeric"
        });
    }catch{
        return "Unavailable";
    }
}

// ================= TASK 7 + 8 — Keyword Search =================
document.getElementById("searchBtn").addEventListener("click", () => {
    let keyword = document.getElementById("searchInput").value.trim().toLowerCase();

    if(!keyword){
        alert("Please enter a keyword!");
        return;
    }

    let results = [];
    let title = "";

    if(keyword === "beach" || keyword === "beaches"){
        results = travelData.beaches || [];
        title = "Beaches";
    }
    else if(keyword === "temple" || keyword === "temples"){
        results = travelData.temples || [];
        title = "Temples";
    }
    else if(keyword === "country" || keyword === "countries"){
        results = travelData.countries || [];
        title = "Countries";
    }

    if(results.length > 0){
        let html = results.map(item => `
            <img src="${item.imageUrl}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            ${item.timeZone ? `<p>Local Time: ${getLocalTime(item.timeZone)}</p>` : ""}
            <hr>
        `).join("");

        showPopup(html);
    } else {
        showPopup(`<p>No results found for "${keyword}". Try beach, temple, or country.</p>`);
    }
});


document.getElementById("clearBtn").addEventListener("click", () => {
    document.getElementById("searchInput").value = "";
    closePopup();
});