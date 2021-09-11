const express = require('express');
const app = express();
const nodeMailer = require('nodemailer');
const cors = require('cors');
const morgan = require('morgan');       // morgan use to see what api use toin client site and for how long it give response
const bodyParser = require('body-parser');


var tranporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'creationbysagar@gmail.com',  //  your mail and password
        pass: 'sagar123!'
    }
})

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/sendMail',(req,res,next)=>{
    let mailOptions = {
        from: {
            name: req.query.name,
            address: 'creationbysagar@gmail.com'
        },
        to: 'das255028@gmail.com',
        subject: 'Request to help a user',
        html: `<h2>Hi Agent,</h2><p>A new user wants to help you!<p><a href="http://localhost/Project1/Chatbot/chatByAgent.html?id=${req.query.id}">Click to start chat</a></p>`
    }
    tranporter.sendMail(mailOptions,(err,info)=>{
        if(err){
            console.log(err);
            res.status(500).json({
                message: 'Due to some error mail has not sent, try again',
                error: err
            })
        }else{
            console.log('Email sent');
            res.status(200).json({
                message: 'Mail sent successful',
                info: info,
                result: info.response
            });
        }
    })

    // res.status(200).json({
    //     message: 'mailsending',
    //     name: req.query.name,
    //     email: req.query.email          // for get the details of get method
    //     // email: req.params.email      // for checking after slash (/)
    // });
    // console.log(req);    
});

app.use('/',(req,res,next)=>{
    res.status(200).json({
        message: 'hello'
    });
});


const port = 8080;
const http = require('http');
const server = http.createServer(app);
server.listen(port, ()=>{
    console.log('Server stated at port '+port);
});
