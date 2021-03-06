/*
 * This program and the accompanying materials are made available under the terms of the
 * Eclipse Public License v2.0 which accompanies this distribution, and is available at
 * https://www.eclipse.org/legal/epl-v20.html
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Copyright Contributors to the Zowe Project.
 *
 */

import { JobUtils } from "../../../api/JobUtils";
import { FTPBaseHandler } from "../../../FTPBase.Handler";
import { IFTPHandlerParams } from "../../../IFTPHandlerParams";

export default class ViewJobStatusByJobIdHandler extends FTPBaseHandler {
    public async processFTP(params: IFTPHandlerParams): Promise<void> {
        this.log.debug("Viewing all spool files for job id: " + params.arguments.jobid);
        const jobDetails = await JobUtils.findJobByID(params.arguments.jobid, params.connection);
        params.response.data.setObj(jobDetails);
        params.response.format.output(
            {
                fields: ["jobname", "jobid", "owner", "status", "rc"],
                output: jobDetails,
                format: "object"
            }
        );

    }
}

