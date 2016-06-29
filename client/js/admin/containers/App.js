import React from 'react'
import { BasicPanelAlt } from 'pui-react-panels'
import Header from '../components/Header'
import { Divider } from 'pui-react-dividers'

import { Link } from 'react-router'

export default (props) => {
    const path = props.location.pathname
    const nav = [
        { link: '/admin/', name: 'Редактор текстов' },
        { link: '/admin/users/', name: 'Список участников' },
        { link: '/admin/sellers/', name: 'Список дилеров' },
    ]
    return (
        <div className='mtxl prxl plxl'>
            <BasicPanelAlt header={<Header />}>
                <div className='pls prm'>
                    {nav.map((el, key) => <Link key={key} to={el.link} className={`link-text ${key === 0 ? 'mlm' : 'mlxxl'} ${path === el.link ? 'type-brand-2 em-max' : ''}`}>{el.name}</Link>)}
                </div>
                <Divider size='large' className='mtl' style={{ marginRight: '-10px', marginLeft: '-10px' }} />
                {props.children}
            </BasicPanelAlt>
            <div className='txt-r type-xs mtl type-neutral-4 mbl' style={{ minWidth: '100%' }}>
                Copyright &copy; Radia Interactive
            </div>
        </div>
    )
}
