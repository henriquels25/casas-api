import { Casa } from './entities/Casa';
import {getRepository} from "typeorm";

import {validate} from "class-validator";
import { ErrorSaving } from './ErrorSaving';

export async function create(casa: Casa){
    const repository = getRepository(Casa);

    const errors = await validate(casa);
    if (errors.length > 0){
        throw new ErrorSaving(errors);
    }
    await repository.save(casa);
}

export async function buscaTodasCasas(){
    const repository = getRepository(Casa);

    return await repository.find();
}

export async function buscaCasaPorId(id: number){
    const repository = getRepository(Casa);

    return await repository.findOne(id);
}

export async function buscaPorNumeroDeQuartos(nrQuartos: number){
    const repository = getRepository(Casa);

    return await repository.find({nrQuartos: nrQuartos});
}

export async function excluiCasa(id: number){
    const repository = getRepository(Casa);
    return await repository.delete(id);
}

export async function excluiCasaAlternative2(id: number){
    const repository = getRepository(Casa);
    const casa = await repository.findOne(id);
    if (casa == undefined){
        throw 'Casa nao encontrada'
    }
    return await repository.delete(casa);
}

export async function atualizaCor(id: number, cor: string) {
    const repository = getRepository(Casa);
    const casa = await repository.findOne(id);
    if (casa == undefined){
        throw 'Casa nao encontrada'
    }
    casa.cor = cor;
    return await repository.save(casa);
}