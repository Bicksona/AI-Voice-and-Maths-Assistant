document.getElementById("review-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const rating = document.getElementById("rating").value;
    const comment = document.getElementById("comment").value;
    const responseMessage = document.getElementById("response-message");


    responseMessage.innerHTML = "";
    responseMessage.className = "";


    if (!name || !rating || !comment) {
        responseMessage.innerHTML = "All fields are required!";
        responseMessage.className = "error-message";
        return;
    }

    const templateParams = {
        from_name: name,
        rating: rating,
        message: comment,
    };

    emailjs.send("service_zcg2b9r", "template_f10wx4m", templateParams)
        .then(function (response) {
            responseMessage.innerHTML = "Review submitted successfully!";
            responseMessage.className = "success-message";
            document.getElementById("review-form").reset();

            setTimeout(() => {
                responseMessage.innerHTML = "";
                responseMessage.className = "";
            }, 10000);

        }, function (error) {
            responseMessage.innerHTML = "Failed to send review. Please try again.";
            responseMessage.className = "error-message";

            setTimeout(() => {
                responseMessage.innerHTML = "";
                responseMessage.className = "";
            }, 10000);
        });
});
