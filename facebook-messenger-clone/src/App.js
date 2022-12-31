import React, { useState, useEffect } from 'react';
import { FormControl, Input } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import './App.css';
import Message from './Message';
import db from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import neola from './neola.png';

function App() {
	const [ msgInput, setInput ] = useState('');
	const [ messages, setMessages ] = useState([]);
	const [ username, setUsername ] = useState('');

	useEffect(() => {
		db.collection('messages').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
			setMessages(snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() })));
		});
	}, []);

	useEffect(() => {
		setUsername(prompt('Please enter your name'));
	}, []);
	

	const sendMsg = (event) => {
		event.preventDefault();
		db.collection('messages').add({
			username: username,
			message: msgInput,
			timestamp: firebase.firestore.FieldValue.serverTimestamp()
		});
		setInput('');
	};

	return (
		<div className="App">
			<img src={neola} alt="logo"/>
			<h3>Welcome {username}</h3>
			<form className="app__form">
				<FormControl className="app__formControl">
					<Input color="secondary" className="app_msgInput" placeholder="Enter a message" value={msgInput} onChange={(event) => setInput(event.target.value)} />
					<IconButton className="app_iconButton" disabled={!msgInput} color="secondary" variant="contained" type="submit" onClick={sendMsg}>
						<SendIcon />
					</IconButton>
				</FormControl>
			</form>
			<FlipMove>{messages.map(({ id, message }) => <Message key={id} username={username} message={message} />)}</FlipMove>
		</div>
	);
}

export default App;
