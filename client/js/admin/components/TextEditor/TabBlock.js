import React from 'react'

import { connect } from 'react-redux'
import FieldRow from './FieldRow'

const TabBlock = (props) => {
    const texts = props.texts.filter(el => el.code.startsWith(`${props.code}_`))
    return (
        <div>
            <h2 className='h1 mtm ptn mbxl'>
                <strong>{props.name}</strong>
                <span className='label label-primary bg-accent-5 type-sm mtn mll'>{props.code}</span>
            </h2>
            {texts.map((el, key) => {
                const level = el.level
                const prevLevel = key > 0 ? texts[key - 1].level : 1
                return (
                    <div key={key}>
                        {el.type !== 'section' ?
                            <FieldRow
                                el={el}
                                className={`mbxxl ${prevLevel > level ? 'mtxxl ptxxl' : ''}`}
                                style={{ paddingLeft: `${10 + (level - 2) * 25}px` }}
                            />
                            : <h2 className='h2 mtxl ptxl mbxl'><strong>{el.name}</strong></h2>}
                    </div>
                )
            })}
        </div>
    )
}

export default connect(
    state => ({
        texts: state.texts.values,
    })
)(TabBlock)
