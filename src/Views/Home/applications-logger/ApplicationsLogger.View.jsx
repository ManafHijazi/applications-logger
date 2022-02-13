import React, {useCallback, useEffect, useState} from 'react';
import {GetAllApplicationsLogger} from "../../../Services";
import {ApplicationsLoggerTable} from "./components";
import './ApplicationsLogger.Style.scss'

const ApplicationsLoggerView = () => {
    const [isApplicationsLoading, setIsApplicationsLoading] = useState(false);
    const [applications, setApplications] = useState({
        totalCount: 0,
        result: []
    });

    /**
     * @author Manaf Hijazi (manafhijazii@gmail.com)
     * @Description method to call all applications logs from logger services
     */
    const getAllApplicationsLogs = useCallback(async () => {
        setIsApplicationsLoading(true);

        const response = await GetAllApplicationsLogger();
        if (response && response.status === 200) {
            const {result} = response.data;
            setApplications({result: result.auditLog, totalCount: result.recordsFiltered});

            setIsApplicationsLoading(false);
        } else {
            setApplications({
                totalCount: 0,
                result: []
            });

            setIsApplicationsLoading(false);
        }
    }, []);

    useEffect(() => {
        getAllApplicationsLogs();
    }, [getAllApplicationsLogs]);

    return (
        <div className="applications-logger-wrapper view-wrapper">
            <ApplicationsLoggerTable
                data={applications.result}
                totalCount={applications.totalCount}
                isApplicationsLoading={isApplicationsLoading}
            />
        </div>
    );
};

export default ApplicationsLoggerView;
