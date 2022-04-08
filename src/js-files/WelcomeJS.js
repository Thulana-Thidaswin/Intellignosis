
window.addEventListener("load", (event) => {
    const statusDisplay = document.getElementById("status");
    statusDisplay.textContent = navigator.onLine ? "Status: Online" : "Status: Offline";
});
    
window.addEventListener("offline", async (event) => {
    const statusDisplay = document.getElementById("status");
    statusDisplay.textContent = "Status: Offline";
    document.getElementById("maiden").style.display = "none";
    
  });
  
  window.addEventListener("online", async (event) => {
    const statusDisplay = document.getElementById("status");
    statusDisplay.textContent = "Status: Online";
    document.getElementById("maiden").style.display = "block";
    
  });



