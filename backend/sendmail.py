import os
from dotenv import load_dotenv
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

load_dotenv()
RECEIVER_EMAIL_LIST = os.getenv(
    'RECEIVER_EMAIL_LIST', default="")
RECEIVER_EMAIL_LIST = RECEIVER_EMAIL_LIST.split(",")

GMAIL_ACCOUNT = os.getenv('GMAIL_ACCOUNT', default="")
GMAIL_PASSWORD = os.getenv('GMAIL_PASSWORD', default="")
assert GMAIL_ACCOUNT != ""
assert GMAIL_PASSWORD != ""
assert len(RECEIVER_EMAIL_LIST) >= 1

def send_email(participant_email, formData):

    mail_content = f'''[Notice] 
    {participant_email} has uploaded their model for hidden set competition at {formData["aoeTimeUpload"]} AOE.
    
    submitUUID: {formData["submitUUID"]}
    submitName: {formData["submitName"]}
    modelDesc: {formData["modelDesc"]}
    huggingfaceOrganizationName: {formData["huggingfaceOrganizationName"]}
    huggingfaceRepoName: {formData["huggingfaceRepoName"]}
    huggingfaceCommonHash: {formData["huggingfaceCommonHash"]}
    paramShared: {formData["paramShared"]}

    Thank You
    '''
    #Setup the MIME
    for receiver_address in RECEIVER_EMAIL_LIST:
        message = MIMEMultipart()
        message['From'] = GMAIL_ACCOUNT
        message['To'] = receiver_address
        message['Subject'] = '[Notice] Hidden Set Submission'   #The subject line
        #The body and the attachments for the mail
        message.attach(MIMEText(mail_content, 'plain'))
        #Create SMTP session for sending the mail
        session = smtplib.SMTP('smtp.gmail.com', 587) #use gmail with port
        session.starttls() #enable security
        session.login(GMAIL_ACCOUNT, GMAIL_PASSWORD) #login with mail_id and password
        text = message.as_string()
        session.sendmail(GMAIL_ACCOUNT, receiver_address, text)
        session.quit()
    print('Mails Sent')