import express from "express";
const { Router } = express;
const routerDefault = Router();

import { fork } from 'child_process'
import getServerInfo from '../utils/serverInfo.js';



// Show process data (Entregable 14)
routerDefault.get("/info", async (req, res) => {
    res.render('info', getServerInfo())
})

// Trigger a fork child process try http://localhost:8080/api/randoms?cant=1111
routerDefault.get("/api/randoms", async (req, res) => {
    const { cant } = req.query
    const computation = fork('./src/utils/computation.js')
    console.log('Beginning Computation');
    computation.send(cant || 100000000)
    computation.on('message', (obj) => {
        res.render('random', { layout: 'index', object: obj })
    })
})

export default routerDefault;