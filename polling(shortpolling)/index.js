const express = require('express')
const jobs = {}

const app = express()

app.get('/', (req, res) => {
    res.send('Polling!')
})

app.post('/submit', (req, res) => {
    const jobId = `job:${Date.now()}`
    jobs[jobId] = 0
    updateJob(jobId, 0)
    res.end(jobId)
})

app.get('/checkstatus', (req, res) => {
    console.log(req.query.jobId)
    console.log(jobs)
    res.end('JobStatus: ' + jobs[req.query.jobId] + '%')
})

app.listen(8080, () => { 'listening on 8080' });

function updateJob(jobId, prg) {
    jobs[jobId] = prg
    console.log('updated', jobId, 'to', prg)

    if (prg === 100) return
    this.setTimeout(() => updateJob(jobId, prg + 10), 5000)
} 