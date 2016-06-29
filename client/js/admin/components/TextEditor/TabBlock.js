import React from 'react'

import FieldRow from './FieldRow'

const TabBlock = (props) => (
    <div>
        {props.elements.map((el, key) => {
            const level = el.level
            const prevLevel = key > 0 ? props.elements[key - 1].level : 1
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

export default TabBlock
