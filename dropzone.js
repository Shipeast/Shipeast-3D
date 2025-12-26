const dropzone = document.getElementById("dropzone");
dropzone.addEventListener("dragover", e=>{e.preventDefault();dropzone.classList.add("hover");});
dropzone.addEventListener("dragleave", e=>{dropzone.classList.remove("hover");});
dropzone.addEventListener("drop", e=>{
    e.preventDefault(); dropzone.classList.remove("hover");
    const file = e.dataTransfer.files[0];
    if(file){ dropzone.textContent = file.name; }
});
dropzone.addEventListener("click", ()=>{const input=document.createElement("input");input.type="file";input.accept=".stl,.obj";input.onchange=e=>{if(e.target.files[0]) dropzone.textContent=e.target.files[0].name;};input.click();});
