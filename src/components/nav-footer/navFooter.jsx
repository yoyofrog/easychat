import React, {Component} from 'react'
import  {TabBar } from "antd-mobile";
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'


const Item = TabBar.Item

class NavFooter extends Component{
    static propTypes ={
        navList:PropTypes.array.isRequired,
        unReadCount:PropTypes.number.isRequired
    }
    render() {
        let {navList, unReadCount} = this.props
        navList = navList.filter((nav)=> nav.hide != true)
        const path = this.props.location.pathname
        return(
            <TabBar>
                {
                    navList.map((nav) => {
                        return <Item
                            badge={nav.path ==='/message'? unReadCount: null}
                            title={nav.text}
                            key={nav.path}
                            icon={{uri:require(`./images/${nav.icon}.png`)}}
                            selectedIcon={{uri:require(`./images/${nav.icon}-selected.png`)}}
                            selected={path === nav.path}
                            onPress={()=> this.props.history.replace(nav.path)}
                        ></Item>
                    })
                }
            </TabBar>
        )

    }
}
export default withRouter(NavFooter)