import { deferConfig as defer } from 'config/defer'
import path from 'path'
import socials from './socials'
import api from './api'

export default {
    db: 'postgres://localhost:5432/test3',
    branch: 'master',
    ip: 'localhost',
    port: 3000,
    domain: defer((cfg) => (`${cfg.ip}:${cfg.port}`)),
    https: false,
    root: process.cwd(),
    dir: defer(cfg => (cfg.root)),
    secret: 'mysecret',
    basicAuth: {
        name: 'test',
        pass: 'test'
    },
    templates: {
        root: defer((cfg) => (path.join(cfg.root, 'client/templates')))
    },
    folders: {
        source: './client/',
        dist: './public/',
    },
    crypto: {
        hash: {
            length: 64,
            // may be slow(!): iterations = 12000 take ~60ms to generate strong password
            iterations: 1
        }
    },
    access: {
        login: 'admin',
        password: 'admin'
    },
    socials,
    api
}
