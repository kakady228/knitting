import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { TextField } from '@mui/material';

import './CustomDialog.css';

export default function CustomDialog(props)
{
    const {open, setOpen, label1, label2, type1, type2, val1, val2, setVal1, setVal2} = props;

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent className='CustomDialog'>                
                <label htmlFor="login-field">{label1}</label>
                <input onChange={(e) => setVal1(e.target.value)} id='login-field' type={type1 ? type1 : ''} className="CustomDialog-input" />

                <label htmlFor="password-field">{label2}</label>
                <input onChange={(e) => setVal2(e.target.value)} id="password-field" type={type2 ? type2 : ''} className="CustomDialog-input" />
            </DialogContent>
            <DialogActions>
                <button className="CustomDialog-save-btn" onClick={handleClose}>Сохранить</button>
            </DialogActions>
        </Dialog>
        </React.Fragment>
    );
}