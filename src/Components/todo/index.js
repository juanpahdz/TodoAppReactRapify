import React, { Component } from 'react'
import TodoPage from './page.js'
import { create, read, update, remove} from '../../services/api'

class Todo extends Component {
    constructor(){
        super()

        this.state = {
            error:'',
            items: [],
            newItemText: '',
        }

    }

    async componentDidMount() {
        try {
            const items = await read()
            this.setState({ items })
        } catch (error) {
            this.setState({error: error.message})
        }
    }

     handleNewItem = async () => {
        try{
            const newItem = await create({text:'', isChecked: false})
            this.setState({
                items: [
                    ...this.state.items,
                    {
                        ...newItem,
                        isEditing: true,
                    }
                ]
            })
        }
        catch (error) {
            this.setState({error: error.message})
        }
    }

    handleRemoveItem = async (item) => {
        try {
            await remove(item.id);

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
        } catch (error) {
            this.setState({error: error.message})
        }
    }

    handleChangeNewItem = (event) => {
        this.setState ({ newItemText: event.target.value })
    }

    handleEditModeExit = async (item) => {
        try { 
            const {
            newItemText,
            items,
        } = this.state
 
        const upadatedItem = await update(item.id, {text: newItemText})

        this.setState({
            newItemText: '',
            items: items.map((next) => {
                if(next.id === item.id) {
                    return{
                        ...upadatedItem,
                        isEditing: false,
                    }
                }
                return next
            })
        }) }

        catch (error) {
            this.setState ({ error: error.message })
        }
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

    handleToggleItemComplete = async (item) => {
        try{
            const upadatedItem = await update(item.id, {isChecked: !item.isChecked})
            const {
                items,
            } = this.state

            this.setState({
                newItemText: item.text,
                items: items.map((next) => {
                    if(next.id === item.id) {
                        return upadatedItem
                    }

                    return next
                })
            })
        } catch (error) {
            this.setState({error: error.message})
        }
    }
    
    render () {

        const {
            items,
            newItemText,
            error
        } = this.state

        return (
            <TodoPage
                error={error}
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