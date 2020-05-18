import React, { Component } from 'react'
import { connect } from 'react-redux'
import CardList from '../components/CardList'
import SearchBox from '../components/SearchBox'
import Scroll from '../components/Scroll'
import ErrorBoundry from '../components/ErrorBoundry'
import './App.css'
import { setSearchField,requestRobots } from '../actions'

// Parameters state comes from index.js provider store state(rootReducers)
const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error    
    }
}

//dispatch the DOM changes to call an action. note mapStateToProps returns object, 
//mapDispatchProps returns function, the function returns an object then uses to change
//the data from reducers
const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
    }
    
}

class App extends Component {
    componentDidMount() {
        this.props.onRequestRobots()
    }

    render() {
        const { searchField, onSearchChange, robots, isPending } = this.props
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase())
        })

        return !isPending ?
        <h1 className="tc">Loading...</h1> :
            (
            <div className="tc">
                <h1 className="f2">RoboFriends</h1>
                <SearchBox searchChange={onSearchChange}/>
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots={filteredRobots}/>
                    </ErrorBoundry>    
                </Scroll>
            </div>
        )
    }
}
// action done from mapDispatchProps will change state from mapStateToProps
export default connect(mapStateToProps, mapDispatchToProps)(App)