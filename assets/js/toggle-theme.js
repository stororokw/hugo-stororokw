const doc = document.firstElementChild;

function setColorScheme(){
    var theme = "light";

    if(localStorage.getItem("color-scheme"))
    {
        if(localStorage.getItem("color-scheme") == "dark")
        {
            var theme = "dark";
        }
    }
    else if(window.matchMedia("(prefers-color-scheme: dark)").matches)
    {
        var theme = "dark";
    }

    if (theme=="dark")
    {
         doc.setAttribute("color-scheme", "dark");
         localStorage.setItem("color-scheme", "dark");

    }
    else
    {
        doc.setAttribute("color-scheme", "light");
        localStorage.setItem("color-scheme", "light");
    }
}

setColorScheme();
