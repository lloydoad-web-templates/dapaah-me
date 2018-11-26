const mailForm = document.querySelector(".mail-form");
const MAIL_API = "http://localhost:5000/" + "send-mail";
const sentLabel = document.querySelector(".sent-label");

function parseFormData(event) {
    const email = mailForm.querySelector("#exampleEmailInput");
    const reasonOption = mailForm.querySelector("#exampleRecipientInput");
    const message = mailForm.querySelector("#exampleMessage");
    let reason;

    switch (reasonOption.value) {
        case "Option 1":
            reason = "Questions";
            break;
        case "Option 2":
            reason = "Concerns";
            break;
        case "Option 3":
            reason = "Opportunities";
            break;
    }

    if (email.value !== '' && message.value !== '') {
        const mess = {
            "email": email.value,
            "reason": reason,
            "message": message.value
        };

        fetch(MAIL_API, {
            method: 'POST',
            body: JSON.stringify(mess),
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(function() {
            console.log("done")
            email.value = "";
            message.value = "";
            sentLabel.style.display = "";
            setTimeout(function () {
                sentLabel.style.display = "none"
            }, 2000);
        })
        .catch(function(error) {
            console.log(error)
        });
    }
}