var fs = require('fs');
var Buffer = require('safe-buffer').Buffer;
var path = require('path');

const pathToAcme = path.join('./','acme.json');
const pathToSave = "./ssl/";

fs.readFile(pathToAcme, {encoding: 'utf-8'}, function(err,data){
    if (!err) {
		data = JSON.parse(data);
		for (var i in data.DomainsCertificate.Certs) {
			console.log(i + " Save " + data.DomainsCertificate.Certs[i].Certificate.Domain)
			writeFile(data.DomainsCertificate.Certs[i].Certificate.Domain+".key", data.DomainsCertificate.Certs[i].Certificate.PrivateKey, pathToSave);
			writeFile(data.DomainsCertificate.Certs[i].Certificate.Domain+".cert", data.DomainsCertificate.Certs[i].Certificate.Certificate, pathToSave);
		}
    } else {
        console.log(err);
    }
});


function writeFile(fileName, contetnt, pathToSave){
	var decode = Buffer.from(contetnt, 'base64');
	fs.writeFile( path.join(pathToSave, fileName), decode, function(err) {
		if(err) {
			return console.log(err);
		}
	})
}