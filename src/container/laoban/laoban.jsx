import React, {Component} from 'react'
import {connect} from 'react-redux'

class Laoban extends Component{
    render() {
        return(
            <div>LAOBAN</div>
        )

    }
}

export default connect(state => ({}),{})(Laoban)