import {Request, Response} from "express";
import {updateServiceStatus, verifyHealth} from "../manager/health/healthManager";
import {statuses} from "../config/settings/service";

export const healthController = async(req: Request, res: Response) => {
    try {
        
        if(req.params.service && !statuses.hasOwnProperty(req.params.service)){
            return res.status(400).json({message:"Unknown service"});
        }

        const servicesToUpdate = req.params.service ? [req.params.service] : ['numerator', 'hash', 'uploader', 'signer'];
        servicesToUpdate.forEach(service => updateServiceStatus(service, false));

        await verifyHealth();

        const status = req.params.service
            ? req.params.service + (statuses[req.params.service] ? ` healthy` : ' unhealthy')
            : statuses;

        return res.status(200).json({
            message: "Health status verified successfully",
            status: status
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Internal Server Error",
            error: error.message // send error message in the response
        });
    }
};

//TODO Separate controllers into general and individual