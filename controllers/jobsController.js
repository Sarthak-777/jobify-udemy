const createJob = async (req, res) => {
    res.send('create job');
}

const deleteJob = async (req, res) => {
    res.send('delete job');
}
const getAllJob = async (req, res) => {
    res.send('get all jobs');
}

const updateJob = async (req, res) => {
    res.send('update all jobs');
}

const showStats = async (req, res) => {
    res.send('show stats');
}

export {createJob, deleteJob,getAllJob,showStats,updateJob};