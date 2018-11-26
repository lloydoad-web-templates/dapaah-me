from flask import Flask, render_template, request
from flask_mail import Mail, Message
import os

# installed flask, and flask mail

template_dir = os.path.dirname(os.path.realpath(__file__))
template_dir = os.path.join(template_dir, 'client')

app = Flask(__name__, template_folder=template_dir, static_folder=template_dir, static_url_path='')
mail = Mail(app)

app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'francis.badu12345@gmail.com'
app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD', 'no_password')
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)

@app.route("/")
def index():
    print(os.environ.get('MAIL_PASSWORD', 'no_password'))
    return render_template("index.html")

@app.route("/send-mail", methods = ['POST'])
def sendMail():
    retrieved = request.json

    email = retrieved['email']
    mess = retrieved['message']
    reason = 'Personal Mail Client - ' + retrieved['reason']
    targetEmail = 'lloyd.lloyddapaah@gmail.com'

    if len(mess) == 0:
        return 'invalid'

    msg = Message(reason, sender = email, recipients = [targetEmail])
    msg.body = "FROM: " + email + "\n\n" + mess
    mail.send(msg)

    return 'OK'

# running with python
if __name__ == '__main__':
    app.run(debug=True)