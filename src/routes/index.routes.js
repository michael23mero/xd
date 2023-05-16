import { Router } from "express";
import axios from 'axios';

const API = process.env.API

const rutas = Router()

rutas.get('/', (req, res) => {
    res.render('index', { title: 'CNE' })
})

rutas.get('/inicio', (req, res) => {
    res.render('views-home/home', { title: 'Inicio' })
})


rutas.get('/sufragar', (req, res) => {
    res.render('views-home/sufragar', { title: 'Sufragar' })
})

rutas.post('/sufragar', (req, res) => {
    axios.post(`${API}/auth-user`, {
        identify: req.body.identify
    }).then(resp => {
        const cookie_ = {
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
            httpOnly: true
        }
        console.log(resp.data)
        res.cookie('votaciones', resp.data.accessToken, cookie_)
        res.redirect('/home-user')
    }).catch(err => {
        res.render('views-home/sufragar', {
            alert: true, alertMessage: err.response.data.msg, alertIcon: 'info',time: 1500, ruta: 'sufragar'
        })
    })
})

rutas.get('/home-user', (req, res) => {
    axios.get(`${API}/home-user`, {
        headers: { 'x-access-token': req.cookies.votaciones }
    }).then(resp => {
        axios.get(`${API}/get-candidatos`, {
        }).then(resp2 => {
            res.render('views-users/user', { title: 'HomeUser', user: resp.data, candidato: resp2.data})
        }).catch(err => {res.send(err.message)})
    }).catch(err => res.render('views-home/sufragar'))

})

rutas.get('/elegir/:id', (req, res) => {
    axios.get(`${API}/elegir-cand/${req.params.id}`, {
        headers: { 'x-access-token': req.cookies.votaciones }
    }).then(resp => {
        res.redirect('/home-user')
    }).catch(err => res.render('views-home/sufragar'))
})

rutas.get('/transparencia', (req, res) => {
    res.render('views-home/transparencia', { title: 'Transparencia' })
})

rutas.get('/candidatos', (req, res) => {
    axios.get(`${API}/get-candidatos`, {
    }).then(resp => {
        res.render('views-home/candidato', { title: 'Candidatos', candidato: resp.data})
    }).catch(err => {res.send(err.message)})
})

rutas.get('/logout', (req, res) => {
    res.clearCookie('votaciones')
    res.redirect('/sufragar')
})


export default rutas