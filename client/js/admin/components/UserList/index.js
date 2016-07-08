import './index.styl'
import React, { Component } from 'react'
import ReactPaginate from 'react-paginate'

import { Row, Col } from 'pui-react-grids'
import { Table, TableRow, TableCell } from 'pui-react-table'

import { connect } from 'react-redux'
import * as usersActions from '../../actions/users'
import { bindActionCreators } from 'redux'

const CustomRow = (props) => (
    <TableRow className='type-sm'>
        {props.children}
    </TableRow>
)
const CustomCell = (props) => (
    <TableCell dangerouslySetInnerHTML={{ __html: props.value.replace(/\n/g, '<br>') }} />
)


@connect(
    state => ({
        users: state.users
    }),
    dispatch => ({
        actions: {
            users: bindActionCreators(usersActions, dispatch),
        }
    })
)
class UserList extends Component {
    constructor() {
        super()
        this.onPageClick = this.onPageClick.bind(this)
        this.getColumns = this.getColumns.bind(this)
        this.getLimits = this.getLimits.bind(this)
        this.checkPageSort = this.checkPageSort.bind(this)
        this.onLimitClick = this.onLimitClick.bind(this)
    }
    componentDidMount() {
        const { users: { values }, actions: { users: { getUsers } } } = this.props
        if (values.length === 0) getUsers()
    }
    onLimitClick(limit) {
        const { actions: { users: { setLimit } } } = this.props
        return () => setLimit(limit)

    }
    onPageClick(value) {
        const { actions: { users: { setPage } } } = this.props
        setPage(value.selected)
    }
    getColumns() {
        return [
            {
                displayName: 'ID',
                attribute: 'id',
                headerProps: this.checkPageSort('id')
            },
            {
                displayName: 'Тип',
                attribute: 'type',
                headerProps: this.checkPageSort('type')
            },
            {
                displayName: 'Фамилия',
                attribute: 'nameSecond',
            },
            {
                displayName: 'Имя',
                attribute: 'nameFirst',
            },
            {
                displayName: 'Отчество',
                attribute: 'nameThird',
            },
            {
                displayName: 'Город',
                attribute: 'city',
            },
            {
                displayName: 'Телефон',
                attribute: 'phone',
            },
            {
                displayName: 'Объекты',
                attribute: 'objects',
                CustomCell,
            },
            {
                displayName: 'Дата регистрации',
                attribute: 'createdAt',
                headerProps: this.checkPageSort('createdAt')
            },
            {
                displayName: 'Промо-код',
                attribute: 'promoCode',
                headerProps: this.checkPageSort('promoCode')
            },
            {
                displayName: 'Напоминание о сэмпле',
                attribute: 'reviewSms',
            },
            {
                displayName: 'Дата получения',
                attribute: 'promoDateActivate',
            },
            {
                displayName: 'Напоминание о конкурсе',
                attribute: 'promoDateActivate',
            },
            {
                displayName: 'Дата отзыва',
                attribute: 'reviewCreatedAt',
            }
        ].map(el => ({ ...el, sortable: false }))
    }

    getLimits() {
        const { users: { limit } } = this.props
        return [10, 50, 100, 500]
            .map(el =>
                <button
                    key={el}
                    onClick={this.onLimitClick(el)}
                    type='button'
                    data-value={el}
                    className={`btn btn-default ${limit === el ? 'selected' : ''}`}
                >
                    {el}
                </button>)
    }
    checkPageSort(column) {
        const { users: { sortBy, sort }, actions: { users: { setSort } } } = this.props
        return {
            onClick: () => {
                setSort(column, sortBy === column ? sort * -1 : -1)
            },
            className: sortBy === column ? `sortable sorted-${sort < 0 ? 'desc' : 'asc'}` : false
        }
    }
    render() {
        const { users: { values, page, limit, sortBy, sort } } = this.props
        const data = values
                        .sort((a, b) => {
                            if (a[sortBy] === null) a[sortBy] = ''
                            if (b[sortBy] === null) b[sortBy] = ''
                            return (a[sortBy] > b[sortBy] ? -1 : 1) * sort
                        })
                        .slice(page * limit, page * limit + limit)
        return (
            <div>
                <Row>
                    <Col xs={12} />
                    <Col xs={12} className='txt-r pbxl'>
                        <div className='btn-group'>
                            {this.getLimits()}
                        </div>
                    </Col>
                </Row>
                <div style={{ maxWidth: '100%', overflow: 'auto' }}>
                    <Table
                        columns={this.getColumns()}
                        data={data}
                        style={{ minWidth: '2500px' }}
                        CustomRow={CustomRow}
                        className='mbn'
                    />
                </div>
                <Row className='mtxl'>
                    <Col xs={12}>
                        {values.length / limit > 1 ?
                            <ReactPaginate
                                pageNum={values.length / limit}
                                forceSelected={page}
                                containerClassName='pagination'
                                activeClassName='active'
                                nextLabel='»'
                                previousLabel='«'
                                clickCallback={this.onPageClick}
                            /> : null}
                    </Col>
                    <Col xs={12} className='txt-r pbl'>
                        <div className='btn-group'>
                            {this.getLimits()}
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default UserList
