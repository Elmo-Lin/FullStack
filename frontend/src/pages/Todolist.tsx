import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Paper,
    Checkbox
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

type Todo = {
    id: number;
    text: string;
    completed: boolean;
};

export default function Todolist() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [input, setInput] = useState('');

    const addTodo = () => {
        if (!input.trim()) return;
        const newTodo: Todo = {
            id: Date.now(),
            text: input,
            completed: false,
        };
        setTodos([newTodo, ...todos]);
        setInput('');
    };

    const toggleTodo = (id: number) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const deleteTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <Box sx={{ maxWidth: 500, mx: 'auto', mt: 5, px: 2 }}>
            <Typography variant="h4" gutterBottom textAlign="center">
                📝 To-Do List
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <TextField
                    label="輸入任務"
                    variant="outlined"
                    fullWidth
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addTodo()}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={addTodo}
                >
                    新增
                </Button>
            </Box>

            <List>
                {todos.map(todo => (
                    <Paper key={todo.id} sx={{ mb: 1 }}>
                        <ListItem
                            secondaryAction={
                                <IconButton edge="end" onClick={() => deleteTodo(todo.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            }
                        >
                            <Checkbox
                                checked={todo.completed}
                                onChange={() => toggleTodo(todo.id)}
                            />
                            <ListItemText
                                primary={todo.text}
                                sx={{
                                    textDecoration: todo.completed ? 'line-through' : 'none',
                                    color: todo.completed ? 'gray' : 'inherit',
                                }}
                            />
                        </ListItem>
                    </Paper>
                ))}
            </List>
        </Box>
    );
}
