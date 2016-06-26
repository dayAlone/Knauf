import React from 'react'
import TextEditor from '../components/TextEditor'
import { BasicPanelAlt } from 'pui-react-panels'
import Header from '../components/Header'
import SearchForm from '../components/TextEditor/SearchForm'
import { Divider } from 'pui-react-dividers'

import { Link } from 'react-router'

export default () => (
    <div className='mtxl prxl plxl'>
        <BasicPanelAlt header={<Header></Header>}>
            <div className='plm prm'>
                <Link to='/admin/' className='link-text mls type-brand-2 em-max'>Редактор текстов</Link>
                <Link to='/admin/users/' className='link-text mlxxl'>Список пользователей</Link>
                <Link to='/admin/texts/' className='link-text mlxxl'>Список диллеров</Link>
            </div>
            <Divider size='large' className='mtl' style={{ marginRight: '-10px', marginLeft: '-10px' }} />
            <TextEditor />
        </BasicPanelAlt>
        <div className='txt-r type-xs mtl type-neutral-4 mbl' style={{ minWidth: '100%' }}>
            Copyright &copy; Radia Interactive
        </div>
    </div>
)
