import React, { Component } from 'react'
import TodoPage from './page.js'

class Todo extends Component {
    constructor(){
        super()

        this.state = {
            items: [],
            newItemText: '',
        }
    }

    handleNewItem = () => {
        this.setState({
            items: [
                ...this.state.items,
                {
                    id: Date.now(),
                    text: '',
                    isChecked: false,
                    isEditing: true,
                }
            ]
        })
    }

    handleRemoveItem = (item) => {
        const { items } = this.state
        const index = items.findIndex(n => n.id === item.id)
        
        if (index === -1 ) {
            return
        }
        
        const newItems = items.slice()
        newItems.splice(index, 1)

        this.setState({
            items: newItems
        })
    }

    handleChangeNewItem = (event) => {
        this.setState ({ newItemText: event.target.value })
    }

    handleEditModeExit = (item) => {
        const {
            newItemText,
            items,
        } = this.state

        this.setState({
            newItemText: '',
            items: items.map((next) => {
                if(next.id === item.id) {
                    return{
                        ...next,
                        isEditing: false,
                        text: newItemText,
                    }
                }

                return next
            })
        })
    }

    handleEditModeEnter = (item) => {
        const {
            newItemText,
            items,
        } = this.state

        this.setState({
            newItemText: item.text,
            items: items.map((next) => {
                if(next.id === item.id) {
                    return{
                        ...next,
                        isEditing: true,
                    }
                }

                return next
            })
        })
    }

    handleToggleItemComplete = (item) => {
        const {
            newItemText,
            items,
        } = this.state

        this.setState({
            newItemText: item.text,
            items: items.map((next) => {
                if(next.id === item.id) {
                    return{
                        ...next,
                        isChecked: !item.isChecked,
                    }
                }

                return next
            })
        })
    }
    
    render () {

        const {
            items,
            newItemText
        } = this.state

        return (
            <TodoPage
                items={items}
                handleNewItem={this.handleNewItem}
                handleRemoveItem={this.handleRemoveItem}
                newItemText={newItemText}
                handleChangeNewItem={this.handleChangeNewItem}
                handleEditModeExit={this.handleEditModeExit}
                handleEditModeEnter={this.handleEditModeEnter}
                handleToggleItemComplete={this.handleToggleItemComplete}
            />
        )
    }
}

export default Todo