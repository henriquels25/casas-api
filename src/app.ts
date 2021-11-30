import express from 'express'
import {Request, Response} from "express";
import initDB from './initDB';
initDB();

import * as casaService from './CasaService';
import { Casa } from './entities/Casa';

// create and setup express app
const app = express();
app.use(express.json());

app.get("/casas", async function(req: Request, res: Response) {
    const casas = await casaService.buscaTodasCasas();
    return res.send(casas);
});

app.post("/casas", async function(req: Request, res: Response) {
    try {
        const casa = new Casa();
        casa.nrQuartos = req.body.nrQuartos;
        casa.nrJanelas = req.body.nrJanelas;
        casa.cor = req.body.cor;
        casa.possuiGaragem = req.body.possuiGaragem;
        casa.email = req.body.email;
        casa.dataConstrucao = new Date(req.body.dataConstrucao);
        const casas = await casaService.create(casa);
        return res.send(casas);
    } catch (error){
        return res.status(500).send(error.validationErrors);
    }
});

app.get("/casas/:id", async function(req: Request, res: Response) {
    const casa = await casaService.buscaCasaPorId(Number(req.params.id));
    return res.send(casa);
});

app.delete("/casas/:id", async function(req: Request, res: Response) {
    await casaService.excluiCasa(Number(req.params.id));
    return res.status(204).send()
});

app.put("/atualiza-cor", async function(req: Request, res: Response) {
    try {
        await casaService.atualizaCor(Number(req.body.id), req.body.cor);
    } catch (error){
        return res.status(500).send({error: error});
    }
    return res.status(204).send()
});

// start express server
app.listen(8080);
console.log('Application running on port 8080')