import React, {Component} from 'react'
import {List, Grid } from 'antd-mobile'
import PropTypes from 'prop-types'

export default class HeaderSelector extends Component {
    static propTypes ={
        setHeader:PropTypes.func.isRequired
    }
    state={
        icon: null
    }
    constructor(props) {
        super(props);
        this.headerList =[]
        for (let i = 0; i < 20; i++) {
            let header = {
                text: `头像${i + 1}`,
                icon: require(`../../assets/images/头像${i+1}.png`)
            }
            this.headerList.push(header)
        }
    }
    selectHeader=({text, icon})=> {
        this.setState({icon})
        this.props.setHeader(text)
    }

    render() {
        const {icon} = this.state
        const listHeader = icon ? <p>已选择头像: <img src={icon} alt="header"/></p> : '请选择头像'
        return(
            <List renderHeader={()=> listHeader}>
                <Grid onClick={this.selectHeader} data={this.headerList} columnNum={5}>

                </Grid>

            </List>
        )
    }
}