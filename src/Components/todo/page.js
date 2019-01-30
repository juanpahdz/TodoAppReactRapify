import React from 'react'
import Main from '../../layouts/Main'
import {
    Card,
    H2,
    Divider,
    UL,
    Button,
    Checkbox,
    Label,
    InputGroup,
    Intent,
    Callout
} from '@blueprintjs/core'
import './style.css'
function TodoPage(props) {
    const {
        items,
        error,
        handleNewItem,
        handleRemoveItem,
        handleChangeNewItem,
        handleEditModeExit,
        newItemText,
        handleEditModeEnter,
        handleToggleItemComplete
    } = props
    return(
        <Main>
            <Card>
                <H2>TODO</H2>
                <Button 
                    text="New Item"
                    intent={Intent.PRIMARY}
                    icon="new-object"
                    className="new-todo-item"
                    onClick={handleNewItem}
                />

                {error && 
                    <Callout intent={Intent.DANGER}>
                        {error}
                    </Callout>}

                <Divider/>

                <UL className="todo-list">
                    {items.map(item => 
                        <li 
                            className="todo-item"
                            key={item.id}
                        >
                            <Button 
                                small
                                icon="remove"
                                intent="danger"
                                className="todo-item-action"
                                onClick={(e) => handleRemoveItem(item)}
                            />

                            {item.isEditing ? 
                                <InputGroup 
                                    small
                                    className="todo-item-text-edit"
                                    placeholder="Item text..."
                                    value={newItemText}
                                    onChange={handleChangeNewItem}
                                    onBlur={() => handleEditModeExit(item)}
                                    inputRef={ref => ref && ref.focus()}
                                />
                                :
                                <React.Fragment>
                                    <Checkbox
                                        checked={item.isChecked}
                                        onChange={() => handleToggleItemComplete(item)}
                                    />
        
                                    <Label
                                        className={`todo-item-label ${item.isChecked ? 'done' : ''}`}
                                        onClick={() => handleEditModeEnter(item)}
                                    >
                                        {item.text}
                                    </Label>
                                </React.Fragment>
                            }
                        </li>
                    )}
                </UL>
            </Card>
        </Main>
    )
}

export default TodoPage