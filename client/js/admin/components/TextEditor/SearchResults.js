import React from 'react'

import { connect } from 'react-redux'
import TabsBlock from './TabBlock'


const SearchResults = (props) => {
    const { texts: { search, values: texts } } = props
    const sections = texts.filter(el => el.type === 'section' && parseInt(el.level, 10) > 1)
    const elements = texts.filter(el => el.type !== 'section')

    const resultSections = [
        ...sections.filter(el => el.code.toLowerCase().indexOf(search) !== -1),
        ...sections.filter(el => el.name.toLowerCase().indexOf(search) !== -1)
    ]

    const resultElements = [
        ...elements.filter(el => el.code.toLowerCase().indexOf(search) !== -1),
        ...elements.filter(el => el.name.toLowerCase().indexOf(search) !== -1),
        ...elements.filter(el => resultSections.filter(s => el.code.indexOf(`${s.code}_`) !== -1).length > 0)
    ]

    const results = [
        ...resultSections,
        ...resultElements,
        ...sections.filter(s => resultElements.filter(el => el.code.indexOf(`${s.code}_`) !== -1).length > 0)
    ]
    .filter((el, key, self) => self.indexOf(el) === key)
    .sort((a, b) => a.sort - b.sort)

    return (
        <div>
            <h2 className='h1 mtm ptn mbxl'>
                <strong>Результаты поиска</strong>
                <span className='label label-primary bg-accent-5 type-sm mtn mll'>{search}</span>
            </h2>
            <TabsBlock elements={results} />
        </div>
    )
}
export default connect(
    state => ({
        texts: state.texts
    })
)(SearchResults)
