import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {ButtonBase, TextField} from "@mui/material";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {Autocomplete, DateTimePicker, LocalizationProvider} from "@mui/lab";
import {ActionTypesEnum, ApplicationsTypesEnum} from "../../../../../enums";
import './ApplicationsLoggerTableFilter.style.scss';

export const ApplicationsLoggerTableFilter = ({onFilterChangeHandler}) => {
    const [localApplicationsFilter, setLocalApplicationsFilter] = useState({
        employeeName: null,
        actionType: null,
        applicationType: null,
        fromDate: null,
        toDate: null,
        applicationId: null
    });

    const onFilterSendHandler = () => {
        onFilterChangeHandler({
            employeeName: {
                value: localApplicationsFilter.employeeName,
                dataKey: 'employeeName',
                isDate: false,
            },
            fromDate: {
                value: localApplicationsFilter.fromDate,
                isLess: true,
                isDate: true,
                relatedTo: 'toDate',
                dataKey: 'creationTimestamp'
            },
            toDate: {
                value: localApplicationsFilter.toDate,
                isDate: true,
                relatedTo: 'fromDate',
                dataKey: 'creationTimestamp'
            },
            actionType: {
                value: (localApplicationsFilter.actionType && localApplicationsFilter.actionType.value) || '',
                dataKey: 'actionType',
                isDate: false,
            },
            applicationType: {
                value: (localApplicationsFilter.applicationType && localApplicationsFilter.applicationType.value) || '',
                dataKey: 'applicationType',
                isDate: false,
            },
            applicationId: {
                value: localApplicationsFilter.applicationId,
                dataKey: 'applicationId',
                isDate: false,
            },
        });
    };

    return (
        <div className="applications-logger-table-filter-wrapper">
            <div className="filter-item">
                    <span className="filter-label-wrapper">
                        Employee Name
                    </span>
                <TextField
                    size="small"
                    variant="outlined"
                    placeholder="e.g. Admin.User"
                    value={localApplicationsFilter.employeeName || ''}
                    onChange={(event) => {
                        const {value} = event.target;
                        setLocalApplicationsFilter(items => ({...items, employeeName: value}))
                    }}
                />
            </div>
            <div className="filter-item">
                    <span className="filter-label-wrapper">
                        Action Type
                    </span>
                <Autocomplete
                    size="small"
                    variant="outlined"
                    options={ActionTypesEnum || []}
                    getOptionLabel={(option) => option.value}
                    renderInput={(params) => <TextField {...params} />}
                    value={localApplicationsFilter.actionType || null}
                    onChange={(event, newValue) => {
                        setLocalApplicationsFilter(items => ({...items, actionType: newValue}))
                    }}
                />
            </div>
            <div className="filter-item">
                    <span className="filter-label-wrapper">
                        Application Type
                    </span>
                <Autocomplete
                    size="small"
                    variant="outlined"
                    options={ApplicationsTypesEnum || []}
                    getOptionLabel={(option) => option.value}
                    renderInput={(params) => <TextField {...params} />}
                    value={localApplicationsFilter.applicationType || null}
                    onChange={(event, newValue) => {
                        setLocalApplicationsFilter(items => ({...items, applicationType: newValue}))
                    }}
                />
            </div>
            <div className="filter-item">
                    <span className="filter-label-wrapper">
                        From Date
                    </span>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                        renderInput={(params) => <TextField placeholder="Select date" size="small" {...params} />}
                        value={localApplicationsFilter.fromDate || new Date()}
                        onChange={(newValue) => {
                            setLocalApplicationsFilter(items => ({...items, fromDate: newValue}))
                        }}
                    />
                </LocalizationProvider>
            </div>
            <div className="filter-item">
                    <span className="filter-label-wrapper">
                        To Date
                    </span>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                        renderInput={(params) => <TextField placeholder="Select date" size="small" {...params} />}
                        value={localApplicationsFilter.toDate || new Date()}
                        onChange={(newValue) => {
                            setLocalApplicationsFilter(items => ({...items, toDate: newValue}))
                        }}
                    />
                </LocalizationProvider>
            </div>
            <div className="filter-item">
                    <span className="filter-label-wrapper">
                        Application ID
                    </span>
                <TextField
                    size="small"
                    type="number"
                    variant="outlined"
                    placeholder="e.g. 219841/2021"
                    value={localApplicationsFilter.applicationId || ''}
                    onChange={(event) => {
                        const {value} = event.target;
                        setLocalApplicationsFilter(items => ({...items, applicationId: value}))
                    }}
                />
            </div>
            <div className="filter-item button-action">
                <ButtonBase onClick={onFilterSendHandler}>
                    Search Logger
                </ButtonBase>
            </div>
        </div>
    );
};

ApplicationsLoggerTableFilter.propTypes = {
    onFilterChangeHandler: PropTypes.func.isRequired,
};
