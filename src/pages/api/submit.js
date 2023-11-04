const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://muizz:oluwafemi2004@cluster0.f7czzhs.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const formData = JSON.parse(req.body);
    const { companyName, fullName, email, contactType, contact, languageOfPair, domain, projectType, messages } = formData;

    const database = client.db('uploads');

    const upload = database.collection('upload');
       const result = await upload.insertOne({
        companyName,
        fullName,
        email,
        number: contactType + contact,
        languageOfPair,
        domain,
        projectType,
        messages,
      }).then(() => console.log("done"))

      const data = {
        service_id: 'contact_me',
        template_id: 'contact_form',
        user_id: 'xKBILtXPQ15z9r_DY',
        template_params: {
            'companyName': companyName,
            'fullName': fullName,
            'email': email,
            'contact': contactType + contact,
            'language': languageOfPair,
            'domain': domain,
            'type': projectType,
            'messages': messages,
        }
    };
     
    fetch('https://api.emailjs.com/api/v1.0/email/send', {
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json'
    }).then(function(res) {
        console.log(res);
    }).catch(function(error) {
        console.log('Oops... ' + JSON.stringify(error));
    });

      res.status(200).json({ message: 'Form data uploaded' });

  } else {
    res.status(405).end();
  }
}


