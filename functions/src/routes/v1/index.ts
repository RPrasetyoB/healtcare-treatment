import express from 'express'
import treatmentRoutes from './treatment'

const versionRouter = express.Router()

versionRouter.use('/treatment', treatmentRoutes)


export default versionRouter