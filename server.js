const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/video', function (req, res, next) {
    const path = 'assets/sample.mp4';

    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            next(err);
        }
        res.send(data);
    });
});

const mostrarMemoria = () => {
    setInterval(() => {
        let strs = '';
        const used = process.memoryUsage();
        for (let key in used) {
            strs += `${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB `;
        }
        console.log(strs);
    }, 2000);
};

mostrarMemoria();

app.listen(3000, function () {
    console.log('Listening on port 3000!');
});
