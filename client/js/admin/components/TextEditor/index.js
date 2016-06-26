import './index.styl'

import React, { Component } from 'react'
import { LeftTabs, Tab } from 'pui-react-tabs'
import Footer from './Footer'
import TabsBlock from './TabBlock'
import SearchResults from './SearchResults'

import { connect } from 'react-redux'
import * as textsActions from '../../actions/texts'
import { bindActionCreators } from 'redux'


@connect(
    state => ({
        texts: state.texts
    }),
    dispatch => ({
        actions: {
            texts: bindActionCreators(textsActions, dispatch),
        }
    })
)
class TextEditor extends Component {
    constructor() {
        super()
        this.onSelect = this.onSelect.bind(this)
    }
    onSelect(e, value) {
        const { actions: { texts: { setTab, setSearch } } } = this.props
        setTab(value)
        setSearch(false)
    }
    render() {
        const { texts: { values: texts, search, tab } } = this.props
        return (
            <div>
                <LeftTabs
                    onSelect={this.onSelect}
                    defaultActiveKey={search ? 'search' : tab}
                    tabWidth={5}
                    paneWidth={19}
                    className='pll prl ptxl pbxxl'
                >
                    {texts
                        .filter(el => el.type === 'section' && el.level === '1')
                        .map((el, key) =>
                            <Tab key={key} eventKey={key} title={el.name}>
                                <TabsBlock name={el.name} code={el.code} />
                            </Tab>
                        )}
                    {search ?
                        <Tab key='search' eventKey='search' title='Результаты поиска'>
                            <SearchResults />
                        </Tab>
                        : null}
                </LeftTabs>
                <Footer />
            </div>
        )
    }
}

export default TextEditor
