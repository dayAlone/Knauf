import React from 'react'

import { connect } from 'react-redux'
import FieldRow from './FieldRow'

const SearchResults = (props) => {
    const { texts: { search, values: texts } } = props
    const results = [
        ...texts.filter(el => el.code.indexOf(search) !== -1 && el.type !== 'section'),
        ...texts.filter(el => el.name.indexOf(search) !== -1 && el.type !== 'section')
    ]
    return (
        <div>
            <h2 className='h1 mtm ptn mbxl'>
                <strong>Результаты поиска</strong>
                <span className='label label-primary bg-accent-5 type-sm mtn mll'>{search}</span>
            </h2>
            {results.map((el, key) => (
                <FieldRow
                    key={key}
                    el={el}
                    className={'mbxxl'}
                />
            ))}
        </div>
    )
}
SearchResults.componentDidUpdate = () => {
    console.log(this.refs)
}
export default connect(
    state => ({
        texts: state.texts
    })
)(SearchResults)
