function SetGalleryEventListeners()
{
    const pictures = document.querySelectorAll('div.gallery');
    for(const picture of pictures)
    {
        const sources = picture.querySelectorAll(".gallery-buttons input");
            const selectors = picture.querySelectorAll(".gallery-selector input"); 
            suffix = "";
            src = "";
            for(const selector of selectors)
            {
                // initial
                if(selector.checked)
                {
                    suffix = selector.getAttribute("data-src");
                }
                selector.addEventListener("click", () =>
                {
                    if(selector.checked)
                    {
                        suffix = selector.getAttribute("data-src");
                    }

                    for(const source of sources)
                    {
                        if(source.checked)
                        {
                            src = source.getAttribute("data-src");
                        }
                    }
                    const img = picture.querySelector("img");
                    img.setAttribute("src", src + suffix +".png");
                });
            }
            

        for(const source of sources)
        {
            const media = source.getAttribute("data-src");

            source.addEventListener("click", () =>
            {
                const img = picture.querySelector("img");
                img.setAttribute("src", media + suffix +".png");
            });
        }     
           
    }
}

SetGalleryEventListeners();