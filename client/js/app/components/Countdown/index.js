import './Countdown.styl'

import React, { Component } from 'react'
import moment from 'moment'

import pluralize from '../../libs/pluralize'

class Countdown extends Component {
    state = {
        till: moment(this.props.till, 'hh:mm DD.MM.YYYY'),
        current: new Date(),
        timeout: setInterval(this.tick.bind(this), 1000)
    }

    componentWillUnmount() {
        clearInterval(this.state.timeout)
    }

    getCounter() {
        return this.calculate().map((el, i) => (
            <div block='countdown' elem='item' key={`countdown-${i}`}>
                <strong block='countdown' elem='value'>{el[0]}</strong><span block='countdown' elem='text'>{el[1]}</span>
            </div>
        ))
    }

    calculate() {
        const values = []
        const lang = {
            seconds: ['секунда', 'секунды', 'секунд', 'секунды'],
            minutes: ['минута', 'минуты', 'минут', 'минуты'],
            hours: ['час', 'часа', 'часов', 'часа'],
            days: ['день', 'дня', 'дней', 'дня'],
            month: ['месяц', 'месяца', 'месяцев', 'месяца']
        }
        const types = ['days', 'hours', 'minutes']
        const secondsCounts = [86400, 3600, 60]
        let remains = this.state.till.unix() - moment().unix()
        for (let i = 0, l = types.length; i < l; i++) {
            const currentSecondsCount = secondsCounts[i]
            const currentValue = Math.floor(remains / currentSecondsCount)
            remains = remains - currentValue * currentSecondsCount
            values.push(currentValue.toString().length === 1 ? `0${currentValue}` : currentValue)
        }

        return values
            .map((el, i) => [el, pluralize(el, lang[types[i]])])
            .filter(el => el[0] > 0)
    }


    tick() {
        const { till, current } = this.state
        if (till.toDate() > current) {
            this.setState({ current: new Date() })
        } else {
            clearInterval(this.state.timeout)
        }

    }
    render() {
        const counter = this.getCounter()
        return (
            <div block='countdown'>
                <div block='countdown' elem='title' dangerouslySetInnerHTML={{ __html: this.props.pretext }} />
                {counter}
            </div>
        )
    }
}

export default Countdown
