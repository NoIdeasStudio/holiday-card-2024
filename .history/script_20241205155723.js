window.addEventListener("load", function(){
    setTimeout(
        function open(event){
            document.querySelector(".popup").style.display = "block";
        },
        1000
    )
});
document.querySelector("#got-it").addEventListener("click", function(){
    document.querySelector(".popup").style.display = "none";
});

window.addEventListener("load", function(){
    setTimeout(
        function open(event){
            document.querySelector(".popup1").style.display = "block";
        },
        1000
    )
});
document.querySelector("#got-it").addEventListener("click", function(){
    document.querySelector(".popup1").style.display = "none";
});