const nodemailer = require("nodemailer")


class MailController {
    static sendMail = (req, res) => {
        var data = req.body;
        var responseObj = {
            EmailSendSuccessfully: false,
            SomeThingWentWrong: false
        }
        try {
            const transporter = nodemailer.createTransport({
                service: "gmail.com",
                auth: {
                    user: "shubhakky@gmail.com",
                    pass: "tmedmcfnwchuizam"
                }

            });
            const options = {
                from: "shubhakky@gmail.com",
                to: "shubhamchoudhary8020@gmail.com",
                subject: "Regarding from froject",
                html: `
                <h1>Name- ${data.name} </h1>
                <h6> Email- ${data.email} </h6>
                <strong> Subject- ${data.subject} <strong/>
                <p> Description- ${data.message} </p>
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgCAIa4_gIPMn-xNpO7Gn7oJUGdOx5jwhHIwT8Lllnvw&s'/>
                `
            }

            transporter.sendMail(options, function (err, info) {
                if (info) {
                    console.log(info.messageId)
                    responseObj.EmailSendSuccessfully= true;
                    responseObj.SomeThingWentWrong=false;
                    res.send(responseObj);
                }
                else {
                    responseObj.EmailSendSuccessfully= false;
                    responseObj.SomeThingWentWrong=true;
                    res.send(responseObj);
                }
            });

        }
        catch (err) {
            responseObj.EmailSendSuccessfully= false;
            responseObj.SomeThingWentWrong=true;
            res.send(responseObj);
        }

    }
}

module.exports = MailController;