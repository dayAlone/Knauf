import React from 'react'
import { InputString } from './InputString'


const Field = (props) => (
    <div className='txt-r'>
        <InputString el={props.el} className='mbm' />
        {props.el.valueConverted ?
            <a href={props.el.valueConverted} target='_blank' style={{ textDecoration: 'none' }}>
                <span className='label label-primary bg-brand-7 mtxl'>
                    {props.el.valueConverted}
                    &nbsp;&nbsp;
                    <i className='type-neutral-11 fa fa-external-link fa-h6' style={{ position: 'relative', top: '1px' }}></i>
                </span>
            </a> : null}
    </div>
)


export const InputLink = Field
