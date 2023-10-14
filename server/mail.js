const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "ipishir@gmail.com",
    pass: "25072003Ipishir",
  },
});

app.post("/отправить-письмо", (req, res) => {
  const { email, subject, message } = req.body;

  const mailOptions = {
    from: "ipishir@gmail.com",
    to: email,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Ошибка при отправке письма: " + error);
      res.status(500).send("Ошибка при отправке письма");
    } else {
      console.log("Письмо отправлено: " + info.response);
      res.status(200).send("Письмо успешно отправлено");
    }
  });
});