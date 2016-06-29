import React, { Component } from 'react'
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

const columns = [
    {
        displayName: 'Тип',
        attribute: 'type',
        sortable: false
    },
    {
        displayName: 'Фамилия',
        attribute: 'nameSecond',
        sortable: false
    },
    {
        displayName: 'Имя',
        attribute: 'nameFirst',
        sortable: false
    },
    {
        displayName: 'Отчество',
        attribute: 'nameThird',
        sortable: false
    },
    {
        displayName: 'Город',
        attribute: 'city',
        sortable: false
    },
    {
        displayName: 'Телефон',
        attribute: 'phone',
        sortable: false
    },
    {
        displayName: 'Объекты',
        attribute: 'objects',
        CustomCell,
        sortable: false
    },
    {
        displayName: 'Дата регистрации',
        attribute: 'createdAt',
        sortable: false
    },
    {
        displayName: 'Промо-код',
        attribute: 'promoCode',
        sortable: false
    },
    {
        displayName: 'Напоминание о сэмпле',
        attribute: 'reviewSms',
        sortable: false
    },
    {
        displayName: 'Дата получения',
        attribute: 'promoDateActivate',
        sortable: false
    },
    {
        displayName: 'Напоминание о конкурсе',
        attribute: 'promoDateActivate',
        sortable: false
    },
    {
        displayName: 'Дата отзыва',
        attribute: 'reviewCreatedAt',
        sortable: false
    }
]


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
    componentDidMount() {
        const { users: { values }, actions: { users: { getUsers } } } = this.props
        if (values.length === 0) getUsers()
    }
    render() {
        return (
            <div style={{ maxWidth: '100%', overflow: 'auto' }}>
                <Table columns={columns} data={this.props.users.values} style={{ minWidth: '2500px' }} CustomRow={CustomRow} />
            </div>
        )
    }
}

export default UserList
