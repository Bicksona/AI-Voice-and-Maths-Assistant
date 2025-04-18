document.addEventListener("DOMContentLoaded", function () {
    const mainElements = [
        document.getElementById("im"),
        document.getElementById("name1"),
        document.getElementById("phone"),
        document.getElementById("you")
    ];

    const mathElements = [
        document.getElementById("name2"),
        document.getElementById("math")
    ];

    function startTypewriter(elements) {
        elements = elements.filter(el => el !== null); 
        if (elements.length === 0) return; 

        let fullText = elements.map(el => el.textContent);
        elements.forEach(el => el.textContent = ""); 

        const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);
        const speed = isMobile ? 200 : 100; 

        let index = 0, charIndex = 0;

        function typeWriter() {
            if (index < elements.length) {
                if (charIndex < fullText[index].length) {
                    elements[index].textContent += fullText[index].charAt(charIndex);
                    charIndex++;
                    setTimeout(typeWriter, speed);
                } else {
                    index++;
                    charIndex = 0;
                    setTimeout(typeWriter, speed);
                }
            }
        }

        typeWriter();
    }
    startTypewriter(mainElements);
    startTypewriter(mathElements);
});
