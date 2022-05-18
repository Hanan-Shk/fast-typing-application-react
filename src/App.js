import React, { useState, useRef, useEffect } from 'react'
import { quotesArray, randomQuote, allowedKeys } from './Helper'
import ItemList from './components/ItemList'
import handleEnd from './helpers/handleEnd';
import handleStart from './helpers/handleStart';
import handleKeyDown from './helpers/handleKeyDown';

import './App.css'

const sideStyles = {
    'height': '100%',
	'top': '0',
    'position': 'fixed',
}

const listStyles = {
	height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
}

let interval = null

const App = () => {
	const inputRef = useRef(null)
	const outputRef = useRef(null)
	const [ duration, setDuration ] = useState(60)
	const [ started, setStarted ] = useState(false)
	const [ ended, setEnded ] = useState(false)
	const [ index, setIndex ] = useState(0)
	const [ correctIndex, setCorrectIndex ] = useState(0)
	const [ errorIndex, setErrorIndex ] = useState(0)
	const [ quote, setQuote ] = useState({})
	const [ input, setInput ] = useState('')
	const [ cpm, setCpm ] = useState(0)
	const [ wpm, setWpm ] = useState(0)
	const [ accuracy, setAccuracy ] = useState(0)
	const [ isError, setIsError ] = useState(false)
	const [ lastScore, setLastScore ] = useState('0')

	useEffect(() => {
		const newQuote = randomQuote(quotesArray)
		setQuote(newQuote)
		setInput(newQuote.quote)
	}, [])

	const setTimer = () => {
		const now = Date.now()
		const seconds = now + duration * 1000
		interval = setInterval(() => {
			const secondLeft = Math.round((seconds - Date.now()) / 1000)
			setDuration(secondLeft)
			if (secondLeft === 0) {
				handleEnd(setEnded, setStarted, interval)
			}
		}, 1000)
	}

	useEffect(
		() => {
			if (ended) localStorage.setItem('wpm', wpm)
		},
		[ ended, wpm ]
	)
	useEffect(() => {
		const stroedScore = localStorage.getItem('wpm')
		if (stroedScore) setLastScore(stroedScore)
	}, [])

	return (
		<div className="App">
			<div className="container-fluid pt-4 text-white bg-dark" style={{ height: '100vh' }}>
				<div className="row">
					<div className="col-sm-6 col-md-2 order-md-0 px-5" style={{ ...sideStyles, left: '0' }}>
						<ul className="list-unstyled text-center small top" style={{ ...listStyles }}>
							<ItemList
								name="WPM"
								data={wpm}
								style={
									wpm > 0 && wpm < 20 ? (
										{ color: 'white', backgroundColor: '#eb4841' }
									) : wpm >= 20 && wpm < 40 ? (
										{ color: 'white', backgroundColor: '#f48847' }
									) : wpm >= 40 && wpm < 60 ? (
										{ color: 'white', backgroundColor: '#ffc84a' }
									) : wpm >= 60 && wpm < 80 ? (
										{ color: 'white', backgroundColor: '#a6c34c' }
									) : wpm >= 80 ? (
										{ color: 'white', backgroundColor: '#4ec04e' }
									) : (
										{}
									)
								}
							/>
							<ItemList name="CPM" data={cpm} />
							<ItemList name="Last Score" data={lastScore} />
						</ul>
					</div>
					<div className="col-sm-12 col-md-8 order-md-1" style={{ margin: 'auto' }}>
						<div className="container">
							<div className="text-center mt-4 header">
								<h1>This is a Fast-Typing application</h1>
								<p className="lead">
									Start the one-minute typing speed test to determine how fast you can type in real-world!
								</p>
								<div className="control my-5">
									{ended ? (
										<button
											className="btn btn-outline-danger"
											onClick={() => window.location.reload()}
										>
											Reload
										</button>
									) : started ? (
										<button className="btn btn-outline-warning" disabled>
											Hurry
										</button>
									) : (
										<button className="btn btn-outline-success" onClick={e => handleStart(setStarted, setEnded, setInput, quote, inputRef, setTimer)}>
											Start Typing!
										</button>
									)}
									<span className="btn-circle-animation" />
								</div>
							</div>

							{ended ? (
								<div className="bg-dark text-light p-4 mt-5 lead rounded">
									<span>"{quote.quote}"</span>
									<span className="d-block mt-2 text-muted small">- {quote.author}</span>
								</div>
							) : started ? (
								<div
									className={`text-light mono quotes${started ? ' active' : ''}${isError
										? ' is-error'
										: ''}`}
									tabIndex="0"
									onKeyDown={e => handleKeyDown(
										e, quote, index, setIndex, setCorrectIndex, correctIndex, setInput, setIsError, outputRef, allowedKeys,
										setErrorIndex, errorIndex, duration, setAccuracy, setCpm, setWpm, setEnded, setStarted, interval
									)}
									ref={inputRef}
								>
									{input}
								</div>
							) : (
								<div className="mono quotes text-muted" tabIndex="-1" ref={inputRef}>
									{input}
								</div>
							)}
							<div className="mb-5">
								<h6 className="py-2 text-center">Average Typing Speeds</h6>
								<div className="d-flex text-white meter-gauge">
									<span className="col" style={{ background: '#eb4841' }}>
										0 - 20 Slow
									</span>
									<span className="col" style={{ background: '#f48847' }}>
										20 - 40 Average
									</span>
									<span className="col" style={{ background: '#ffc84a' }}>
										40 - 60 Fast
									</span>
									<span className="col" style={{ background: '#a6c34c' }}>
										60 - 80 Professional
									</span>
									<span className="col" style={{ background: '#4ec04e' }}>
										80 - 100+ Top
									</span>
								</div>
							</div>
						</div>
					</div>
					<div className="col-sm-6 col-md-2 order-md-2 px-5" style={{ ...sideStyles, right: '0' }}>
						<ul className="list-unstyled text-center small" style={{ ...listStyles }}>
							<ItemList name="Timers" data={duration} />
							<ItemList name="Errors" data={errorIndex} />
							<ItemList name="Acuracy" data={accuracy} symble="%" />
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}

export default App
